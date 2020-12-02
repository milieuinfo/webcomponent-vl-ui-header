const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlHeaderPage = require('./pages/vl-header.page');
const fetchMock = require('fetch-mock');

describe('vl-header', async () => {
  let vlHeaderPage;
  fetchMock.mock('https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget/59188ff6-662b-45b9-b23a-964ad48c2bfb/embed', `!function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}var t=e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e();document.write('<div id="'+t+'" style="display:none;"></div>');var i=document.getElementById(t);function n(e,t){e.bootstrap(t.pluginRuntime.configUrl,t.pluginContext).then(function(e){e.setMountElement(i).mount()})}var a={pluginRuntime:{configUrl:"https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/system/config",platformUrl:"https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-platform-browser/dist/index.min.js"},pluginContext:{id:"59188ff6-662b-45b9-b23a-964ad48c2bfb",pluginModule:"@govflanders/vl-widget-plugin-global-header",pluginTypeId:"global_header",alert:{enabled:!1,message:null,modifier:null},branding:{level:2,colors:{primary:"#FFE615",functional:"#0055CC"},umbrella:{label:"Vlaanderen",href:"/"},host:{label:"Departement Omgeving (test)",href:"/",target:null},progressBar:!0},extensions:[{pluginModule:"@govflanders/vl-widget-ext-tracker",pluginTypeId:"tracker",defaultTrackerId:"UA-32317403-4",defaultEventCategory:"FlemishAuthorities.InfolijnWidget.GlobalHeader"},{pluginModule:"@govflanders/vl-widget-ext-citizen-profile",pluginTypeId:"citizen_profile",baseUrl:"https://tni.frontend.burgerprofiel.dev-vlaanderen.be",notification:{serviceEndpoints:{listServiceUrl:"https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/notification/list",markAsReadServiceUrl:"https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/notification/:id/mark"}},session:{heartbeatInterval:60,inactivityTimeout:300,sessionChannelReconnectInterval:5,serviceTimeout:30,application:{id:"00000000-0000-0000-0000-000000000000",sessionSupport:!1,endpoints:null},serviceEndpoints:{acquireServiceUrl:"https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/session/acquire",releaseServiceUrl:"https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/session/release",loginServiceUrl:"https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/session/login",logoutServiceUrl:"https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/session/logout",validateServiceUrl:"https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/session/validate",heartbeatServiceUrl:"https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/session/heartbeat",sessionChannelServiceUrl:"wss://authenticatie-ti.vlaanderen.be/status",profileServiceUrl:"https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/profile",profilePhotoServiceUrl:"https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/profile/photo"}}},{pluginModule:"@govflanders/vl-widget-ext-contact",pluginTypeId:"contact",defaultContext:"vlaanderen",serviceEndpoints:{channels:"https://staging.contactapi.cc.vlaanderen.be/api/v1/contacten",sendEmail:"https://staging.contactapi.cc.vlaanderen.be/api/v1/contact/mail",requestCallMe:"https://staging.contactapi.cc.vlaanderen.be/api/v1/contact/call",chatCsat:"https://staging.frontend.cc.vlaanderen.be/csat",chatSocket:"https://staging.chat.cc.vlaanderen.be"}}]}};if(void 0!==window.vl&&void 0!==window.vl.widget&&void 0!==window.vl.widget.platform)n(vl.widget.platform,a);else{window.addEventListener("vl.widget.platform",function(e){n(e.detail,a)});var r=document.createElement("script");r.type="text/javascript",r.src=a.pluginRuntime.platformUrl,document.getElementsByTagName("head")[0].appendChild(r)}}();`);
  fetchMock.mock('https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget/0337f8dc-3266-4e7a-8f4a-95fd65189e5b/embed', `!function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}var n=e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e();document.write('<div id="'+n+'" style="display:none;"></div>');var l=document.getElementById(n);function i(e,n){e.bootstrap(n.pluginRuntime.configUrl,n.pluginContext).then(function(e){e.setMountElement(l).mount()})}var t={pluginRuntime:{configUrl:"https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/system/config",platformUrl:"https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-platform-browser/dist/index.min.js"},pluginContext:{id:"0337f8dc-3266-4e7a-8f4a-95fd65189e5b",pluginModule:"@govflanders/vl-widget-plugin-global-footer",pluginTypeId:"global_footer",branding:{level:2,colors:{primary:"#FFE615",functional:"#0055CC"}},languageLinks:[{langcode:"nl",label:"Nederlands",href:"/",target:null}],navigationLinks:[{label:"Over Vlaanderen.be",href:"/over-vlaanderenbe"},{label:"Disclaimer",href:"/disclaimer"},{label:"Cookieverklaring",href:"/cookieverklaring"},{label:"Toegankelijkheid",href:"/toegankelijkheid"}],siteInfo:{title:"Vlaanderen.be is de officiële website van de Vlaamse overheid",subTitleItems:[{type:"text",label:"uitgegeven door Informatie Vlaanderen"}]},umbrella:{src:"https://tni.widgetconfigservice.burgerprofiel.dev-vlaanderen.be/api/v1/asset/logo/vlaanderen-logo.svg",srcSet:[],alt:"logo Vlaanderen"}}};if(void 0!==window.vl&&void 0!==window.vl.widget&&void 0!==window.vl.widget.platform)i(vl.widget.platform,t);else{window.addEventListener("vl.widget.platform",function(e){i(e.detail,t)});var a=document.createElement("script");a.type="text/javascript",a.src=t.pluginRuntime.platformUrl,document.getElementsByTagName("head")[0].appendChild(a)}}();`);
  fetchMock.restore();

  beforeEach(() => {
    vlHeaderPage = new VlHeaderPage(getDriver());
    return vlHeaderPage.load();
  });

  it('als gebruiker zie ik de globale header van Vlaanderen', async () => {
    const header = await vlHeaderPage.getHeader();
    await assert.eventually.isTrue(header.isDisplayed());
  });

  it('als gebruiker zie ik de globale header van Vlaanderen tot dat deze verwijderd wordt', async () => {
    const header = await vlHeaderPage.getHeader();
    await assert.eventually.isTrue(header.isDisplayed());
    await header.remove();
    let error = false;
    try {
      await assert.eventually.isFalse(header.isDisplayed());
    } catch (e) {
      error = true;
    }
    assert.isTrue(error);
  });
});
