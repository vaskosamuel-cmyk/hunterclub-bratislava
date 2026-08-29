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
      items.push(JSON.parse(content));
    } catch (err) {
      console.error(`Error reading ${file} from ${folderName}:`, err);
    }
  }

  if (sortFn) {
    items.sort(sortFn);
  }

  fs.writeFileSync(outputFile, JSON.stringify(items, null, 2));
  console.log(`Successfully merged ${folderName} JSON files into ${outputFileName}.`);
}

// 1. Merge Aktuality (sort by date descending - newest first)
mergeFolder('aktuality', 'aktuality.json', (a, b) => {
  // Aktuality dates are in format DD.MM.YYYY (from config.yml)
  const parseDate = (dateStr) => {
    if (!dateStr) return 0;
    const parts = dateStr.split('.');
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
    }
    return new Date(dateStr).getTime();
  };
  return parseDate(b.date) - parseDate(a.date);
});

// 2. Merge Psychotesty (sort by sort_date ascending - closest upcoming first)
mergeFolder('psychotesty', 'psychotesty.json', (a, b) => {
  const dateA = a.sort_date ? new Date(a.sort_date).getTime() : 0;
  const dateB = b.sort_date ? new Date(b.sort_date).getTime() : 0;
  return dateA - dateB;
});

// 3. Merge Teoria (sort by sort_date ascending - closest upcoming first)
mergeFolder('teoria', 'teoria.json', (a, b) => {
  const dateA = a.sort_date ? new Date(a.sort_date).getTime() : 0;
  const dateB = b.sort_date ? new Date(b.sort_date).getTime() : 0;
  return dateA - dateB;
});

