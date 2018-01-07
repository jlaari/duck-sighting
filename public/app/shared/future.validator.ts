import * as moment from "moment";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";

export const FutureValidator = (dateControlName, timeControlName): ValidatorFn => (control: AbstractControl) => {
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
        return  { future: { valid: false } };
      }
    }

    return null;
};
