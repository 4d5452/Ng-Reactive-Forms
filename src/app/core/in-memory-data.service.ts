import { InMemoryDbService } from 'angular-in-memory-web-api';
export class AppData implements InMemoryDbService {
  createDb() {
    let filterTypes = [
      {id: '765809166158'},
      {id: '765809259393'},
      {id: '765809166172'},
      {id: '765809149496'},
      {id: '765809159655'}
    ];
    let filters = [
      {id: '1001', type: filterTypes[0].id, created: Date.now(), modified: Date.now()},
      {id: '1002', type: filterTypes[0].id, created: Date.now(), modified: Date.now()},
      {id: '1003', type: filterTypes[3].id, created: Date.now(), modified: Date.now()},
      {id: '1005', type: filterTypes[2].id, created: Date.now(), modified: Date.now()},
      {id: '1006', type: filterTypes[4].id, created: Date.now(), modified: Date.now()},
      {id: '1007', type: filterTypes[2].id, created: Date.now(), modified: Date.now()},
      {id: '1008', type: filterTypes[1].id, created: Date.now(), modified: Date.now()},
      {id: '1009', type: filterTypes[2].id, created: Date.now(), modified: Date.now()},
      {id: '1010', type: filterTypes[1].id, created: Date.now(), modified: Date.now()},
      {id: '1011', type: filterTypes[3].id, created: Date.now(), modified: Date.now()},
      {id: '1012', type: filterTypes[1].id, created: Date.now(), modified: Date.now()},
      {id: '1013', type: filterTypes[4].id, created: Date.now(), modified: Date.now()},
      {id: '1014', type: filterTypes[0].id, created: Date.now(), modified: Date.now()},
      {id: '2001', type: filterTypes[0].id, created: Date.now(), modified: Date.now()},
      {id: '2002', type: filterTypes[0].id, created: Date.now(), modified: Date.now()},
      {id: '2003', type: filterTypes[3].id, created: Date.now(), modified: Date.now()},
      {id: '2005', type: filterTypes[2].id, created: Date.now(), modified: Date.now()},
      {id: '2006', type: filterTypes[4].id, created: Date.now(), modified: Date.now()},
      {id: '2007', type: filterTypes[2].id, created: Date.now(), modified: Date.now()},
      {id: '2008', type: filterTypes[1].id, created: Date.now(), modified: Date.now()},
      {id: '2009', type: filterTypes[2].id, created: Date.now(), modified: Date.now()},
      {id: '2010', type: filterTypes[1].id, created: Date.now(), modified: Date.now()},
      {id: '2011', type: filterTypes[3].id, created: Date.now(), modified: Date.now()},
      {id: '2012', type: filterTypes[1].id, created: Date.now(), modified: Date.now()},
      {id: '2013', type: filterTypes[4].id, created: Date.now(), modified: Date.now()},
      {id: '2014', type: filterTypes[0].id, created: Date.now(), modified: Date.now()}
    ];
    let cleaningRecords = [
      {id: 1, created: Date.now(), modified: Date.now(), pre: 7, post: 4, cycles: 6, filter: filters[3].id},
      {id: 2, created: Date.now(), modified: Date.now(), pre: 3, post: 3, cycles: 1, filter: filters[2].id},
      {id: 3, created: Date.now(), modified: Date.now(), pre: 5, post: 3, cycles: 10, filter: filters[5].id}
    ];
    return {filterTypes, filters, cleaningRecords};
  }
}