const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/VinhDat/Desktop/REQ/src/frontend/admin';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('01'));

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // 1. Fix body class
    // Find body opening tag
    content = content.replace(/<body([^>]*)>/i, (match, p1) => {
        let classes = '';
        const classMatch = p1.match(/class="(.*?)"/);
        if (classMatch) {
            classes = classMatch[1];
        }
        
        const keepClasses = classes.split(/\s+/).filter(c => 
            !['text-on-surface', 'bg-slate-50', 'dark:bg-slate-950', 'flex', 'flex-col', 'min-h-screen', 'min-h-[100vh]'].includes(c)
        ).join(' ');

        const newClasses = `text-on-surface bg-slate-50 dark:bg-slate-950 flex flex-col min-h-screen ${keepClasses}`.trim().replace(/\s+/g, ' ');
        
        let newAttrs = p1;
        if (classMatch) {
            newAttrs = p1.replace(/class=".*?"/, `class="${newClasses}"`);
        } else {
            newAttrs = ` class="${newClasses}"${p1}`;
        }
        return `<body${newAttrs}>`;
    });

    // 2. Remove wrapper <div class="flex min-h-screen">
    if (content.includes('<div class="flex min-h-screen">')) {
        content = content.replace('<div class="flex min-h-screen">', '');
        // We also need to remove the matching closing div right before <script src="../shared/nav-components.js"
        // Just find the last </div> before <script
        const scriptIndex = content.lastIndexOf('<script src="../shared/nav-components');
        const beforeScript = content.substring(0, scriptIndex);
        const lastDivIndex = beforeScript.lastIndexOf('</div>');
        if (lastDivIndex > -1) {
            content = content.substring(0, lastDivIndex) + content.substring(lastDivIndex + 6);
        }
    }

    // 3. Extract header
    const headerRegex = /<header([^>]*)>([\s\S]*?)<\/header>/i;
    const headerMatch = content.match(headerRegex);
    if (headerMatch) {
        let innerHtml = headerMatch[2];
        const newHeader = `<header class="h-16 flex items-center justify-between px-8 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-40 ml-64 w-[calc(100%_-_16rem)]">\n${innerHtml}\n</header>`;
        
        // Remove the old header completely
        content = content.replace(headerRegex, '');
        
        // Now find <main> and insert newHeader right before it
        content = content.replace(/(<main[^>]*>)/i, `\n${newHeader}\n$1`);
    }

    // 4. Standardise main
    content = content.replace(/<main([^>]*)>/i, (match, p1) => {
        let classes = '';
        const classMatch = p1.match(/class="(.*?)"/);
        if (classMatch) classes = classMatch[1];
        
        const coreClasses = [
            'flex-1', 'p-6', 'ml-64', 'w-[calc(100%_-_16rem)]', 'min-h-[calc(100vh-4rem)]', 'text-slate-900', 'dark:text-slate-100'
        ];
        
        const keepClasses = classes.split(/\s+/).filter(c => 
            !coreClasses.includes(c) && !c.includes('w-[calc(100%_-_16rem)]') && c !== 'w-full' && c !== 'flex-1' && c !== 'p-6' && c !== 'ml-64'
        );
        
        const newClasses = [...coreClasses, ...keepClasses].join(' ').replace(/\s+/g, ' ').trim();
        
        let newAttrs = p1;
        if (classMatch) {
            newAttrs = p1.replace(/class=".*?"/, `class="${newClasses}"`);
        } else {
            newAttrs = ` class="${newClasses}"${p1}`;
        }
        return `<main${newAttrs}>`;
    });

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
}
console.log("Processed all admin html files!");
