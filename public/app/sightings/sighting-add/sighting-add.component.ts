import { Component, OnInit} from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { SpeciesService } from "../shared/species.service";
import { Species } from "../shared/species";
import { SightingService } from "../shared/sighting.service";
import { Sighting } from "../shared/sighting";
import { FutureValidator } from "../../shared/future.validator";

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
          "time": ["", [Validators.required, Validators.pattern("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")]],
          "species": ["", [Validators.required]],
          "count": [1, [Validators.required, Validators.min(1)]],
          "description": ["", ""],
        }, {
          validator: FutureValidator("date", "time")
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
