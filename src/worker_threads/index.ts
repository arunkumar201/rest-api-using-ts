/* eslint-disable @typescript-eslint/no-explicit-any */
import {
 Worker,
 isMainThread,
} from "node:worker_threads"

if (isMainThread) {
  module.exports = function parseJSAsync(script:any) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: script,
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };
} else {
}
