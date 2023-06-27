import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type ExchangeLatestResponse = {
  success: boolean
  timestamp: number
  base: string
  date: string
  rates: {
    [key: string]: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private apiUrl = 'http://api.exchangeratesapi.io/v1'
  private accessKey = '3be24af6774a076ea5e71f7c3af724ef'

  constructor(private http: HttpClient) {}

  getLatestEURPrice(): Observable<ExchangeLatestResponse> {
    return this.http.get<ExchangeLatestResponse>(`${this.apiUrl}/latest`, { params: {
      access_key: this.accessKey,
      symbols: 'MXN',
    }})
  }
}
