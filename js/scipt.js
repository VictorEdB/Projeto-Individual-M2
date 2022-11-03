var valor = document.getElementById("valor");
var respmsg = document.getElementById("respmsg")
var radio = document.querySelectorAll(".radio");
var mensagem = document.getElementById("mensagem");
var botao = document.getElementById("botaorespmsg");

var cod = document.getElementById("cod");
var numb = document.getElementById("valor")



cod.addEventListener("change", function(){
  if(cod.value == "cifra") {
    numb.style.visibility = "visible";
  } else {
    numb.style.visibility = "hidden";
  }
});

botao.addEventListener("click", function(event){
  event.preventDefault();
  var cod = document.getElementById("cod").value;
  if (cod == "cifra" && radio[0].checked){
    var vlmsg = mensagem.value.split("");
    var vlchave = parseInt(valor.value);
    respmsg.value = codificarcifra(vlmsg, vlchave);
  } 
  else if (cod == "cifra" && radio[1].checked){
    var vlmsg = mensagem.value.split("");
    var vlchave = parseInt(valor.value);
    respmsg.value = decodificarcifra(vlmsg, vlchave);
  } 
  else if(cod == "base64" && radio[0].checked){
    var vlmsg = mensagem.value;
    respmsg.value = btoa(vlmsg);
  }
  else{
    var vlmsg = mensagem.value;
    respmsg.value = atob(vlmsg);
  }
});

function codificarcifra(msg, chave){
  return msg
    .map((str) =>{
      var entrada = str.charCodeAt();
      if (entrada >= 65 && entrada <= 90) {
        return String.fromCharCode(((entrada - 65 + chave) % 26) + 65);
      } else if(entrada >= 97 && entrada <= 122) {
        return String.fromCharCode(((entrada - 97 + chave) % 26) + 97);
      } else{
        return str;
      }
    })
    .join("");
}

function decodificarcifra(msg, chave){
  return msg
    .map((str) =>{
      var entrada = str.charCodeAt();
      if (entrada >= 65 && entrada <= 90){
        if (entrada - 65 - chave < 0) {
          return String.fromCharCode(((entrada - 65 - chave + 26) % 26) + 65);
        } else {
          return String.fromCharCode(((entrada - 65 - chave) % 26) + 65);
        }
      } else if(entrada >= 97 && entrada <= 122) {
        if (entrada - 97 - chave < 0) {
          return String.fromCharCode(((entrada - 97 - chave + 26) % 26) + 97);
        } else{
          return String.fromCharCode(((entrada - 97 - chave) % 26) + 97);
        }
      } else{
        return str;
      }
    })
    .join("");
}

radio[0].addEventListener("click", function(){
  if(radio[0].checked){
    botao.innerHTML = `
      <span class="corvermelha">Codificar</span><span class="corvermelha"></span>
      `;
  }
});

radio[1].addEventListener("click", function(){
  if(radio[1].checked){
    botao.innerHTML = `
      <span class="corvermelha">Decodificar</span><span class="corvermelha"></span>
      `;
  }
});