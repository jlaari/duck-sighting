import { Component, OnInit} from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";

import { SpeciesService } from "../shared/species.service";
import { Species } from "../shared/species";
import { SightingService } from "../shared/sighting.service";
import { Sighting } from "../shared/sighting";

import * as moment from "moment";

@Component({
    templateUrl: "./sighting-add.component.html",
    styleUrls: [ "./sighting-add.component.css" ],
  })
  export class SightingAddComponent implements OnInit {
    newSightingForm: FormGroup;
    species: Species[];
    updating: Boolean;
    maxDate = new Date();

    constructor(
        private sightingService: SightingService,
        private speciesService: SpeciesService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<SightingAddComponent>) {
      }

    ngOnInit() {
        this.newSightingForm = this.formBuilder.group({
          "date": ["", [Validators.required]],
          "time": ["", [Validators.required]],
          "species": ["", [Validators.required]],
          "count": [1, [Validators.required, Validators.min(1)]],
          "description": ["", ""],
        }, {
          validator: inFuture("date", "time")
        });

      this.speciesService.get().subscribe((species: Array<Species>) => {
        this.species = species;
      });
    }

    onCancelClicked(): void {
      this.dialogRef.close();
    }

    createNewSighting(params): void {
        this.updating = true;

        const date =  new Date(
          params.date.year(),
          params.date.month(),
          params.date.date(),
          params.time.split(":")[0],
          params.time.split(":")[1],
        );

        const sighting = new Sighting(params.species, params.description, date.toISOString(), params.count);
        this.sightingService.add(sighting).subscribe(() => {
          this.updating = false;
          this.dialogRef.close();
        });
    }
  }

export const inFuture = (dateControlName, timeControlName): ValidatorFn => (control: AbstractControl) => {
    const date = control.get(dateControlName).value;
    const time = control.get(timeControlName).value;

    if (date && time) {
      const dateTime = moment(new Date(
        date.year(),
        date.month(),
        date.date(),
        time.split(":")[0],
        time.split(":")[1],
      ));
      const current = moment();
      if (dateTime.isAfter(current)) {
        return  { inFuture: { valid: false } };
      }
    }

    return null;
};
