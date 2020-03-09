import { ValidatorFn, AbstractControl } from '@angular/forms';

export function minLength(min: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value == null) {
      return { min: { min } };
    }
    const isValid = control.value.trim().length >= min;
    return isValid ? null : { min: { min } };
  };
}