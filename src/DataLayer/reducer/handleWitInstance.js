import addApp from '../../Shared/addApp'
import * as serviceFunc from '../../Shared/serviceFunc'

const handleWitInstance = (e, eventType, fid) => {
  e.preventDefault();
  const { witTemplates, witInstances } = this.props.reduxState
  // console.info('SiteWindows->handleWitInstance [0]()',{eventType, fid, pos, witInstances, state:this.state,props:this.props});
  switch (eventType) {
    case 'sideBarOn': {
      const witInstanceParent = witInstances.filter(item => ( item.fid === fid ))[0];
      if (!witInstanceParent.sidebar) {
        // console.info('SiteWindows->handleWitInstance [3]()', false);
        break
      }
      // console.info('SiteWindows->handleWitInstance [3]()',{ eventType, state: this.state, props:this.props, fid, pos, witInstanceParent });
      const item = witTemplates.filter(item => ( item.type === witInstanceParent.sidebar.type ))[0];
      addApp(e, item, this.props.reduxState, {}, fid);
      // console.info('SiteWindows->handleWitInstance [5]()',{ eventType, fid, item, witTemplates, reduxState: this.props.reduxState });
    } break
    case 'restored': {
      // console.info('SiteWindows->handleWitInstance [5]()',{ eventType, fid, pos, state: this.state, props:this.props });
    } break
    case 'max': {
      // Unused, used UI+redux approach in the component
      // console.info('SiteWindows->handleWitInstance [5]()',{ eventType, fid, pos, state: this.state, props:this.props });
    } break
    case 'min_right': {
      // Unused
      // console.info('SiteWindows->handleWitInstance [5]()',{ eventType, fid, pos, state: this.state, props:this.props });
    } break
    case 'min_bottom': {
      // Unused, used UI+redux approach in the component
      // console.info('SiteWindows->handleWitInstance [5]()',{ eventType, fid, pos, state: this.state, props:this.props });
    } break
    case 'close': {
      // console.info('SiteWindows->handleWitInstance [8]()',{ eventType, pid: witInstance.pid, fid: witInstance.fid });
      
      const { action } = this.props
      serviceFunc.removeWitInstanceConsistentlyWithActions(witInstances, action, fid)

      const fidPrefixType = serviceFunc.testFidPrefixTypeFunc(fid)
      if (fidPrefixType === 'cur') {
        const fidOrg = fid.replace(/^([\S]{1,})(__[\S]{1,})$/gim, '$1')
        action.CHANGED_WIT_INSTANCE_FID({ oldFid: fidOrg + '__out', newFid: fidOrg })
      } 
      // console.info('SiteWindows->handleWitInstance [10]()',{ eventType, witInstances });
    
      action.UPDATED_POS_WIT_INSTANCES()
      // console.info('SiteWindows->handleWitInstance [10]()',{ eventType, fidArr, fid: witInstance.fid, witInstances });
      // const wit = document.querySelector('#' + fid);
      // wit.parentNode.removeChild(wit);
    } break
    default: {
      console.info( 'SiteWindows->handleWitInstance [7]()','I have never heard of that ...', eventType );
    } break
  }
}

export default handleWitInstance
