// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        mirror: false
    });
    
    // Mobile menu toggle
    const menuButton = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData);
            
            // Log form data (replace with actual form submission)
            console.log('Form submitted:', formObject);
            
            // Show success message
            contactForm.innerHTML = `
                <div class="text-center py-8">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-cyan-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 class="text-2xl font-bold text-cyan-400 mb-2">Message Sent!</h3>
                    <p class="text-white mb-6">Thanks for reaching out. I'll get back to you soon!</p>
                    <button type="button" class="neon-button bg-gradient-to-r from-cyan-600 to-sky-600 text-white px-6 py-2 rounded-full">
                        Send Another Message
                    </button>
                </div>
            `;
        });
    }
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    // Throttle scroll event
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Use Intersection Observer instead of scroll events
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('text-cyan-400');
                    const href = link.getAttribute('href').substring(1);
                    if (href === id) {
                        link.classList.add('text-cyan-400');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => observer.observe(section));
    
    // Replace DOM-based particles with Canvas
    function createParticles() {
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        // Create particles data
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 6 + 2,
                speedX: Math.random() * 0.2 - 0.1,
                speedY: Math.random() * 0.2 - 0.1,
                color: `hsla(${Math.random() > 0.5 ? 195 : 210}, 100%, 70%, ${Math.random() * 0.3 + 0.1})`
            });
        }
        
        // Single animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                
                // Bounds checking
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
                
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Handle resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Call createParticles on load
    window.addEventListener('load', createParticles);
    
    // Add keyframe animation for particles
    const style = document.createElement('style');
    style.textContent = `
    @keyframes float {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
        100% { transform: translateY(0) rotate(360deg); opacity: 0.1; }
    }
    `;
    document.head.appendChild(style);
    
    // Defer non-critical operations
    setTimeout(() => {
        // Load projects after the initial render
        new ProjectsLoader('projects-container');
        
        // Initialize background effects after main content is shown
        initBackgroundEffects();
    }, 100);
});

function initBackgroundEffects() {
    // Canvas particle system
    createParticles();
}