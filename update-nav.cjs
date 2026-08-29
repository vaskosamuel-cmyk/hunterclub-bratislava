const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// Replace navigation array
const navStart = code.indexOf('const navigation = [');
const navEnd = code.indexOf('];', navStart) + 2;

const newNav = `const navigation = [
    { 
      name: 'STRELNICA',
      href: '/strelnica',
      type: 'dropdown',
      dropdown: [
        { name: 'O STRELNICI', href: '/strelnica#o-nas' },
        { name: 'NAŠE ZÁZEMIE', href: '/strelnica#zazemie' },
        { name: 'ZBRANE A VYBAVENIE', href: '/cennik' },
        { name: 'AKO SA K NÁM DOSTANETE', href: '/kontakt' }
      ],
      dropdownBottom: { text: 'Bratislava', icon: MapPin, href: '/kontakt' }
    },
    { 
      name: 'KURZY',
      href: '/kurzy',
      type: 'mega-medium',
      dropdown: [
        { name: 'Príprava na Zbrojný Preukaz', href: '/zbrojny-preukaz' },
        { name: 'Teoretická príprava', href: '/teoreticka-priprava' },
        { name: 'Psychotesty', href: '/psychotesty' },
        { name: 'Základný kurz streľby', href: '/zakladny-kurz' },
        { name: 'Taktický výcvik', href: '/takticky-vycvik' },
        { name: 'Individuálny tréning', href: '/kontakt' }
      ],
      megaMenu: {
        title: 'Vzdelávanie, bezpečnosť a strelecké zručnosti',
        cols: [
          {
            title: 'ZBROJNÝ PREUKAZ',
            items: [
              { name: 'Príprava na ZP', icon: Shield, href: '/zbrojny-preukaz' },
              { name: 'Teoretická príprava', icon: BookOpen, href: '/teoreticka-priprava' },
              { name: 'Psychotesty', icon: Brain, href: '/psychotesty' }
            ]
          },
          {
            title: 'STRELECKÉ TRÉNINGY',
            items: [
              { name: 'Základný kurz streľby', icon: Target, href: '/zakladny-kurz' },
              { name: 'Taktický výcvik', icon: Crosshair, href: '/takticky-vycvik' },
              { name: 'Individuálny tréning', icon: User, href: '/kontakt' }
            ]
          }
        ],
        bottomBar: 'Profesionálni inštruktori · Bezpečnosť · Prax',
        allLink: { name: 'VŠETKY KURZY', href: '/kurzy' }
      }
    },
    { 
      name: 'STRELECKÉ BALÍČKY',
      href: '/strelecke-balicky',
      type: 'mega-large',
      dropdown: [
        { name: 'Všetky balíčky', href: '/strelecke-balicky' },
        { name: 'Balíček Štandard', href: '/strelecke-balicky' },
        { name: 'Balíček Akcia', href: '/strelecke-balicky' },
        { name: 'Balíček VIP', href: '/strelecke-balicky' },
        { name: 'Balíček Rande', href: '/strelecke-balicky' }
      ],
      megaMenu: {
        subtitle: 'Zážitková streľba pre jednotlivcov, páry aj skupiny',
        sidebarTitle: 'VYBERTE SI',
        sidebarLinks: [
          { name: 'Všetky balíčky', icon: LayoutGrid, href: '/strelecke-balicky', active: true },
          { name: 'Pre jednotlivcov', icon: User, href: '/strelecke-balicky' },
          { name: 'Pre páry', icon: Users, href: '/strelecke-balicky' },
          { name: 'Pre skupiny', icon: Users, href: '/strelecke-balicky' }
        ],
        gridTitle: 'OBĽÚBENÉ BALÍČKY',
        gridItems: [
          { name: 'BALÍČEK ŠTANDARD', desc: 'Základný zážitok', icon: Target, href: '/strelecke-balicky' },
          { name: 'BALÍČEK AKCIA', desc: 'Viac zbraní, viac streľby', icon: Crosshair, href: '/strelecke-balicky' },
          { name: 'BALÍČEK VIP', desc: 'Prémiový zážitok', icon: Award, href: '/strelecke-balicky' },
          { name: 'BALÍČEK RANDE', desc: 'Zážitok pre dvoch', icon: Users, href: '/strelecke-balicky' }
        ]
      }
    },
    { 
      name: 'CENNÍK', 
      href: '/cennik',
      type: 'link'
    },
    { 
      name: 'ŠPORTOVÝ KLUB', 
      href: '/sportovy-klub-hdi',
      type: 'link'
    },
    { 
      name: 'DARČEKOVÉ POUKAZY', 
      href: '/darcekovy-poukaz',
      type: 'link',
      icon: Gift,
      accent: true
    },
    { 
      name: 'KONTAKT', 
      href: '/kontakt',
      type: 'link'
    }
  ];`;

code = code.substring(0, navStart) + newNav + code.substring(navEnd);
fs.writeFileSync('src/components/Layout.tsx', code);
console.log("Navigation array updated");
