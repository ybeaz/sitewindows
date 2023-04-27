import { delay } from 'redux-saga'
import { takeEvery, takeLatest, call, put } from 'redux-saga/effects'
import * as action from '../DataLayer/action/index'
import * as communication from '../ComminicationLayer/fetch'

export function *getDocListMdbSaga(payload) {
  // console.info('getDocListMdbSaga.saga [0]', { payload })
  const { user } = payload
  const endpoint = 'https://sitewindows.com/api/api_angel.php'
  const jsonpCallbackFunction = 'jsonCallBackFunc'
  const payload = {
    opt: 2,
    idUr: user.idUr,
    hash: user.hash,
    dpref: 'wit',
  }

  try {
    // console.info('getDocListMdbSaga.saga [2]', { payload })
    const docList = yield call(() =>
      communication.fetchJsonpTransport(endpoint, jsonpCallbackFunction, payload))
    // console.info('getDocListMdbSaga.saga.js [3]', { docList, endpoint })

    yield put(action.getActionAsync('LOADED_DOC_LIST', 'SUCCESS', { docList }))
  }
  catch (error) {
    yield put(action.getActionAsync('LOADED_DOC_LIST','FAILURE'))
  }
}

export default function* getDocListMdbWatcher() {
  // console.info('getDocListMdbSaga.saga.js [0]->actionWatcher', )
  yield takeEvery('LOADED_DOC_LIST_REQUEST', getDocListMdbSaga)
}
