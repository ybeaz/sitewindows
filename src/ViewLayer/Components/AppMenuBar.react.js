import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from '../Containers/CommonContainer.react';

class AppDesktopMenuBar extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  menuItemsRender = () => {
    const { fid, aid, pid, handleFuncRun, reduxState } = this.props;
    const { witInstances } = this.props.reduxState;
    const witInstance = witInstances.filter(item => item.fid === pid )[0];
    
    return witInstance.sidebar.sidebarItems.map( ( item, i ) => {
      return <button key={i} className='buttonsPrime' 
        onClick={ (e) => handleFuncRun( e, item.toLowerCase(), fid, aid ) }>
        { item }
      </button>
      
    });
  }
  
  render() {
    //console.info('AppDesktopMenuBar->render()',{props:this.props});
        
    return (
      <div className='w_inh h_100 p_a_0p5_em'>{this.props.content}
          { this.menuItemsRender() }
      </div>
    );
  }
}
AppDesktopMenuBar.propTypes = {
};

export default CommonContainer(AppDesktopMenuBar)
