import { MatSort} from "@angular/material";
import { DataSource } from "@angular/cdk/collections";

import { Observable } from "rxjs/Observable";
import { map, startWith, switchMap, } from "rxjs/operators";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { Sighting } from "../shared/sighting";
import { SightingService } from "../shared/sighting.service";

export class SightingDataSource extends DataSource<any> {
    constructor(private sightingService: SightingService, private sort: MatSort, public loading: Boolean) {
      super();
    }

    connect(): Observable<Sighting[]> {
      return Observable.merge(this.sort.sortChange, this.sightingService.dataChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.sightingService.get();
        }),
        map(data => {
          this.loading = false;
          return this.sortData(data);
        })
      );
    }

    sortData(data: Sighting[]): Sighting[] {
      return data.sort((a, b) => {
        const isAsc = this.sort.direction === "asc";
        switch (this.sort.active) {
          case "dateTime": return compare(a.dateTime, b.dateTime, isAsc);
          default: return 0;
        }
      });
    }

    disconnect() {}
  }

  function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
