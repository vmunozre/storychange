export class Chapter {
  body: string;
  title: string;
  author: string;

  constructor(_title: string, _author: string, _body: string) {
    this.body = _body;
    this.title = _title;
    this.author = _author;
  }
}
