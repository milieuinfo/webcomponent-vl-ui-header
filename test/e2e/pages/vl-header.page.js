const VlHeader = require('../components/vl-header');
const {Page, Config} = require('vl-ui-core').Test;

class VlHeaderPage extends Page {
  async getHeader() {
    return new VlHeader(this.driver);
  }

  async load() {
    await this.driver.get(Config.baseUrl + '/demo/vl-header.html');
    await this.driver.manage().window().maximize();
  }
}

module.exports = VlHeaderPage;
