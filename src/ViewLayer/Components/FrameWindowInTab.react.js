import React from 'react'
import PropTypes from 'prop-types'
import * as serviceFunc from '../../Shared/serviceFunc'
import CommonContainer from '../Containers/CommonContainer.react'

class FrameWindowInTab extends React.PureComponent {
  constructor(props) {
    super(props);
    const witInstanceState = serviceFunc.witInstanceState( this.props.fid, this.props.reduxState, serviceFunc.posStatePx );
    // console.info('FrameWindowInTab->constructor() [0]',{ type: witInstanceState.type, witInstanceState, props: this.props});
    const { isTrueFalse } = witInstanceState;
    
    let overflowX = { overflowX: 'hidden' }, 
      overflowY = { overflowY: 'hidden' };
    if (isTrueFalse.isScrollbarX === true) {
      overflowX = { overflowX: 'scroll', width: '100%' };
    }
    if (isTrueFalse.isScrollbarY === true) {
      overflowY = { overflowY: 'scroll', width: '100%' };
    }   
 
    this.state = {
      isOnMouseUp: false,
      witInstanceState,
      overflowX, 
      overflowY,
      heightCC: { height: 'calc(100% - 2.0em)' },
    };
    this.isOnMouseMove = false;
    this.pos1 = 0, this.pos2 = 0, this.pos3 = 0, this.pos4 = 0;
    //console.info('FrameWindowInTab->constructor() [10]',{ witInstanceState, props: this.props, state: this.state });
  }

  componentDidMount(){
    const e = undefined;
    const { fid } = this.props;
    const { type, pos, bar, isTrueFalse, appStatus, witState } = this.state.witInstanceState;
    const { isRestoreWindowOn, isMaxWindowOn, isMinWindowOn } = isTrueFalse;
    
    let propsScope = { bar }
    const witInstanceState = this.colorStatusReactStateChange( this.state, appStatus, propsScope );
    this.setState({ witInstanceState });

    if( witState === 'minBottom' ){
      this.onClickMinWindow( e, type, fid, pos )
    }
    else if( witState === 'restored' ){
      this.onClickRestoreWindow( e, type, fid, pos );
    }
    else if( witState === 'max' ){
      //console.info('FrameWindowInTab->componentDidMount() [5]',{ type, fid, pos });
      this.onClickMaxWindow(e, type, fid, pos)
    }

    // Run function to make div resizable
    // console.info('FrameWindowInTab->componentDidMount() [10]',{ type, fid, pos });

    serviceFunc.makeResizableDiv(fid)

  }
  
  colorStatusReactStateChange = ( reactState, actionType, propsScope ) => {
    //console.info('FrameWindowInTab->colorStatusReactStateChange() [0]', { reactState, actionType, bar });
    
    const { bar } = propsScope;
    let backgroundColor, color
    if( bar && bar.barColor && bar.barColor.items ){   
      const { items } = bar.barColor;      
      const item = items.filter( item => item.actionType === actionType )[0];
      //console.info('FrameWindowInTab->colorStatusReactStateChange() [5]', {item, items, reactState, actionType, bar });
      backgroundColor = item.style.background;
      color = item.style.color;
      //console.info('FrameWindowInTab->colorStatusReactStateChange() [6]', {backgroundColor, color, actionType, item, bar, reactState });
    }
    else {
      backgroundColor = '#2196F3';
      color = '#000000';
    }
    
    //console.info('FrameWindowInTab->colorStatusReactStateChange() [6]', {backgroundColor, color, actionType, bar });
    const { witInstanceState } = reactState;
    const { fid, pos, posPast, contentInnerHTML } = witInstanceState;

    let posTemp, posPastTemp, wit__barTemp, topContentTemp, contentInnerHTMLTemp, witInstanceStateTemp;

    wit__barTemp = pos.wit__bar;
    wit__barTemp = {...wit__barTemp, backgroundColor: backgroundColor};    
    topContentTemp = pos.topContent;
    topContentTemp = {...topContentTemp, color: color};
    posTemp = pos;
    posTemp = {...posTemp, wit__bar: wit__barTemp, topContent: topContentTemp };
    //console.info('FrameWindowInTab->colorStatusReactStateChange() [7]', {backgroundColor: posTemp.wit__bar.backgroundColor, actionType, bar });
    
    wit__barTemp = posPast.wit__bar;
    wit__barTemp = {...wit__barTemp, backgroundColor: backgroundColor};    
    topContentTemp = posPast.topContent;
    topContentTemp = {...topContentTemp, color: color}; 
    posPastTemp = posPast;
    posPastTemp = {...posPastTemp, wit__bar: wit__barTemp, topContent: topContentTemp };    
    
    const posStatePx = serviceFunc.posStatePx( posTemp );

    const elems = serviceFunc.getElems( fid, 'topContent__elem_A')
    if( elems.length !== 0 && elems[0] && elems[0] !== '' ){
      //insertUntrustedText( elems[0], elems[0].innerHTML, 'br');
      contentInnerHTMLTemp = elems[0].innerHTML;
    }
    else{
      contentInnerHTMLTemp = null;
    }
    
    witInstanceStateTemp = {...witInstanceState, appStatus: actionType, pos: posTemp, 
      posPast: posPastTemp, posStatePx, contentInnerHTML: contentInnerHTMLTemp };
    //console.info('FrameWindowInTab->colorStatusReactStateChange() [10]',{ type: witInstanceStateTemp.type, witInstanceStateTemp });
    return witInstanceStateTemp;
  }
  
  barCurrentStyleFunc = actionType => {
    let barCurrentStyle;
    if( actionType === 'removedCopyOfWitInstance' ){
      barCurrentStyle = { color: 'yellow' };
    }
    else if( actionType === 'addedCopyOfWitInstance' ){
      barCurrentStyle = { color: 'grey' };
    }
    else{
      barCurrentStyle = { color: 'red' };
    }
    return barCurrentStyle;
  }

  barCurrent = (fid, type, bar, barType, pos, witState, handleWitInstance, handleFuncRun, reduxState) => {

    // console.info('FrameWindowInTab->barCurrent->[0]',{ fid, type, bar, barType, pos, witState, reduxState});

    if (!bar.barCurrent || bar.barCurrent !== true || witState === 'minBottom') { return null }

    const { witInstances } = reduxState
    const witInstancePid = serviceFunc.getUpperWitInstanceByType(fid, 'AppTopTarget', witInstances)
    const typePid = witInstancePid.type
    const cidPid = witInstancePid.cid
    // console.info('FrameWindowInTab->barCurrent [5]',{ type, pidFrom, typePid, witInstance, witInstancePid, fid, bar, barType, pos, witState, reduxState});

    let output; let isFidInTaskCurrentCid; let actionType = 'addedCopyOfWitInstance'

    const isAppTopTaskCurrent = reduxState.witInstances
      .filter(item => {
        const isIncluded = key => key === item.fid
        return cidPid.some(isIncluded)
      })
      .filter(item => item.type === 'AppTopTaskCurrent')

    if (isAppTopTaskCurrent.length > 0) {
      isFidInTaskCurrentCid = isAppTopTaskCurrent[0].cid.filter( item => {
        const fidTemp = `${fid.replace(/^([\S]{1,})(__[\S]{1,})$/gim, '$1')}__cur`
        // console.info('FrameWindowInTab->barCurrent->[1]',{fidTemp, fid});
        return item === fidTemp
      })
      // console.info('FrameWindowInTab->barCurrent->[2]',{isFidInTaskCurrentCid, reduxState});
      if (isFidInTaskCurrentCid.length > 0) {
        actionType = 'removedCopyOfWitInstance';
        // console.info('FrameWindowInTab->barCurrent->[3]',{ actionType });
      }
      else if (isFidInTaskCurrentCid.length === 0) {
        actionType = 'addedCopyOfWitInstance'
      }
    }

    const isFidIn = fid.match(/^[\S]{1,}__ins$/gim)

    // console.info('FrameWindowInTab->barCurrent [7]',{ actionType, typePid, isFidOut, isFidCur, fid, fidOrg, isFidIn, reduxState});
    if (isAppTopTaskCurrent.length === 0 || (isFidIn !== null)) {
      output = null
    }
    else {
      const classNameBlock = `wit__barCurrent ${actionType} d_i_b p_l_0p5_em`
      const barCurrentStyle = this.barCurrentStyleFunc(actionType)
      const propsScope = { typePid, fidRoot: fid }
      // console.info('FrameWindowInTab->barCurrent->[10]',{ fid, propsScope, actionType, isFidInTaskCurrentCid, reduxState});
      output = <div className={ classNameBlock }>
        <i className='fas fa-hourglass-start' style={ barCurrentStyle }
          onClickCapture={ e => this.eventHandle( e, actionType, fid, handleWitInstance, handleFuncRun, propsScope )}>
        </i>
      </div>
    }
    return output
  }
  
  barEllipsis = (fid, type, bar, barType, pos, witState, handleWitInstance, handleFuncRun) => {    
    if (!bar || !bar[barType]) { return null }
    const { reduxState } = this.props
    const { witInstances } = reduxState
    const barObj = bar[barType]

    const archive = witInstances.filter(item => item.type === 'AppTopTaskArchive')[0]
    // console.info('FrameWindowInTab->barEllipsis [2]',{ fid, archive, type, bar, barType, pos, witState });

    let items = barObj.items
      .filter(item => serviceFunc.devModeTrueElseFalse(item.active))
      .filter(item => {
        let isTrueFalse
        if (item.actionType !== 'archived') {
          isTrueFalse = true
        }
        else if (item.actionType === 'archived' && archive) {
          isTrueFalse = true
        }
        else {
          isTrueFalse = false
        }
        return isTrueFalse
      })
      .filter(item => item.actionType !== witState && item.actionType !== 'minRight')
      .map((item, i) => {
        // console.info('FrameWindowInTab->barEllipsis [5]',{ item })
        const propsScope = { pos }
        // propsScope: {pidType: "AppTopTarget", fidRoot: "id_c44a2639-2978-4075-810b-321047ac4ae3", actionTypeBar: "addedCopyOfWitInstance"}
        return (
          <div key={i} className='tooltipEll d_i_b'>
            <i
              className={item.className}
              onClickCapture={e => this.eventHandle(e, item.actionType, fid, handleWitInstance, handleFuncRun, propsScope)} 
            />
            <div className='tooltiptextEll'>{ item.name }</div>
          </div>
        )
      })
    // console.info('FrameWindowInTab->barEllipsis [7]',{ fid, type, bar, barType, pos, witState, items });
      
    let output
    if (witState === 'minBottom' || witState === 'max') {
      output = <div className='w_m_c'>{ items }</div>
    }
    else {
      output = (
        <div className={barObj.classNameBlock}>
          <i className={barObj.classNameIcon} />
          <div
            className='dropdown-content'
            style={{ right: '0px' }}
          >
            {items}
          </div>
        </div>
      )
    }
    return output
  }

  barNew = (fid, type, bar, barType, pos, witState, handleWitInstance, handleFuncRun, propsScope) => {

    // console.info('FrameWindowInTab->barSide [0]',{ type, propsScope, barType, bar })
    if( !bar || !bar[barType] || witState === 'minBottom' ){ return null; }
    const devModeTrueElseFalse = serviceFunc.devModeTrueElseFalse(bar[barType].active)
    // console.info('FrameWindowInTab->barSide [3]',{ type, barType, hostname:location.hostname, devModeTrueElseFalse, bar })
    if( !devModeTrueElseFalse ){ return null; }
    
    const barObj = bar[barType]; 
    let items = barObj.items
      .filter( item => {
        return serviceFunc.devModeTrueElseFalse(item.active)
      })
      .filter( item => {
        let trueFalse = true
        if (propsScope && !propsScope.nick && item.actionType === 'saveLoadEtcDbApp') {
          trueFalse = false
        }
        return trueFalse
      })
      .map(( item, i ) => {
        // console.info('FrameWindowInTab->barSide [5]',{ item })
        
        if( barObj.type === 'aLink' ){
          return <a key={i} className={ item.className }
              onClickCapture={(e) => this.eventHandle(e, item.actionType, fid, handleWitInstance, handleFuncRun, propsScope)}>
            { item.name }
          </a>;
        }
        else if ( barObj.type === 'iconFas' ){
          return <i key={i} className={ item.className }
              onClickCapture={(e) => this.eventHandle(e, item.actionType, fid, handleWitInstance, handleFuncRun, propsScope)}>
            { item.name }
          </i>; 
        }
        
        
      });
    // console.info('FrameWindowInTab->barSide [7]',{ classNameBlock: barObj.classNameBlock, items })

    const classNameBlock = 'wit__' + barType + ' ' + barObj.classNameBlock + ' d_i_b p_l_0p5_em';
    
    let classNameDropdownContent
    if( barObj.type === 'aLink' ){
      classNameDropdownContent = 'f_d_c'
    }
    else if ( barObj.type === 'iconFas' ){
      classNameDropdownContent = 'f_d_r'
    }

    if (barType === 'barAuth') {
      classNameDropdownContent = `${classNameDropdownContent} m_l_3p5` 
    }

    const output = <div className={ classNameBlock }>
            <i className={ barObj.classNameIcon }></i>
            <div className={'dropdown-content ' + classNameDropdownContent}>
              { items }
            </div>
          </div>;

    return output;    
  }
  
  onClickMinWindow = ( e, type, fid, pos ) => {
    
    //if( e ){ e.preventDefault(); }
    
    //console.info('FrameWindowInTab->onClickMinWindow() [0]',{type, fid, pos});
    
    const { witInstanceState } = this.state;
    let { posPast, witState } = witInstanceState;

    const { reduxState } = this.props;
    const { witInstances } = reduxState;   
    
    const witInstancesPid = witInstances.filter( item => item.fid === witInstanceState.pid );
    const isScrollbarPid = witInstancesPid[0].isTrueFalse.isScrollbar ? witInstancesPid[0].isTrueFalse.isScrollbar : false;
    
    const level = serviceFunc.getWitLevelBottomUp( witInstances, fid);
    //console.info('FrameWindowInTab->onClickMinWindow() [3]',{type, fid, level});
    
    if( witState === 'restored' ){
      const posPastTemp = serviceFunc.posCurrent( witInstanceState );
      posPast = serviceFunc.obj2LevelCombine( posPast, posPastTemp );
    }
    
    //'calc(100% - 53px)',
    const 
    resize = 'none',
    width = '200px',
    height = '2em',
    top = 'unset',
    left = posPast.wit.left,
    right = undefined,
    wit = pos.wit,
    wit__contentContainer = pos.wit__contentContainer;
    
    let bottom = '0em';
    if( level === 2 && isScrollbarPid === true  ){ bottom = '3em'; }
    if( level === 3 && isScrollbarPid === false  ){ bottom = '6em'; }
        
    const posCurrent = {...pos, 
      wit: { ...wit, resize, top, right, bottom, left, width, height },
      wit__contentContainer: { ...wit__contentContainer, display: 'none'},
    };
    
    const posStatePx = serviceFunc.posStatePx( posCurrent );
    
    witState = 'minBottom';
    
    const witInstanceTemp = {...witInstanceState, 
      pos: posCurrent, 
      posStatePx, 
      posPast,
      witState };    
    
    this.setState({ witInstanceState: witInstanceTemp });   
    //console.info('FrameWindowInTab->onClickMinWindow() [10]',{witInstanceTemp});
  }
  
  onClickRestoreWindow = ( e, type, fid, pos ) => {
    
    //if( e ){ e.preventDefault(); }
    
    const { witInstanceState } = this.state;
    let { posPast, witState } = witInstanceState;
    
    const elem = document.querySelector('#' + fid);
    const rect = elem.getBoundingClientRect();
   
    const posStatePx = serviceFunc.posStatePx( posPast );
    //console.info('FrameWindowInTab->onClickRestoreWindow() [5]',{ type, posPast, posStatePx, });
    
    witState = 'restored';
    
    const witInstanceTemp = {...witInstanceState, 
      pos: posPast, 
      posStatePx,
      witState };

    this.setState({ witInstanceState: witInstanceTemp });
    //console.info('FrameWindowInTab->onClickRestoreWindow() [10]',{ type, fid, pos, posStatePx, witInstanceState });
  }
  
  onClickMaxWindow = ( e, type, fid, pos ) => {
        
    const { reduxState } = this.props;
    const { witInstances } = reduxState;
    
    const { witInstanceState } = this.state;
    //console.info('FrameWindowInTab->onClickMaxWindow() [0]',{ witInstanceState, type: witInstanceState.type });
     
    let { posPast, witState } = witInstanceState;
    
    if( witState === 'restored' ){
      const posPastTemp = serviceFunc.posCurrent( witInstanceState );
      posPast = serviceFunc.obj2LevelCombine( posPast, posPastTemp );
    }
    
    const w = window, d = document, el = d.documentElement, 
        g = d.getElementsByTagName('body')[0],
        x1 = w.innerWidth, x2 = el.clientWidth, x3 = g.clientWidth,
        y1 = w.innerHeight, y2 = el.clientHeight, y3 = g.clientHeight;

    const zIndexMax = serviceFunc.zIndexCalc( 99, witInstances, 'pid', witInstanceState.pid, 'max', 'pos', 'wit', 'zIndex' );
    
    const
    resize = 'none',
    width = x2,
    height = y2,
    top = 0,
    left = 0,
    right = undefined,
    bottom = undefined,
    zIndex = zIndexMax + 1,
    wit = pos.wit,
    wit__contentContainer = pos.wit__contentContainer;
    
    const posCurrent = {...pos, 
      wit: { ...wit, resize, top, right, bottom, left, width, height, zIndex },
      wit__contentContainer: { ...wit__contentContainer, display: 'block'},
    };
    
    const posStatePx = serviceFunc.posStatePx( posCurrent );
    
    witState = 'max';
    
    const witInstanceTemp = {...witInstanceState, 
      pos: posCurrent, 
      posStatePx, 
      posPast,
      witState };  
    
    //console.info('FrameWindowInTab->onClickMaxWindow() [10]',{ witInstanceTemp, type: witInstanceTemp.type, posCurrent, posPast: witInstanceTemp.posPast });
    this.setState({ witInstanceState: witInstanceTemp }); 
  }
  
  onMouseDown2ZIndex = ( e, type, fid, posInput ) => {
    
    //if( e ){ e.preventDefault(); }
    
    const { witInstanceState } = this.state;
    
    //console.info('FrameWindowInTab->onMouseDown2ZIndex() [0]',{ state: this.state, props: this.props });

    let zIndexMax, posTemp, pos;
    (() => {
      const { witInstances } = this.props.reduxState;
      const filterValue = witInstanceState.type;
      //console.info('FrameWindowInTab->onMouseDown2ZIndex() [2]',{ witInstances, filterValue });
      zIndexMax = serviceFunc.zIndexCalc( 100, witInstances, 'type', filterValue, 'max', 'pos', 'wit', 'zIndex' );
    })();

    pos = witInstanceState.pos;
    posTemp = {wit: { zIndex: (zIndexMax + 1) } };
    pos = serviceFunc.obj2LevelCombine( pos, posTemp );

    const posStatePx = serviceFunc.posStatePx( pos );    

    const witInstanceTemp = {...witInstanceState, pos, posStatePx};

    //console.info('FrameWindowInTab->onMouseDown2ZIndex() [10]',{ zIndexMax, type, fid, posInput, pos, witInstanceState, witInstanceTemp });
    this.setState({ witInstanceState: witInstanceTemp });
  }
  
  onMouseEvent = ( e, type, fid ) => {
    
    //if( e ){ e.preventDefault(); }
    
    //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
    
    //console.info('FrameWindowInTab->onMouseEvent() [0]',{ type, fid });
    const { witInstanceState } = this.state;
    let { witState } = witInstanceState;
    
    if( witState === 'max' ){ return; }
    
    if (type === 'down') {
      this.isOnMouseMove = true;
    }
    if (type === 'click' || type === 'up') {
      this.isOnMouseMove = false;
    }
    
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    
    document.onmouseup = this.closeDragElement;
    document.mouseout = this.closeDragElement;
    document.mouseleave = this.closeDragElement;
    //console.info('FrameWindowInTab->onMouseEvent() [10]', { type, fid });
    document.onmousemove = ( e ) => this.elementDrag( e, fid );
  }

  elementDrag = ( e, fid ) => {
    
    //if( e ){ e.preventDefault(); }
    
    const witInstancesProps = this.props.reduxState.witInstances;
    const { witInstanceState } = this.state;
    
    if (this.isOnMouseMove === false) {
      return;
    }

    //e = e || window.event;
    //console.info('FrameWindowInTab->elementDrag()', fid);
    
    // calculate the new cursor position:
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    const elem = document.querySelector('#' + this.props.fid);
    if ( elem ) {
      let pos = witInstanceState.pos;
      const offsetLeft = elem.offsetLeft;
      const offsetTop = elem.offsetTop;
      const halfWidth = parseInt( elem.style.width )* 2 / 3 ;
      const left = ( offsetLeft - this.pos1 ) < -halfWidth  ? -halfWidth : ( offsetLeft - this.pos1 );
      const top = ( offsetTop - this.pos2 ) < 5 ? 5 : ( offsetTop - this.pos2 );
      const posTemp = { wit: { left, top }};
      
      pos = serviceFunc.obj2LevelCombine( pos, posTemp );
      const posStatePx = serviceFunc.posStatePx( pos );
      const witInstanceStateTemp = {...witInstanceState, pos, posStatePx};
      //console.info('FrameWindowInTab->elementDrag() [10]', { offsetLeft, halfWidth, left });
      
      this.setState({ witInstanceState: witInstanceStateTemp });
    }
  }

  closeDragElement = () => {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }  

  confirmAction = (description, handleFuncRun, event, actionType, fid, propsScope) => {
    const listWithoutConfirmation = ['AppHandleWitBd', 'AppSignUpInOut']
    const { witInstanceState } = this.state
    const itemCheck = listWithoutConfirmation.filter(item => item === witInstanceState.type)
    const fidOldPrefixType = serviceFunc.testFidPrefixTypeFunc(fid)
    //console.info('FrameWindowInTab->confirmAction [0]',{ actionType, itemCheck, witInstanceState, propsScope })
    if (itemCheck.length !== 0 || fidOldPrefixType === 'out' || fidOldPrefixType === 'cur') {
      handleFuncRun(event, actionType, fid, propsScope)
    }
    else if (confirm(description)) {
      handleFuncRun(event, actionType, fid, propsScope)
    }
  }

  eventHandle = (event, actionType, fid, handleWitInstance, handleFuncRun, propsScope) => {
    
    // console.info('FrameWindowInTab->eventHandle [0]',{ actionType, fid, propsScope })
    /*
    if( event && event.currentTarget && event.relatedTarget){ 
      event.preventDefault(); event.stopPropagation()
    }
    */
    
    let witInstanceState;
    
    switch( actionType ){   

      case 'Blue':
      case 'Green':
      case 'Orange': 
      case 'Deep_Orange':
      case 'Grey': {
        witInstanceState = this.colorStatusReactStateChange(this.state, actionType, propsScope)
        this.setState({ witInstanceState })
        //console.info('FrameWindowInTab->eventHandle [5]',{ actionType, witInstanceState });
      } break
    
      case 'removedCopyOfWitInstance':
      case 'removedWitInstance': {
        this.confirmAction('Are you sure to delete?', handleFuncRun, event, actionType, fid, propsScope)
      } break

      case 'addedCopyOfWitInstance': {
        handleFuncRun(event, actionType, fid, propsScope)
      } break
        
      case 'saveLoadEtcDbApp': {
        handleFuncRun(event, actionType, fid, propsScope)
      } break
      
      case 'copyClipboard':
      case 'saveLocal':
      case 'loadLocal':
      case 'cleanLocal': {
        handleFuncRun(event, actionType, fid, {})
      } break
        
      case 'archived': {
        handleFuncRun( event, actionType, fid, {})
      } break

      case 'witSignIn':
      case 'witSignOut':
      case 'witSignUp': {
        handleFuncRun(event, actionType, fid, {})
      } break
   
      case 'minBottom': {
        this.onClickMinWindow(event, actionType, fid, propsScope.pos)
        witInstanceState = this.state.witInstanceState
        witInstanceState = {...witInstanceState, witState: actionType }
      } break

      case 'restored': {
        this.onClickRestoreWindow(event, actionType, fid, propsScope.pos)
        witInstanceState = this.state.witInstanceState
        witInstanceState = {...witInstanceState, witState: actionType }
      } break
    
      case 'max': {
        this.onClickMaxWindow(event, actionType, fid, propsScope.pos)
        witInstanceState = this.state.witInstanceState
        witInstanceState = {...witInstanceState, witState: actionType }
      } break

      case 'removedWitInstance': {
        handleFuncRun(event, actionType, fid, propsScope)
      } break

      case 'IcebobClock':
      case 'ToshiyukiTakahashiClock':
      case 'MarcoAntonioAguilarAcuñaClock':
      case 'GaneshKumarMClock':
      case 'GaneshKumarMClock':
      case 'StixClock':
      case 'JacobFosterClock': {
        handleFuncRun(event, actionType, fid, {})
      } break
      
      default: {
        console.info( 'FrameWindowInTab->eventHandle() [10]','I have never heard of that ... ', actionType) 
      } break
    }
  }

  getNameComJsx = witInstanceState => {
    let nameCom
    if (witInstanceState.type === 'AppTopTarget') {
      nameCom = <div className='p_l_0p5_rem'>{witInstanceState.nameCom}</div>
    }
    return nameCom
  }

  //Function to throttle frequency of running a callback function
  throttle = ( e, callback, delay, type, fid, pos ) => {
    
    //if( e ){ e.preventDefault(); }
    
    let timeoutHandler = null;
    return () => {
      if (timeoutHandler == null) {
        timeoutHandler = setTimeout(() => {
          callback( e, type, fid , pos, '' );
          timeoutHandler = null;
        }, delay);
      }
    };
  };
  
  render() {

    const { fid, reduxState, handleWitInstance, handleFuncRun } = this.props;
    const { user } = reduxState;
    const { nick } = user;
    const { witInstanceState, overflowX, overflowY, heightCC } = this.state;
    let propsScope;
    
    if(witInstanceState === undefined || witInstanceState.length === 0){
      return null;
    }
    const { bar, pos, posStatePx, type, witState, nameCom } = witInstanceState;
    
    let wit__contentContainer = 'wit__contentContainer webkit_scrollbar scrollbar w_min_0p5_em', 
        wit__contentCanvas = 'wit__contentCanvas pos_r';
    
    let paddingRight_ActionRight, cursor;
    if( witState === 'minBottom' ){
      paddingRight_ActionRight = '0';
      cursor = 'move';
    }
    else if ( witState === 'restored' ) {
      paddingRight_ActionRight = '0';
      cursor = 'move';
    }
    else if( witState === 'max' ){
      paddingRight_ActionRight = '1em';
      cursor = 'default';
    }

    const barDateTime = this.barNew.call(this, fid, type, bar, 'barDateTime', pos, witState, handleWitInstance, handleFuncRun)
    const barCurrent = this.barCurrent(fid, type, bar, 'barCurrent', pos, witState, handleWitInstance, handleFuncRun, reduxState)
    propsScope = {}
    const barAuth = this.barNew.call(this, fid, type, bar, 'barAuth', pos, witState, handleWitInstance, handleFuncRun, propsScope)
    propsScope = { fidOrg: fid, typeOrg: type, nameCom, nick }
    const barSide = this.barNew.call(this, fid, type, bar, 'barSide', pos, witState, handleWitInstance, handleFuncRun, propsScope)
    propsScope = { bar }
    const barColor = this.barNew.apply(this, [fid, type, bar, 'barColor', pos, witState, handleWitInstance, handleFuncRun, propsScope])
    const barEllipsis = this.barEllipsis.apply(this, [fid, type, bar, 'ellipsis', pos, witState, handleWitInstance, handleFuncRun])
    
    const nameComJsx = this.getNameComJsx(witInstanceState)

    //console.info('FrameWindowInTab->render() [5]', { nameCom, state: this.state, props: this.props })

    let nickDisplay = ''; let paddingRight_nick = '0'
    if (type === 'AppDesktop') {
      nickDisplay = nick
    }
    else if (type === 'AppTopTarget' && witState === 'max') {
      nickDisplay = nick
      paddingRight_nick = '0.5em'
    }

    /* Layout tree
      wit
        resizer top-left
        resizer top-right
        resizer bottom-left
        resizer bottom-right
        
        wit__bar
          wit__actions_left
          wit__drag
          wit__actions_right
        wit__contentContainer
          div.wit__contentCanvas
          
            topContent 
              div.topContent__elem_A
              topContent__elem_A_textarea
              topContent__elem_B
    */

    return (
      <div id={ fid } className={ 'wit ' + type + ' b_3px_s b_r_0p2_em b_1px_s b_r_4_px' }
        style={{'position': posStatePx.wit.position,
                'top': posStatePx.wit.top, 'left': posStatePx.wit.left,
                'right': posStatePx.wit.right, 'bottom': posStatePx.wit.bottom,
                'overflow': 'hidden', 'zIndex': '0', 'textAlign': 'left',
                'backgroundColor': posStatePx.wit.backgroundColor, 'borderColor': '#d3d3d3', 
                'boxShadow': 'rgba(0, 0, 0, 0.2) 3px 7px 7px 0px !important',
                'zIndex': posStatePx.wit.zIndex, 
                'width': posStatePx.wit.width, 
                'height': posStatePx.wit.height }}>
        <div className='resizer top-left'></div>
        <div className='resizer top-right'></div>
        <div className='resizer bottom-left'></div>
        <div className='resizer bottom-right'></div>
        
        {<div className='wit__bar d_f pos_r w_100' 
           style={{'flexDirection':'row',
               'textAlign': 'right', 'zIndex': '1000', 
               'backgroundColor': posStatePx.wit__bar.backgroundColor, 'color': '#fff',
               paddingTop: '0.3em', paddingBottom: '0.2em'}}>
          { bar ?
              <div className='wit__actions_left d_f t_a_l fitContent'>
                { barSide }
                { barColor }
                { barCurrent }
                { barDateTime }
                { nameComJsx }
              </div>
            : null }
          {<div className="wit__drag d_i_b w_100" 
              style={{'cursor': cursor }}
              onMouseDown={(e) => {
                  this.onMouseEvent(e, 'down', fid, pos, '');
                  this.onMouseDown2ZIndex(e, 'move', fid, pos, '');
                }
              }
              onMouseUp={(e) => this.onMouseEvent(e, 'up', fid, pos, '' )}
              onClickCapture={(e) => {
                this.onMouseDown2ZIndex(e, 'click', fid, pos, '');
              }}
          ></div>}
          {<div className='wit__actions_right d_f' 
            style={{ 'paddingRight': paddingRight_ActionRight }}>
            <div className=' d_i_b' style={{ paddingRight: paddingRight_nick }}>
              { nickDisplay }
            </div>
            { barAuth }
            { barEllipsis }
          </div>}
        </div>}
        <div className={ wit__contentContainer }
          style={{ ...overflowX, ...overflowY, ...heightCC,
            'display': posStatePx.wit__contentContainer.display,
            'position': posStatePx.wit__contentContainer.position,
          }}
          onMouseDown={(e) => {this.onMouseDown2ZIndex(e, 'click', fid, pos)}}
        >
          <div className={ wit__contentCanvas } 
            style={{ width: posStatePx.wit__contentCanvas.width,
              height: posStatePx.wit__contentCanvas.height }}>
            {this.props.children}
          </div>
        </div>
      </div>);
  }
}
FrameWindowInTab.propTypes = {  
};

export default CommonContainer(FrameWindowInTab)