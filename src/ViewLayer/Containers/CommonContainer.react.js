import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as action from '../../DataLayer/action/index'
import handleFuncRun from '../../DataLayer/reducer/handleFuncRun'
import handleWitInstance from '../../DataLayer/reducer/handleWitInstance'

const mapStateToProps = state => {
  return {
    reduxState: state,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(action, dispatch),
    handleFuncRun,
    handleWitInstance,
  }
}

const mergeProps = () => {  
  return {
    handleFuncRun,
    handleWitInstance,
  }
}

//export const CommonContainer = Component => connect(mapStateToProps, mapDispatchToProps, mergeProps)(Component)
const CommonContainer = Component => connect(mapStateToProps, mapDispatchToProps)(Component)
export default CommonContainer
