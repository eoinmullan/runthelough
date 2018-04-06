import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSecondsToString'
})
export class TimeSecondsToStringPipe implements PipeTransform {

  zeroPad(value: number): String {
    return ('00' + value).slice(-2);
  }

  transform(value: number, args?: any): string {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${this.zeroPad(minutes)}:${this.zeroPad(seconds)}`;
  }

}
