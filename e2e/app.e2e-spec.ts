import { OpentokNg2DemoPage } from './app.po';

describe('opentok-ng2-demo App', function() {
  let page: OpentokNg2DemoPage;

  beforeEach(() => {
    page = new OpentokNg2DemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
