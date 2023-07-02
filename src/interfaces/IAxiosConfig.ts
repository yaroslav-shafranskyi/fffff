import { ResponseType } from 'axios';

export type IHttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface IAxiosConfig {
    method: IHttpMethod;
    url: string;
    headers: Record<string, string>;
    responseType?: ResponseType;
    data?: object | string;
  }
