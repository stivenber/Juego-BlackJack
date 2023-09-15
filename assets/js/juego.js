/** 
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
*/

let deck         = [];
const tipos      = ['C','D','H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;
// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');

// Esta función crea una nueva baraja (deck)
const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push( i + tipo);
        }
    }

    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push( esp + tipo )
        }
    }

    // console.log( deck );
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
}

crearDeck();

// Esta función me permite tomar una carta 
const pedirCarta = () => {
    
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
   
    const carta = deck.pop();
    return carta;
}

// pedirCarta();
const valorCarta = ( carta ) => {
    // Esta funcion lo que hace es que del valor de la carta en modo string
    // como viene determinada al extraerla del deck, abstrae su numero o letra
    // correspondiente a la denominación de la carta y la convierte en el valor
    // ya sea del 1 al 10 si la carta está entre este rango o con el valor de 11
    // si es un As o con el valor de 10 si es J,Q o K
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN(valor) ) ? 
      ( valor === 'A' ) ? 11 : 10 
      : valor * 1;   
}

// turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {

    do{
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta( carta );
    puntosHTML[1].innerText = puntosComputadora;
    
    // <img class="carta" src="assets/cartas/10C.png"></img>
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD, ETC.
    imgCarta.classList.add('carta');
    divCartasComputadora.append( imgCarta );

    if( puntosMinimos > 21 ) {
        break;
    }

    } while( puntosComputadora < puntosMinimos && (puntosMinimos <= 21 ) );

    if (  ) {
        
    }

}

// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/10C.png"></img>
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD, ETC.
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ){
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if ( puntosJugador === 21 ) {
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})


