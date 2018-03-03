import { TestBed, inject } from "@angular/core/testing";

import { ChaptersService } from "./chapters.service";

describe("ChaptersService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChaptersService]
    });
  });

  it(
    "should be created",
    inject([ChaptersService], (service: ChaptersService) => {
      expect(service).toBeTruthy();
    })
  );
});
