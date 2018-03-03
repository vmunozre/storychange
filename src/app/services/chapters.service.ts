import { Injectable } from "@angular/core";
import { Chapter } from "../../models/chapter.model";
import { CHAPTERS } from "../mocks/chapters.mock";

@Injectable()
export class ChaptersService {
  chapters: Chapter[] = [];
  MAX_CHAPTERS: number = 5;
  constructor() {
    this.chapters = CHAPTERS;
  }
  getChapters() {
    return this.chapters;
  }
  getIsMaxChapter() {
    return this.chapters.length !== this.MAX_CHAPTERS;
  }
  getMaxChapter() {
    return this.MAX_CHAPTERS;
  }
  getActualChapters() {
    return this.chapters.length;
  }
  addChapter(_chapter: Chapter) {
    if (this.chapters.length < this.MAX_CHAPTERS) {
      this.chapters.push(_chapter);
    }
  }
}
