import { ControlConfig } from './control-config';
import { BaseInputField } from './base-input-field';

export interface InputControlConfig extends ControlConfig, BaseInputField {
  type: string;
  id: string;
}

