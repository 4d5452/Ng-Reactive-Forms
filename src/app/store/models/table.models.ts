
export interface TableMetaData {
  columns: ColumnMetaObject[];
  selectedColumn: number;
}

export interface ColumnMetaObject {
  column: string;
  type: string;
  selector: string;
}

export enum SortOrder {
  ASC,
  DES
}