// form-validator.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from './translate.service';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
  private translations: any;

  constructor(private myTranslationService: TranslateService) {
    this.translations = this.myTranslationService.getTranslation();
  }
  

  public manageValidateErrors(form: any, marcarDirty?: any) {
    Object.keys(form.value).forEach((key) => {
      setTimeout(() => {
        if (marcarDirty) {
          form.controls[key] ? form.controls[key].markAsDirty() : null;
        }
        this.manageValidateFields(key, form);
      });
      if (key && !marcarDirty) {
        form.get(key)
          ? form.get(key).valueChanges.subscribe((value: any) => {
              setTimeout(() => {
                this.manageValidateFields(key, form);
              });
            })
          : null;
      }
    });
  }

  public manageValidateFields(key1: any, form: any) {
    let divTag = document.getElementById(key1)?.parentElement || null;

    let inputTag = document.getElementById(key1) as HTMLInputElement | null;
    let oldSpan = document.getElementById(`error-field-message-${key1}`);
    let warningMsg = document.getElementById(`warning-field-message-${key1}`);

    // Missatge a inserir
    let spanTag = document.createElement('span');
    spanTag.classList.add('error-field-message');
    spanTag.setAttribute('id', `error-field-message-${key1}`);

    let warningTag = document.createElement('span');
    warningTag.setAttribute('id', `warning-field-message-${key1}`);
    warningTag.classList.add('warning-field');

    oldSpan ? oldSpan.remove() : null;
    warningMsg ? warningMsg.remove() : null;

    if (inputTag && inputTag.nodeName !== 'TABLE' && inputTag.nodeName !== 'DIV') {
      if (form.controls[key1] && form.controls[key1].errors) {
        this.manageErrors(spanTag, key1, inputTag, form, divTag);
      } else {
        this.manageValid(spanTag, inputTag, warningTag, divTag, key1, form);
      }
    }
  }

  public manageErrors(spanTag: any, key1: any, inputTag: any, form: any, divTag: any) {
    spanTag.innerHTML = this.orderErrors(Object.keys(form.controls[key1].errors));

    if (form.controls[key1] && form.controls[key1].dirty) {
      divTag ? divTag.append(spanTag) : null;
      inputTag ? inputTag.classList.add('ng-dirty', 'ng-touched', 'error-field') : null;
      inputTag ? inputTag.classList.remove('ok-field') : null;
    } else {
      inputTag ? inputTag.classList.remove('ng-dirty', 'ok-field', 'ng-valid') : null;
    }
  }

  public manageValid(spanTag: any, inputTag: any, warningTag: any, divTag: any, key1: any, form: any) {
    spanTag.innerHTML = this.translations.required;

    if (inputTag && inputTag.maxLength && inputTag.maxLength === inputTag.value.length && inputTag.classList.contains('ng-touched') && inputTag.value) {
      //Mostra l'avís de que s'ha arribat als máxims caràcters permesos
      // this.checkMaxLength(warningTag, divTag, key1);
    }
    inputTag ? inputTag.classList.add('ok-field', 'ng-valid', 'ng-touched') : null;
    inputTag ? inputTag.classList.remove('error-field') : null;
  }

  public checkMaxLength(spanTag: any, divTag: any, key1: any) {
    spanTag.innerHTML = this.translations.maxlengthPermes;
    divTag.append(spanTag);
  }

  public orderErrors(errors: any) {
    if (errors.includes('required')) {
      return this.translations.required;
    } else if (errors.includes('whiteSpaceLine')) {
      return this.translations.whiteSpaceLine;
    }
    return this.translations[errors[0]];
  }
}
