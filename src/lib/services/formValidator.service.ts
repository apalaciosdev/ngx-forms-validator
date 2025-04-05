import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { TranslateService } from './translate.service';

/**
 * Configuration options for form validation
 */
interface ValidationOptions {
  /**
   * When true, displays a warning message when an input reaches its maximum length.
   * This helps users know they've reached the character limit for a field.
   * Default: false
   */
  showMaxLengthWarning?: boolean;
  
  /**
   * When true, immediately marks all form controls as "dirty", causing validation
   * errors to display right away without waiting for user interaction.
   * Use this when you want to show all validation errors at once, such as after
   * a form submission attempt.
   * Default: false
   */
  markFieldsAsDirty?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
  private translations: Record<string, string>;

  constructor(private translationService: TranslateService) {
    this.translations = this.translationService.getTranslation();
  }

 /**
   * Sets up form validation with visual feedback for all controls in the form
   * 
   * @param form The Angular FormGroup to validate
   * @param options Configuration options:
   *   - markFieldsAsDirty: When true, immediately shows all validation errors without waiting for user interaction
   *   - showMaxLengthWarning: When true, shows a warning when an input field reaches its maximum character length
   */
  public validateForm(form: FormGroup, options: ValidationOptions = {}): void {
    const { showMaxLengthWarning = false, markFieldsAsDirty = false } = options;

    Object.keys(form.value).forEach((controlName) => {
      const control = form.get(controlName);
      if (!control) return;

      setTimeout(() => {
        if (markFieldsAsDirty) {
          control.markAsDirty();
        }
        this.validateField(controlName, form);
      });

      if (!markFieldsAsDirty) {
        control.valueChanges.subscribe(() => {
          setTimeout(() => {
            this.validateField(controlName, form, showMaxLengthWarning);
          });
        });
      }
    });
  }

  /**
   * Validates a single form field and updates UI accordingly
   * @param controlName Form control name
   * @param form The form containing the control
   * @param showMaxLengthWarning Whether to show warning when max length is reached
   */
  public validateField(controlName: string, form: FormGroup, showMaxLengthWarning = false): void {
    const control = form.get(controlName);
    if (!control) return;

    const parentElement = document.getElementById(controlName)?.parentElement || null;
    const inputElement = document.getElementById(controlName) as HTMLInputElement | null;
    
    if (!inputElement || inputElement.nodeName === 'TABLE' || inputElement.nodeName === 'DIV') {
      return;
    }

    // Remove existing validation messages
    this.removeExistingMessages(controlName);

    // Create new message elements
    const errorElement = this.createMessageElement(controlName, 'error-field-message');
    const warningElement = this.createMessageElement(controlName, 'warning-field', 'warning');

    // Process validation based on control state
    if (control.errors) {
      this.handleErrorState(errorElement, controlName, inputElement, form, parentElement);
    } else {
      this.handleValidState(errorElement, inputElement, warningElement, parentElement, controlName, form, showMaxLengthWarning);
    }
  }

  /**
   * Creates a message element for validation feedback
   */
  private createMessageElement(controlName: string, className: string, type = 'error'): HTMLSpanElement {
    const element = document.createElement('span');
    element.classList.add(className);
    element.setAttribute('id', `${type}-field-message-${controlName}`);
    return element;
  }

  /**
   * Removes existing validation messages for a control
   */
  private removeExistingMessages(controlName: string): void {
    const errorMessage = document.getElementById(`error-field-message-${controlName}`);
    const warningMessage = document.getElementById(`warning-field-message-${controlName}`);
    
    if (errorMessage) errorMessage.remove();
    if (warningMessage) warningMessage.remove();
  }

  /**
   * Handles the display of validation errors
   */
  public handleErrorState(errorElement: HTMLSpanElement, controlName: string, inputElement: HTMLInputElement, 
                         form: FormGroup, parentElement: HTMLElement | null): void {
    const control = form.get(controlName);
    if (!control || !control.errors) return;

    errorElement.innerHTML = this.getErrorMessage(Object.keys(control.errors));

    if (control.dirty) {
      if (parentElement) parentElement.append(errorElement);
      
      if (inputElement) {
        inputElement.classList.add('ng-dirty', 'ng-touched', 'error-field');
        inputElement.classList.remove('ok-field');
      }
    } else if (inputElement) {
      inputElement.classList.remove('ng-dirty', 'ok-field', 'ng-valid');
    }
  }

  /**
   * Handles the display of valid state and max length warnings
   */
  public handleValidState(errorElement: HTMLSpanElement, inputElement: HTMLInputElement, warningElement: HTMLSpanElement,
                         parentElement: HTMLElement | null, controlName: string, form: FormGroup, 
                         showMaxLengthWarning = false): void {
    errorElement.innerHTML = this.translations['required'];

    // Show max length warning if enabled and condition is met
    if (showMaxLengthWarning && this.isMaxLengthReached(inputElement)) {
      this.displayMaxLengthWarning(warningElement, parentElement, controlName);
    }

    if (inputElement) {
      inputElement.classList.add('ok-field', 'ng-valid', 'ng-touched');
      inputElement.classList.remove('error-field');
    }
  }

  /**
   * Checks if input has reached its maximum length
   */
  private isMaxLengthReached(inputElement: HTMLInputElement | null): boolean {
    return !!(
      inputElement && 
      inputElement.maxLength && 
      inputElement.value && 
      inputElement.maxLength === inputElement.value.length && 
      inputElement.classList.contains('ng-touched')
    );
  }

  /**
   * Displays max length warning message
   */
  public displayMaxLengthWarning(warningElement: HTMLSpanElement, parentElement: HTMLElement | null, controlName: string): void {
    warningElement.innerHTML = this.translations['maxLengthWarning'];
    if (parentElement) parentElement.append(warningElement);
  }

  /**
   * Prioritizes and returns the appropriate error message
   */
  public getErrorMessage(errors: string[]): string {
    if (errors.includes('required')) {
      return this.translations['required'];
    } else if (errors.includes('whiteSpaceLine')) {
      return this.translations['whiteSpaceLine'];
    }
    return this.translations[errors[0]] || 'Invalid value';
  }
}