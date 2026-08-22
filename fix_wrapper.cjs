const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');

const oldWrapper = `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10">
          <TrustBox language={language} />
        </div>`;
        
const newWrapper = `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-xl border border-gray-100">
            <TrustBox language={language} />
          </div>
        </div>`;

content = content.replace(oldWrapper, newWrapper);

fs.writeFileSync('src/components/Layout.tsx', content);
