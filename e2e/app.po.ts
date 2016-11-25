import { browser, element, by } from 'protractor';

export class YummyChennaiPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('yc-root h1')).getText();
  }
}
