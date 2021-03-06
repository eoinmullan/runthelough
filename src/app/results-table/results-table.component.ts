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

    pollingData: Subscription;
    inputResults: Array<ResultDto> = [];
    displayedResults: Array<ExpandedResult> = [];
    genderOptions = ['All', 'Male', 'Female'];
    categoryOptions = [
        'All', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12',
         '19 & Under', 'Open', 'Vet 35', 'Vet 40', 'Vet 45', 'Vet 50', 'Vet 55', 'Vet 60', 'Vet 65' ];

    private currentResultsVersion = 0;
    private currentNumberOfResults = 0;
    selectedGenderValue: string;
    private genderFilterValue: string;
    selectedCategoryValue: string;
    private categoryFilterValue: string;
    positionTableHeading: string;
    resultsIn: Boolean;

    updatePositionTableHeading(): any {
        if (this.genderFilterValue === 'A' && this.categoryFilterValue === 'A') {
            this.positionTableHeading = 'Position';
        } else if (this.genderFilterValue === 'A') {
            this.positionTableHeading = 'Age Pos.';
        } else if (this.categoryFilterValue === 'A') {
            this.positionTableHeading = 'Gender Pos.';
        } else {
            this.positionTableHeading = 'Cat. Pos.';
        }
    }

    mapResultDtoToExpandedResult(resultDto: ResultDto, index: number): ExpandedResult {
        return {
            bib: resultDto.b,
            name: resultDto.n,
            position: index + 1,
            category: resultDto.a,
            club: resultDto.c,
            time: resultDto.t
        };
    }

    filterByGender(input: ResultDto): Boolean {
        let retVal;
        if (this.genderFilterValue === 'A') {
            retVal = true;
        } else {
            retVal = input.a.startsWith(this.genderFilterValue);
        }
        this.updatePositionTableHeading();
        return retVal;
    }

    filterByCategory(input: ResultDto): Boolean {
        let retVal;
        if (this.categoryFilterValue === 'A') {
            retVal = true;
        } else {
            retVal = input.a.endsWith(this.categoryFilterValue);
        }
        this.updatePositionTableHeading();
        return retVal;
    }

  constructor(private resultsService: ResultsService) {
        this.selectedGenderValue = 'All';
        this.genderFilterValue = 'A';
        this.selectedCategoryValue = 'All';
        this.categoryFilterValue = 'A';
        this.positionTableHeading = 'Position';
        this.resultsIn = false;
    }

    onGenderSelect(val) {
        if (val === 'All') {
            this.genderFilterValue = 'A';
        } else if (val === 'Male') {
            this.genderFilterValue = 'M';
        } else if (val === 'Female') {
            this.genderFilterValue = 'F';
        }
        this.updateDisplayedResults();
    }

    onCategorySelect(val: string) {
        if (val === 'All') {
            this.categoryFilterValue = 'A';
        } else if (val.startsWith('Year')) {
            this.categoryFilterValue = 'Y' + val.substr(5);
        } else if (val === 'Open') {
            this.categoryFilterValue = 'O';
        } else if (val === '19 & Under') {
            this.categoryFilterValue = '19';
        } else if (val.startsWith('Vet')) {
            this.categoryFilterValue = val.substr(4);
        }
        this.updateDisplayedResults();
    }

  ngOnInit() {
            this.updateResults();
  }

    private updateResults() {
        this.inputResults = this.resultsService.getLatestResults(0, 0);
        this.updateDisplayedResults();
    }

    private updateDisplayedResults() {
        this.displayedResults = this.inputResults
            .filter(x => this.filterByGender(x))
            .filter(x => this.filterByCategory(x))
            .sort((a, b) => a.t - b.t)
            .map((x, i) => this.mapResultDtoToExpandedResult(x, i));
        this.resultsIn = this.displayedResults.length !== 0;
    }
}
