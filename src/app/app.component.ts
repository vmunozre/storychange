import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  isAdmin() {
    return false;
  }

  isWriter() {
    return false;
  }

  isChaptersList() {
    return true;
  }
}
