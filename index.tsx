//Develop
/* global document */
//localhost:3500/devTest.html

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import uuidv4 from 'uuid/v4'
import moment from 'moment'

import 'C:/Data/Dev/UserTo/userto.com/css/styles_Standard.less'
import './src/Shared/styles.less'

import store from './src/DataLayer/store'
import * as serviceFunc from './src/Shared/serviceFunc'
import wit from './src/Constants/WitInit'
import * as action from './src/DataLayer/action/index'
import * as communication from './src/ComminicationLayer/fetch'

import SiteWindows from './src/ViewLayer/Components/SiteWindows.react'

// Upload applications from external file init.wit.js 
wit.inputTemplates
  .filter(item => serviceFunc.devModeTrueElseFalse(item.active))
  .forEach(item => store.dispatch(action.ADDED_WIT_TEMPLATE({ item })));


const abc = () => {
  return '2'
}

// Check Auth
(() => {
  const idUr = serviceFunc.getCookie('witIdUr')
  const hash = serviceFunc.getCookie('witHash')
  if (idUr === 'undefined' || hash === 'undefined') {
    store.dispatch(action.SIGNED_OUT_USER())
  }
  else if (idUr && idUr !== 'undefined') {

    const endpoint = 'https://sitewindows.com/api/registrAuthGetPost.php'
    const jsonpCallbackFunction = 'jsonCallBackFunc'
    const payload = {
      opt: 0,
      idUr,
      hash,
      dpref: 'wit',
    }
    communication.fetchJsonpTransport(endpoint, jsonpCallbackFunction, payload)
      .then(user => {
        store.dispatch(action.REG_LOGIN_CHECK_USER({ user }))
      })

  }

})();

// Setup a desktop with additions    
(() => {
  // console.info('index.js->[4]',{wit, store: store.getState()});
  let aid; let fid; let pid; let cid; let date
  let instanceSiteWindows = wit.inputTemplates.filter(item => item.type === 'SiteWindows')[0];
  fid = `id_${uuidv4()}`
  aid = `id_${uuidv4()}`
  pid = `id_${uuidv4()}`
  cid = []
  date = moment().utc().format('YYYY-MM-DDTHH:mm')
  instanceSiteWindows = { ...instanceSiteWindows, fid, aid, pid, cid, date }
  store.dispatch(action.ADDED_WIT_INSTANCE({ item: instanceSiteWindows })); 
  // console.info('index.js->[5]',{SiteWindows, store: store.getState()});

  let appDesktop = wit.inputTemplates.filter(item => item.type === 'AppDesktop')[0];
  pid = fid
  fid = `id_${uuidv4()}`
  aid = `id_${uuidv4()}`
  cid = [];
  date = moment().utc().format('YYYY-MM-DDTHH:mm');
  appDesktop = { ...appDesktop, fid, aid, pid, cid, date };
  store.dispatch(action.ADDED_WIT_INSTANCE({ item: appDesktop }));
  store.dispatch(action.ADDED_CID({ pid, fid }))
  
  const witInstancesLocalStorage = serviceFunc.loadState('witDocument');
  if (witInstancesLocalStorage && witInstancesLocalStorage.witInstances && 
    witInstancesLocalStorage.witInstances.length > 0) { 
    const witInstancesExtra = witInstancesLocalStorage.witInstances

    store.dispatch(action.ADDED_OVERWROTE_SET_WIT_INSTANCES({ witInstancesExtra}))
  }
})()

// Appending div container
//console.info('index.js->[12]',{store: store.getState() });
const fid = store.getState().witInstances.filter( item => item.type === 'SiteWindows')[0].fid;
const node = []
node[0] = document.createElement('div')
node[0].id = fid
node[0].className = 'SiteWindows'
node[0].style.zIndex = ''

// Appending div to body tag
const parentNode = document.getElementsByTagName('body')[0]
node.map(item => {
  serviceFunc.insertAppendNode(parentNode, item, 'insert')
})

const renderApp = () => {
  if (document.querySelector('#' + fid)) {
    ReactDOM.render(
      <Provider store={store}>
        <SiteWindows />
      </Provider>,
      document.querySelector(`#${fid}`)
    )
  }
}

renderApp();

/* This is needed for Hot Module Replacement   
if (module.hot) {
  module.hot.accept('./src/Containers/SiteWindows.react', function() {
      console.log('Accepting the updated printMe module!');
      renderApp();
    }
  );
}
*/