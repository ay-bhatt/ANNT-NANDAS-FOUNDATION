// Test script: start dev server, fetch API, print result
const { spawn } = require('child_process');
const http = require('http');

console.log('Starting Next.js dev server on port 3000...');

const child = spawn('npx', ['next', 'dev', '-p', '3000'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: process.platform === 'win32',
});

let serverReady = false;
let timeoutId;

function checkServer() {
  const req = http.get('http://localhost:3000/api/data', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      console.log('=== API Route Response ===');
      console.log('Status:', res.statusCode);
      console.log('Headers:', JSON.stringify(res.headers));
      try {
        const json = JSON.parse(data);
        console.log('Keys:', Object.keys(json).slice(0, 15).join(', '));
        console.log('SUCCESS: API returned', Object.keys(json).length, 'top-level keys');
      } catch(e) {
        console.log('Body (parse failed):', data.slice(0, 500));
      }
      cleanup();
    });
  });
  req.on('error', (e) => {
    if (!serverReady) {
      console.log('Server not ready yet, retrying...');
      timeoutId = setTimeout(checkServer, 1000);
    }
  });
}

function cleanup() {
  child.kill();
  clearTimeout(timeoutId);
  process.exit(0);
}

child.stdout.on('data', (data) => {
  const str = data.toString();
  if (str.includes('Ready')) {
    console.log('Dev server ready!');
    serverReady = true;
    setTimeout(checkServer, 1000);
  }
  // Print any error lines
  if (str.includes('Error') || str.includes('error') || str.includes('✓') || str.includes('✗')) {
    console.log('[dev]', str.trim());
  }
});

child.stderr.on('data', (data) => {
  const str = data.toString();
  if (str.includes('Error') || str.includes('error') || str.includes('✗')) {
    console.log('[dev-err]', str.trim());
  }
});

// Safety timeout
setTimeout(() => {
  console.log('Timeout - killing server');
  cleanup();
}, 30000);
