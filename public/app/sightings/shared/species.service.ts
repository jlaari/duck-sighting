import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";

import { Species } from "./species";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class SpeciesService {

  private speciesUrl = "species";

  constructor(
    private http: HttpClient) { }

  get (): Observable<Species[]> {
    return this.http.get<Species[]>(this.speciesUrl).map(response => {
      return response;
    })
    .catch(error => this.handleError(error));
  }

  private handleError(error: any) {
    if (error instanceof Response) {
      return Observable.throw(error.json()["error"] || "backend server error");
    }
    return Observable.throw("backend server error");
  }

}
