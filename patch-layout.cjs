const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

if (!code.includes('mobileDropdownOpen')) {
  code = code.replace(
    /const \[isLangOpen, setIsLangOpen\] = useState\(false\);/, 
    'const [isLangOpen, setIsLangOpen] = useState(false);\n  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<Record<string, boolean>>({});'
  );
}

const target = `              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={clsx(
                      'px-3 py-2 rounded-md text-lg font-medium uppercase tracking-wider flex items-center justify-between',
                      location.pathname === item.href
                        ? 'bg-black/20 text-white'
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
                        <Link
                          key={dropItem.name}
                          to={dropItem.href}
                          className="block px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider text-gray-300 hover:bg-black/10 hover:text-white"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}`;

const replacement = `              {navigation.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center">
                    <Link
                      to={item.href}
                      className={clsx(
                        'flex-grow px-3 py-2 rounded-md text-lg font-medium uppercase tracking-wider flex items-center justify-between',
                        location.pathname === item.href
                          ? 'bg-black/20 text-white'
                          : 'text-white hover:bg-black/10 hover:text-white'
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileDropdownOpen(prev => ({ ...prev, [item.name]: !prev[item.name] }));
                        }}
                        className="p-2 text-white hover:bg-black/10 rounded-md ml-2"
                      >
                        <ChevronDown className={\`w-5 h-5 transition-transform \${mobileDropdownOpen[item.name] ? 'rotate-180' : ''}\`} />
                      </button>
                    )}
                  </div>
                  {item.dropdown && mobileDropdownOpen[item.name] && (
                    <div className="pl-6 space-y-1 mt-1 mb-2">
                      {item.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          to={dropItem.href}
                          className="block px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider text-gray-300 hover:bg-black/10 hover:text-white"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}`;

if (code.includes('              {navigation.map((item) => (')) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/Layout.tsx', code);
  console.log("Success");
} else {
  console.log("Not found");
}
