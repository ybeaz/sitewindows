//npm run jest --watch serviceFunc.spec.js

import * as serviceFunc from '../serviceFunc'


const witInstances =
  [
    {
      "type": "SiteWindows",
      "active": true,
      "frame": "",
      "content": "",
      "nameCom": "",
      "description": "",
      "placeholder": "",
      "iconClassName": "",
      "pidFrom": "",
      "appStatus": "witDefault",
      "fid": "id_9c92c070-c1ee-4fe1-8067-6ebe3f4f95e8",
      "aid": "id_2e65e6a1-57cd-4a9e-ad06-2ac07a88ff2c",
      "pid": "id_2d6ca71f-9dc5-47a3-a1a8-c5dc71abbffe",
      "cid": [
        "id_e8ec4291-3fd5-4b3f-8d95-ea70990c5bcd",
        "id_138c185e-88dd-4c12-b080-95d2e02716c6"
      ],
      "date": "2019-01-19T04:40"
    },
    {
      "type": "AppDesktop",
      "active": true,
      "frame": "FrameWindowInTab",
      "content": "AppDesktop",
      "nameCom": "",
      "description": "",
      "placeholder": "",
      "iconClassName": "",
      "pidFrom": "SiteWindows",
      "appStatus": "witDefault",
      "witState": "restored",
      "fid": "id_e8ec4291-3fd5-4b3f-8d95-ea70990c5bcd",
      "aid": "id_ae4be710-aae9-4056-879d-88f10c2ab95c",
      "pid": "id_9c92c070-c1ee-4fe1-8067-6ebe3f4f95e8",
      "cid": [],
      "date": "2019-01-19T04:40"
    },
    {
      "type": "AppTopTarget",
      "active": true,
      "frame": "FrameWindowInTab",
      "content": "AppTopTask",
      "nameCom": "TIT Target-Ideas-Tags",
      "description": "Planning, problem solving, project making, prioritizing",
      "placeholder": "Planning, problem solving, project making, prioritizing",
      "iconClassName": "fas fa-bullseye c_p_Blue_Grey_400 c_point f_s_3_em",
      "pidFrom": "SiteWindows",
      "appStatus": "witDefault",
      "witState": "max",
      "fid": "id_138c185e-88dd-4c12-b080-95d2e02716c6",
      "pid": "id_9c92c070-c1ee-4fe1-8067-6ebe3f4f95e8",
      "cid": [
        "id_a1f0e385-2340-41ce-9fb2-f83fc082e86c__out",
        "id_c4ee845e-4057-4a90-86c6-eb2e183e980d"
      ],
      "aid": "id_1f315ecb-bf9b-4d77-ad3f-c486f22efba5",
      "date": "2019-01-19T04:41",
      "contentInnerHTML": "",
      "textContent": "",
    },
    {
      "type": "AppTopTask",
      "active": true,
      "frame": "FrameWindowInTab",
      "content": "AppTopTask",
      "nameCom": "Idea, intention, insight",
      "description": "A tool for collecting and displaying data in the brainstorm stage. It allows to record ideas and thoughts on cards",
      "placeholder": "idea, intention, insight",
      "iconClassName": "fas fa-lightbulb c_p_Blue_Grey_400 c_point f_s_3_em",
      "pidFrom": "AppTopTarget",
      "appStatus": "Blue",
      "witState": "restored",
      "fid": "id_a1f0e385-2340-41ce-9fb2-f83fc082e86c__out",
      "pid": "id_138c185e-88dd-4c12-b080-95d2e02716c6",
      "cid": [],
      "aid": "id_7c3329f7-3409-4168-8c33-09b16e04ed84",
      "date": "2019-01-19T04:41",
      "contentInnerHTML": "",
      "textContent": "",
    },
    {
      "type": "AppTopTaskCurrent",
      "active": true,
      "frame": "FrameWindowInTab",
      "content": "AppTopTask",
      "nameCom": "Nearest, nowaday, next",
      "description": "Nearest, nowaday, next",
      "contentInnerHTML": "Nearest, nowaday, next",
      "placeholder": "nearest, nowaday, next period tasks",
      "iconClassName": "fas fa-tasks c_p_Blue_Grey_400 c_point f_s_3_em",
      "pidFrom": "AppTopTarget",
      "appStatus": "witDefault",
      "witState": "restored",
      "fid": "id_c4ee845e-4057-4a90-86c6-eb2e183e980d",
      "pid": "id_138c185e-88dd-4c12-b080-95d2e02716c6",
      "cid": [
        "id_a1f0e385-2340-41ce-9fb2-f83fc082e86c__cur", "id_a1f0e385-2340-41ce-9fb2-f83fc1111111__ins"
      ],
      "aid": "id_9bca7780-255b-4093-ba77-1c371705ff70",
      "date": "2019-01-19T04:41",
      "textContent": "Nearest, nowaday, next",
    },
    {
      "type": "AppTopTask",
      "active": true,
      "frame": "FrameWindowInTab",
      "content": "AppTopTask",
      "nameCom": "Idea, intention, insight",
      "description": "A tool for collecting and displaying data in the brainstorm stage. It allows to record ideas and thoughts on cards",
      "placeholder": "idea, intention, insight",
      "iconClassName": "fas fa-lightbulb c_p_Blue_Grey_400 c_point f_s_3_em",
      "pidFrom": "AppTopTarget",
      "appStatus": "Blue",
      "witState": "restored",
      "fid": "id_a1f0e385-2340-41ce-9fb2-f83fc082e86c__cur",
      "pid": "id_c4ee845e-4057-4a90-86c6-eb2e183e980d",
      "cid": [],
      "aid": "id_5fb51802-7c50-4dfb-bb58-1d2e51ac8da9",
      "date": "2019-01-19T04:41",
      "contentInnerHTML": "",
      "textContent": "",
    },
    {
      "type": "AppTopTask",
      "active": true,
      "frame": "FrameWindowInTab",
      "content": "AppTopTask",
      "nameCom": "Idea, intention, insight",
      "description": "A tool for collecting and displaying data in the brainstorm stage. It allows to record ideas and thoughts on cards",
      "placeholder": "idea, intention, insight",
      "iconClassName": "fas fa-lightbulb c_p_Blue_Grey_400 c_point f_s_3_em",
      "pidFrom": "AppTopTarget",
      "appStatus": "Blue",
      "witState": "restored",
      "fid": "id_a1f0e385-2340-41ce-9fb2-f83fc1111111__ins",
      "pid": "id_c4ee845e-4057-4a90-86c6-eb2e183e980d",
      "cid": [],
      "aid": "id_5fb51802-7c50-4dfb-bb58-1d2e51ac8da9",
      "date": "2019-01-19T04:41",
      "contentInnerHTML": "",
      "textContent": "",
    }
  ]

describe('serviceFunc', () => {
  // use it.skip it.only



  it('[1] Should return correct witInstances with new ids', () => {

    let witInstancesNext
    witInstancesNext = serviceFunc.filterPropsObjArrFunc(witInstances, ['fid', 'pid', 'cid'])
    //console.table(witInstancesNext)

    witInstancesNext = serviceFunc.itemNewFidParentChilren(witInstancesNext)

    witInstancesNext = serviceFunc.filterPropsObjArrFunc(witInstancesNext, ['fid', 'pid', 'cid'])
    //console.table(witInstancesNext)

  })

  test('[0] tests Jest health: adds 2 * 2 to equal 4', () => {
    expect((2 * 2)).toBe(4);
  })

})
