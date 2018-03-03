import { Component, OnInit } from '@angular/core';
import { Web3ConnectorService } from '../services/web3-connector.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private web3connector: Web3ConnectorService) { }

  ngOnInit() {
  }

  createStory() {
    this.web3connector.createStory({});
  }

}
