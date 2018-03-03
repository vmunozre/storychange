import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { MetaModule } from "./meta/meta.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MzButtonModule, MzInputModule, MzModalModule } from "ng2-materialize";
import { WritingComponent } from "./writing/writing.component";
import { AdminComponent } from "./admin/admin.component";
import { ReadComponent } from "./read/read.component";
import { MzCollapsibleModule } from 'ng2-materialize';
import { ChaptersListComponent } from './chapters-list/chapters-list.component';

@NgModule({
  declarations: [AppComponent, WritingComponent, AdminComponent, ChaptersListComponent, ReadComponent],
  imports: [
    MzModalModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MetaModule,
    BrowserAnimationsModule,
    MzButtonModule,
    MzInputModule,
    MzCollapsibleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
