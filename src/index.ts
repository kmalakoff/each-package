import type { EachCallback, EachError, EachOptions, EachResult } from './types.ts';
import worker from './worker.ts';

export * from './types.ts';

export default function eachPackage(command: string, args: string[]): Promise<EachResult[]>;
export default function eachPackage(command: string, args: string[], options: EachOptions): Promise<EachResult[]>;

export default function eachPackage(command: string, args: string[], callback: EachCallback): void;
export default function eachPackage(command: string, args: string[], options: EachOptions, callback: EachCallback): void;

export default function eachPackage(command: string, args: string[], options?: EachOptions | EachCallback, callback?: EachCallback): void | Promise<EachResult[]> {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};

  if (typeof callback === 'function') return worker(command, args, options, callback);
  return new Promise((resolve, reject) =>
    worker(command, args, options as EachOptions, (err?: EachError, results?: EachResult[]): void => {
      err ? reject(err) : resolve(results);
    })
  );
}
