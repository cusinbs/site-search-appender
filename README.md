# Site Search Appender

## Overview
Site Search Appender is a Chrome extension that appends `site:[domain name]` to Google search queries. Press `/` to trigger the domain options dropdown.

## Features
- Append `site:[domain name]` to search queries.
- Add custom domains.
- Remove existing domains.

## Installation
1. Clone the repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode".
4. Click "Load unpacked" and select the extension directory.

## Usage
1. Navigate to Google search.
2. Press `/` to open the domain options dropdown.
3. Select a domain or add a custom domain.

## Files
- `manifest.json`: Extension configuration.
- `content.js`: Main logic for handling domain options.
- `background.js`: Handles extension installation events.
- `popup.html`: Popup UI for the extension.

## Code Structure
### manifest.json
Defines the extension's permissions, background script, and content scripts.

### content.js
Handles the display and interaction of the domain options dropdown.

### background.js
Logs the installation of the extension.

### popup.html
Provides a simple UI for the extension.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License
This project is licensed under the MIT License.

