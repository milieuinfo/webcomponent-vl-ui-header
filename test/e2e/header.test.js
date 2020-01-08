
const { assert, driver } = require('vl-ui-core').Test;
const VlHeaderPage = require('./pages/vl-header.page');

describe('vl-header', async () => {
    const vlHeaderPage = new VlHeaderPage(driver);

    before(() => {
        return vlHeaderPage.load();
    });

});
