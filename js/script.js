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

/* =========================
   PROJECT SLIDER
========================= */

const projectContainer = document.querySelector(".project-container");
const projectCards = document.querySelectorAll(".project-card");
const projectDots = document.querySelectorAll(".project-dot");

let currentProject = 0;

if (projectContainer && projectCards.length > 0) {

    /* Create slider track automatically */
    const projectTrack = document.createElement("div");
    projectTrack.className = "project-track";

    projectCards.forEach(card => {
        projectTrack.appendChild(card);
    });

    projectContainer.appendChild(projectTrack);


    function updateProjectSlider() {

        const isMobile = window.innerWidth <= 768;

        const cardsToShow = isMobile ? 1 : 3;

        const cardWidth = projectCards[0].offsetWidth;

        const gap = isMobile ? 0 : 30;

        const maxPosition =
            Math.max(0, projectCards.length - cardsToShow);

        if (currentProject > maxPosition) {
            currentProject = maxPosition;
        }

        const moveAmount = cardWidth + gap;

        projectTrack.style.transform =
            `translateX(-${currentProject * moveAmount}px)`;


        /* Update dots */

        projectDots.forEach(dot => {
            dot.classList.remove("active");
        });

        if (projectDots.length > 0) {

            if (currentProject === 0) {
                projectDots[0].classList.add("active");
            } else if (projectDots.length > 1) {
                projectDots[1].classList.add("active");
            }

        }
    }


    /* =========================
       NEXT / PREVIOUS
    ========================= */

    window.moveProjects = function(direction) {

        const isMobile = window.innerWidth <= 768;

        const cardsToShow = isMobile ? 1 : 3;

        const maxPosition =
            Math.max(0, projectCards.length - cardsToShow);

        currentProject += direction;

        /* Go back to first */
        if (currentProject > maxPosition) {
            currentProject = 0;
        }

        /* Go to last */
        if (currentProject < 0) {
            currentProject = maxPosition;
        }

        updateProjectSlider();
    };


    /* =========================
       DOT CLICK
    ========================= */

    projectDots.forEach((dot, index) => {

        dot.addEventListener("click", function() {

            if (index === 0) {
                currentProject = 0;
            }

            if (index === 1) {
                currentProject =
                    Math.max(0, projectCards.length - 3);
            }

            updateProjectSlider();

        });

    });


    /* =========================
       RESIZE
    ========================= */

    window.addEventListener("resize", function() {
        currentProject = 0;
        updateProjectSlider();
    });


    /* Initial */
    updateProjectSlider();
}