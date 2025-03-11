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
            link.classList.remove('text-cyan-400');
            // Remove underline span full width
            const underline = link.querySelector('span');
            if (underline) underline.classList.remove('w-full');
        });
        
        navLinks[index+1].classList.add('text-cyan-400');
        // Set underline span to full width for active link
        const activeUnderline = navLinks[index+1].querySelector('span');
        if (activeUnderline) activeUnderline.classList.add('w-full');
    }
    
    // Add scroll event listener to highlight active section
    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', highlightNavigation);
        // Call once on page load
        highlightNavigation();
    }
    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const heroSection = document.querySelector('#home');
        
        if (heroSection) {
            // Move the background slower than the scroll
            heroSection.style.backgroundPosition = `center ${scrollY * 0.5}px`;
        }
        
        // Change opacity of nav on scroll
        const nav = document.querySelector('nav');
        if (nav) {
            if (scrollY > 100) {
                nav.classList.add('bg-slate-900/95');
                nav.classList.remove('bg-slate-900/90');
            } else {
                nav.classList.add('bg-slate-900/90');
                nav.classList.remove('bg-slate-900/95');
            }
        }
    });
    
    // Typing effect for skills section
    function typeEffect(element, text, i = 0, speed = 50) {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(() => typeEffect(element, text, i, speed), speed);
        }
    }
    
    // Intersection Observer for the typing effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const typingElement = entry.target;
                const textToType = typingElement.getAttribute('data-text');
                
                if (textToType && typingElement.innerHTML === '') {
                    typeEffect(typingElement, textToType);
                }
                
                // Unobserve after typing starts
                observer.unobserve(typingElement);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe elements with typing-target class
    document.querySelectorAll('.typing-target').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize counters for skills
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        const target = parseInt(level.getAttribute('data-level'));
        let count = 0;
        const increment = () => {
            if (count < target) {
                count++;
                level.style.width = count + '%';
                setTimeout(increment, 20);
            }
        };
        
        // Use Intersection Observer to trigger counter
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    increment();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(level);
    });
});