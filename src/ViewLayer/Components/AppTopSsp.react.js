import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from '../Containers/CommonContainer.react';

class AppTopSsp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.arrIconData = [
      'fas fa-low-vision',
      'fas fa-bars',
      'fas fa-bullseye',
      'fas fa-sort-numeric-up',
      'fas fa-calendar-alt'
    ];
  }

  render() {

    const renderIcon = this.arrIconData.map((item, i, arr) => {
      
      return <div className='m_b_1_em'><i key={i} className={ item + ' ' + 'c_p_Blue_Grey_400 c_point f_s_3_em'} ></i></div>;
      
    });
  
    return (
      <div className='p_a_0p5_em w_100 h_100 d_t m_l_0p5_em' style={{'width': 'fit-content'}} >
        { renderIcon }
      </div>
    );
  }
}
AppTopSsp.propTypes = {
};

export default CommonContainer(AppTopSsp)
