import { Component, OnInit } from "@angular/core";
import * as storychain_artifacts from "../../build/contracts/StoryChain.json";
import { Chapter } from "../models/chapter.model";
import { CHAPTERS } from "./mocks/chapters.mock";
import { ChaptersService } from "./services/chapters.service";
import { Web3Service } from "./util/web3.service";
import { Web3ConnectorService } from "./services/web3-connector.service";
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
  chapters: Chapter[] = [];
  isWriter: boolean = false;
  constructor(private chaptersService: ChaptersService, private web3connector: Web3ConnectorService) {
    this.isAdmin = true;
    this.chapters = CHAPTERS;
  }
  ngOnInit(): void {
    this.accounts = this.web3connector.accounts;
    this.web3connector.getAccounts().then((_response) => {
      this.accounts = _response;
      console.log('ACCOUNTS:', this.accounts);
    });
  }
  checkWriter() {
    return this.chaptersService.getIsMaxChapter();
  }

  checkAdmin() {
    return this.isAdmin;
  }
}
