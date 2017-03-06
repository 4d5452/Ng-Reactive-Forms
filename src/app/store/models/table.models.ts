import { type } from '../../shared/util';

export interface ColumnMetaObject {
  column: string; //Name displayed in table header
  type: string; //Determines format of data in column
  selector: string; //Data object selector: i.e. item[selector]
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