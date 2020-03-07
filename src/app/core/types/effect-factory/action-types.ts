import { ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export type PlainActionCreator = ActionCreator<string, () => TypedAction<string>>;
export type DataActionCreator = ActionCreator<string, (props: { payload: any; }) => { payload: any; } & TypedAction<string>>;
