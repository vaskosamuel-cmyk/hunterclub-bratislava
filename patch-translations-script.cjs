const fs = require('fs');

const data = {
  cz_package: {
    sk: { name: 'Balíček „CZ“', details: ['10 výstrelov puška CZ512, kal. 22LR', '10 výstrelov pištoľ CZ Shadow, kal. 9mm Luger', '10 výstrelov pištoľ CZ P-09, kal. 9mm Luger', '10 výstrelov karabína CZ EVO3, kal. 9mm Luger'] },
    de: { name: 'Paket „CZ“', details: ['10 Schuss Gewehr CZ512, Kal. 22LR', '10 Schuss Pistole CZ Shadow, Kal. 9mm Luger', '10 Schuss Pistole CZ P-09, Kal. 9mm Luger', '10 Schuss Karabiner CZ EVO3, Kal. 9mm Luger'] },
    en: { name: 'Package „CZ“', details: ['10 shots CZ512 rifle, .22LR cal.', '10 shots CZ Shadow pistol, 9mm Luger cal.', '10 shots CZ P-09 pistol, 9mm Luger cal.', '10 shots CZ EVO3 carbine, 9mm Luger cal.'] },
    ru: { name: 'Пакет „CZ“', details: ['10 выстрелов из винтовки CZ512, калибр 22LR', '10 выстрелов из пистолета CZ Shadow, калибр 9mm Luger', '10 выстрелов из пистолета CZ P-09, калибр 9mm Luger', '10 выстрелов из карабина CZ EVO3, калибр 9mm Luger'] }
  },
  slovakia_package: {
    sk: { name: 'Balíček „SLOVENSKO/SLOVAKIA“', details: ['10 výstrelov pištoľ Grand Power K100, kal. 9mm Luger', '10 výstrelov pištoľ Grand Power Q100, kal. 9mm Luger', '10 výstrelov karabína Stribog, kal. 9mm Luger'] },
    de: { name: 'Paket „SLOWAKEI/SLOVAKIA“', details: ['10 Schuss Pistole Grand Power K100, Kal. 9mm Luger', '10 Schuss Pistole Grand Power Q100, Kal. 9mm Luger', '10 Schuss Karabiner Stribog, Kal. 9mm Luger'] },
    en: { name: 'Package „SLOVAKIA“', details: ['10 shots Grand Power K100 pistol, 9mm Luger cal.', '10 shots Grand Power Q100 pistol, 9mm Luger cal.', '10 shots Stribog carbine, 9mm Luger cal.'] },
    ru: { name: 'Пакет „СЛОВАКИЯ/SLOVAKIA“', details: ['10 выстрелов из пистолета Grand Power K100, калибр 9mm Luger', '10 выстрелов из пистолета Grand Power Q100, калибр 9mm Luger', '10 выстрелов из карабина Stribog, калибр 9mm Luger'] }
  },
  legendary_extra: {
    sk: { name: 'Balíček „LEGENDARY EXTRA“', details: ['10 výstrelov pištoľ Glock 17 gen.5, kal. 9mm Luger', '8 výstrelov pištoľ RUGER 1911, kal. 45ACP', '10 výstrelov karabína CZ EVO3, kal. 9mm Luger', '10 výstrelov Sig Sauer M400 / AR15, kal. 223REM', '10 výstrelov AK47 / Kalašnikov, kal. 7,62x39', '6 výstrelov revolver S&W, kal. 44MAG', '5 výstrelov brokovnica pumpa, kal. 12GA'] },
    de: { name: 'Paket „LEGENDARY EXTRA“', details: ['10 Schuss Pistole Glock 17 Gen.5, Kal. 9mm Luger', '8 Schuss Pistole RUGER 1911, Kal. 45ACP', '10 Schuss Karabiner CZ EVO3, Kal. 9mm Luger', '10 Schuss Sig Sauer M400 / AR15, Kal. 223REM', '10 Schuss AK47 / Kalaschnikow, Kal. 7,62x39', '6 Schuss Revolver S&W, Kal. 44MAG', '5 Schuss Pump-Action-Schrotflinte, Kal. 12GA'] },
    en: { name: 'Package „LEGENDARY EXTRA“', details: ['10 shots Glock 17 gen.5 pistol, 9mm Luger cal.', '8 shots RUGER 1911 pistol, .45ACP cal.', '10 shots CZ EVO3 carbine, 9mm Luger cal.', '10 shots Sig Sauer M400 / AR15, .223REM cal.', '10 shots AK47 / Kalashnikov, 7.62x39 cal.', '6 shots S&W revolver, .44MAG cal.', '5 shots pump shotgun, 12GA cal.'] },
    ru: { name: 'Пакет „ЛЕГЕНДА ЭКСТРА“', details: ['10 выстрелов из пистолета Glock 17 gen.5, калибр 9mm Luger', '8 выстрелов из пистолета RUGER 1911, калибр 45ACP', '10 выстрелов из карабина CZ EVO3, калибр 9mm Luger', '10 выстрелов из Sig Sauer M400 / AR15, калибр 223REM', '10 выстрелов из AK47 / Калашников, калибр 7,62x39', '6 выстрелов из револьвера S&W, калибр 44MAG', '5 выстрелов из помпового ружья, калибр 12GA'] }
  },
  legendary: {
    sk: { name: 'Balíček „LEGENDARY“', details: ['10 výstrelov pištoľ Glock 19 gen.5, kal. 9mm Luger', '8 výstrelov pištoľ RUGER 1911, kal. 45ACP', '10 výstrelov karabína CZ EVO3, kal. 9mm Luger', '10 výstrelov Sig Sauer M400 / AR15, kal. 223REM', '10 výstrelov AK47 / Kalašnikov, kal. 7,62x39'] },
    de: { name: 'Paket „LEGENDARY“', details: ['10 Schuss Pistole Glock 19 Gen.5, Kal. 9mm Luger', '8 Schuss Pistole RUGER 1911, Kal. 45ACP', '10 Schuss Karabiner CZ EVO3, Kal. 9mm Luger', '10 Schuss Sig Sauer M400 / AR15, Kal. 223REM', '10 Schuss AK47 / Kalaschnikow, Kal. 7,62x39'] },
    en: { name: 'Package „LEGENDARY“', details: ['10 shots Glock 19 gen.5 pistol, 9mm Luger cal.', '8 shots RUGER 1911 pistol, .45ACP cal.', '10 shots CZ EVO3 carbine, 9mm Luger cal.', '10 shots Sig Sauer M400 / AR15, .223REM cal.', '10 shots AK47 / Kalashnikov, 7.62x39 cal.'] },
    ru: { name: 'Пакет „ЛЕГЕНДА“', details: ['10 выстрелов из пистолета Glock 19 gen.5, калибр 9mm Luger', '8 выстрелов из пистолета RUGER 1911, калибр 45ACP', '10 выстрелов из карабина CZ EVO3, калибр 9mm Luger', '10 выстрелов из Sig Sauer M400 / AR15, калибр 223REM', '10 выстрелов из AK47 / Калашников, калибр 7,62x39'] }
  },
  kalashnikov: {
    sk: { name: 'Balíček „Kalashnikov“', details: ['10 výstrelov AK47 / Kalašnikov, kal. 7,62x39', '10 výstrelov samopal VZ58, kal. 7,62x39', '10 výstrelov karabína CZ EVO3, kal. 9mm Luger'] },
    de: { name: 'Paket „Kalashnikov“', details: ['10 Schuss AK47 / Kalaschnikow, Kal. 7,62x39', '10 Schuss Maschinenpistole VZ58, Kal. 7,62x39', '10 Schuss Karabiner CZ EVO3, Kal. 9mm Luger'] },
    en: { name: 'Package „Kalashnikov“', details: ['10 shots AK47 / Kalashnikov, 7.62x39 cal.', '10 shots VZ58 submachine gun, 7.62x39 cal.', '10 shots CZ EVO3 carbine, 9mm Luger cal.'] },
    ru: { name: 'Пакет „Калашников“', details: ['10 выстрелов из AK47 / Калашников, калибр 7,62x39', '10 выстрелов из пистолета-пулемета VZ58, калибр 7,62x39', '10 выстрелов из карабина CZ EVO3, калибр 9mm Luger'] }
  },
  military: {
    sk: { name: 'Balíček „Military“', details: ['10 výstrelov pištoľ CZ P-09, kal. 9mm Luger', '10 výstrelov samopal VZ58, kal. 7,62x39', '10 výstrelov karabína CZ EVO3, kal. 9mm Luger'] },
    de: { name: 'Paket „Military“', details: ['10 Schuss Pistole CZ P-09, Kal. 9mm Luger', '10 Schuss Maschinenpistole VZ58, Kal. 7,62x39', '10 Schuss Karabiner CZ EVO3, Kal. 9mm Luger'] },
    en: { name: 'Package „Military“', details: ['10 shots CZ P-09 pistol, 9mm Luger cal.', '10 shots VZ58 submachine gun, 7.62x39 cal.', '10 shots CZ EVO3 carbine, 9mm Luger cal.'] },
    ru: { name: 'Пакет „Милитари“', details: ['10 выстрелов из пистолета CZ P-09, калибр 9mm Luger', '10 выстрелов из пистолета-пулемета VZ58, калибр 7,62x39', '10 выстрелов из карабина CZ EVO3, калибр 9mm Luger'] }
  },
  long_guns: {
    sk: { name: 'Balíček „Dlhé zbrane“', details: ['5 výstrelov brokovnica pumpa, kal. 12GA', '10 výstrelov AK47 / Kalašnikov, kal. 7,62x39', '10 výstrelov Sig Sauer M400 / AR15, kal. 223REM', '10 výstrelov puška CZ512, kal. 22LR', '10 výstrelov karabína CZ EVO3, kal. 9mm Luger'] },
    de: { name: 'Paket „Langwaffen“', details: ['5 Schuss Pump-Action-Schrotflinte, Kal. 12GA', '10 Schuss AK47 / Kalaschnikow, Kal. 7,62x39', '10 Schuss Sig Sauer M400 / AR15, Kal. 223REM', '10 Schuss Gewehr CZ512, Kal. 22LR', '10 Schuss Karabiner CZ EVO3, Kal. 9mm Luger'] },
    en: { name: 'Package „Long Guns“', details: ['5 shots pump shotgun, 12GA cal.', '10 shots AK47 / Kalashnikov, 7.62x39 cal.', '10 shots Sig Sauer M400 / AR15, .223REM cal.', '10 shots CZ512 rifle, .22LR cal.', '10 shots CZ EVO3 carbine, 9mm Luger cal.'] },
    ru: { name: 'Пакет „Длинноствольное оружие“', details: ['5 выстрелов из помпового ружья, калибр 12GA', '10 выстрелов из AK47 / Калашников, калибр 7,62x39', '10 выстрелов из Sig Sauer M400 / AR15, калибр 223REM', '10 выстрелов из винтовки CZ512, калибр 22LR', '10 выстрелов из карабина CZ EVO3, калибр 9mm Luger'] }
  },
  exclusive: {
    sk: { name: 'Balíček „Exclusive“', details: ['10 výstrelov puška CZ512, kal. 22LR', '10 výstrelov karabína CZ EVO3, kal. 9mm Luger', '10 výstrelov pištoľ RUGER Target, kal. 22LR', '10 výstrelov pištoľ Glock 19 gen.5, kal. 9mm Luger', '8 výstrelov pištoľ RUGER 1911, kal. 45ACP', '5 výstrelov revolver RUGER 101, kal. 38SPEC', '6 výstrelov revolver S&W, kal. 44MAG', '1 výstrel pištoľ Desert Eagle, kal. 50AE', '10 výstrelov Sig Sauer M400 / AR15, kal. 223REM'] },
    de: { name: 'Paket „Exclusive“', details: ['10 Schuss Gewehr CZ512, Kal. 22LR', '10 Schuss Karabiner CZ EVO3, Kal. 9mm Luger', '10 Schuss Pistole RUGER Target, Kal. 22LR', '10 Schuss Pistole Glock 19 Gen.5, Kal. 9mm Luger', '8 Schuss Pistole RUGER 1911, Kal. 45ACP', '5 Schuss Revolver RUGER 101, Kal. 38SPEC', '6 Schuss Revolver S&W, Kal. 44MAG', '1 Schuss Pistole Desert Eagle, Kal. 50AE', '10 Schuss Sig Sauer M400 / AR15, Kal. 223REM'] },
    en: { name: 'Package „Exclusive“', details: ['10 shots CZ512 rifle, .22LR cal.', '10 shots CZ EVO3 carbine, 9mm Luger cal.', '10 shots RUGER Target pistol, .22LR cal.', '10 shots Glock 19 gen.5 pistol, 9mm Luger cal.', '8 shots RUGER 1911 pistol, .45ACP cal.', '5 shots RUGER 101 revolver, .38SPEC cal.', '6 shots S&W revolver, .44MAG cal.', '1 shot Desert Eagle pistol, .50AE cal.', '10 shots Sig Sauer M400 / AR15, .223REM cal.'] },
    ru: { name: 'Пакет „Эксклюзив“', details: ['10 выстрелов из винтовки CZ512, калибр 22LR', '10 выстрелов из карабина CZ EVO3, калибр 9mm Luger', '10 выстрелов из пистолета RUGER Target, калибр 22LR', '10 выстрелов из пистолета Glock 19 gen.5, калибр 9mm Luger', '8 выстрелов из пистолета RUGER 1911, калибр 45ACP', '5 выстрелов из револьвера RUGER 101, калибр 38SPEC', '6 выстрелов из револьвера S&W, калибр 44MAG', '1 выстрел из пистолета Desert Eagle, калибр 50AE', '10 выстрелов из Sig Sauer M400 / AR15, калибр 223REM'] }
  },
  west_block: {
    sk: { name: 'Balíček „West blok“', details: ['8 výstrelov pištoľ RUGER 1911, kal. 45ACP', '5 výstrelov revolver RUGER 101, kal. 38SPEC', '10 výstrelov Sig Sauer M400 / AR15, kal. 223REM'] },
    de: { name: 'Paket „West Block“', details: ['8 Schuss Pistole RUGER 1911, Kal. 45ACP', '5 Schuss Revolver RUGER 101, Kal. 38SPEC', '10 Schuss Sig Sauer M400 / AR15, Kal. 223REM'] },
    en: { name: 'Package „West Block“', details: ['8 shots RUGER 1911 pistol, .45ACP cal.', '5 shots RUGER 101 revolver, .38SPEC cal.', '10 shots Sig Sauer M400 / AR15, .223REM cal.'] },
    ru: { name: 'Пакет „Западный блок“', details: ['8 выстрелов из пистолета RUGER 1911, калибр 45ACP', '5 выстрелов из револьвера RUGER 101, калибр 38SPEC', '10 выстрелов из Sig Sauer M400 / AR15, калибр 223REM'] }
  },
  short_guns: {
    sk: { name: 'Balíček „Krátke zbrane“', details: ['10 výstrelov pištoľ RUGER Target, kal. 22LR', '10 výstrelov Glock 19 gen.5, kal. 9mm Luger', '8 výstrelov pištoľ RUGER 1911, kal. 45ACP'] },
    de: { name: 'Paket „Kurzwaffen“', details: ['10 Schuss Pistole RUGER Target, Kal. 22LR', '10 Schuss Pistole Glock 19 Gen.5, Kal. 9mm Luger', '8 Schuss Pistole RUGER 1911, Kal. 45ACP'] },
    en: { name: 'Package „Short Guns“', details: ['10 shots RUGER Target pistol, .22LR cal.', '10 shots Glock 19 gen.5 pistol, 9mm Luger cal.', '8 shots RUGER 1911 pistol, .45ACP cal.'] },
    ru: { name: 'Пакет „Короткоствольное оружие“', details: ['10 выстрелов из пистолета RUGER Target, калибр 22LR', '10 выстрелов из пистолета Glock 19 gen.5, калибр 9mm Luger', '8 выстрелов из пистолета RUGER 1911, калибр 45ACP'] }
  },
  pistol_karabina_9mm: {
    sk: { name: 'Balíček „Hunter Pištoľ/Karabína, 9mm Luger“', details: ['30 výstrelov z ľubovoľnej zbrane v kalibri 9mm Luger (GLOCK, Heckler&Koch, CZ, Walther, Scorpion EVO3)'] },
    de: { name: 'Paket „Hunter Pistole/Karabiner, 9mm Luger“', details: ['30 Schuss aus einer beliebigen Waffe im Kaliber 9mm Luger (GLOCK, Heckler&Koch, CZ, Walther, Scorpion EVO3)'] },
    en: { name: 'Package „Hunter Pistol/Carbine, 9mm Luger“', details: ['30 shots from any 9mm Luger caliber weapon (GLOCK, Heckler&Koch, CZ, Walther, Scorpion EVO3)'] },
    ru: { name: 'Пакет „Охотник Пистолет/Карабин, 9mm Luger“', details: ['30 выстрелов из любого оружия калибра 9mm Luger (GLOCK, Heckler&Koch, CZ, Walther, Scorpion EVO3)'] }
  },
  pistol_multicaliber: {
    sk: { name: 'Balíček „Hunter Pištoľ 45AUTO/40S&W/357SIG/10mm AUTO“', details: ['25 výstrelov z ľubovoľnej zbrane uvedených kalibrov (max. 2 zbrane: COLT 1911, CZ, GLOCK)'] },
    de: { name: 'Paket „Hunter Pistole 45AUTO/40S&W/357SIG/10mm AUTO“', details: ['25 Schuss aus einer beliebigen Waffe der aufgeführten Kaliber (max. 2 Waffen: COLT 1911, CZ, GLOCK)'] },
    en: { name: 'Package „Hunter Pistol 45AUTO/40S&W/357SIG/10mm AUTO“', details: ['25 shots from any weapon of the listed calibers (max. 2 weapons: COLT 1911, CZ, GLOCK)'] },
    ru: { name: 'Пакет „Охотник Пистолет 45AUTO/40S&W/357SIG/10mm AUTO“', details: ['25 выстрелов из любого оружия указанных калибров (макс. 2 оружия: COLT 1911, CZ, GLOCK)'] }
  },
  pistol_puska_22lr: {
    sk: { name: 'Balíček „Hunter Pištoľ/Puška – 22LR“', details: ['30 výstrelov z ľubovoľnej zbrane v kalibri .22LR (GLOCK, Grand Power, CZ, RUGER)'] },
    de: { name: 'Paket „Hunter Pistole/Gewehr – 22LR“', details: ['30 Schuss aus einer beliebigen Waffe im Kaliber .22LR (GLOCK, Grand Power, CZ, RUGER)'] },
    en: { name: 'Package „Hunter Pistol/Rifle – 22LR“', details: ['30 shots from any .22LR caliber weapon (GLOCK, Grand Power, CZ, RUGER)'] },
    ru: { name: 'Пакет „Охотник Пистолет/Винтовка – 22LR“', details: ['30 выстрелов из любого оружия калибра .22LR (GLOCK, Grand Power, CZ, RUGER)'] }
  },
  ar15_ak47: {
    sk: { name: 'Balíček „Hunter AR15/AK47“', details: ['30 výstrelov z ľubovoľnej zbrane uvedených kalibrov (Sig Sauer M400, AK47 / Kalašnikov)'] },
    de: { name: 'Paket „Hunter AR15/AK47“', details: ['30 Schuss aus einer beliebigen Waffe der aufgeführten Kaliber (Sig Sauer M400, AK47 / Kalaschnikow)'] },
    en: { name: 'Package „Hunter AR15/AK47“', details: ['30 shots from any weapon of the listed calibers (Sig Sauer M400, AK47 / Kalashnikov)'] },
    ru: { name: 'Пакет „Охотник AR15/AK47“', details: ['30 выстрелов из любого оружия указанных калибров (Sig Sauer M400, AK47 / Калашников)'] }
  },
  revolver_multicaliber: {
    sk: { name: 'Balíček „Hunter Revolver – 38Spec./357MAG/44MAG“', details: ['25 výstrelov v kalibri 38SPEC, alebo 20 výstrelov v kalibri 357MAG, alebo 18 výstrelov v kalibri 44MAG'] },
    de: { name: 'Paket „Hunter Revolver – 38Spec./357MAG/44MAG“', details: ['25 Schuss im Kaliber .38SPEC, oder 20 Schuss im Kaliber .357MAG, oder 18 Schuss im Kaliber .44MAG'] },
    en: { name: 'Package „Hunter Revolver – .38Spec./.357MAG/.44MAG“', details: ['25 shots in .38SPEC caliber, or 20 shots in .357MAG caliber, or 18 shots in .44MAG caliber'] },
    ru: { name: 'Пакет „Охотник Револьвер – 38Spec./357MAG/44MAG“', details: ['25 выстрелов калибра .38SPEC, или 20 выстрелов калибра .357MAG, или 18 выстрелов калибра .44MAG'] }
  },
  chicago: {
    sk: { name: 'Balíček „CHICAGO“', details: ['8 výstrelov pištoľ RUGER 1911, kal. 45ACP', '6 výstrelov revolver S&W, kal. 44MAG', '5 výstrelov brokovnica pumpa, kal. 12GA'] },
    de: { name: 'Paket „CHICAGO“', details: ['8 Schuss Pistole RUGER 1911, Kal. 45ACP', '6 Schuss Revolver S&W, Kal. 44MAG', '5 Schuss Pump-Action-Schrotflinte, Kal. 12GA'] },
    en: { name: 'Package „CHICAGO“', details: ['8 shots RUGER 1911 pistol, .45ACP cal.', '6 shots S&W revolver, .44MAG cal.', '5 shots pump shotgun, 12GA cal.'] },
    ru: { name: 'Пакет „ЧИКАГО“', details: ['8 выстрелов из пистолета RUGER 1911, калибр 45ACP', '6 выстрелов из револьвера S&W, калибр 44MAG', '5 выстрелов из помпового ружья, калибр 12GA'] }
  },
  glock_multikaliber: {
    sk: { name: 'GLOCK Multikaliber', details: ['10 výstrelov Glock 23, kal. 40S&W', '10 výstrelov Glock 21, kal. 45AUTO', '10 výstrelov Glock 32, kal. 357SIG', '10 výstrelov Glock 20, kal. 10mmAUTO', '10 výstrelov Glock 19X, kal. 9mm Luger', '10 výstrelov Glock 44, kal. 22LR', '6 výstrelov Glock 42, kal. 380AUTO (9mm Browning)'] },
    de: { name: 'GLOCK Multikaliber', details: ['10 Schuss Glock 23, Kal. .40S&W', '10 Schuss Glock 21, Kal. .45AUTO', '10 Schuss Glock 32, Kal. .357SIG', '10 Schuss Glock 20, Kal. 10mmAUTO', '10 Schuss Glock 19X, Kal. 9mm Luger', '10 Schuss Glock 44, Kal. .22LR', '6 Schuss Glock 42, Kal. .380AUTO (9mm Browning)'] },
    en: { name: 'GLOCK Multicaliber', details: ['10 shots Glock 23, .40S&W cal.', '10 shots Glock 21, .45AUTO cal.', '10 shots Glock 32, .357SIG cal.', '10 shots Glock 20, 10mmAUTO cal.', '10 shots Glock 19X, 9mm Luger cal.', '10 shots Glock 44, .22LR cal.', '6 shots Glock 42, .380AUTO (9mm Browning) cal.'] },
    ru: { name: 'GLOCK Мультикалибр', details: ['10 выстрелов из Glock 23, калибр .40S&W', '10 выстрелов из Glock 21, калибр .45AUTO', '10 выстрелов из Glock 32, калибр .357SIG', '10 выстрелов из Glock 20, калибр 10mmAUTO', '10 выстрелов из Glock 19X, калибр 9mm Luger', '10 выстрелов из Glock 44, калибр .22LR', '6 выстрелов из Glock 42, калибр .380AUTO (9mm Browning)'] }
  },
  glock_9x19: {
    sk: { name: 'GLOCK 9x19 – všetky v kal. 9mm Luger', details: ['10 výstrelov Glock 26', '6 výstrelov Glock 43', '10 výstrelov Glock 43X', '10 výstrelov Glock 19 gen.5', '10 výstrelov Glock 34', '10 výstrelov Glock 17 gen.5'] },
    de: { name: 'GLOCK 9x19 – alle im Kaliber 9mm Luger', details: ['10 Schuss Glock 26', '6 Schuss Glock 43', '10 Schuss Glock 43X', '10 Schuss Glock 19 Gen.5', '10 Schuss Glock 34', '10 Schuss Glock 17 Gen.5'] },
    en: { name: 'GLOCK 9x19 – all in 9mm Luger cal.', details: ['10 shots Glock 26', '6 shots Glock 43', '10 shots Glock 43X', '10 shots Glock 19 gen.5', '10 shots Glock 34', '10 shots Glock 17 gen.5'] },
    ru: { name: 'GLOCK 9x19 – все калибра 9mm Luger', details: ['10 выстрелов из Glock 26', '6 выстрелов из Glock 43', '10 выстрелов из Glock 43X', '10 выстрелов из Glock 19 gen.5', '10 выстрелов из Glock 34', '10 выстрелов из Glock 17 gen.5'] }
  }
};

let content = fs.readFileSync('src/i18n/translations.ts', 'utf8');

const languages = ['sk', 'de', 'en', 'ru'];

// Create regex to replace each package inside each language block.
// Example: "cz_package": { ... }

for (const lang of languages) {
  for (const [pkgKey, pkgData] of Object.entries(data)) {
    const langData = pkgData[lang];
    if (!langData) continue;

    // Search for the package definition: "cz_package": {\n "name": "...",\n "details": [\n ...\n ]\n }
    // It's safer to use a function replacement that matches the package key block.
    
    // We can first isolate the language block:
    const langStartMatch = content.match(new RegExp(`"${lang}":\\s*{`));
    if (!langStartMatch) continue;
    const startIndex = langStartMatch.index;
    
    // Find the package within the block (from startIndex)
    const pkgPattern = new RegExp(`"${pkgKey}":\\s*{[\\s\\S]*?}`, 'g');
    
    // Let's replace only the first occurrence after startIndex
    content = content.substring(0, startIndex) + content.substring(startIndex).replace(pkgPattern, (match) => {
       const detailsStr = langData.details.map(d => `          "${d}"`).join(',\n');
       return `"${pkgKey}": {
        "name": "${langData.name}",
        "details": [
${detailsStr}
        ]
      }`;
    });
  }
}

fs.writeFileSync('src/i18n/translations.ts', content);

