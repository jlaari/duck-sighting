import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SightingListComponent } from "./sighting-list.component";
import { SightingService } from "../shared/sighting.service";
import { TestsModule } from "../../shared/tests.module";
import { MomentModule } from "angular2-moment";

describe("SightingListComponent", () => {
  let component: SightingListComponent;
  let fixture: ComponentFixture<SightingListComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        MomentModule,
      ],

      declarations: [ SightingListComponent ],
      providers: [ SightingService ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SightingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
