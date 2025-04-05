import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  /**
   * Validates that the control value contains only numeric characters (0-9).
   * Empty values are considered valid.
   * 
   * @param control The form control to validate
   * @returns ValidationErrors with {number: true} if invalid, null if valid
   * @example
   * this.formGroup = this.fb.group({
   *   age: ['', [Validators.required, CustomValidators.onlyNumber]]
   * });
   */
  public static onlyNumber(control: AbstractControl): ValidationErrors | null {
    if (!control.value && control.value !== 0)  return null;
    
    const value = String(control.value);
    return /^[0-9]*$/.test(value) ? null : { number: true };
  }

  /**
   * Validates that the control value is not composed of only whitespace characters.
   * Empty values are considered valid.
   * 
   * @param control The form control to validate
   * @returns ValidationErrors with {whiteSpaceLine: true} if invalid, null if valid
   * @example
   * this.formGroup = this.fb.group({
   *   description: ['', [Validators.required, CustomValidators.hasWhiteSpaceLine]]
   * });
   */
  public static hasWhiteSpaceLine(control: AbstractControl): ValidationErrors | null {
    return /^\s*$/.test(control.value as string) && control.value.length > 0
      ? { whiteSpaceLine: true }
      : null;
  }

  /**
   * Validates that the control value exists within a provided list of valid values.
   * Empty values are considered valid.
   * 
   * @param datalist Array of valid values to check against
   * @param customError Optional custom error key to return instead of the default that is 'valueNoExist'
   *                    If set to 'none', no error message will be returned.
   * @returns A validator function that returns an error object if invalid, empty object if valid
   * @example
   * const allowedCities = ['New York', 'London', 'Tokyo'];
   * this.formGroup = this.fb.group({
   *   city: ['', [Validators.required, CustomValidators.introducedValueExists(allowedCities)]]
   * });
   */
  public static introducedValueExists(datalist: any[], customError?: string): ValidatorFn {
    return (control: AbstractControl): {} => {
      if (!control.value || datalist.find((val: any) => val === control.value)) {
        return {};
      }

      if (customError) {
        return customError === 'none' ? { withoutMessage: true } : { [customError]: true };
      }

      return { valueNoExist: true };
    };
  }

  /**
   * Validates that the control value does not start with a whitespace character.
   * 
   * @param control The form control to validate
   * @returns ValidationErrors with {whiteSpaceLine: true} if invalid, null if valid
   * @example
   * this.formGroup = this.fb.group({
   *   username: ['', [Validators.required, CustomValidators.hasLeadingWhiteSpace]]
   * });
   */
  public static hasLeadingWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if (control.value?.toString().charAt(0) === ' ') {
      return { whiteSpaceLine: true };
    } else {
      return null;
    }
  }

  /**
   * Validates that the control value does not end with a whitespace character.
   * 
   * @param control The form control to validate
   * @returns ValidationErrors with {whiteSpaceLine: true} if invalid, null if valid
   * @example
   * this.formGroup = this.fb.group({
   *   password: ['', [Validators.required, CustomValidators.hasTrailingWhiteSpace]]
   * });
   */
  public static hasTrailingWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if (control.value?.toString().charAt(control.value.toString().length - 1) === ' ') {
      return { whiteSpaceLine: true };
    } else {
      return null;
    }
  }
  
  /**
   * Validates that the size of the control value in bytes does not exceed the specified maximum.
   * Useful for validating file sizes or input lengths in bytes rather than characters.
   * 
   * @param maxLength Maximum allowed size in bytes
   * @returns A validator function that returns {maxlength: true} if size exceeds limit
   * @example
   * // Validate that a file input doesn't exceed 5MB
   * this.formGroup = this.fb.group({
   *   fileUpload: ['', [Validators.required, CustomValidators.maxByte(1024)]]
   * });
   */
  public static maxByte(maxLength: number): ValidatorFn {
    return (control: { value: BlobPart }): ValidationErrors | null => {
      const size = new Blob([control.value]).size;
      return size >= maxLength + 1 ? { maxlength: true } : null;
    };
  }
}