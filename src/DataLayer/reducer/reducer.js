import { combineReducers } from 'redux';	//const 	{ createStore } 	= require('redux'); 
//import {Provider, connect}	from 'react-redux'; //Redux library object for Provider of context for React components
import * as actionIndex from '../action/index'
import uuidv4 from 'uuid/v4'; //https://www.npmjs.com/package/uuid
import WIT from '../../Constants/WitInit';

import * as serviceFunc from '../../Shared/serviceFunc';

  /* Reducer for witInstances */
export const witInstances = (state = [], action) => {
  let witInstance = {}; let witInstances = []; let witInstancePid = {}; let index

  let stateTemp; let uid; let pid; let cid; let cidTemp; let pos; let posTemp; let top; let right
  let bottom; let left; let width; let height; let zIndexMax; let contentInnerHTML; let textContent; let elems;

  switch (action.type){

    case 'UPDATED_NAMECOM_WIT_APPTOPTARGET': {
      witInstance = state.filter( item => item.fid === action.fid )[0]
      witInstance = { ...witInstance, nameCom: action.nameCom }
      index = state.map(item => item.fid).indexOf(action.fid)
      stateTemp = [
        ...state.slice(0, index),
        witInstance,
        ...state.slice(index + 1),
      ]
      // console.info('reduces->', action.type,' [3]', { stateTemp, state, action, index })
      return stateTemp
    }

    case 'REMOVED_WIT_INSTANCES_FID_SUFFIX': {
      // console.info('reduces->', action.type,' [0]',{ state, action });
      
      stateTemp = state.map( item => { 
        const isFidOut = item.fid.match(/^[\S]{1,}__out$/gim);           
        let itemTemp = item;
        if( isFidOut !== null ){
          const fidOrg = item.fid.replace(/^([\S]{1,})(__[\S]{1,})$/gim, '$1');
          itemTemp.fid = fidOrg;
        }
        return itemTemp;
      });

      for( let i = 0; i < stateTemp.length; i++ ){
        
        if( stateTemp[i].cid.length > 0 ){
          const cid = stateTemp[i].cid.map( item => { 
            const isFidOut = item.match(/^[\S]{1,}__out$/gim); 
            let itemTemp = item;
            if( isFidOut !== null ){
              const fidOrg = item.replace(/^([\S]{1,})(__[\S]{1,})$/gim, '$1');
              itemTemp = fidOrg;
            }
            return item.replace(/^([\S]{1,})(__[\S]{1,})$/gim, '$1');            
          });
          stateTemp[i] = { ...stateTemp[i], cid };
        }
      }
      return stateTemp;
    }

    case 'CHANGED_WIT_INSTANCE_FID': {
      // console.info('reduces->', action.type,' [0]',{ state, action });
      
      witInstance = state.filter( item => item.fid === action.oldFid )[0]
      witInstance = { ...witInstance, fid: action.newFid }
      pid = witInstance.pid
      index = state.map(item => item.fid).indexOf( action.oldFid )
      // console.info('reduces->', action.type,' [3]',{ fid: witInstance.fid, index, stateTemp, witInstance, state, action });
      stateTemp = [
        ...state.slice(0, index),
        witInstance,
        ...state.slice(index + 1),
      ]

      witInstancePid = stateTemp.filter( item => item.fid === witInstance.pid )[0];
      // console.info('reduces->', action.type,' [5]',{ fid: witInstance.fid, pid, witInstancePid, stateTemp, state, action });
      cid = witInstancePid.cid;
      index = cid.indexOf( action.oldFid );
      // console.info('reduces->', action.type,' [6]',{ fid: witInstance.fid, index, stateTemp, state, action });
      cid = [
        ...cid.slice(0, index),
        action.newFid,
        ...cid.slice(index + 1),
      ];        
      witInstancePid = { ...witInstancePid, cid };
      
      index = stateTemp.map(item => item.fid).indexOf( pid );
      // console.info('reduces->', action.type,' [7]',{ fid: witInstance.fid, index, stateTemp, state, action });
      stateTemp = [
        ...stateTemp.slice(0, index),
        witInstancePid,
        ...stateTemp.slice(index + 1)
      ];        
      
      // console.info('reduces->', action.type,' [10]',{ fid: witInstance.fid, pid: witInstance.pid, stateTemp, state, action });
      return stateTemp;
    }
    
    case 'UPDATED_WIT_INSTANCE_BY_REACT_STATE': {
      // console.info('reduces->', action.type,' [0]',{ state, action });
      witInstance = action.witInstanceState;
      index = state.map(item => item.fid).indexOf( action.witInstanceState.fid );
      cid =  state[index].cid;
      contentInnerHTML =  state[index].contentInnerHTML;
      witInstance = { ... witInstance, cid, contentInnerHTML };
      stateTemp = [
        ...state.slice(0, index),
        witInstance,
        ...state.slice(index + 1)
      ];
      // console.info('reduces->', action.type,' [0]',{ state, action });
      return stateTemp;
    }
    
    case 'ADDED_OVERWROTE_SET_WIT_INSTANCES': {
      // console.info('reduces->', action.type,' [0]', { state, action })

      witInstances = state
      let { witInstancesExtra } = action

      witInstancesExtra = witInstancesExtra
        .map(item => {
          const main = WIT.inputTemplates.filter(itemFilter => itemFilter.type === item.type)[0]
          contentInnerHTML = serviceFunc.converterMdStringToHtmlString(item.textContent)
          const extra = { ...item, contentInnerHTML }
          witInstance = { ...main, ...extra }
          // console.info('reduces->', action.type,' [2]', { contentInnerHTML, textContent, main, extra, witInstance });
          return witInstance
        })

      // console.info('reduces->', action.type,' [10]',{ stateTemp, action });
      const description = 'Are you sure to overwrite project with the older version?'
      stateTemp = serviceFunc.confirmOverWriteSetWitInstances(description, witInstances, witInstancesExtra)
      return stateTemp
    }
    
    case 'ALIGN_ZINDEXES_WIT_INSTANCES': {
      const witInstancesRoot = state.filter( item => item.type === 'SiteWindows' );
      stateTemp = serviceFunc.alignZIndexesMultyLevel( state, witInstancesRoot[0].fid, witInstancesRoot );
      // console.info('reduces->', action.type,' [10]',{ stateTemp });
      return stateTemp;
    }

    case 'UPDATED_CONTENT_WIT_INSTANCE_MD': {

      let witInstance = state.filter( item => item.fid === action.fid)[0];
      
      if( !witInstance ){ return state; }
            
      textContent = action.textContent;
      contentInnerHTML = serviceFunc.converterMdStringToHtmlString( textContent );      
      uid = `id_${uuidv4()}`;       
      
      index = state.map(item => item.fid).indexOf( action.fid );

      witInstance = { ...witInstance, uid, contentInnerHTML, textContent };

      stateTemp = [
        ...state.slice(0, index),
        witInstance,
        ...state.slice(index + 1)
      ];
      // console.info('reduces->', action.type,' [10]',{ contentInnerHTML, textContent, stateTemp, state });
      return stateTemp;
    }
    
    case 'UPDATED_CONTENT_WIT_INSTANCE': {

      witInstance = state.filter( item => item.fid === action.fid)[0];
      
      if( !witInstance ){ return state; }
      
      contentInnerHTML = action.contentInnerHTML;      
      textContent = action.textContent;
      uid = `id_${uuidv4()}`;       
      
      index = state.map(item => item.fid).indexOf( action.fid );

      witInstance = { ...witInstance, uid, contentInnerHTML, textContent };

      stateTemp = [
        ...state.slice(0, index),
        witInstance,
        ...state.slice(index + 1)
      ];
      // console.info('reduces->', action.type,' [10]',{ contentInnerHTML, textContent, stateTemp, state });
      return stateTemp;
    }
      
    case 'UPDATED_CONTENT_WIT_INSTANCES': {
      let tempContent = null;
      for( let i = 0; i < state.length; i++ ){
        
        //const isFidCur = state[i].fid.match(/^[\S]{1,}__cur$/gim);
        
        // console.info('reduces->UPDATED_CONTENT_WIT_INSTANCES [1]',{ state });
        if (document.querySelector('#' + state[i].fid)) {
          elems = serviceFunc.getElems( state[i].fid, 'topContent__elem_A')
          witInstance = state[i];
          
          // console.info('reduces->UPDATED_CONTENT_WIT_INSTANCES [3]',{ i, selector, elems });
          if( elems.length !== 0 && elems[0] ){
            const contentInnerHTML = elems[0].innerHTML;
            
            /* if( state[i].type === 'AppTopTaskArchive' ){
              tempContent = contentInnerHTML;
              console.info('reduces->UPDATED_CONTENT_WIT_INSTANCES [5]',{ i, tempContent, elems0: elems[0], type: state[i].type, fid: state[i].fid, selector, elems });
            } */
            witInstance = {...witInstance, contentInnerHTML };
          }
          else{
            /* if( state[i].type === 'AppTopTask' ){
              // console.info('reduces->UPDATED_CONTENT_WIT_INSTANCES [7]',{ i, type: state[i].type, fid: state[i].fid, selector, elems });
            } */
            witInstance = {...witInstance, contentInnerHTML: null };
          }
          witInstances = [...witInstances, witInstance];
        }
      }
      stateTemp = witInstances;
      // console.info('reduces->', action.type,' [10]',{ tempContent, stateTemp, state });
      return stateTemp;
    }
      
    case 'UPDATED_POS_WIT_INSTANCES': {
      for( let i = 0; i < state.length; i++ ){
        witInstance = state[i];
        pos = serviceFunc.posCurrent( witInstance );
        witInstance = {...witInstance, pos };
        witInstances = [...witInstances, witInstance];
      }
      stateTemp = witInstances;
      // console.info('reduces->', action.type,' [0]',{ state, stateTemp });
      return stateTemp;
    }

    case 'REMOVED_FID_FROM_CID_OF_ANOTHER_FID': {
    
      index = state.map(item => item.fid).indexOf( action.fidWithCid );
      witInstance = state.filter( item => item.fid === action.fidWithCid )[0];
      cid = witInstance.cid.filter( item => item !== action.fid);
      witInstance = { ...witInstance, cid };

      stateTemp = [
        ...state.slice(0, index),
        witInstance,
        ...state.slice(index + 1)
      ];
      
      return stateTemp;
    }
      
    case 'ADDED_FID_TO_CID_OF_ANOTHER_FID': {
    
      index = state.map(item => item.fid).indexOf( action.fidWithCid );
      witInstance = state.filter( item => item.fid === action.fidWithCid )[0];
      
      cid = witInstance.cid;
      cidTemp = action.fid;
      cid = [...cid, cidTemp];
      witInstance = { ...witInstance, cid };

      stateTemp = [
        ...state.slice(0, index),
        witInstance,
        ...state.slice(index + 1)
      ];
      // console.info('reduces->', action.type,' [10]',{ state, stateTemp });
      return stateTemp;
    }
      
    case 'REMOVED_CID': {
      witInstance = state.filter(item => item.fid === action.pid )[0];
      if( !witInstance ){ return state; }
      // console.info('reduces->', action.type,' [3]',{ witInstance, pid: action.pid, fid: action.fid });
      witInstance.cid = witInstance.cid.filter(item => item !== action.fid);
      // console.info('reduces->', action.type,' [5]',{ witInstance, pid: action.pid, fid: action.fid });
      
      index = state.map(item => item.fid).indexOf(action.pid);
      
      stateTemp = [
        ...state.slice(0, index),
        witInstance,
        ...state.slice(index + 1)
      ];
      // console.info('reduces->', action.type,' [10]',{ state, witInstance, stateTemp, action });
      return stateTemp;
    }
      
    case 'ADDED_CID': {
      // console.info('reduces->', action.type, '[3]', { action })
      return serviceFunc.addedCid(state, action.pid, action.fid)
    }
    
    //\!Is not used right now, because it represents UI state, unstable behavior
    case 'RAISED_ZINDEX_WIT_INSTANCE': {

      (() => {
        witInstance = state.filter(item => item.fid === action.fid )[0];
        witInstances = state.filter(item => item.type === witInstance.type);
        const filterValue = witInstance.type;
        zIndexMax = serviceFunc.zIndexCalc( 100, witInstances, 'type', filterValue, 'max', 'pos', 'wit', 'zIndex' );
      })();        
      
      pos = witInstance.pos;
      posTemp = {wit: { zIndex: (zIndexMax + 1) } };
      pos = serviceFunc.obj2LevelCombine( pos, posTemp );

      witInstance = {...witInstance, pos};
      
      stateTemp = [
        ...state.slice(0, index),
        witInstance,
        ...state.slice(index + 1)
      ];
      // console.info('reduces->', action.type,' [0]',{state, stateTemp, action, witInstance, witInstances, zIndexMax});
      return stateTemp;
    }

    case 'REMOVED_WIT_INSTANCES': {
      // console.info('reduces->', action.type,' [0]',{state, action});
      
      stateTemp = state.filter( item => {
        const keys = action.keys;
        const isNotIncluded = ( keys ) => {
          return keys !== item.fid;
        }  
        return action.keys.every( isNotIncluded );
      });
      
      // console.info('reduces->', action.type,' [0]',{state, actionKeys: action.keys, stateTemp});
      return stateTemp
    }
    
    case 'REMOVED_WIT_INSTANCE': {
      // console.info('reduces->', action.type,' [0]',{state, action});
      
      //First variation "DELETED" reducer
      const stateTemp01 = state;
      const stateTemp02 = stateTemp01.filter((item, i, arr) => ( item.fid !== action.fid ));

      //Second variation for "DELETED" reducer
      index = state.map(item => item.fid).indexOf(action.fid);
      const stateTemp03 = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
      console.info('reduces->', action.type,' [0]',{actionFid: action.fid, index, stateTemp03});
      return stateTemp03;
    }
    
    case 'ADDED_WIT_INSTANCE': {
      // console.info('reduces->', action.type,' [0]', { action })
      return [...state, action.item]
    }
    
    case 'MINIMIZED_WIT_INSTANCE': {
      return state;
    }
    
    //\!Is not used right now, because it represents UI state, unstable behavior
    case 'MAXIMIZED_WIT_INSTANCE': {
      
      const w = window, d = document, e = d.documentElement, 
      g = d.getElementsByTagName('body')[0],
      x1 = w.innerWidth, x2 = e.clientWidth, x3 = g.clientWidth,
      y1 = w.innerHeight, y2 = e.clientHeight, y3 = g.clientHeight;
    
      index = state.map(item => item.fid).indexOf(action.fid);
      pos = state[index].pos
      width = x2;
      height = y2;
      top = 0;
      left = 0;
      right = undefined;
      bottom = undefined;
      witInstance = state[index];
      witInstance.pos = {...pos, top, right, bottom, left, width, height };
      // console.info('reduces->', action.type,' [0]',{x1, x2, x3, y1, y2, y3, pos: witInstance.pos});
      
      stateTemp = [
        ...state.slice(0, index),
        witInstance,
        ...state.slice(index + 1)
      ];
      // console.info('reduces->', action.type,' [0]',{state, stateTemp, fid: action.fid});
    
      return stateTemp;
    }
    
    case 'REPOSITIONED_WIT_INSTANCE': {
      return state;
    }
      
    case 'CHANGED_CONTENT_WIT_INSTANCE': {
      return state;
    }
    
    default: {
      return state;
    }  
      
  }  
}

  /* Reducer for witInstances */
export const witTemplates = (state = [], action) => {
    switch(action.type){
      case 'ADDED_WIT_TEMPLATE': {
        // console.info('reduces->', action.type,' [0]', { action })
        return [ ...state, action.item];
      }
        
      default: { 
        return state;
      }
    }  
  }  
  
  //Reducer for local filter (search)
export const witInstanceFilter = (state = '', action) => {   
    switch(action.type){
      case 'SET_WIT_INSTANCE_FILTER': {
        return action.filter;
      }
      
      default: {
        return state;
      }
    }  
  }
  
  //Reducer for isFetching loading indicator
export const loadingIndicator = (state = false, action) => {
    switch(action.type){
      case 'TOGGLED_LOADING_INDICATOR': {
        return !state;
      }
      
      default: { 
        return state;
      }
    }  
  }  

  /* Reducer for witInstances */
export const user = (state = {}, action) => {
  let stateTemp, url, date, days;  
    
    switch(action.type){
      case 'REG_LOGIN_CHECK_USER': {   
        const { user } =  action;
        url		=	serviceFunc.urlComposition(window.location.host);
        date = new Date();
        days = 7;
        date.setTime(+ date + (days * 24 * 60 * 60 * 1000));
        serviceFunc.setCookie( 'witIdUr', user.idUr, date.toGMTString(), '/')
        serviceFunc.setCookie( 'witNick', user.nick, date.toGMTString(), '/')
        serviceFunc.setCookie( 'witHash', user.hash, date.toGMTString(), '/')
        
        //const witIdUr = serviceFunc.getCookie('witIdUr')
        //const witNick = serviceFunc.getCookie('visid_incap_134361')
        //const witHash = serviceFunc.getCookie('visid_incap_134361')
        //console.info('reducer->REG_LOGIN_CHECK_USER',{user, witIdUr, witNick, witHash, visid_incap_134361, date: date.toGMTString(), domain2: url.domain2})
        stateTemp = user;
        return stateTemp;
      }

      case 'SIGNED_OUT_USER': {
        url		=	serviceFunc.urlComposition(window.location.host);
        date = new Date();
        days = 1;
        date.setTime(+ date - (days * 24 * 60 * 60 * 1000));
        // console.info('reducer->REG_LOGIN_CHECK_USER', { user, date: date.toGMTString(), domain2:url.domain2 });
        serviceFunc.setCookie( 'witIdUr', '', date.toGMTString(), '/', url.domain2, '' );
        serviceFunc.setCookie( 'witNick', '', date.toGMTString(), '/', url.domain2, '' );
        serviceFunc.setCookie( 'witHash', '', date.toGMTString(), '/', url.domain2, '' );     
        stateTemp = {};
        return stateTemp;
      }

      default: {
        return state;
      }
        
    }  
  }

  /* Reducer for witInstances */
  export const mdbDocsOperations = (
    state = {docList: [], spinner: false}, 
    action,
  ) => {
    let stateNext
    // console.info('reduces->mdbDocsOperations [0]',{ state, action })

    switch(action.type){

      case 'DID_NULL': {   
        // console.info('reduces->DID_NULL [0]',{ stateNext, state, action })
        return state
      }

      case 'MERGED_SELECTED_PROJECTS': {
        
        console.info('reduces->', action.type,' [0]',{ state, action })
        return state
      }
      case 'SELECTED_PROJECT_TO_MERGE': {
        const docMetaData = state.docList.filter(item => item.fid === action.propsScope.item.fid)[0
        ]
        if (!docMetaData.checked || docMetaData.checked === false) {
          docMetaData = {...docMetaData, checked: true }
        }
        else if (docMetaData.checked === true) {
          docMetaData = {...docMetaData, checked: false }
        }
        const docList = serviceFunc.changeArrayByNewInstance(state.docList, docMetaData, 'fid', action.propsScope.item.fid)
        stateNext = { ...state, docList }
        // console.info('reduces->', action.type,' [0]',{ docMetaData, stateNext, docList, state, action, fid: action.propsScope.item.fid })
        return stateNext
      }
      case 'REMOVED_DOC_NAMED_REQUEST': {
        stateNext = { ...state, spinner: true }
        // console.info('reduces->', action.type,' [0]',{ stateNext, state, action })
        return stateNext
      }
      case 'REMOVED_DOC_NAMED_SUCCESS': {
        alert('Document was removed successfully')
        stateNext = { ...state, spinner: false }
        // console.info('reduces->', action.type,' [0]', { state })
        return stateNext
      }
      case 'REMOVED_DOC_NAMED_FAILURE': {
        stateNext = { ...state, spinner: false }
        // console.info('reduces->', action.type,' [0]',{ stateNext, state, action })
        return stateNext
      }
      case 'LOADED_DOC_NAMED_REQUEST': {
        stateNext = { ...state, spinner: true }
        // console.info('reduces->', action.type,' [0]',{ stateNext, state, action })
        return stateNext
      }
      case 'LOADED_DOC_NAMED_SUCCESS': {
        stateNext = { ...state, spinner: false }
        // console.info('reduces->', action.type,' [0]',{ state, action })
        return stateNext
      }      
      case 'LOADED_DOC_NAMED_FAILURE': {
        stateNext = { ...state, spinner: false }
        // console.info('reduces->', action.type,' [0]',{ stateNext, state, action })
        return stateNext
      }
      case 'SAVED_DOC_NAMED_REQUEST': {
        stateNext = { ...state, spinner: true }
        // console.info('reduces->', action.type,' [0]',{ stateNext, state, action })
        return stateNext
      }
      case 'SAVED_DOC_NAMED_SUCCESS': {
        stateNext = { ...state, spinner: false }
        alert('Document was saved successfully')
        // console.info('reduces->', action.type,' [0]',{ state, action })
        return stateNext
      }
      case 'SAVED_DOC_NAMED_FAILURE': {
        alert('Document was not saved successfully\nYou can try once again')
        stateNext = { ...state, spinner: false }
        // console.info('reduces->', action.type,' [0]',{ stateNext, state, action })
        return stateNext
      }
      case 'LOADED_DOC_LIST_SUCCESS': {
        if (Array.isArray(action.docList)) {
          stateNext = { ...state, docList: action.docList, spinner: false }
        }
        else {
          stateNext = state
        }
        // console.info('reduces->', action.type,' [0]',{ stateNext, state, action })
        return stateNext
      }
      case 'LOADED_DOC_LIST_FAILURE': {
        stateNext = { ...state, spinner: false }
        // console.info('reduces->', action.type,' [0]',{ stateNext, state, action })
        return stateNext
      }
      default: {
        return state;
      }
        
    }  
  }  


  //Main application reducers
export const appCombReducers = combineReducers(
    { witTemplates,
      witInstances,
      witInstanceFilter,
      loadingIndicator,
      user,
      mdbDocsOperations,
    }
  );

  
/* 
  
  //Reducer for initializing initial state
  const _reducerInitialState = (state = {}, action) => {
    switch(action.type){
      case 'RESET_INITIAL_STATE':   return action.state;
      default: return state;            
    }
  };

  //Reducer for visibility filter (tabs)
  const _reducerVisibilityFilter = (state = {_reducerVisibilityFilter: 'ACTIVE'}, action) => {
    
    switch(action.type){
      case 'SET_VIZIBITILY_FILTER': 
        return { _reducerVisibilityFilter: action.filter};
      default: 
        return state;
    }  
  }        
  
  //Reducer for local filter (search)
  const _reducerLocalFilter = (state = {_reducerLocalFilter: ''}, action) => {
    
    switch(action.type){
      case 'SET_LOCAL_FILTER': 
        return { _reducerLocalFilter: action.filter};
      default: 
        return state;
    }  
  }        

  //Reducer for isFetching loading indicator
  const _reducerLoadingIndicator = (state = false, action) => {
    switch(action.type){
      case 'TOGGLED_LOADING_INDICATOR': 
        return { _reducerLoadingIndicator: !state};  
      default: 
        return state;
    }  
  }  
  
  
  //Main application reducers
  const _notesApp = combineReducers({
    _reducerVisibilityFilter,
    _reducerLocalFilter,
    _reducerLoadingIndicator
  });

  //Root reducer to reset, upload and clean initial state of the store
  //https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
export const _rootReducer = (state={}, action) => {
    if (action.type === 'RESET_INITIAL_STATE') {
    state = action.state;
    }

    return _notesApp(state, action)
  }

*/