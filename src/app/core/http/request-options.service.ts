import { Injectable } from '@angular/core';
import { RequestOptions, RequestMethod, Headers } from '@angular/http';

@Injectable()
export class RequestOptionsService {
  options: RequestOptions[] = [];
  url: string = '';
  headers: Headers = new Headers({'Content-Type': 'application/json'})

  constructor() {
    this.options[RequestMethod.Get] = this._get();
    this.options[RequestMethod.Post] = this._post();
    this.options[RequestMethod.Put] = this._put();
    this.options[RequestMethod.Delete] = this._delete();
  }

  method(requestMethod: RequestMethod): RequestOptions {
    switch(requestMethod){
      case RequestMethod.Get:
      case RequestMethod.Post:
      case RequestMethod.Put:
      case RequestMethod.Delete:
        return this.options[requestMethod];
      default:
        throw new Error('Unsupported Operation');
    }
  }

  _get(): RequestOptions {
    return new RequestOptions({
      method: RequestMethod.Get,
      headers: this.headers,
      url: this.url
    });
  }

  _post(): RequestOptions {
    return new RequestOptions({
      method: RequestMethod.Post,
      headers: this.headers,
      url: this.url
    });
  }

  _put(): RequestOptions {
    return new RequestOptions({
      method: RequestMethod.Put,
      headers: this.headers,
      url: this.url
    });
  }

  _delete(): RequestOptions {
    return new RequestOptions({
      method: RequestMethod.Delete,
      headers: this.headers,
      url: this.url
    });
  }
}