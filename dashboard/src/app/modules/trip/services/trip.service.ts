import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { JsonRPCService } from '~/core/services/api/json-rpc.service';
import { ApiService } from '~/core/services/api/api.service';
import { Trip } from '~/core/entities/trip/trip';
import { JsonRPCParam } from '~/core/entities/api/jsonRPCParam';

@Injectable({
  providedIn: 'root',
})
export class TripService extends ApiService<Trip> {
  constructor(private _http: HttpClient, private _jsonRPC: JsonRPCService) {
    super(_http, _jsonRPC, 'trip');
  }

  public exportTrips(): Observable<any> {
    const jsonRPCParam = new JsonRPCParam(`${this._method}.export`);
    return this._jsonRPC.call(jsonRPCParam).pipe(
      tap((data) => {
        // TODO
      }),
      finalize(() => {
        // TODO
      }),
    );
  }
}