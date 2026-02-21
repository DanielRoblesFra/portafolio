// ======== TYPING EFFECT ========

const textos = [
    "Ingeniero en Sistemas Computacionales.",
    "Coach de Boxeo."
];

const colores = [
    { palabra: "Sistemas Computacionales", color: "greenyellow" },
    { palabra: "Boxeo", color: "red" }
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function aplicarColor(texto) {
    let resultado = "";
    let i = 0;

    while (i < texto.length) {
        let encontrado = false;

        for (const { palabra, color } of colores) {
            const fragmento = texto.substring(i);
            // Verifica si en esta posición empieza (total o parcialmente) la palabra
            if (palabra.startsWith(fragmento.substring(0, palabra.length)) || fragmento.startsWith(palabra.substring(0, fragmento.length))) {
                const coincide = currentText.substring(i).startsWith(palabra.substring(0, texto.length - i));
                if (coincide && currentText.indexOf(palabra) === i) {
                    const trozo = texto.substring(i);
                    resultado += `<span style="color:${color}">${trozo}</span>`;
                    i = texto.length;
                    encontrado = true;
                    break;
                }
            }
        }

        if (!encontrado) {
            resultado += texto[i];
            i++;
        }
    }

    return resultado;
}

function typeEffect() {
    const elemento = document.getElementById("typing-text");
    currentText = textos[index];

    if (!isDeleting) {
        const parcial = currentText.substring(0, charIndex++);
        elemento.innerHTML = aplicarColor(parcial);
        if (charIndex > currentText.length) {
            setTimeout(() => isDeleting = true, 1000);
        }
    } else {
        const parcial = currentText.substring(0, charIndex--);
        elemento.innerHTML = aplicarColor(parcial);
        if (charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % textos.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

// ======== DESCARGA CV ========

document.getElementById("downloadCV").addEventListener("click", function() {
    const link = document.createElement("a");
    link.href = "cv.pdf";
    link.download = "Orlando_Daniel_CV.pdf"; 
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link); 
});