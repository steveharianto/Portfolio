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
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-fuchsia-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 class="text-2xl font-bold text-fuchsia-400 mb-2">Message Sent!</h3>
                    <p class="text-white mb-6">Thanks for reaching out. I'll get back to you soon!</p>
                    <button type="button" class="neon-button bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-6 py-2 rounded-full">
                        Send Another Message
                    </button>
                </div>
            `;
        });
    }
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-fuchsia-400');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('text-fuchsia-400');
            }
        });
    });
    
    // Add gaming-inspired particle effects
    function createParticles() {
        const particleCount = 50;
        const container = document.body;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size between 2px and 8px
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100}vh`;
            
            // Random color variations
            const hue = Math.random() > 0.5 ? 328 : 292; // Pink or Purple
            particle.style.backgroundColor = `hsla(${hue}, 100%, 70%, ${Math.random() * 0.3 + 0.1})`;
            
            // Animation
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            
            container.appendChild(particle);
            
            // Move particles randomly
            setInterval(() => {
                const newX = parseFloat(particle.style.left) + (Math.random() * 2 - 1);
                const newY = parseFloat(particle.style.top) + (Math.random() * 2 - 1);
                
                particle.style.left = `${Math.max(0, Math.min(100, newX))}vw`;
                particle.style.top = `${Math.max(0, Math.min(100, newY))}vh`;
            }, 5000);
        }
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
});