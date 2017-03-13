export interface Filter {
  id: string,
  type: string,
  created: number,
  modified: number,
}

export interface FilterType {
  upc: string
}

export interface CleaningRecord {
  id: number,
  filter: string,
  pre: number,
  post: number,
  cycles: number,
  created: Date,
  modified: Date
}

export enum MeterUnit {
  HOURS,
  MILES
}

export interface Equipment {
  id: string,
  meter: MeterUnit
}

export interface EquipmentAssignment {
  equipment: string,
  filter: string,
  active: boolean
}