import { FurrilyPage } from './app.po';

describe('furrily App', function() {
  let page: FurrilyPage;

  beforeEach(() => {
    page = new FurrilyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
