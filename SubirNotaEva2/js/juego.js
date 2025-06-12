const feedback = document.getElementById("feedback");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const guessInput = document.getElementById("guess-input");
const contadorElement = document.getElementById("contador-intentos");

let randomNumber = Math.floor(Math.random()*100) + 1;

let intentos = [];
const listaIntentos = document.getElementById("lista-intentos");

function getRandomColor(){
    const letters = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random()* 16)];
    }
    return color;
}

submitBtn.addEventListener("click", ()=>{
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess)|| userGuess < 1 || userGuess > 100){
        Swal.fire({
            icon:'error',
            title: 'Número inválido',
            text: 'Por favor, ingresa un número entre 1 y 100.'
        });
        return;
    }

    intentos.push(userGuess);
    contadorElement.textContent = `Intentos: ${intentos.length}`;
    actualizarListaIntentos();

    if(isNaN(userGuess) || userGuess < 1 || userGuess > 100){
        feedback.textContent = "Por favor, ingresa un número entre 1 y 100";
        feedback.style.color = "black";
        return;
    }

    if(userGuess === randomNumber){
        Swal.fire({
            icon: 'success',
            title: '¡Correcto!',
            text: `Adivinaste el número en ${intentos.length} intentos`,
            confirmButtonText: 'Jugar de Nuevo'
        });

        resetBtn.style.display = "inline-block";
        
    } else {
        const distancia = Math.abs(userGuess - randomNumber);

        if (userGuess < randomNumber){
            Swal.fire({
                icon:'info',
                title:'Demasiado bajo',
                text: distancia > 10 ? 'Estás muy lejos, intenta de nuevo.' : '¡Estás cerca!',
                confirmButtonText: 'OK'
            });
    }else{
        Swal.fire({
            icon: 'info',
            title: 'Demasiado alto',
            text: distancia > 10 ? 'Estás muy lejos, intenta de nuevo' : '¡Estás cerca!',
            confirmButtonText: 'Ok'
        });
    }
    }
})

resetBtn.addEventListener("click",()=>{
    randomNumber = Math.floor(Math.random() * 100) + 1;
    intentos = [];
    listaIntentos.innerHTML = "";
    feedback.textContent = "";
    guessInput.value = "";
    contadorElement.textContent = "Intentos: 0";
    resetBtn.style.display = "none";
})

function actualizarListaIntentos() {
    listaIntentos.innerHTML = "";
    intentos.forEach((intento, index) => {
        const li = document.createElement("li");
        li.textContent = `Intento ${index +  1}: ${intento}`;
        li.classList.add("list-group-item");
        const distancia = Math.abs(intento - randomNumber);
        if (distancia > 10){
            li.classList.add("text-danger"); //Rojo
        } else {
            li.classList.add("text-primary"); //Azul
        }
        listaIntentos.appendChild(li);
    });
}