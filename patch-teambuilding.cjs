const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'i18n', 'translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

const languages = ['sk', 'en', 'de', 'ru'];

// Adding to nav
languages.forEach(lang => {
  const navMatch = new RegExp(`"${lang}": \\{\\s*"nav": \\{([^}]+)\\}`, 'g');
  content = content.replace(navMatch, (match, navContent) => {
    if (navContent.includes('"teambuilding"')) return match;
    const translatedName = lang === 'sk' ? 'Teambuilding' : lang === 'en' ? 'Teambuilding' : lang === 'de' ? 'Teambuilding' : 'Тимбилдинг';
    return `"${lang}": {\n    "nav": {${navContent}, "teambuilding": "${translatedName}"}`;
  });
});

// Adding teambuilding content
const teambuildingContent = {
  sk: `
    "teambuilding": {
      "breadcrumb": "Teambuilding",
      "badge": "PRE FIRMY A SKUPINY",
      "title1": "FIREMNÝ",
      "title2": "TEAMBUILDING",
      "desc": "Hľadáte originálny zážitok pre váš tím? Ponúkame nezabudnuteľný teambuilding plný adrenalínu, spolupráce a nových výziev v bezpečnom prostredí našej strelnice.",
      "feat1Title": "Adrenalín a zážitok",
      "feat1Desc": "Vytvorte si spoločné spomienky pri netradičnej aktivite.",
      "feat2Title": "Bezpečnosť",
      "feat2Desc": "Profesionálni inštruktori sa postarajú o 100% bezpečnosť.",
      "feat3Title": "Priestory a catering",
      "feat3Desc": "Máme zázemie na prezentácie, posedenie aj catering.",
      "processTitle": "Ako to prebieha?",
      "step1Title": "Príprava a bezpečnosť",
      "step1Desc": "Oboznámenie sa so zbraňami a bezpečnostnými pravidlami.",
      "step2Title": "Strelecká časť",
      "step2Desc": "Streľba z rôznych typov zbraní pod vedením inštruktorov.",
      "step3Title": "Súťaž (Voliteľné)",
      "step3Desc": "Zorganizujeme pre vás priateľskú súťaž v presnosti streľby.",
      "contactTitle": "Máte záujem?",
      "contactDesc": "Kontaktujte nás a pripravíme vám ponuku na mieru presne podľa vašich požiadaviek a veľkosti skupiny.",
      "contactBtn": "VYŽIADAŤ PONUKU"
    }`,
  en: `
    "teambuilding": {
      "breadcrumb": "Teambuilding",
      "badge": "FOR COMPANIES AND GROUPS",
      "title1": "CORPORATE",
      "title2": "TEAMBUILDING",
      "desc": "Looking for an original experience for your team? We offer an unforgettable teambuilding full of adrenaline, cooperation, and new challenges in the safe environment of our shooting range.",
      "feat1Title": "Adrenaline and Experience",
      "feat1Desc": "Create shared memories with a non-traditional activity.",
      "feat2Title": "Safety",
      "feat2Desc": "Professional instructors will ensure 100% safety.",
      "feat3Title": "Facilities and Catering",
      "feat3Desc": "We have facilities for presentations, seating, and catering.",
      "processTitle": "How does it work?",
      "step1Title": "Preparation and Safety",
      "step1Desc": "Familiarization with weapons and safety rules.",
      "step2Title": "Shooting Part",
      "step2Desc": "Shooting with various types of weapons under the guidance of instructors.",
      "step3Title": "Competition (Optional)",
      "step3Desc": "We will organize a friendly shooting accuracy competition for you.",
      "contactTitle": "Interested?",
      "contactDesc": "Contact us and we will prepare a tailor-made offer exactly according to your requirements and group size.",
      "contactBtn": "REQUEST A QUOTE"
    }`,
  de: `
    "teambuilding": {
      "breadcrumb": "Teambuilding",
      "badge": "FÜR UNTERNEHMEN UND GRUPPEN",
      "title1": "FIRMEN",
      "title2": "TEAMBUILDING",
      "desc": "Suchen Sie ein originelles Erlebnis für Ihr Team? Wir bieten ein unvergessliches Teambuilding voller Adrenalin, Zusammenarbeit und neuer Herausforderungen in der sicheren Umgebung unseres Schießstandes.",
      "feat1Title": "Adrenalin und Erlebnis",
      "feat1Desc": "Schaffen Sie gemeinsame Erinnerungen bei einer ungewöhnlichen Aktivität.",
      "feat2Title": "Sicherheit",
      "feat2Desc": "Professionelle Instruktoren sorgen für 100%ige Sicherheit.",
      "feat3Title": "Räumlichkeiten und Catering",
      "feat3Desc": "Wir verfügen über Räumlichkeiten für Präsentationen, Sitzgelegenheiten und Catering.",
      "processTitle": "Wie funktioniert das?",
      "step1Title": "Vorbereitung und Sicherheit",
      "step1Desc": "Kennenlernen der Waffen und der Sicherheitsregeln.",
      "step2Title": "Schießteil",
      "step2Desc": "Schießen mit verschiedenen Waffenarten unter Anleitung von Instruktoren.",
      "step3Title": "Wettbewerb (Optional)",
      "step3Desc": "Wir organisieren für Sie einen freundschaftlichen Wettbewerb in der Schießgenauigkeit.",
      "contactTitle": "Interessiert?",
      "contactDesc": "Kontaktieren Sie uns und wir erstellen ein maßgeschneidertes Angebot genau nach Ihren Anforderungen und der Gruppengröße.",
      "contactBtn": "ANGEBOT ANFORDERN"
    }`,
  ru: `
    "teambuilding": {
      "breadcrumb": "Тимбилдинг",
      "badge": "ДЛЯ КОМПАНИЙ И ГРУПП",
      "title1": "КОРПОРАТИВНЫЙ",
      "title2": "ТИМБИЛДИНГ",
      "desc": "Ищете оригинальный опыт для вашей команды? Мы предлагаем незабываемый тимбилдинг, полный адреналина, сотрудничества и новых испытаний в безопасной обстановке нашего тира.",
      "feat1Title": "Адреналин и впечатления",
      "feat1Desc": "Создайте общие воспоминания благодаря необычной активности.",
      "feat2Title": "Безопасность",
      "feat2Desc": "Профессиональные инструкторы обеспечат 100% безопасность.",
      "feat3Title": "Помещения и кейтеринг",
      "feat3Desc": "У нас есть помещения для презентаций, отдыха и кейтеринга.",
      "processTitle": "Как это происходит?",
      "step1Title": "Подготовка и безопасность",
      "step1Desc": "Ознакомление с оружием и правилами безопасности.",
      "step2Title": "Стрелковая часть",
      "step2Desc": "Стрельба из различных видов оружия под руководством инструкторов.",
      "step3Title": "Соревнование (По желанию)",
      "step3Desc": "Мы организуем для вас дружеское соревнование по меткости стрельбы.",
      "contactTitle": "Заинтересованы?",
      "contactDesc": "Свяжитесь с нами, и мы подготовим индивидуальное предложение в точности с вашими требованиями и размером группы.",
      "contactBtn": "ЗАПРОСИТЬ ПРЕДЛОЖЕНИЕ"
    }`
};

languages.forEach(lang => {
  // Find the closing brace of the language object
  // A bit tricky because of deep nesting.
  // Actually, we can just replace `"footer": {` with the teambuilding content + `\n    "footer": {`
  const replaceTarget = `"footer": {`;
  if (content.includes(replaceTarget)) {
    // Only replace the first occurrence per language block? No, it appears once per lang.
    // Wait, `"footer": {` appears exactly once per language.
    // Better to use regex for the specific language's footer:
    const footerRegex = new RegExp(`("${lang}":\\s*\\{[\\s\\S]*?)("footer":\\s*\\{)`, 'g');
    content = content.replace(footerRegex, (match, prefix, footerText) => {
      if (prefix.includes('"teambuilding": {')) return match; // Already added
      return prefix + teambuildingContent[lang] + ',\n    ' + footerText;
    });
  }
});

fs.writeFileSync(filePath, content);
console.log('Translations updated successfully.');
