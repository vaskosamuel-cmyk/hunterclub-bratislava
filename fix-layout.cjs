const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// The corrupted part starts around line 275 and ends at `{(megaMenu || (item.dropdown && item.dropdown.length > 0)) && !closedDropdowns[item.name] && (`
// Let's find the start of `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">`
// Wait, my replacement for `relative` replaced `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` with `... relative`.
// But the corrupted block replaced all the way from the first `<Link` to the indicator line.
// Let's just use string replacement from `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">` 
// up to `{(megaMenu` and overwrite it completely.

const startMarker = '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">';
const endMarker = '{(megaMenu || (item.dropdown && item.dropdown.length > 0)) && !closedDropdowns[item.name] && (';

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error("Markers not found");
    process.exit(1);
}

const newBlock = `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={clsx(
            "flex items-center transition-all duration-300",
            isScrolled || isMenuOpen || isHovered ? "h-20" : "h-20 md:h-24"
          )}>
            <div className="flex-1 min-w-0 flex items-center mr-2 sm:mr-4">
              <Link 
                to="/" 
                className={clsx(
                  "flex items-center gap-2 sm:gap-3 group transition-all duration-300 max-w-full",
                  isScrolled || isMenuOpen || isHovered 
                    ? "hover:scale-[1.02]" 
                    : ""
                )}
              >
                <div className="bg-white rounded-full p-1 shadow-md shrink-0">
                  <img 
                    src="/images/logohunterclubstrelnica.png" 
                    alt="Hunter Club Logo" 
                    className={clsx(
                      "w-auto transition-all duration-300 rounded-full",
                      isScrolled || isMenuOpen || isHovered ? "h-10" : "h-10 md:h-12"
                    )}
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <span className={clsx(
                  "font-display tracking-wider font-bold transition-all duration-300 leading-tight",
                  isScrolled || isMenuOpen || isHovered ? "text-sm sm:text-base md:text-xl text-white" : "text-base sm:text-lg md:text-2xl text-white",
                  "whitespace-normal max-w-[130px] sm:max-w-[200px] lg:max-w-none"
                )}>
                  {t('brandName')}
                </span>
              </Link>
            </div>
            
            <div className="flex-none flex items-center justify-end">
              <nav className="hidden xl:flex space-x-2 lg:space-x-4 h-full items-center mr-8">
                {navigation.map((item) => {
                  const TopIcon = item.topIcon;
                  const megaMenu = (item as any).megaMenu;
                  
                  return (
                  <div 
                    key={item.name} 
                    className="group h-full flex items-center"
                    onMouseEnter={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: false }))}
                    onMouseLeave={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: false }))}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))}
                      className={clsx(
                        'relative h-full transition-colors py-2 flex items-center gap-3 px-3 rounded-lg',
                        location.pathname === item.href ? 'text-[var(--color-safety)] bg-black/20' : 'text-gray-300 hover:text-white hover:bg-white/5'
                      )}
                    >
                      {TopIcon && <TopIcon className="w-5 h-5 text-[var(--color-safety)] opacity-80 group-hover:opacity-100 transition-opacity" />}
                      <div className="flex flex-col">
                        <span className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-white">
                          {item.name}
                          {(megaMenu || item.dropdown?.length > 0) && <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-[var(--color-safety)] transition-colors" />}
                        </span>
                        {item.subtitle && <span className="text-[10px] text-gray-400 uppercase tracking-widest">{item.subtitle}</span>}
                      </div>
                      {/* Active Indicator Line */}
                      {location.pathname === item.href && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-[var(--color-safety)] rounded-t-sm"></div>
                      )}
                    </Link>
                    
                    `;

code = code.substring(0, startIndex) + newBlock + code.substring(endIndex);
fs.writeFileSync('src/components/Layout.tsx', code);
console.log("Fixed Layout");
