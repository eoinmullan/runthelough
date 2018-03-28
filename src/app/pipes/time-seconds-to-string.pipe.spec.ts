import { TimeSecondsToStringPipe } from './time-seconds-to-string.pipe';

describe('TimeSecondsToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeSecondsToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
