import Breadcrumbs from '../components/Breadcrumbs';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 md:pt-40 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Ochrana osobných údajov' }]} />
      <h1 className="text-5xl font-display mb-8">Ochrana osobných údajov</h1>
      <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
        <p>Vaše súkromie je pre nás dôležité. Tieto zásady vysvetľujú, ako zhromažďujeme a spracovávame vaše osobné údaje v súlade s nariadením GDPR.</p>
        <h2 className="text-2xl font-display text-white mt-8">1. Zhromažďované údaje</h2>
        <p>Zhromažďujeme údaje potrebné pre rezerváciu termínu a poskytovanie našich služieb, najmä meno, priezvisko, email a telefónne číslo.</p>
        <h2 className="text-2xl font-display text-white mt-8">2. Účel spracovania</h2>
        <p>Údaje spracovávame výhradne za účelom vybavenia vašej rezervácie, komunikácie s vami a plnenia zákonných povinností súvisiacich s prevádzkou strelnice.</p>
        <h2 className="text-2xl font-display text-white mt-8">3. Vaše práva</h2>
        <p>Máte právo na prístup k svojim údajom, ich opravu, vymazanie alebo obmedzenie spracovania. V prípade otázok nás kontaktujte na info@hunterclub.sk.</p>
      </div>
    </div>
  );
}
