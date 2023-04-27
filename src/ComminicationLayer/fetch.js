import fetchJsonp from 'fetch-jsonp'
import store from '../DataLayer/store'
import * as action from '../DataLayer/action/index'

export const fetchJsonpTransport = (endpoint, jsonpCallbackFunction, payload) => {

  let payloadString = ''
  Object.keys(payload).forEach(key => {
    payloadString = `${payloadString}&${key}=${payload[key]}`
  })

  const endpointPayload = `${endpoint}?jsonp=${jsonpCallbackFunction}${payloadString}`

  //console.info('index.tsx [0]',{endpointPayload})
  
  return fetchJsonp(endpointPayload, {
    timeout: 5000,
    jsonpCallbackFunction
  })
    .then(response => {
      return response.json();
    })
    .catch(ex => {
      console.log('something failed', ex)
    })
}

// Function to extablish recursive transfer of the file with jsonp
export const chunkRequest = (payload, i = 0) => { 
  const {
    witInstanceToSave, name, jsonTo, jsonToChunksArr, user, timeOut,
  } = payload
  // console.info('AppHandleWitBd->chunkRequest() [0', i, ']', { payload, witInstanceToSave, name, jsonTo, jsonToChunksArr, user, timeOut })

  const endpoint = 'https://sitewindows.com/api/api_angel.php'
  const jsonpCallbackFunction = 'jsonCallBackFunc'
  const payloadTransport = {
    opt: 1,
    idUr: user.idUr,
    hash: user.hash,
    fid: witInstanceToSave.fid,
    name,
    type: witInstanceToSave.type,
    dpref: 'wit',
    jsonCurrent: i,
    jsonChunks: jsonToChunksArr.length,
    jsonLenTtl: jsonTo.length,
    jsonLenSent: jsonToChunksArr[i].length,
    json: jsonToChunksArr[i]
  }

  fetchJsonpTransport(endpoint, jsonpCallbackFunction, payloadTransport)
    .then(jsonFrom => {
      // console.log('parsed jsonFrom [0-3]', jsonFrom);
      const i = parseInt(jsonFrom.jsonCurrent) + 1
      if (i > 0 && i < jsonToChunksArr.length) {
        // console.log('serviceFunc->chunkRequest() [0-3-', i, ']', jsonFrom);
        setTimeout(
          chunkRequest(payload, i),
          timeOut,
        )
      }
      // alert(message.success)
      // console.log('AppHandleWitBd->chunkRequest() success [0-10-', i, ']', jsonToChunksArr.length)
      if (jsonToChunksArr.length === i) {
        store.dispatch(action.getActionAsync('SAVED_DOC_NAMED', 'SUCCESS', jsonFrom))
      }

      return jsonFrom
    })
    .catch(ex => {
      // alert(message.falure + '\n\n' + ex)
      console.log('AppHandleWitBd->chunkRequest() failed [0-10-', i, ']', ex)
    })
}

// Works, but Saga used instead. Function to get list of documents from MongoDb with generator*, jsonp
export const getDocListMdbGen = (endpoint, action) => {

  const promise = () => fetchJsonp(endpoint, {
    timeout: 5000,
    jsonpCallbackFunction: 'jsonCallBackFunc'
  })

  function* fetchDocListMdb (action) {
    yield promise()
  }

    const fetchGenerator = fetchDocListMdb()

    fetchGenerator.next().value
      .then((response) => {
        return response.json()
      })
      .then((jsonFrom) => {
        console.log('serviceFunc.js->getDataApiCall [0-3]', jsonFrom, action)
        action.getActionAsync('LOADED_DOC_LIST', 'REQUEST', jsonFrom)
      })
      .catch((error) => {
        console.info('Error getDocListMdb:', error)
      })

}

// Works, but Saga used instead. Function to get list of documents from MongoDb with async, awat, jsonp
export const getDocListMdbAwait = async (endpoint, action) => {
  
  try {
    const response = await fetchJsonp(endpoint, {
      timeout: 5000,
      jsonpCallbackFunction: 'jsonCallBackFunc'
    })
    const jsonFrom = await response.json()
    // console.log('serviceFunc.js->getDataApiCall [0-3]', response, jsonFrom, action)
    action.getActionAsync('LOADED_DOC_LIST', 'REQUEST', jsonFrom)
  } 
  catch(error) {
    console.info('Error getDocListMdb:', error)
  }
}

// Works, but Saga used instead.. Function to get list of documents from MongoDb with .then, jsonp
export const getDocListMdbWithThen = (endpoint, action) => {
  console.log('serviceFunc.js->getDataApiCall [0-0]', endpoint)
  const _promise = fetchJsonp(endpoint, {
    timeout: 5000,
    jsonpCallbackFunction: 'jsonCallBackFunc'
  })

  _promise.then(function(response) {
    return response.json()
  })
  .then((jsonFrom) => {
    // console.log('serviceFunc.js->getDataApiCall [0-3]', jsonFrom, action)
    action.getActionAsync('LOADED_DOC_LIST', 'REQUEST', jsonFrom)
  })
  .catch((error) => {
    console.info('Error getDocListMdb:', error)
  })
}