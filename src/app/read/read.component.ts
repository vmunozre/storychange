import { Component, OnInit } from "@angular/core";
import { Chapter } from "../../models/chapter.model";
import { MzModalComponent } from "ng2-materialize";
import { ChaptersService } from "../services/chapters.service";

@Component({
  selector: "app-read",
  templateUrl: "./read.component.html",
  styleUrls: ["./read.component.css"]
})
export class ReadComponent implements OnInit {
  chapters: Chapter[] = [];
  chapter: Chapter;
  constructor(private chaptersService: ChaptersService) {
    this.chapter = new Chapter("Sin titulo", "anonimo", "circulen");
  }

  ngOnInit() {
    this.chapters = this.chaptersService.getChapters();
  }

  openModal(_chapter: Chapter, _modal: MzModalComponent) {
    this.chapter = _chapter;
    _modal.open();
  }
}
