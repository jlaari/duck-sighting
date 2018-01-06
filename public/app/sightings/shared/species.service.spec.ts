import { async, TestBed } from "@angular/core/testing";
import { SpeciesService } from "./species.service";
import { TestsModule } from "../../shared/tests.module";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

describe("SpeciesService", () => {
  let speciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule
      ],
      providers: [
        SpeciesService
      ]
    });

    speciesService = TestBed.get(SpeciesService);
  });

  it("should contain all species from in memory data service", async(() => {
    speciesService.get().subscribe((data: any) => {
      expect(data.length).toBe(5);
    });
  }));

  it("should return json response error", async(() => {
    expect(speciesService.handleError(new Response("error"))).toEqual(jasmine.any(ErrorObservable));
  }));

  it("should return json response error", async(() => {
    expect(speciesService.handleError({})).toEqual(jasmine.any(ErrorObservable));
  }));
});
