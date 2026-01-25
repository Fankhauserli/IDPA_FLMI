document.addEventListener("DOMContentLoaded", function() {
    fetch("/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            
            // Burger Menu Logic
            const burger = document.getElementById('burger-menu');
            const nav = document.querySelector('.nav-links');
            const navLinks = document.querySelectorAll('.nav-links li');

            burger.addEventListener('click', () => {
                // Toggle Nav
                nav.classList.toggle('nav-active');

                // Animate Links
                navLinks.forEach((link, index) => {
                    if (link.style.animation) {
                        link.style.animation = '';
                    } else {
                        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    }
                });

                // Burger Animation
                burger.classList.toggle('toggle');
            });
        });
});

