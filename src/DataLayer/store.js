import { createStore, applyMiddleware } from 'redux';	//const 	{ createStore } 	= require('redux'); 
import createSagaMiddleware from 'redux-saga'
import * as middleware from './middleware'
import * as reducer from './reducer/reducer'
import indexSaga from '../SideEffectsLayer/index.saga'


const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares =	[sagaMiddleware, middleware.crashReporter]
  //[ middleware.logger, middleware.logger, middleware.crashReporter ]
  const store = createStore(reducer.appCombReducers, applyMiddleware(...middlewares))
  //console.info('index.js->configureStore', indexSaga)
  sagaMiddleware.run(indexSaga)
  return store
}
export default configureStore()
