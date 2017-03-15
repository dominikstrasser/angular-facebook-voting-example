import { FbPollingPage } from './app.po';

describe('fb-polling App', function() {
  let page: FbPollingPage;

  beforeEach(() => {
    page = new FbPollingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
