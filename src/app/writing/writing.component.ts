import { Component, OnInit } from "@angular/core";
import { Chapter } from "../../models/chapter.model";
import { ChaptersService } from "../services/chapters.service";

@Component({
  selector: "app-writing",
  templateUrl: "./writing.component.html",
  styleUrls: ["./writing.component.css"]
})
export class WritingComponent implements OnInit {
  title: string = "";
  body: string = "";
  author: string = "";
  constructor(private chaptersServices: ChaptersService) {}

  ngOnInit() {}

  addChapter() {
    let chapter = new Chapter(this.title, this.author, this.body);
    this.chaptersServices.addChapter(chapter);
  }

  getMaxChapters() {
    return this.chaptersServices.getMaxChapter();
  }
  getActualChapters() {
    return this.chaptersServices.getActualChapters();
  }
}
