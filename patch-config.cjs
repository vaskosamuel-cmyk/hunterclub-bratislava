const fs = require('fs');
let code = fs.readFileSync('public/admin/config.yml', 'utf8');

const replacement = `collections:
  - name: "aktuality"
    label: "Aktuality (Žlté okno)"
    files:
      - name: "oznam"
        label: "Aktuálny oznam"
        file: "public/content/aktuality.json"
        fields:
          - {label: "Zobraziť oznam", name: "show", widget: "boolean", default: true}
          - {label: "Text oznamu", name: "text", widget: "string"}
`;

code = code.replace('collections:', replacement);
fs.writeFileSync('public/admin/config.yml', code);
console.log('done config');
