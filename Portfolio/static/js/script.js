let nav = document.getElementById("nav");
const navbtn = () => {
    nav.classList.toggle("hidden")
}
const popup = document.getElementById("popup");


document.querySelectorAll('#nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.add("hidden");
    });
});

let scrollButton = document.getElementById("scrollButton");

window.onscroll = function () {
    let scrollHeight = window.innerHeight;
    let scrollPosition = window.pageYOffset;
    if (scrollPosition > scrollHeight) {
        scrollButton.classList.remove("hidden");
    } else {
        scrollButton.classList.add("hidden");
    }

};

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        fetch('/contact', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === "true")
                    popup.classList.toggle("hidden")
                setTimeout(() => {
                    popup.classList.toggle("hidden")
                }, 5000);
            })
            .catch(error => {
                console.error(error);
            });
    });
});


const slides = document.querySelector('.slides');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const totalSlides = document.querySelectorAll('.slide').length;

let index = 0;
let autoSlide;

function showSlide() {
    slides.style.transform = `translateX(-${index * 100}%)`;
    prevButton.disabled = index === 0;
    nextButton.disabled = index === totalSlides - 1;
}

function nextSlide() {
    index = (index + 1) % totalSlides;
    showSlide();
}

function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides; // Loop back to the last slide
    showSlide();
}

prevButton.addEventListener('click', () => {
    clearInterval(autoSlide); 
    prevSlide();
    startAutoSlide(); 
});

nextButton.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    nextSlide();
    startAutoSlide(); 
});

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
}

showSlide(); 
startAutoSlide();


