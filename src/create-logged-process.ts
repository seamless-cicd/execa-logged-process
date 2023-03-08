import { execa, Options, ExecaError } from 'execa';
import { LogEmitter } from './log-emitter.js';

const defaultOptions: Options = {
  stdin: 'inherit',
  stdout: 'pipe',
  stderr: 'pipe',
};

// Create a child process whose stdout and stderr are logged to a remote receiver
async function createLoggedProcess(
  execaFile: string,
  execaArgs: string[] = [],
  userOptions: Options = defaultOptions,
  logReceiverUrl: string,
) {
  const logger = new LogEmitter(logReceiverUrl, true);

  const childProcess = execa(execaFile, execaArgs, {
    ...defaultOptions,
    ...userOptions,
  });

  const { stdout, stderr } = childProcess;

  stdout?.on('data', (data: Buffer) => {
    logger.emit(data.toString(), {});
  });

  stderr?.on('data', (data: Buffer) => {
    logger.emit(data.toString(), {});
  });

  return childProcess;
}

// Emits final error logs and shuts down the process
// Use in catch(error) block
async function handleProcessError(
  error: ExecaError,
  logReceiverUrl: string,
  logToConsole = true,
) {
  const logger = new LogEmitter(logReceiverUrl, true);

  await logger.emit(error.shortMessage, {});
  await logger.emit('Error occurred', {});

  if (logToConsole) {
    console.error(error);
  }

  process.exit(error.exitCode || 1);
}

export { createLoggedProcess, handleProcessError };
