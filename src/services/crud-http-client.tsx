import axios, { AxiosResponse } from 'axios'
import { resolveURL } from '../utilities'
import { Body, Id, Query } from '../types'
import * as R from 'ramda'

export class CrudHTTPClient<T> {
  private baseURL: string = 'https://5ec452aa628c160016e70f78.mockapi.io/'
  protected resourceURL: string
  protected URLResolver: (paths?: string[]) => string

  constructor(resourcePath: string) {
    this.resourceURL = resolveURL(this.baseURL, [resourcePath])
    this.URLResolver = resolveURL(this.resourceURL)
  }

  public async getById(id: string): Promise<T> {
    const url = this.URLResolver([id])
    const { data }: AxiosResponse<T> = await axios.get(url)

    return data
  }

  public async getMany({ filters, pagination, sort }: Query<T>): Promise<T[]> {
    const params = R.mergeAll([filters || {}, pagination || {}, sort || {}])
    const { data }: AxiosResponse<T[]> = await axios.get(this.resourceURL, { params })

    return data
  }

  public async create(payload: Body<T>): Promise<Id> {
    const { data }: AxiosResponse<Id> = await axios.patch(this.resourceURL, payload)

    return data
  }

  public async updateById(id: string, payload: Partial<T>): Promise<void> {
    const url = this.URLResolver([id])

    await axios.patch(url, payload)
  }

  public async deleteById(id: string): Promise<void> {
    const url = this.URLResolver([id])

    await axios.delete(url)
  }
}
