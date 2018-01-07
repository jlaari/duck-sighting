import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SightingListComponent } from "./sightings/sighting-list/sighting-list.component";
import { SightingAddComponent } from "./sightings/sighting-add/sighting-add.component";
import { MaterialModule } from "./material.module";
import { SightingService } from "./sightings/shared/sighting.service";
import { SpeciesService } from "./sightings/shared/species.service";
import { environment } from "../environments/environment";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentModule } from "angular2-moment";


export const MOMENT_FORMATS = {
  parse: {
    dateInput: "LL",
  },
  display: {
    dateInput: "DD.MM.YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MomentModule,
    // Hack to load HttpClientModule twice in production and in memory data service in development
    environment.production ? HttpClientModule : HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, apiBase: "/" }
    )
  ],
  declarations: [
    AppComponent,
    SightingListComponent,
    SightingAddComponent
  ],
  providers: [
    SightingService,
    SpeciesService,
    {provide: DateAdapter, useClass: MomentDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MOMENT_FORMATS},
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [SightingAddComponent]

})
export class AppModule { }

