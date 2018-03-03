import { TestBed, inject } from '@angular/core/testing';

import { Web3ConnectorService } from './web3-connector.service';

describe('Web3ConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Web3ConnectorService]
    });
  });

  it('should be created', inject([Web3ConnectorService], (service: Web3ConnectorService) => {
    expect(service).toBeTruthy();
  }));
});
