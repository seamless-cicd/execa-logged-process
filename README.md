# Execa Logging Agent

## Using the logging agent
```
const LOG_RECEIVER_URL = 'https://abc123.m.pipedream.net';

const logger = new LogEmitter(LOG_RECEIVER_URL);
logger.emit('Hello world', { key1: 'value1', key2: 123 });
```

## Creating execa processes that emit logs for stdout and stderr
```
import {
  createLoggedProcess,
  handleProcessError,
} from './create-logged-process.js';
import type { ExecaError } from 'execa';

const LOG_RECEIVER_URL = 'https://abc123.m.pipedream.net';

// Create logged process
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
