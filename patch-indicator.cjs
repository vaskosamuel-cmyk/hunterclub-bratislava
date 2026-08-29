const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// 1. We replace the Link to include `relative h-full` and move the indicator line inside it.
// Here's what it looks like currently:
/*
                    <Link
                      to={item.href}
                      onClick={() => setClosedDropdowns(prev => ({ ...prev, [item.name]: true }))}
                      className={clsx(
                        'transition-colors py-2 flex items-center gap-3 px-3 rounded-lg',
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
                    </Link>
                    
                    {/* Active Indicator Line *\/}
                    {location.pathname === item.href && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-[var(--color-safety)] rounded-t-sm"></div>
                    )}
*/

const targetRegex = /<Link[\s\S]*?className=\{clsx\([\s\S]*?'transition-colors py-2 flex items-center gap-3 px-3 rounded-lg',[\s\S]*?\)[\s\S]*?>[\s\S]*?<\/Link>[\s\S]*?\{\/\* Active Indicator Line \*\/\}[\s\S]*?<\/div>\n\s*\)}/m;

const replacement = `<Link
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
                    </Link>`;

if (targetRegex.test(code)) {
    code = code.replace(targetRegex, replacement);
    fs.writeFileSync('src/components/Layout.tsx', code);
    console.log("Success");
} else {
    console.log("Failed to match regex");
}
