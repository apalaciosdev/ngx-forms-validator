import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators {
  
  public static onlyNumber(control: AbstractControl): ValidationErrors | null {
    return !control.value.toString().match("^[0-9]*$") ? { number: true } : null;
  }

  public static hasWhiteSpaceLine(control: AbstractControl): ValidationErrors | null {
    return /^\s*$/.test(control.value as string) && control.value.length > 0
      ? { whiteSpaceLine: true }
      : null;
  }

  public static introducedValueExists(datalist: any[], customError?: string): ValidatorFn {
    return (control: AbstractControl): {} => {
      if (!control.value || datalist.find((val: any) => val === control.value)) {
        return {};
      }

      if (customError) {
        return customError === 'none' ? { senseMissatge: true } : { [customError]: true };
      }

      return { valueNoExist: true };
    };
  }

  public static maxByte(maxLength: number): ValidatorFn {
    return (control: { value: BlobPart }): ValidationErrors | null => {
      const size = new Blob([control.value]).size;
      return size >= maxLength + 1 ? { maxlength: true } : null;
    };
  }
}