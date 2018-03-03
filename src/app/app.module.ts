import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { MetaModule } from "./meta/meta.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MzButtonModule, MzInputModule } from "ng2-materialize";
import { WritingComponent } from "./writing/writing.component";

@NgModule({
  declarations: [AppComponent, WritingComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MetaModule,
    BrowserAnimationsModule,
    MzButtonModule,
    MzInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
