const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

const navStart = code.indexOf('const navigation = [');
const navEnd = code.indexOf('  ];\n\n  return (', navStart) + 4;

const simpleNav = `const navigation = [
    { name: 'STRELNICA', href: '/strelnica', type: 'link' },
    { 
      name: 'KURZY', 
      href: '/kurzy',
      type: 'dropdown',
      dropdown: [
        { name: 'Zbrojný preukaz', href: '/zbrojny-preukaz' },
        { name: 'Teoretická príprava', href: '/teoreticka-priprava' },
        { name: 'Psychotesty', href: '/psychotesty' },
        { name: 'Základný kurz streľby', href: '/zakladny-kurz' },
        { name: 'Taktický výcvik', href: '/takticky-vycvik' }
      ]
    },
    { name: 'STRELECKÉ BALÍČKY', href: '/strelecke-balicky', type: 'link' },
    { name: 'CENNÍK', href: '/cennik', type: 'link' },
    { name: 'ŠPORTOVÝ KLUB', href: '/sportovy-klub-hdi', type: 'link' }
  ];`;

code = code.substring(0, navStart) + simpleNav + code.substring(navEnd);
fs.writeFileSync('src/components/Layout.tsx', code);
console.log('done');
