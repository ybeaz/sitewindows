import * as actionTypes from './actionTypes'

export const action = (type, payload = {}) => {
  // console.info('action-index.js action()', { type, ...payload })
  return ({ type, ...payload })
}

// Not used now
export const getAction = type => ({
  'request': data => action(actionTypes[type].REQUEST, data),
  'success': data => action(actionTypes[type].SUCCESS, data),
  'failure': data => action(actionTypes[type].FAILURE, data),
})


// Get asynchroneous actions for saga
export const getActionAsync = (type, stage, data) => {
  // console.info('action-index.js action()', { actionTS: actionTypes[type][stage], actionT: actionTypes[type], type })
  return action(actionTypes[type][stage], data)
}


// Get synchroneours actions
export const DID_NULL = data => action(actionTypes.DID_NULL, data)
export const MERGED_SELECTED_PROJECTS = data => action(actionTypes.MERGED_SELECTED_PROJECTS, data)
export const SELECTED_PROJECT_TO_MERGE = data => action(actionTypes.SELECTED_PROJECT_TO_MERGE, data)
export const UPDATED_NAMECOM_WIT_APPTOPTARGET = data => action(actionTypes.UPDATED_NAMECOM_WIT_APPTOPTARGET, data)
export const UPDATED_CONTENT_WIT_INSTANCE_MD = data => action(actionTypes.UPDATED_CONTENT_WIT_INSTANCE_MD, data)
export const UPDATED_CONTENT_WIT_INSTANCE = data => action(actionTypes.UPDATED_CONTENT_WIT_INSTANCE, data)
export const REMOVED_WIT_INSTANCES_FID_SUFFIX = data => action(actionTypes.REMOVED_WIT_INSTANCES_FID_SUFFIX, data)
export const CHANGED_WIT_INSTANCE_FID = data => action(actionTypes.CHANGED_WIT_INSTANCE_FID, data)
export const SIGNED_OUT_USER = data => action(actionTypes.SIGNED_OUT_USER, data)
export const REG_LOGIN_CHECK_USER = data => action(actionTypes.REG_LOGIN_CHECK_USER, data)
export const UPDATED_WIT_INSTANCE_BY_REACT_STATE = data => action(actionTypes.UPDATED_WIT_INSTANCE_BY_REACT_STATE, data)
export const ADDED_OVERWROTE_SET_WIT_INSTANCES = data => action(actionTypes.ADDED_OVERWROTE_SET_WIT_INSTANCES, data)
export const ALIGN_ZINDEXES_WIT_INSTANCES = data => action(actionTypes.ALIGN_ZINDEXES_WIT_INSTANCES, data)
export const UPDATED_CONTENT_WIT_INSTANCES = data => action(actionTypes.UPDATED_CONTENT_WIT_INSTANCES, data)
export const UPDATED_POS_WIT_INSTANCES = data => action(actionTypes.UPDATED_POS_WIT_INSTANCES, data)
export const REMOVED_FID_FROM_CID_OF_ANOTHER_FID = data => action(actionTypes.REMOVED_FID_FROM_CID_OF_ANOTHER_FID, data)
export const ADDED_FID_TO_CID_OF_ANOTHER_FID = data => action(actionTypes.ADDED_FID_TO_CID_OF_ANOTHER_FID, data)
export const REMOVED_CID = data => action(actionTypes.REMOVED_CID, data)
export const ADDED_CID = data => action(actionTypes.ADDED_CID, data)
export const REMOVED_WIT_INSTANCES = data => action(actionTypes.REMOVED_WIT_INSTANCES, data)
export const REMOVED_WIT_INSTANCE = data => action(actionTypes.REMOVED_WIT_INSTANCE, data)
export const ADDED_WIT_INSTANCE = data => action(actionTypes.ADDED_WIT_INSTANCE, data)
export const ADDED_WIT_TEMPLATE = data => action(actionTypes.ADDED_WIT_TEMPLATE, data)
export const SET_WIT_INSTANCE_FILTER = data => action(actionTypes.SET_WIT_INSTANCE_FILTER, data)
export const TOGGLED_LOADING_INDICATOR = data => action(actionTypes.TOGGLED_LOADING_INDICATOR, data)
