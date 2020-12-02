const {getDriver} = require('vl-ui-core').Test.Setup;
const VlHeaderPage = require('./pages/vl-header.page');

describe('vl-header', async () => {
  let vlHeaderPage;

  beforeEach(() => {
    vlHeaderPage = new VlHeaderPage(getDriver());
    return vlHeaderPage.load();
  });
});
