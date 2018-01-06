import { async, TestBed } from "@angular/core/testing";
import { SightingService } from "./sighting.service";
import { TestsModule } from "../../shared/tests.module";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

describe("SightingService", () => {
  let sightingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule
      ],
      providers: [
        SightingService
      ]
    });

    sightingService = TestBed.get(SightingService);
  });

  it("should contain all sightings from in memory data service", async(() => {
    sightingService.get().subscribe((data: any) => {
      expect(data.length).toBe(2);
    });
  }));

  it("should create sighting", async(() => {
    sightingService.add({
      "id": "test",
      "species": "redneck"
    }).subscribe((response) => {
      expect(response.species).toEqual("redneck");
    });
  }));

  it("should fail creating empty sighting", async(() => {
    sightingService.add({}).subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it("should return json response error", async(() => {
    expect(sightingService.handleError(new Response("error"))).toEqual(jasmine.any(ErrorObservable));
  }));

  it("should return json response error", async(() => {
    expect(sightingService.handleError({})).toEqual(jasmine.any(ErrorObservable));
  }));
});
