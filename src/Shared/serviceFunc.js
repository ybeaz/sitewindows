
import showdown from 'showdown';
import uuidv4 from 'uuid/v4' // https://www.npmjs.com/package/uuid

export const textToClipboard = text => {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

export const selectorElement = (fid, element) => {
  let selector
  switch (element) {
    case 'resizer': {
      selector = `div#${fid} > .resizer`
    } break
    case 'wit__contentCanvas': {
      selector = `div#${fid} > div.wit__contentContainer > div.wit__contentCanvas`
    } break
    case 'topContent__elem_A_textarea': {
      selector = `div#${fid} > div.wit__contentContainer > div.wit__contentCanvas > div.topContent > div > textarea.topContent__elem_A_textarea`
    } break
    case 'topContent__elem_A': {
      selector = `div#${fid} > div.wit__contentContainer > div.wit__contentCanvas > div.topContent > div > div.topContent__elem_A`
    } break
    case 'topContent': {
      selector = `div#${fid} > div.wit__contentContainer > div.wit__contentCanvas > div.topContent`
    } break
    case 'wit__bar': {
      selector = `div#${fid} > .wit__bar`
    } break
    case 'wit__contentContainer': {
      selector = `div#${fid} > div.wit__contentContainer`
    } break
    case 'witSignUpInOut__nick':
    case 'witSignUpInOut__login':
    case 'witSignUpInOut__pass_1':
    case 'witSignUpInOut__pass_2': {
      selector = `input.${element}`
    } break
    case 'handleWitBd__name': {
      selector = `input.${element}`
    } break
    case 'wit': {
      selector = `div#${fid}`
    } break
    default: {
      selector = `div#${fid}`
    } break
  }
  return selector
}

export const getElems = (fid, className) => {
  // use: serviceFunc.getElems(fid, className)[0]
  const selector = selectorElement(fid, className)
  const elems = document.querySelectorAll(selector)
  //console.info('serviceFunc.getElems', { selector, elems })
  return elems
}

export const getElementSize = element => {
  const width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''))
  const height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''))
  const x = element.getBoundingClientRect().left
  const y = element.getBoundingClientRect().top
  //console.info('serviceFunc.getElementSize', { x, y, width, height, element })
  return { x, y, width, height }
}

// Change array with new instance with new item identified by indexOf prop-value
export const changeArrayByNewInstance = (arrOld, newItem, propAsId, valOld) => {
  const index = arrOld.map(item => item[propAsId]).indexOf(valOld)
  const arrNew = [
    ...arrOld.slice(0, index),
    newItem,
    ...arrOld.slice(index + 1),
  ]
  return arrNew
}

// Function to return wit.min 
export const elemFind = (selector, specificPart) => {
  const elems = document.querySelectorAll(selector)
  let elem
  elems.forEach(item => {
    const srcIndexOf = item.src.indexOf(specificPart)
    if (srcIndexOf !== -1) {
      elem = item
    }
  })
  return elem
}

// Function to convert text string with MD into html
export const converterMdStringToHtmlString = str => {
  const converter = new showdown.Converter({
    simpleLineBreaks: true,
    backslashEscapesHTMLTags: true,
    emoji: true,
    smoothPreview: true,
    tasklists: true,
    metadata: true,
    encodeEmails: false,
    openLinksInNewWindow: true,
    strikethrough: true,
    simplifiedAutoLink: true,
    underline: true,
    literalMidWordUnderscores: false,
  })
  const html = converter.makeHtml(str)
  return html
}

// Function to make div resizable div in JS by Hung Nguyen
// https://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d
export function makeResizableDiv(fid) {
  const element = getElems(fid, 'wit')[0]
  // console.info('serviceFunc->makeResizableDiv() [0]', { elements: getElems(fid, 'wit') })
  const resizers = getElems(fid, 'resizer')
  let original_width = 0
  let original_height = 0
  let original_x = 0
  let original_y = 0
  let original_mouse_x = 0
  let original_mouse_y = 0
  let original_offSetX = 0
  let original_offSetY = 0

  for (let i = 0; i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function(e) {
      e.preventDefault()
      e.stopPropagation()
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.getBoundingClientRect().left
      original_y = element.getBoundingClientRect().top
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      original_offSetX = original_x - element.offsetLeft
      original_offSetY = original_y - element.offsetTop
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })
    
    const resize = function (e) {
      e.preventDefault()
      e.stopPropagation()
      let elementStyleWidth
      let elementStyleHeight
      if (currentResizer.classList.contains('bottom-right')) {
        elementStyleWidth = original_width + (e.pageX - original_mouse_x)
        element.style.width = elementStyleWidth + 'px'
        elementStyleHeight = original_height + (e.pageY - original_mouse_y)
        element.style.height = elementStyleHeight + 'px'
      }
      else if (currentResizer.classList.contains('bottom-left')) {
        elementStyleWidth = original_width - (e.pageX - original_mouse_x)
        element.style.width = elementStyleWidth + 'px'
        elementStyleHeight = original_height + (e.pageY - original_mouse_y)
        element.style.height = elementStyleHeight + 'px'
        element.style.left = original_x + (e.pageX - original_mouse_x) - original_offSetX + 'px'
      }
      else if (currentResizer.classList.contains('top-right')) {
        elementStyleWidth = original_width + (e.pageX - original_mouse_x)
        element.style.width = elementStyleWidth + 'px'
        elementStyleHeight = original_height - (e.pageY - original_mouse_y)
        element.style.height = elementStyleHeight + 'px'
        element.style.top = original_y + (e.pageY - original_mouse_y) - original_offSetY + 'px'
      }
      else if (currentResizer.classList.contains('top-left')) {
        elementStyleWidth = original_width - (e.pageX - original_mouse_x)
        element.style.width = elementStyleWidth + 'px'
        elementStyleHeight = original_height - (e.pageY - original_mouse_y)  + 'px'
        element.style.height = elementStyleHeight + 'px'
        element.style.top = original_y + (e.pageY - original_mouse_y) - original_offSetY + 'px'
        element.style.left = original_x + (e.pageX - original_mouse_x) - original_offSetX + 'px'
      }

      const textAreaElem = getElems(fid, 'topContent__elem_A_textarea')[0]
      if (textAreaElem) {
        textAreaElem.style.width = elementStyleWidth - 20 + 'px'
        textAreaElem.style.height = elementStyleHeight + 'px'
      }
      // console.info('serviceFunc->makeResizableDiv() [5]', { e, element, elementStyleWidth, elementStyleHeight })
    }
    
    function stopResize() {
      window.removeEventListener('mousemove', resize);
    }
  }
}

// Function to get array of attributes by propVal
export const arrOfObjGetArrAttrByPropVal = (arrIn, arrPropVal, attr) => {
  const arrFiltered = arrIn.filter(item => {
    let isTrue = false
    for (let i = 0; i < arrPropVal.length; i++) {
      const prop = arrPropVal[i].prop, val = arrPropVal[i].val
      if (item[prop] && item[prop] === val) {
        isTrue = true
      }
    }
    return isTrue
  })
  const arrOut = arrFiltered.map(item => {
    if (item[attr]) {
      return item[attr]
    }
  })
  return arrOut
}

// Function to omit property of array of objects by values of simple array
export const arrOfObjOmitPropArrByArr = (arrIn, propToFilter, arrToOmit) => {
  const arrOut = arrIn.map(item => {
    let isTrue = true
    if (item[propToFilter]) {
      item[propToFilter] = item[propToFilter].filter(item => {
        let isTrue = true
        for (let i = 0; i < arrToOmit.length; i++) {
          if (item === arrToOmit[i]) {
            isTrue = false
          }
        }
        return isTrue
      })
    }
    return item
  })
  return arrOut
}

// Function to return array of objects composed of the own and inherited 
// enumerable property paths of object that are not omitted
export const arrOfObjOmitByPropVal = (arrIn, arrPropVal) => {

  const arrOut = arrIn.filter(item => {
    let isTrue = true
    for (let i = 0; i < arrPropVal.length; i++) {    
      const prop = arrPropVal[i].prop, val = arrPropVal[i].val
        if (item[prop] === val) {
          isTrue = false
        }     
    }
    return isTrue
  })
  return arrOut
}


// Function to filter properties of the object by the array of properties (keys)
export const filterPropsObjArrFunc = (witInstances, keys, flag) => {
  // flag could be 'omit', if nothing then pick

  let witInstancesNext = witInstances.map(item => {
    let itemNext = {}
    for (let prop in item) {
      const isAllowed = keys.filter(item => item === prop).length > 0 ? true : false

      if ( flag !== 'omit') {
        if (item.hasOwnProperty(prop) && isAllowed) {
          itemNext[prop] = item[prop]
        }
      }
      else {
        if (item.hasOwnProperty(prop) && !isAllowed) {
          itemNext[prop] = item[prop]
        }
      }
    }
    return itemNext
  })
  return witInstancesNext
}

// Function to filter properties of array of object and return reduced array
export const arrOfObjPickArrProp = (witInstances, arrProps) => {

  const witInstancesNext = witInstances.map(item => {
    const witInstance = {}
    for (let i = 0; i < arrProps.length; i += 1) {
      const prop = arrProps[i]
      if (item[prop]) {
        witInstance[prop] = item[prop]
      }
    }
    return witInstance
  })
  return witInstancesNext
}

// Function to detect prefix type
export const testFidPrefixTypeFunc = fid => {
  // console.info('testFidPrefixTypeFunc [0]', { fid })
  const isFidOut = fid.match(/^[\S]{1,}__out$/gim)
  const isFidCur = fid.match(/^[\S]{1,}__cur$/gim)
  const isFidIn = fid.match(/^[\S]{1,}__ins$/gim)

  let fidPrefixType
  if (isFidOut !== null && isFidCur === null && isFidIn === null) {
    fidPrefixType = 'out'
  }
  else if (isFidOut === null && isFidCur !== null && isFidIn === null) {
    fidPrefixType = 'cur'
  }
  else if (isFidOut === null && isFidCur === null && isFidIn !== null) {
    fidPrefixType = 'ins'
  }
  else {
    fidPrefixType = 'none'
  }
  // console.info('testFidPrefixTypeFunc [10]', { fidPrefixType, fid })
  return fidPrefixType
}

// Function to change fid for a newFid in the item and in children
export const itemNewFidParentChilren = witInstances => {
  let witInstancesNew = witInstances
  // console.info('serviceFunc->itemNewFidParentChilren [0]', { witInstances })

  for (let i = 0; i < witInstancesNew.length; i += 1) {
    const fidOldPrefixType = testFidPrefixTypeFunc(witInstancesNew[i].fid)
    const fidOrg = witInstances[i].fid.replace(/^([\S]{1,})(__[\S]{1,})$/gim, '$1')
    const aidNew = `id_${uuidv4()}`
    let witInstanceThis

    /*
    if (fidOldPrefixType !== 'none'
      && fidOldPrefixType !== 'ins'
      && fidOldPrefixType !== 'out') { continue }
    */

    let fidOld; let fidNew; let fidOldOut; let fidNewOut; let fidOldCur; let fidNewCur
    if (fidOldPrefixType === 'none') {
      fidOld = fidOrg
      fidNew = `id_${uuidv4()}`
    }
    else if (fidOldPrefixType === 'out') {
      fidOldOut = `${fidOrg}__out`
      fidOldCur = `${fidOrg}__cur`
      const uuid = uuidv4()
      fidNewOut = `id_${uuid}__out`
      fidNewCur = `id_${uuid}__cur`
    }
    else if (fidOldPrefixType === 'ins') {
      fidOld = `${fidOrg}__ins`
      fidNew = `id_${uuidv4()}__ins`
    }

    // Deal with fid
    witInstanceThis = witInstancesNew[i]
    let fid = witInstancesNew[i].fid
    if (witInstancesNew[i].fid === fidOld) {
      fid = fidNew
    }
    if (witInstancesNew[i].fid === fidOldOut) {
      fid = fidNewOut

      // Change fid__cur
      witInstancesNew = witInstancesNew.map(item => {
        let { fid } = item
        if (item.fid === fidOldCur) {
          fid = fidNewCur
        }
        return { ...item, fid }
      })
    }
    witInstancesNew[i] = { ...witInstanceThis, fid, aid: aidNew }

    // Deal with pid
    witInstancesNew = witInstancesNew.map(item => {
      const { pid: itemPid } = item
      let pid = itemPid
      if (item.pid === fidOld) {
        pid = fidNew
      }
      else if (item.pid === fidOldOut) {
        pid = fidNewOut
      }
      else if (item.pid === fidOldCur) {
        pid = fidNewCur
      }
      return { ...item, pid }
    })

    // Deal with cid
    witInstancesNew = witInstancesNew.map(item => {
      const { cid: cidOld } = item
      let cidNew = []
      if (cidOld.length > 0) {
        cidNew = cidOld.map(item => {
          let itemCidNew = item
          if (item === fidOld) {
            itemCidNew = fidNew
          }
          else if (item === fidOldOut) {
            itemCidNew = fidNewOut
          }
          else if (item === fidOldCur) {
            itemCidNew = fidNewCur
          }
          return itemCidNew
        })
      }
      return { ...item, cid: cidNew }
    })

  }

  return witInstancesNew
}

// Function to see if the instance is permitted by item.isTrueFalse 
export const isInstancePermitted = (item, witInstances, pid) => {
  let permit = true;
  if (item.isTrueFalse.isMultipleInstances === false) {
    const sameTypeWitInstances = witInstances.filter(itemFilter => itemFilter.type === item.type)
    if (sameTypeWitInstances.length > 0) {
      permit = false
    }
  }

  if (item.isTrueFalse.isMultipleInstancesForPid === false) {

    const witInstancePid = witInstances.filter( item => item.fid === pid )[0]
    const cidPid = witInstancePid.cid
    const typeInQuestion = item.type
    const isSameTypeWitInstanceForPid = witInstances
      .filter(item => {
        const isIncluded = ( key ) => {
          return key === item.fid
        }
        return cidPid.some(isIncluded)
      })
      .filter(item => item.type === typeInQuestion)

    if (isSameTypeWitInstanceForPid.length > 0) {
      permit = false
    }
    // console.info('SiteWindows->addApp [0]',{ typeInQuestion, isSameTypeWitInstanceForPid, cidPid, item, witInstancePid, witInstances });
  };
  return permit
}

export const compressStringToTweet = str => {
  return str
    .replace(/[\s]/gim, ' ')
    .replace(/^([\s]{0,})(\S[\s\S]*?)$/gim, '$2')
    .replace(/^([\s\S]{0,140})([\s\S]*?)$/gim, '$1');
}

export const devModeTrueElseFalse = active => {
  if( active === true ){
    return true;
  }
  else if( active === false && 
    ( location.hostname === 'localhost' || location.hostname === '127.0.0.1' )){
    return true;
  }
  else{
    return false;
  }
}

export const removeMarkdownCharacters = str => {
  return str.replace( /[\#\*\`\+\|]/gim, '' );
}  

export const convertHtmlToValue = str => {
  return str.replace( /\<br\>/g, '\n' );
}

// Function to convert a value of textarea (etc.) to innerHtml
export const convertValueToHtml = str => {
  
  let arr_1 = str.split('\n');
  let arr_2 = arr_1.map( item => item.replace( /\s/g, '&ensp;' ));  // &nbsp;
  let str_3 = arr_2.join('<br />');
  
  // console.info('serviceFunc->convertValueToHtml [0]',{ str, arr_1, arr_2, str_3 });
  return str_3;
} 

// Function to transform fid id to fid__cur
export const fidSuffixFunc = (actionType, fid, propsScope = { pidType: '', fidRoot: '' }) => {
  // console.info('serviceFunc->fidSuffixFunc [0]',{ actionType, fid, propsScope }); 
  const { pidType, fidType, fidRoot } = propsScope

  const fidPrefixType = testFidPrefixTypeFunc(fid)
  // console.info('serviceFunc->fidSuffixFunc [2]', { fidPrefixType })

  const fidOrg = fid.replace(/^([\S]{1,})(__[\S]{1,})$/gim, '$1')

  let fids = {
    pidType, fidType, fid, fidOrg, fidRoot, fidPrefixType
  }
  let fidOut; let fidIn; let fidOrgRoot; let caseSuf

  if (propsScope.fidRoot) {
    fidOrgRoot = propsScope.fidRoot.replace(/^([\S]{1,})(__[\S]{1,})$/gim, '$1')
  }

  // Create a local AppTopTaskCurrent task
  if (actionType === 'addedWitInstance'
      && pidType === 'AppTopTaskCurrent'
      && fidPrefixType === 'none') {
    caseSuf = 'Create a local AppTopTaskCurrent task'
    fidIn = `${fidOrg}__ins`
    fids = { caseSuf, ...fids, fidIn }
  }
  // Create a copy of Task for AppTopTaskCurrent  
  else if (actionType === 'addedCopyOfWitInstance'
      && pidType !== 'AppTopTaskCurrent'
      && fidPrefixType !== 'out') {
    caseSuf = 'Create a copy of Task for AppTopTaskCurrent'
    fidOut = `${fidOrg}__out`
    fidIn = `${fidOrg}__cur`
    fids = { caseSuf, ...fids, fidOrg: fidOrgRoot, fidOut, fidIn }
  }
  // Remove a local AppTopTaskCurrent task
  else if (actionType === 'removedCopyOfWitInstance'
      && pidType === 'AppTopTaskCurrent'
      && fidPrefixType === 'ins') {
    caseSuf = 'Remove a local AppTopTaskCurrent task'
    fidIn = `${fidOrg}__ins`
    fids  = { caseSuf, ...fids, fidIn }
  }
  // Remove a copy of Task clicking outside AppTopTaskCurrent
  else if (actionType === 'removedCopyOfWitInstance'
      && (fidPrefixType === 'out' || fidPrefixType === 'cur')) {
    caseSuf = 'Remove a copy of Task clicking outside AppTopTaskCurrent'
    fidOut = `${fidOrg}__out`
    fidIn = `${fidOrg}__cur`
    fids = { caseSuf, ...fids, fidOut, fidIn }
  }
  // Remove wit of any type itself
  else if (actionType === 'removedWitInstance'
      && fidType !== 'AppTopTaskCurrent') {
    caseSuf = 'Remove wit of any type itself'
    fidIn = fid
    fids = { caseSuf, ...fids, fidIn }
  }
  // Remove AppTopTaskCurrent itself
  else if (actionType === 'removedWitInstance'
      && fidType === 'AppTopTaskCurrent') {
    caseSuf = 'Remove AppTopTaskCurrent itself'
    fidIn = fid
    fids = { caseSuf, ...fids, fidIn }
  }
  // Archieve the Task if the current copy is NOT exist
  else if (actionType === 'archived'
      && (fidPrefixType !== 'out' && fidPrefixType !== 'cur')) {
    caseSuf = 'Archieve the Task if the current copy does NOT exist'
    fidIn = fid
    fids = { caseSuf, ...fids, fidIn }
  }
  // Archieve the Task if the current copy EXISTS
  else if (actionType === 'archived'
      && (fidPrefixType === 'out' || fidPrefixType === 'cur')) {
    caseSuf = 'Archieve the Task if the current copy EXISTS';
    fidOut = `${fidOrg}__out`
    fidIn = `${fidOrg}__cur`
    fids = {
      caseSuf, ...fids, fidOut, fidIn,
    }
  }
  // Create an ordinary task
  else {
    caseSuf = 'Create an ordinary task'
    fidIn = fidOrg
    fids = {
      caseSuf, ...fids, fidOut, fidIn,
    }
  }

  // console.info('serviceFunc->fidSuffixFunc [10]',{ fid, fids, propsScope, isFidOut, isFidCur, isFidIn }); 
  return fids
}  

// Function to remove instance with "nested" instances and notice in parent cid
export const removeWitInstanceConsistently = (witInstances, fid) => {
  //console.info('serviceFunc->removeWitInstanceConsistentlyWithActions',{ witInstances, action, fid });
  const collectFidNested = ( witInstances, cid, fidArr = [] ) => {
    // console.info('serviceFunc->removeWitInstanceConsistentlyWithActions() [9]',{ witInstances, cid, fidArr });
    fidArr = [ ...fidArr, ...cid ]
  
    for( let i = 0; i < cid.length; i++ ){
      const witInstance = witInstances.filter( item => item.fid === cid[i] )[0];
      if( witInstance && witInstance.cid.length > 0 ){
        
        fidArr = collectFidNested( witInstances, witInstance.cid, fidArr )
      }
    }
    return fidArr
  }
  
  let fidArr
  
  const pid = witInstances.filter( item => item.fid === fid )[0].pid
  const cid = witInstances.filter( item => item.fid === fid )[0].cid
  fidArr = collectFidNested( witInstances, cid )
  fidArr = [ fid, ...fidArr ]
  
  // REMOVED_WIT_INSTANCES
  witInstances = witInstances.filter( item => {
    const isNotIncluded = keys => {
      return keys !== item.fid
    }  
    return fidArr.every( isNotIncluded )
  })
  
  // REMOVED_CID
  let witInstance = witInstances.filter(item => item.fid === pid )[0]
  if (witInstance) { 
    witInstance.cid = witInstance.cid.filter(item => item !== fid)
    const index = witInstances.map(item => item.fid).indexOf(pid)
    
    witInstances = [
      ...witInstances.slice(0, index),
      witInstance,
      ...witInstances.slice(index + 1)
    ] 
  }
  //console.info('reduces->REMOVED_CID [3]',{ witInstance, pid: action.pid, fid: action.fid });

  //action.REMOVED_WIT_INSTANCES({ keys: fidArr })
  //action.REMOVED_CID({ pid, fid })
  
  return witInstances
}

// Functionn to overWrite set of witInstances with confirmation of overwriting
export const confirmOverWriteSetWitInstances = (description, witInstances, witInstancesExtra) => {
  let witInstancesNext = witInstances
  let witInstancesExtraNext = witInstancesExtra
  const witSiteWindows = witInstances.filter(item => item.type === 'SiteWindows')[0]
  const pid = witSiteWindows.fid
  let witInstanceExtraRoot = witInstancesExtraNext.filter(item => item.pidFrom === 'SiteWindows'
        && item.type !== 'AppDesktop')[0]
  const isDuplicate = witInstances.filter(item => item.fid === witInstanceExtraRoot.fid).length

  if (isDuplicate === 0) {
    witInstancesNext = addedCid(witInstancesNext, witSiteWindows.fid, witInstanceExtraRoot.fid)
    witInstanceExtraRoot = { ...witInstanceExtraRoot, pid }
    const index = witInstancesExtraNext.map(item => item.fid).indexOf(witInstanceExtraRoot.fid)
    witInstancesExtraNext = [
      ...witInstancesExtraNext.slice(0, index),
      witInstanceExtraRoot,
      ...witInstancesExtraNext.slice(index + 1),
    ]

    // console.info('reduces->ADDED_OVERWROTE_SET_WIT_INSTANCES [5]', { fid: witInstanceExtraRoot.fid, isDuplicate, witInstanceExtraRoot, witInstances })
    witInstancesNext = [...witInstancesNext, ...witInstancesExtraNext]
  }
  else if (confirm(description)) {
    witInstancesNext = removeWitInstanceConsistently(witInstancesNext, witInstanceExtraRoot.fid)
    // console.info('reduces->ADDED_OVERWROTE_SET_WIT_INSTANCES [9]', { fid: witInstanceExtraRoot.fid, witInstancesNext })
    
    witInstancesNext = addedCid(witInstancesNext, witSiteWindows.fid, witInstanceExtraRoot.fid)
    witInstanceExtraRoot = { ...witInstanceExtraRoot, pid }
    const index = witInstancesExtraNext.map(item => item.fid).indexOf(witInstanceExtraRoot.fid)
    witInstancesExtraNext = [
      ...witInstancesExtraNext.slice(0, index),
      witInstanceExtraRoot,
      ...witInstancesExtraNext.slice(index + 1),
    ]
    
    witInstancesNext = [...witInstancesNext, ...witInstancesExtraNext]
    // console.info('reduces->ADDED_OVERWROTE_SET_WIT_INSTANCES [10]', { fid: witInstanceExtraRoot.fid, witInstancesNext, witInstancesExtraNext })
  }
  return witInstancesNext
}


// Function to remove instance with "nested" instances and notice in parent cid
export const removeWitInstanceConsistentlyWithActions = (witInstances, action, fid) => {
  // console.info('serviceFunc->removeWitInstanceConsistentlyWithActions',{ witInstances, action, fid });
  const collectFidNested = ( witInstances, cid, fidArr = [] ) => {
    // console.info('serviceFunc->removeWitInstanceConsistentlyWithActions() [9]',{ witInstances, cid, fidArr });
    fidArr = [ ...fidArr, ...cid ]
  
    for( let i = 0; i < cid.length; i++ ){
      const witInstance = witInstances.filter( item => item.fid === cid[i] )[0];
      if( witInstance && witInstance.cid.length > 0 ){
        
        fidArr = collectFidNested( witInstances, witInstance.cid, fidArr )
      }
    }
    return fidArr
  }
  
  let fidArr
  
  const pid = witInstances.filter( item => item.fid === fid )[0].pid
  const cid = witInstances.filter( item => item.fid === fid )[0].cid
  fidArr = collectFidNested( witInstances, cid )
  fidArr = [ fid, ...fidArr ]
  action.REMOVED_WIT_INSTANCES({ keys: fidArr })
  action.REMOVED_CID({ pid, fid })
  
  return fidArr
}

// Function to throttle frequency of running a callback function
export const throttle = (callback, delay) => {
  let timeoutHandler = null;
  let n = 0;
  return () => {
    if (timeoutHandler == null) {
      timeoutHandler = setTimeout(() => {
        ++n;
        callback(n);
        timeoutHandler = null;
      }, delay);
    }
  };
};

export const getDisplayName = Component => {
  return Component.displayName || Component.name || 'Component';
}
  
// Get level of the witInstance
export const getWitLevelBottomUp = (witInstances, fid, level = 0) => {
  // console.info('', { level });
  let witInstancesFid = witInstances.filter( item => item.fid === fid );
  let witInstancesPid = witInstances.filter( item => item.fid === witInstancesFid[0].pid );
  // if( witInstancesFid.length > 0 && witInstancesFid[0].pid !== fidIn ){
  if( witInstancesFid.length > 0 ){
    let witInstancesPid = witInstances.filter( item => item.fid === witInstancesFid[0].pid );
    if( witInstancesPid.length > 0 ){
      ++level;
      level = getWitLevelBottomUp( witInstances, witInstancesFid[0].pid, level );
    }
  }    
  return level;   
}
 
// Get pid type by fid
export const getPidType = (witInstances, fid) => {
  const pid = witInstances.filter(item => item.fid === fid)[0].pid
  const type = witInstances.filter(item => item.fid === pid)[0].type
  return type
}

// Align zIndexes of the witInstances array of one level of hierarchy  
export const alignZIndexesOneLevel = witInstancesOneLevel => {

  if( witInstancesOneLevel.length === 0 ){
    return [];
  }
  else if( witInstancesOneLevel.length === 1 ){
    let witInstance = witInstancesOneLevel[0];
    let { pos } = witInstance;
    let { wit } = pos;
    let zIndex = 100;
    wit = { ...wit, zIndex };
    pos = { ...pos, wit };
    witInstance = {...witInstance, pos };
    return [ witInstance ];
  }

  const propComparator = ( prop0, prop1, prop2 ) => {
    return function(a, b) {
        return a[prop0][prop1][prop2] - b[prop0][prop1][prop2];
    }
  }
  witInstancesOneLevel = witInstancesOneLevel.slice().sort(propComparator('pos', 'wit', 'zIndex')); 

  let witInstancesZAlignOneLevel = [];
  
  for( let i = 0; i < witInstancesOneLevel.length; i++ ){

    // console.info('witInstancesSimpl.forEach', {item, i, witInstancesZAlignOneLevel});
    let zIndex;
    if( i === 0 ){
      zIndex = 100;
    }
    else if( i > 0 && parseInt( witInstancesOneLevel[i].pos.wit.zIndex ) === parseInt( witInstancesOneLevel[i-1].pos.wit.zIndex ) ){
      zIndex = witInstancesZAlignOneLevel[i-1].pos.wit.zIndex;
    }
    else if( i > 0 && parseInt( witInstancesOneLevel[i].pos.wit.zIndex ) > parseInt(witInstancesOneLevel[i-1].pos.wit.zIndex ) ){
      zIndex = witInstancesZAlignOneLevel[i-1].pos.wit.zIndex + 1;
    }
    
    let witInstance = witInstancesOneLevel[i];
    let { pos } = witInstance;
    let { wit } = pos;
    wit = { ...wit, zIndex };
    pos = { ...pos, wit };
    witInstance = {...witInstance, pos };
    witInstancesZAlignOneLevel = [...witInstancesZAlignOneLevel, witInstance ];
    
    // console.info('witInstancesSimpl.forEach', { zIndex, wit, pos });
  
  }
  
  return witInstancesZAlignOneLevel;
  
}


// Added cid to pid
export const addedCid = (state, pid, fid) => {
  
        let witInstance = state.filter( item => item.fid === pid )[0];
        const cid = witInstance.cid;
        const cidTemp = fid;
        
        const isFidInCid = cid.filter( item => item === cidTemp );
        if( isFidInCid.length > 0 ){
          return state;
        }
        
        witInstance.cid = [...cid, cidTemp];
        
        const index = state.map(item => item.fid).indexOf( pid );
        
        const stateTemp = [
          ...state.slice(0, index),
          witInstance,
          ...state.slice( index + 1 )
        ];
    return stateTemp;
  
}

// Align zIndexes of the witInstances array level by level with recursive function
export const alignZIndexesMultyLevel = (witInstances, fid, witInstancesZAlignMultyLevel = []) => {
  
  const children = witInstances.filter( item => item.pid === fid );

  const witInstancesTemp = alignZIndexesOneLevel( children );
  witInstancesZAlignMultyLevel = [...witInstancesZAlignMultyLevel, ...witInstancesTemp];
  // console.info(' witInstancesZAlignMultyLevel ',witInstancesZAlignMultyLevel.length, witInstancesZAlignMultyLevel);
  
  for( let i = 0; i < children.length; i++ ){
    if(  children[i].pid === fid ){
      // Call recursively
      witInstancesZAlignMultyLevel = alignZIndexesMultyLevel( witInstances, children[i].fid, witInstancesZAlignMultyLevel );
    }
  }      
  
  return witInstancesZAlignMultyLevel;
}

// Change unproper characters for get request from the string
export const urlStringSanitize = str => {
  return str.replace(/\~/gim, '%7E')
            .replace(/\!/gim, '%21')
            .replace(/\@/gim, '%40')
            .replace(/\#/gim, '%23')
            .replace(/\$/gim, '%24')
            .replace(/\&/gim, '%26')
            .replace(/\*/gim, '%2A')
            //.replace(/\(/gim, '%28')
            //.replace(/\)/gim, '%29')
            //.replace(/\=/gim, '%3D')
            //.replace(/\:/gim, '%3A')
            //.replace(/\//gim, '%2F')
            //.replace(/\,/gim, '%2C')
            .replace(/\;/gim, '%3B')
            //.replace(/\?/gim, '%3F')
            //.replace(/\+/gim, '%2B')
            //.replace(/\'/gim, '%27')
            .replace(/&nbsp;/gim, ' ')
            .replace(/&quot;/gim, '"')
            .replace(/&lt;/gim, '<')
            .replace(/&gt;/gim, '>')
            .replace(/&amp;/gim, 'a')
            .replace(/&apos;/gim, '\'')
            .replace(/&equals;/gim, '=');  
  
  //encodeURIComponent("~!@#$&*()=:/,;?+'") === ~!%40%23%24%26*()%3D%3A%2F%2C%3B%3F%2B'

  /*
    &Tab;  &#x00009;  &#9;  CHARACTER TABULATION
    &NewLine;  &#x0000A;  &#10;  LINE FEED (LF)
    !  &excl;  &#x00021;  &#33;  EXCLAMATION MARK
    "  &quot; &QUOT;  &#x00022;  &#34;  QUOTATION MARK
    #  &num;  &#x00023;  &#35;  NUMBER SIGN
    $  &dollar;  &#x00024;  &#36;  DOLLAR SIGN
    %  &percnt;  &#x00025;  &#37;  PERCENT SIGN
    &  &amp; &AMP;  &#x00026;  &#38;  AMPERSAND
    '  &apos;  &#x00027;  &#39;  APOSTROPHE
    (  &lpar;  &#x00028;  &#40;  LEFT PARENTHESIS
    )  &rpar;  &#x00029;  &#41;  RIGHT PARENTHESIS
    *  &ast; &midast;  &#x0002A;  &#42;  ASTERISK
    +  &plus;  &#x0002B;  &#43;  PLUS SIGN
    ,  &comma;  &#x0002C;  &#44;  COMMA
    .  &period;  &#x0002E;  &#46;  FULL STOP
    /  &sol;  &#x0002F;  &#47;  SOLIDUS
    :  &colon;  &#x0003A;  &#58;  COLON
    ;  &semi;  &#x0003B;  &#59;  SEMICOLON
    <  &lt; &LT;  &#x0003C;  &#60;  LESS-THAN SIGN
    =  &equals;  &#x0003D;  &#61;  EQUALS SIGN
    >  &gt; &GT;  &#x0003E;  &#62;  GREATER-THAN SIGN
    ?  &quest;  &#x0003F;  &#63;  QUESTION MARK
    @  &commat;  &#x00040;  &#64;  COMMERCIAL AT
    [  &lsqb; &lbrack;  &#x0005B;  &#91;  LEFT SQUARE BRACKET
    \  &bsol;  &#x0005C;  &#92;  REVERSE SOLIDUS
    ]  &rsqb; &rbrack;  &#x0005D;  &#93;  RIGHT SQUARE BRACKET
    ^  &Hat;  &#x0005E;  &#94;  CIRCUMFLEX ACCENT
    _  &lowbar;  &#x0005F;  &#95;  LOW LINE
    `  &grave; &DiacriticalGrave;  &#x00060;  &#96;  GRAVE ACCENT
    {  &lcub; &lbrace;  &#x0007B;  &#123;  LEFT CURLY BRACKET
    |  &verbar; &vert; &VerticalLine;  &#x0007C;  &#124;  VERTICAL LINE
    }  &rcub; &rbrace;  &#x0007D;  &#125;  RIGHT CURLY BRACKET
    &nbsp; &NonBreakingSpace;  &#x000A0;  &#160;  NO-BREAK SPACE       
  */
}

// Function to decode a string that has special HTML entities in it?
// https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it/7394787
export const sanitizeHtmlDecodedEntities = htmlCode => {
    const txt = document.createElement("textarea");
    txt.innerHTML = htmlCode;
    // console.info('sanitizeHtmlDecodedEntities',{value: txt.value});
    return txt.value;
}

// I do not use it for now, see above. Function to remove &quot; from my Json in javascript?
// https://stackoverflow.com/questions/9244824/how-to-remove-quot-from-my-json-in-javascript
export const getJsonHtmlDecoded = str => {
    
    str = str.replace(/&quot;/gim, '"');
    // console.info('getJsonHtmlDecoded &quot',str);
    str = str.replace(/&lt;/gim, '<');
    // console.info('getJsonHtmlDecoded &lt',str);
    str = str.replace(/&gt;/gim, '>');
    // console.info('getJsonHtmlDecoded &gt',str);
    return str;
}

// Split large string in n-size chunks in JavaScript
// https://stackoverflow.com/questions/7033639/split-large-string-in-n-size-chunks-in-javascript
export const chunkString = (str, length) => {
  if( str.length < 1801 ){ return [ str ]; }
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

// Function to get all elements that are under the item
export const getDownWitInstanceByType = (fid, type, witInstances) => {
  
  let witInstanceTemp, witInstance, cid;
  
  cid = witInstances.filter( item => item.fid === fid )[0].cid;
  
  for( let i = 0; i < cid.length; i++ ){
    
    witInstanceTemp = witInstances.filter( item => item.fid === cid[i] )[0];
    
    if( witInstanceTemp.type === type ){
        witInstance = witInstanceTemp;
        break;
    }
  }
  // console.info('SiteWindows-getDownWitInstanceByType() [10]',{ witInstance, fid, type, witInstances});
  return witInstance;
}

// Function to get all elements that are under the item
export const getUpperWitInstanceByType = (fid, type, witInstances) => {
  let pid, fidType, fidPid, witInstance;
  // console.info('SiteWindows->getUpperWitInstanceByType [2]', { fid, witInstances });
  pid = witInstances.filter( item => item.fid === fid )[0].pid;
  witInstance = witInstances.filter( item => item.fid === pid )[0];
  fidType = witInstance.type;
  // console.info('SiteWindows->getUpperWitInstanceByType [3]', { fid, pid, type, fidType }); // , witInstance, witInstances
  
  if( fidType !== type ){
    fid = witInstance.fid;
    // console.info('SiteWindows->getUpperWitInstanceByType [5]', { fid, pid, witInstance, witInstances });
    witInstance = getUpperWitInstanceByType( fid, type, witInstances );              
  }
  // console.info('SiteWindows->getUpperWitInstanceByType [10]', { fid, pid, witInstance, witInstances });
  return witInstance;
}

// Function to get all elements that are under the item
export const filterArrElemByParentFid = (witInstances, fid) => {
  const fidArr = [fid];
  const cid = fidCid( witInstances, fidArr );
  const witInstancesFiltered = witInstances.filter( item => {
    for( let i = 0; i < cid.length; i++ ){
      if( item.fid === cid[i] ){
        return true;
      }
    }
  });
  return witInstancesFiltered;
}

// Getting all cids based on fid (including fid)
export const fidCid = ( witInstances, fidTemp = [], cid = [] ) => {
  
  for( let i = 0; i < fidTemp.length; i++ ){
    
    for( let k = 0; k < witInstances.length; k++ ){
      
      if( witInstances[k].fid === fidTemp[i] ){
        cid.push( fidTemp[i] );
        // console.info('SiteWindows->handleFuncRun [4]()',{fidTemp, i, k, cid, fidTempI: fidTemp[i], fidK: witInstances[k].fid,  });
  
        if( witInstances[k].cid && witInstances[k].cid.length > 0 ){
          fidCid( witInstances, witInstances[k].cid, cid );
        }
      }
      
    }
  }
  
  return cid;
}


// **********************************************************
// Work with cookie
// https://learn.javascript.ru/cookie
// **********************************************************  
  
  // Getting cookie с именем name, если есть, если нет, то undefined
  export const getCookie  = (name) => {
    var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    //console.info('getCookie', { name, matches, cookie: document.cookie, document: document })
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  // Setting cookie, работоспособность не проверял
  export const setCookie  = (name, value, expires, path, domain, secure) => {
    //console.info('serviceFunc->setCookie',{name, value, expires, path, domain, secure});
    document.cookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");  
  }

  /* Function setting time for cookies expiration, see https://stackoverflow.com/questions/13154552/javascript-set-cookie-with-expire-time */
  export const timeShift = (hours) => {
    /*  input  (number) hours shift
      output  (string) GMT time (minus 5 hours)
    */
    var hours  = hours || 24;
    var now = new Date();
    /* console.log('now ini: ',now); */
    
    var time = now.getTime();
    var expireTime = time + 1000*60*60*hours;
    now.setTime(expireTime);
    /* console.log('now shift: ',now);
    console.log('now.toGMTString(): ',now.toGMTString()); */
    
    return now.toGMTString();
  }
  
  // Return date as php string
  export const dateToPhpString = (d) => {
        var fullYear    =  d.getFullYear();
        var month      =  d.getMonth() + 1;
        var date      =  d.getDate();    
        var  string      =  fullYear + '-' + month + '-' + date;
      return string;
  }

  // Return url composition
  export const urlComposition = (string: string) => {    
    let part     = {};
    const strMatch = string.match(/^([\d]{1,5}).([\d]{1,5}).([\d]{1,5}).([\d]{1,5})([\:]*?)([\d]*?)$/gim);
    // console.info(' urlComposition:',{string, strMatch} );
    
    if( strMatch !== null ){
      part.url = string.replace(/^([\d]{1,5}).([\d]{1,5}).([\d]{1,5}).([\d]{1,5})([\:]*?)([\d]*?)$/gim, '$1.$2.$3.$4');
      part.protocol = string.replace(/^([\d]{1,5}).([\d]{1,5}).([\d]{1,5}).([\d]{1,5})([\:]*?)([\d]*?)$/gim, '$6');
      part.domain_2m1 = part.url;
      part.domain2 = part.url;
      part.domain3 = part.url;
    }
    else{

      string      = string.replace(/^([a-zA-z]+:\/\/)www.([\s\S]*?)$/gim, "$1$2");
      string      = string.replace(/\?([\s\S]*?)$/gim, "");
      // console.info(' urlComposition:',string);
      
      part.url    = string;
      if(string.match(/^([^\/]{1,10})([\/]{2,10})([^\/])([\s\S]*)$/gim)){
        part.protocol  = string.replace(/^([^\/]{1,10})([\/]{2,10})([^\/])([\s\S]*)$/gim, "$1$2");
      }
      else{
        part.protocol  =  '';
      }
      part.domain1  = string.replace(/^([\s\S]*?\/\/[\s\S]*?|[\s\S]*?)\.([^.]*?)(\/([\s\S]*?)$|$)/gim, "$2");
      part.domain_2m1  = string.replace(/^([\s\S]*?\/\/[\s\S]*?|[\s\S]*?)([^.]*?)\.([^.]*?)(\/([\s\S]*?)$|$)/gim, "$2");
      part.domain2  = string.replace(/^([\s\S]*?\/\/[\s\S]*?|[\s\S]*?)([^.]*?\.[^.]*?)(\/([\s\S]*?)$|$)/gim, "$2");
      part.domain3  = string.replace(/^([\s\S]*?)\/\/([\s\S]*?)(\/([\s\S]*?)$|$)/gim, "$2");
      if( part.domain3.match(/^([^.]*?[\.][^.]*?)$/gim)){
        part.domain3= '';
      }
      if( string.match(/(^http[\S]{1,}answerlot.com\/question\/U[\d]{1,}T)([\S]{1,})(\/[\S]{1,}$)/gim)){
        part.id_tpc    = string.replace(/(^http[\S]{1,}answerlot.com\/question\/U[\d]{1,}T)([\S]{1,})(\/[\S]{1,}$)/gim, '$2');
      }
      else{
        part.id_tpc    = '0';
      }
    }
    return       part;
  }
  
  /* @function
      to find max (min) value in the array of objects by attribute value of the objects 
    
    @augments
      arrOfObjs
        @type array
      attr2Filter
        @type string
      filterValue
        @type string
      calcType
        @type string
      attr2CalcPath0
        @type string
      attr2CalcPath1
        @type string
        
    @return
      @type float or integer
  */
  export const zIndexCalc = ( init = 100, arrOfObjs, attr2Filter, filterValue, calcType, attr2CalcPath0, attr2CalcPath1, attr2CalcPath2 ) => {
    
    // console.info('zIndexCalc()',{ arrFiltered, arrOfObjs });
    if( !arrOfObjs && arrOfObjs.length === 0 ){
      return init;
    }
    
    const arrFiltered = arrOfObjs.filter( item => { 
      return item.type !== 'SiteWindows' && item[attr2Filter] === filterValue;  
    });
    if( arrFiltered.length === 0 ){
      return init;
    }
    
    const arrFidZindex = arrFiltered
      .filter( item => {
        const wit_Selector = '#' + item.fid;
        const wit_Elems = document.querySelectorAll(wit_Selector);
        if( wit_Elems.length === 0 || !wit_Elems[0] ){
          return false;
        }
        else{
          return true;
        }
      })
      .map( item => {     
        const wit_Selector = '#' + item.fid;
        const wit_Elems = document.querySelectorAll(wit_Selector);
        const zIndex = parseInt( wit_Elems[0].style.zIndex ); 
        return {fid: item.fid, zIndex }
      });

    return Math[calcType](...arrFidZindex.map( item => item.zIndex ));
  }

  export const initPos = () => {  
    return {
        wit: { position: 'fixed',
          top: 24, right: undefined, bottom: undefined, left: 24, 
          zIndex: 100, width: 250, height: 250, backgroundColor: '#f1f1f1' },
        wit__bar: { backgroundColor: '#2196F3' },
        wit__contentContainer: { display: 'block', position: 'relative' },
        wit__contentCanvas: { width: '100%', height: '100vh' },
        topContent: {},
      };
  }

  export const obj2LevelCombine = ( main: object = {}, extra: object = {} ) => {
    // console.info('initPos() [0]',{ main, extra });
    let propTemp0 = main, propTemp1 = {};
    
    for( let prop0 in main ){
      if( extra.hasOwnProperty( prop0 ) ){
        propTemp1[prop0] = extra[prop0];
        
        for( let prop1 in main[prop0] ){
          // console.info('initPos()',{ prop0, main, extra });
          if( extra[prop0].hasOwnProperty( prop1 ) ){
            propTemp1[prop0][prop1] = extra[prop0][prop1];
          }
          else{
            propTemp1[prop0][prop1] = main[prop0][prop1];
          }
        }
        propTemp0 = { ...main, ...propTemp1 };
      }
    }
    // console.info('serviceFunc.js->initPos() [10]',{ propTemp0, main, extra });
    return propTemp0;
  }
  
  export const posCurrent = (witInstance: object) => {
    
    const { fid } = witInstance;
    const { pos: posIn } = witInstance;
    const { wit: witIn, wit__bar: wit__barIn, topContent: topContentIn } = posIn;
    // const witIn = posIn.wit, wit__barIn = posIn.wit__bar, topContentIn = posIn.topContent;
    
    let wit = {}, wit__contentContainer = {}, wit__contentCanvas = {}, wit__bar = {}, topContent = {},
    pos = { wit, wit__bar, wit__contentContainer, wit__contentCanvas, topContent }, rectParent, selector, elems;
    
    elems = getElems(fid, 'wit');
    
    if( !elems || !elems[0] ){ return pos; }
    
    const position = elems[0].style.position;
    const rect = elems[0].getBoundingClientRect();
    
    if( elems[0].style.position === 'fixed'){
      rectParent = {top: 0, right: 0, bottom: 0, left: 0 };
    }
    else {
      rectParent = elems[0].parentElement.getBoundingClientRect();
    }

    const top = ( rect.top - rectParent.top ), 
    right = ( rect.right - rectParent.right ),
    bottom = ( rect.bottom - rectParent.bottom ),
    left = ( rect.left - rectParent.left ),
    width = ( elems[0].clientWidth + 2 ),
    height = ( elems[0].clientHeight + 2 ),
    zIndex = parseInt( elems[0].style.zIndex );
    wit = { ...witIn, position, top, right, bottom, left, width, height, zIndex };
    // console.info('serviceFunc.js->posCurrent [5]',{ fid, width, height, top, right, bottom, left  });
    // Math.floor() excluded

    elems = getElems(fid, 'wit__contentCanvas');
    if( elems.length > 0 ){
      wit__contentCanvas = { 
        width: elems[0].style.width,
        height: elems[0].style.height,
      };
    }
    else{
      wit__contentCanvas = {};
    }
    
    elems = getElems(fid, 'wit__contentContainer');
    if( elems.length > 0 ){
      wit__contentContainer = { 
        display: elems[0].style.display,
        position: elems[0].style.position,
      };
    }
    else{
      wit__contentContainer = {};
    }

    elems = getElems(fid, 'wit__bar');
    if( elems.length > 0 ){
      wit__bar = { ...wit__barIn,
        backgroundColor: elems[0].style.backgroundColor 
      };
    }
    else{
      wit__bar = {};
    }

    elems = getElems(fid, 'topContent');
    if( elems.length > 0 ){
      topContent = { ...topContentIn,
        color: elems[0].style.color,
        
      };
    }
    else{
      topContent = {};
    }
    
    pos = { wit, wit__bar, wit__contentContainer, topContent };
    // console.info('serviceFunc.js->posCurrent [10]',{ fid, position: pos.wit.position, zIndex: pos.wit.zIndex });
    
    return pos;
  }

  Number.isInteger = Number.isInteger || function(value) {
      return typeof value === "number" && 
             isFinite(value) && 
             Math.floor(value) === value;
  };
  
  export const nullNanStr = ( vrbl ) => {
    vrbl = isNaN(vrbl) ? vrbl : Math.floor(vrbl);
    let vrblReturn = null;
    if ( Number.isInteger( vrbl ) ){
      vrblReturn = vrbl.toString() + 'px';
    }
    else if ( typeof vrbl === 'string' ){
      vrblReturn = vrbl;
    }
    return vrblReturn;
  }
  
  export const posStatePx = ( pos ) => {
    const posInit = initPos();
    
    pos = obj2LevelCombine( posInit, pos );
    
    if( typeof pos === 'undefined' ){ return; };
    return {
      wit: {
        position: nullNanStr(pos.wit.position),
        top: nullNanStr( pos.wit.top ),
        right: nullNanStr( pos.wit.right ),
        bottom: nullNanStr( pos.wit.bottom ),
        left: nullNanStr( pos.wit.left ),
        width: nullNanStr( pos.wit.width ), 
        height: nullNanStr( pos.wit.height ),
        backgroundColor: nullNanStr( pos.wit.backgroundColor ),
        zIndex: (typeof pos.wit.zIndex !== 'undefined' ? 
          pos.wit.zIndex : 1 )
      },
      wit__contentContainer:  
        pos.wit__contentContainer,
      wit__contentCanvas: 
        pos.wit__contentCanvas,
      wit__bar: { 
        backgroundColor : pos.wit__bar.backgroundColor,
      },
      topContent: { 
        color: pos.topContent.color ,
        fontSize: pos.topContent.fontSize, 
        textAlign: pos.topContent.textAlign,   
      },
    };
  };  

  export const witInstanceState = ( fid, reduxState, posStatePxFunc ) => {
    // console.info('serviceFunc.js->witInstanceState() [0]',{ fid, reduxState });
    let witInstanceTemp = reduxState.witInstances.filter( filterItem => filterItem.fid === fid )[0];
    let { pos, posPast } = witInstanceTemp;
    // console.info('serviceFunc.js->witInstanceState() [0]',{ fid, type: witInstanceTemp.type, witInstanceTemp, reduxState });
    
    pos = obj2LevelCombine( initPos(), pos );
    const posStatePx = posStatePxFunc( pos );
    // console.info('serviceFunc.js->witInstanceState() [10]',{ fid, type: witInstanceTemp.type, pos, posStatePx, reduxState });
    
    if( !posPast ){
      posPast = witInstanceTemp.pos;
    }

    witInstanceTemp = {...witInstanceTemp, pos, posStatePx, posPast };
    return witInstanceTemp;
  };
  
// Define  Function to insert node if possible, if not - append
  export function insertAppendNode(parentNode, node, mode){
    
    if(mode  == 'insert'){
      if(parentNode && parentNode.childNodes[0] && node){
        parentNode.insertBefore(node, parentNode.childNodes[0]);
      }
      else if(parentNode && node){
        parentNode.appendChild(node, parentNode);  
      }
    }
    else if(mode  == 'append'){
      if(parentNode && node){
        parentNode.appendChild(node, parentNode);  
      }      
      else if(parentNode && parentNode.childNodes[0] && node){
        parentNode.insertBefore(node, parentNode.childNodes[0]);
      }      
    }
    return;
  }
  
  // Create predefined initial state with the localStorage connection to add to combineReducers
  // https://egghead.io/lessons/javascript-redux-supplying-the-initial-state
  export const loadState = ( name ) =>  {
    try{
      const   serializedState =  localStorage.getItem( name );
      if(    serializedState  === null){
        return undefined;
      }
      else{
        return  JSON.parse(serializedState);  
      }
    }
    catch(err){
      return undefined;
    }
  };

  export const saveState = ( name, state ) => {
    try{
      const serializedState = JSON.stringify(state);
      localStorage.setItem(name, serializedState);
    }
    catch(err){
      // Ignore write errors
      // Log error somewhere
    }
  };
  
  // Checking if var is empty, see https://javascript.ru/php/empty 
  export  let empty = ( mixed_var ) => {  // Determine whether a variable is empty
      // 
      // +   original by: Philippe Baumann

      if( typeof  mixed_var === 'undefined'  ||
            mixed_var === undefined    ||
            mixed_var === ''      ||
            mixed_var === null      ||
            mixed_var === false      ||
         (typeof mixed_var === 'array' && mixed_var.length === 0 ) ){
        return true;
      }
      else{
        return false;
      }
    }
    // empty = lets.Logger('Logger', empty);
    // empty = lets.Exception('Exception', empty);
    
  // Function for getting substring with n words of initial string with js split, slice, join methods
  export  const cutWords = (str, n) => {
      if(str.split(' ').length < 7){
        return str;
      }
      else{
        return str.split(' ').slice(0, 7).join(' ') + '...';
      }
    }
    
    
  // Checkign if object empty 
  export  const emptyObj = (obj) => {

      if( typeof  obj === 'undefined'  ||
            obj === undefined  ||
            obj === ''      ||
            obj === null    ||
            obj === false    ||
         (typeof obj === 'array' && obj.length === 0 )){
        return true;
      }
      else{
        for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
            return false;
        }
        return JSON.stringify(obj) === JSON.stringify({});
      }
    }
      
  // Object prototype for checking object to have an attribute
  // Example: console.info(' has.call: ', has.call(state, 'byId'));
  export  const has = Object.prototype.hasOwnProperty;

  // Getting max id from obj of element-objects with "for" iterator
  export  const getMaxProp = (obj) => {
      let maxId;
      let counter = 0;
      for(let prop in obj){
        if(counter === 0){ 
          maxId = parseInt(prop);
          counter++;
          continue;
        }
        
        else if(counter > 0 && parseInt(prop) > maxId){  // arr[i].id > arr[i-1].id
          maxId = parseInt(prop);
        }  
      }
      return maxId;
    }

    
    // Working alternative from Dan Abramov lesson. Helper to simulate asynctonous delay
  const delay01 =  (ms) => {
    // lets.Test('G->delay', /* testId */ '0', /* expect */ ms, /* toEqual */ [] );
    return new Promise(resolve => setTimeout(resolve, ms));
  };

    // Helper to simulate asynctonous delay in a form of array function
  const delay = (t, v) => {
     return new Promise((resolve)=> { 
      setTimeout(
        
        resolve.bind(null, v)

      , t)
     });
  }
  

  /*
  export const posPastCheckUpdate = ( posPast, posCurrent ) => {
  
    posPast = ( typeof posPast !== 'undefined' ?
      posPast : initPos() );
    
    const w = window, d = document, el = d.documentElement, 
    g = d.getElementsByTagName('body')[0],
    x1 = w.innerWidth, x2 = el.clientWidth, x3 = g.clientWidth,
    y1 = w.innerHeight, y2 = el.clientHeight, y3 = g.clientHeight;
    
    const width = x2, height = y2;
    
    if( width*0.9 < posCurrent.wit.width ||
      height*0.9 < posCurrent.wit.height ||
      35 > posCurrent.wit.height ||
      posCurrent.wit.height === 'min-content' ||
      posCurrent.wit.height === 'fit-content'){
      
      return posPast;
    }
    else{
      // console.info('posPastCheckUpdate() [7]',{ posCurrent });
      return posCurrent;
    }
  }
  */  
  
  
  