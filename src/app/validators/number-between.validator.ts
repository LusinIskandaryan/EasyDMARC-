import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function numberBetween(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Allow empty values (can add `Validators.required` separately)
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const num = Number(value);

    if (isNaN(num) || num < min || num > max) {
      return { numberBetween: { min, max, actual: value } };
    }

    return null;
  };
}