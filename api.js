const key = '80d81da09b47f3c61d376ea9541d700b'




const form = document.querySelector("#ricerca")
form.addEventListener("submit",search)


  
function search(event){
  event.preventDefault()


  const meteo = document.querySelector('#meteo');
  meteo.innerHTML=''
  meteo.classList.remove('hidden')
  const content = document.querySelector("#content").value
  console.log(content)


  if(!content){
    alert("Inserisci citta")
  }
else{
  const text=encodeURIComponent(content)
  const citta = 'https://api.openweathermap.org/data/2.5/weather?q=' + text + '&appid=' + key
  fetch(citta).then(onResponse).then(onJson)
}
  

}

function onResponse(response)
{
  return response.json();
}


function onJson(json)
{
  console.log(json);

  const nome = json['name'];
  const nazione = json['sys']['country'];
  const temperatura = json['main']['temp'];
  const max = json['main']['temp_max'];
  const min = json['main']['temp_min'];
  const percepita = json['main']['feels_like'];
  const umidità = json['main']['humidity'];
  const vel_vento = json['wind']['speed'];

  const meteo = document.querySelector('#meteo');
  
  const città = document.createElement('h1');
  città.textContent = 'Citta:'+nome;
  meteo.appendChild(città);

  const origine = document.createElement('h1');
  origine.textContent = 'Nazione:'+nazione;
  meteo.appendChild(origine);

  const temp = document.createElement('h1');
  temp.textContent = 'Temperatura:'+temperatura;
  meteo.appendChild(temp);

  const alto = document.createElement('h1');
  alto.textContent = 'Massima:'+max;
  meteo.appendChild(alto);

  const basso = document.createElement('h1');
  basso.textContent = 'Minima:'+min;
  meteo.appendChild(basso);

  const perc = document.createElement('h1');
  perc.textContent = 'Percepita:'+percepita;
  meteo.appendChild(perc);

  const umi = document.createElement('h1');
  umi.textContent = 'Umidita:'+umidità;
  meteo.appendChild(umi);


  const ventovelocita = document.createElement('h1');
  ventovelocita.textContent = 'Velocita vento:'+vel_vento;
  meteo.appendChild(ventovelocita);
 

}