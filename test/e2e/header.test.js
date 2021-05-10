const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlHeaderPage = require('./pages/vl-header.page');

describe('vl-header', async () => {
  let vlHeaderPage;

  beforeEach(() => {
    vlHeaderPage = new VlHeaderPage(getDriver());
    return vlHeaderPage.load();
  });

  it('als gebruiker zie ik de globale header van Vlaanderen', async () => {
    const header = await vlHeaderPage.getHeader();
    await assert.eventually.isTrue(header.isDisplayed());
  });

  it('als gebruiker zie ik de globale header van Vlaanderen tot dat deze verwijderd wordt', async () => {
    const header = await vlHeaderPage.getHeader();
    await assert.eventually.isTrue(header.isDisplayed());
    await header.remove();
    let error = false;
    try {
      await assert.eventually.isFalse(header.isDisplayed());
    } catch (e) {
      error = true;
    }
    assert.isTrue(error);
  });
});
