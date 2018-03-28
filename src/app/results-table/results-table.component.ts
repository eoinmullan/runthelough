import { Component, OnInit, Input, ChangeDetectorRef, NgZone, ApplicationRef } from '@angular/core';
import { Result } from '../models/result';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
  providers: [ResultsService]
})
export class ResultsTableComponent implements OnInit {

  @Input() results: Array<Result>;

  private currentResultsVersion = 0;
  private currentNumberOfResults = 0;

  constructor(
  	private resultsService: ResultsService,
  	private changeDetectorRef: ChangeDetectorRef,
  	private zone: NgZone,
  	private applicationRef: ApplicationRef) { }

  ngOnInit() {
    this.resultsService
    	.getLatestResults(this.currentNumberOfResults, this.currentResultsVersion)
    	.subscribe(function(response) {
    		console.log(response.resultsList);
    		//this.zone.run(() =>
    		//	this.results = [{b:52,n:"Carmel Tumelty",c:"East Down AC",a:"F45",t:732},{b:358,n:"Nuala Garberry",c:"Galbally Runners",a:"FO",t:1836},{b:499,n:"Jaequi Maguire",c:"",a:"F45",t:463},{b:94,n:"Sean Gormley",c:"",a:"M60",t:565},{b:145,n:"Vincent McAleer",c:"Glenhull warriors",a:"M35",t:601},{b:499,n:"Jaequi Maguire",c:"",a:"F45",t:463}]
    		//)
    		this.results = [{b:52,n:"Carmel Tumelty",c:"East Down AC",a:"F45",t:732},{b:358,n:"Nuala Garberry",c:"Galbally Runners",a:"FO",t:1836},{b:499,n:"Jaequi Maguire",c:"",a:"F45",t:463},{b:94,n:"Sean Gormley",c:"",a:"M60",t:565},{b:145,n:"Vincent McAleer",c:"Glenhull warriors",a:"M35",t:601},{b:499,n:"Jaequi Maguire",c:"",a:"F45",t:463}]
    		this.applicationRef.tick();
    		this.changeDetectorRef.detectChanges();
    		this.changeDetectorRef.markForCheck();
    	})
  }

}
