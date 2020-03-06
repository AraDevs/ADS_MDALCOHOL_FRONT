import { PlainActionCreator, DataActionCreator } from './action-types';

/**
 * Represent a set of action the effect will be use
 */
export class EffectActionsConfig {
  constructor(
    public actionToListen: PlainActionCreator | DataActionCreator,
    public successAction: DataActionCreator,
    public failAction: DataActionCreator) { }
}
