import { VlElement, define } from 'vl-ui-core';
import 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-polyfill/dist/index.js';

/**
 * VlHeader
 * @class
 * @classdesc De Vlaanderen header.
 * 
 * @extends VlElement
 * 
 * @property {string} data-vl-identifier - De header identifier die gebruikt wordt om bij AIV de header op te halen.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-header/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-header/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-header.html|Demo}
 * 
 */
export class VlHeader extends VlElement(HTMLElement) {
    constructor() {
        super();
        this.__addHeaderElement();
    }

    static get id() {
        return 'header';
    }

    static get header() {
        return document.getElementById(VlHeader.id);
    }

    get _widgetURL() {
        return 'https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget/' + this._widgetUUID + '/embed';
    }

    get _widgetUUID() {
        return this.dataset.vlIdentifier;
    }

    getHeaderTemplate() {
        return `
            <div id="${VlHeader.id}"></div>
        `;
    }

    __addHeaderElement() {
        fetch(this._widgetURL)
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw Error(`Response geeft aan dat er een fout is: ${response.statusText}`);
                }
            }).then((code) => this.__executeCode(code)).catch(error => console.error(error));
    }

    __executeCode(code) {
        if (!VlHeader.header) {
            document.body.insertAdjacentHTML('afterbegin', this.getHeaderTemplate());
        }
        eval(code.replace(/document\.write\((.*?)\);/, 'document.getElementById("' + VlHeader.id + '").innerHTML = $1;'));
    }
}

define('vl-header', VlHeader);

