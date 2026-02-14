let tiempo = document.getElementById('tiemposegu')
let valor = 60
let color = document.getElementById('color')
let historial = document.getElementById('input_h')
let recargar = document.querySelector(".reset")
let logro = false;
//numero ramdon
const generarAleatorio = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
let random = generarAleatorio(1, 100);

console.log(random)

//contador de tiempo
const segundo = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function crono() {
    while (valor > 0) {
        valor = valor - 1
        tiempo.textContent = `${valor}`
        if(logro){
            break
        }
        await segundo(1000);
    }
    if(!logro){
        recargar.style.display ="flex"
    }
    

}
crono()
//insertar intentos
function inserta(x){
    historial = historial.textContent()
}

//compara numero 
function juego() {

    let usuario = document.getElementById('usuario').value
    usuario = parseInt(usuario)
    historial.innerHTML += `<p> ${usuario}, </p>`
    if ((usuario >= 1) || (usuario <= 100)) {
        let rampo = random + 10
        let rammi = random - 10
        if (((usuario<=rampo) & (usuario>=rammi)) & (usuario != random)){
            color.innerHTML=''
            color.style.backgroundColor = '#ffee00'
            color.innerHTML = '<h1>Caliente</h1>'
        }else if (usuario == random){
            color.innerHTML=''
            color.style.backgroundColor = '#00ff8838'
            color.innerHTML = '<h1>Lo lograste</h1>'
            logro = true;
        }else{
            color.innerHTML=''
            color.style.backgroundColor = '#0008ff'
            color.innerHTML = '<h1>Frio</h1>'
        }
    } else {
        color.innerHTML = '<h1>NO ES UN NUMERO</h1>'
    }
}
