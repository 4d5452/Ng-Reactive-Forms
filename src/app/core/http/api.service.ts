import { Injectable } from '@angular/core';
import { Headers, Response, Http, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { RequestOptionsService } from './request-options.service';

@Injectable()
export class ApiService {
  private API_ROOT = 'api'; // URL to web api
  
  constructor(private http: Http, private requestOptions: RequestOptionsService) { }
  /**getAll: returns all items from server db collection */
  getAll(collection: string): Observable<Response> {
    return this.http.get(`${this.API_ROOT}/${collection}`, this.requestOptions.method(RequestMethod.Get))
      .map((response: Response) => response);
  }
  /**get: returns single item from server db collection */
  get(collection: string, id: string): Observable<Response> {
    return this.http.get(`${this.API_ROOT}/${collection}/${id}`, this.requestOptions.method(RequestMethod.Get))
      .map((response: Response) => response);
  }
  /**add: add single item to server db collection */
  add(collection: string, body: Object): Observable<Response> {
    return this.http.post(`${this.API_ROOT}/${collection}`, JSON.stringify(body), this.requestOptions.method(RequestMethod.Post))
      .map((response: Response) => response);
  }
  /**remove: removes item from server db  collection */
  remove(collection: string, id: string): Observable<Response> {
    return this.http.delete(`${this.API_ROOT}/${collection}/${id}`, this.requestOptions.method(RequestMethod.Delete))
      .map((response: Response) => response);
  }
  /**update: creates or updates item on server db collection */
  update(collection: string, id: string ,body: Object): Observable<Response> {
    return this.http.put(`${this.API_ROOT}/${collection}/${id}`, JSON.stringify(body), this.requestOptions.method(RequestMethod.Put))
      .map((response: Response) => response);
  }
}

/**
 *   searchItems(collection: string, queryType: string): Observable<Object> {
    return this.http.get(`${this.API_ROOT}/${collection}?q=${queryType}`)
      .map((response: Response) => response.json());
  }
 */