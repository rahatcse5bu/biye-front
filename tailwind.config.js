/** @type {import('tailwindcss').Config} */

import withMT from '@material-tailwind/react/utils/withMT';
import { Colors } from './src/constants/colors.js';

export default withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // TODO: steps Tailwind 3.4 added; without them classes like text-white/85 silently don't compile.
      opacity: {
        15: '0.15',
        35: '0.35',
        45: '0.45',
        55: '0.55',
        65: '0.65',
        85: '0.85',
        95: '0.95',
      },
      colors: {
        brand: {
          900: Colors.primary900,
        },
      },
    },
  },
  plugins: [],
});
