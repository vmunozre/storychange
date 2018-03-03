import { Injectable } from '@angular/core';
import * as storychain_artifacts from "../../../build/contracts/StoryChain.json";
import { Chapter } from '../../models/chapter.model';
import { ChaptersService } from './chapters.service';
declare let window: any;
declare let require: any;
const Web3 = require("web3");
const contract = require("truffle-contract");

@Injectable()
export class Web3ConnectorService {
  web3: any;
  public accounts: any[];
  storyChainContract;
  lastIdChapter;

  constructor(private chaptersService: ChaptersService) {
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
    this.listenToEvents();
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
      console.log('CREATE STORY', result);
    }).catch(function (err) {
      console.error(err);
    });
  }
  addChapter(_chapter: Chapter) {
    this.storyChainContract
      .deployed()
      .then(instance => {
        instance.addChapter(_chapter.author, _chapter.body, _chapter.title, {
          from: this.accounts[0],
          gas: 6385876
        });
      })
      .then(function (result) {
        console.log("ADD CHAPTER", result);
      })
      .catch(function (err) {
        console.error(err);
      });
  }
  // getContestantChapters() {
  //   this.storyChainContract.deployed().then(instance => {
  //     instance.getContestantChapters(, {
  //       from: this.accounts[0],
  //       gas: 6385876
  //     })
  //   });
  // }
  listenToEvents() {
    this.storyChainContract.deployed().then((instance) => {
      instance.newChapter({}, {}).watch((error, event) => {
        console.log('EVENT new Chapter', event);
        this.lastIdChapter = event.args.currentcontestantindex;
        this.storyChainContract.deployed().then((instance) => {
          instance.getContestantChapters(this.lastIdChapter).then((_response) => {
            console.log('CHAPTER CREADO Y RECUPERADO', _response);
            this.chaptersService.addChapter(new Chapter(_response[3], _response[1], _response[2]));
          });
        });
        //this.chaptersService.addChapter();
      });
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
