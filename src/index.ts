import type { EachCallback, EachError, EachOptions, EachResult } from './types.ts';
import worker from './worker.ts';

export * from './types.ts';

export default function eachPackage(command: string, args: string[]): Promise<EachResult[]>;
export default function eachPackage(command: string, args: string[], options: EachOptions): Promise<EachResult[]>;

export default function eachPackage(command: string, args: string[], callback: EachCallback): undefined;
export default function eachPackage(command: string, args: string[], options: EachOptions, callback: EachCallback): undefined;

export default function eachPackage(command: string, args: string[], options?: EachOptions | EachCallback, callback?: EachCallback): undefined | Promise<EachResult[]> {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};

  if (typeof callback === 'function') return worker(command, args, options, callback);
  return new Promise((resolve, reject) =>
    worker(command, args, options, (err?: EachError, results?: EachResult[]): undefined => {
      err ? reject(err) : resolve(results);
    })
  );
}
