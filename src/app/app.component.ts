import { Component, OnInit } from "@angular/core";
import * as metacoin_artifacts from "../../build/contracts/MetaCoin.json";
// import { Web3Service } from "./util/web3.service";
declare let window: any;
declare let require: any;
const Web3 = require("web3");
const contract = require("truffle-contract");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  web3: any;
  accounts: any[];
  metaCoin;
  isAdmin: boolean = false;
  isWriter: boolean = true;
  constructor() {}
  ngOnInit(): void {
    if (typeof window.web3 !== "undefined") {
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log("No web3? You should consider trying MetaMask!");

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      // Web3.providers.HttpProvider.prototype.sendAsync =
      //   Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:7545")
      );
    }
    this.getAccounts();
    this.artifactsToContract(metacoin_artifacts);
  }
  getAccounts() {
    this.web3.eth.getAccounts((err, accs) => {
      // console.log('Refreshing accounts');
      if (err != null) {
        console.warn("There was an error fetching your accounts.");
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn(
          "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
        );
        return;
      }

      if (
        !this.accounts ||
        this.accounts.length !== accs.length ||
        this.accounts[0] !== accs[0]
      ) {
        console.log("Observed new accounts");
        this.accounts = accs;
        this.isAdmin == true;
      }
    });
  }
  artifactsToContract(artifacts) {
    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    this.metaCoin = contractAbstraction;
  }
  checkWriter() {
    return this.isWriter;
  }

  checkAdmin() {
    return this.isAdmin;
  }
}
