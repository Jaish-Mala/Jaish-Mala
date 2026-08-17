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

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const formData = new FormData(contactForm);

        fetch("https://script.google.com/macros/s/AKfycbxWqmamKqsKetxKOoYgRFYV_jtNkuwev5JPCiK8kEXiqt3dCM4cfMfwFKaFkR-a5P8t/exec", {
            method: "POST",
            body: new URLSearchParams(formData),
            mode: "no-cors"
        })
        .then(() => {
            alert("Thank you! Your message has been sent successfully.");
            contactForm.reset();
        })
        .catch((error) => {
            console.error("Form Error:", error);
            alert("Something went wrong. Please try again.");
        });

    });
}