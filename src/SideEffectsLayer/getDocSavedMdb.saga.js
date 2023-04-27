import { take, takeEvery, call, put } from 'redux-saga/effects'
import * as serviceFunc from '../Shared/serviceFunc'
import * as communication from '../ComminicationLayer/fetch'
import { getDocListMdbSaga } from './getDocListMdb.saga'

function* getDocSavedMdbSaga(payload) {
  const { witInstances, witInstanceToSave, action, witInstancesToSave: witInstancesExtra, fid } = payload
  const { fid: fidOld } = witInstanceToSave
  // console.info('getDocSavedMdbSaga.saga.js [0]', { witInstances, action, fidOld, payload })
  try {
    yield call(() => communication.chunkRequest(payload))
    yield take('SAVED_DOC_NAMED_SUCCESS')
    yield call(getDocListMdbSaga, payload)
    yield call(serviceFunc.removeWitInstanceConsistentlyWithActions, ...[witInstances, action, fidOld])
    yield call(serviceFunc.removeWitInstanceConsistentlyWithActions, ...[witInstances, action, fid])
    yield call(action.ADDED_OVERWROTE_SET_WIT_INSTANCES, ...[{witInstancesExtra}])
  }
  catch (error) {
    yield put(action.getActionAsync('SAVED_DOC_NAMED','FAILURE'))
  }
}

export default function* getDocSavedMdbWatcher() {
  // console.info('getDocSavedMdbWatcher SAVING_DOC_NAMED', )
  yield takeEvery('SAVED_DOC_NAMED_REQUEST', getDocSavedMdbSaga)
}
