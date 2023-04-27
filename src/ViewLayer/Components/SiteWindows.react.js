import React from 'react'
import uuidv4 from 'uuid/v4'
import addApp from '../../Shared/addApp'
import * as serviceFunc from '../../Shared/serviceFunc'

import CommonContainer from '../Containers/CommonContainer.react';
import FrameWindowInTab from './FrameWindowInTab.react';
import AppTopTask from './AppTopTask.react' // '../Components/AppTopTask.react'; '../Containers/AppTopTaskContainer.react'; 

import FrameDiv4List from './FrameDiv4List.react'
import AppDesktop from './AppDesktop.react'
import AppDivEditable from './AppDivEditable.react'
import AppTimeAndDate from './AppTimeAndDate.react'
import AppSignUpInOut from './AppSignUpInOut.react'
import AppHandleWitBd from './AppHandleWitBd.react'

import * as HOC from '../HigherOrderComponents/appTopHoc.react'

const { renderIcon } = HOC

const COMPONENTS = {
  'FrameWindowInTab': FrameWindowInTab,
  'FrameDiv4List': FrameDiv4List,
  'AppDesktop': AppDesktop,
  'AppDivEditable': AppDivEditable,
  'AppTimeAndDate': AppTimeAndDate,
  'AppTopTask': HOC.appTopHoc(AppTopTask, { renderIcon }),
  'AppSignUpInOut': AppSignUpInOut,
  'AppHandleWitBd': AppHandleWitBd,
};


class SiteWindows extends React.PureComponent {

  pushWitInstance = ( witInstances, handleWitInstance, addApp, handleFuncRun, cid ) => {
    
    let witInstancesDom = [], witInstancesDomTemp = [];
    
    if( cid.length === 0 ){
      return null;
    }
    
    for ( let i = 0; i < witInstances.length; i++) {
      for ( let k = 0; k < cid.length; k++ ) {
        if( witInstances[i].fid === cid[k] ){
          
          let uid, Frame, propsFrame, Content, propsContent, newWitInstance = null;
    
          const { fid, pid, aid, propsScope } = witInstances[i]
          uid = `id_${uuidv4()}`
          
          if( witInstances[i].cid && witInstances[i].cid.length > 0 ){
            newWitInstance = this.pushWitInstance(
                witInstances, handleWitInstance, addApp, handleFuncRun, witInstances[i].cid );
            //setTimeout( , 0);
            //console.info('SiteWindows->pushWitInstance [5]',{ pid, fid, cid, type: witInstances[i].type, witInstancesDom });
          }
          
          Frame = COMPONENTS[witInstances[i].frame];
          propsFrame = { fid, handleWitInstance, handleFuncRun };
          Content = COMPONENTS[witInstances[i].content];
          propsContent = { fid, pid, aid, uid, propsScope, addApp, handleFuncRun };
          witInstancesDomTemp = 
            (<Frame key={ fid } { ...propsFrame } >
              <Content key={ aid } {...propsContent} />
              { newWitInstance }
            </Frame>);
          
          witInstancesDom = [ witInstancesDomTemp, ...witInstancesDom ];
          //console.info('SiteWindows->pushWitInstance [8]',{ pid, fid, cid, type: witInstances[i].type, witInstancesDom }); 
        }
        
      }
    }
    
    // console.info('SiteWindows->pushWitInstance [10]',{ witInstancesDom }); 
    return witInstancesDom;
  }
  
  forceUpdateHandler() { this.forceUpdate() }

  render() {
    const { reduxState, handleWitInstance, handleFuncRun } = this.props;
    const { witInstances } = reduxState;
    const index = witInstances.map(item => item.type).indexOf('SiteWindows')
    // console.info('SiteWindows->render() [7]', { index, reduxState, witInstances, SiteWindows: witInstances[index] })

    const witInstancesDom = this.pushWitInstance(witInstances, 
      handleWitInstance, addApp, handleFuncRun, witInstances[index].cid );
    
    // console.info('SiteWindows->render() [10]', { witInstances, props: this.props, state: this.state})
    return <div>{ witInstancesDom }</div>; 
  } 

}

export default CommonContainer(SiteWindows)
