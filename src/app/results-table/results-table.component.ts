import { Component, OnInit } from '@angular/core';
import { Result } from '../models/result';
import { ResultsService } from '../services/results.service';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ResultList } from '../models/result-list';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
  providers: [ResultsService]
})
export class ResultsTableComponent implements OnInit {

	pollingData: Subscription;
  results: Array<Result> = [];

  private currentResultsVersion = 0;
  private currentNumberOfResults = 0;

  constructor(private resultsService: ResultsService) { }

  ngOnInit() {
		this.pollingData = Observable.interval(5000).startWith(0)
		.switchMap(() => this.resultsService.getLatestResults(this.currentNumberOfResults, this.currentResultsVersion))
    	.subscribe(response => {
    		this.updateResults(response);
    	})
  }

	private updateResults(response: ResultList) {
		if (response.resultsVersion == this.currentResultsVersion) {
			console.log("concatenating results");
			this.results = this.results.concat(response.resultsList);
		} else {
			console.log("resetting results")
			this.results = response.resultsList;
			this.currentResultsVersion = response.resultsVersion
		}
		this.currentNumberOfResults = this.results.length;
		this.results = this.results.sort((a, b) => a.t - b.t);
	}
}
