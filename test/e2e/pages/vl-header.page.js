const VlHeader = require('../components/vl-header');
const { Page } = require('vl-ui-core');
const { Config } = require('vl-ui-core');

class VlHeaderPage extends Page {
    async _getHeader(selector) {
        return new VlHeader(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-header.html');
    }
}

module.exports = VlHeaderPage;
