import { ulid, decodeTime } from 'ulidx';
import axios from 'axios';

class LogEmitter {
  private logReceiverUrl: string;
  private logToConsole: boolean;

  constructor(logReceiverUrl: string, logToConsole = true) {
    this.logReceiverUrl = logReceiverUrl;
    this.logToConsole = logToConsole;
  }

  async emit(logText: string, otherData = {}): Promise<void> {
    const newUlid = ulid();
    const ulidTimestamp = decodeTime(newUlid);

    const logObj = {
      id: newUlid,
      message: logText,
      timestamp: new Date(ulidTimestamp).toISOString(),
      score: ulidTimestamp,
      ...otherData,
    };

    await axios.post(this.logReceiverUrl, logObj);

    if (this.logToConsole) {
      console.log(logText);
    }
  }
}

export { LogEmitter };
