const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlHeaderPage = require('./pages/vl-header.page');

describe('vl-header', async () => {
  let vlHeaderPage;

  beforeEach(() => {
    vlHeaderPage = new VlHeaderPage(getDriver());
    return vlHeaderPage.load();
  });

  const isDuringWorkingDays = () => {
    const today = new Date();
    const day = today.getDay();
    return day < 6;
  };

  const isDuringWorkingHours = () => {
    const today = new Date();
    const hours = today.getHours();
    return hours >= 8 && hours <= 18;
  };

  it('als gebruiker zie ik de globale header van Vlaanderen', async () => {
    if (isDuringWorkingDays() && isDuringWorkingHours()) { // DEV servers of AIV uptime check
      const header = await vlHeaderPage.getHeader();
      await assert.eventually.isTrue(header.isDisplayed());
    }
  });

  it('als gebruiker zie ik de globale header van Vlaanderen tot dat deze verwijderd wordt', async () => {
    if (isDuringWorkingDays() && isDuringWorkingHours()) { // DEV servers of AIV uptime check
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
    }
  });
});
