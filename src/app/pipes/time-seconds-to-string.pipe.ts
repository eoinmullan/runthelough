import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSecondsToString'
})
export class TimeSecondsToStringPipe implements PipeTransform {

  zeroPad(value: number): String {
    return ('00'+value).slice(-2)
  }

  transform(value: number, args?: any): string {
    let minutes = Math.floor(value / 60);
    let seconds = Math.floor(value % 60);
    return `${this.zeroPad(minutes)}:${this.zeroPad(seconds)}`;
  }

}
