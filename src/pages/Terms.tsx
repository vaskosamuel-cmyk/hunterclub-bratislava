import Breadcrumbs from '../components/Breadcrumbs';

export default function Terms() {
  return (
    <div className="pt-32 md:pt-40 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Obchodné podmienky' }]} />
      <h1 className="text-5xl font-display mb-8">Obchodné podmienky</h1>
      <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
        <p>Tieto obchodné podmienky upravujú vzťah medzi prevádzkovateľom strelnice Hunter Club a jej návštevníkmi.</p>
        <h2 className="text-2xl font-display text-white mt-8">1. Rezervácie</h2>
        <p>Rezervácia termínu je záväzná. Zrušenie rezervácie je možné najneskôr 24 hodín pred dohodnutým termínom.</p>
        <h2 className="text-2xl font-display text-white mt-8">2. Bezpečnosť</h2>
        <p>Každý návštevník je povinný dodržiavať prevádzkový poriadok strelnice a pokyny inštruktora. Porušenie bezpečnostných pravidiel môže viesť k okamžitému vykázaniu zo strelnice.</p>
        <h2 className="text-2xl font-display text-white mt-8">3. Platobné podmienky</h2>
        <p>Platba za služby prebieha na mieste v hotovosti alebo kartou, prípadne vopred prostredníctvom darčekových poukazov.</p>
      </div>
    </div>
  );
}
