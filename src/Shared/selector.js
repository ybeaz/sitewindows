import { createSelector } from 'reselect'; //https://github.com/reactjs/reselect
import _ from 'lodash'; //https://lodash.com/docs/4.17.10

const wits = state => state.get('wit').toJS().wits;

export const getWits = createSelector(
  witsSelector,
  wits => wits.recentActivity
);
 
 