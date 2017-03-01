export interface Filter {
  id: string,
  type: FilterType,
  created: Date,
  modified: Date,
}

export interface FilterType {
  upc: string
}

export enum UsageUnit {
  Hours,
  Miles
}

export interface CleaningRecord {
  id: number,
  created: Date,
  modified: Date,
  pre: number,
  post: number,
  cycles: number,
  filter: Filter
}