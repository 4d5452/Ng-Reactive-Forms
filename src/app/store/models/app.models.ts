export interface Filter {
  id: string,
  type: string,
  created: number,
  modified: number,
}

export interface FilterType {
  id: string
}

export interface CleaningRecord {
  id: string,
  filter: string,
  currentEquipmentMeter: string,
  pre: number,
  post: number,
  cycles: number,
  created: Date,
  modified: Date
}

export interface MeterUnit {
  hours: 'hours',
  miles: 'miles'
}

export interface Equipment {
  id: string,
  meter: string, //MeterUnit
  initalMeterPerGallon: number, //e.g. 9mpg or 30hours/gallon
  initialMeter: string // initial equipment reading: 12000miles or 300hours
}

export interface EquipmentAssignment {
  id: string,
  equipment: string,
  filter: string,
  active: boolean
}