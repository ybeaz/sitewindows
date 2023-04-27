import React from 'react';
import PropTypes from 'prop-types';
import * as serviceFunc from '../../Shared/serviceFunc';
import CommonContainer from '../Containers/CommonContainer.react';
//import {Icon} from 'semantic-ui-react';

class FrameDiv4List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOnMouseUp: false,
      witInstanceState: serviceFunc.witInstanceState( this.props.fid, this.props.reduxState, serviceFunc.posStatePx ),
    };
    this.isOnMouseMove = false;
    this.pos1 = 0, this.pos2 = 0, this.pos3 = 0, this.pos4 = 0;
    //console.info('WindowInTab->constructor()',{props: this.props, state: this.state});
  } 

  render() {

    const {fid, handleWitInstance} = this.props;
    const { witInstanceState } = this.state;
    
    if(witInstanceState === undefined || witInstanceState.length === 0){
      return null;
    }
    const { pos, posStatePx, type } = witInstanceState;
    //console.info('FrameDiv4List->render()',{fid, pos, posStatePx, type, props: this.props, state: this.state});
    
    return (
      <div id={fid} className='wit b_r_0p2_em b_1px_s'
        onMouseLeave={(e) => handleWitInstance(e, 'sideBarOff', fid, pos)}
        style={{'position': posStatePx.wit.position,
                'top': posStatePx.wit.top, 'left': posStatePx.wit.left,
                'right': posStatePx.wit.right, 'bottom': posStatePx.wit.bottom,
                'overflow': 'hidden', 'zIndex': '10', 'textAlign': 'left',
                'backgroundColor': '#f1f1f1', 'borderColor': '#d3d3d3', 
                'boxShadow': 'rgba(0, 0, 0, 0.2) 3px 7px 7px 0px !important',
                'zIndex': posStatePx.wit.zIndex, 
                'width': posStatePx.wit.width, 
                'height': posStatePx.wit.height }}>
        <div className='wit__contentContainer h_90'>
          {this.props.children}
        </div>
      </div>);
  }
}
FrameDiv4List.propTypes = {  
};

export default CommonContainer(FrameDiv4List)
