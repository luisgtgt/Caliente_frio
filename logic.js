let tiempo = document.getElementById('tiemposegu')
let valor = 60
let color = document.getElementById('color')

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
        await segundo(1000);
    }
}
crono()

//compara numero 
function juego() {

    let usuario = document.getElementById('usuario').value
    usuario = parseInt(usuario)

    if ((usuario >= 1) || (usuario <= 100)) {
        let rampo = random + 10
        let rammi = random - 10
        if (((usuario<=rampo) & (usuario>=rammi)) & (usuario != random)){
            color.innerHTML=''
            color.style.backgroundColor = '#ffee00'
            color.innerHTML = '<h1>Caliente</h1>'
        }else if (usuario == random){
            color.innerHTML=''
            color.style.backgroundColor = '#00ff88'
            color.innerHTML = '<h1>Lo lograste</h1>'
        }else{
            color.innerHTML=''
            color.style.backgroundColor = '#0008ff'
            color.innerHTML = '<h1>Frio</h1>'
        }
    } else {
        color.innerHTML = '<h1>NO ES UN NUMERO</h1>'
    }
}
