import fs from 'fs';
import path from 'path';

const filesToDownload = [
  'app/admin/login/page.tsx',
  'app/admin/page.tsx',
  'app/portal/login/page.tsx',
  'app/portal/page.tsx',
  'hooks/useAuth.tsx',
  'lib/firebase.ts',
  'firebase-blueprint.json',
  'firestore.rules'
];

async function downloadFile(owner: string, repo: string, filePath: string) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/main/${filePath}`;
  console.log(`Downloading: ${url}`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'NodeJS',
      }
    });

    if (!res.ok) {
      console.error(`Status ${res.status} for ${filePath}: ${res.statusText}`);
      return;
    }

    const content = await res.text();
    // Use relative path for workspace visibility
    const destPath = path.join('./tmp-black-wiz', filePath);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, content, 'utf8');
    console.log(`Saved: ${destPath}`);
  } catch (err) {
    console.error(`Download error for ${filePath}:`, err);
  }
}

async function run() {
  fs.mkdirSync('./tmp-black-wiz', { recursive: true });
  for (const file of filesToDownload) {
    await downloadFile('Jamalshah183', 'Black-wiz', file);
  }
}

run();
