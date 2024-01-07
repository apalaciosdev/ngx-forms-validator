##[Official Docs](https://ngx-forms-validator.netlify.app/)
![NPM Downloads](https://img.shields.io/npm/dw/ngx-forms-validator) ![NPM License](https://img.shields.io/npm/l/ngx-forms-validator)

<h1 align="center">ngx-forms-validator</h1>
<p align="center">Useful forms validator for Angular</p>

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Custom Validators]()
- [Code Demo](https://github.com/apalaciosdev/demo-ngx-forms-validator)


## Installation

1. Use npm to install the package

```terminal
$ npm install ngx-forms-validator --save
```

2. You could either add into your file `angular.json` the next `styles` property

```json
"styles": [
  "node_modules/ngx-forms-validator/styles/styles.scss"
],
```


## Usage

### 1. Add validation service into your initForm
First, add these two properties into your constructor
```typescript
import { CustomValidators, FormValidatorService } from 'ngx-forms-validator';

constructor(
  public formBuilder: FormBuilder,
  public nxgFormsValidatorService : FormValidatorService
) { }
```

After, you can add `nxgFormsValidatorService.manageValidateErrors` after declare your form
```typescript
this.exampleForm = this.formBuilder.group({
  name: [this.exampleData.name, [Validators.required]],
  surname: [this.exampleData.surname, [Validators.required]],
  years: [this.exampleData.years, [Validators.required]],
});
  
this.nxgFormsValidatorService.manageValidateErrors(this.exampleForm);
```

### 2. HTML structure
**Important** to add each input within a unique and personalized **div** for each one.

Also, it is necessary to add the same `id` and `name` as the name assigned to the `formControlName`

```html
<form [formGroup]="exampleForm" class="exampleForm" *ngIf="exampleData">
  <span>Name</span>
  <div>
    <input type="text" name="name" id="name" formControlName="name">
  </div>

  <span>Surname</span>
  <div class="width40">
    <input type="text" name="surname" id="surname" formControlName="surname">
  </div>
</form>  
```

### 3. Set default language
Go to the `app.component` file and add these properties to the constructor
```typescript 
import { TranslateService } from 'ngx-forms-validator';

constructor(private translateService: TranslateService) {
  this.translateService.setTranslationLanguaje('es_ES');
}
```
You can also see [Available languages](#availableLanguages) that come by default in the library (es_ES & en_US).

### 4. Add your custom literals (optional)
First create a TS file that contains all your literals.

You can name it with the name you want.
```typescript
export const customLiterals = { 
  requiredGraterThan0: 'The numeric field must be greater than 0', 
  malformedField: 'Malformed field', 
  required: 'Field is required', 
  email: 'Incorrect format', 
};
```

Then, add your literals in your `app.component` constructor.
```typescript 
import { customLiterals } from 'src/assets/i18n/en_US';

constructor(private translateService: TranslateService) {
  this.translateService.setCustomTranslations(customLiterals);
}
```

The priority literals will be your custom literals.

If you don't like a literal that comes by default in the library, you can change its value by adding it to your custom literals file.

See the [literals](#defaultLiterals) that come by default in the library.

## Custom Validators
In addition to the Validators that Angular provides us, you can create and use your own `Custom Validators`.

In this example we are using `CustomValidators.hasWhiteSpaceLine`, that is already implemented in the library
```typescript
this.exampleForm = this.formBuilder.group({
    name: [this.exampleData.name, [Validators.required, CustomValidators.hasWhiteSpaceLine]],
    surname: [this.exampleData.surname, [Validators.required, CustomValidators.hasWhiteSpaceLine]],
    years: [this.exampleData.years, [Validators.required]],
  });
```

You can also see the [Custom Validators](#defaultCustomValidators) that come by default in the library.



<h2 id="availableLanguages">Available Languages</h2>
- es_ES
- en_US

<h2 id="defaultLiterals">Default literals</h2>
es_ES

  - `requiredGraterThan0`: 'El campo numérico tiene que ser mayor a 0'
  - `malformedField`: 'Formato del campo incorrecto'
  - `required`: 'El campo es obligatorio'
  - `email`: 'Formato incorrecto'
  - `pattern`: 'Formato incorrecto'
  - `whiteSpaceLine`: 'Formato incorrecto'
  - `maxlength`: 'Has excedido el máximo de caracteres'
  - `minlength`: 'Formato incorrecto'
  - `invalid`: 'Formato incorrecto'
  - `maxlengthPermes`: 'Has llegado al máximo de caracteres'
  - `valueNoExist`: 'El valor introducido no existe en la lista'
  - `introducedValueNoExist`: 'El requisito no existe'
  - `number`: 'El campo tiene que ser numérico

en_US
  - `requiredGraterThan0`: 'The numeric field must be greater than 0'
  - `malformedField`: 'Malformed field'
  - `required`: 'Field is required'
  - `email`: 'Incorrect format'
  - `pattern`: 'Incorrect format'
  - `whiteSpaceLine`: 'Incorrect format'
  - `maxlength`: 'You have exceeded the maximum number of characters'
  - `minlength`: 'Incorrect format'
  - `invalid`: 'Incorrect format'
  - `maxlengthPermes`: 'You have reached the maximum number of characters'
  - `valueNoExist`: 'The entered value does not exist in the list'
  - `introducedValueNoExist`: 'The requirement does not exist'
  - `number`: 'The field must be numeric

<h2 id="defaultCustomValidators">Default Custom Validators</h2>

  - `onlyNumber`: Only numbers are allowed
  - `hasWhiteSpaceLine`: Input cannot be empty or contain only white spaces
  - `introducedValueExists(array, string?)`: Passing an array as a parameter, the existence of the value is checked. If it doesn't exist, an error is generated 
  (Also, if you put 'none' as the second parameter, no error message will be displayed. Only the input will be highlighted in red. This param is optional)
  ```typescript
   name: [this.exampleData.name, [Validators.required, CustomValidators.introducedValueExists(['John', 'Alicia'], 'none')]],
  ```
  - `maxByte(number)`: Maximum allowed number of bytes.
  

