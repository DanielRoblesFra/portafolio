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
    link.href = "cv/Resumen_Profesional.pdf";
    link.download = "CV_Daniel_Robles";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// ======== OVERLAY — EXPANDIR TARJETAS Y VIDEOS ========

const overlay        = document.getElementById("overlay");
const overlayContenido = document.getElementById("overlayContenido");

// Detectar si es móvil
function esMobil() {
    return window.innerWidth <= 480;
}

// Abrir overlay con contenido clonado
function abrirOverlay(contenido) {
    overlayContenido.innerHTML = "";

    // Botón cerrar
    const btnCerrar = document.createElement("button");
    btnCerrar.classList.add("overlay-cerrar");
    btnCerrar.innerHTML = "✕";
    btnCerrar.addEventListener("click", cerrarOverlay);

    overlayContenido.appendChild(btnCerrar);
    overlayContenido.appendChild(contenido);
    overlay.classList.add("activo");
    document.body.style.overflow = "hidden";
}

// Cerrar overlay
function cerrarOverlay() {
    overlay.classList.remove("activo");
    document.body.style.overflow = "";

    // Detener video si hay uno dentro del overlay
    const videoOverlay = overlayContenido.querySelector("video");
    if (videoOverlay) videoOverlay.pause();

    overlayContenido.innerHTML = "";
}

// Cerrar al hacer click en el fondo
overlay.addEventListener("click", function(e) {
    if (e.target === overlay) cerrarOverlay();
});

// Cerrar con tecla Escape
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") cerrarOverlay();
});

// ---- TARJETAS DE PROYECTOS ----
document.querySelectorAll(".proyecto-card").forEach(card => {
    card.addEventListener("click", function() {
        // En móvil no hacemos nada con proyectos
        if (esMobil()) return;

        const clon = card.cloneNode(true);

        // Los botones del clon deben abrir links sin cerrar overlay
        clon.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", e => e.stopPropagation());
        });

        abrirOverlay(clon);
    });
});

// ---- VIDEOS DE BOXEO ----
document.querySelectorAll(".boxeo-video-wrap").forEach(wrap => {
    wrap.addEventListener("click", function() {
        const videoOriginal = wrap.querySelector("video");

        // Crear video nuevo con la misma fuente
        const videoClonado = document.createElement("video");
        videoClonado.src = videoOriginal.src;
        videoClonado.autoplay = true;
        videoClonado.loop = true;
        videoClonado.muted = true;
        videoClonado.playsInline = true;
        videoClonado.controls = true; // Con controles en el overlay

        abrirOverlay(videoClonado);
    });
});
