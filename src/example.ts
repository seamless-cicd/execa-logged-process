import { LogEmitter } from './log-emitter.js';
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

// Emit log
const logger = new LogEmitter(LOG_RECEIVER_URL);
logger.emit('Hello world', { key1: 'value1', key2: 123 });
