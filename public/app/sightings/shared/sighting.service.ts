import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";

import { Sighting } from "./sighting";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class SightingService {

  dataChange: Observable<any>;
  private dataChangeSubject = new Subject<any>();
  private sightingsUrl = "sightings";

  constructor(
    private http: HttpClient) {
      this.dataChange = this.dataChangeSubject.asObservable();
    }

  get (): Observable<Sighting[]> {
    return this.http.get<Sighting[]>(this.sightingsUrl).map(response => {
      return response;
    })
    .catch(error => this.handleError(error));
  }

  add (Sighting: Sighting): Observable<Sighting> {
    return this.http.post<Sighting>(this.sightingsUrl, Sighting, httpOptions)
    .pipe(
      tap(() => this.dataChangeSubject.next(true))
    ).catch(error => this.handleError(error));
  }

  private handleError(error: any) {
    if (error instanceof Response) {
      return Observable.throw(error.json()["error"] || "backend server error");
    }
    return Observable.throw("backend server error");
  }
}
