const dns1 = "181.213.132.2";
const dns2 = "181.213.132.3";

// Lista de cidades
const cidades = [
  "DIADEMA","MAUA","SANTO ANDRÉ","SÃO BERNARDO DO CAMPO","SÃO CAETANO DO SUL",
  "SÃO PAULO","GUARULHOS","ITU","JUNDIAI","POA","SUZANO",
  "BARUERI","CARAPICUIBA","COTIA","EMBU DAS ARTES","ITAPECERICA DA SERRA",
  "ITAPEVI","JANDIRA","OSASCO","SANTANA DO PARNAIBA","TABOÃO DA SERRA","VARGEM GRANDE PAULISTA",
  "TIETE","MOGI DAS CRUZES","CAPIVARI","ELIAS FAUSTO","MONTE MOR","PORTO FELIZ","RAFARD","SALTO",
  "ATIBAIA","BRAGANÇA"
];

// Popular cidades
const selectCidade = document.getElementById("cidade");
cidades.forEach(c => {
  let op = document.createElement("option");
  op.value = c;
  op.text = c;
  selectCidade.appendChild(op);
});

// Função cálculo simples gateway/máscara
function calcular() {
  let ip = document.getElementById("ip").value;
  let cidade = document.getElementById("cidade").value;
  let tipo = document.getElementById("tipo").value;

  if (!ip) {
    alert("Digite o IP");
    return;
  }

  let mascara = "";
  let gateway = "";

  // REGRA PRINCIPAL
  if (cidade === "SÃO PAULO") {
    if (tipo === "DOCSIS") {
      mascara = "255.255.255.0 (/24)";
      gateway = ip.split('.').slice(0,3).join('.') + ".1";
    } else {
      mascara = "255.255.255.252 (/30)";
      gateway = calcularGateway30(ip);
    }
  } else {
    mascara = "255.255.255.0";
    gateway = ip.split('.').slice(0,3).join('.') + ".1";
  }

  document.getElementById("resultado").innerHTML = `
    <b>Resultado:</b><br><br>
    IP: ${ip}<br>
    Máscara: ${mascara}<br>
    Gateway: ${gateway}<br>
    DNS 1: ${dns1}<br>
    DNS 2: ${dns2}
  `;
}

// cálculo /30
function calcularGateway30(ip) {
  let partes = ip.split('.');
  let ultimo = parseInt(partes[3]);

  let base = Math.floor(ultimo / 4) * 4;
  return partes[0]+"."+partes[1]+"."+partes[2]+"."+(base+1);
}