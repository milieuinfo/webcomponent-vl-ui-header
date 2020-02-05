const VlHeader = require('../components/vl-header');
const { Page, Config } = require('vl-ui-core').Test;

class VlHeaderPage extends Page {
    async getHeader() {
        return new VlHeader(this.driver);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-header.html');
    }
}

module.exports = VlHeaderPage;
