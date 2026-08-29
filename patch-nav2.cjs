const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

const navStart = code.indexOf('const navigation = [');
const navEnd = code.indexOf('  ];\n\n  return (', navStart) + 4;

const simpleNav = `const navigation = [
    { 
      name: 'STRELNICA', 
      href: '/strelnica',
      type: 'dropdown',
      dropdown: [
        { name: 'O STRELNICI', href: '/strelnica#o-nas' },
        { name: 'NAŠE ZÁZEMIE', href: '/strelnica#zazemie' },
        { name: 'ZBRANE A VYBAVENIE', href: '/cennik' },
        { name: 'AKO SA K NÁM DOSTANETE', href: '/kontakt' }
      ]
    },
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
    { 
      name: 'STRELECKÉ BALÍČKY', 
      href: '/strelecke-balicky',
      type: 'dropdown',
      dropdown: [
        { name: 'Všetky balíčky', href: '/strelecke-balicky' },
        { name: 'Pre jednotlivcov', href: '/strelecke-balicky#jednotlivci' },
        { name: 'Pre páry', href: '/strelecke-balicky#pary' },
        { name: 'Pre skupiny', href: '/strelecke-balicky#skupiny' }
      ]
    },
    { name: 'CENNÍK', href: '/cennik', type: 'link' },
    { 
      name: 'ŠPORTOVÝ KLUB', 
      href: '/sportovy-klub-hdi',
      type: 'dropdown',
      dropdown: [
        { name: 'O KLUBE', href: '/sportovy-klub-hdi' },
        { name: 'ČLENSTVO', href: '/sportovy-klub-hdi#clenstvo' },
        { name: 'TRÉNINGY', href: '/sportovy-klub-hdi#treningy' },
        { name: 'KALENDÁR', href: '/sportovy-klub-hdi#kalendar' },
        { name: 'PRETEKÁRI', href: '/sportovy-klub-hdi#pretekari' }
      ]
    },
    { name: 'KONTAKT', href: '/kontakt', type: 'link' }
  ];`;

code = code.substring(0, navStart) + simpleNav + code.substring(navEnd);
fs.writeFileSync('src/components/Layout.tsx', code);
console.log('done');
