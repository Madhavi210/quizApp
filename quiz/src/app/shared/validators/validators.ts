import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function userNameValidator(minLength:number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: string = control.value;
        if(value && value.length < minLength) {
            return { usernameMinLength: { requiredLength: minLength, actualLength: value.length } };
        }
        return null;
    }
}

// Password complexity validator
export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
    //   const hasNumber = /\d/.test(value);
    //   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  
      const valid = hasUpperCase && hasLowerCase 
    //   && hasNumber && hasSpecialChar;
  
      if (!valid) {
        return { passwordComplexity: true };
      }
      return null;
    };
  }

// Email domain validator
export function emailDomainValidator(allowedDomains: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email: string = control.value;
      if (email) {
        const domain = email.substring(email.lastIndexOf('@') + 1);
        if (allowedDomains.indexOf(domain.toLowerCase()) === -1) {
          return { invalidEmailDomain: true };
        }
      }
      return null;
    };
  }
  
  // Confirm password match validator
  export function confirmPasswordValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordKey)?.value;
      const confirmPassword = group.get(confirmPasswordKey)?.value;
      if (password !== confirmPassword) {
        group.get(confirmPasswordKey)?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
      return null;
    };
  }