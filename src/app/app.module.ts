import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RestangularModule } from 'ng2-restangular';
import { ResultsTableComponent } from './results-table/results-table.component';
import { TimeSecondsToStringPipe } from './pipes/time-seconds-to-string.pipe';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ResultsTableComponent,
    TimeSecondsToStringPipe
  ],
  imports: [
    BrowserModule,
    RestangularModule.forRoot((RestangularProvider) => {
        RestangularProvider.setBaseUrl(environment.apiUrl);
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
