import { InMemoryDbService } from 'angular-in-memory-web-api';
export class ItemData implements InMemoryDbService {
  createDb() {
    let items = [
      {id: 1, type: 'Remote'},
      {id: 2, type: 'TV'},
      {id: 3, type: 'Controller'},
      {id: 4, type: 'Computer'},
      {id: 5, type: 'Mug'},
      {id: 6, type: 'Phone'},
      {id: 7, type: 'Tape Measure'},
      {id: 8, type: 'Keyboard'},
      {id: 9, type: 'Pocket Knife'},
      {id: 10, type: 'Game Console'}
    ];
    return {items};
  }
}