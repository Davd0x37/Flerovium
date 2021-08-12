import axios from 'axios';
import qs from 'qs';
import { debug } from 'debug';

export class RequestService {
  private token!: string;

  private url!: string;

  // private headers!: Record<string, unknown>;

  public constructor(url?: string) {
    if (url) this.url = url;
  }

  public getUrl(): string {
    return this.url;
  }

  public setUrl(url: string): void {
    this.url = url;
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(type: string, value: string): void {
    this.token = `${type} ${value}`;
  }

  // public setHeaders(headers: Record<string, unknown>): void {
  //   this.headers = headers;
  // }

  // public getHeaders(): Record<string, unknown> {
  //   return this.headers;
  // }

  public isTokenSet(): boolean {
    return this.token !== undefined;
  }

  // public isHeadersSet(): boolean {
  //   return this.headers !== undefined;
  // }

  public addPath(path: string): this {
    if (path.substr(0, 1) === '/') {
      this.url += path;
    } else {
      this.url += `/${path}`;
    }

    return this;
  }

  public addQuery([key, val]: [string, string]): this {
    if (this.url.indexOf('?') !== -1) {
      this.url += `&${key}=${val}`;
    } else {
      this.url += `?${key}=${val}`;
    }

    return this;
  }

  // eslint-disable-next-line class-methods-use-this
  private error(message: string): void {
    debug('[ApiService]')(`${message}`);
  }

  public async get<T>(): Promise<T> {
    try {
      const headers = {
        ...(this.isTokenSet() ? { Authorization: this.getToken() } : {}),
      };

      const req = await axios.get<T>(this.getUrl(), {
        headers,
        responseType: 'json',
      });

      return req.data;
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      this.error(`Error during sending get request: ${err}`);

      throw new Error(err);
    }
  }

  public async post<T>(parameters: Record<string, unknown>): Promise<T> {
    try {
      const body = qs.stringify(parameters);
      const req = await axios.post<T>(this.getUrl(), body);

      return req.data;
    } catch (err) {
      throw new Error(err);
    }
  }
}
