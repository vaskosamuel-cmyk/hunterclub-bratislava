import fs from 'fs';
import path from 'path';

// --- Helper to merge a folder of JSON files ---
function mergeFolder(folderName, outputFileName, sortFn) {
  const dir = path.join(process.cwd(), 'public', 'content', folderName);
  const outputFile = path.join(process.cwd(), 'public', 'content', outputFileName);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== outputFileName);
  const items = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(dir, file), 'utf-8');
      const parsed = JSON.parse(content);
      parsed._filename = file; // Inject filename for sorting if needed
      items.push(parsed);
    } catch (err) {
      console.error(`Error reading ${file} from ${folderName}:`, err);
    }
  }

  if (sortFn) {
    items.sort(sortFn);
  }

  // Remove _filename before writing
  const cleanItems = items.map(item => {
    const { _filename, ...rest } = item;
    return rest;
  });

  fs.writeFileSync(outputFile, JSON.stringify(cleanItems, null, 2));
  console.log(`Successfully merged ${folderName} JSON files into ${outputFileName}.`);
}

function parseDate(dateStr) {
  if (!dateStr) return 0;
  // Check if DD.MM.YYYY
  const parts = dateStr.split('.');
  if (parts.length === 3) {
    // parts[0] = DD, parts[1] = MM, parts[2] = YYYY
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00Z`).getTime();
  }
  // Fallback to standard parsing
  const fallback = new Date(dateStr).getTime();
  return isNaN(fallback) ? 0 : fallback;
}


// 2. Merge Psychotesty (sort by sort_date ascending - closest upcoming first)
mergeFolder('psychotesty', 'psychotesty.json', (a, b) => {
  return parseDate(a.sort_date) - parseDate(b.sort_date);
});

// 3. Merge Teoria (sort by sort_date ascending - closest upcoming first)
mergeFolder('teoria', 'teoria.json', (a, b) => {
  return parseDate(a.sort_date) - parseDate(b.sort_date);
});

// 4. Merge Aktuality
mergeFolder('aktuality', 'aktuality.json', (a, b) => {
  // Sort by filename (which will have date) descending, so newest first
  return b._filename.localeCompare(a._filename);
});
