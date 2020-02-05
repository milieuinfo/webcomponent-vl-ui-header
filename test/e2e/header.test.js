
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlHeaderPage = require('./pages/vl-header.page');

describe('vl-header', async () => {
    const vlHeaderPage = new VlHeaderPage(driver);

    before(() => {
        return vlHeaderPage.load();
    });

    it('als gebruiker zie ik de globale header van Vlaanderen', async () => {
        const header = await vlHeaderPage.getHeader();
        await assert.eventually.isTrue(header.isDisplayed());
    });
});
