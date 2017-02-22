import { Response } from '@angular/http';

/** Get all objects from collection */
export interface GetAll { 
  collection: string;
}

/** Get object with id */
export interface Get {
  collection: string;
  id: number;
}; // end interface: Get

/** Update object with id on collection */
export interface Put {
  collection: string;
  id: number;
  body: Object;
}; // end interface: Put

/** Create object on collection */
export interface Post {
  collection: string;
  body: Object;
}; // end interface: Post

/** Remove object with id on collection */
export interface Delete {
  collection: string;
  id: number;
}; // end interface: Delete

export interface SuccessResponse {
  request: GetAll | Get | Put | Post | Delete;
  response: Response;
  action: string;
}

export interface FailureResponse {
  error: Error;
  action: string;
}

