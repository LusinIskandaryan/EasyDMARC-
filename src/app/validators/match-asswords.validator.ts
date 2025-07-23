import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswords(passwordField: string, confirmField: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordField)?.value;
    const confirm = formGroup.get(confirmField)?.value;

    if (password !== confirm) {
      formGroup.get(confirmField)?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      const confirmControl = formGroup.get(confirmField);
      if (confirmControl?.hasError('passwordMismatch')) {
        confirmControl.setErrors(null);
      }
    }

    return null;
  };
}