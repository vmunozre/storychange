import { Injectable } from '@angular/core';
import * as storychain_artifacts from "../../../build/contracts/StoryChain.json";
declare let window: any;
declare let require: any;
const Web3 = require("web3");
const contract = require("truffle-contract");

@Injectable()
export class Web3ConnectorService {
  web3: any;
  public accounts: any[];
  storyChainContract;

  constructor() {
    window.addEventListener('load', (event) => {
      this.bootstrapWeb3();
    });
  }

  bootstrapWeb3(): void {
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
    this.getMetamaskAccounts();
    this.artifactsToContract(storychain_artifacts);
  }

  createStory(_params: object) {


    // number_contestants: 0,
    //   number_chapters: 0,
    //     number_votes: 0,
    //       price_chapter: 0,
    //         price_vote: 0,
    this.storyChainContract.deployed().then((instance) => {
      debugger;
      return instance.createStory(_params['number_contestants'], _params['number_chapters'], this.web3.utils.toWei(String(_params['price_chapter']), "ether"), _params['number_votes'], this.web3.utils.toWei(String(_params['price_vote']), "ether"), {
        from: this.accounts[0],
        gas: 6385876
      });
    }).then(function (result) {
      console.log('RESULT', result);
    }).catch(function (err) {
      console.error(err);
    });
  }
  getMetamaskAccounts() {
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
      }
    });
  }

  public async getAccounts(): Promise<any> {
    if (!this.accounts) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.getAccounts();
    }

    return this.accounts;
  }
  artifactsToContract(artifacts) {
    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    this.storyChainContract = contractAbstraction;
  }

}
