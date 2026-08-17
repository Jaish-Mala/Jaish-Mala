const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}
const links = document.querySelectorAll("nav a");

links.forEach(link => {
    link.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        navMenu.classList.remove("active");
        const startPosition = window.scrollY;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
        const distance = targetPosition - startPosition;

        const duration = 400; // 400ms = 0.4 seconds
        let startTime = null;

        function animation(currentTime) {

            if (startTime === null) {
                startTime = currentTime;
            }

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            window.scrollTo(
                0,
                startPosition + distance * progress
            );

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);

    });
});
const revealElements = document.querySelectorAll(
    ".about-image, .about-content, .skills-content, .project-card, .contact-info, .contact-form, .skill-progress"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.2
});

revealElements.forEach((element) => {
    observer.observe(element);
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }

    });

});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const formData = new FormData(contactForm);

    fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnSTaOcHmpisjOU3v31sbbMHRLASCx52eBlyS4725g5wdVzIH-oLgAQiE1NyCh3doj3vBTR_Znm6XhVgL5IDmkoZFGWuy6aVgRmUftwllf-KDo9sM-nKrTyNTAdUDP4LdvghXdIvn_pgNpnDKhupZLqHhAY4QGH5RRa_cLYBaGvFOxX43FDDdOxKN3m1nyiOsZcjf5XqxG3OIJ7_a3fE29QW5XMpjekZsnPVv3vzEdN0aH46RA5So9gclg9eCEZmtiv9Zahp-1kbUFink5-aPyg9Kl6SuQ&lib=M9ZLfrI4kUd-taUsDZEApL0tJZtfL3MXQ", {
        method: "POST",
        body: new URLSearchParams(formData),
        mode: "no-cors"
    });

    alert("Thank you! Your message has been sent successfully.");

    contactForm.reset();

});