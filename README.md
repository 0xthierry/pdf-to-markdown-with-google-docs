# PDF to Markdown Converter

This project converts PDF files to Markdown format using Google Drive API. It uploads a PDF file to Google Drive, converts it to a Google Doc, and then exports it as a Markdown file.

## Prerequisites

1. Node.js installed on your machine
2. A Google Cloud Platform account
3. A Google Drive API enabled project
4. A service account with access to Google Drive API

## Setup

1. Clone this repository to your local machine.

2. Install dependencies:
```bash
pnpm install
```

3. Create a `keys.json` file in the root directory of the project with your service account credentials.

4. Create a new Google Drive folder and share it with the service account email address found in your `keys.json` file. This step is crucial for the service account to have the necessary permissions.

5. Place your PDF file in the project root and name it `sample-invoice.pdf`, or update the code to use your desired filename.

## Usage

Run the script using the following command:

```bash
pnpm dev
```

The script will:
1. Upload the PDF file to Google Drive
2. Convert it to a Google Doc
3. Export the Google Doc as a Markdown file
4. Save the Markdown file as `sample-invoice.md` in the project root

## Configuration

You can modify the `src/index.ts` file to change:
- Input and output file names
- Google Drive folder location
- Timing and logging preferences

## Troubleshooting

If you encounter permission issues, make sure:
1. The Google Drive API is enabled in your Google Cloud Console
2. The service account has the necessary permissions
3. You've shared the Google Drive folder with the service account email
