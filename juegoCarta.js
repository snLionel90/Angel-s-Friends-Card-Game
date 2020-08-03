var directorio = "images" //directorio o ruta a donde se guardan las imágenes
var numImagenes = 16 //cantidad de imágenes que existan em el directorio
perder = 3333320 //Numero de intentos a los que se pierde

//***No tocar el código a partir de aquí
var nums=new Array()
var cant = 8
var acrtos = 0
var intentos = 0
gana = false
perdio = false
function numero(){
var num = Math.ceil(Math.random() *numImagenes);
return num}

nums[0] = numero()

for(m=1;m<=(cant-1);m++)
{
	nums[m] =  comprueba(numero())
}

function comprueba(nume)
{
var repe = false
for(t=0;t<nums.length;t++)
	{
	if(nume == nums[t])
		{
		repe = true; break
		}
	}
if(repe == false)
	{
	return nume
	}
else
	{
	m--
	comprueba(numero())
	}
}
var lista = new Array()
largo = nums.length
for(w = 0; w < largo ; w++)
	{
	nums[largo + w] = nums[w]
	}

var numero = 0
function comprueba2(numerito)
{
if(nums[numerito] == null)
	{
	if(numerito == nums.length-1)
		{
		numerito = 0
		numerito2 = numerito
		comprueba2(numerito2)
		}
	else
		{
		numerito += 1
		numerito2 = numerito
		comprueba2(numerito2)
		}
	}
else{
numero = numerito
return numerito
	}
}

for(q=0; q < nums.length; q++)
	{
	if(q == nums.length-1)
		{
		for(e=0;e < nums.length; e++)
			{
			if(nums[e] != null)
				{
				lista[q] = nums[e];
				break
				}
			}
		}
		else
			{
			numerin = Math.floor(Math.random() * nums.length-1)
			numerin = comprueba2(numerin)
			lista[q] = nums[numero]
			nums[numero] = null
			}
	}
	
var imagenes = new Array()

for(n=0;n<lista.length;n++)
	{
	imagenes[n] = new Image()
	imagencilla = eval('"' + lista[n] + '.png"')
	imagenes[n].src = directorio + "/" + imagencilla
	}


s = 1

document.writeln ('<table align="center">')
document.writeln ('<tr align="center">')
for(p=1; p<=nums.length;p++)
	{
	if(s > 4){document.write ('</tr><tr>');s=1}
	document.write ('<td id="' + lista[p-1] + '"><a href="#" onclick="this.blur();return false">')
	document.write ('<img id="' + lista[p-1] + '" onclick="gira(this,this.id)" src="' + directorio + '/cruz.png" width="71" height="81">')
	document.writeln ('</a></td>')
	s++
	}
document.writeln ('</table>')
cont = 0 
var gi1,gi2
function gira(cual,carta)
{
if(perdio == true)
	{
	document.formu.visor.value="Juego Finalizado"
	setTimeout('document.location.reload()',2000)
	}
if(cual != gi1){cont++}
if(cont < 3)
	{
	cual.src = directorio + "/" + carta + ".png"
	if(cont==1){gi1 = cual;}
	else{gi2 = cual; comp()}
	}
	
}
function comp()
{
if(gi1.src == gi2.src)
	{
	setTimeout("gi1.style.borderColor='red'",200)
	setTimeout("gi2.style.borderColor='red'",400)
	gi1.onclick=null;gi2.onclick=null
	intentos++
	document.formu.visor.value = "Intentos: " + intentos
	acrtos++
	if(acrtos == cant) 
		{
		finJuego('gana')
		gana = true
		}
	
	cont = 0
	}
else 
	{
	setTimeout("restaura()",1500)
	
	}

}
function restaura()
	{
	gi1.src = directorio + "/" + "cruz.png" ; gi1 =""
	setTimeout('gi2.src = directorio + "/cruz.png";gi2=""',200)
	cont = 0
	intentos ++
	document.formu.visor.value = "Intentos: " + intentos
	if(intentos >= perder)
		{
		cont = 4
		finJuego('pierde')
		perdio = true
		}
	}
function finJuego(cual)
{
if(navigator.appName == "Netscape")
	{
	anchoVentana = window.innerWidth
	altoVentana = window.innerHeight
	}
else
	{
	anchoVentana = document.body.scrollWidth
	altoVentana = document.body.scrollHeight
	}
document.getElementById('gana').style.top=(altoVentana -100)/2
document.getElementById('gana').style.left =(anchoVentana -200)/2
if(cual == 'pierde'){document.getElementById('mensaje').innerHTML = 'Agotaste tus ' + perder + ' intentos<br> Perdiste  :-(';cont='perdio'}
document.getElementById('gana').style.visibility = 'visible'
}
function cierra()
{document.getElementById('gana').style.visibility='hidden'}