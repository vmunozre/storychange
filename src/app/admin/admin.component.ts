import { Component, OnInit } from '@angular/core';
import { Web3ConnectorService } from '../services/web3-connector.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  story = {
    number_contestants: 0,
    number_chapters: 0,
    number_votes: 0,
    price_chapter: 0,
    price_vote: 0,
  }

  constructor(private web3connector: Web3ConnectorService) { }

  ngOnInit() {
  }

  createStory() {
    this.web3connector.createStory(this.story);
  }

}
