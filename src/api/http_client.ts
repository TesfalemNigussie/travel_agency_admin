import axios, { AxiosHeaders } from "axios";
import { ApiStatus, OperationalResult } from "./operational.result";
import { HttpAttribute } from "./http_attribute";

export default class HttpClient {
  async post(request: HttpAttribute): Promise<OperationalResult> {
    try {
      const response = await axios.post(
        `${request.baseUrl}${request.relativeUrl}`,
        request.body,
        {
          headers: request.header as AxiosHeaders,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        console.log(response.data);
      }
      return new OperationalResult({ apiStatus: ApiStatus.ERROR });
    } catch (ex) {
      console.log(ex);
      return new OperationalResult({ apiStatus: ApiStatus.ERROR });
    }
  }

  async get(request: HttpAttribute) {
    try {
      const response = await axios.get(
        `${request.baseUrl}${request.relativeUrl}`,
        request.header
      );

      if (response.status === 200) {
        return response.data;
      }
      return new OperationalResult({ apiStatus: ApiStatus.ERROR });
    } catch (ex) {
      return new OperationalResult({ apiStatus: ApiStatus.ERROR });
    }
  }
}

