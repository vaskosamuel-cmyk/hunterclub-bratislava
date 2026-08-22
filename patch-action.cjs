const fs = require('fs');
let code = fs.readFileSync('src/pages/Action.tsx', 'utf8');

code = code.replace(
  /weapons: language === 'sk' \? \["Glock 17", "AK-47", "AR-15", "Brokovnica Pumpa"\] :[\s\S]*?\["Глок 17", "АК-47", "АР-15", "Помповое ружье"\],/,
  `weapons: language === 'sk' ? ["Glock 19", "RUGER 1911", "CZ EVO3", "AR-15", "AK-47"] :
               language === 'en' ? ["Glock 19", "RUGER 1911", "CZ EVO3", "AR-15", "AK-47"] :
               language === 'de' ? ["Glock 19", "RUGER 1911", "CZ EVO3", "AR-15", "AK-47"] :
               ["Глок 19", "RUGER 1911", "CZ EVO3", "АР-15", "АК-47"],`
);

code = code.replace(
  /weapons: language === 'sk' \? \["Glock 19", "CZ Shadow 2", "Stribog SR9", "Grand Power Stribog"\] :[\s\S]*?\["Глок 19", "CZ Shadow 2", "Стрибог SR9", "Grand Power Стрибог"\]/,
  `weapons: language === 'sk' ? ["GLOCK", "Heckler&Koch", "CZ", "Scorpion EVO3"] :
               language === 'en' ? ["GLOCK", "Heckler&Koch", "CZ", "Scorpion EVO3"] :
               language === 'de' ? ["GLOCK", "Heckler&Koch", "CZ", "Scorpion EVO3"] :
               ["GLOCK", "Heckler&Koch", "CZ", "Scorpion EVO3"]`
);

code = code.replace(
  /weapons: language === 'sk' \? \["AK-47", "AR-15", "Sa vz. 58", "Brokovnica"\] :[\s\S]*?\["АК-47", "АР-15", "Sa vz. 58", "Дробовик"\]/,
  `weapons: language === 'sk' ? ["Brokovnica", "AK-47", "AR-15", "CZ512", "CZ EVO3"] :
               language === 'en' ? ["Shotgun", "AK-47", "AR-15", "CZ512", "CZ EVO3"] :
               language === 'de' ? ["Schrotflinte", "AK-47", "AR-15", "CZ512", "CZ EVO3"] :
               ["Дробовик", "АК-47", "АР-15", "CZ512", "CZ EVO3"]`
);

fs.writeFileSync('src/pages/Action.tsx', code);
