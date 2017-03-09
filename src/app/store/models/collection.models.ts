import { type } from '../../shared/util';

export interface MetaObject {
  header: string;
  selector: string[];
  type: string;
}

export const Type = {
  DATE: type('[Data Models] Date'),
  STRING: type('[Data Models] String'),
  NUMBER: type('[Data Models] Number'),
  OBJECT: type('[Data Models] OBJECT')
}