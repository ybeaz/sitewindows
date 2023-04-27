/*
Template schema:
  object:
    { type: string, Component name of the template
      level: integer, Level number to appear this type of components
      pos: object, Position on the screen
        position, top, right, bottom, left, zIndex, width, height
      frame: string, Component name of the frame
      content: string, Component name of the content 
      iconClassName: string, Classes describing icon in the main wit
      pidFrom: string, Source to assign pid to the element
      appStatus: string, Define appearance {background, colors of the frame) and thus meaning of the wit
      witState: string, Define size of the window, including max, minBottom, minRight, restored 
      isTrueFalse: {
        isMultipleInstances: boolean, Allowance of the multiple instances
        isMultipleInstancesForPid: boolean, Allowance of the multiple instances for pid (parent instance) 
        isIconOnAppDesktop: boolean, Allowance appearance in the related level (depth) of wit 
        isOnMouseLeave: boolean, Allowance removing in case of isOnMouseLeave event
        isRestoreWindowOn: boolean, Toggle allowance restore window icon on panel,
        isMinWindowOn: boolean, Toggle allowance min bottom icon on panel,
        isMaxWindowOn: boolean, Toggle allowance max bottom icon on panel,
      }
    }
Abbreviations:
    aid: application id
    cid: children ids
    fid: frame id
    pid: parent id

To add application:
  add object into wit.inputTemplates
  add component    AppName.react    into .\SiteWindows\src\Components
  add container    AppNameContainer.react   into .\SiteWindows\src\Containers
  change name in the component file and AppName.propTypes reference
  add import AppTopSsp from './AppTopSsp.react' of SiteWindows.react.js
  add reference in const COMPONENTS of SiteWindows.react.js
  
To do
  Increase <-> decrease fonts in the window
  + zIndex increase on whole wit area
  - move by whole wit area
*/


let wit = {};
wit.inputTemplates = [

  { type: 'SiteWindows',
    active: true,
    frame: '',
    content: '',
    nameCom: '',
    description: '',
    placeholder: '',
    iconClassName: '',
    pidFrom: '',
    appStatus: 'witDefault',
    pos: {}, 
    isTrueFalse: {
      isMultipleInstances: false,
      isMultipleInstancesForPid: false,
      isOnMouseLeave: false,
    }, 
  },

  { type: 'AppDesktop',
    active: true,
    frame: 'FrameWindowInTab',
    content: 'AppDesktop',
    nameCom: '',
    description: '',
    placeholder: '',
    iconClassName: '',
    pidFrom: 'SiteWindows',
    appStatus: 'witDefault',
    witState: 'restored',
    bar: {
      barAuth: {active: true, type: 'aLink', name: 'auth menu', 
        classNameBlock: 'barDropdown dropdown',
        classNameIcon: 'far fa-user',
        items: [
          {actionType: 'witSignIn', name: 'Sign in', className: '', active: true},
          {actionType: 'witSignOut', name: 'Sign out', className: '', active: true},
          {actionType: 'witSignUp', name: 'Sign up', className: '', active: true},
        ]
      },
      barSide: {active: true, type: 'aLink', name: 'side menu', 
        classNameBlock: 'barDropdown dropdown',
        classNameIcon: 'fas fa-bars',
        items: [
          {actionType: 'saveLoadEtcDbApp', name: 'Dashboard', className: '', active: true},
          {actionType: 'cleanLocal', name: 'Clean Local', className: '', active: true},
        ]
      },
      barColor: false,        
      ellipsis: {active: true, type: 'iconFas', name: 'window view', 
        classNameBlock: 'barWitView dropdown',
        classNameIcon: 'fas fa-ellipsis-v p_r_0p7_em p_l_1_em',
        items: [
          {actionType: 'minBottom', name: 'bottom', className: 'fas fa-window-minimize p_r_0p5_em', active: true},
          {actionType: 'minRight', name: 'minRight', className: 'fas fa-window-minimize rotate_270 p_r_0p5_em', active: true},
          {actionType: 'restored', name: 'restore', className: 'fas fa-window-restore p_r_0p5_em', active: true},
          {actionType: 'max', name: 'max', className: 'fas fa-window-maximize p_r_0p5_em', active: true},
          {actionType: 'removedWitInstance', name: 'delete', className: 'fas fa-times p_r_0p5_em', active: true}
        ]
      },
    },
    pos: {
      wit: { position: 'fixed',
        top: 100, right: -3, bottom: undefined, left: undefined, 
        zIndex: 100, width: 250, height: 250},
    },
    isTrueFalse: {
      isMultipleInstances: false,
      isMultipleInstancesForPid: false,
      isOnMouseLeave: false,        
    },
  },

  { type: 'AppHandleWitBd',
    active: true,
    frame: 'FrameWindowInTab',
    content: 'AppHandleWitBd',
    nameCom: 'AppHandleWitBd',
    description: 'Use this app to save other apps',
    placeholder: '',
    iconClassName: '',
    pidFrom: 'SiteWindows',
    appStatus: 'witDefault',
    witState: 'restored',
    bar: {
      barSide: false,
      barColor: false,
      ellipsis: {active: true, type: 'iconFas', name: 'window view', 
        classNameBlock: 'barWitView dropdown',
        classNameIcon: 'fas fa-ellipsis-v p_r_0p7_em p_l_1_em',
        items: [
          {actionType: 'minBottom', name: 'bottom', className: 'fas fa-window-minimize p_r_0p5_em', active: true},
          {actionType: 'minRight', name: 'minRight', className: 'fas fa-window-minimize rotate_270 p_r_0p5_em', active: true},
          {actionType: 'restored', name: 'restore', className: 'fas fa-window-restore p_r_0p5_em', active: true},
          {actionType: 'max', name: 'max', className: 'fas fa-window-maximize p_r_0p5_em', active: true},
          {actionType: 'removedWitInstance', name: 'delete', className: 'fas fa-times p_r_0p5_em', active: true}
        ]
      },
    },
    pos: {
      wit: { position: 'absolute', top: 54, right: undefined, 
        bottom: undefined, left: 24, zIndex: 100, 
        width: 600, height: 300 },
    },
    isTrueFalse: {
      isScrollbarX: true,
      isScrollbarY: true,
      isAlignCenter: true,
      isMultipleInstances: false,
      isMultipleInstancesForPid: true,
      isIconOnAppDesktop: false,
      isOnMouseLeave: false,
    },
  },

  { type: 'AppSignUpInOut',
    active: true,
    frame: 'FrameWindowInTab',
    content: 'AppSignUpInOut',
    nameCom: 'Sign up',
    description: 'Sign up app',
    placeholder: '',
    iconClassName: '',
    pidFrom: 'SiteWindows',
    appStatus: 'witDefault',
    witState: 'restored',
    bar: {
      barSide: false,
      barColor: false,        
      ellipsis: {active: true, type: 'iconFas', name: 'window view', 
        classNameBlock: 'barWitView dropdown',
        classNameIcon: 'fas fa-ellipsis-v p_r_0p7_em p_l_1_em',
        items: [
          {actionType: 'minBottom', name: 'bottom', className: 'fas fa-window-minimize p_r_0p5_em', active: true},
          {actionType: 'minRight', name: 'minRight', className: 'fas fa-window-minimize rotate_270 p_r_0p5_em', active: true},
          {actionType: 'restored', name: 'restore', className: 'fas fa-window-restore p_r_0p5_em', active: true},
          {actionType: 'max', name: 'max', className: 'fas fa-window-maximize p_r_0p5_em', active: true},
          {actionType: 'removedWitInstance', name: 'delete', className: 'fas fa-times p_r_0p5_em', active: true}
        ]
      },
    },      
    pos: {
      wit: { position: 'fixed', top: 54, right: undefined, 
        bottom: undefined, left: 24, zIndex: 100, 
        width: 500, height: 300 },
    },
    isTrueFalse: {
      isAlignCenter: true,
      isMultipleInstances: false,
      isMultipleInstancesForPid: true,
      isIconOnAppDesktop: false,
      isOnMouseLeave: false,        
    },
  },

  { type: 'AppTopTarget',
    active: true,
    frame: 'FrameWindowInTab',
    content: 'AppTopTask',
    nameCom: '',
    description: 'Planning, problem solving, project making, prioritizing',
    placeholder: 'Planning, problem solving, project making, prioritizing',
    iconClassName: 'fas fa-bullseye c_p_Blue_Grey_400 c_point f_s_3_em',
    pidFrom: 'SiteWindows',
    appStatus: 'witDefault',
    witState: 'max',
    bar: {
      barSide: {active: true, type: 'aLink', name: 'main menu', 
        classNameBlock: 'barDropdown dropdown',
        classNameIcon: 'fas fa-bars',
        items: [
          {actionType: 'saveLoadEtcDbApp', name: 'Dashboard', className: '', active: true},
          {actionType: 'copyClipboard', name: 'Copy to Clipboard', className: '', active: true},
          {actionType: 'saveLocal', name: 'Save Local', className: '', active: true},
          {actionType: 'loadLocal', name: 'Load Local', className: '', active: true},
          {actionType: 'cleanLocal', name: 'Clean Local', className: '', active: true},
        ]
      },      
      barDateTime: {active: false, type: 'aLink', name: 'main menu', 
        classNameBlock: 'barDropdown dropdown',
        classNameIcon: 'far fa-clock',
        items: [ 
          {actionType: 'IcebobClock', name: 'Icebob clock', className: '', active: true, href: 'https://codepen.io/icebob/pen/JYoQZg'},
          {actionType: 'ToshiyukiTakahashiClock', name: 'Toshiyuki Takahashi clock', className: '', active: true, href: 'https://codepen.io/gau/pen/LjQwGp'},
          {actionType: 'MarcoAntonioAguilarAcuñaClock', name: 'Marco Antonio Aguilar Acuña clock', className: '', active: true, href: 'https://codepen.io/Maku2202/pen/MarRgK'},
          {actionType: 'GaneshKumarMClock', name: 'Ganesh Kumar M clock', className: '',  active: true, href: 'https://codepen.io/ganeshkumarm/pen/MobJdo'},
          {actionType: 'StixClock', name: 'Stix clock', className: '', active: true, href: 'https://codepen.io/stix/pen/mVXypr'},
          {actionType: 'JacobFosterClock', name: 'Jacob Foster clock', className: '', active: true, href: 'https://codepen.io/Alca/pen/pWEROj'}
        ]
      },
      menuIcon: ['AppTopTaskTitle','AppTopTask','AppTopTaskTag', 'AppTopTaskCurrent', 'AppTopTaskArchive'],
      barColor: false,        
      ellipsis: {active: true, type: 'iconFas', name: 'window view', 
        classNameBlock: 'barWitView dropdown',
        classNameIcon: 'fas fa-ellipsis-v p_r_0p7_em p_l_1_em',
        items: [
          {actionType: 'minBottom', name: 'bottom', className: 'fas fa-window-minimize p_r_0p5_em', active: true},
          {actionType: 'minRight', name: 'minRight', className: 'fas fa-window-minimize rotate_270 p_r_0p5_em', active: true},
          {actionType: 'restored', name: 'restore', className: 'fas fa-window-restore p_r_0p5_em', active: true},
          {actionType: 'max', name: 'max', className: 'fas fa-window-maximize p_r_0p5_em', active: true},
          {actionType: 'removedWitInstance', name: 'delete', className: 'fas fa-times p_r_0p5_em', active: true}
        ]
      },
    },      
    pos: {
      wit: { position: 'absolute',
        top: 54, right: undefined, bottom: undefined, left: 24, 
        zIndex: 100, width: 350, height: 350,
        backgroundColor: '#fffff9'},
      wit__contentCanvas: { width: '150%', height: '100vh' },
      topContent: { fontSize: '1.5em', paddingLeft: '10%' },
    },
    isTrueFalse: {
      isScrollbarX: true,
      isScrollbarY: true,
      isScrollbarY: true,
      isMultipleInstances: true,
      isMultipleInstancesForPid: true,
      isIconOnAppDesktop: true,
      isOnMouseLeave: false,
    },
  },

  { type: 'AppTopTaskTitle',
    active: true,
    frame: 'FrameWindowInTab',
    content: 'AppTopTask',
    nameCom: 'Title, titre, topic, target',
    description: 'This is basic clarification with a brief detalization (what, where, when, who, why, etc.) or/and main features',
    placeholder: 'title, titre, topic, target',
    iconClassName: 'fas fa-heading c_p_Blue_Grey_400 c_point f_s_3_em',
    pidFrom: 'AppTopTarget',
    appStatus: 'witDefault',
    witState: 'restored',
    bar: {
      barSide: false,
      barColor: false,        
      ellipsis: {active: true, type: 'iconFas', name: 'window view', 
        classNameBlock: 'barWitView dropdown',
        classNameIcon: 'fas fa-ellipsis-v p_r_0p7_em p_l_1_em',
        items: [
          {actionType: 'minBottom', name: 'bottom', className: 'fas fa-window-minimize p_r_0p5_em', active: true},
          {actionType: 'minRight', name: 'minRight', className: 'fas fa-window-minimize rotate_270 p_r_0p5_em', active: true},
          {actionType: 'restored', name: 'restore', className: 'fas fa-window-restore p_r_0p5_em', active: true},
          {actionType: 'max', name: 'max', className: 'fas fa-window-maximize p_r_0p5_em', active: true},
          {actionType: 'removedWitInstance', name: 'delete', className: 'fas fa-times p_r_0p5_em', active: true}
        ]
      },
    },      
    pos: {
      wit: { position: 'absolute',
        top: 2, right: undefined, bottom: undefined, left: 150, 
        zIndex: 100, width: 360, height: 90},
      wit__bar: { backgroundColor: '#D32F2F' },
      topContent: {fontSize: '1.2em', textAlign: 'center'},
    },
    isTrueFalse: {
      isAlignCenter: true,
      isMultipleInstances: true,
      isMultipleInstancesForPid: false,
      isIconOnAppDesktop: false,
      isOnMouseLeave: false,
    },
  },    

  { type: 'AppTopTask',
    active: true,
    frame: 'FrameWindowInTab',
    content: 'AppTopTask',
    nameCom: 'Idea, intention, insight',
    description: 'A tool for collecting and displaying data in the brainstorm stage. It allows to record ideas and thoughts on cards',
    placeholder: 'idea, intention, insight',
    iconClassName: 'fas fa-lightbulb c_p_Blue_Grey_400 c_point f_s_3_em',
    pidFrom: 'AppTopTarget',
    appStatus: 'Blue',
    witState: 'restored',
    bar: {
      barCurrent: true,
      barSide: false,
      barColor: {active: true, type: 'iconFas', name: 'status menu', 
        classNameBlock: 'barDropdown dropdown',
        classNameIcon: 'fas fa-palette',
        items: [
          {actionType: 'Blue', name: '', className: 'fas fa-square c_p_Blue_500 p_x_0p5_em', style: { background: '#2196F3', color: 'black' }, active: true},
          {actionType: 'Green', name: '', className: 'fas fa-square c_p_Green_400 p_x_0p5_em', style: { background: '#66BB6A', color: 'black' }, active: true},
          {actionType: 'Orange', name: '', className: 'fas fa-square c_p_Orange_400 p_x_0p5_em', style: { background: '#FFA726', color: 'black' }, active: true},
          {actionType: 'Deep_Orange', name: '', className: 'fas fa-square c_p_Deep_Orange_500 p_x_0p5_em', style: { background: '#FF5722', color: 'black' }, active: true},
          {actionType: 'Grey', name: '', className: 'fas fa-square c_p_Grey_500 p_x_0p5_em', style: { background: '#9E9E9E', color: 'black' }, active: true},
        ]
      },        
      ellipsis: {active: true, type: 'iconFas', name: 'window view', 
        classNameBlock: 'barWitView dropdown',
        classNameIcon: 'fas fa-ellipsis-v p_r_0p7_em p_l_1_em',
        items: [
          {actionType: 'minBottom', name: 'bottom', className: 'fas fa-window-minimize p_r_0p5_em', active: true},
          {actionType: 'minRight', name: 'minRight', className: 'fas fa-window-minimize rotate_270 p_r_0p5_em', active: true},
          {actionType: 'restored', name: 'restore', className: 'fas fa-window-restore p_r_0p5_em', active: true},
          {actionType: 'max', name: 'max', className: 'fas fa-window-maximize p_r_0p5_em', active: true},
          {actionType: 'removedWitInstance', name: 'delete', className: 'fas fa-times p_r_0p5_em', active: true},
          {actionType: 'archived', name: 'archive', className: 'fas fa-archive p_r_0p5_em', active: true}
        ]
      },
    },
    pos: { 
      wit: { position: 'absolute',
        top: 195, right: undefined, bottom: undefined, left: 24, 
        zIndex: 100, width: 120, height: 120},
      wit__bar: { backgroundColor: '#2196F3' },
    },
    isTrueFalse: {
      isScrollbarX: true,
      isScrollbarY: true,
      isMultipleInstances: true,
      isMultipleInstancesForPid: true,
      isIconOnAppDesktop: false,
      isOnMouseLeave: false,
    },
  },

  { type: 'AppTopTaskTag',
    active: true,
    frame: 'FrameWindowInTab',
    content: 'AppTopTask',
    nameCom: 'Tag for a cluster or group',
    description: 'Tags or names of the clusters allow to summarize the insight in a word or phrase. The challenge here is to extract the essence of a particular cluster and put name on it.',
    placeholder: 'tag, group name',
    iconClassName: 'fas fa-tags c_p_Blue_Grey_400 c_point f_s_3_em',
    pidFrom: 'AppTopTarget',
    appStatus: 'Blue',
    witState: 'restored',
    bar: {
      menuIcon: ['AppTopTask'],
      barSide: false,
      barColor: {active: true, type: 'iconFas', name: 'status menu', 
        classNameBlock: 'barDropdown dropdown',
        classNameIcon: 'fas fa-palette',
        items: [
          {actionType: 'Blue', name: '', className: 'fas fa-square c_p_Blue_500 p_x_0p5_em', style: { background: '#2196F3', color: 'black' }, active: true},
          {actionType: 'Green', name: '', className: 'fas fa-square c_p_Green_400 p_x_0p5_em', style: { background: '#66BB6A', color: 'black' }, active: true},
          {actionType: 'Orange', name: '', className: 'fas fa-square c_p_Orange_400 p_x_0p5_em', style: { background: '#FFA726', color: 'black' }, active: true},
          {actionType: 'Deep_Orange', name: '', className: 'fas fa-square c_p_Deep_Orange_500 p_x_0p5_em', style: { background: '#FF5722', color: 'black' }, active: true},
          {actionType: 'Grey', name: '', className: 'fas fa-square c_p_Grey_500 p_x_0p5_em', style: { background: '#9E9E9E', color: 'black' }, active: true},
        ]
      },        
      ellipsis: {active: true, type: 'iconFas', name: 'window view', 
        classNameBlock: 'barWitView dropdown',
        classNameIcon: 'fas fa-ellipsis-v p_r_0p7_em p_l_1_em',
        items: [
          {actionType: 'minBottom', name: 'bottom', className: 'fas fa-window-minimize p_r_0p5_em', active: true},
          {actionType: 'minRight', name: 'minRight', className: 'fas fa-window-minimize rotate_270 p_r_0p5_em', active: true},
          {actionType: 'restored', name: 'restore', className: 'fas fa-window-restore p_r_0p5_em', active: true},
          {actionType: 'max', name: 'max', className: 'fas fa-window-maximize p_r_0p5_em', active: true},
          {actionType: 'removedWitInstance', name: 'delete', className: 'fas fa-times p_r_0p5_em', active: true}
        ]
      },
    },
    pos: {
      wit: { position: 'absolute',
      top: 100, right: undefined, bottom: undefined, left: 24, 
      zIndex: 100, width: 120, height: 90},
      wit__bar: { backgroundColor: '#66BB6A' },
      wit__contentCanvas: { width: '150%', height: '100vh' },
      topContent: {fontSize: '1.1em', paddingLeft: '10%'},
    },
    isTrueFalse: {
      isScrollbarX: true,
      isScrollbarY: true,
      isMultipleInstances: true,
      isMultipleInstancesForPid: true,
      isIconOnAppDesktop: false,
      isOnMouseLeave: false,
    },
  },

  { type: 'AppTopTaskCurrent',
    active: true,
    frame: 'FrameWindowInTab',
    content: 'AppTopTask',
    nameCom: 'Nearest, nowaday, next',
    description: 'Nearest, nowaday, next',
    contentInnerHTML: 'Nearest, nowaday, next',
    placeholder: 'nearest, nowaday, next period tasks',
    iconClassName: 'fas fa-tasks c_p_Blue_Grey_400 c_point f_s_3_em',
    pidFrom: 'AppTopTarget',
    appStatus: 'witDefault',
    witState: 'restored',
    bar: {
      menuIcon: ['AppTopTask'],
      barSide: false,
      barColor: false,        
      ellipsis: {active: true, type: 'iconFas', name: 'window view', 
        classNameBlock: 'barWitView dropdown',
        classNameIcon: 'fas fa-ellipsis-v p_r_0p7_em p_l_1_em',
        items: [
          {actionType: 'minBottom', name: 'bottom', className: 'fas fa-window-minimize p_r_0p5_em', active: true},
          {actionType: 'minRight', name: 'minRight', className: 'fas fa-window-minimize rotate_270 p_r_0p5_em', active: true},
          {actionType: 'restored', name: 'restore', className: 'fas fa-window-restore p_r_0p5_em', active: true},
          {actionType: 'max', name: 'max', className: 'fas fa-window-maximize p_r_0p5_em', active: true},
          {actionType: 'removedWitInstance', name: 'delete', className: 'fas fa-times p_r_0p5_em', active: true}
        ]
      },
    },
    pos: {
      wit: { position: 'absolute',
      top: 100, right: undefined, bottom: undefined, left: 300, 
      zIndex: 100, width: 360, height: 200},
      wit__bar: { backgroundColor: '#f44336' },
      topContent: {fontSize: '1.1em', textAlign: 'center'},
    },
    isTrueFalse: {
      isScrollbarX: false,
      isScrollbarY: true,
      isMultipleInstances: true,
      isMultipleInstancesForPid: false,
      isIconOnAppDesktop: false,
      isOnMouseLeave: false,
    },
  },

  { type: 'AppTopTaskArchive',
    active: true,
    frame: 'FrameWindowInTab',
    content: 'AppTopTask',
    nameCom: 'Current, nearest, next period tasks',
    description: 'archive of completed tasks',
    contentInnerHTML: 'Done or archived',
    placeholder: 'archived',
    iconClassName: 'fas fa-archive c_p_Blue_Grey_400 c_point f_s_3_em',
    pidFrom: 'AppTopTarget',
    appStatus: 'witDefault',
    witState: 'restored',
    bar: {
      menuIcon: false,
      barSide: false,
      barColor: false,        
      ellipsis: {active: true, type: 'iconFas', name: 'window view', 
        classNameBlock: 'barWitView dropdown',
        classNameIcon: 'fas fa-ellipsis-v p_r_0p7_em p_l_1_em',
        items: [
          {actionType: 'minBottom', name: 'bottom', className: 'fas fa-window-minimize p_r_0p5_em', active: true},
          {actionType: 'minRight', name: 'minRight', className: 'fas fa-window-minimize rotate_270 p_r_0p5_em', active: true},
          {actionType: 'restored', name: 'restore', className: 'fas fa-window-restore p_r_0p5_em', active: true},
          {actionType: 'max', name: 'max', className: 'fas fa-window-maximize p_r_0p5_em', active: true},
          {actionType: 'removedWitInstance', name: 'delete', className: 'fas fa-times p_r_0p5_em', active: true}
        ]
      },
    },
    pos: {
      wit: { position: 'absolute',
        top: 124, right: undefined, bottom: undefined, left: 500, 
        zIndex: 100, width: 360, height: 200},
      wit__bar: { backgroundColor: '#9E9E9E' },
      topContent: {fontSize: '1.1em', textAlign: 'left'},
    },
    isTrueFalse: {
      isScrollbarX: false,
      isScrollbarY: true,
      isMultipleInstances: true,
      isMultipleInstancesForPid: false,
      isIconOnAppDesktop: false,
      isOnMouseLeave: false,
    },
  },

  { type: 'AppTimeAndDate',
    active: true,
    frame: 'FrameWindowInTab',
    content: 'AppTimeAndDate',
    nameCom: 'Timeclock',
    description: 'Under developing',
    placeholder: '',
    iconClassName: 'far fa-clock c_p_Blue_Grey_400 c_point f_s_3_em',
    pidFrom: 'SiteWindows',
    appStatus: 'witDefault',
    witState: 'restored',
    bar: {
      ellipsis: {active: true, type: 'iconFas', name: 'window view', 
        classNameBlock: 'barWitView dropdown',
        classNameIcon: 'fas fa-ellipsis-v p_r_0p7_em p_l_1_em',
        items: [
          {actionType: 'minBottom', name: 'bottom', className: 'fas fa-window-minimize p_r_0p5_em', active: true},
          {actionType: 'minRight', name: 'minRight', className: 'fas fa-window-minimize rotate_270 p_r_0p5_em', active: true},
          {actionType: 'restored', name: 'restore', className: 'fas fa-window-restore p_r_0p5_em', active: true},
          {actionType: 'max', name: 'max', className: 'fas fa-window-maximize p_r_0p5_em', active: true},
          {actionType: 'removedWitInstance', name: 'delete', className: 'fas fa-times p_r_0p5_em', active: true}
        ]
      },
    },
    pos: {
      wit: { position: 'fixed',
        top: 54, right: undefined, bottom: undefined, left: 24, 
        zIndex: 100, width: 400, height: 400 },
      wit__contentContainer: { }
    },
    isTrueFalse: {
      isMultipleInstances: true,
      isMultipleInstancesForPid: false,
      isIconOnAppDesktop: true,
      isOnMouseLeave: false,
    },
  },

  { type: 'AppDivEditable',
    active: true,
    frame: 'FrameWindowInTab',
    content: 'AppDivEditable',
    nameCom: 'Div Editable',
    description: '',
    placeholder: 'Use this app for notes, brief comment collection, etc.',
    iconClassName: 'far fa-file-alt c_p_Blue_Grey_400 c_point f_s_3_em',
    pidFrom: 'SiteWindows',
    appStatus: 'witDefault',
    witState: 'restored',
    bar: {
      barSide: false,
      barColor: false,        
      ellipsis: {active: true, type: 'iconFas', name: 'window view', 
        classNameBlock: 'barWitView dropdown',
        classNameIcon: 'fas fa-ellipsis-v p_r_0p7_em p_l_1_em',
        items: [
          {actionType: 'minBottom', name: 'bottom', className: 'fas fa-window-minimize p_r_0p5_em', active: true},
          {actionType: 'minRight', name: 'minRight', className: 'fas fa-window-minimize rotate_270 p_r_0p5_em', active: true},
          {actionType: 'restored', name: 'restore', className: 'fas fa-window-restore p_r_0p5_em', active: true},
          {actionType: 'max', name: 'max', className: 'fas fa-window-maximize p_r_0p5_em', active: true},
          {actionType: 'removedWitInstance', name: 'delete', className: 'fas fa-times p_r_0p5_em', active: true}
        ]
      },
    },
    pos: {
      wit: { position: 'fixed',
        top: 54, right: undefined, bottom: undefined, left: 24, zIndex: 100, 
        width: 250, height: 250 },
    },
    isTrueFalse: {
      isMultipleInstances: false,
      isMultipleInstancesForPid: false,
      isIconOnAppDesktop: true,
      isOnMouseLeave: false,
    },
  },

];

  wit.defaultAppTopTarget = {"witSrc":"","witInstances":[{"type":"AppTopTarget","fid":"id_502b5c36-79b9-40de-a78e-5b2e1266bf0e","aid":"id_3f64c142-9576-4802-84d3-b83616dd3547","pid":"id_efe964da-ebe9-4a45-a2ea-2a426f1fc4bb","cid":["id_ffc6e53c-3ab9-4498-a1f4-cc1c4444114f","id_8152fa2a-c799-45fb-a9cc-b7787b183708","id_79127445-87a9-4d86-bd9b-43dad8ad650a","id_20aecd37-5b50-41d6-bb8d-dd84914e96dd","id_39aac67d-c86b-459d-b9ff-e9afc6f78d6d__out","id_d20bc103-1cfd-40f3-89d0-5123140a2b0f","id_01f7502e-6ff4-482d-b057-b2656f3b1c27","id_79db3e14-388a-47a4-9dbf-219cb7bd5e2f","id_3fbb6355-59da-4aa1-bca0-c7c2f7314a7b","id_66c98219-8972-4275-a9f9-8ee35347a37f","id_2aeea45b-9817-4dc1-9058-5e77fa1c8140","id_befcf05e-7659-4805-bfb4-36931d9bebaf","id_76cdc54b-225b-4da2-ac38-c8ad9ff620f2"],"date":"2018-10-09T03:10","pos":{"wit":{"zIndex":101,"left":0,"top":0,"position":"absolute","right":0,"bottom":626,"width":1366,"height":626,"backgroundColor":"#fffff9"},"wit__bar":{"backgroundColor":"rgb(33, 150, 243)"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"fontSize":"1.5em","textAlign":"center","color":""}}},{"type":"AppTopTaskTag","fid":"id_8152fa2a-c799-45fb-a9cc-b7787b183708","aid":"id_6f63c236-f214-45bf-bdee-494a9ff2e176","pid":"id_502b5c36-79b9-40de-a78e-5b2e1266bf0e","cid":[],"date":"2018-10-09T03:13","pos":{"wit":{"top":112,"left":107,"zIndex":100,"position":"absolute","right":-1115,"bottom":-424,"width":126,"height":90,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"rgb(121, 85, 72)"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"fontSize":"1.1em","textAlign":"center","color":""}},"contentInnerHTML":"Budget","textContent":"Budget"},{"type":"AppTopTaskTag","fid":"id_79127445-87a9-4d86-bd9b-43dad8ad650a","aid":"id_ea25e410-95e4-4b20-bfa7-2259f996fdc5","pid":"id_502b5c36-79b9-40de-a78e-5b2e1266bf0e","cid":[],"date":"2018-10-09T03:13","pos":{"wit":{"top":114,"left":253,"zIndex":101,"position":"absolute","right":-964,"bottom":-420,"width":131,"height":92,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"rgb(121, 85, 72)"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"fontSize":"1.1em","textAlign":"center","color":""}},"contentInnerHTML":"Purchase&ensp;Property","textContent":"Purchase Property"},{"type":"AppTopTaskTitle","fid":"id_ffc6e53c-3ab9-4498-a1f4-cc1c4444114f","aid":"id_4e59ed15-49fe-4580-be3b-e94268f521fc","pid":"id_502b5c36-79b9-40de-a78e-5b2e1266bf0e","cid":[],"date":"2018-10-09T03:11","pos":{"wit":{"left":508,"zIndex":101,"position":"absolute","top":10,"right":-480,"bottom":-526,"width":360,"height":90,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"rgb(211, 47, 47)"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"fontSize":"1.2em","textAlign":"center","color":""}},"contentInnerHTML":"🏠&ensp;Plan&ensp;to&ensp;build&ensp;a&ensp;house","textContent":"🏠 Plan to build a house"},{"type":"AppTopTaskTag","fid":"id_66c98219-8972-4275-a9f9-8ee35347a37f","aid":"id_37ef79a7-a0b3-4960-9ef6-3beba105ab54","pid":"id_502b5c36-79b9-40de-a78e-5b2e1266bf0e","cid":["id_88b5ef0a-8a4e-41c0-882d-aac150bfdb72","id_240d0f3f-a07a-40a5-80a3-bf4fd96dfd03","id_6da59708-bda7-4807-84d2-ea021d11c07e"],"date":"2018-10-09T03:18","pos":{"wit":{"top":115,"left":649,"zIndex":102,"position":"absolute","right":-479,"bottom":-59,"width":220,"height":452,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"rgb(121, 85, 72)"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"fontSize":"1.1em","textAlign":"center","color":""}},"contentInnerHTML":"Paperwork","textContent":"Paperwork"},{"type":"AppTopTaskTag","fid":"id_20aecd37-5b50-41d6-bb8d-dd84914e96dd","aid":"id_9e624bd5-a0c0-45ee-a6c2-2b5a1aaf6cf9","pid":"id_502b5c36-79b9-40de-a78e-5b2e1266bf0e","cid":["id_7d5fab3a-9a82-48a2-90c9-776ac50c25e1__out","id_4e019d80-ce0b-4fe8-be54-1048a3fdea40"],"date":"2018-10-09T03:13","pos":{"wit":{"top":116,"left":403,"zIndex":103,"position":"absolute","right":-715,"bottom":-58,"width":230,"height":452,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"rgb(121, 85, 72)"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"fontSize":"1.1em","textAlign":"center","color":""}},"contentInnerHTML":"Purchase&ensp;Property","textContent":"Purchase Property"},{"type":"AppTopTask","fid":"id_79db3e14-388a-47a4-9dbf-219cb7bd5e2f","aid":"id_64ea5374-2236-4295-9329-1a0a1f03befb","pid":"id_502b5c36-79b9-40de-a78e-5b2e1266bf0e","cid":[],"date":"2018-10-09T03:15","pos":{"wit":{"top":215,"left":252,"zIndex":104,"position":"absolute","right":-963,"bottom":-312,"width":133,"height":99,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"darkblue"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"color":""}},"contentInnerHTML":"Explore&ensp;locations&ensp;online","textContent":"Explore locations online"},{"type":"AppTopTaskCurrent","fid":"id_befcf05e-7659-4805-bfb4-36931d9bebaf","aid":"id_e172db86-ba04-4e8c-ac0a-b4bc7746fdd4","pid":"id_502b5c36-79b9-40de-a78e-5b2e1266bf0e","cid":["id_39aac67d-c86b-459d-b9ff-e9afc6f78d6d__cur","id_7d5fab3a-9a82-48a2-90c9-776ac50c25e1__cur"],"date":"2018-10-09T03:22","pos":{"wit":{"top":117,"left":886,"zIndex":104,"position":"absolute","right":-7,"bottom":-281,"width":455,"height":228,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"rgb(244, 67, 54)"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"fontSize":"1.1em","textAlign":"center","color":""}},"contentInnerHTML":"Nearest, nowaday, next","textContent":"Nearest, nowaday, next"},{"type":"AppTopTask","fid":"id_3fbb6355-59da-4aa1-bca0-c7c2f7314a7b","aid":"id_7b318e6f-9a64-4e5a-a155-f0f9eecd051a","pid":"id_502b5c36-79b9-40de-a78e-5b2e1266bf0e","cid":[],"date":"2018-10-09T03:16","pos":{"wit":{"top":322,"left":250,"zIndex":105,"position":"absolute","right":-965,"bottom":-188,"width":133,"height":116,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"darkblue"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"color":""}},"contentInnerHTML":"Meet&ensp;with&ensp;local&ensp;realtors","textContent":"Meet with local realtors"},{"type":"AppTopTaskArchive","fid":"id_76cdc54b-225b-4da2-ac38-c8ad9ff620f2","aid":"id_260b4789-c964-4c2c-964d-6d49acc50f6e","pid":"id_502b5c36-79b9-40de-a78e-5b2e1266bf0e","cid":[],"date":"2018-10-09T03:30","pos":{"wit":{"top":360,"left":885,"zIndex":106,"position":"absolute","right":-4,"bottom":-59,"width":459,"height":207,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"rgb(158, 158, 158)"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"fontSize":"1.1em","textAlign":"left","color":""}},"contentInnerHTML":"Archived<br /><br /><span style=\"font-weight: bold;\">10/8/2018, 8:33:01 PM</span>&ensp;Study house designs<br /><span style=\"font-weight: bold;\">10/8/2018, 8:32:43 PM</span>&ensp;Ride around the neighborhood<br />","textContent":"Archived\n\n10/8/2018, 8:33:01 PM Study house designs\n10/8/2018, 8:32:43 PM Ride around the neighborhood\n"},{"type":"AppTopTask","fid":"id_39aac67d-c86b-459d-b9ff-e9afc6f78d6d__out","aid":"id_1f0d8c34-aaa6-4baf-8f22-2ada3c827310","pid":"id_502b5c36-79b9-40de-a78e-5b2e1266bf0e","cid":[],"date":"2018-10-09T03:14","pos":{"wit":{"top":213,"left":106,"zIndex":107,"position":"absolute","right":-1118,"bottom":-318,"width":124,"height":95,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"darkblue"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"color":""}},"contentInnerHTML":"Prepare&ensp;a&ensp;family&ensp;budget","textContent":"Prepare a family budget"},{"type":"AppTopTask","fid":"id_01f7502e-6ff4-482d-b057-b2656f3b1c27","aid":"id_a18f096c-b8d2-4e0c-b3b1-26945c3c6280","pid":"id_502b5c36-79b9-40de-a78e-5b2e1266bf0e","cid":[],"date":"2018-10-09T03:15","pos":{"wit":{"top":448,"left":105,"zIndex":108,"position":"absolute","right":-1110,"bottom":-57,"width":133,"height":121,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"darkblue"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"color":""}},"contentInnerHTML":"Prepare&ensp;a&ensp;construction&ensp;budget","textContent":"Prepare a construction budget"},{"type":"AppTopTask","fid":"id_d20bc103-1cfd-40f3-89d0-5123140a2b0f","aid":"id_e6c02d36-c9a8-4e50-b4ef-15b985310546","pid":"id_502b5c36-79b9-40de-a78e-5b2e1266bf0e","cid":[],"date":"2018-10-09T03:14","pos":{"wit":{"top":321,"left":105,"zIndex":109,"position":"absolute","right":-1114,"bottom":-189,"width":129,"height":116,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"darkblue"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"color":""}},"contentInnerHTML":"Consult&ensp;with&ensp;banks&ensp;about&ensp;mortgage&ensp;rate","textContent":"Consult with banks about mortgage rate"},{"type":"AppTopTask","fid":"id_2aeea45b-9817-4dc1-9058-5e77fa1c8140","aid":"id_6a6381fa-0592-4064-ba4b-050c8bb5f413","pid":"id_502b5c36-79b9-40de-a78e-5b2e1266bf0e","cid":[],"date":"2018-10-09T03:21","pos":{"wit":{"top":351,"left":12,"zIndex":110,"position":"absolute","right":-1273,"bottom":-55,"width":63,"height":220,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"darkblue"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"color":""}},"contentInnerHTML":"✔&ensp;&ensp;●&ensp;&ensp;★&ensp;⚽&ensp;⚓&ensp;⚘&ensp;☴&ensp;⚷&ensp;🗝&ensp;📅&ensp;★&ensp;☒&ensp;₽&ensp;✂&ensp;&ensp;❤&ensp;&ensp;☁&ensp;☛&ensp;🙃","textContent":"✔  ●  ★ ⚽ ⚓ ⚘ ☴ ⚷ 🗝 📅 ★ ☒ ₽ ✂  ❤  ☁ ☛ 🙃"},{"type":"AppTopTask","fid":"id_88b5ef0a-8a4e-41c0-882d-aac150bfdb72","aid":"id_0983d8ec-a4da-47e9-ac6c-7d5f43978ffd","pid":"id_66c98219-8972-4275-a9f9-8ee35347a37f","cid":[],"date":"2018-10-09T03:19","pos":{"wit":{"top":67,"left":57,"zIndex":100,"position":"absolute","right":-13,"bottom":-456,"width":132,"height":103,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"darkblue"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"color":""}},"contentInnerHTML":"Obtain&ensp;Permits&ensp;and&ensp;Inspections","textContent":"Obtain Permits and Inspections"},{"type":"AppTopTask","fid":"id_6da59708-bda7-4807-84d2-ea021d11c07e","aid":"id_a2a664e6-b415-462e-9959-f0eb27d30e83","pid":"id_66c98219-8972-4275-a9f9-8ee35347a37f","cid":[],"date":"2018-10-09T03:19","pos":{"wit":{"top":176,"left":57,"zIndex":101,"position":"absolute","right":-10,"bottom":-344,"width":135,"height":106,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"darkblue"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"color":""}},"contentInnerHTML":"Purchase&ensp;Construction&ensp;Insurance","textContent":"Purchase Construction Insurance"},{"type":"AppTopTask","fid":"id_240d0f3f-a07a-40a5-80a3-bf4fd96dfd03","aid":"id_9e0410c2-4356-479e-b4ce-e5827100eaad","pid":"id_66c98219-8972-4275-a9f9-8ee35347a37f","cid":[],"date":"2018-10-09T03:19","pos":{"wit":{"top":289,"left":57,"zIndex":102,"position":"absolute","right":-10,"bottom":-230,"width":135,"height":107,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"darkblue"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"color":""}},"contentInnerHTML":"Negotiate&ensp;a&ensp;contracts&ensp;with&ensp;contractos","textContent":"Negotiate a contracts with contractos"},{"type":"AppTopTask","fid":"id_7d5fab3a-9a82-48a2-90c9-776ac50c25e1__out","aid":"id_c7182068-63d8-4ef9-a324-d7b47da82906","pid":"id_20aecd37-5b50-41d6-bb8d-dd84914e96dd","cid":[],"date":"2018-10-09T03:16","pos":{"wit":{"top":69,"left":54,"zIndex":100,"position":"absolute","right":-9,"bottom":-433,"width":149,"height":124,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"darkblue"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"color":""}},"contentInnerHTML":"Chose&ensp;size,&ensp;floors,&ensp;rooms,&ensp;materials,&ensp;design&ensp;style&ensp;and&ensp;colors","textContent":"Chose size, floors, rooms, materials, design style and colors"},{"type":"AppTopTask","fid":"id_4e019d80-ce0b-4fe8-be54-1048a3fdea40","aid":"id_e3a5fb63-303b-4c3a-ba9e-af09c72a64b6","pid":"id_20aecd37-5b50-41d6-bb8d-dd84914e96dd","cid":[],"date":"2018-10-09T03:17","pos":{"wit":{"top":199,"left":55,"zIndex":101,"position":"absolute","right":-8,"bottom":-302,"width":149,"height":125,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"darkblue"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"color":""}},"contentInnerHTML":"Choose&ensp;a&ensp;general&ensp;contractor&ensp;or&ensp;builders","textContent":"Choose a general contractor or builders"},{"type":"AppTopTask","fid":"id_39aac67d-c86b-459d-b9ff-e9afc6f78d6d__cur","aid":"id_2a419e12-c8dd-4ed3-b176-13d474d6896f","pid":"id_befcf05e-7659-4805-bfb4-36931d9bebaf","cid":[],"date":"2018-10-09T03:23","pos":{"wit":{"top":48,"left":70,"zIndex":100,"position":"absolute","right":-241,"bottom":-449,"width":126,"height":129,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"darkblue"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"color":""}},"contentInnerHTML":"Prepare&ensp;a&ensp;family&ensp;budget","textContent":"Prepare a family budget"},{"type":"AppTopTask","fid":"id_7d5fab3a-9a82-48a2-90c9-776ac50c25e1__cur","aid":"id_65e09c0a-1c88-4393-a93a-f31fd757a38f","pid":"id_befcf05e-7659-4805-bfb4-36931d9bebaf","cid":[],"date":"2018-10-09T03:23","pos":{"wit":{"top":47,"left":212,"zIndex":101,"position":"absolute","right":-66,"bottom":-449,"width":159,"height":130,"backgroundColor":"#f1f1f1"},"wit__bar":{"backgroundColor":"darkblue"},"wit__contentContainer":{"display":"block","position":"relative"},"topContent":{"color":""}},"contentInnerHTML":"Chose&ensp;size,&ensp;floors,&ensp;rooms,&ensp;materials,&ensp;design&ensp;style&ensp;and&ensp;colors","textContent":"Chose size, floors, rooms, materials, design style and colors"}]};
  
export default wit;


/*
{"witSrc":"","witInstances":
import AppMonacoEditor from '../Components/AppMonacoEditor.react';
import AppMenuBar from '../Components/AppMenuBar.react';
import AppTopSsp from '../Components/AppTopSsp.react';
  'AppMonacoEditor': AppMonacoEditor,
  'AppMenuBar': AppMenuBar,
  'AppTopSsp': AppTopSsp,


    { type: 'AppTopSsp',
      active: false,
      frame: 'FrameWindowInTab',
      content: 'AppTopSsp',
      nameCom: 'App for Session of Strategic Planning (Retreat)',
      description: 'Used the ToP technology',
      placeholder: 'Use this app for planning, problem solving, research, decision - making',
      iconClassName: 'fas fa-leaf c_p_Blue_Grey_400 c_point f_s_3_em',
      pidFrom: 'SiteWindows',
      appStatus: 'witDefault',
      witState: 'max',
      pos: {
        wit: { position: 'fixed',
        top: 54, right: undefined, bottom: undefined, left: 24, 
        zIndex: 100, width: 350, height: 350 },
        wit__contentContainer: { }
      },
      isTrueFalse: {
        isMultipleInstances: false,
        isMultipleInstancesForPid: false,
        isIconOnAppDesktop: true,
        isOnMouseLeave: false,
      },
    },

    { type: 'AppMonacoEditor',
      active: false,
      frame: 'FrameWindowInTab',
      content: 'AppMonacoEditor',
      nameCom: 'App Editor',
      description: '',
      placeholder: 'Use this app for notes, brief comment collection, etc.',
      iconClassName: 'far fa-file-code c_p_Blue_Grey_400 c_point f_s_3_em',
      pidFrom: 'SiteWindows',
      appStatus: 'witDefault',
      witState: 'restored',
      bar: {
        barSide: false,
        barColor: false,        
        ellipsis: {active: true, type: 'iconFas', name: 'window view', 
          classNameBlock: 'barWitView dropdown',
          classNameIcon: 'fas fa-ellipsis-v p_r_0p7_em p_l_1_em',
          items: [
            {actionType: 'minBottom', name: 'bottom', className: 'fas fa-window-minimize p_r_0p5_em', active: true},
            {actionType: 'minRight', name: 'minRight', className: 'fas fa-window-minimize rotate_270 p_r_0p5_em', active: true},
            {actionType: 'restored', name: 'restore', className: 'fas fa-window-restore p_r_0p5_em', active: true},
            {actionType: 'max', name: 'max', className: 'fas fa-window-maximize p_r_0p5_em', active: true},
            {actionType: 'removedWitInstance', name: 'delete', className: 'fas fa-times p_r_0p5_em', active: true}
          ]
        },
      },
      pos: {
        wit: { position: 'fixed',
          top: 54, right: undefined, bottom: undefined, left: 24, 
          zIndex: 100, width: 250, height: 250 },
        wit__contentContainer: { }
      },
      isTrueFalse: {
        isMultipleInstances: true,
        isMultipleInstancesForPid: true,
        isIconOnAppDesktop: true,
        isOnMouseLeave: false,
      },      
    },    


    { type: 'AppMenuBar',
      active: true,
      frame: 'FrameDiv4List',
      content: 'AppMenuBar',
      nameCom: 'Menu Bar',
      description: '',
      placeholder: '',
      iconClassName: '',
      pidFrom: 'self',
      appStatus: 'witDefault',
      witState: 'restored',
      pos: {
        wit: { position: 'absolute',
        top: -2, right: undefined, bottom: undefined, left: 10, 
        zIndex: 100, width: 'auto', height: 'auto' }
      },
      isTrueFalse: {
        isMultipleInstances: false,
        isMultipleInstancesForPid: false,
        isIconOnAppDesktop: false,
        isOnMouseLeave: true,
      },
    },


*/