import { Component, OnInit } from '@angular/core';
import { Result } from '../models/result';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
  providers: [ResultsService]
})
export class ResultsTableComponent implements OnInit {

  results: Array<Result>;

  private currentResultsVersion = 0;
  private currentNumberOfResults = 0;

  constructor(private resultsService: ResultsService) { }

  ngOnInit() {
    this.resultsService
    	.getLatestResults(this.currentNumberOfResults, this.currentResultsVersion)
    	.subscribe(response => {
    		this.results = response.resultsList;
    	})
  }

}
