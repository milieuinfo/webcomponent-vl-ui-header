import { VlElement, define } from '/node_modules/vl-ui-core/vl-core.js';
import 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-polyfill/dist/index.js';

/**
 * VlHeader
 * @class
 * @classdesc De Vlaanderen header.
 * 
 * @extends VlElement
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
        return {
            'localhost:8080': '59188ff6-662b-45b9-b23a-964ad48c2bfb',
            'localhost:8081': '59188ff6-662b-45b9-b23a-964ad48c2bfb',
            'localhost:9000': '59188ff6-662b-45b9-b23a-964ad48c2bfb'
        }[window.location.host];
    }

    getHeaderTemplate() {
        return `
            <div id="${VlHeader.id}"></div>
        `;
    }

    __addHeaderElement() {
        fetch(this._widgetURL)
            .then((response) => {
                return response.text();
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
