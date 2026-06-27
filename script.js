const dns1 = "181.213.132.2";
const dns2 = "181.213.132.3";

const cidades = [
"DIADEMA","MAUA","SANTO ANDRÉ","SÃO BERNARDO DO CAMPO","SÃO CAETANO DO SUL",
"SÃO PAULO","GUARULHOS","ITU","JUNDIAI","POA","SUZANO",
"BARUERI","CARAPICUIBA","COTIA","EMBU DAS ARTES","ITAPECERICA DA SERRA",
"ITAPEVI","JANDIRA","OSASCO","SANTANA DO PARNAIBA","TABOÃO DA SERRA","VARGEM GRANDE PAULISTA",
"TIETE","MOGI DAS CRUZES","CAPIVARI","ELIAS FAUSTO","MONTE MOR","PORTO FELIZ","RAFARD","SALTO",
"ATIBAIA","BRAGANÇA"
];

window.onload = function () {
  const selectCidade = document.getElementById("cidade");

  cidades.forEach(c => {
    let op = document.createElement("option");
    op.value = c;
    op.text = c;
    selectCidade.appendChild(op);
  });
};

function calcular() {
  let ip = document.getElementById("ip").value.trim();
  let cidade = document.getElementById("cidade").value;
  let tipo = document.getElementById("tipo").value;

  if (!ip) {
    alert("Digite o IP");
    return;
  }

  let mascara = "";
  let gateway = "";

  if (cidade === "SÃO PAULO") {
    if (tipo === "DOCSIS") {
      mascara = "255.255.255.0";
      gateway = gerarGateway24(ip);
    } else {
      mascara = "255.255.255.252";
      gateway = gerarGateway30(ip);
    }
  } else {
    mascara = "255.255.255.0";
    gateway = gerarGateway24(ip);
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

function gerarGateway24(ip) {
  let p = ip.split('.');
  return `${p[0]}.${p[1]}.${p[2]}.1`;
}

function gerarGateway30(ip) {
  let p = ip.split('.');
  let ultimo = parseInt(p[3]);

  let base = Math.floor(ultimo / 4) * 4;
  return `${p[0]}.${p[1]}.${p[2]}.${base + 1}`;
}
