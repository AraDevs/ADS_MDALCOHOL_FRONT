import { FieldConfig } from './field-config';
import { BaseInputField } from './base-input-field';


export interface InputFieldConfig extends FieldConfig, BaseInputField {
  type: string;
  id: string;
}
