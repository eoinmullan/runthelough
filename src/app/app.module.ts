import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResultsTableComponent } from './results-table/results-table.component';
import { TimeSecondsToStringPipe } from './pipes/time-seconds-to-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ResultsTableComponent,
    TimeSecondsToStringPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
