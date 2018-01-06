import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SightingListComponent } from "./sightings/sighting-list/sighting-list.component";

const routes: Routes = [
  { path: "", redirectTo: "/sighting-list", pathMatch: "full" },
  { path: "sighting-list", component: SightingListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
