import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from '../Containers/CommonContainer.react';

class AppDesktop extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      arrayWit: [],
    };
    //console.info('AppDesktop->constructor()',{props:this.props});1
  }

  iconRunExampleAppTopTarget = ( fid, handleFuncRun ) => {
    const actionType = 'addedExampleAppTopTarget';
    const iconClassName = 'fas fa-bullseye c_p_Teal_200 c_point f_s_3_em';
    const nameCom = 'Exemplary AppTopTarget project';
    
    return <div className='d_i_b m_x_1_em m_t_1p2_em tooltipWit'>
            <i className={ iconClassName }
              onClick={(e) => handleFuncRun( e, actionType, fid )}>
            </i>
            <span className='tooltiptextWit'>{ nameCom }</span>
          </div>
    
  }

  iconRunWitTemplatesHtml = ( witTemplates, fid, handleFuncRun ) => {
   const actionType = 'addedWitInstance';
   return witTemplates
      .filter(item => item.isTrueFalse.isIconOnAppDesktop === true )
      .map((item, i, arr) => {
        const propsScope = { witTemplate: item, pid: fid };
        return (
          <div className='d_i_b m_x_1_em m_t_1p2_em tooltipWit'>
            <i key={i} className={ item.iconClassName }
              onClick={(e) => handleFuncRun( e, actionType, fid, propsScope )}>
            </i>
            { item.nameCom.length > 5 ?
              <span className='tooltiptextWit'>{ item.nameCom }</span>
            : null }
          </div>
        );
    });
  }
  
  render() {
    const { fid, reduxState, addApp, handleWitInstance, handleFuncRun } = this.props;
    const { witTemplates, witInstances } = this.props.reduxState;
    const pid = witInstances.filter(item => item.type === 'AppDesktop' )[0].fid;
    
    //console.info('AppDesktop->render()',{props:this.props, pid});
    
    const witTemplatesHtml = this.iconRunWitTemplatesHtml( witTemplates, fid, handleFuncRun );
    const iconRunExampleAppTopTarget = this.iconRunExampleAppTopTarget( fid, handleFuncRun );
    
    //console.info('AppDesktop->render() [10]',{witTemplatesHtml});
    return (
      <div className='p_l_0p6_em'>
        { witTemplatesHtml }
        { iconRunExampleAppTopTarget }
      </div>
    );
  }
}
AppDesktop.propTypes = {
};

export default CommonContainer(AppDesktop)