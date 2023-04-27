import React from 'react';	 
import PropTypes			from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';

export default class Loading extends React.PureComponent {

	render(){		
		const size = this.props.size ? this.props.size : 'medium';
		return <Dimmer active inverted>
				<Loader active={this.props.active}
						size={size}
						content='Loading' />
				{/* <img src="http://userto.com/img/spinner-medium.gif" /> */}
			</Dimmer>;
	}
}

Loading.propTypes = {
	active: PropTypes.bool,
	size: PropTypes.string,
	page: PropTypes.bool
};

Loading.defaultProps = {
	page: true
}