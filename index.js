// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        offset: 100
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For now, let's just log it to console
            console.log('Form submission:', { name, email, message });
            
            // Show success message (in a real app, do this after successful submission)
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            button.disabled = true;
            button.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
            
            setTimeout(() => {
                contactForm.reset();
                button.innerHTML = '<svg class="h-5 w-5 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Message Sent!';
                
                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = originalText;
                }, 3000);
            }, 1500);
        });
    }
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    // Function to determine which section is in view
    function highlightNavigation() {
        let index = sections.length;
        const scrollPosition = window.scrollY + 200;
        
        while(--index && scrollPosition < sections[index].offsetTop) {}
        
        navLinks.forEach(link => {
            link.classList.remove('text-fuchsia-400');
            // Remove underline span full width
            const underline = link.querySelector('span');
            if (underline) underline.classList.remove('w-full');
        });
        
        navLinks[index].classList.add('text-fuchsia-400');
        // Set underline span to full width for active link
        const activeUnderline = navLinks[index].querySelector('span');
        if (activeUnderline) activeUnderline.classList.add('w-full');
    }
    
    // Add scroll event listener to highlight active section
    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', highlightNavigation);
        // Call once on page load
        highlightNavigation();
    }
    
    // Add some gaming-inspired particle effects
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'fixed inset-0 pointer-events-none z-0';
    document.body.appendChild(particlesContainer);
    
    // Create some random particles
    for (let i = 0; i < 20; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        
        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        
        // Random position
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        // Random color (purple/pink hues)
        const hue = Math.random() * 60 + 280; // 280-340 is purple to pink
        
        particle.className = 'absolute rounded-full';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.backgroundColor = `hsla(${hue}, 100%, 70%, 0.6)`;
        particle.style.boxShadow = `0 0 ${size * 2}px hsla(${hue}, 100%, 70%, 0.8)`;
        
        // Animation
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        
        particlesContainer.appendChild(particle);
        
        // Remove and recreate particle after some time
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, Math.random() * 10000 + 10000);
    }
});