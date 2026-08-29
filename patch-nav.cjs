const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

const navStart = code.indexOf('const navigation = [');
const navEnd = code.indexOf('];', navStart) + 2;

const newNavigation = `const navigation = [
    { 
      name: t('nav.strelnica') || 'Strelnica', 
      subtitle: 'O strelnici',
      topIcon: Target,
      href: '/strelnica',
      megaMenu: {
        sidebarTitle: 'Strelnica',
        sidebarLinks: [
          { name: 'O strelnici', icon: Target, href: '/strelnica#o-nas', active: true },
          { name: 'Bezpečnosť', icon: ShieldCheck, href: '/strelnica#bezpecnost' },
          { name: 'Zbrane a vybavenie', icon: Crosshair, href: '/cennik' },
          { name: 'Športový klub', icon: Award, href: '/sportovy-klub-hdi' },
        ],
        gridTitle: 'Ako to funguje',
        gridSubtitle: 'Všetko, čo potrebujete vedieť pred návštevou.',
        gridItems: [
          { name: 'Som tu prvýkrát', desc: 'Základné informácie pre nových návštevníkov.', icon: User, href: '/som-tu-prvykrat' },
          { name: 'Bezpečnostné pravidlá', desc: 'Pravidlá bezpečnosti na našej strelnici.', icon: Shield, href: '/strelnica#bezpecnost' },
          { name: 'Zbrane na zapožičanie', desc: 'Široký výber zbraní pre každého.', icon: Crosshair, href: '/cennik' },
          { name: 'Športový klub HDI', desc: 'Pridajte sa k našej komunite strelcov.', icon: Award, href: '/sportovy-klub-hdi' },
          { name: 'Ako sa k nám dostať', desc: 'Navigácia a parkovanie.', icon: LayoutGrid, href: '/kontakt' }
        ],
        gridLink: { name: 'Viac o strelnici', href: '/strelnica' }
      },
      dropdown: []
    },
    { 
      name: t('nav.kurzy') || 'Kurzy', 
      subtitle: 'Vzdelanie & výcvik',
      topIcon: GraduationCap,
      href: '/kurzy',
      megaMenu: {
        sidebarTitle: 'Kategórie',
        sidebarLinks: [
          { name: 'Všetky kurzy', icon: LayoutGrid, href: '/kurzy', active: true },
          { name: 'Pre začiatočníkov', icon: ShieldCheck, href: '/zakladny-kurz' },
          { name: 'Pre držiteľov ZP', icon: Shield, href: '/zbrojny-preukaz' },
          { name: 'Taktické kurzy', icon: Crosshair, href: '/takticky-vycvik' },
          { name: 'Individuálne tréningy', icon: User, href: '/kontakt' },
          { name: 'Firemné & skupiny', icon: Users, href: '/strelecke-balicky' },
        ],
        gridTitle: 'Všetky kurzy',
        gridSubtitle: 'Vyberte si kurz, ktorý posunie vaše zručnosti na ďalší level.',
        gridItems: [
          { name: 'Príprava na Zbrojný Preukaz', desc: 'Kompletná teória aj prax pre úspešné zvládnutie skúšky.', icon: ShieldCheck, href: '/zbrojny-preukaz' },
          { name: 'Základný Kurz Streľby', desc: 'Základy bezpečnej manipulácie a presnej streľby.', icon: Target, href: '/zakladny-kurz' },
          { name: 'Psychotesty pre ZP', desc: 'Zákonné posúdenie psychológa pre držiteľov ZP.', icon: Brain, href: '/psychotesty' },
          { name: 'Taktický Výcvik', desc: 'Pokročilé taktiky, pohyb a práca pod stresom.', icon: Crosshair, href: '/takticky-vycvik' },
          { name: 'Teoretická príprava na ZP', desc: 'Teoretická výučba pre úspešné zvládnutie skúšky.', icon: BookOpen, href: '/teoreticka-priprava' },
          { name: 'Individuálne tréningy', desc: 'Tréningy šité na mieru podľa vašich potrieb.', icon: User, href: '/kontakt' }
        ],
        gridLink: { name: 'Zobraziť všetky kurzy', href: '/kurzy' }
      },
      dropdown: []
    },
    { 
      name: t('nav.baliky') || 'Strelecké balíčky', 
      subtitle: 'Zážitky na mieru',
      topIcon: Gift,
      href: '/strelecke-balicky',
      megaMenu: {
        sidebarTitle: 'Balíčky',
        sidebarLinks: [
          { name: 'Všetky balíčky', icon: LayoutGrid, href: '/strelecke-balicky', active: true },
          { name: 'Pre jednotlivcov', icon: User, href: '/strelecke-balicky' },
          { name: 'Pre páry', icon: Users, href: '/strelecke-balicky' },
          { name: 'Pre skupiny', icon: Users, href: '/strelecke-balicky' },
        ],
        gridTitle: 'Najobľúbenejšie balíčky',
        gridSubtitle: 'Zážitok na strelnici bez nutnosti vlastniť zbrojný preukaz.',
        gridItems: [
          { name: 'Balíček Štandard', desc: 'Základný balíček pre oboznámenie sa so streľbou.', icon: Target, href: '/strelecke-balicky' },
          { name: 'Balíček Akcia', desc: 'Viac zbraní, viac nábojov, viac adrenalínu.', icon: Crosshair, href: '/strelecke-balicky' },
          { name: 'Balíček VIP', desc: 'Prémiové zbrane a individuálny inštruktor.', icon: Award, href: '/strelecke-balicky' },
          { name: 'Balíček Rande', desc: 'Netradičný zážitok vo dvojici.', icon: Users, href: '/strelecke-balicky' }
        ],
        gridLink: { name: 'Všetky balíčky', href: '/strelecke-balicky' }
      },
      dropdown: []
    },
    { 
      name: t('nav.cennik') || 'Cenník', 
      subtitle: 'Transparentné ceny',
      topIcon: Tag,
      href: '/cennik',
      megaMenu: {
        sidebarTitle: 'Cenník',
        sidebarLinks: [
          { name: 'Kompletný cenník', icon: LayoutGrid, href: '/cennik', active: true },
          { name: 'Streľba a prenájom', icon: Target, href: '/cennik' },
          { name: 'Cenník kurzov', icon: GraduationCap, href: '/cennik' },
          { name: 'Zapožičanie zbraní', icon: Crosshair, href: '/cennik' },
        ],
        gridTitle: 'Rýchly prehľad',
        gridSubtitle: 'Základné položky z nášho cenníka.',
        gridItems: [
          { name: 'Prenájom boxu', desc: 'Od 15€ / hodina', icon: LayoutGrid, href: '/cennik' },
          { name: 'Inštruktor', desc: 'Odborný dohľad a vedenie.', icon: ShieldCheck, href: '/cennik' },
          { name: 'Zapožičanie zbrane', desc: 'Široký arzenál k dispozícii.', icon: Crosshair, href: '/cennik' },
          { name: 'Strelivo', desc: 'Ceny podľa aktuálneho kalibru.', icon: Target, href: '/cennik' }
        ],
        gridLink: { name: 'Zobraziť kompletný cenník', href: '/cennik' }
      },
      dropdown: []
    }
  ];`;
  
code = code.substring(0, navStart) + newNavigation + code.substring(navEnd);
fs.writeFileSync('src/components/Layout.tsx', code);
console.log("Done Nav Patch");
