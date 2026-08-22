const fs = require('fs');
let code = fs.readFileSync('src/constants/packages.ts', 'utf8');

// Update prices
code = code.replace(/name: 'Balíček „Hunter Pištoľ\/Puška – 22LR“', price: '29€'/, "name: 'Balíček „Hunter Pištoľ/Puška – 22LR“', price: '35€'");
code = code.replace(/name: 'Balíček „Hunter Pištoľ\/Karabina, 9mm Luger“', price: '35€'/, "name: 'Balíček „Hunter Pištoľ/Karabina, 9mm Luger“', price: '45€'");
code = code.replace(/name: 'Balíček HUNTER „Krátke zbrane“', price: '35€'/, "name: 'Balíček HUNTER „Krátke zbrane“', price: '45€'");
code = code.replace(/name: 'Balíček „Hunter Pištoľ 45AUTO\/40S&W\/357SIG\/10mm AUTO“', price: '40€'/, "name: 'Balíček „Hunter Pištoľ 45AUTO/40S&W/357SIG/10mm AUTO“', price: '49€'");
code = code.replace(/name: 'Balíček „Hunter Revolver – 38Spec.\/357MAG\/44MAG“', price: '40€'/, "name: 'Balíček „Hunter Revolver – 38Spec./357MAG/44MAG“', price: '49€'");
code = code.replace(/name: 'Balíček „Hunter AR15\/AK47“', price: '45€'/, "name: 'Balíček „Hunter AR15/AK47“', price: '55€'");
code = code.replace(/name: 'Balíček „HUNTER CHICAGO“', price: '45€'/, "name: 'Balíček „HUNTER CHICAGO“', price: '55€'");
code = code.replace(/name: 'Balíček HUNTER „CZ“', price: '49€'/, "name: 'Balíček HUNTER „CZ“', price: '55€'");
code = code.replace(/name: 'Balíček HUNTER „SLOVENSKO\/SLOVAKIA“', price: '49€'/, "name: 'Balíček HUNTER „SLOVENSKO/SLOVAKIA“', price: '55€'");
code = code.replace(/name: 'Balíček HUNTER „West blok“', price: '49€'/, "name: 'Balíček HUNTER „West blok“', price: '55€'");
code = code.replace(/name: 'Balíček HUNTER „Military“', price: '49€'/, "name: 'Balíček HUNTER „Military“', price: '55€'");
code = code.replace(/name: 'Balíček HUNTER „Kalashnikov“', price: '49€'/, "name: 'Balíček HUNTER „Kalashnikov“', price: '55€'");
code = code.replace(/name: 'HUNTER GLOCK kal\. 9×19', price: '59€'/, "name: 'HUNTER GLOCK kal. 9×19', price: '69€'");
code = code.replace(/name: 'Balíček HUNTER „Dlhé zbrane“', price: '65€'/, "name: 'Balíček HUNTER „Dlhé zbrane“', price: '75€'");
code = code.replace(/name: 'Balíček HUNTER „LEGENDARY“', price: '69€'/, "name: 'Balíček HUNTER „LEGENDARY“', price: '79€'");
code = code.replace(/name: 'HUNTER GLOCK Multikaliber', price: '79€'/, "name: 'HUNTER GLOCK Multikaliber', price: '89€'");
code = code.replace(/name: 'Balíček HUNTER „LEGENDARY EXTRA“', price: '99€'/, "name: 'Balíček HUNTER „LEGENDARY EXTRA“', price: '109€'");
code = code.replace(/name: 'Balíček HUNTER „Exclusive“', price: '135€'/, "name: 'Balíček HUNTER „Exclusive“', price: '149€'");

fs.writeFileSync('src/constants/packages.ts', code);
