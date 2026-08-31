import fs from 'fs';

export function existsSync(test: string): boolean {
  try {
    (fs.accessSync || fs.statSync)(test);
    return true;
  } catch (_err) {
    return false;
  }
}
