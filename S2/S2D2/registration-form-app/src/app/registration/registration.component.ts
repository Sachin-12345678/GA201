import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Directive({
  selector: '[appPasswordStrengthValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordStrengthValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordStrengthValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;

    if (!value) {
      return null;
    }

    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasDigit = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value);

    const isPasswordValid = hasUppercase && hasLowercase && hasDigit && hasSpecialChar;

    if (!isPasswordValid) {
      return { passwordStrength: true };
    }

    return null;
  }
}


