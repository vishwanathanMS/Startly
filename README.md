# 🚀 Startly - Your Beautiful Browser Start Page

A stunning, feature-rich browser start page designed to boost your productivity and inspire your day. Built with React, TypeScript, and modern web technologies, featuring Material Design 3 and Tailwind CSS-inspired aesthetics.

![Startly Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎨 **Modern Material Design**
- **Clean Flat UI** with Material Design 3 principles
- **5 Premium Color Themes**: Material Dark, Tailwind Slate, Material Indigo, Tailwind Emerald, Tailwind Rose
- **Glassmorphism Effects** with subtle backdrop blur
- **Smooth Animations** and micro-interactions throughout
- **Fully Responsive** - works perfectly on desktop, tablet, and mobile

### ⏰ **Time & Date**
- Large, elegant clock display
- Full date with day of the week
- Real-time updates every second

### 👋 **Smart Greeting**
- Personalized greeting based on time of day
- Customizable name in settings
- Dynamic "Good Morning/Afternoon/Evening" messages

### 🔍 **Powerful Search**
- **Multi-Engine Support**: Google, DuckDuckGo, Bing, YouTube
- Quick engine switching with visual selector
- Search suggestions for common queries
- Keyboard shortcut (`/`) to focus search

### 🔗 **Quick Links**
- Customizable bookmark grid with 8 default popular sites
- **Add/Edit/Delete** links with emoji icons
- Right-click to edit any link
- Persistent storage with localStorage
- Beautiful hover animations

### 🌤️ **Weather Widget**
- Current temperature and conditions
- Location display
- Humidity and wind speed
- Animated weather icons
- (Ready for API integration)

### 💭 **Inspirational Quotes**
- Curated collection of motivational quotes
- Random quote on page load
- Refresh button for new quotes
- Smooth fade animations

### ✅ **Todo List**
- Quick task management
- Add, complete, and delete tasks
- Expandable/collapsible interface
- Separate completed tasks section
- Persistent storage with localStorage
- Task counter badge

### ⚙️ **Settings Panel**
- **Personalization**: Set your name
- **Theme Selector**: Choose from 5 beautiful backgrounds
- **Widget Toggles**: Show/hide Weather, Quote, and Todo widgets
- **Keyboard Shortcuts** reference
- Accessible via `Ctrl + K` or settings button

## 🎹 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + K` | Open/Close Settings |
| `/` | Focus Search Bar |
| `Right Click` | Edit Quick Link |

## 🛠️ Technology Stack

- **Framework**: React 19.2.0
- **Language**: TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: Vanilla CSS with CSS Variables
- **Fonts**: Google Fonts (Inter, Outfit)
- **Icons**: SVG Icons
- **Storage**: localStorage for persistence

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Startly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
Startly/
├── src/
│   ├── components/
│   │   ├── Clock.tsx           # Time and date display
│   │   ├── Clock.css
│   │   ├── SearchBar.tsx       # Multi-engine search
│   │   ├── SearchBar.css
│   │   ├── QuickLinks.tsx      # Customizable bookmarks
│   │   ├── QuickLinks.css
│   │   ├── Weather.tsx         # Weather widget
│   │   ├── Weather.css
│   │   ├── QuoteWidget.tsx     # Inspirational quotes
│   │   ├── QuoteWidget.css
│   │   ├── TodoList.tsx        # Task management
│   │   ├── TodoList.css
│   │   ├── Settings.tsx        # Settings panel
│   │   └── Settings.css
│   ├── App.tsx                 # Main application
│   ├── App.css
│   ├── index.css               # Global styles & design system
│   └── main.tsx                # Entry point
├── index.html
├── package.json
└── vite.config.ts
```

## 🎨 Design System

### Color Palettes
**Material Dark Theme**
- Background: `#121212`
- Primary: `#bb86fc` (Purple)
- Secondary: `#03dac6` (Teal)

**Tailwind Slate Theme**
- Background: `#0f172a`
- Primary: `#3b82f6` (Blue)
- Secondary: `#06b6d4` (Cyan)

**Material Indigo Theme**
- Background: `#1a1a2e`
- Primary: `#5c6bc0` (Indigo)
- Secondary: `#26a69a` (Teal)

**Tailwind Emerald Theme**
- Background: `#022c22`
- Primary: `#10b981` (Emerald)
- Secondary: `#34d399` (Light Emerald)

**Tailwind Rose Theme**
- Background: `#1f1315`
- Primary: `#f43f5e` (Rose)
- Secondary: `#fb7185` (Pink)

### Typography
- **Primary Font**: Inter (body text)
- **Display Font**: Outfit (headings, clock)

### Effects
- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Animations**: Fade-in, slide-up, float, pulse
- **Shadows**: Material Design elevation shadows
- **Transitions**: Cubic-bezier easing for smooth interactions

## 🔧 Customization

### Adding New Quick Links
1. Click the "Add" button in Quick Links section
2. Or right-click any existing link to edit
3. Enter emoji icon, name, and URL
4. Click "Save"

### Changing Background Theme
1. Press `Ctrl + K` to open Settings
2. Select from 5 available themes
3. Changes apply instantly

### Managing Widgets
1. Open Settings (`Ctrl + K`)
2. Toggle Weather, Quote, or Todo widgets on/off
3. Layout adjusts automatically

## 📱 Browser Extension Setup

To use Startly as your browser's new tab page:

### Chrome/Edge
1. Build the project: `npm run build`
2. Create a `manifest.json` in the `dist` folder:
   ```json
   {
     "manifest_version": 3,
     "name": "Startly",
     "version": "1.0.0",
     "chrome_url_overrides": {
       "newtab": "index.html"
     }
   }
   ```
3. Go to `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked" and select the `dist` folder

### Firefox
1. Build the project: `npm run build`
2. Create a `manifest.json` with Firefox-specific settings
3. Go to `about:debugging#/runtime/this-firefox`
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file

## 🌟 Features in Detail

### Smart Search
- Automatically detects URLs and opens them directly
- Supports multiple search engines
- Visual engine selector with hover dropdown
- Quick suggestion chips for common searches

### Persistent Storage
All user data is stored locally in the browser:
- Quick Links configuration
- Todo list items
- Settings preferences
- No server required, complete privacy

### Accessibility
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus indicators
- Semantic HTML structure

## 🔮 Future Enhancements

- [ ] Real weather API integration
- [ ] Custom background image upload
- [ ] More widget options (Calendar, Notes, Pomodoro)
- [ ] Import/Export settings
- [ ] Cloud sync option
- [ ] Multiple search engine profiles
- [ ] Custom CSS themes
- [ ] Browser extension packaging

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

---

**Made with ❤️ for productivity enthusiasts**

Enjoy your beautiful new start page! 🎉
