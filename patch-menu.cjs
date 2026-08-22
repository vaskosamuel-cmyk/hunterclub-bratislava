const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// We need a state for mobile dropdown
if (!code.includes('mobileDropdownOpen')) {
  code = code.replace(/const \[isLangOpen, setIsLangOpen\] = useState\(false\);/, 
    'const [isLangOpen, setIsLangOpen] = useState(false);\n  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<Record<string, boolean>>({});');
}

// Update the mobile menu rendering for dropdown
const oldMobileDropdown = `                  <Link
                    to={item.href}
                    className={clsx(
                      'block px-3 py-3 rounded-xl text-base font-bold uppercase tracking-widest transition-colors flex items-center justify-between',
                      location.pathname === item.href
                        ? 'bg-[var(--color-safety)] text-[var(--color-tactical)] shadow-lg'
                        : 'text-white hover:bg-black/10 hover:text-white'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="w-5 h-5" />}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-6 space-y-1 mt-1 mb-2">
                      {item.dropdown.map((dropItem) => (
                        <Link`;

const newMobileDropdown = `                  <div className="flex items-center">
                    <Link
                      to={item.href}
                      className={clsx(
                        'block px-3 py-3 rounded-xl text-base font-bold uppercase tracking-widest transition-colors flex-grow',
                        location.pathname === item.href
                          ? 'bg-[var(--color-safety)] text-[var(--color-tactical)] shadow-lg'
                          : 'text-white hover:bg-black/10 hover:text-white'
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <button 
                        className="p-3 text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileDropdownOpen(prev => ({ ...prev, [item.name]: !prev[item.name] }));
                        }}
                      >
                        <ChevronDown className={\`w-5 h-5 transition-transform \${mobileDropdownOpen[item.name] ? 'rotate-180' : ''}\`} />
                      </button>
                    )}
                  </div>
                  {item.dropdown && mobileDropdownOpen[item.name] && (
                    <div className="pl-6 space-y-1 mt-1 mb-2">
                      {item.dropdown.map((dropItem) => (
                        <Link`;

if (code.includes('onClick={() => setIsMenuOpen(false)}')) {
  // Let's replace more accurately
  // Find the exact mobile map block
}
