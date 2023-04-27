import { takeEvery, take, call, put } from 'redux-saga/effects'
import store from '../DataLayer/store'
import * as action from '../DataLayer/action/index'
import * as communication from '../ComminicationLayer/fetch'
import { getDocListMdbSaga } from './getDocListMdb.saga'

export function* removeDocMdbSaga(payload) {
  // console.info('removeDocMdbSaga.saga [0]', { payload })
  const { user, name, fid } = payload
  const endpoint = 'https://sitewindows.com/api/api_angel.php'
  const jsonpCallbackFunction = 'jsonCallBackFunc'
  const payloadTransport = {
    opt: 4,
    idUr: user.idUr,
    hash: user.hash,
    name,
    fid,
    dpref: 'wit',
  }
  try {
    // console.info('removeDocMdbSaga.saga [2]', { payload })
    yield call(() => 
      communication.fetchJsonpTransport(endpoint, jsonpCallbackFunction, payloadTransport)
        .then(jsonFrom => {
          // console.info('removeDocMdbSaga.saga.js [3]', { jsonFrom, dispatch:store.dispatch })
          store.dispatch(action.getActionAsync('REMOVED_DOC_NAMED', 'SUCCESS'))
        })
      )

    // console.info('removeDocMdbSaga.saga.js [5]', { endpoint })
    yield call(getDocListMdbSaga, payload)
    // console.info('removeDocMdbSaga.saga.js [7]', { payload, endpoint })
  }
  catch (error) {
    yield put(action.getActionAsync('REMOVED_DOC_NAMED', 'FAILURE'))
  }
}

export default function* removeDocMdbWatcher() {
  // console.info('saga.js->actionWatcher')
  yield takeEvery('REMOVED_DOC_NAMED_REQUEST', removeDocMdbSaga)
}
