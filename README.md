# Domains Portfolio Management System

A complete web application for managing domain portfolios, tracking evaluations, sales, and ROI.

## Features

- **Dashboard**: Overview with key metrics (Total domains, Sold domains, Global ROI, Total value)
- **Domain Management**: Add, edit, delete domains with automatic expiration calculation
- **Evaluation Tracking**: Track domain valuations from different tools
- **ROI Statistics**: Visual charts showing portfolio performance
- **Sales History**: Track sales with profit calculations and export functionality
- **Customizable Settings**: Manage registrars, categories, and evaluation tools
- **Responsive Design**: Works on desktop and mobile devices

## Installation

1. Clone or download the project files
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the server:
   \`\`\`bash
   npm start
   \`\`\`
   
   For development with auto-restart:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Dashboard
- View key portfolio metrics at a glance
- See recent domains and their status

### Domain Management
- Add new domains with purchase details
- Edit existing domain information
- Delete domains from your portfolio
- Automatic expiration date calculation (purchase date + 11 months)

### Evaluation
- Add valuations from different tools (Atom, DNRater, GoDaddy, etc.)
- Track evaluation history for each domain
- Add custom evaluation tools

### Statistics
- View ROI calculations and trends
- Visual charts showing portfolio breakdown
- Performance metrics over time

### Sales History
- Record domain sales with buyer information
- Calculate profit/loss for each sale
- Export sales data to CSV

### Settings
- Customize registrar lists
- Add domain categories
- Manage evaluation tools
- All "Other" entries are automatically saved for reuse

## File Structure

\`\`\`
domains-portfolio/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── views/                 # EJS templates
│   ├── index.ejs         # Dashboard
│   ├── domains.ejs       # Domain management
│   ├── evaluation.ejs    # Domain evaluation
│   ├── statistics.ejs    # ROI statistics
│   ├── sales.ejs         # Sales history
│   ├── settings.ejs      # Settings page
│   └── partials/         # Reusable template parts
├── public/               # Static files
│   ├── css/
│   │   └── style.css     # Main stylesheet
│   └── js/
│       └── main.js       # Client-side JavaScript
└── README.md             # This file
\`\`\`

## Technologies Used

- **Backend**: Node.js, Express.js
- **Templating**: EJS
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js
- **Icons**: Font Awesome

## Data Storage

Currently uses in-memory storage for simplicity. For production use, integrate with a database like:
- MongoDB
- PostgreSQL
- MySQL
- SQLite

## Customization

The application is designed to be easily customizable:
- Modify the color scheme in `public/css/style.css`
- Add new fields to domain records in `server.js`
- Extend the API with additional endpoints
- Add new evaluation tools or categories through the settings page

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

MIT License - feel free to use and modify as needed.
