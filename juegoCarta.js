// En este script se estableceran las variables para el juego de cartas

var theGame = new Object(); //creando un numevo objeto

//lo instanciamos
theGame.columnas = 4; //asignamos el numero de columnas
theGame.filas = 3; //asignamos el numero de filas
theGame.extension=".png"; //una extension para todas las imagenes
theGame.path = "images/"; //directorio donde estan las imagenes
theGame.pulsacion = new Array(0,0) //pulsaciones para las parejas en forma de Array
theGame.intentos=0; //contador de intentos
theGame.aciertos=0; //contador de aciertos

//*******area de las variables **********
var MAX_FICH = theGame.filas * theGame,columnas; //posicionando el tablero
var Imagenes = new Array(); //un array para almacenar las imagenes 
var pause = false; //un pequeño respiero para pulsar la segunda carta

//**************FUNCIONES****** 
//estafuncion carga las imagenes dentro de un array
function cargaImagenes(){ 
    for (i=0; i<MAX_FICH; i++){
        Imagenes[i]=new Image(100,100); //tamaño de imagen mostrada en el array
    Imagenes[i].src = theGame.path+i+theGame.extension;
    }
}

//Funcione de mostar un tablero
function mostrarTablero(){
    document.getElementById("movimientos").innerHTML = theGame.intentos;
    document.getElementById("aciertos").innerHTML = theGame.aciertos;

    var salida = "<table>\n";
    for (i = 0; i<MAX_FICH; i++){
        if (i % theGame.columnas==0){
            salida += "\n<tr>"
        }
        salida += '<td id="carta_'+ i + '"><a onclick="return false" onmousedown="mostrar(' +i + ')" onmouseup="comprobar('+i+')" >'+
               '<img src="' + oJuego.ruta+ "cruz" + oJuego.extension + '"></a></td>'; 
 }
        salida += "</table>";
 
        document.getElementById("tablero").innerHTML = salida;

}

//funcion empleada para empezar y estableser los parametros antes de mostar el tablero
function queEmpieseJuego(){
    var nUno, nDos, nTemp;
    theGame.pulsacion = new Array(-1,-1);
    theGame.intentos=0;
    theGame.aciertos=0;

    //ordeeeen en el array
    theGame.cartas = new Array(MAX_FICH)
    for (i = 0; i<MAX_FICH; i++){
        theGame.cartas[i]=i;

    }

    //desorecen en el array
    i=100;
    while(i--){
        nUno = azar();
        nDos = arar();
        if (nDos != nUno ){ //establecemos el orden
            nTemp = theGame.cartas[nUno]
            theGame.cartas[nUno] = oJuego.cartas[nDos]
            theGame.cartas[nDos] = nTemp;
            }
    }

    mostrarTablero(); //mostramos el tablero gracias a la función mostrarTablero
}


// funciones varias para el juego
function azar(){  
    return Math.floor(Math.random()*MAX_FICH);

   }

//función para comprobar si se han pulsado una o dos cartas
function soloImpar(n){
    return (n % 2 == 0 ? n : n - 1);
}

function mostrar(nFicha){
    if (!enPausa){
        //7a buscar la imagen del array
        if (document.images[nFicha].src.indexOf(theGame.path+"crux"+theGame.extension)!=-1){
            document.images[nFicha].src=Imagenes[theGame.cartas[nFicha]].src;
            if (theGame.pulsacion[0]==1)
                theGame.pulsacion[0]=nFicha;
                else
                theGame.pulsacion[1]=nFicha;       
            }   else{
                alert("Pulsa la imagen sin emparejarr");
            }
        }
}

//funcion que la da la vuelta al as cartas

function sinPausa(){
    enPausa=false;
    document.images[theGame.pulsacion[0]].src=theGame.path+"crux"+theGame.extension;
    document.images[theGame.pulsacion[1]].src=theGame.path+"crux"+theGame.extension;

    //7volviendo a las teclas
    theGame.pulsacion[0]=-1;
    theGame.pulsacion[1]=-1;
}

function comprobacion (){
    if (enPausa || theGame.pulsacion[1]==-1){
        return; //comprobar dos teclás
    }
    theGame.intentos++; //uno mas pal contador

    if(soloImpar(theGame.cartas[theGame.pulsacion[0]])== soloImpar(theGame.cartas[theGame.pulsacion[1]])){
        theGame.aciertos++; //añadimos un acierto al contador
        if (theGame.aciertos*2==MAX_FICH){ //si se acierta todas las fichas el juego acaba
            detener() //parando el cronometro

            //y muestra un mensaje final de juego
            alert("Enhorabuena has ganado y has tardado" +contador_m+ ":" +(contador_s-1));
        }
        theGame.pulsacion[0]=-1;
        theGame.pulsacion[1]=-1;
    }else{
        enPausa=true;
        setTimeout(sinPausa,1000);
    }

    document.getElementById("movimientos").innerHTML=theGame.intentos;
    document.getElementById("aciertos").innerHTML=theGame.aciertos;
}

window.onload = function(){
    cargaImagenes();
    queEmpieseJuego();
    bienvenido();
}

function bienvenido(){
    alert("Hola, Bienvenid@ a Angel's Frends Card Game \n juega y gana un choped" )
    carga();
}
function carga(){
    contador_m=0;
    contador_s=0;

    s = document.getElementById("segundos");
    m =document.getElementById("minutos");

    cronometro = setInterval(
        function(){
            if (contador_s==60){
                contador_s=0;
                contador_m++;
                m.innerHTML=contador_m;
                if (contador_m==60){
                    contador_m=0;
                }
            }
            s.innerHTML=contador_s;
            contador_s++;
        }
        ,1000); 
}
var cronometro;
function detener(){
    clearInterval(cronometro);

}
