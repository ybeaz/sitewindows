import uuidv4 from 'uuid/v4'
import moment from 'moment'
import { bindActionCreators } from 'redux'

import * as actions from '../action/index'
import store from '../store'
import addApp from '../../Shared/addApp'
import * as serviceFunc from '../../Shared/serviceFunc'

const { dispatch } = store
const action = bindActionCreators(actions, dispatch)


const handleFuncRun = async ( e, actionType, fid, propsScope = {} ) => {
    // console.info('HandleFuncRun() [0]', { action, actions, store, actionType, fid, propsScope })

    let output; let props

    await (() => {
      action.ALIGN_ZINDEXES_WIT_INSTANCES()
    })()

    await (() => {
      // this.forceUpdateHandler();
      props = store.getState()
      // console.info('HandleFuncRun() [1]', { actionType, fid, propsScope, props })
      const { user, witInstances } = props
      const witInstance = witInstances.filter( item => item.fid === fid )[0];
      let witInstancesToSave = [], witTemplate = {}, witInstanceTemp = {}, fids = {}, pidType, fidType, selector, elems, contentInnerHTML, textContent, caseAct

      switch (actionType) {


        case 'mergeSelectedProjects': {
          action.MERGED_SELECTED_PROJECTS({ fid, propsScope })
          // console.info('SiteWindows->handleFuncRun() [1]', {actionType, fid, propsScope })
        } break

        case 'selectProjectToMerge': {
          action.SELECTED_PROJECT_TO_MERGE({ fid, propsScope })
          // this.forceUpdateHandler()
          // console.info('SiteWindows->handleFuncRun() [1]', {actionType, fid, propsScope })
        } break

        case 'inputContentElem':
        case 'clickOutsideElem': {
          // console.info('SiteWindows->handleFuncRun() [1]', {actionType, fid, propsScope })
          ({ contentInnerHTML, textContent, caseAct } = propsScope)
          action.UPDATED_CONTENT_WIT_INSTANCE_MD({ fid, contentInnerHTML, textContent, caseAct })
        } break

        case 'archived': {
          // console.info('SiteWindows->handleWitInstance() [0]',{ actionType, fid })
          elems = serviceFunc.getElems(fid, 'topContent__elem_A')
          
          if (elems.length !== 0 && elems[0] && witInstance.textContent) {
          // insertUntrustedText (elems[0], elems[0].innerHTML, 'br')

            ({ textContent, contentInnerHTML } = witInstance) // elems[0].innerText

            textContent = serviceFunc.removeMarkdownCharacters(textContent)
            textContent = serviceFunc.compressStringToTweet(textContent)

            const witAppTopTarget = serviceFunc.getUpperWitInstanceByType(fid, 'AppTopTarget', witInstances)
            const witInstanceArchieve = serviceFunc.getDownWitInstanceByType(witAppTopTarget.fid, 'AppTopTaskArchive', witInstances)

            const textArchieve = witInstanceArchieve.textContent
            const htmlArchieve = witInstanceArchieve.contentInnerHTML

            // Creating timestamp
            /* let dateObject = new Date()
            dateObject.setTime(Date.parse(dateObject))
            dateObject.toLocaleString() */

            const date = moment().format('YYYY-MM-DD HH:mm')
            const timestampText = date
            // Look at http://javascript.ru/Date.parse

            // elems = document.querySelectorAll( selector );

            // const innerText = witInstancce.textContent; //elems[0].innerText
            const matchData = textArchieve.match( /^([\s\S]*?)([\d\/]{1,8})([\s\S]*?)$/gim )

            let part1text; let part3text
            if (matchData === null) {
              part1text = textArchieve
              part3text = ''
            }
            else {
              part1text = textArchieve.replace(/^([^\n\r]{1,})([\n\r]{1,})([\d\/]{1,8})([\s\S]{1,})$/gim, '$1')
              part3text = textArchieve.replace(/^([^\n\r]{1,})([\n\r]{1,})([\d\/]{1,8})([\s\S]{1,})$/gim, '$3$4')

              const nIndexOf1 = htmlArchieve.indexOf( '<br /><br />' )
            }

            textContent = part1text  + '\n\n' + timestampText + ' ' + textContent  + '\n' + part3text;            
            action.UPDATED_CONTENT_WIT_INSTANCE_MD({
              fid: witInstanceArchieve.fid,
              contentInnerHTML,
              textContent,
              caseAct: 0,
            })

            /*fid, contentInnerHTML, textContent, caseAct
            console.info('SiteWindows->handleWitInstance() [7]',{ actionType,
              textArchieve, part1html, part3html, htmlArchieve, textContent, contentInnerHTML, 
              compressStringToTweet, matchData, part1text, part3text, fid,
              textContentIni:  witInstance.textContent, contentInnerHTMLIni: witInstance.contentInnerHTML });
            */
          }
          else {
            // console.info('SiteWindows->handleWitInstance() [8]',{ actionType, elems });
            contentInnerHTML = ''
            textContent = ''
          }

          fids = serviceFunc.fidSuffixFunc(actionType, fid, propsScope)
          // console.info('SiteWindows->handleWitInstance() [5]',{ actionType, contentInnerHTMLIn, caseSuf: fids.caseSuf, fids, witInstances, fid });

          // Archieve the Task if the current copy does NOT exist
          if (fids.fidPrefixType !== 'out' && fids.fidPrefixType !== 'cur') {
            // console.info('SiteWindows->handleWitInstance() [9]',{ actionType, caseSuf: fids.caseSuf, fidIn: fids.fidIn, fids, witInstances, fid });
            serviceFunc.removeWitInstanceConsistentlyWithActions(witInstances, action, fids.fidIn)
          }
          else if (fids.fidPrefixType === 'out' || fids.fidPrefixType === 'cur') {
            serviceFunc.removeWitInstanceConsistentlyWithActions(witInstances, action, fids.fidOut)
            serviceFunc.removeWitInstanceConsistentlyWithActions(witInstances, action, fids.fidIn)
          }
        } break

        case 'addedExampleAppTopTarget': {
          
          // console.info('SiteWindows->handleWitInstance() [5]',{ actionType, wit });          
          if (wit.defaultAppTopTarget && wit.defaultAppTopTarget.witInstances.length > 0) {           
            const { witInstances: witInstancesExtra } = wit.defaultAppTopTarget;
            // console.info('SiteWindows->handleWitInstance() [5]',{ witInstances });
            action.ADDED_OVERWROTE_SET_WIT_INSTANCES({ witInstancesExtra })
          }
        } break

        case 'removedCopyOfWitInstance': {

          pidType = witInstances.filter( item => item.fid === witInstance.pid )[0].type;
          propsScope = { ...propsScope, pidType }
          fids = serviceFunc.fidSuffixFunc( actionType, fid, propsScope )
          // console.info('SiteWindows->handleWitInstance() [5]',{ actionType, caseSuf: fids.caseSuf, fids, witInstance, witInstances });
          serviceFunc.removeWitInstanceConsistentlyWithActions(witInstances, action, fids.fidIn)
          const isFidOut = witInstances.filter(item => item.fid === fids.fidOut )[0]
          if (isFidOut !== null) {
            // console.info('SiteWindows->handleWitInstance() [7]',{ actionType, caseSuf: fids.caseSuf, fids, witInstance, witInstances });
            action.CHANGED_WIT_INSTANCE_FID({ oldFid: fids.fidOut, newFid: fids.fidOrg })
          }
        } break

        case 'removedWitInstance': {

          pidType = witInstances.filter(item => item.fid === witInstance.pid)[0].type
          fidType = witInstance.type
          propsScope = { ...propsScope, pidType, fidType }
          fids = serviceFunc.fidSuffixFunc( actionType, fid, propsScope )
          // console.info('SiteWindows->handleWitInstance() [5]',{ actionType, caseSuf: fids.caseSuf, fids, witInstance, witInstances });

          serviceFunc.removeWitInstanceConsistentlyWithActions(witInstances, action, fids.fidIn)

          // Remove the AppTopTaskCurrent itself
          if (fidType === 'AppTopTaskCurrent') {
            // console.info('SiteWindows->handleWitInstance() [7]',{ actionType, caseSuf: fids.caseSuf, fids, witInstance, witInstances });
            action.REMOVED_WIT_INSTANCES_FID_SUFFIX()
          }
          else if (fids.fidPrefixType === 'out') {
            action.CHANGED_WIT_INSTANCE_FID({ oldFid: `${fids.fidOrg}__cur`, newFid: fids.fidOrg + '__ins' })
          }
          else if (fids.fidPrefixType === 'cur') {
            action.CHANGED_WIT_INSTANCE_FID({ oldFid: `${fids.fidOrg}__out`, newFid: fids.fidOrg })
          }
          
        } break

        case 'addedCopyOfWitInstance': {
          //console.info('SiteWindows->handleWitInstance() [3]',{ actionType, propsScope, fid, witInstance, witInstances });
          
          // eslint-disable-next-line prefer-destructuring
          witInstanceTemp = witInstances.filter(item => item.fid === fid)[0]
          const witInstancePid = witInstances.filter(item => item.fid === witInstanceTemp.pid)[0]
          
          // console.info('SiteWindows->handleWitInstance() [3]',{ actionType, witInstanceTemp, witInstancePid, fid, witInstances, propsScope });
          if (witInstancePid.type === 'AppTopTaskCurrent') { break }
          
          const witAppTopTarget = serviceFunc.getUpperWitInstanceByType(fid, 'AppTopTarget', witInstances)
          const witAppTopTaskCurrent = serviceFunc.getDownWitInstanceByType(witAppTopTarget.fid, 'AppTopTaskCurrent', witInstances)

          pidType = witInstance.type
          propsScope = { ...propsScope, pidType }
          fids = serviceFunc.fidSuffixFunc(actionType, fid, propsScope)

          propsScope = { ...propsScope, fids };
          // console.info('SiteWindows->handleWitInstance() [10]',{ actionType, fid, witAppTopTaskCurrent, witAppTopTarget, witInstances});
          addApp(e, witInstanceTemp, props, {}, witAppTopTaskCurrent.fid, propsScope)
          
          if (fids.fidOut) {
            // console.info('SiteWindows->addApp [12]',{ fids });
            action.CHANGED_WIT_INSTANCE_FID({ oldFid: fids.fidOrg, newFid: fids.fidOut })
          }
          
          // console.info('SiteWindows->handleWitInstance() [5]',{ actionType, caseSuf: fids.caseSuf, witInstance, witInstances });
        } break
          
        case 'addedWitInstance': {
          // console.info('SiteWindows->handleWitInstance() [3]',{ actionType, propsScope, fid });
          pidType = witInstance.type
          propsScope = { ...propsScope, pidType }
          fids = serviceFunc.fidSuffixFunc(actionType, `id_${uuidv4()}`, propsScope)
          propsScope = { ...propsScope, fids }
          addApp( e, propsScope.witTemplate, props, {}, propsScope.pid, propsScope );
          
          //console.info('SiteWindows->handleWitInstance() [5]',{ actionType, caseSuf: fids.caseSuf, fids, witInstance, witInstances });
        } break
        
        // Call for wit Dashboard with saving, open, etc. functions
        case 'saveLoadEtcDbApp': {
          propsScope = { ...propsScope, case: 'handleWitBd', fids: { fidIn: `id_${uuidv4()}` }}
          witTemplate = props.witTemplates.filter( item => item.type === 'AppHandleWitBd' )[0]
          // console.info('SiteWindows->handleWitInstance() [0]',{actionType, fid, propsScope, witTemplate });
          addApp(e, witTemplate, props, {}, fid, propsScope)
   
          /* console.info('SiteWindows->handleFuncRun() [0]',{ actionType, fid, typeTemplate: witTemplate.type, 
            typeInstance: witInstance.type, fid });
          */
          // alert('Function ' + actionType + ' is in development');
        } break

        // Action of removing a particular project
        case 'removeProject': {
          const payload = { user, name: propsScope.item.name, fid: propsScope.item.fid }
          // console.info('SiteWindows->handleFuncRun() [0]', { actionType, payload, fid, propsScope })
          action.getActionAsync('REMOVED_DOC_NAMED','REQUEST', payload)
        } break

        case 'editNameProject': {
          alert('Function ' + actionType + ' is in development');
          console.info('SiteWindows->handleFuncRun() [0]',{ actionType, fid, propsScope })
        } break

        // Action of loading a particular project
        case 'loadProject': {
          const payload = { user, name: propsScope.item.name }
          //console.info('SiteWindows->handleFuncRun() [0]',{ actionType, payload, fid, propsScope })
          action.getActionAsync('LOADED_DOC_NAMED','REQUEST', payload)
          handleFuncRun({}, 'removedWitInstance', fid, {})
        } break

        // Action of saving
        case 'saveDocByUserIdMdb': {
          // console.info('SiteWindows->handleFuncRun() [0]', { e, actionType, fid, propsScope })
          let jsonTo
          const { fidOrg, nameCom: nameComPropsScope, group } = propsScope
          action.UPDATED_CONTENT_WIT_INSTANCES()
          action.UPDATED_POS_WIT_INSTANCES()
          const { nameCom } = witInstances.filter(item => item.type === 'AppTopTarget')[0]
          action.UPDATED_NAMECOM_WIT_APPTOPTARGET({ fid: fidOrg, nameCom: nameComPropsScope })
          props = store.getState()
          const { witInstances: witInstancesScope } = props
          const witInstanceToSave = witInstancesScope.filter(item => item.fid === fidOrg)[0]
          const { fid: fidOld, type } = witInstanceToSave
          witInstancesToSave = serviceFunc.filterArrElemByParentFid(witInstancesScope, fidOld)
          
          // console.info('SiteWindows->handleFuncRun() [2]', { actionType, witInstanceToSave, witInstancesToSave, fid, propsScope })

          // Function to filter properties of array of object and return reduced array 
          const arrProp = ['type', 'fid', 'aid', 'pid', 'cid', 'date', 'nameCom', 'pos', 'textContent']
          witInstancesToSave = serviceFunc.arrOfObjPickArrProp(witInstancesToSave, arrProp)
    
          // Function to get array of attributes by propVal
          const arrPropVal = [{ prop: 'type', val: 'AppHandleWitBd' }, { prop: 'type', val: 'AppSignUpInOut' }]
          const arrToOmit = serviceFunc.arrOfObjGetArrAttrByPropVal(witInstancesToSave, arrPropVal, 'fid')

          // Function to omit property of array of objects by values of simple array
          witInstancesToSave = serviceFunc.arrOfObjOmitPropArrByArr(witInstancesToSave, 'cid', arrToOmit)

          // Function to return array of objects composed of the own and inherited enumerable property paths of object that are not omitted 
          witInstancesToSave = serviceFunc.arrOfObjOmitByPropVal(witInstancesToSave, arrPropVal)

          if (nameCom !== nameComPropsScope) {
            witInstancesToSave = serviceFunc.itemNewFidParentChilren(witInstancesToSave)
            // console.info('SiteWindows->handleFuncRun() [2]', { nameCom, nameComPropsScope, witInstancesToSave })
          }

          const { fid: fidNew } = witInstancesToSave.filter(item => item.type === 'AppTopTarget')[0]
          // console.info('SiteWindows->handleFuncRun() [3]', { nameCom, nameComPropsScope, fidNew, fid, witInstancesToSave })
          
          selector = 'head > script'
          const specificPart = 'wit.min'
          const elem = serviceFunc.elemFind(selector, specificPart)

          const witDocument = { 
            type,
            idUr: user.idUr,
            fid: fidNew,
            name: nameComPropsScope,
            group,
            witSrc: elem.src,
            witInstances: witInstancesToSave,
          }

          jsonTo = JSON.stringify(witDocument)
          // jsonTo = encodeURIComponent(jsonTo)
          jsonTo = serviceFunc.urlStringSanitize(jsonTo); // serviceFunc.urlStringSanitize() encodeURIComponent()
          const jsonToChunksArr = serviceFunc.chunkString(jsonTo, 1000)

          const payload = { witInstanceToSave, name: nameComPropsScope, jsonTo, jsonToChunksArr, user, timeOut: 100, witInstances: witInstancesScope, action, witInstancesToSave, fid }
          // console.info('SiteWindows->handleFuncRun() [4]', { payload, nameComPropsScope, witDocument, witInstancesToSave, witInstanceToSave, witInstances, arrToOmit, jsonTo, jsonToChunksArr, user })
          action.getActionAsync('SAVED_DOC_NAMED','REQUEST', payload)
        } break

        // Action of loading list of projects
        case 'loadDocListByUserIdMdbAction': {

          const payload = { user }
          // console.info('SiteWindows->handleFuncRun() [5]', { payload })
          action.getActionAsync('LOADED_DOC_LIST','REQUEST', payload)
        } break

        //Action of copying content of AppTopTarget into clipboard
        case 'copyClipboard': {
          // console.info('SiteWindows->handleFuncRun() [0]',{ actionType, fid });
          props = store.getState()
          const { witInstances } = props
          const witInstanceParent = witInstances.filter(item => item.fid === fid)
          
          witInstancesToSave = serviceFunc.filterArrElemByParentFid(witInstances, fid)

          const arrProp = [ 'type', 'textContent' ];
          witInstancesToSave = serviceFunc.arrOfObjPickArrProp(witInstancesToSave, arrProp)
          
          const getStringFromArr = (result, item) => {
            var str = ''
            if (item.type === 'AppTopTaskTitle' && item.textContent) {
              str = '### ' + item.textContent + '\n'
            }
            else if (item.type === 'AppTopTaskTag' && item.textContent) {
              str = '#### ' + item.textContent + '\n'
            }
            else if (item.type === 'AppTopTask' && item.textContent) {
              str = '' + item.textContent + '\n'
            }
            return result + str
          }

          const result = witInstancesToSave.reduce(getStringFromArr, '');

          serviceFunc.textToClipboard(result)
          alert('The project has been saved to clipboard')
          
          //console.info('SiteWindows->handleFuncRun() [10]',{ actionType, result, witInstancesToSave, witInstances });
        } break

        case 'saveLocal': {
          // console.info('SiteWindows->handleFuncRun() [0]',{ actionType, fid });
          action.UPDATED_CONTENT_WIT_INSTANCES()
          action.UPDATED_POS_WIT_INSTANCES()
          props = store.getState()
          const { witInstances } = props
          const witInstanceParent = witInstances.filter(item => item.fid === fid)
          witInstancesToSave = serviceFunc.filterArrElemByParentFid(witInstances, fid)

          const arrProp = [ 'type', 'fid', 'aid', 'pid', 'cid', 'date', 'nameCom', 'pos', 'textContent' ];
          witInstancesToSave = serviceFunc.arrOfObjPickArrProp(witInstancesToSave, arrProp)

          const arrPropVal = [{ prop: 'type', val: 'AppHandleWitBd' }, { prop: 'type', val: 'AppSignUpInOut' }]
          witInstancesToSave = serviceFunc.arrOfObjOmitByPropVal(witInstancesToSave, arrPropVal)

          selector = 'head > script'
          const specificPart = 'wit.min'
          const elem = serviceFunc.elemFind(selector, specificPart)

          const witDocument = {
            type: witInstanceParent.type,
            fid,
            name: 'LocalStorage',
            witSrc: elem.src,
            witInstances: witInstancesToSave,
          }
          serviceFunc.saveState('witDocument', witDocument)

          alert('The project has been saved successfully')
          // console.info('SiteWindows->handleFuncRun() [10]',{ actionType, witInstancesToSave, witInstances });
        } break

        case 'loadLocal': {
          
          const witInstancesLocalStorage = serviceFunc.loadState('witDocument')
          if (witInstancesLocalStorage && witInstancesLocalStorage.witInstances
            && witInstancesLocalStorage.witInstances.length > 0) {
            const witInstancesExtra = witInstancesLocalStorage.witInstances
            action.ADDED_OVERWROTE_SET_WIT_INSTANCES({ witInstancesExtra })
          }
          // console.info('SiteWindows->handleFuncRun() [5]',{ actionType, fid, witInstances, witInstancesToSave });
          alert('The previous version has been loaded successfully');

        } break

        case 'cleanLocal': {
          serviceFunc.saveState('witDocument', {});
          alert('Local storage is cleaned successfully');
          //console.info('SiteWindows->handleFuncRun() [5]',{ actionType, fid, witInstancesToSave });
          //this.forceUpdateHandler();
        } break
      
        case 'witSignUp': {
          witTemplate = props.witTemplates.filter( item => item.type === 'AppSignUpInOut' )[0];
          fids = serviceFunc.fidSuffixFunc( actionType, 'id_' + uuidv4(), propsScope );
          propsScope = { ...propsScope, actionType, fids };
          //console.info('SiteWindows->handleWitInstance() [5]',{actionType, propsScope, fid, witTemplate });
          addApp( e, witTemplate, props, {}, fid, propsScope );
        } break
          
        case 'witSignIn': {
          witTemplate = props.witTemplates.filter( item => item.type === 'AppSignUpInOut' )[0];
          fids = serviceFunc.fidSuffixFunc( actionType, 'id_' + uuidv4(), propsScope );
          propsScope = { ...propsScope, actionType, fids };
          //console.info('SiteWindows->handleWitInstance() [5]',{actionType, propsScope, fid, witTemplate });
          addApp( e, witTemplate, props, {}, fid, propsScope );
        } break

        case 'witSignOut': {
          witTemplate = props.witTemplates.filter( item => item.type === 'AppSignUpInOut' )[0];
          fids = serviceFunc.fidSuffixFunc( actionType, 'id_' + uuidv4(), propsScope );
          propsScope = { ...propsScope, actionType, fids };
          //console.info('SiteWindows->handleWitInstance() [5]',{actionType, propsScope, fid, witTemplate });
          addApp (e, witTemplate, props, {}, fid, propsScope)
        } break

        case 'IcebobClock':
        case 'ToshiyukiTakahashiClock':
        case 'MarcoAntonioAguilarAcuñaClock':
        case 'GaneshKumarMClock':
        case 'GaneshKumarMClock':
        case 'StixClock':
        case 'JacobFosterClock': {
            console.info('SiteWindows->handleWitInstance() [5]',{ actionType },'in development');
        } break
            
        default: {
            console.info('SiteWindows->handleFuncRun() [10]','I have never heard of that ...', actionType);
        } break
      }
    })()
    return output
  }

export default handleFuncRun
