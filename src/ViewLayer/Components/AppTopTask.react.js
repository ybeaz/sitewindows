import React from 'react';
import PropTypes from 'prop-types';

import CommonContainer from '../Containers/CommonContainer.react';

import * as serviceFunc from '../../Shared/serviceFunc';

class AppTopTask extends React.PureComponent {
  constructor(props) {
    super(props)

    const { fid, reduxState } = props
    const { witInstances } = reduxState
    const witInstance = witInstances.filter(item => item.fid === fid )[0]
    const { contentInnerHTML } = witInstance
    
    //console.info('AppTopTask->constructor() [0]', { contentInnerHTML, textContent, props: this.props });   
    
    this.state = {
      presentAction: 'watching',
      placeholder: this._getPlaceholder(),
      divDisplay: 'block',
      textareaDisplay: 'none',
      divHtmlA: contentInnerHTML,
    }    
    
  }

  divDisplayB = React.createRef();  
  textareaDisplayB = React.createRef();
  
  componentDidMount(){
    const { fid, handleFuncRun } = this.props;
    document.addEventListener( 'click', this.handleClickOutside.bind( null, fid, handleFuncRun ), false );
  }

  componentWillUnmount(){
    document.removeEventListener( 'click', this.handleClickOutside );
  }  
  
  componentDidUpdate(){
    const { fid, reduxState } = this.props;
    const { witInstances } = reduxState;
    const witInstance = witInstances.filter(item => item.fid === fid )[0];
    const { contentInnerHTML, textContent } = witInstance;

    //console.info('AppTopTask->componentDidUpdate() [0]', { contentInnerHTML, textContent, props: this.props });   
    
    this.setState({
      placeholder: this._getPlaceholder(),
      textAreaValueA: textContent,
      divHtmlA: contentInnerHTML,
    });
    
    //serviceFunc.getElems(fid, 'topContent__elem_A_textarea')[0].focus();
  }

  _getPlaceholder = () => {
    
    const { fid } = this.props
    const { witInstances } = this.props.reduxState
    const witInstance = witInstances.filter(item => item.fid === fid )[0];
    const { placeholder, cid } = witInstance
    let placeholderTemp = placeholder;
    if (cid && cid.length > 0) {
      placeholderTemp = ''
    }    
    
    return placeholderTemp;
  }
  
  //To add answer https://www.google.com/search?newwindow=1&ei=z2iwW5WBOtqu0PEPvueVoAI&q=reactjs+get+innerHTML+with+ref&oq=reactjs+get+innerHTML+with+ref&gs_l=psy-ab.3..33i160l2.288165.302275..302676...0.0..0.167.1437.18j2......0....1j2..gws-wiz.......0i71j35i39j35i304i39j0i22i30j33i299.exBh-kYV5w4
  //Search phrase: reactjs get innerHTML with ref
  inputContent = (e, fid, handleFuncRun) => {
    e.preventDefault();

    let textAreaValueA = e.target.value
    if (!e || !e.target || !e.target.value) {
      textAreaValueA = ''
    }
    //console.info('AppTopTask->inputContent() [0]', e.target.value);
    const isFidOut = fid.match(/^[\S]{1,}__out$/gim);
    const isFidCur = fid.match(/^[\S]{1,}__cur$/gim);
    const isFidIn  = fid.match(/^[\S]{1,}__ins$/gim);
    const fidOrg = fid.replace(/^([\S]{1,})(__[\S]{1,})$/gim, '$1');

    const converted = serviceFunc.convertValueToHtml( textAreaValueA );
    const contentInnerHTML = converted;
    const textContent = textAreaValueA;
    let propsScope = { contentInnerHTML, textContent };

    if( isFidOut === null && isFidCur === null && isFidIn === null ){
      propsScope = { ...propsScope, caseAct: 1.1 };
      handleFuncRun( e, 'inputContentElem', `${fidOrg}`, propsScope );
    }
    else if( isFidIn !== null ){
      propsScope = { ...propsScope, caseAct: 1.2 };
      handleFuncRun( e, 'inputContentElem', `${fidOrg}__ins`, propsScope );      
    }    
    else if( isFidOut !== null || isFidCur !== null ){
      propsScope = { ...propsScope, caseAct: 1.3 };
      handleFuncRun( e, 'inputContentElem', `${fidOrg}__out`, propsScope );      
      
      propsScope = { ...propsScope, caseAct: 1.4 };
      handleFuncRun( e, 'inputContentElem', `${fidOrg}__cur`, propsScope );
    }
    
    const brMatch = converted.match(/\<br\s\/\>/gim);
    let brNo = 0;
    if (brMatch !== null) {
      brNo = brMatch.length;
    }

    let focusedElement = null
    if (document.hasFocus() &&
        document.activeElement !== document.body &&
        document.activeElement !== document.documentElement
    ) {
      focusedElement = document.activeElement;
    }    
    //console.info('AppTopTask->inputContent() [10]',{ brNo, brMatch, focusedElement, converted, heightSt: focused_element.style.height, scrollHeightFe});

    focusedElement.style.height = '';
    focusedElement.style.height = ( 200 + brNo*10 ).toString() + 'px';
  }

  handleClickInside = (e, fid) => {
    e.preventDefault()
    e.stopPropagation()   
    //console.info('AppTopTask->handleClickInside() [0]',{ fid });
    
    const elemsTextarea = serviceFunc.getElems(fid, 'topContent__elem_A_textarea')
    const elemsDiv = serviceFunc.getElems(fid, 'topContent__elem_A')
    
    if (elemsTextarea.length > 0 && elemsDiv.length > 0) {
      const { reduxState } = this.props;
      const { witInstances } = reduxState;
      const witInstance = witInstances.filter(item => item.fid === fid)[0]
      const { textContent } = witInstance;

      this.setState({
        divDisplay: 'none', 
        textareaDisplay: 'block',
        presentAction: 'editing',
      });

      let textAreaValueA = textContent
      if (typeof textContent === 'undefined' || !textContent) {
        textAreaValueA = ''
      }
      elemsTextarea[0].value = textAreaValueA //elemsDiv[0].textContent; //this.state.textAreaValueA;

      setTimeout(() => {
        elemsTextarea[0].focus()
      }, 0)
      // console.info('AppTopTask->handleClickInside() [7]',{ contentInnerHTML, textContent, textContentEl: elemsDiv[0].textContent, state: this.state });
    }
  };
  
  handleClickOutside = ( ...args ) => {
        
    const fid = args[0];
    const e = args[2];
    e.preventDefault()
    e.stopPropagation()
    
    const handleFuncRun = args[1];
    const topContentElemA = serviceFunc.getElems(fid, 'topContent__elem_A')[0]
    const topContentElemATextarea = serviceFunc.getElems(fid, 'topContent__elem_A_textarea')[0]
    //console.info('AppTopTask->handleClickOutside() [2]',{ args });
    
    //divDisplay
    if ( topContentElemATextarea && topContentElemATextarea.contains( e.target )){
      //console.info('AppTopTask->handleClickOutside() [3]');
      return;
    }
    else if( !topContentElemA || 
      ( topContentElemA.current && topContentElemA.current.contains( e.target ))){
      return;
    }
    else if( topContentElemATextarea ){
      
      const { divHtmlA, textAreaValueA, presentAction } = this.state;
      /*
      console.info('AppTopTask->handleClickOutside() [7]', {
        elemsTextareaLen: elemsTextarea.length, elemsDivLen: elemsDiv.length, textAreaValueA, 
        textContentLen: elemsTextarea[0].textContent.length, textContent: elemsTextarea[0].textContent });
      */
      if( presentAction === 'editing'){
        
        /* 
        console.info('AppTopTask->handleClickOutside() [10]',
          { fid, presentAction: this.state.presentAction, divHtmlA, textAreaValueA, divHtmlAelem, textAreaValueAelem, props: this.props, state: this.state });
        */
        const propsScope = { contentInnerHTML: divHtmlA, textContent: textAreaValueA, caseAct: 2 };
        handleFuncRun( e, 'clickOutsideElem', fid, propsScope );
        
        this.setState({
          presentAction: 'watching',
        });          

      }
      else {
        this.setState({
          placeholder: this._getPlaceholder(),
        });        
      }
            
      this.setState({
        divDisplay: 'block', 
        textareaDisplay: 'none',
      });
      
      //console.info('AppTopTask->handleClickOutside() [10]',{ eTargetValue: e.target.value });
    }
  };

  render() {
    const { fid, handleFuncRun, reduxState, addApp, hocProps } = this.props;
    const { witInstances } = reduxState;
    const witInstance = witInstances.filter(item => item.fid === fid )[0];
    const { contentInnerHTML, textContent, pos, type, bar } = witInstance;
    const { divDisplay, textareaDisplay, placeholder, textAreaValueA, divHtmlA } = this.state;
    const { topContent } = pos
    const topContent__elem_A_style = topContent ? {
      color: topContent.color,
      textAlign: topContent.textAlign,
      paddingLeft: topContent.paddingLeft,
      display: divDisplay,
      height: '2em',
      hyphens: 'auto' } : { display: divDisplay };

    const topContent__elem_A_textarea_style = {
      display: textareaDisplay,
      padding: '0.5em', 
      background: pos ? pos.wit.backgroundColor : '',
      marginLeft: '-0.3em', 
      width: 'calc( 100% + 0.8em )', 
      height: '10em'}

    const menuIconVisible = bar.menuIcon && bar.menuIcon.length > 0 ? 'block' : 'none';

    //console.info('AppTopTask->render() [10]',{ topContent, state: this.state });
    return (
      <div className='topContent w_inh h_100 p_a_0p5_em'>
        <div>          
          <div className={ 'topContent__elem_A placeholder' }
            spellCheck={true} 
            dangerouslySetInnerHTML={{ __html: contentInnerHTML }} 
            placeholder={ placeholder }
            style={topContent__elem_A_style}
            onDoubleClick={ ( e ) => this.handleClickInside(e, fid) }
          >
          </div>
          <textarea className='topContent__elem_A_textarea textarea' 
            autofocus={true}
            onInput = {(e) => this.inputContent(e, fid, handleFuncRun)}
            style={topContent__elem_A_textarea_style}>
          </textarea>
        </div>
        <div className='topContent__elem_B pos_a d_t p_a_0p5_em' 
          style={{'width': 'fit-content', display: menuIconVisible}} >
          { hocProps.renderIcon( reduxState, fid, handleFuncRun, type ) }
        </div>
      </div>
    );
  }
  
}

AppTopTask.propTypes = {
};

export default CommonContainer(AppTopTask)