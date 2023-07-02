import axios, { AxiosError, ResponseType } from 'axios';
import { stringify } from 'qs';
import { toast } from 'react-toastify';

import { IAxiosConfig, IHttpMethod } from '../../interfaces';
import {
    API_BASE,
    OFFLINE_ERROR_CODE,
    LOCAL_STORAGE_TOKEN_KEY
} from '../../constants';

const getParamsString = (params: Record<string, string | number>) => {
    const encodedParams = stringify(params, { encodeValuesOnly: true, skipNulls: true });
    return encodedParams ? `?${encodedParams}` : '';
  };

const HttpMethods: IHttpMethod[] = ['get', 'post', 'put', 'patch', 'delete'];

interface IRequestOptions {
    isAuth?: boolean;
    contentType?: string;
    responseType?: ResponseType;
}

export interface IRequests {
    [key: string]: (
      resource: string,
      data?: object,
      requestOptions?: IRequestOptions,
      urlParams?: Record<string, string | number> | string
    ) => Promise<unknown>;
}

const defaultReqOpts: IRequestOptions = { isAuth: true };

const isOffline = (err: AxiosError) => !err.response;
const is400 = (err: AxiosError) => err.response?.status === 400 || err.response?.status === 406;
const is401 = (err: AxiosError) => err.response?.status === 401;
const is403 = (err: AxiosError) => err.response?.status === 403;
const is429 = (err: AxiosError) => err.response?.status === 429;
const is50X = (err: AxiosError) => (err.response?.status ?? 0) >= 500;

const handleNetworkError = (err: AxiosError) => {
  if (isOffline(err)) {
    // NOTE: CORS issues are also detected as network error and there is no way to distinguish between them
    toast.error('Offline');
    throw {
      status: OFFLINE_ERROR_CODE,
      data: err.message,
    };
  } else if (is401(err)) {
    sessionStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    const message = err.config?.url?.includes('login')
      ? 'Wrong username or password'
      : 'Your login expired, please re-login';
    toast.error(message);
  } else if (is400(err)) {
    toast.error('Error 400');
  } else if (is403(err)) {
    toast.error(403);
  } else if (is429(err)) {
    toast.error(429);
  } else if (is50X(err)) {
    console.error(err);
    toast.error('! Server Error 500 !');
  }
  throw err.response;
};

const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

const getHeaders = (requestOptions?: IRequestOptions): Record<string, string> => {
    const reqOpts = { ...defaultReqOpts, ...requestOptions };
    const headers = { ...defaultHeaders };
    /*
    if (reqOpts.isAuth) {
      const token = sessionStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      if (!token) {
        // throw {
        console.error('Trying to send authorised request without a token');
        // };
      }
      headers[AUTH_HEADER_NAME] = token;
      headers[ADMIN_HEADER_NAME] = window['adminBracelet'];
    }
    */
    if (reqOpts.contentType) {
      headers['Content-Type'] = reqOpts.contentType;
    }
    return headers;
  };
  
  const getUrl = (resource: string, params?: Record<string, string | number> | string): string => {
    let paramsString = params || '';
    if (typeof params === 'object') {
      paramsString = getParamsString(params);
    }
    return API_BASE + resource + paramsString;
  };
  
const apiRequestPromise = (config: IAxiosConfig) =>
  axios(config)
    .then(({ data }) => data)
    .catch(handleNetworkError);

const getRequestConfig = (
    method: IHttpMethod,
    resource: string,
    data?: object,
    requestOptions?: IRequestOptions,
    urlParams?: string | Record<string, string | number>
  ): IAxiosConfig => ({
    method,
    url: getUrl(resource, urlParams),
    headers: getHeaders(requestOptions),
    responseType: requestOptions?.responseType,
    data,
  });

const createRequestPromise =
  (method: IHttpMethod) => 
    (resource: string, data?: object, requestOptions?: IRequestOptions, urlParams?: string | Record<string, string | number>) =>
      apiRequestPromise(getRequestConfig(method, resource, data, requestOptions, urlParams));

export const http: IRequests = HttpMethods.reduce(
    (result, method) => ({
      ...result,
      [method]: createRequestPromise(method),
    }),
    Object.create(null)
  );
