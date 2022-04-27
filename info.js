const client_id = 'TGAB1xojg9o1QWf7OFtQab0EMO0St67M';
const client_secret = 'fvtmOZjwdia9e2JI';
let token;

//Richiesta del token al servizio di Amadeus.com
fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'post',
    body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
}).then(onTokenResponse).then(onTokenJson);

function onTokenJson(json){
    token = json.access_token; 
}

function onTokenResponse(response){
    return response.json();
}



const form = document.querySelector("#ricerca")
form.addEventListener("submit",cerca)


  


function cerca(){
    event.preventDefault()
    const select = document.getElementById('destinazione');
    const content = document.querySelector("#destinazione").value
    console.log(content); 
    if(!content){
        alert("Inserisci destinazione")
      }
    else{
    const params='origin='+content
    fetch('https://test.api.amadeus.com/v1/shopping/flight-destinations?' + params, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(onResponse).then(onJson);
}
}


function onResponse(response){
    return response.json();

}

function onJson(json)
{
    console.log(json);
    const num = json.data.length;
    doc = json.data[0];
    //creo il div flex conteiner
    const newDiv = document.getElementById('mostravoli');
    newDiv.innerHTML=''


    for(let i=0; i < num; i++){
        doc = json.data[i];  
                  


        const container= document.createElement('div');
        container.classList.remove('flex-items')


        const nvolo= document.createElement('h1');
        nvolo.textContent = 'Volo n:'+i
        container.appendChild(nvolo);
        container.appendChild( document.createTextNode( '\u00A0 \u00A0' ) );

        const partenza= document.createElement('p');
        partenza.textContent = 'Partenza:'+doc.origin
        container.appendChild(partenza);
        container.appendChild( document.createTextNode( '\u00A0 \u00A0' ) );



    const destinazione= document.createElement('p');
    destinazione.textContent = 'destinazione:'+doc.destination
    container.appendChild(destinazione);
    container.appendChild( document.createTextNode( '\u00A0 \u00A0' ) );


    const andata= document.createElement('p');
    andata.textContent = 'andata:'+doc.departureDate
    container.appendChild(andata);       
    container.appendChild( document.createTextNode( '\u00A0 \u00A0' ) );




    const ritorno= document.createElement('p');
    ritorno.textContent = 'ritorno:'+doc.returnDate
    container.appendChild(ritorno);
    container.appendChild( document.createTextNode( '\u00A0 \u00A0' ) );



    const prezzo= document.createElement('p');
    prezzo.textContent = 'prezzo:'+doc.price.total
    container.appendChild(prezzo);
    container.appendChild( document.createTextNode( '\u00A0 \u00A0' ) );


    newDiv.appendChild(container);
    } 
    

}