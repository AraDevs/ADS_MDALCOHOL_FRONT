import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UsersState, FEATURE_KEY} from './reducer';

export const usersFeature = createFeatureSelector<any, UsersState>(FEATURE_KEY);
export const selectUsers = createSelector(usersFeature, users => users.users);
