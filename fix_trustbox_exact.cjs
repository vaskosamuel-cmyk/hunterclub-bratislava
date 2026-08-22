const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');

const newTrustBox = `function TrustBox() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadWidget = () => {
      if (typeof window !== 'undefined' && (window as any).Trustpilot && ref.current) {
        try {
          (window as any).Trustpilot.loadFromElement(ref.current, true);
        } catch (e) {
          console.error("Trustpilot load error", e);
        }
      }
    };

    loadWidget();
    
    let attempts = 0;
    const interval = setInterval(() => {
      if ((window as any).Trustpilot) {
        loadWidget();
        clearInterval(interval);
      }
      attempts++;
      if (attempts > 10) clearInterval(interval);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="trustpilot-widget" 
      ref={ref} 
      data-locale="en-US" 
      data-template-id="56278e9abfbbba0bdcd568bc" 
      data-businessunit-id="6749bb127a770a6694f98344" 
      data-style-height="52px" 
      data-style-width="100%" 
      data-token="68693b31-0c27-414a-b3bd-969ac1d46fcb"
    >
      <a href="https://www.trustpilot.com/review/hunterclub.sk" target="_blank" rel="noopener">Trustpilot</a>
    </div>
  );
}`;

content = content.replace(/function TrustBox\([^\)]*\)\s*\{[\s\S]+?\}\n\nexport default function Layout/, newTrustBox + '\n\nexport default function Layout');
content = content.replace(/<TrustBox language=\{language\} \/>/g, '<TrustBox />');

fs.writeFileSync('src/components/Layout.tsx', content);
