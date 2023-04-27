import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from '../Containers/CommonContainer.react';

class AppDivEditable extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div contentEditable={true} 
        className='topContent w_inh h_100 p_a_0p5_em placeholder contenteditable'>
        {this.props.content}
      </div>
    );
  }
}
AppDivEditable.propTypes = {
};

export default CommonContainer(AppDivEditable)