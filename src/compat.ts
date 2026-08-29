import fs from 'fs';

// fs.accessSync is missing before Node 4.0, so fall back to fs.statSync
export function existsSync(test: string): boolean {
  try {
    (fs.accessSync || fs.statSync)(test);
    return true;
  } catch (_err) {
    return false;
  }
}
