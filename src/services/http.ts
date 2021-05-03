import axios, { AxiosInstance } from "axios"

interface Config {
  baseURL: string,
  timeout: number,
  headers: Record<string, string>
}

export class HTTPClient {
  private static client: AxiosInstance

  static create = (config: Config) => {
    if(!HTTPClient.client) {
      HTTPClient.client = axios.create(config)
    }

    return HTTPClient.client
  }
}