const {VlElement} = require('vl-ui-core').Test;
const {By, until} = require('selenium-webdriver');

class VlHeader extends VlElement {
  constructor(driver) {
    const identifier = '#vl-global-header';
    return (async () => {
      await driver.wait(until.elementLocated(By.css(identifier)));
      return super(driver, identifier);
    })();
  }

  async remove() {
    return this.driver.executeScript('return arguments[0].remove()', this);
  }
}

module.exports = VlHeader;
