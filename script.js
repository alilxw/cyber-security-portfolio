document.addEventListener('DOMContentLoaded', () => {
	// --- LOADER TYPEWRITER LOGIC ---
const loaderText = document.getElementById('loader-typewriter');
const loaderContainer = document.querySelector('.loader-typewriter-container');
const loaderPhrases = ["SOC Analyst", "Cyber Security Operations", "Information Systems Security Manager"];
let lPIdx = 0, lCIdx = 0, lIsDeleting = false;

function loaderTypeEffect() {
    const current = loaderPhrases[lPIdx];
    
    if (lIsDeleting) {
        loaderText.textContent = current.substring(0, lCIdx - 1);
        lCIdx--;
    } else {
        loaderText.textContent = current.substring(0, lCIdx + 1);
        lCIdx++;
    }

    let typeSpeed = lIsDeleting ? 50 : 100;

    if (!lIsDeleting && lCIdx === current.length) {
        lIsDeleting = true;
        typeSpeed = 1500; // Pause at end of phrase
    } else if (lIsDeleting && lCIdx === 0) {
        lIsDeleting = false;
        lPIdx = (lPIdx + 1) % loaderPhrases.length;
        typeSpeed = 200;
        
        // TRIGGER SWITCH GLITCH
        loaderContainer.classList.add('typewriter-glitch');
        setTimeout(() => loaderContainer.classList.remove('typewriter-glitch'), 300);
    }

    setTimeout(loaderTypeEffect, typeSpeed);
}

// Start the typewriter as soon as the loader appears
loaderTypeEffect();










	
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.content-section');
    const indicator = document.querySelector('.move-indicator');
    const body = document.body;
    const textElement = document.getElementById('typewriter');
    
    let isManualScroll = false; // Prevents observer conflict during clicks

    // --- 1. TYPEWRITER EFFECT ---
    const phrases = ["SOC Analyst","Cyber Security Operations","Information Systems Security Manager"];
    let pIdx = 0, cIdx = 0, isDeleting = false, typeSpeed = 100;

    function typeEffect() {
        const current = phrases[pIdx];
        textElement.textContent = isDeleting ? current.substring(0, cIdx - 1) : current.substring(0, cIdx + 1);
        cIdx = isDeleting ? cIdx - 1 : cIdx + 1;
        typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && cIdx === current.length) { isDeleting = true; typeSpeed = 2000; }
        else if (isDeleting && cIdx === 0) { isDeleting = false; pIdx = (pIdx + 1) % phrases.length; typeSpeed = 500; }
        setTimeout(typeEffect, typeSpeed);
    }
    if (textElement) typeEffect();

    // --- 2. INDICATOR LOGIC ---
    function moveIndicator(element) {
        if (!element || !indicator) return;
        indicator.style.width = `${element.offsetWidth}px`;
        indicator.style.left = `${element.offsetLeft}px`;
    }

    // --- 3. TAB SWITCHING + GLITCH ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (!targetSection || targetSection.classList.contains('active')) return;

            isManualScroll = true; // Disable observer temporarily
            body.classList.add('glitch-active');
            
            // Move indicator immediately on click
            moveIndicator(this);

            setTimeout(() => {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                sections.forEach(s => s.classList.remove('active'));
                targetSection.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 150);

            setTimeout(() => {
                body.classList.remove('glitch-active');
                isManualScroll = false; // Re-enable observer
            }, 400);
        });
    });

    // --- 4. SCROLL OBSERVER ---
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        if (isManualScroll) return; // Skip if we are currently clicking a tab

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const navLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (navLink) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    navLink.classList.add('active');
                    moveIndicator(navLink);
                }
            }
        });
    }, observerOptions);

    sections.forEach(s => observer.observe(s));

    // script.js - Improved Matrix Logic
    const canvas = document.getElementById('matrix-bg');
    if (canvas) {
    const ctx = canvas.getContext('2d');
    let columns;
    let drops;
    const fontSize = 14;
    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function initMatrix() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / fontSize;
        drops = Array(Math.floor(columns)).fill(1);
    }

    function drawMatrix() {
        ctx.fillStyle = "rgba(11, 11, 11, 0.1)"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#007bff"; 
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    initMatrix();
    setInterval(drawMatrix, 50);
    window.addEventListener('resize', initMatrix);
}

    // Initialize indicator position on load
    window.addEventListener('load', () => {
        const activeLink = document.querySelector('.nav-links a.active');
        if (activeLink) moveIndicator(activeLink);
    });
	
	function updateLabTime() {
    const timeElement = document.getElementById('realtime-date');
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // Format: 2026-03-21 19:45
    timeElement.textContent = `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Run once on load
updateLabTime();

// Optional: Update every minute so the time stays "live" while they browse
setInterval(updateLabTime, 6000);
});

// Type 'sudo' anywhere on the page to see a secret message
let input = "";
window.addEventListener('keydown', (e) => {
    input += e.key;
    if (input.includes("sudo")) {
        alert("ACCESS GRANTED: Root privileges enabled for guest user.");
        document.body.style.filter = "hue-rotate(180deg)"; // Turns the whole site a different color!
        input = "";
    }
});


window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    const bar = document.getElementById('loader-bar');
    const percentText = document.getElementById('percent');
    const statusText = document.getElementById('status-text');
    
    let progress = 0;
    const statusMessages = [
        "MTU_VERIFYING...",
        "SSL_HANDSHAKE_START...",
        "DECRYPTING_RSA_KEYS...",
        "BYPASSING_FIREWALL...",
        "ACCESS_GRANTED..."
    ];

    const loadTimer = setInterval(() => {
        // SMALLER INCREMENTS: 1 to 4% instead of 1 to 15%
        progress += Math.floor(Math.random() * 9) + 1; 
        
 if (progress >= 100) {
    progress = 100;
    clearInterval(loadTimer);
    
    // Immediate fade out once finished
    loader.classList.add('loader-hidden');
    document.body.classList.add('loaded');
    
    // Start the first section animation
    if (typeof showSection === "function") {
        showSection('about-me');
    }
}
        bar.style.width = progress + '%';
        percentText.innerText = progress + '%';
        
        let msgIndex = Math.floor((progress / 100) * statusMessages.length);
        statusText.innerText = statusMessages[Math.min(msgIndex, statusMessages.length - 1)];
        
    }, 180); // SLOWER TICK: 180ms instead of 120ms
});




const canvas = document.getElementById('data-trail');
const ctx = canvas.getContext('2d');

let particles = [];
const codes = "0101010101ABCDEF0123456789";

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.character = codes[Math.floor(Math.random() * codes.length)];
        this.opacity = 1;
        this.life = 1.0;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
    }

    draw() {
        ctx.fillStyle = `rgba(0, 123, 255, ${this.opacity})`; // Your accent blue
        ctx.font = "12px 'JetBrains Mono'";
        ctx.fillText(this.character, this.x, this.y);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.02; // How fast it disappears
        this.opacity = this.life;
    }
}

window.addEventListener('mousemove', (e) => {
    // Only create particles if moving (prevents clutter)
    for (let i = 0; i < 2; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();






/* 1. THE HIDDEN STATE */
.reveal-on-scroll {
    opacity: 0;
    filter: blur(15px) brightness(2);
    transform: translateY(50px);
    transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    will-change: opacity, transform, filter; /* Optimizes performance */
}

/* 2. THE REVEAL STATE (Must be below the hidden state) */
.reveal-on-scroll.active {
    opacity: 1;
    filter: blur(0) brightness(1);
    transform: translateY(0);
}
