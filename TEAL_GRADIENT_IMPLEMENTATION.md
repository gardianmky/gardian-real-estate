# Teal Gradient CSS Implementation Guide

## Overview

This guide demonstrates how to replace placeholder blocks with visually appealing teal gradient CSS sections. The gradient styles use modern CSS techniques including `linear-gradient`, smooth transitions, and responsive design.

## Files Created

1. **`styles/teal-gradient.css`** - Main CSS file with all gradient styles
2. **`components/ui/teal-gradient-section.tsx`** - React components for easy integration
3. **`app/teal-gradient-demo/page.tsx`** - Demo page showcasing all styles
4. **`app/globals.css`** - Updated to import teal gradient styles

## Available Gradient Styles

### 1. Section Backgrounds

```css
/* Basic gradient section */
.teal-gradient-section {
  background: #0f766e; /* Fallback */
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Hover effects */
.teal-gradient-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### 2. Gradient Buttons

```css
.teal-gradient-button {
  background: #0f766e; /* Fallback */
  background: linear-gradient(90deg, #0f766e 0%, #14b8a6 50%, #0d9488 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
```

### 3. Hero Sections

```css
.teal-gradient-hero {
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  background-size: 200% 200%;
  animation: gradientShift 6s ease infinite;
  border-radius: 20px;
  padding: 4rem 2rem;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### 4. Card Components

```css
.teal-gradient-card {
  background: linear-gradient(180deg, #0f766e 0%, #14b8a6 100%);
  border-radius: 16px;
  padding: 1.5rem;
  color: white;
  transition: all 0.3s ease;
}

.teal-gradient-card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### 5. Navigation Bars

```css
.teal-gradient-navbar {
  background: linear-gradient(90deg, #0f766e 0%, #14b8a6 50%, #0d9488 100%);
  backdrop-filter: blur(10px);
  border-radius: 0 0 12px 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

### 6. Gradient Text

```css
.teal-gradient-text {
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 4s ease infinite;
  font-weight: 700;
}
```

## How to Replace Placeholder Blocks

### Example 1: Replace a Basic Div

**Before (Placeholder):**
```html
<div class="placeholder-section">
  <h2>Placeholder Title</h2>
  <p>Placeholder content goes here...</p>
</div>
```

**After (Teal Gradient):**
```html
<div class="teal-gradient-section text-white">
  <h2>Welcome to Gardian Real Estate</h2>
  <p>Your trusted partner in finding the perfect property</p>
</div>
```

### Example 2: Replace Button Styles

**Before:**
```html
<button class="basic-button">Click Me</button>
```

**After:**
```html
<button class="teal-gradient-button">Contact Agent</button>
```

### Example 3: Replace Hero Section

**Before:**
```html
<section class="hero-placeholder">
  <h1>Hero Title</h1>
  <p>Hero description</p>
</section>
```

**After:**
```html
<section class="teal-gradient-hero text-center text-white">
  <h1 class="text-4xl font-bold mb-4">Welcome to Gardian Real Estate</h1>
  <p class="text-xl mb-6 opacity-90">Your trusted partner in finding the perfect property</p>
  <button class="teal-gradient-button">Get Started</button>
</section>
```

## React Component Usage

### Using the React Components

```tsx
import { TealGradientSection, TealGradientButton, TealGradientText } from '@/components/ui/teal-gradient-section';

// Replace placeholder section
<TealGradientSection variant="hero" className="text-center text-white">
  <h1 className="text-4xl font-bold mb-4">
    <TealGradientText>Premium Real Estate</TealGradientText>
  </h1>
  <p className="text-xl mb-6 opacity-90">
    Find your dream home today
  </p>
  <TealGradientButton onClick={() => console.log('clicked')}>
    Get Started
  </TealGradientButton>
</TealGradientSection>
```

## CSS Variables for Customization

```css
:root {
  --teal-gradient-primary: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  --teal-gradient-secondary: linear-gradient(90deg, #0d9488 0%, #5eead4 100%);
  --teal-gradient-diagonal: linear-gradient(45deg, #134e4a 0%, #2dd4bf 50%, #0f766e 100%);
  --teal-gradient-horizontal: linear-gradient(90deg, #0f766e 0%, #14b8a6 50%, #0d9488 100%);
  --teal-gradient-vertical: linear-gradient(180deg, #0f766e 0%, #14b8a6 100%);
  --teal-fallback: #0f766e;
}
```

## Features Included

✅ **Fallback Colors** - All gradients include solid color fallbacks  
✅ **Border Radius** - Modern rounded corners with customizable values  
✅ **Hover Transitions** - Smooth 0.3s ease transitions  
✅ **Responsive Design** - Mobile-first approach with breakpoints  
✅ **Accessibility** - Proper contrast ratios and focus states  
✅ **Performance** - Hardware-accelerated animations  
✅ **Cross-browser** - Vendor prefixes included  

## Browser Support

- Chrome 88+
- Firefox 84+
- Safari 14+
- Edge 88+

## Live Demo

Visit `/teal-gradient-demo` to see all styles in action with interactive examples.

## Integration Steps

1. **Import the CSS** - Already added to `globals.css`
2. **Choose a style** - Select from the available gradient classes
3. **Replace HTML** - Update your placeholder divs/sections
4. **Add content** - Update with your actual content
5. **Test responsiveness** - Verify on different screen sizes

## Best Practices

- Use `teal-gradient-hero` for main hero sections
- Use `teal-gradient-section` for content blocks
- Use `teal-gradient-button` for call-to-action buttons
- Use `teal-gradient-card` for feature highlights
- Use `teal-gradient-text` for emphasis and headings

## Customization

To modify colors, update the CSS variables in `:root` or create new gradient variations following the same pattern.

---

*This implementation provides a complete teal gradient system suitable for modern real estate websites with professional appearance and smooth user interactions.*