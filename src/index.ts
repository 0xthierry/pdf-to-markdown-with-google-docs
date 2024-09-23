import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import fs from "node:fs";

function formatTime(ms: number): string {
  if (ms < 1000) return `${ms.toFixed(2)}ms`;
  const seconds = ms / 1000;
  return `${seconds.toFixed(2)}s`;
}

async function main() {
  const startTime = performance.now();

  const authClient = new GoogleAuth({
    keyFile: "keys.json",
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const service = google.drive({ version: "v3", auth: authClient });

  // Upload and convert PDF to Google Doc
  const fileMetadata = {
    name: 'Sample Invoice',
    mimeType: 'application/vnd.google-apps.document',
  };
  const media = {
    mimeType: 'application/pdf',
    body: fs.createReadStream('sample-invoice.pdf'),
  };

  console.log('Uploading and converting PDF to Google Doc...');
  const uploadStartTime = performance.now();
  const file = await service.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id',
  });
  const uploadEndTime = performance.now();

  console.log('File uploaded. ID:', file.data.id);
  console.log(`Upload time: ${formatTime(uploadEndTime - uploadStartTime)}`);

  // Export Google Doc to Markdown
  console.log('Exporting to Markdown...');
  const exportStartTime = performance.now();
  const exportResponse = await service.files.export({
    fileId: file.data.id as string,
    mimeType: 'text/markdown',
  }, { responseType: 'stream' });

  // Save the Markdown file
  const writer = fs.createWriteStream('sample-invoice.md');
  exportResponse.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
  const exportEndTime = performance.now();

  console.log(`Export time: ${formatTime(exportEndTime - exportStartTime)}`);

  const endTime = performance.now();
  console.log(`Total execution time: ${formatTime(endTime - startTime)}`);
}

main()
  .then(() => console.log('Process completed successfully.'))
  .catch(console.error);
