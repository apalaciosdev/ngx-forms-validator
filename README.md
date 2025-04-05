<h1 align="center">NGX Forms Validator</h1>
<p align="center"><strong>Tiny, fast, and made for Angular Reactive Forms</strong></p>

<p align="center">
  <a href="https://www.npmjs.com/package/ngx-forms-validator">
    <img src="https://img.shields.io/npm/v/ngx-forms-validator?style=flat-square" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/ngx-forms-validator">
    <img src="https://img.shields.io/npm/dt/ngx-forms-validator?style=flat-square" alt="downloads">
  </a>
<!--   <a href="https://github.com/apalaciosdev/ngx-forms-validator">
    <img src="https://img.shields.io/github/stars/apalaciosdev/ngx-forms-validator?style=flat-square" alt="GitHub stars">
  </a> -->
</p>

<p align="center">
  <a href="https://ngx-forms-validator.netlify.app">📘 Docs</a> ·
  <a href="https://www.npmjs.com/package/ngx-forms-validator">📦 NPM</a> ·
  <a href="https://github.com/apalaciosdev/ngx-forms-validator">⭐ GitHub</a>
</p>

---

## ✨ Features

- 🚀 Lightweight and dependency-free
- 🎯 Focused on **Reactive Forms** for Angular
- 🌍 Multilingual support (English, Spanish, Esperanto)
- 🧩 Built-in custom validators
- 💬 Customizable error messages and styling
- 📏 Configurable behaviors like `markFieldsAsDirty` and `maxLengthWarning`

---

## 📦 Installation

Installing **NGX Forms Validator** is as simple as running a single command in your Angular project:

```bash
npm i ngx-forms-validator
```

Once installed, you're ready to import the library and start validating forms — no additional setup or dependencies required.

## ✅ Angular Compatibility

Supports Angular **14 and above** — fully compatible with the latest Angular versions.

---

## 🚀 Get Started

### 1. Set default language

```ts
import { TranslateService } from 'ngx-forms-validator';

constructor(private translateService: TranslateService) {
  this.translateService.setTranslationLanguaje('en_US');
}
```

### 2. Add validation service into your form

```ts
import { FormValidatorService } from 'ngx-forms-validator';

constructor(public formValidatorService: FormValidatorService) {}

ngOnInit(): void {
  this.form = this.formBuilder.group({
    name: ['', Validators.required]
  });

  this.formValidatorService.validateForm(this.form);
}
```

### 3. HTML structure

```html
<form [formGroup]="form">
  <div>
    <input id="name" name="name" formControlName="name" />
  </div>
</form>
```

### 4. Optional configuration

```ts
this.formValidatorService.validateForm(this.form, {
  markFieldsAsDirty: true,
  showMaxLengthWarning: true
});
```

---

## 🧪 Custom Literals

Create your own i18n literals and override the defaults:

```ts
export const customLiterals = {
  required: 'This field is required',
  email: 'Please enter a valid email'
};

this.translateService.setCustomTranslations(customLiterals);
```

---

## 🌐 Default Literals

Built-in support for:

- **en_US** (English)
- **es_ES** (Spanish)
- **eo_EO** (Esperanto)

---

## 🧱 Custom Validators

Use custom ones included in the lib:

```ts
onlyNumber → key: number
hasWhiteSpaceLine → key: whiteSpaceLine
hasLeadingWhiteSpace → key: whiteSpaceLine
hasTrailingWhiteSpace → key: whiteSpaceLine
introducedValueExists → key: introducedValueNoExist
maxByte → key: maxLength
```

Or create your own easily:

```ts
export class CustomValidators {
  public static noSpecialChars(control: AbstractControl): ValidationErrors | null {
    return /[^a-zA-Z0-9]/.test(control.value) ? { noSpecialChars: true } : null;
  }
}
```

Then add its literal key to your custom translations.

---

## 🎨 Styling Guide

To use the default styling, include the stylesheet in your `angular.json`:

```json
"styles": [
  "node_modules/ngx-forms-validator/styles/styles.scss"
]
```

You can override the styles using `.ok-field`, `.error-field`, `.warning-field`, etc.

---

## 🔔 Error Message Behavior

You can fine-tune how and when messages appear using:

- `markFieldsAsDirty`
- `showMaxLengthWarning`

---

## 🤝 Contribute

Found a bug or want to contribute? Open an issue or PR!

---

## 📄 License

MIT © [apalacios.dev](https://github.com/apalaciosdev)