import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from '../Containers/CommonContainer.react';

class AppLoadWitBdMySql extends React.PureComponent {

  render() {

    return (
      <div contentEditable={true} 
        className='topContent w_inh h_100 p_a_0p5_em placeholder contenteditable'>
        {this.props.content}
      </div>
    )
  }
}
AppLoadWitBdMySql.propTypes = {
};

export default CommonContainer(AppLoadWitBdMySql)

