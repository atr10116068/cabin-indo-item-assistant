# Cabin Indo Item Assistant 🎮

Aplikasi web React.js responsif untuk mengelola item game, pet, dan resep crafting dengan pencarian cerdas dan rekomendasi berbasis level untuk game Indonesia.

## Features ✨

### 🔍 Search Functionality
- Real-time search across items, pets, and crafting recipes
- Search by name, description, rarity, or preferred terrain
- Instant filtering with responsive results

### 📊 User-Friendly Tables
- **Items Table**: Display all game items with prices, rarity, chances, and descriptions
- **Pets Table**: Show pet information including exchange requirements
- **Crafting Table**: View complex crafting recipes with material requirements
- Responsive design that works on all devices

### 🎯 Level-Based Recommendations
- Input your current level to get personalized recommendations
- Smart categorization: Beginner (1-10), Intermediate (11-50), Advanced (51-100), Expert (101+)
- Filter recommendations by items only, pets only, or view all

### 🎨 Responsive Design
- Mobile-first approach with Tailwind CSS
- Beautiful gradient backgrounds and smooth transitions
- Hover effects and interactive elements
- Color-coded rarity system

## Technology Stack 🛠️

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useMemo)

## Getting Started 🚀

### Prerequisites
- Node.js 18+ installed on your machine
- npm package manager

### Installation & Setup

1. **Navigate to project directory**
```bash
cd cabin-indo-item-assistant
```

2. **Install dependencies** (already installed)
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Game Data 📋

The application includes comprehensive game data:

### Items (10 items)
- Common items: Apple, Battery, Bottle Cap
- Prestigious items: Awakened Angel Engine, Awakened Galaxy, Gear Of Time
- Limited items: Various COIN types

### Pets (4 pets)
- Common: Poop, Pumpkin
- Secret: Volcanic Beast, Wishing Star (with exchange requirements)

### Crafting Recipes (2 complex recipes)
- Awakened Angel Engine (requires 12 different materials)
- Awakened Galaxy (requires 11 different materials)

## Project Structure 📁

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main application page
├── components/
│   ├── SearchBar.tsx        # Search functionality
│   ├── ItemTable.tsx        # Items display table
│   ├── PetTable.tsx         # Pets display table
│   ├── CraftingTable.tsx    # Crafting recipes table
│   └── LevelRecommendations.tsx # Level-based recommendations
└── data/
    └── gameData.ts          # All game data and type definitions
```

## Features in Detail 🔍

### Search System
- **Real-time filtering**: Updates results as you type
- **Multi-field search**: Searches across name, description, rarity, and preferred terrain
- **Case-insensitive**: Works regardless of capitalization
- **Clear functionality**: Easy reset with X button

### Level Recommendations
- **Dynamic categorization**: Automatically determines your level category
- **Personalized suggestions**: Shows items/pets appropriate for your level
- **Flexible filtering**: Choose to see all recommendations, items only, or pets only
- **Visual feedback**: Clear indication of your current level range

### Responsive Tables
- **Mobile optimized**: Horizontal scrolling on smaller screens
- **Color-coded rarity**: Each rarity has its own color scheme
- **Price formatting**: Large numbers automatically formatted (K, M, B)
- **Truncated descriptions**: Long descriptions are truncated with full text on hover

## Customization 🛠️

### Adding New Items
Edit `src/data/gameData.ts` and add items to the respective arrays.

### Modifying Level Recommendations
Update the `levelRecommendations` object in `gameData.ts`.

### Styling Changes
The application uses Tailwind CSS. Modify classes in components or add custom styles in `globals.css`.

## Browser Support 🌐

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

---

**Dibuat dengan ❤️ menggunakan Next.js, TypeScript, dan Tailwind CSS untuk komunitas gaming Indonesia**
