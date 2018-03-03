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
import { MzCollapsibleModule } from "ng2-materialize";
import { ChaptersListComponent } from "./chapters-list/chapters-list.component";

import { MzTabModule } from "ng2-materialize";
import { UtilModule } from "./util/util.module";
import { ChaptersService } from "./services/chapters.service";
import { Web3ConnectorService } from "./services/web3-connector.service";

@NgModule({
  declarations: [
    AppComponent,
    WritingComponent,
    AdminComponent,
    ChaptersListComponent,
    ReadComponent
  ],
  imports: [
    MzTabModule,
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
  providers: [ChaptersService, Web3ConnectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
