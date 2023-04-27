import { fork, all } from 'redux-saga/effects'

import getDocListMdbWatcher from './getDocListMdb.saga'
import getDocSavedMdbWatcher from './getDocSavedMdb.saga'
import getDocMdbWatcher from './getDocMdb.saga'
import removeDocMdbWatcher from './removeDocMdb.saga'

export default function *indexSaga() {
  yield all([
    fork(getDocListMdbWatcher),
    fork(getDocSavedMdbWatcher),
    fork(getDocMdbWatcher),
    fork(removeDocMdbWatcher),
  ]);
}
