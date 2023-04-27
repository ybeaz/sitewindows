import React from 'react'
import PropTypes from 'prop-types'
import * as serviceFunc from '../../Shared/serviceFunc'
import CommonContainer from '../Containers/CommonContainer.react'
import './AppHandleWitBd.less'

class AppHandleWitBd extends React.PureComponent {
  constructor(props) {
    super(props)
    const { reduxState, propsScope } = props
    const { mdbDocsOperations } = reduxState
    const { docList } = mdbDocsOperations
    const { nameCom } = propsScope
    this.state = {
      nameCom,
      validity: {
        handleWitBdName: 'N',
        handleWitBdButton: 'not-allowed',
        errorMessage: null,
        docListMd: [],
        witContentContainer: 0,
        docList,
      }
    }
    // console.info('AppHandleWitBd->constructor() [0]',{ docList, state: this.state, props: this.props });
  }

  componentDidMount() {
    const { fid } = this.props
    const element = serviceFunc.getElems(fid, 'wit__contentContainer')[0]
    const witContentContainerHeight = serviceFunc.getElementSize(element).height
    this.setState({ witContentContainerHeight })

    let actionType = 'loadDocListByUserIdMdbAction'
    this.eventHandle({ }, actionType)
    actionType = 'handleWitBd'
    this.inputValidate({}, actionType, 0, 'handleWitBd__name')
  }

  componentDidUpdate() {
    //console.info('AppHandleWitBd->componentDidUpdate()', { props: this.props })
    const { reduxState } = this.props
    const { mdbDocsOperations } = reduxState
    const { docList } = mdbDocsOperations
    this.setState({ docList })
  }

  getCorners = () => {
    return (
      <div className='d_i_b f_r p_r_3'>
        <div className='m_b_corner'>
          <span className='c_p' onClick={()=>{ }}>▲</span>
          <span className='c_p' onClick={() => { }}>△</span>
        </div>
        <div className='m_t_corner'>
          <span className='c_p' onClick={() => { }}>▼</span>
          <span className='c_p' onClick={() => { }}>▽</span>
        </div>
      </div>
    )
  }

  getTitleList = (titleData: Array) => {

    const titleItems = titleData.map((item, i, arr) => {

      let getCornersLogic = this.getCorners()
      if (i === arr.length - 1) {
        getCornersLogic = ''
      }

      return (
        <div
          key={i}
          className='d_t_c t_a_c b_ttl style_ttl'
          style={{ width: item.width }}
        >
          <div className='d_i_b transform_ttl_name'>{item.name}</div>
          {getCornersLogic}
        </div>
      )
    })

    return (
      <div className='d_t_r'>
        {titleItems}
      </div>
    )
  }

  getRowActions = (item: Object, typeOrg: String) => {
    const propsScope = { item }
    const actions = [
      { type: 'loadProject', name: 'Load project', className: 'far fa-folder-open', active: true },
      { type: 'editNameProject', name: 'Edit name', className: 'far fa-edit', active: true },
      { type: 'selectProjectToMerge', name: 'Select to merge', className: '', active: true },
      { type: 'removeProject', name: 'Remove project', className: 'far fa-trash-alt', active: true },
    ]
    //console.info('AppHandleWitBd->getRowActions', { typeOrg, propsScope, item })
    return actions.map((action, i) => {
      let itemRow
      if (action.type !== 'selectProjectToMerge') {
        itemRow = (
          <span
            key={i}
            className='p_x_0p5_rem'
            onClick = {e => this.eventHandle(e, action.type, 0, propsScope)}
            role='button'
          >
            <i className={`c_p ${action.className}`} />
          </span>
        )
      }
      else if (action.type === 'selectProjectToMerge'
        && typeOrg === 'AppDesktop') {
        let checked
        if (!item.checked || item.checked === false) {
          checked = false
        }
        else {
          checked = true
        }
        itemRow = (
          <span
            key={i}
            className='p_x_0p5_rem'
          >
            <input
              type='checkbox'
              className={`m${item.fid}`}
              name={action.name}
              onChange={e => this.eventHandle(e, action.type, 0, propsScope)}
              checked={checked}
            />
          </span>
        )
      }
      // console.info('AppHandleWitBd->getRowActions', { fid: item.fid, checked, itemRow, typeOrg, type: action.type })
      return itemRow
    })

  }
  
  getRowList = (data: Array, typeOrg: String) => {

    if (!data || data.length === 0) { return null}

    const getRowListElems = data.map((item, i) => {
      const rowActions = this.getRowActions(item, typeOrg)

      return (
        <div key={i} className='d_t_r br_b_4_px'>
          <div className='d_t_c v_a_m p_l_0p5_rem w_30 t_a_l b_cell'>{item.name}</div>
          <div className='d_t_c v_a_m p_l_0p5_rem w_25 t_a_l b_cell'>{item.dateTime}</div>
          <div className='d_t_c v_a_m p_l_0p5_rem w_15 t_a_l b_cell'>{item.group}</div>
          <div className='d_t_c v_a_m p_l_0p5_rem w_30 t_a_l b_cell'>
            {rowActions}
          </div>
          
        </div>
      )
    })
    return getRowListElems
  }
  
  inputValidate = (e, actionType, step, className) => {
    let { validity: validityTemp, nameCom: nameComTemp } = this.state
    const nameCom = e && e.target && e.target.value ? e.target.value : nameComTemp
    // console.info('AppHandleWitBd->inputValidate() [2]', { actionType, nameCom, props: this.props, state: this.state })

    if (className === 'handleWitBd__name' 
      && nameCom && nameCom.length > 2) {
      validityTemp = {...validityTemp, 
        handleWitBdName: 'Y', 
        handleWitBdButton: 'pointer',
        errorMessage: null }  
    }
    else if (className === 'handleWitBd__name' 
      && nameCom && nameCom.length < 3
      && !e.target) {
      validityTemp = {...validityTemp, 
        handleWitBdName: 'N', 
        handleWitBdButton: 'not-allowed',
        errorMessage: null }
    }
    else if (className === 'handleWitBd__name' 
    && nameCom && nameCom.length < 3
    && e.target && e.target.value) {
      validityTemp = {...validityTemp, 
        handleWitBdName: 'N', 
        handleWitBdButton: 'not-allowed',
        errorMessage: 'enter value more than 2 characters', };
    }
    // console.info('AppHandleWitBd->inputValidate() [3]', { className, nameCom, e, eTarget: e.target, eTargetExcl: !e.target })


    this.setState({ validity: validityTemp, nameCom });
  }

  confirmAction = (description, handleFuncRun, event, actionType, fid, propsScope) => {
    if (confirm(description)) {
      handleFuncRun(event, actionType, fid, propsScope)
    }
  }

  eventHandle = (e, actionType, step, propsScope ) => {

    // console.info('AppHandleWitBd->eventHandle() [0]',{ actionType, step, propsScope });
    const { fid, handleFuncRun } = this.props
    const { validity, nameCom } = this.state
    let output
    
    switch (actionType) {

      case 'mergeSelectedProjects':
      case 'selectProjectToMerge': {
        handleFuncRun(e, actionType, fid, propsScope)
        const { reduxState } = this.props
        const { mdbDocsOperations } = reduxState
        const { docList } = mdbDocsOperations
        this.setState({ docList })
      } break

      case 'loadProject':
      case 'editNameProject': {
        handleFuncRun(e, actionType, fid, propsScope)
      } break

      case 'removeProject': {
        // console.info('AppHandleWitBd->eventHandle() [3]',{ actionType, propsScope })
        this.confirmAction('Are you sure to delete?', handleFuncRun, e, actionType, fid, propsScope)
      } break

      case 'saveDocByUserIdMdb': {
        if (validity.handleWitBdButton === 'not-allowed') { 
          // console.info('AppHandleWitBd->eventHandle() [3]',{});
          return
        }

        const propsScopeNext = { fidOrg: propsScope.fidOrg, nameCom, group: 'owner' }
        handleFuncRun(e, actionType, fid, propsScopeNext)
        // console.info('AppHandleWitBd->eventHandle() [10]',{});
      } break

      case 'loadDocListByUserIdMdbAction': {
        const propsScopeNext = { fid }
        output = handleFuncRun(e, actionType, fid, propsScopeNext)
        // console.info('AppHandleWitBd->eventHandle() [5]', { output })
      } break

      default:
        return

    }

    // console.info('AppHandleWitBd->eventHandle() [10]', { output });
    return output
  }
 
  forceUpdateHandler() { this.forceUpdate() }

  render() {
    // console.info('AppHandleWitBd->render() [0]',{ state: this.state, props: this.props });

    const { fid, reduxState } = this.props
    const { witInstances, mdbDocsOperations } = reduxState
    const { spinner } = mdbDocsOperations
    const witInstance = witInstances.filter(item => item.fid === fid)[0];
    const { propsScope } = witInstance
    const { case: actionType, typeOrg } = propsScope
    const { nameCom, docList, validity, witContentContainerHeight } = this.state
    const step = 0
    const inputClassName = 'handleWitBd__name'
    const cursorSave: String = validity.handleWitBdButton
    const cursorMerge: String = 'pointer'
    // console.info('AppHandleWitBd->render() [2]', { propsScope, spinner, witInstance, witInstances, state: this.state, props: this.props })
    
    const titleData = [
      { name: 'Name', width: '30%' },
      { name: 'Date time', width: '25%' },
      { name: 'Status', width: '15%' },
      { name: 'Actions', width: '30%' },

    ]

    // console.info('AppHandleWitBd->render() [10]',{ actionType, docList, validity, state: this.state, props: this.props });
    return (
      <div className='topContent_1 w_inh h_100'>
        <div className='p_a_0p5_em'>
          { typeOrg === 'AppTopTarget' ? (
            <div>
              <div className='d_t w_100 m_b_0p25_rem'>
                <div className='d_t_c p_r_0p25_rem w_85'>
                  <input
                    className='handleWitBd__name inp w_100' 
                    placeholder='Save project as'
                    onInput={e => this.inputValidate(e, actionType, step, inputClassName )}
                    value={nameCom}
                  />
                </div>
                <div className='d_t_c w_15 bemButton'>
                  <button
                    type='submit' 
                    className='button btn_bd'
                    style={{ cursorSave }}
                    onClick={e => this.eventHandle(e, 'saveDocByUserIdMdb', step, propsScope)}
                  >
                    <span className='d_i_b'>Save</span>
                  </button>
                </div>
              </div>
              <div className='d_t w_100'>
                <div className='d_t_c p_r_0p25_rem w_85'>
                  {validity.errorMessage}
                </div>
                <div className='d_t_c w_15' />
              </div>
            </div>
          )
            : null
          }
          { typeOrg === 'AppDesktop' ? (
            <div className='d_t w_100 m_b_0p25_rem'>
              <div className='d_t_r'>
                <div className='d_t_c p_r_0p25_rem w_50'>
                  <input className='inp w_100' placeholder='filter' />
                </div>
                <div className='d_t_c p_r_0p25_rem w_35' />
                <div className='d_t_c w_15 bemButton'>
                  <button
                    type='submit' 
                    className='button btn_bd'
                    style={{ cursorMerge }}
                    onClick={e => this.eventHandle(e, 'mergeSelectedProjects', step, propsScope)}
                  >
                    <span className='d_i_b'>Merge</span>
                  </button>
                </div>
              </div>
            </div>
          )
            : null
          }
          <div className='d_t w_100 m_b_0p25_rem'>
            {this.getTitleList(titleData)}
            {this.getRowList(docList, typeOrg)}
          </div>
        </div>
        { spinner
          ? (
            <div
              className='p_a centerMiddle b_c_o_0p2'
              style={{ height: `${witContentContainerHeight}px` }}
            >
              <img src='./img/spinner.gif' alt='loading' />
            </div>
          )
          : null }
      </div>
    );
  }
}
AppHandleWitBd.propTypes = {
};

export default CommonContainer(AppHandleWitBd)
