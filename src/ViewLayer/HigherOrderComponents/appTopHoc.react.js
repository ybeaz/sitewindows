//ReactJS topic Higher-Order Components
//https://reactjs.org/docs/higher-order-components.html


export const appTopHoc = (WrappedComponent, hocProps) => {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
    }


    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent hocProps={ hocProps } {...this.props} />;
    }
  };
}

export const renderIcon = ( reduxState = [], fid, handleFuncRun, type ) => {
  
    //console.info('renderIcon',{ type, fid, reduxState });
    const { witTemplates, witInstances } = reduxState;
    const witInstance = reduxState.witInstances.filter( item => item.fid === fid )[0]; 
    const menuIcon = witTemplates.filter( item => item.type === type )[0].bar.menuIcon; 

    if( !menuIcon || menuIcon.length === 0 ){
      return null;
    }
  
    const posInitIn = { 
        wit: { position: 'absolute', top: 50, right: undefined, 
          bottom: undefined, left: 50, zIndex: 100, width: 120, height: 120},
        wit__bar: { backgroundColor: 'darkblue' },
    };
 
    const renderIconJsx = witTemplates
      .filter(item => {
        const isIncluded = ( key ) => {
          return key === item.type;
        }  
        return menuIcon.some( isIncluded );      
      })
      .map(( item, i, arr ) => {
          const itemTemp = {...item, pidFrom: type };
          const actionType = 'addedWitInstance';
          item = { ...item, pidFrom: witInstance.type }
          const propsScope = { witTemplate: item, pid: fid };
                    
          return <div className='tooltipWit m_b_1_em t_a_c'>
            <i key={i} className={ itemTemp.iconClassName + ' ' + 'c_p_Blue_Grey_400 c_point f_s_3_em'} 
              onClick={(e) => handleFuncRun( e, actionType, fid, propsScope )} ></i>
            { itemTemp.nameCom.length > 5 ?
                <span className='tooltiptextWit'>{ itemTemp.nameCom }</span>
              : null }
          </div>;
        }
      );

    const renderIconTemp = witTemplates
      .filter(item => {
        
        item.pidFrom === 'AppTopTarget'
      
      });
      
    //console.info('appTopHoc.react.js->renderIcon [10]',{witTemplates, type, fid, renderIconJsx});
    return renderIconJsx;
  }