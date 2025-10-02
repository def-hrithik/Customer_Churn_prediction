
# Customer Churn Prediction - React Frontend

A complete React frontend application for Customer Churn Prediction featuring modern UI/UX, interactive data visualizations, and AI-powered analytics.

## 🚀 Live Demo

The application is running on [http://localhost:5173/](http://localhost:5173/)

## ✨ Features

### 🎨 Modern Design & User Experience
- **Dark/Light Theme Toggle**: Persistent theme switching with system preference detection
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Modern UI Components**: Clean, professional interface with smooth animations
- **Accessible Design**: WCAG-compliant with keyboard navigation support

### 🏠 Landing Page
- Hero section with animated chart visualizations
- Feature highlights and benefits
- Statistics overview
- Process workflow explanation
- Call-to-action sections

### 🔮 Prediction Page
- **Customer Data Input Form**: Comprehensive form with 15+ customer attributes
- **Real-time Predictions**: Simulated ML model integration with API placeholder
- **Dynamic Visualizations**: 
  - Risk probability doughnut chart
  - Feature impact analysis bar chart
  - Confidence score display
- **Responsive Results**: Instant feedback with color-coded risk levels

### 📊 Insights Dashboard
- **4 Comprehensive Tabs**: Overview, Demographics, Services, Financial
- **10+ Interactive Charts**: Bar, Line, Pie, Doughnut charts using Chart.js
- **Data-Driven Insights**: Key findings and recommendations
- **Business Intelligence**: Actionable insights for customer retention

## 🛠️ Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **Build Tool**: Vite for fast development and optimized builds  
- **Routing**: React Router v6 for navigation
- **Charts**: Chart.js with react-chartjs-2 for data visualizations
- **Styling**: Custom CSS with CSS variables for theming
- **State Management**: React Context API for global theme state
- **HTTP Client**: Axios for API calls (placeholder implementation)

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Navigation component with theme toggle
│   └── Navbar.css           # Navigation styling
├── contexts/
│   └── ThemeContext.jsx     # Theme state management
├── pages/
│   ├── Home.jsx            # Landing page component
│   ├── Home.css            # Landing page styling
│   ├── Prediction.jsx      # Prediction form and results
│   ├── Prediction.css      # Prediction page styling
│   ├── Insights.jsx        # Analytics dashboard
│   └── Insights.css        # Dashboard styling
├── styles/
│   └── globals.css         # Global styles and theme variables
├── App.jsx                 # Main application component
└── main.jsx               # Application entry point
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd customer_churn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit [http://localhost:5173](http://localhost:5173)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Features Detailed

### Theme System
- **Persistent Storage**: Preferences saved to localStorage
- **System Integration**: Automatically detects OS theme preference
- **CSS Variables**: Seamless color transitions across all components
- **Chart Theming**: All visualizations adapt to current theme

### Responsive Design
- **Mobile-First Approach**: Optimized for mobile devices
- **Breakpoints**: 
  - Mobile: < 480px
  - Tablet: 481px - 768px
  - Desktop: 769px - 1024px
  - Large Desktop: > 1024px
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive layouts

### Data Visualizations
- **Chart Types**: Bar, Line, Pie, Doughnut charts
- **Interactive Elements**: Hover effects and tooltips
- **Responsive Charts**: Adapt to screen size and theme
- **Data Insights**: Each chart includes key findings and recommendations

### Prediction System
- **Mock ML Integration**: Placeholder for backend API calls
- **Form Validation**: Required fields and input validation
- **Loading States**: Visual feedback during prediction processing
- **Result Visualization**: Multiple chart types for prediction analysis

## 🔧 Customization

### Adding New Charts
1. Import Chart.js components
2. Create chart data object
3. Add chart options for theming
4. Implement responsive container

### Theme Customization
Update CSS variables in `src/styles/globals.css`:
```css
[data-theme="light"] {
  --accent: #your-color;
  --bg-primary: #your-bg;
}
```

### API Integration
Replace mock data in `Prediction.jsx`:
```javascript
// Replace setTimeout with actual API call
const response = await axios.post('/api/predict', formData);
setPrediction(response.data);
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- [ ] Real backend ML model integration
- [ ] User authentication system
- [ ] Data export functionality
- [ ] Advanced filtering options
- [ ] Real-time data updates
- [ ] A/B testing framework
- [ ] Performance analytics
- [ ] Multi-language support

## 🐛 Known Issues

- Charts may flicker during theme transitions (minor)
- Mobile navigation menu needs implementation
- Some chart animations could be optimized

## 📞 Support

For support, email support@example.com or create an issue on GitHub.

---

**Built with ❤️ using React, Vite, and Chart.js**+ Vite
