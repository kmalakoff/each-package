declare module 'remove-bom-buffer' {
  function removeBOM(buf: Buffer | string): string;
  export = removeBOM;
}
