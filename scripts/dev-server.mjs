#!/usr/bin/env node
/**
 * Picks the first free port in [3000..3010] and runs `next dev` on it.
 * Prints the local URL so you never have to guess if 3000 is taken.
 */
import net from 'node:net';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.join(fileURLToPath(new URL('.', import.meta.url)), '..');

function portFree(port) {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.unref();
    srv.once('error', () => resolve(false));
    srv.listen(port, '127.0.0.1', () => {
      srv.close(() => resolve(true));
    });
  });
}

async function pickPort(start = 3000, end = 3010) {
  for (let p = start; p <= end; p++) {
    if (await portFree(p)) return p;
  }
  return null;
}

const port = await pickPort();
if (port == null) {
  console.error('No free port found between 3000 and 3010.');
  process.exit(1);
}

const url = `http://localhost:${port}`;
console.log('\n\x1b[1m\x1b[36m▸\x1b[0m  Local:   \x1b[1m' + url + '\x1b[0m');
console.log('   (first free port in 3000–3010)\n');

const child = spawn(
  process.execPath,
  [path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next'), 'dev', '-p', String(port)],
  {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env },
  },
);

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
