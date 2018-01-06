import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

import { InMemoryDataService } from "./../in-memory-data.service";

@NgModule({
imports: [
    MaterialModule,
    HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, { dataEncapsulation: false, apiBase: "/" }
    )
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    RouterTestingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})

export class TestsModule {
}
