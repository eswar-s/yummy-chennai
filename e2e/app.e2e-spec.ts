import { YummyChennaiPage } from './app.po';

describe('yummy-chennai App', function() {
  let page: YummyChennaiPage;

  beforeEach(() => {
    page = new YummyChennaiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('yc works!');
  });
});
