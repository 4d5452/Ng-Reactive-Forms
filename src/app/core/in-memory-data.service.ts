import { InMemoryDbService } from 'angular-in-memory-web-api';
export class AppData implements InMemoryDbService {
  createDb() {
    let filterTypes = [
      {id: '765809160774'}
    ];
    let filters = [
      {id: '1001', type: filterTypes[0].id, created: Date.now(), modified: Date.now()}
    ];
    let cleaningRecords = [
      {id: 1, created: Date.now(), modified: Date.now(), pre: 7, post: 4, cycles: 6, filter: filters[0].id}
    ];
    let equipment = [
      {id: "FL50-01", meter: 'miles', initialMeterPerGallon: 9, initialMeter: '170000'}
    ]
    let assignment = [
      {equipment: equipment[0].id, filter: filters[0].id, active: true}
    ]
    return {filterTypes, filters, cleaningRecords, equipment, assignment};
  }
}