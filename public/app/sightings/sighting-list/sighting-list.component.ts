import { Component, ViewChild, OnInit } from "@angular/core";
import { MatSort} from "@angular/material";
import { MatDialog } from "@angular/material";

import { SightingService } from "../shared/sighting.service";
import { SightingAddComponent } from "../sighting-add/sighting-add.component";
import { SightingDataSource } from "./sighting-data-source";

@Component({
  templateUrl: "./sighting-list.component.html",
  styleUrls: [ "./sighting-list.component.css" ]
})
export class SightingListComponent implements OnInit {
    dataSource: SightingDataSource | null;
    displayedColumns = ["id", "dateTime", "species", "count", "description"];
    loading = true;

    @ViewChild(MatSort) sort: MatSort;

    constructor(public dialog: MatDialog, private sightingService: SightingService) { }

    openDialog(): void {
      const dialogRef = this.dialog.open(SightingAddComponent, {
        width: "350px"
      });
    }

    ngOnInit() {
      this.dataSource = new SightingDataSource(this.sightingService, this.sort, this.loading);
    }
}
