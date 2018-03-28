import { Injectable } from '@angular/core';
import { Result } from '../models/result';

@Injectable()
export class ResultsService {

  constructor() { }

  getLatestResults(): Array<Result> {
    return [
    	{bib: "123", name: "Eoin", club: "Omagh", category: "M35", time: 360},
    	{bib: "234", name: "Aileen Johnson", club: "Derry City Track Club", category: "FO", time: 470},
    	{bib: "345", name: "Eabha", club: "Eskra", category: "FJ", time: 580}
    ]
  }

}
