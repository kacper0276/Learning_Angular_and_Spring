import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BasketResponse, PostBasketBody } from '../models/basket.model';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ServerResponse } from '../models/server-response.model';

function extractResponse(
  response: HttpResponse<ServerResponse>,
): BasketResponse {
  if (!response.body)
    return { body: { timestamp: '', message: '' }, totalCount: 0 };

  const totalCount = Number(response.headers.get('X-Total-Count'));

  return { body: { ...response.body }, totalCount };
}

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  apiUrl = `${environment.apiUrl}/basket`;
  totalCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  addProductToBasket(body: PostBasketBody): Observable<BasketResponse> {
    return this.http
      .post<ServerResponse>(`${this.apiUrl}`, body, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map(extractResponse),
        tap(({ totalCount }) => {
          this.totalCount$.next(totalCount);
        }),
      );
  }
}
