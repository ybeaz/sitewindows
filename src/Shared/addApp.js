
import uuidv4 from 'uuid/v4'
import moment from 'moment'

import * as action from '../DataLayer/action/index'
import store from '../DataLayer/store'
import * as serviceFunc from './serviceFunc'

const addApp = (e, item, reduxState, posInitIn = {}, pid, propsScope = {}) => {
  // console.info('AddApp [0]',{type: item.type, propsScope, pidFrom: item.pidFrom, contentInnerHTML: item.contentInnerHTML, item, reduxState, });   

  const { witInstances } = reduxState
  const { fids } = propsScope

  const pidType = witInstances.filter(itemFilter => itemFilter.fid === pid)[0].type

  let zIndexMax
  const filterValue = item.active
  const permit = serviceFunc.isInstancePermitted(item, witInstances, pid)
  if (!permit) {
    zIndexMax = serviceFunc.zIndexCalc(99, witInstances, 'active', filterValue, 'max', 'pos', 'wit', 'zIndex')
    const sameTypeWitInstances = witInstances.filter(itemFilter => itemFilter.type === item.type)
    const elems = serviceFunc.getElems(sameTypeWitInstances[0].fid, '')
    //console.info('SiteWindows->addApp [01]', { elems, zIndexMax, witInstances })
    elems[0].style.zIndex = zIndexMax + 1
    return
  }

  (() => {
    zIndexMax = serviceFunc.zIndexCalc(99, witInstances, 'active', filterValue, 'max', 'pos', 'wit', 'zIndex')
  })()
  // console.info('SiteWindows->addApp [02]', { zIndexMax, witInstances })

  let pos; let posTemp; let witInstancesType; let length; let witInstanceLast; let left; let top; let contentInnerHTML; let textContent

  pos = serviceFunc.initPos()
  // console.info('SiteWindows->addApp [1]',{ type: item.type, itemPos: item.pos, initPos: pos, posInitIn });
  pos = serviceFunc.obj2LevelCombine(pos, item.pos)
  // console.info('SiteWindows->addApp [2]',{ type: item.type, itemPos: item.pos, initPos: pos, posInitIn });
  pos = serviceFunc.obj2LevelCombine(pos, posInitIn)
  // console.info('SiteWindows->addApp [3]',{pos});
  posTemp = {wit: { zIndex: (zIndexMax + 1) } }
  pos = serviceFunc.obj2LevelCombine(pos, posTemp)

  if (item.type === 'AppMenuBar') {
    item = { ...item, pos }
  }
  else if (item.isTrueFalse.isAlignCenter === true) {
    const el = document.documentElement
    const x2 = el.clientWidth
    const leftCenter = x2 / 2 - item.pos.wit.width / 2
    posTemp = {
      wit: { left: leftCenter },
    }
    pos = serviceFunc.obj2LevelCombine( pos, posTemp )
    item = { ...item, pos }
    // console.info('SiteWindows->addApp [8]',{ type: item.type, pos, isAlignCenter: true });
  }    
  else if (witInstances.length > 2 && item.type !== 'SiteWindows' && item.type !== 'AppMenuBar') {
    witInstancesType = witInstances
      .filter( itemFilter => itemFilter.type === item.type)
    length = witInstancesType.length
    witInstanceLast = witInstancesType[length - 1]
    left = item.pos.wit.left + 90
    top = pidType === 'AppTopTaskCurrent' ? 15 : item.pos.wit.top
    
    posTemp = {
      wit: { top, left },
    }
    if (witInstanceLast) {
      left = witInstanceLast.pos.wit.left + 24
      top = pidType === 'AppTopTaskCurrent' ? 15 : witInstanceLast.pos.wit.top
    
      if (witInstanceLast.pos.wit.left > 300) {
        left = 90
      }
      if (witInstanceLast.pos.wit.top > 300) {
        top = 24
      }
      
      posTemp = {
        wit: { top, left },
      }
      //console.info('SiteWindows->addApp [6]',{ type: item.type, posTemp });
    }
    //console.info('SiteWindows->addApp [7]',{ type: item.type, pos, witInstanceLast });
    pos = serviceFunc.obj2LevelCombine( pos, posTemp )
    item = { ...item, pos }
  }
  //console.info('SiteWindows->addApp [9]',{ type: item.type, pos, witInstanceLast });
  
  const { fidIn: fid } = fids
  const aid = `id_${uuidv4()}`
  const cid = []
  const date = moment().utc().format('YYYY-MM-DDTHH:mm')
  
  if (item.contentInnerHTML && item.contentInnerHTML !== null && !item.textContent) {
    contentInnerHTML = item.contentInnerHTML
    textContent = item.contentInnerHTML
  }
  else if (item.contentInnerHTML && item.contentInnerHTML !== null
    && item.textContent && item.textContent !== null) {
    contentInnerHTML = item.contentInnerHTML
    textContent = item.textContent
  }
  else if (!item.contentInnerHTML &&
    item.textContent && item.textContent !== null) {
    contentInnerHTML = item.textContent
    textContent = item.textContent
  }
  else {
    contentInnerHTML = ''
    textContent = ''
  }
  
  //console.info('SiteWindows->addApp [7]',{fid, contentInnerHTML, textContent, pid, propsScope, item, reduxState, });
  if (item.pidFrom === 'SiteWindows') {
    //const itemFrom = witTemplates.filter(itemFilter => itemFilter.type === item.pidFrom)[0];
    //console.info('SiteWindows->addApp [8]',{fid, pid, item, reduxState, });
    pid = witInstances.filter( itemFilter => itemFilter.type === item.pidFrom )[0].fid
  }
  
  propsScope = serviceFunc.filterPropsObjArrFunc([propsScope], ['witTemplate'], 'omit')[0]
  item = { ...item, fid, pid, cid, aid, date, contentInnerHTML, textContent, propsScope }
  // console.info('AddApp [10]',{ fid, pid, item, reduxState });
  store.dispatch(action.ADDED_WIT_INSTANCE({ item }))
  store.dispatch(action.ADDED_CID({ pid, fid }))

  //console.info('SiteWindows->addApp [15]',{ fid, fids, propsScope, pid, item, reduxState });
  return
}

export default addApp
