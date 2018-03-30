import { Component, OnInit } from '@angular/core';
import { ResultDto } from '../models/result';
import { ResultsService } from '../services/results.service';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ResultList } from '../models/result-list';
import { ExpandedResult } from '../models/expanded-result';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
  providers: [ResultsService]
})
export class ResultsTableComponent implements OnInit {

	mapResultDtoToExpandedResult(resultDto: ResultDto, index: number): ExpandedResult {
		return {
			bib: resultDto.b,
			name: resultDto.n,
			position: index + 1,
			category: resultDto.a,
			club: resultDto.c,
			time: resultDto.t
		}
	}

	filterByGender(input: ResultDto): Boolean {
		if (this.genderFilterValue === "A") {
			return true;
		} else {
			return input.a.startsWith(this.genderFilterValue)
		}
	}

	filterByCategory(input: ResultDto): Boolean {
		if (this.categoryFilterValue === "A") {
			return true;
		} else {
			return input.a.endsWith(this.categoryFilterValue)
		}
	}

	pollingData: Subscription;
	inputResults: Array<ResultDto> = [];
	displayedResults: Array<ExpandedResult> = [];
	genderOptions =['All', 'Male', 'Female'];
	categoryOptions =['All', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', '19 & Under', 'Open', 'Vet 35', 'Vet 40', 'Vet 45', 'Vet 50', 'Vet 55', 'Vet 60', 'Vet 65' ];


  private currentResultsVersion = 0;
	private currentNumberOfResults = 0;
	private selectedGenderValue: string;
	private genderFilterValue: string;
	private selectedCategoryValue: string;
	private categoryFilterValue: string;

  constructor(private resultsService: ResultsService) {
		this.selectedGenderValue = "All";
		this.genderFilterValue = "A";
		this.selectedCategoryValue = "All";
		this.categoryFilterValue= "A";
	}

	onGenderSelect(val){
		if (val === "All") {
			this.genderFilterValue = "A";
		} else if (val === "Male") {
			this.genderFilterValue = "M";
		} else if (val === "Female") {
			this.genderFilterValue = "F";
		}
		this.updateDisplayedResults();
	}

	onCategorySelect(val: string){
		if (val === "All") {
			this.categoryFilterValue = "A";
		} else if (val.startsWith("Year")) {
			this.categoryFilterValue = val.substr(5)
		} else if (val === "Open") {
			this.categoryFilterValue = "O";
		} else if (val === "19 & Under") {
			this.categoryFilterValue = "U19";
		} else if (val.startsWith("Vet")) {
			this.categoryFilterValue = val.substr(4)
		}
		this.updateDisplayedResults();
	}

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
			this.inputResults = this.inputResults.concat(response.resultsList);
		} else {
			console.log("resetting results");
			this.inputResults = response.resultsList;
			this.currentResultsVersion = response.resultsVersion
		}
		this.currentNumberOfResults = this.inputResults.length;
		this.updateDisplayedResults();
	}

	private updateDisplayedResults() {
		this.displayedResults = this.inputResults
			.filter(x => this.filterByGender(x))
			.filter(x => this.filterByCategory(x))
			.sort((a, b) => a.t - b.t)
			.map((x, i) => this.mapResultDtoToExpandedResult(x, i));
	}
}
