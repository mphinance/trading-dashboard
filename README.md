# 📈 mphinance Daily Dashboard

A comprehensive trading dashboard for real-time market monitoring, watchlist management, and trading journal analysis. Built with React, TypeScript, and Tailwind CSS.

![mphinance Dashboard](https://via.placeholder.com/1200x600/1A1A1A/39FF14?text=mphinance+Dashboard+Screenshot)

## ✨ Features

### 🎯 Watchlist Management
- **Real-time Stock Tracking**: Monitor your favorite stocks with live price data
- **Pre-market Data**: Track pre-market prices and changes
- **Smart Tagging System**: Organize stocks with customizable tags (Swing, Day Trade, Long Term, Earnings)
- **Interactive Notes**: Add and edit trading notes directly in the table
- **Advanced Sorting**: Sort by symbol, price, change, volume, and more
- **Tag Filtering**: Filter watchlist by specific tags
- **Share Functionality**: Generate shareable view-only watchlist URLs

### 📊 Trading Journal
- **Comprehensive Trade Tracking**: Log stocks, calls, and puts with detailed information
- **Options Support**: Full Greeks tracking (Delta, Gamma, Theta, Vega, Rho, IV)
- **Performance Analytics**: Advanced charts and heatmaps for trade analysis
- **Strategy Management**: Categorize trades by strategy with color coding
- **P&L Calendar**: Visual monthly and weekly P&L heatmaps
- **Time-based Analytics**: Performance breakdown by hour, day of week, and holding period
- **Asset Type Analysis**: Separate tracking for stocks, calls, and puts

### 📈 Performance Analytics
- **Weekly Heatmap**: Visual representation of P&L by time slots and days
- **Monthly Calendar**: Daily P&L tracking with detailed tooltips
- **Win Rate Analysis**: Performance metrics by strategy, asset type, and time
- **Greeks Analysis**: Options performance by IV ranges and DTE
- **Holding Period Analysis**: Performance by trade duration

### 🔗 Integration Features
- **Webull Integration**: Connect your Webull account for automatic trade sync
- **Share Watchlists**: Generate unique URLs for sharing watchlists
- **Export Capabilities**: Data export for further analysis

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mphinance-dashboard.git
cd mphinance-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 📱 Screenshots

### Watchlist View
![Watchlist](https://via.placeholder.com/1200x800/1A1A1A/39FF14?text=Watchlist+View+-+Real-time+Stock+Tracking)

**Features shown:**
- Real-time price updates
- Pre-market data display
- Tag-based filtering
- Inline note editing
- Share functionality

### Trading Journal
![Trading Journal](https://via.placeholder.com/1200x800/1A1A1A/BF00FF?text=Trading+Journal+-+Comprehensive+Trade+Tracking)

**Features shown:**
- Detailed trade logging
- Options Greeks tracking
- Strategy categorization
- P&L calculations
- Performance metrics

### Performance Analytics
![Performance Charts](https://via.placeholder.com/1200x800/1A1A1A/FFD700?text=Performance+Analytics+-+Advanced+Charts)

**Features shown:**
- Weekly P&L heatmap
- Monthly calendar view
- Win rate analysis
- Time-based performance
- Asset type breakdown

### Add Stock Modal
![Add Stock](https://via.placeholder.com/800x600/2C2C2C/39FF14?text=Add+Stock+Modal+-+Yahoo+Finance+Integration)

**Features shown:**
- Yahoo Finance API integration
- Real-time stock search
- Tag assignment
- Note addition

### Share Watchlist
![Share Feature](https://via.placeholder.com/800x600/2C2C2C/BF00FF?text=Share+Watchlist+-+Collaborative+Features)

**Features shown:**
- Shareable URL generation
- Privacy controls
- View-only access
- Custom settings

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data Source**: Yahoo Finance API (proxied)
- **Deployment**: Netlify

## 📊 Data Sources

- **Stock Data**: Yahoo Finance API
- **Real-time Prices**: Live market data with 15-minute delay
- **Pre-market Data**: Extended hours trading information
- **Volume & OHLC**: Complete market data

## 🎨 Design Philosophy

The dashboard follows a dark theme optimized for traders:
- **Primary Green (#39FF14)**: Profits, positive changes, call options
- **Primary Purple (#BF00FF)**: Losses, negative changes, put options
- **Dark Background (#1A1A1A)**: Reduced eye strain for long trading sessions
- **High Contrast**: Clear visibility of important data
- **Responsive Design**: Works on desktop, tablet, and mobile

## 📈 Trading Features

### Watchlist Capabilities
- Add stocks via symbol search
- Real-time price updates
- Pre-market and after-hours data
- Custom tagging system
- Inline note editing
- Advanced sorting and filtering
- Share functionality

### Journal Capabilities
- Stock and options trade logging
- Complete Greeks tracking
- Strategy-based categorization
- P&L calculations
- Performance analytics
- Time-based analysis
- Export capabilities

### Analytics Features
- Weekly P&L heatmaps
- Monthly calendar views
- Win rate analysis
- Asset type performance
- Time-based metrics
- Strategy effectiveness
- Risk management insights

## 🔧 Configuration

### Environment Variables
```env
# Add these to your .env file if needed
VITE_API_BASE_URL=your_api_url
```

### Customization
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Tags**: Edit `src/utils/mockData.ts` to customize default tags
- **Strategies**: Modify `src/utils/mockTradeData.ts` for trading strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Yahoo Finance for market data
- Lucide React for beautiful icons
- Tailwind CSS for styling system
- React community for excellent tooling

## 📞 Support

For support, email support@mphinance.com or create an issue on GitHub.

## 🚀 Deployment

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

---

**Built with ❤️ for traders by traders**

*mphinance Dashboard - Your comprehensive trading companion*