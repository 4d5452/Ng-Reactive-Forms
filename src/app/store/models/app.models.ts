export interface Filter {
  id: string,
  type: FilterType,
  created: number,
  modified: number,
}

export interface FilterType {
  id: string,
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