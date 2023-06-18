import path from 'path';

export const buildDir = (relativePath: string, actualPath: string) =>
  path.join(relativePath, actualPath);
