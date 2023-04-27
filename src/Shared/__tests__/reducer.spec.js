require("util").inspect.defaultOptions.depth = null;
import {createStore, combineReducers, applyMiddleware} from 'redux';	//const 	{ createStore } 	= require('redux'); 
import {Provider, connect}	from 'react-redux'; //Redux library object for Provider of context for React components
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {logger} from 'redux-logger';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import * as action from '../action';
import * as reducer from '../reducer';
import {configureStore} from '../../../index';
//npm run jest reducer.spec.js


describe('reduces', () => {


  it('[5] should remove wit instance with the selected uuid', () => {
    const store = configureStore();
    let addedWit= { 
      'type': 'AppDesktop',
      'top': 24, left: 24, right: null, bottom: null, 
      'children': null, 
      'actionWit': null,
    };
    store.dispatch( action.ADDED_WIT_INSTANCE(addedWit) );
    addedWit= { 
      'type': 'AppDesktop',
      'top': 24, left: 24, right: null, bottom: null, 
      'children': null, 
      'actionWit': null,
    };
    store.dispatch( action.ADDED_WIT_INSTANCE(addedWit) );
    addedWit= { 
      'type': 'AppDesktop',
      'top': 24, left: 24, right: null, bottom: null, 
      'children': null, 
      'actionWit': null,
    };
    store.dispatch( action.ADDED_WIT_INSTANCE(addedWit) );
    /* 
    console.info('[5]',{0: store.getState().witInstances[0].fid,
                        1: store.getState().witInstances[1].fid,
                        2: store.getState().witInstances[2].fid});
    */
    const fid0 = store.getState().witInstances[0].fid;
    expect(_.size(store.getState().witInstances)).toBe(3);    
    store.dispatch( action.REMOVED_WIT_INSTANCE(fid0) );   
    //console.info('[15]',{witInstances: store.getState().witInstances});
    expect(_.size(store.getState().witInstances)).toBe(2);
    expect(store.getState().witInstances.filter((item, i, arr) => (item.fid === fid0)).length).toBe(2);
  });

  it('[4] should add new wit instance', () => {
    const addedWit= { 
      'type': 'AppDesktop',
      'top': 24, left: 24, right: null, bottom: null, 
      'children': null, 
      'actionWit': null,
    };
    const store = configureStore();
    store.dispatch( action.ADDED_WIT_INSTANCE(addedWit) );
    //console.info('[4]',store.getState());
    expect(_.size(store.getState().witInstances)).toBe(1);
  });

  it('[3] should set wit intance filter', () => {
    const store = configureStore();
    store.dispatch( action.SET_WIT_INSTANCE_FILTER('used') );   
    expect(store.getState().witInstanceFilter).toBe('used');
  });
  
  it('[2] should toggle loading indicator', () => {
    const store = configureStore();
    store.dispatch( action.TOGGLED_LOADING_INDICATOR() );
    expect(store.getState().loadingIndicator).toBe(true);
  });  
  
  it('[1] should cofigureStore defined', () => {
    expect(configureStore().getState()).toBeDefined();
  });

  test('[0] tests Jest health: adds 2 * 2 to equal 4', () => {
    expect((2*2)).toBe(4);
  }); 
  
});

