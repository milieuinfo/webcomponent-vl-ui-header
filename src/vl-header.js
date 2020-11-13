import {vlElement, define, awaitScript} from '/node_modules/vl-ui-core/dist/vl-core.js';

awaitScript('vl-header', 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-polyfill/dist/index.js').then(() => {
  define('vl-header', VlHeader);
}).catch(() => {
  define('vl-header', VlHeader);
});

/**
 * VlHeader
 * @class
 * @classdesc De Vlaanderen header.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {string} data-vl-identifier - De header identifier die gebruikt wordt om bij AIV de header op te halen.
 * @property {string} data-vl-development - Attribuut geeft aan dat de AIV ontwikkel servers gebruikt moeten worden.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-header/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-header/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-header.html|Demo}
 *
 */
export class VlHeader extends vlElement(HTMLElement) {
  static get EVENTS() {
    return {
      ready: 'ready',
    };
  }
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
    const prefix = this._isDevelopment ? 'https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget' : 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/widget';
    return `${prefix}/${this._widgetUUID}/embed`;
  }

  get _widgetUUID() {
    return this.dataset.vlIdentifier;
  }

  get _isDevelopment() {
    return this.hasAttribute('data-vl-development');
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
        }).then((code) => this.__executeCode(code)).catch((error) => console.error(error));
  }

  __executeCode(code) {
    if (!VlHeader.header) {
      document.body.insertAdjacentHTML('afterbegin', this.getHeaderTemplate());
    }
    this.__observeHeaderElementIsAdded();
    eval(code.replace(/document\.write\((.*?)\);/, 'document.getElementById("' + VlHeader.id + '").innerHTML = $1;'));
  }

  __observeHeaderElementIsAdded() {
    const target = document.querySelector('#' + VlHeader.id);
    const headerObserver = new MutationObserver((mutations, observer) => this.__headerObserverCallback(mutations, observer));
    headerObserver.observe(target, {childList: true});
  }

  __headerObserverCallback(mutations, observer) {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        if ( this.__headerElementIsToegevoegd(mutation.addedNodes)) {
          this.dispatchEvent(new CustomEvent(VlHeader.EVENTS.ready));
          observer.disconnect();
        }
      }
    });
  }

  __headerElementIsToegevoegd(toegevoegdeNodes) {
    return this.__eenVanDeNodesBevatElement(toegevoegdeNodes, 'HEADER');
  }

  __eenVanDeNodesBevatElement(nodeList, element) {
    if (nodeList) {
      return Array.from(nodeList).some((node) => {
        return this.__nodeIsElementOfHeeftElementAlsChild(node, element);
      });
    }
    return false;
  }

  __nodeIsElementOfHeeftElementAlsChild(node, element) {
    return node.tagName === element || this.__eenVanDeNodesBevatElement(node.childNodes, element);
  }
}

define('vl-header', VlHeader);
