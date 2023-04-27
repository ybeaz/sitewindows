import React from 'react';
import PropTypes from 'prop-types';
import * as serviceFunc from '../../Shared/serviceFunc';
import * as communication from '../../ComminicationLayer/fetch'
import CommonContainer from '../Containers/CommonContainer.react';
import BemInput from './BemInput.react';
import BemButton from './BemButton.react';

class AppwitSignUpInOut extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      witSignUpInOut__nick: null,
      witSignUpInOut__login: null,
      witSignUpInOut__pass_1: null,
      json: null,
      validity: {
        witSignUpInOut__nick: 'N',
        witSignUpInOut__login: 'N',
        witSignUpInOut__pass_1: 'N',
        witSignUpInOut__pass_2: 'N',
        witSignUpInOut__button: 'not-allowed', 
      }
    }
    //console.info('AppwitSignUpInOut->constructor() [0]', { state: this.state })
  }

  componentDidMount(){
    const { fid, reduxState } = this.props;
    const { witInstances } = reduxState;
    const witInstance = witInstances.filter( item => item.fid === fid )[0];
    const { propsScope } = witInstance;
    const { actionType } = propsScope
    if( actionType === 'witSignOut' ){
      let validityTemp = this.state.validity;
      validityTemp = {...validityTemp, witSignUpInOut__button: 'pointer'  };
      this.setState({ validity: validityTemp });
    }
  }

  componentDidUpdate(){
    //console.info('AppwitSignUpInOut->componentDidUpdate() [0]', { state: this.state });
  }

  inputValidate = (e, actionType, step, className ) => {
    
    let validityTemp = this.state.validity;
    
    //console.info('AppwitSignUpInOut->inputValidate() [0]', { actionType, step, value: e.target.value, mail: e.target.value.match(/^([\S]{1,})@([\S]{1,})([\.]{1,1})([^.]{2,})$/gi), className })

    // Nick witSignUp
    if( actionType === 'witSignUp' && step === 0 && className === 'witSignUpInOut__nick' && 
      e.target.value.length > 2
    ){ 
      if( this.state.validity.witSignUpInOut__login === 'Y' ){
        validityTemp = {...validityTemp, witSignUpInOut__nick: 'Y', witSignUpInOut__button: 'pointer' };
      }
      else{
        validityTemp = {...validityTemp, witSignUpInOut__nick: 'Y', witSignUpInOut__button: 'not-allowed' };
      }
      // console.info('AppwitSignUpInOut->inputValidate [5]',{ value: e.target.value, className, step, e });
      this.setState({ witSignUpInOut__nick: e.target.value, validity: validityTemp });
    }
    else if( actionType === 'witSignUp' && step === 0 && className === 'witSignUpInOut__nick' && 
      e.target.value.length <= 2
    ){
      validityTemp = {...validityTemp, 'witSignUpInOut__nick': 'N', witSignUpInOut__button: 'not-allowed' };
      this.setState({ validity: validityTemp });
    }
    
    // Login witSignUp
    else if ( actionType === 'witSignUp' && step === 0 && className === 'witSignUpInOut__login' && 
      e.target.value.match(/^([\S]{1,})@([\S]{1,})([\.]{1,1})([^.]{2,})$/gi) !== null ){
      if( this.state.validity.witSignUpInOut__nick === 'Y' ){
        validityTemp = {...validityTemp, witSignUpInOut__login: 'Y', witSignUpInOut__button: 'pointer' };
        this.setState({ witSignUpInOut__login: e.target.value });
      }
      else{
        validityTemp = {...validityTemp, witSignUpInOut__login: 'Y', witSignUpInOut__button: 'not-allowed' };
      }
      //console.info('AppwitSignUpInOut->inputValidate [7]',{ value: e.target.value, className, step, e });
      this.setState({ validity: validityTemp });
    }
    else if ( actionType === 'witSignUp' && step === 0 && className === 'witSignUpInOut__login' &&
      e.target.value.match(/^([\S]{1,})@([\S]{1,})([\.]{1,1})([^.]{2,})$/gi) === null
    ){
      validityTemp = {...validityTemp, witSignUpInOut__login: 'N', witSignUpInOut__button: 'not-allowed' };
      this.setState({ validity: validityTemp });   
    }

    // Login witSignIn
    else if ( actionType === 'witSignIn' && step === 0 && className === 'witSignUpInOut__login' && 
      e.target.value.match(/^([\S]{1,})@([\S]{1,})([\.]{1,1})([^.]{2,})$/gi) !== null ){
      validityTemp = {...validityTemp, witSignUpInOut__login: 'Y', witSignUpInOut__button: 'pointer' };
      this.setState({ witSignUpInOut__login: e.target.value, validity: validityTemp });
    }
    else if ( actionType === 'witSignIn' && step === 0 && className === 'witSignUpInOut__login' &&
      e.target.value.match(/^([\S]{1,})@([\S]{1,})([\.]{1,1})([^.]{2,})$/gi) === null
    ){
      validityTemp = {...validityTemp, witSignUpInOut__login: 'N', witSignUpInOut__button: 'not-allowed' };
      this.setState({ validity: validityTemp });   
    }    
    
    // Pass_1 witSignUp
    else if( actionType === 'witSignUp' && step === 1 && className === 'witSignUpInOut__pass_1' &&
      e.target.value.length > 5 && e.target.value.match(/[\s\n\r]{1,}/gi) === null
    ){
      if( this.state.validity.witSignUpInOut__pass_2 === 'Y' ){
        validityTemp = {...validityTemp, witSignUpInOut__pass_1: 'Y', witSignUpInOut__button: 'pointer'  };
      }
      else{
        validityTemp = {...validityTemp, witSignUpInOut__pass_1: 'Y', witSignUpInOut__button: 'not-allowed' };
      }
      this.setState({ witSignUpInOut__pass_1: e.target.value, validity: validityTemp });
    }
    else if ( actionType === 'witSignUp' && step === 1 && className === 'witSignUpInOut__pass_1' &&
      ( e.target.value.length <= 5 || e.target.value.match(/[\s\n\r]{1,}/gi) !== null )
    ){
      validityTemp = {...validityTemp, witSignUpInOut__pass_1: 'N', witSignUpInOut__button: 'not-allowed' };
      this.setState({ witSignUpInOut__pass_1: null, validity: validityTemp });   
    }

    // Pass_1 witSignIn
    else if( actionType === 'witSignIn' && step === 1 && className === 'witSignUpInOut__pass_1' &&
      e.target.value.length > 5 && e.target.value.match(/[\s\n\r]{1,}/gi) === null
    ){
      let space = e.target.value.match(/[\s\n\r]{1,}/gi);
      //console.info('AppwitSignUpInOut->inputValidate-Pass_1 [5]',{ actionType, step, value: e.target.value, space });
      validityTemp = {...validityTemp, witSignUpInOut__pass_1: 'Y', witSignUpInOut__button: 'pointer'  };
      this.setState({ witSignUpInOut__pass_1: e.target.value, validity: validityTemp });
    }
    else if ( actionType === 'witSignIn' && step === 1 && className === 'witSignUpInOut__pass_1' &&
      ( e.target.value.length <= 5 || e.target.value.match(/[\s\n\r]{1,}/gi) !== null )
    ){
      validityTemp = {...validityTemp, witSignUpInOut__pass_1: 'N', witSignUpInOut__button: 'not-allowed' };
      this.setState({ witSignUpInOut__pass_1: null, validity: validityTemp });   
    }
    
    // Pass_2 witSignUp
    else if( actionType === 'witSignUp' && step === 1 && className === 'witSignUpInOut__pass_2' &&
      e.target.value.length > 5 && 
      this.state.witSignUpInOut__pass_1 !== null &&
      this.state.witSignUpInOut__pass_1 === e.target.value 
    ){
      //console.info('AppwitSignUpInOut->inputValidate-Pass_2 [00]',{ validity: this.state.validity, value: e.target.value, className, step });
      if( this.state.validity.witSignUpInOut__pass_1 === 'Y' ){
        validityTemp = {...validityTemp, witSignUpInOut__pass_2: 'Y', witSignUpInOut__button: 'pointer'  };
      }
      else{
        validityTemp = {...validityTemp, witSignUpInOut__pass_2: 'N', witSignUpInOut__button: 'not-allowed' };
      }
      this.setState({ validity: validityTemp },
        /* console.info('AppwitSignUpInOut->inputValidate-Pass_2 [Y]',{ validityTemp, validity: this.state.validity, value: e.target.value, className, step }) */ );
    }
    
    //
    else if ( actionType === 'witSignUp' && step === 1 && className === 'witSignUpInOut__pass_2' &&
      ( e.target.value.length <= 5 || 
      this.state.witSignUpInOut__pass_1 === null ||
      this.state.witSignUpInOut__pass_1 !== e.target.value )
    ){
      validityTemp = {...validityTemp, witSignUpInOut__pass_2: 'N', witSignUpInOut__button: 'not-allowed' };
      this.setState({ validity: validityTemp },
        /* console.info('AppwitSignUpInOut->inputValidate-Pass_2 [N]',{ validityTemp, validity: this.state.validity, value: e.target.value, className, step }) */ );   
    }
    
    // witSignOut
    else if( actionType === 'witSignOut' ){
      validityTemp = {...validityTemp, witSignUpInOut__button: 'pointer'  };
      this.setState({ validity: validityTemp });
    }
    
    //console.info('AppwitSignUpInOut->inputValidate [10]',{ validity: this.state.validity, value: e.target.value, className, step, e });  
    return;
  }
    
  eventHandle = (e, actionType, step ) => {

    const { fid, reduxState } = this.props;
    const { witInstances } = reduxState;
    const witInstance = witInstances.filter( item => item.fid === fid )[0];
    const { pid } = witInstance;  
    const { validity } = this.state;
    let selector, elems;
    //console.info('AppwitSignUpInOut->eventHandle  [0]',{actionType, step, validity, state: this.state, trueFalse: validity.witSignUpInOut__button === "not-allowed" });
    
    if( validity.witSignUpInOut__button === "not-allowed" ){ 
      console.info('AppwitSignUpInOut->eventHandle  [3]',{actionType, step, witSignUpInOut__button: validity.witSignUpInOut__button });
      return; 
    }
    else if( ( actionType === 'witSignUp' || actionType === 'witSignIn' ) && step === 0 ){
      this.setState({ step: 1 });
    }
    else if( actionType === 'witSignUp' && step === 1 ){
      
      //console.info('AppwitSignUpInOut->eventHandle  [5]',{ actionType, step, endpoint });
      
      const setState = this.setState.bind(this);
      const state = this.state;
      const props = this.props;
      
      const endpoint = 'https://sitewindows.com/api/registrAuthGetPost.php'
      const jsonpCallbackFunction = 'jsonCallBackFunc'
      const payload = {
        opt: 2,
        nick: this.state.witSignUpInOut__nick,
        login: this.state.witSignUpInOut__login,
        psswrd: this.state.witSignUpInOut__pass_1,
        dpref: 'wit',
      }

        communication.fetchJsonpTransport(endpoint, jsonpCallbackFunction, payload)
          .then(function( user ) {
        //console.log('parsed json [3]', json);
        setState({ user });
        //console.log('parsed user [5]', user);
        
        serviceFunc.removeWitInstanceConsistentlyWithActions( witInstances, props.action, fid );
        props.action.REG_LOGIN_CHECK_USER({ user });
        
        alert('You are signed up successfully\nYou are welcome');
        
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
      
      //alert('Sorry, sign up functionality is in development\nYou are wellcome to use other functions!');
    }
    else if( actionType === 'witSignIn' && step === 1 ){

      elems = serviceFunc.getElems('', 'witSignUpInOut__pass_1')
      const witSignUpInOut__pass_1 = ( elems.length > 0 ? elems[0].value : null );

      //console.info('AppwitSignUpInOut->eventHandle  [5]',{ actionType, state: this.state, step, endpoint });  
      const setState = this.setState.bind(this);
      const state = this.state;
      const props = this.props;

      const endpoint = 'https://sitewindows.com/api/registrAuthGetPost.php'
      const jsonpCallbackFunction = 'jsonCallBackFunc'
      const payload = {
        opt: 1,
        nick: this.state.witSignUpInOut__nick,
        login: this.state.witSignUpInOut__login,
        psswrd: witSignUpInOut__pass_1,
        dpref: 'wit',
      }

      communication.fetchJsonpTransport(endpoint, jsonpCallbackFunction, payload)
        .then(function( user ) {
        // console.log('parsed json [3]', json);
        setState({ user });
        // console.log('parsed user [5]', { actionType, user });
        
        if (!user.err) {
          props.action.REG_LOGIN_CHECK_USER({ user });
          alert('You are signed in successfully\nYou are welcome');
        }
        else {
          props.action.SIGNED_OUT_USER();
          alert('You are not signed in successfully\nSomething went wrong');
        }
        serviceFunc.removeWitInstanceConsistentlyWithActions( witInstances, props.action, fid );
        
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
    }
    else if (actionType === 'witSignOut') {
      // console.info('AppwitSignUpInOut->eventHandle',{ actionType });
      alert('You signed out\nYou are wellcome to come back!');
      // alert('You are signed out successfully\nGoodby');
      serviceFunc.removeWitInstanceConsistentlyWithActions( witInstances, this.props.action, fid );
      this.props.action.SIGNED_OUT_USER();
    } 
  }
  
  render() {

    //console.info('AppwitSignUpInOut->render()',{ props: this.props, state: this.state });    
    const { fid, reduxState } = this.props;
    const { witInstances } = reduxState;
    const witInstance = witInstances.filter( item => item.fid === fid )[0];
    const { propsScope } = witInstance;
    const { actionType } = propsScope;

    //const actionType = 'witSignUp'; // 'witSignIn' 'witSignOut'
    const { step, validity } = this.state;
    
    let title = null, buttonText = null;
    
    if( actionType === 'witSignUp' && step === 0 ){
      title = 'Sign Up';
      buttonText = 'NEXT';
      
    }
    else if( actionType === 'witSignIn' && step === 0 ){
      title = 'Sign in';
      buttonText = 'NEXT';
    }
    else if( actionType === 'witSignUp' && step === 1 ){
      title = 'Hello ' + this.state.witSignUpInOut__nick;
      buttonText = 'SIGN UP';
    }
    else if( actionType === 'witSignIn' && step === 1 ){
      title = 'Hello';
      buttonText = 'SIGN IN';
    }    
    else if( actionType === 'witSignOut' ){
      title = 'Confirm sign out';
      buttonText = 'SIGN OUT';
    }

    const witSignUpInOut__nick = {
        inputValidate: this.inputValidate, 
        inputClassName: 'witSignUpInOut__nick', 
        inputType: 'text', 
        placeholder: 'Enter nick name', 
        validity: this.state.validity,
        paddingTop: '1.5em',
        actionType, step,
      },
      witSignUpInOut__login = {
        inputValidate: this.inputValidate, 
        inputClassName: 'witSignUpInOut__login', 
        inputType: 'text', 
        placeholder: 'Enter your email', 
        validity: this.state.validity,
        paddingTop: '1.5em',
        actionType, step,        
      },
      witSignUpInOut__pass_1 = {
        inputValidate: this.inputValidate, 
        inputClassName: 'witSignUpInOut__pass_1', 
        inputType: 'password', 
        placeholder: 'Password', 
        validity: this.state.validity,
        paddingTop: '0.5em',
        actionType, step,        
      },
      witSignUpInOut__pass_2 = {
        inputValidate: this.inputValidate, 
        inputClassName: 'witSignUpInOut__pass_2', 
        inputType: 'password', 
        placeholder: 'Password', 
        validity: this.state.validity,
        paddingTop: '0.5em',
        actionType, step,        
      };
    
    const cursor = validity.witSignUpInOut__button;
    const propsBemButton = { eventHandle: this.eventHandle, actionType, step, cursor, buttonText };
    
    return (
      <div className='topContent w_inh h_100 p_a_0p5_em'>

        <div className="witSignUpInOut t_a_c">
          <div className='w_80 m_a'>
            <div className='f_s_1p2_em p_t_0p5_em'>{ title }</div>
            
            { actionType === 'witSignUp' || actionType === 'witSignIn' ?
            
              <div>
                { step === 0 ?
                  <div>
                    { actionType === 'witSignUp' ?
                      <BemInput { ...witSignUpInOut__nick } />
                    : null }                   
                      <BemInput { ...witSignUpInOut__login } />
                  </div>
                : null }
                
                { step === 1 ?
                  <div className='witSignUpInOut__pass_wrap p_t_0p5_em t_a_l'>
                    <BemInput { ...witSignUpInOut__pass_1 } />

                    { actionType === 'witSignUp' ?
                      <div>
                        <div className='p_t_0p5_em'>Please repeat</div>
                        <BemInput { ...witSignUpInOut__pass_2 } />
                      </div>
                    : null }
                  
                  </div>
                : null }
                
              </div>
            : null }
            
            <BemButton { ...propsBemButton } />

          </div>
        </div>
      </div>
    );
  }
}

AppwitSignUpInOut.propTypes = {
};

export default CommonContainer(AppwitSignUpInOut)
