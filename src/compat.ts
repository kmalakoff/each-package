import fs from 'fs';
import Module from 'module';
import os from 'os';

const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;

export function existsSync(test: string): boolean {
  try {
    (fs.accessSync || fs.statSync)(test);
    return true;
  } catch (_err) {
    return false;
  }
}

// os.homedir() is missing before Node 2.3; the polyfill is only loaded there
export function homedir(): string {
  return typeof os.homedir === 'function' ? os.homedir() : _require('homedir-polyfill')();
}
