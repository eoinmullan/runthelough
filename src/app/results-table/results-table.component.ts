import { Component, OnInit, Input } from '@angular/core';
import { Result } from '../result';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
  providers: [ResultsService]
})
export class ResultsTableComponent implements OnInit {

  @Input() results: Array<Result>;

  constructor(resultsService: ResultsService) {
    this.results = resultsService.getLatestResults()
  }

  ngOnInit() {
  }

}
