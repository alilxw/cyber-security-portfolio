document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.content-section');
    const indicator = document.querySelector('.move-indicator');
    const textElement = document.getElementById('typewriter');
    
    let isManualScroll = false; 

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

    // --- 3. UPDATED SMOOTH TAB SWITCHING ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            isManualScroll = true; 
            
            // Move indicator immediately
            moveIndicator(this);
            
            // Run smooth section reveal
            showSection(targetId);

            // Re-enable observer after transition
            setTimeout(() => { isManualScroll = false; }, 800);
        });
    });

    // --- 4. SCROLL OBSERVER ---
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        if (isManualScroll) return; 

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

    // --- 5. MATRIX BACKGROUND ---
    const canvas = document.getElementById('matrix-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let columns, drops;
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
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }
        initMatrix();
        setInterval(drawMatrix, 50);
        window.addEventListener('resize', initMatrix);
    }
});

// --- 6. SMOOTH SECTION REVEAL FUNCTION ---
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    // Fade out current sections
    sections.forEach(section => {
        section.classList.remove('show');
        setTimeout(() => {
            section.style.display = 'none';
            section.classList.remove('active');
        }, 300); // Wait for fade-out before display:none
    });

    // Prepare and fade in the target
    setTimeout(() => {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        
        // Small delay to trigger CSS transition
        setTimeout(() => {
            targetSection.classList.add('show');
        }, 50);
    }, 350);
}

// --- 7. LOADING SCREEN & INITIALIZATION ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    const bar = document.getElementById('loader-bar');
    const percentText = document.getElementById('percent');
    const statusText = document.getElementById('status-text');
    
    let progress = 0;
    const statusMessages = ["MTU_VERIFYING...", "SSL_HANDSHAKE...", "DECRYPTING_KEYS...", "BYPASSING_FIREWALL...", "ALI_SOC_OS_LOADED"];

    const loadTimer = setInterval(() => {
        progress += Math.floor(Math.random() * 3) + 1;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadTimer);
            
            setTimeout(() => {
                loader.classList.add('loader-hidden');
                document.body.classList.add('loaded');
                
                // Initialize the first section smoothly
                showSection('about-me');
            }, 1000); 
        }
        bar.style.width = progress + '%';
        percentText.innerText = progress + '%';
        let msgIndex = Math.floor((progress / 100) * statusMessages.length);
        statusText.innerText = statusMessages[Math.min(msgIndex, statusMessages.length - 1)];
    }, 180);
});

// --- 8. UTILITIES (Sudo & Lab Time) ---
window.addEventListener('keydown', (e) => {
    window.inputBuffer = (window.inputBuffer || "") + e.key;
    if (window.inputBuffer.includes("sudo")) {
        alert("ACCESS GRANTED: Root privileges enabled.");
        document.body.style.filter = "hue-rotate(180deg)";
        window.inputBuffer = "";
    }
});

function updateLabTime() {
    const timeElement = document.getElementById('realtime-date');
    if (!timeElement) return;
    const now = new Date();
    timeElement.textContent = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}
setInterval(updateLabTime, 6000);
updateLabTime();
