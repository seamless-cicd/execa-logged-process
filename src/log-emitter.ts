import { ulid, decodeTime } from 'ulidx';
import axios from 'axios';

type OtherData<T> = Record<string, T>;

export class LogEmitter<T> {
  private logReceiverUrl: string;
  private logToConsole: boolean;

  constructor(logReceiverUrl: string, logToConsole = true) {
    this.logReceiverUrl = logReceiverUrl;
    this.logToConsole = logToConsole;
  }

  async emit(logText: string, otherData: OtherData<T>): Promise<void> {
    const newUlid = ulid();
    const ulidTimestamp = decodeTime(newUlid);

    const logObj = {
      id: newUlid,
      ulidTimestamp,
      log: logText,
      timestamp: new Date(ulidTimestamp).toISOString(),
      ...otherData,
    };

    await axios.post(this.logReceiverUrl, logObj);

    if (this.logToConsole) {
      console.log(logText);
    }
  }
}
