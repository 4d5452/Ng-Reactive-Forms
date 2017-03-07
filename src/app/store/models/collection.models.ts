export interface Filter {
  id: string,
  type: FilterType,
  created: Date,
  modified: Date,
}

export interface FilterType {
  upc: string
}