import * as HTTP from './http.models';
import { type } from '../../shared/util';

export interface MetaObject {
  header: string;
  selector: string[];
  type: string;
}

export const Type = {
  DATE: type('[Data Models] Date'),
  STRING: type('[Data Models] String'),
  NUMBER: type('[Data Models] Number')
}

/** Get all objects from collection */
export interface GetAllMap { 
  request: HTTP.GetAll;
  data: Object;
}

/** Get object with id */
export interface GetMap {
  request: HTTP.Get;
  data: Object;
}; // end interface: Get

/** Update object with id on collection */
export interface PutMap {
  request: HTTP.Put;
  data: Object;
}; // end interface: Put

/** Create object on collection */
export interface PostMap {
  request: HTTP.Post;
  data: Object;
}; // end interface: Post

/** Remove object with id on collection */
export interface DeleteMap {
  request: HTTP.Delete;
  data: Object;
}; // end interface: Delete


