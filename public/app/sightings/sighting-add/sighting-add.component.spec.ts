import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogRef } from "@angular/material";

import { Observable } from "rxjs/Observable";
import { catchError, map, tap } from "rxjs/operators";
import "rxjs/add/observable/of";

import { SightingAddComponent } from "./sighting-add.component";
import { SightingService } from "../shared/sighting.service";
import { SpeciesService } from "../shared/species.service";
import { TestsModule } from "../../shared/tests.module";
import { Species } from "../shared/species";
import { Sighting } from "../shared/sighting";

import * as moment from "moment";

describe("SightingAddComponent", () => {
    let component: SightingAddComponent;
    let fixture: ComponentFixture<SightingAddComponent>;
    const mockSightingService = jasmine.createSpyObj("mockSightingService", ["add"]);
    const mockSpeciesService = jasmine.createSpyObj("mockSpeciesService", ["get"]);
    const mockDialogRef = jasmine.createSpyObj("mockDialogRef", ["close"]);

    mockSpeciesService.get.and.returnValue(Observable.of(false));
    mockSightingService.add.and.returnValue(Observable.of(false));

    beforeEach(async(() => {

      TestBed.configureTestingModule({
        imports: [
          TestsModule
        ],
        declarations: [ SightingAddComponent ],
        providers: [
          { provide: SightingService, useValue: mockSightingService },
          { provide: SpeciesService, useValue: mockSpeciesService },
          { provide: MatDialogRef, useValue: mockDialogRef }
        ],

      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SightingAddComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should be created", () => {
      expect(component).toBeTruthy();
    });

    it("should contain species", () => {
      const species: Array<Species> = [
        new Species(),
        new Species(),
        new Species()
      ];

      mockSpeciesService.get.and.returnValue(Observable.of(species));

      component.ngOnInit();

      expect(component.species.length).toBe(3);
    });

    it("should add new sighting", () => {
      component.createNewSighting({species: "specie", description: "description", time: "18:00", date: moment("2018-01-01"), count: 12});

      expect(mockSightingService.add).toHaveBeenCalledWith(jasmine.any(Sighting));
    });
  });
