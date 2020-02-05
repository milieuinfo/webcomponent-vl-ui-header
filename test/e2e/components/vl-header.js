const { VlElement } = require('vl-ui-core').Test;
const { By, until } = require('selenium-webdriver');

class VlHeader extends VlElement {  
    constructor(driver) {
        const identifier = '#vl-global-header';
        return (async () => {
            await driver.wait(until.elementLocated(By.css(identifier)));
            return super(driver, identifier);
        })();
    }
}

module.exports = VlHeader;
