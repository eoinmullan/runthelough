import { Injectable } from '@angular/core';
import { ResultList } from '../models/result-list';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) { }

  getLatestResults(currentNumberOfResults: number, currentResultsVersion: number) {
    let params = new HttpParams();
    params = params.append('companiesReceived', currentNumberOfResults.toString());
    params = params.append('currentVersion', currentResultsVersion.toString());
    return this.http.get<ResultList>(
      environment.apiUrl + 'results', { params }
    )
  }

}
