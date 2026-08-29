const fs = require('fs');
let code = fs.readFileSync('public/admin/config.yml', 'utf8');

const search = `  - name: "aktuality"
    label: "Aktuality (Žlté okno)"
    files:
      - name: "oznam"
        label: "Aktuálny oznam"
        file: "public/content/aktuality.json"
        fields:
          - {label: "Zobraziť oznam", name: "show", widget: "boolean", default: true}
          - {label: "Text oznamu", name: "text", widget: "string"}`;

const replace = `  - name: "aktuality"
    label: "Aktuality (Žlté okno)"
    files:
      - name: "oznam"
        label: "Aktuálny oznam"
        file: "public/content/aktuality.json"
        format: "json"
        fields:
          - {label: "Zobraziť oznam", name: "show", widget: "boolean", default: false, required: false}
          - {label: "Text oznamu", name: "text", widget: "text", required: false}`;

code = code.replace(search, replace);
fs.writeFileSync('public/admin/config.yml', code);
