// my-translation.service.ts
import { Injectable } from '@angular/core';
import { translationEsEs } from '../assets/i18n/es_ES';
import { translationEnUs } from '../assets/i18n/en_US';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {

  private translations: any | undefined
  private customTranslations: Record<string, Record<string, string>> | undefined;
  
  public setCustomTranslations(translations: any) {
    this.customTranslations = translations;
  }

  public setTranslationLanguaje(lang: string) {
    switch (lang) {
      case "es_ES":
        this.translations = translationEsEs;
        break;
    
      case "en_US":
        this.translations = translationEnUs;
        break;
    
      default:
        break;
    }
  }

  public getTranslation() {
    return { ...this.translations, ...this.customTranslations };
  }
}
