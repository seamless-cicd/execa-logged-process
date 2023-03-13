# Execa Logged Processes

This package provides:

1. A `LogEmitter` class which makes a POST request containing a timestamped log, to a log receiver URL of your choice.
2. A `createLoggedProcess` which wraps `execa`. It uses the log emitter to POST all `stdout` and `stderr` to the log receiver. It returns a child process for you to work with.

## Using the log emitter
```
import { LogEmitter } from 'execa-logged-process';

const LOG_RECEIVER_URL = 'https://abc123.m.pipedream.net';

const logger = new LogEmitter(LOG_RECEIVER_URL);
logger.emit('Hello world', { key1: 'value1', key2: 123 });
```

## Creating logged execa child processes
```
import {
  createLoggedProcess,
  handleProcessError,
} from './create-logged-process.js';
import type { ExecaError } from 'execa';

const LOG_RECEIVER_URL = 'https://abc123.m.pipedream.net';

(async function () {
  try {
    const loggedProcess = await createLoggedProcess(
      'ls',
      ['-la'],
      {},
      LOG_RECEIVER_URL,
    );
    await loggedProcess;
  } catch (error) {
    handleProcessError(error as ExecaError, LOG_RECEIVER_URL);
  }
})();
```
