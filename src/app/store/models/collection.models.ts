import { type } from '../../shared/util';

export interface MetaObject {
  header: string;
  selector: string;
  type: string;
}

export const Type = {
  DATE: type('[Table Models] Date'),
  STRING: type('[Table Models] String'),
  NUMBER: type('[Table Models] Number')
}