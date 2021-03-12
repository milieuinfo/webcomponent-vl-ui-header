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
    return `${prefix}/${this._widgetUUID}`;
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
    vl.widget.client.bootstrap(this._widgetURL)
        .then((widget) => {
          widget.setMountElement(this);
          widget.mount().catch((e) => console.error(e));
          return widget;
        }).then((widget) => {
          widget.getExtension('citizen_profile.session').then((session) => {
            // session.login({type: 'switch-capacity'});
            session.configure({
              active: false,
              endpoints: {
                loginUrl: '/login',
                loginRedirectUrl: '/',
                logoutUrl: '/afgemeld',
                switchCapacityUrl: '/auth/openid-connect/switch-capacity',
              },
            });
          });
        })
        .catch((e) => console.error(e));
  }
}

