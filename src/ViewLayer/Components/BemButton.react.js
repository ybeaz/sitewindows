import React from 'react';		 
import PropTypes from 'prop-types';

export default class BemButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
		const { eventHandle, actionType, step, cursor, buttonText } = this.props;
    
		return  <div className='bemButton p_t_2_em'>
              <div className='button'
                style={{
                  cursor: cursor
                }}
                onClick = {(e) => eventHandle( e, actionType, step )} >
                { buttonText }
              </div>
            </div>;
	}
}

BemButton.propTypes = {
};

BemButton.defaultProps = {
}