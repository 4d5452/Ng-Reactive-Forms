import { AbstractControl, ValidatorFn } from '@angular/forms';

/** Value must be member of an array */
export function isUniqueValidator(array: any[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    const no = array.indexOf(name);
    return no===-1 ? null : {'isUnique': {valid: false}};
  };
}