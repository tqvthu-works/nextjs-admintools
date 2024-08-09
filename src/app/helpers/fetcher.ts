import { headers } from 'next/headers'

export class FetchHelper {
  public static async fetch(url: string, option: RequestInit): Promise<Response> {
    option.headers = headers()
    return fetch(url, option)
  }
}
