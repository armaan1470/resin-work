# Satoshi Font Setup

This project uses the Satoshi font family, which has been configured with Next.js and Tailwind CSS v4.

## Font Files

The Satoshi font files are located in `public/fonts/` and include:

- Variable fonts (Satoshi-Variable.woff2, Satoshi-VariableItalic.woff2)
- Individual weight files (Light, Regular, Medium, Bold, Black)
- Both normal and italic styles

## Usage

### 1. Font Weights Available

The following font weights are available:

- `font-light` (300)
- `font-normal` (400) - default
- `font-medium` (500)
- `font-bold` (700)
- `font-black` (900)

### 2. Font Styles

- Normal style (default)
- `italic` for italic text

### 3. Using the Font

The Satoshi font is automatically applied to the entire application through the root layout. You can use it in several ways:

#### Basic Usage

```tsx
// The font is already applied globally
<p>This text uses Satoshi font</p>

// Different weights
<h1 className="font-black">Black weight heading</h1>
<p className="font-medium">Medium weight paragraph</p>
<span className="font-light">Light weight text</span>

// Italic style
<p className="italic">Italic text</p>
<p className="font-bold italic">Bold italic text</p>
```

#### Using Utility Functions

```tsx
import { getFontClass } from '@/lib/utils'

// In your component
<div className={getFontClass('bold', 'normal')}>
  Bold text
</div>

<div className={getFontClass('medium', 'italic')}>
  Medium italic text
</div>
```

### 4. Font Configuration Files

- `lib/fonts.ts` - Font configuration using Next.js localFont
- `tailwind.config.ts` - Tailwind font family configuration
- `app/globals.css` - CSS variables for font families

### 5. Testing the Font

A test section has been added to the home page (`app/page.tsx`) that demonstrates all font weights and styles. You can remove this section after confirming the font is working correctly.

## Customization

### Adding New Font Weights

If you need additional font weights, add them to:

1. `lib/fonts.ts` - Add the font file path and weight
2. `lib/utils.ts` - Add the weight to the `fontWeights` object
3. Update the Tailwind config if needed

### Using Variable Fonts

The project also includes variable font files that support the full weight range (300-900). You can switch to using the variable font by importing `satoshiVariable` instead of `satoshi` in `lib/fonts.ts`.

## Performance

- Font files are optimized with `display: 'swap'` for better loading performance
- WOFF2 format is used for smaller file sizes
- Fonts are loaded locally for better privacy and performance
