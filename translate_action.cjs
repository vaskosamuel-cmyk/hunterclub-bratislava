const fs = require('fs');

const content = `
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, UserCheck, Shield, ChevronRight, Gift, Star, Check, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ReservationModal } from '../components/Modal';
import Link from '../components/Link';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

export default function Action() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const packagesRef = useRef<HTMLDivElement>(null);
  const scrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenGiftPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowGiftPopup(true);
        sessionStorage.setItem('hasSeenGiftPopup', 'true');
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  const { t, language } = useLanguage();

  const packages = [
    {
      name: t('legendary.name', { returnObjects: true }),
      desc: language === 'sk' ? "Najznámejšie zbrane z filmov a hier v jednom balíku." : 
            language === 'en' ? "The most famous weapons from movies and games in one package." :
            language === 'de' ? "Die berühmtesten Waffen aus Filmen und Spielen in einem Paket." :
            "Самое известное оружие из фильмов и игр в одном пакете.",
      price: "69€",
      weapons: Array.isArray(t('legendary.details', { returnObjects: true })) ? t('legendary.details', { returnObjects: true }) as string[] : [],
      popular: true
    },
    {
      name: t('pistol_karabina_9mm.name', { returnObjects: true }),
      desc: language === 'sk' ? "Pre milovníkov kalibru 9mm Luger. Pištole a karabíny." :
            language === 'en' ? "For lovers of the 9mm Luger caliber. Pistols and carbines." :
            language === 'de' ? "Für Liebhaber des Kalibers 9mm Luger. Pistolen und Karabiner." :
            "Для любителей калибра 9mm Luger. Пистолеты и карабины.",
      price: "35€",
      weapons: Array.isArray(t('pistol_karabina_9mm.details', { returnObjects: true })) ? t('pistol_karabina_9mm.details', { returnObjects: true }) as string[] : []
    },
    {
      name: t('long_guns.name', { returnObjects: true }),
      desc: language === 'sk' ? "Zážitok z dlhých zbraní - brokovnica, AK47, AR15 a ďalšie." :
            language === 'en' ? "Experience with long guns - shotgun, AK47, AR15 and more." :
            language === 'de' ? "Erfahrung mit Langwaffen - Schrotflinte, AK47, AR15 und mehr." :
            "Опыт работы с длинноствольным оружием - дробовик, АК47, АР15 и многое другое.",
      price: "65€",
      weapons: Array.isArray(t('long_guns.details', { returnObjects: true })) ? t('long_guns.details', { returnObjects: true }) as string[] : []
    }
  ];

  const testimonials = language === 'en' ? [
    { name: "Martin D.", text: "I've never held a gun before. The instructor was great, explained everything and I felt 100% safe. Amazing adrenaline!" },
    { name: "Jana K.", text: "I got this as a gift. I was quite respectful, but the staff was so professional that the fear immediately disappeared. I recommend it to everyone." },
    { name: "Peter V.", text: "Great experience! Trying out the AK-47 and AR-15 live is completely different from the movies. I will definitely come back." }
  ] : language === 'de' ? [
    { name: "Martin D.", text: "Ich hatte noch nie zuvor eine Waffe in der Hand. Der Instruktor war super, hat alles erklärt und ich habe mich zu 100% sicher gefühlt. Wahnsinns-Adrenalin!" },
    { name: "Jana K.", text: "Ich habe es als Geschenk bekommen. Ich hatte großen Respekt, aber das Personal war so professionell, dass die Angst sofort verschwand. Ich kann es jedem empfehlen." },
    { name: "Peter V.", text: "Tolles Erlebnis! Eine AK-47 und AR-15 live auszuprobieren ist etwas ganz anderes als in Filmen. Ich werde definitiv wiederkommen." }
  ] : language === 'ru' ? [
    { name: "Мартин Д.", text: "Никогда раньше не держал в руках оружие. Инструктор был супер, все объяснил, и я чувствовал себя на 100% в безопасности. Удивительный адреналин!" },
    { name: "Яна К.", text: "Получила это в подарок. Я была очень осторожна, но персонал был настолько профессионален, что страх сразу исчез. Рекомендую всем." },
    { name: "Питер В.", text: "Отличный опыт! Попробовать АК-47 и АР-15 вживую - это совсем не то, что в кино. Я обязательно вернусь." }
  ] : [
    { name: "Martin D.", text: "Nikdy predtým som nedržal zbraň v ruke. Inštruktor bol super, všetko mi vysvetlil a cítil som sa 100% bezpečne. Úžasný adrenalín!" },
    { name: "Jana K.", text: "Dostala som to ako darček. Mala som rešpekt, ale prístup personálu bol taký profesionálny, že strach hneď opadol. Odporúčam každému." },
    { name: "Peter V.", text: "Skvelý zážitok! Vyskúšať si AK-47 a AR-15 naživo je niečo úplne iné ako vo filmoch. Určite sa sem ešte vrátim." }
  ];

  return (
    <div className="bg-[var(--color-tactical)] min-h-screen font-sans text-white selection:bg-[#D32F2F] selection:text-white pb-20">
      <header className="absolute top-0 left-0 right-0 z-50 py-6 px-4">
        <div className="max-w-6xl mx-auto flex justify-center md:justify-start">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/images/logohunterclubstrelnica.png" alt="Hunter Club Logo" className="h-12 w-auto" referrerPolicy="no-referrer" />
            <span className="text-2xl font-display tracking-wider font-bold text-white">
              <span className="text-[var(--color-safety)]">HUNTER</span> CLUB
            </span>
          </Link>
        </div>
      </header>

      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20 z-10"></div>
          <img
            src="https://i.postimg.cc/KzY6d5kq/Gemini-Generated-Image-oampdgoampdgoamp-(1)-(1).webp"
            alt="Shooting Experience"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Breadcrumbs items={[{ name: language === 'sk' ? 'Zážitková streľba' : language === 'en' ? 'Shooting Experience' : language === 'de' ? 'Schießerlebnis' : 'Стрелковый опыт' }]} />
              <h1 className="text-5xl md:text-[60px] md:leading-[66px] font-display uppercase italic mb-6 drop-shadow-2xl">
                {language === 'sk' ? <>STRIEĽAJTE ZO ZBRANÍ <br className="hidden md:block" /> <span className="text-[var(--color-safety)]">AJ BEZ ZBROJÁKU</span></> : 
                 language === 'en' ? <>SHOOT WEAPONS <br className="hidden md:block" /> <span className="text-[var(--color-safety)]">EVEN WITHOUT A LICENSE</span></> :
                 language === 'de' ? <>SCHIESSEN SIE <br className="hidden md:block" /> <span className="text-[var(--color-safety)]">AUCH OHNE WAFFENSCHEIN</span></> :
                 <>СТРЕЛЯЙТЕ ИЗ ОРУЖИЯ <br className="hidden md:block" /> <span className="text-[var(--color-safety)]">ДАЖЕ БЕЗ ЛИЦЕНЗИИ</span></>}
              </h1>
              <p className="text-[20px] leading-[28px] text-gray-200 mb-8 max-w-2xl mx-auto font-medium">
                {language === 'sk' ? "Zažite skutočný adrenalín v najväčšej krytej strelnici v Bratislave. Bezpečne a pod dohľadom profesionálov." :
                 language === 'en' ? "Experience real adrenaline in the largest indoor shooting range in Bratislava. Safely and under the supervision of professionals." :
                 language === 'de' ? "Erleben Sie echtes Adrenalin auf dem größten Indoor-Schießstand in Bratislava. Sicher und unter Aufsicht von Profis." :
                 "Испытайте настоящий адреналин в крупнейшем крытом тире Братиславы. Безопасно и под контролем профессионалов."}
              </p>
              
              <button
                onClick={scrollToPackages}
                className="bg-[#D32F2F] text-white px-8 py-4 md:px-10 md:py-5 rounded-sm font-display text-xl md:text-2xl font-bold tracking-widest hover:bg-red-700 transition-all shadow-[0_10px_30px_rgba(211,47,47,0.4)] uppercase italic flex items-center justify-center gap-3 mx-auto hover:scale-105 active:scale-95"
              >
                {language === 'sk' ? "CHCEM ZAŽIŤ STREĽBU" : language === 'en' ? "I WANT TO EXPERIENCE SHOOTING" : language === 'de' ? "ICH MÖCHTE SCHIESSEN ERLEBEN" : "Я ХОЧУ ПОПРОБОВАТЬ СТРЕЛЬБУ"} <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 p-6 flex items-start gap-4 rounded-sm"
            >
              <ShieldCheck className="w-8 h-8 text-[var(--color-safety)] shrink-0" />
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-1">
                  {language === 'sk' ? "Bez Zbrojného Preukazu" : language === 'en' ? "Without a Firearms License" : language === 'de' ? "Ohne Waffenschein" : "Без оружейной лицензии"}
                </h3>
                <p className="text-xs text-gray-200 leading-relaxed font-medium">
                  {language === 'sk' ? "Nepotrebujete žiadne povolenia. Stačí občiansky preukaz a vek 18+." : language === 'en' ? "You don't need any permits. An ID card and age 18+ are enough." : language === 'de' ? "Sie benötigen keine Genehmigungen. Ein Ausweis und ein Alter von 18+ reichen aus." : "Вам не нужны никакие разрешения. Достаточно удостоверения личности и возраста 18+."}
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 p-6 flex items-start gap-4 rounded-sm"
            >
              <UserCheck className="w-8 h-8 text-[var(--color-safety)] shrink-0" />
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-1">
                  {language === 'sk' ? "Profesionálny Inštruktor" : language === 'en' ? "Professional Instructor" : language === 'de' ? "Professioneller Instruktor" : "Профессиональный инструктор"}
                </h3>
                <p className="text-xs text-gray-200 leading-relaxed font-medium">
                  {language === 'sk' ? "Po celú dobu sa vám bude venovať skúsený odborník." : language === 'en' ? "An experienced professional will take care of you the whole time." : language === 'de' ? "Ein erfahrener Fachmann wird sich die ganze Zeit um Sie kümmern." : "Опытный специалист будет заботиться о вас все время."}
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 p-6 flex items-start gap-4 rounded-sm"
            >
              <Shield className="w-8 h-8 text-[var(--color-safety)] shrink-0" />
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-1">
                  {language === 'sk' ? "100% Bezpečnosť" : language === 'en' ? "100% Safety" : language === 'de' ? "100% Sicherheit" : "100% Безопасность"}
                </h3>
                <p className="text-xs text-gray-200 leading-relaxed font-medium">
                  {language === 'sk' ? "Najvyššie štandardy bezpečnosti a špičkové vybavenie." : language === 'en' ? "The highest safety standards and top equipment." : language === 'de' ? "Die höchsten Sicherheitsstandards und Top-Ausrüstung." : "Высочайшие стандарты безопасности и лучшее оборудование."}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={packagesRef} className="py-20 px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-display uppercase italic mb-6">
              {language === 'sk' ? <>Vyberte si svoj <span className="text-[var(--color-safety)]">Zážitok</span></> : 
               language === 'en' ? <>Choose your <span className="text-[var(--color-safety)]">Experience</span></> : 
               language === 'de' ? <>Wählen Sie Ihr <span className="text-[var(--color-safety)]">Erlebnis</span></> : 
               <>Выберите свой <span className="text-[var(--color-safety)]">Опыт</span></>}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
              {language === 'sk' ? "Všetko potrebné (zbrane, strelivo, inštruktor, ochrana zraku a sluchu) je už zahrnuté v cene." :
               language === 'en' ? "Everything you need (weapons, ammunition, instructor, eye and ear protection) is included in the price." :
               language === 'de' ? "Alles was Sie brauchen (Waffen, Munition, Instruktor, Augen- und Gehörschutz) ist im Preis inbegriffen." :
               "Все необходимое (оружие, боеприпасы, инструктор, защита для глаз и ушей) уже включено в цену."}
            </p>
            <p className="text-sm text-gray-400">
              {language === 'sk' ? "Ceny vrátane DPH 23%" : language === 'en' ? "Prices include 23% VAT" : language === 'de' ? "Preise inklusive 23% MwSt." : "Цены включают НДС 23%"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`relative bg-[var(--color-forest)] rounded-sm border ${pkg.popular ? 'border-[var(--color-safety)] shadow-[0_0_40px_rgba(251,188,5,0.15)] transform lg:-translate-y-4' : 'border-white/10'} p-8 md:p-10 overflow-hidden flex flex-col h-full`}
              >
                <div className="absolute inset-0 tactical-mosaic opacity-10 pointer-events-none"></div>
                
                {pkg.popular && (
                  <div className="absolute top-0 inset-x-0 bg-[var(--color-safety)] text-black text-center py-1.5 font-bold tracking-widest text-xs uppercase">
                    {language === 'sk' ? "Najpredávanejší Balík" : language === 'en' ? "Best Selling Package" : language === 'de' ? "Meistverkauftes Paket" : "Самый продаваемый пакет"}
                  </div>
                )}

                <div className="relative z-10 flex-grow flex flex-col">
                  <h3 className={`text-4xl font-display uppercase italic mb-3 ${pkg.popular ? 'mt-4' : ''}`}>{pkg.name}</h3>
                  <p className="text-gray-300 text-base mb-8 min-h-[60px]">{pkg.desc}</p>
                  
                  <div className="text-6xl font-display text-[var(--color-safety)] mb-10">
                    {pkg.price}
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {pkg.weapons?.map((weapon, wIdx) => (
                      <li key={wIdx} className="flex items-start gap-4 text-base">
                        <Check className="w-6 h-6 text-[var(--color-safety)] shrink-0" />
                        <span className="text-white font-medium">{weapon}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setIsReservationModalOpen(true)}
                    className="w-full bg-[#D32F2F] text-white py-5 rounded-sm font-display text-2xl font-bold tracking-widest hover:bg-red-700 transition-colors uppercase italic mt-auto shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {language === 'sk' ? "CHCEM ZAŽIŤ STREĽBU" : language === 'en' ? "I WANT TO EXPERIENCE SHOOTING" : language === 'de' ? "ICH MÖCHTE SCHIESSEN ERLEBEN" : "Я ХОЧУ ПОПРОБОВАТЬ СТРЕЛЬБУ"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black/40 relative z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display uppercase italic mb-6">
              {language === 'sk' ? <>Čo hovoria naši <span className="text-[var(--color-safety)]">Zákazníci</span></> :
               language === 'en' ? <>What our <span className="text-[var(--color-safety)]">Customers</span> say</> :
               language === 'de' ? <>Was unsere <span className="text-[var(--color-safety)]">Kunden</span> sagen</> :
               <>Что говорят наши <span className="text-[var(--color-safety)]">Клиенты</span></>}
            </h2>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-8 h-8 text-[var(--color-safety)] fill-[var(--color-safety)]" />)}
            </div>
            <p className="text-gray-300 font-bold tracking-widest uppercase text-base">
              {language === 'sk' ? "Viac ako 10,000 spokojných strelcov" : language === 'en' ? "More than 10,000 satisfied shooters" : language === 'de' ? "Mehr als 10.000 zufriedene Schützen" : "Более 10 000 довольных стрелков"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-[var(--color-forest)] p-8 md:p-10 rounded-sm border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 tactical-mosaic opacity-10 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-[var(--color-safety)] fill-[var(--color-safety)]" />)}
                  </div>
                  <p className="text-gray-200 italic mb-8 text-lg leading-relaxed">"{test.text}"</p>
                  <p className="text-[var(--color-safety)] font-bold uppercase tracking-wider text-base">— {test.name}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <button
              onClick={() => setIsReservationModalOpen(true)}
              className="bg-[#D32F2F] text-white px-10 py-5 md:px-16 md:py-6 rounded-sm font-display text-2xl md:text-3xl font-bold tracking-widest hover:bg-red-700 transition-all shadow-[0_10px_40px_rgba(211,47,47,0.5)] uppercase italic inline-flex items-center justify-center gap-4 hover:scale-105 active:scale-95 w-full md:w-auto"
            >
              {language === 'sk' ? "CHCEM ZAŽIŤ STREĽBU" : language === 'en' ? "I WANT TO EXPERIENCE SHOOTING" : language === 'de' ? "ICH MÖCHTE SCHIESSEN ERLEBEN" : "Я ХОЧУ ПОПРОБОВАТЬ СТРЕЛЬБУ"} <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 relative z-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Link 
            to="/darcekovy-poukaz" 
            className="inline-flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
          >
            <Gift className="w-5 h-5 text-[var(--color-safety)] group-hover:scale-110 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-sm underline underline-offset-4 decoration-white/20 hover:decoration-[var(--color-safety)]">
              {language === 'sk' ? "Hľadáte darček? Kúpte darčekový poukaz" : language === 'en' ? "Looking for a gift? Buy a gift voucher" : language === 'de' ? "Suchen Sie ein Geschenk? Kaufen Sie einen Gutschein" : "Ищете подарок? Купите подарочный сертификат"}
            </span>
          </Link>
        </div>
      </section>

      <ReservationModal isOpen={isReservationModalOpen} onClose={() => setIsReservationModalOpen(false)} />

      <AnimatePresence>
        {showGiftPopup && (
          <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="bg-[var(--color-forest)] border border-[var(--color-safety)]/50 p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="absolute inset-0 tactical-mosaic opacity-10 pointer-events-none"></div>
              <button 
                onClick={() => setShowGiftPopup(false)}
                className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[var(--color-safety)]/10 p-3 rounded-full">
                    <Gift className="w-8 h-8 text-[var(--color-safety)]" />
                  </div>
                  <h4 className="text-white font-display uppercase italic text-2xl leading-tight">
                    {language === 'sk' ? <>Darčekový<br/>Poukaz</> : language === 'en' ? <>Gift<br/>Voucher</> : language === 'de' ? <>Geschenk<br/>Gutschein</> : <>Подарочный<br/>Сертификат</>}
                  </h4>
                </div>
                
                <p className="text-gray-300 text-base mb-6 leading-relaxed">
                  {language === 'sk' ? "Ešte nie ste rozhodnutí? Darujte tento zážitok niekomu blízkemu. Platnosť poukazu je 12 mesiacov." :
                   language === 'en' ? "Not decided yet? Gift this experience to someone close. Voucher is valid for 12 months." :
                   language === 'de' ? "Noch nicht entschieden? Schenken Sie dieses Erlebnis jemandem, der Ihnen nahe steht. Der Gutschein ist 12 Monate gültig." :
                   "Еще не решили? Подарите этот опыт кому-то из близких. Сертификат действителен 12 месяцев."}
                </p>
                
                <Link 
                  to="/darcekovy-poukaz"
                  className="block w-full text-center bg-white/10 hover:bg-white/20 text-white py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors border border-white/10"
                >
                  {language === 'sk' ? "Zistiť viac o poukazoch" : language === 'en' ? "Find out more about vouchers" : language === 'de' ? "Mehr über Gutscheine erfahren" : "Узнать больше о сертификатах"}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
`
fs.writeFileSync('src/pages/Action.tsx', content);
