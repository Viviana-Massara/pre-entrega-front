let indice = 0;
const slides = document.querySelectorAll(".slide");

const siguiente = document.getElementById("siguiente");
const anterior = document.getElementById("anterior");

function mostrarSlide(numero) {
    slides.forEach(slide => {
        slide.classList.remove("activo");
    });
    slides[numero].classList.add("activo");
}

siguiente.addEventListener("click", () => {
    indice++;

    if (indice >= slides.length) {
        indice = 0;
    }
    mostrarSlide(indice);
});

anterior.addEventListener("click", () => {
    indice--;

    if (indice < 0) {
        indice = slides.length - 1;
    }
    mostrarSlide(indice);
});