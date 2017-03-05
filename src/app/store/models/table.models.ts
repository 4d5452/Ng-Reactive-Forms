import { type } from '../../shared/util';

export interface ColumnMetaObject {
  column: string;
  type: string;
  selector: string;
}

export const SortOrder = {
  ASCENDING: type('[Table Models] Ascending'),
  DESCENDING: type('[Table Models] Descending')
}

export const TableDataType = {
  DATE: type('[Table Models] Date'),
  STRING: type('[Table Models] String'),
  NUMBER: type('[Table Models] Number')
}