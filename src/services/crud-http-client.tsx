import axios, { AxiosResponse } from 'axios'
import { resolveURL } from '../utilities'
import { Body, Id, Query } from '../types'
import { mergeAll } from 'ramda'

export class CrudHTTPClient<T> {
  private baseURL: string = 'https://5ec452aa628c160016e70f78.mockapi.io'
  protected resourceURL: string
  protected URLResolver: (paths?: string[]) => string

  constructor(resourcePath: string) {
    this.resourceURL = resolveURL(this.baseURL, [resourcePath])
    this.URLResolver = resolveURL(this.resourceURL)
  }

  public getById = async (id: string): Promise<T> => {
    const url = this.URLResolver([id])
    const { data }: AxiosResponse<T> = await axios.get(url)

    return data
  }

  public getMany = async ({ filters, pagination, sort }: Query<T>): Promise<T[]> => {
    const params = mergeAll([filters || {}, pagination || {}, sort || {}])
    const { data }: AxiosResponse<T[]> = await axios.get(this.resourceURL, { params })

    return data
  }

  public create = async (payload: Body<T>): Promise<Id> => {
    const { data }: AxiosResponse<Id> = await axios.post(this.resourceURL, payload)

    return data
  }

  public updateById = async (id: string, payload: Partial<T>): Promise<void> => {
    const url = this.URLResolver([id])

    await axios.patch(url, payload)
  }

  public deleteById = async (id: string): Promise<void> => {
    const url = this.URLResolver([id])

    await axios.delete(url)
  }
}
