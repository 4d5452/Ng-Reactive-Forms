import { InMemoryDbService } from 'angular-in-memory-web-api';
export class AppData implements InMemoryDbService {
  createDb() {
    let filterTypes = [
      {id: '765809160774'}
    ];
    let filters = [
      {id: '1001', type: filterTypes[0].id, created: Date.now(), modified: Date.now()}
    ];
    let records = [
      {id: '1', currentEquipmentMeter: '1000', created: Date.now(), modified: Date.now(), pre: 7, post: 4, cycles: 4, filter: filters[0].id},
      {id: '2', currentEquipmentMeter: '2000', created: Date.now(), modified: Date.now(), pre: 6, post: 4, cycles: 3, filter: filters[0].id},
      {id: '3', currentEquipmentMeter: '3000', created: Date.now(), modified: Date.now(), pre: 7, post: 5, cycles: 4, filter: filters[0].id}
    ];
    let equipment = [
      {id: "FL50-01", meter: 'miles', initialMeterPerGallon: 9, initialMeter: '170000'}
    ]
    let assignment = [
      {equipment: equipment[0].id, filter: filters[0].id, active: true}
    ]
    return {filterTypes, filters, records, equipment, assignment};
  }
}