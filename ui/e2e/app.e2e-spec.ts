import { KarmasocWebPage } from './app.po';

describe('karmasoc-web App', function() {
  let page: KarmasocWebPage;

  beforeEach(() => {
    page = new KarmasocWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
