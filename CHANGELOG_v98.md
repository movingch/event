# v98 - Always-on Google Sheet sync

- Removed the ON/OFF concept for Google Sheet sync in operation.
- Every browser, laptop, tablet, and mobile device now uses the default Google Sheet source automatically.
- Forces Google Sheet pull on first load, page return, visibility change, focus, and every 60 seconds.
- Keeps the overwrite guard so empty new devices cannot overwrite applicant data.
- Includes Apps Script v98 with the actual spreadsheet ID and column-width preservation.
