const fs = require('fs');
const dir = './src/components';
fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.jsx')) {
        let content = fs.readFileSync(`${dir}/${file}`, 'utf-8');
        content = content.replace(/text-\[#111\]/g, 'text-white')
            .replace(/text-\[#111111\]/g, 'text-white')
            .replace(/bg-white/g, 'bg-[#1a1a1a]')
            .replace(/border-\[#E8E8E3\]/g, 'border-[#333]')
            .replace(/bg-\[#F5F5F0\]/g, 'bg-[#222]')
            .replace(/text-\[#666\]/g, 'text-[#aaa]');
        fs.writeFileSync(`${dir}/${file}`, content);
    }
});
