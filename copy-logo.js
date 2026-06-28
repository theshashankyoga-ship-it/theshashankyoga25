const fs = require('fs');
const path = require('path');

const src = path.join(
  process.env.APPDATA || 'C:\\Users\\Administrator',
  '.gemini\\antigravity\\brain\\691f16f6-a297-4062-a0f3-f84ca5035556\\media__1782631401210.png'
);
const dest = path.join(__dirname, 'media', 'logo.png');

if (!fs.existsSync(path.dirname(dest))) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
}

fs.copyFileSync(src, dest);
console.log('✅ Logo copied successfully to media/logo.png');
