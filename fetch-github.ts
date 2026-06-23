import fs from 'fs';
import path from 'path';

async function fetchGitHubRepo(owner: string, repo: string, dirPath: string = '') {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${dirPath}`;
  console.log(`Fetching: ${url}`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'NodeJS',
      }
    });

    if (!res.ok) {
      console.error(`Error fetching ${dirPath}: ${res.statusText}`);
      const body = await res.text();
      console.error(body);
      return;
    }

    const items = await res.json() as any[];
    for (const item of items) {
      if (item.type === 'file') {
        console.log(`File: ${item.path}`);
      } else if (item.type === 'dir') {
        console.log(`Directory: ${item.path}`);
        await fetchGitHubRepo(owner, repo, item.path);
      }
    }
  } catch (err) {
    console.error(`Fetch error:`, err);
  }
}

fetchGitHubRepo('Jamalshah183', 'Black-wiz');
