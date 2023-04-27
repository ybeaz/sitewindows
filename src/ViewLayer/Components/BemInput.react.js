import React from 'react';	 
import PropTypes			from 'prop-types';

export default class BemInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { };
  }
  
	render(){		
		const { inputValidate, inputClassName, inputType, placeholder, actionType, step, validity, paddingTop } = this.props;
    
    return  <div className='BemInput w_100' style={{ paddingTop }}>
              <input className={ inputClassName + ' w_80 input'} type={ inputType } 
                placeholder={ placeholder } autofocus="" 
                onInput = {(e) => inputValidate(e, actionType, step, inputClassName )} />
              <div className='d_i_b w_15 t_a_c'>{ validity[inputClassName] }</div>
            </div>;
	}
}

BemInput.propTypes = {
};

BemInput.defaultProps = {
}