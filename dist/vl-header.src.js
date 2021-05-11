import {vlElement, define, awaitScript} from 'vl-ui-core';

awaitScript('vl-header-client', 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-polyfill/dist/index.js').then(() => {
  awaitScript('vl-header-polyfill', 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-client/dist/index.js').finally(() => {
    define('vl-header', VlHeader);
  });
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

  static get _observedAttributes() {
    return ['identifier'];
  }

  static get id() {
    return 'header';
  }

  static get header() {
    return document.getElementById(VlHeader.id);
  }

  disconnectedCallback() {
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  get _widgetURL() {
    const prefix = this._isDevelopment ? 'https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget' : 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/widget';
    return `${prefix}/${this._widgetUUID}`;
  }

  get _widgetUUID() {
    return this.dataset.vlIdentifier;
  }

  get _isDevelopment() {
    return this.hasAttribute('data-vl-development');
  }

  getHeaderTemplate() {
    return `<div id="${VlHeader.id}"></div>`;
  }

  _identifierChangedCallback(oldValue, newValue) {
    this.__addHeaderElement();
  }

  async __addHeaderElement() {
    if (!VlHeader.header) {
      document.body.insertAdjacentHTML('afterbegin', this.getHeaderTemplate());
    }

    this._observer = this.__observeHeaderElementIsAdded();
    vl.widget.client.bootstrap(this._widgetURL).then((widget) => {
      widget.setMountElement(VlHeader.header);
      widget.mount().catch((e) => console.error(e));
      return widget;
    }).then((widget) => {
      widget.getExtension('citizen_profile.session').then(async (session) => {
        session.configure({
          active: await this.__isUserAuthenticated,
          endpoints: {
            loginUrl: '/aanmelden',
            loginRedirectUrl: '/',
            logoutUrl: '/afgemeld',
            switchCapacityUrl: '/wissel_organisatie',
          },
        });
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  __observeHeaderElementIsAdded() {
    const isHeader = (node) => node.tagName === 'HEADER' || (node.childNodes && [...node.childNodes].some(isHeader));
    const observer = new MutationObserver((mutations, observer) => {
      const nodes = mutations.flatMap((mutation) => [...mutation.addedNodes]);
      if (nodes.some(isHeader)) {
        this.dispatchEvent(new CustomEvent(VlHeader.EVENTS.ready));
        observer.disconnect();
      }
    });
    observer.observe(VlHeader.header, {childList: true});
  }

  async __isUserAuthenticated() {
    const response = await fetch('/LoggedInUser');
    return response.status === 200;
  }
}

