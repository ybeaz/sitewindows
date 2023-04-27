import { delay } from 'redux-saga'
import { takeEvery, takeLatest, call, put } from 'redux-saga/effects'
import * as action from '../DataLayer/action/index'
import * as communication from '../ComminicationLayer/fetch'

export function* getDocMdbSaga(payload) {
  //console.info('getDocMdbSaga.saga [0]', { payload })

  const { user, name } = payload
  const endpoint = 'https://sitewindows.com/api/api_angel.php'
  const jsonpCallbackFunction = 'jsonCallBackFunc'
  const payload = {
    opt: 3,
    idUr: user.idUr,
    hash: user.hash,
    name,
    dpref: 'wit',
  }


  try {
    const doc = yield call(() =>
      communication.fetchJsonpTransport(endpoint, jsonpCallbackFunction, payload))
      //console.info('getDocMdbSaga.saga.js [3]', { doc, endpoint })

    yield put(action.ADDED_OVERWROTE_SET_WIT_INSTANCES({ witInstancesExtra: doc[0].witInstances }))
  }
  catch (error) {
    yield put(action.getActionAsync('LOADED_DOC_NAMED','FAILURE'))
  }

}

export default function* getDocMdbWatcher() {
  //console.info('saga.js->actionWatcher', )
  yield takeEvery('LOADED_DOC_NAMED_REQUEST', getDocMdbSaga)
}
