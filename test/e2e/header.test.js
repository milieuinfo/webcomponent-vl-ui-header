const {assert, driver} = require('vl-ui-core').Test.Setup;
const VlHeaderPage = require('./pages/vl-header.page');

describe('vl-header', async () => {
  const vlHeaderPage = new VlHeaderPage(driver);

  before(() => {
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
});
