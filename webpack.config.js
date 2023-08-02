import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Use import.meta.url to get the current module's URL
const __filename = fileURLToPath(import.meta.url);

// Use the dirname() function to get the directory name
const __dirname = dirname(__filename);

export default {
  mode: 'production',
  entry: './uniqueidentifier.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
