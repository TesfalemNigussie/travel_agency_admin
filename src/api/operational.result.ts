export class OperationalResult {
  apiStatus?: ApiStatus;

  message?: string;

  errorCode?: string | string[];
  type?: string;

  emailAddress?: string;

  constructor(init?: Partial<OperationalResult>) {
    Object.assign(this, init);
  }
}

export enum ApiStatus {
  SUCCESS,
  ERROR,
}
