# Inland Andalucia Website

A modern, responsive real estate website for Inland Andalucia properties built with Next.js and Tailwind CSS.

![Inland Andalucia Website](https://placeholder-for-screenshot.com/inland-andalucia-screenshot.png)

## Overview

This project is a complete revamp of the Inland Andalucia website, focusing on:

- Modern, responsive design
- Improved user experience
- Enhanced property search and filtering
- Rich content about Andalucian provinces and towns
- Multilingual support (English/Spanish)

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom theme
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation
- **Maps**: React Leaflet
- **Animations**: Framer Motion
- **Internationalization**: next-intl

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm 9.6.7 or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/inland-andalucia.git
cd inland-andalucia
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Setup & Configuration

For detailed setup instructions, please refer to the [Setup Guide](SETUP_GUIDE.md).

## Project Structure

The project follows a clear and organized structure:

```
inland/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and types
│   ├── mock/          # Mock data for development
│   ├── context/       # React Context providers
│   └── styles/        # Global styles and CSS modules
├── README.md          # Project documentation
├── TODO.md            # Development task list
└── SETUP_GUIDE.md     # Detailed setup instructions
```

For more details about the project structure, see [project-structure.md](project-structure.md).

## Features

- **Property Listings**: Browse and search properties across inland Andalucia
- **Advanced Filtering**: Find properties based on location, type, price, and features
- **Province/Town Information**: Explore detailed information about regions and towns
- **Interactive Maps**: View property and area locations
- **Responsive Design**: Optimal viewing experience across all device sizes
- **Multilingual Support**: Content in both English and Spanish
- **Buyer Guides**: Comprehensive information for property buyers

## Development Roadmap

For current development status and upcoming tasks, see [TODO.md](TODO.md).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Acknowledgements

- Design inspiration from modern real estate websites
- All property data is fictional and for demonstration purposes only
