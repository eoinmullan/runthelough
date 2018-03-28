import { Injectable } from '@angular/core';
import { ResultList } from '../models/result-list';
import { Restangular } from 'ng2-restangular';

@Injectable()
export class ResultsService {

  constructor(private restangular: Restangular) { }

  getLatestResults(currentNumberOfResults: number, currentResultsVersion: number) {
    return this.restangular
    	.one('results')
    	.customGET("", {currentNumberOfResults: currentNumberOfResults, currentVersion: currentResultsVersion});
  }

}
