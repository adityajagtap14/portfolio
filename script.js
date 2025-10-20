document.addEventListener("DOMContentLoaded", function() {

    // --- Hamburger Menu (Unchanged) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // --- Active Nav Link on Scroll (Unchanged) ---
    const sections = document.querySelectorAll("section[id]"); 
    const navLinks = document.querySelectorAll(".nav-link");

    function onScroll() {
        let scrollY = window.pageYOffset;
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        if (scrollY < sections[0].offsetTop - 80) {
            currentSection = "home";
        }

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", onScroll);
    onScroll();

    // --- Fade-in Section on Scroll (Unchanged) ---
    const fadeElements = document.querySelectorAll(".fade-in-left, .fade-in-right");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // --- Dynamic Scrolling Header (Unchanged) ---
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    });

    // --- UPDATED: Mouse-Reactive Orbs (Faster) ---
    const orb1 = document.querySelector(".orb-1");
    const orb2 = document.querySelector(".orb-2");

    document.addEventListener("mousemove", (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        window.requestAnimationFrame(() => {
            if (orb1) {
                // NEW fast values
                orb1.style.transform = `translate(${-x * 30}px, ${-y * 20}px)`; 
            }
            if (orb2) {
                // NEW fast values
                orb2.style.transform = `translate(${x * 15}px, ${y * 40}px)`;
            }
        });
    });

    // --- Button Ripple Effect (Unchanged) ---
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {
        button.addEventListener("click", function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement("span");
            ripple.classList.add("ripple");
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // --- Contact Form (Unchanged) ---
    const contactForm = document.getElementById("contact-form");
    const successMessage = document.getElementById("form-success-message");

    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name && email && message) {
            successMessage.classList.add("visible");
            contactForm.reset();
            
            setTimeout(() => {
                successMessage.classList.remove("visible");
            }, 5000);

        } else {
            alert("Please fill out all fields.");
        }
    });
});
