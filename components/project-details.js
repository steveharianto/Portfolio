import projectsData from '../data/projects.js';

class ProjectDetailsModal {
  constructor() {
    this.modal = null;
    this.currentProject = null;
    this.renderedProjects = new Map(); // Cache for rendered projects
    this.lightbox = null;
    this.currentImageIndex = 0;
    this.images = [];
    this.createModalElement();
    this.setupCloseEvents();
  }

  createModalElement() {
    // Create modal container if it doesn't exist
    if (!this.modal) {
      this.modal = document.createElement('div');
      this.modal.id = 'project-details-modal';
      this.modal.className = 'fixed inset-0 z-50 hidden overflow-y-auto';
      document.body.appendChild(this.modal);
    }
  }

  setupCloseEvents() {
    // Listen for escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (e.target.id === 'modal-overlay') {
        this.closeModal();
      }
    });
  }

  openModal(projectId) {
    const project = projectsData.find(p => p.id === parseInt(projectId));
    if (!project) return;
    
    this.currentProject = project;
    
    // Check if we already rendered this project
    if (!this.renderedProjects.has(projectId)) {
      // Create modal content
      const content = document.createElement('div');
      content.innerHTML = this.generateModalHTML(project);
      // Store the rendered content
      this.renderedProjects.set(projectId, content.cloneNode(true));
    }
    
    // Clear current modal content
    while (this.modal.firstChild) {
      this.modal.removeChild(this.modal.firstChild);
    }
    
    // Insert the cached content
    this.modal.appendChild(this.renderedProjects.get(projectId).cloneNode(true));
    
    // Setup event handlers
    this.setupModalEvents();
    
    // Show modal with animation
    this.modal.classList.remove('hidden');
    setTimeout(() => {
      const overlay = document.getElementById('modal-overlay');
      const content = document.getElementById('modal-content');
      
      if (overlay) overlay.classList.remove('opacity-0');
      if (content) content.classList.remove('opacity-0', 'translate-y-10');
    }, 50);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    
    if (overlay) overlay.classList.add('opacity-0');
    if (content) content.classList.add('opacity-0', 'translate-y-10');
    
    // Hide modal after animation
    setTimeout(() => {
      this.modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
    
    // Clean up lightbox if it exists
    if (this.lightbox && this.lightbox.classList.contains('active')) {
      this.closeLightbox();
    }
  }

  renderProjectDetails() {
    const project = this.currentProject;
    const tagsHTML = project.tags.map(tag => `<span class="px-2 py-1 bg-blue-900/50 text-xs text-cyan-300 rounded">${tag}</span>`).join('');
    
    const statusClass = project.endDate === 'Ongoing' ? 'bg-green-500/20 text-green-400' : 'bg-cyan-500/20 text-cyan-300';
    const statusText = project.endDate === 'Ongoing' ? 'In Progress' : 'Completed';
    
    const featuresHTML = project.details.features.map(feature => `<li class="mb-2 flex items-start">
      <svg class="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>${feature}</span>
    </li>`).join('');
    
    const imagesHTML = project.details.images.map(img => `
      <div class="w-full p-2 project-gallery-item">
        <img src="${img}" alt="${project.title}" loading="lazy" class="rounded-lg shadow-lg">
      </div>
    `).join('');
    
    const imagesGrid = project.details.images.length > 0 ? `
      <div class="mt-8">
        <h3 class="text-xl font-bold mb-4 text-cyan-400">Project Gallery</h3>
        <div class="grid grid-cols-1 md:grid-cols-${Math.min(project.details.images.length, 3)} gap-4">
          ${imagesHTML}
        </div>
      </div>
    ` : '';

    this.modal.innerHTML = `
      <div id="modal-overlay" class="fixed inset-0 bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
      
      <div class="relative min-h-screen flex items-center justify-center p-4">
        <div id="modal-content" class="bg-blue-900/70 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto opacity-0 translate-y-10 transition-all duration-300 transform">
          <div class="relative">
            <button id="close-modal" class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div class="w-full h-48 md:h-64 overflow-hidden flex items-center justify-center bg-blue-900/50">
              <img src="${project.image}" alt="${project.title}" class="max-w-full max-h-full w-auto h-auto object-contain">
              <div class="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-70"></div>
            </div>
            
            <div class="absolute bottom-4 left-6">
              <span class="px-3 py-1 rounded-full ${statusClass} text-sm font-medium">${statusText}</span>
            </div>
          </div>
          
          <div class="p-6 md:p-8">
            <div class="flex flex-col md:flex-row justify-between md:items-center mb-6">
              <h2 class="text-2xl md:text-3xl font-bold text-cyan-400 mb-2 md:mb-0">${project.title}</h2>
              <div class="text-sm text-cyan-100">
                <span class="inline-block mr-3">Started: ${project.startDate}</span>
                <span>${project.endDate === 'Ongoing' ? '<span class="text-green-400 font-semibold">Ongoing</span>' : `Finished: ${project.endDate}`}</span>
              </div>
            </div>
            
            <div class="mb-6">
              <h3 class="text-xl font-bold mb-3 text-cyan-400">Project Overview</h3>
              <p class="text-gray-300 mb-4">${project.details.overview}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="glass-card p-4 rounded-lg">
                <h3 class="text-lg font-bold mb-2 text-cyan-400">Role</h3>
                <p class="text-gray-300">${project.details.role}</p>
              </div>
              
              <div class="glass-card p-4 rounded-lg">
                <h3 class="text-lg font-bold mb-2 text-cyan-400">Project Duration</h3>
                <p class="text-gray-300">${project.startDate} - ${project.endDate}</p>
              </div>
              
              <div class="glass-card p-4 rounded-lg">
                <h3 class="text-lg font-bold mb-2 text-cyan-400">Technologies</h3>
                <div class="flex flex-wrap gap-2">
                  ${tagsHTML}
                </div>
              </div>
            </div>
            
            <div class="mb-6">
              <h3 class="text-xl font-bold mb-3 text-cyan-400">Key Features</h3>
              <ul class="text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-4">
                ${featuresHTML}
              </ul>
            </div>
            
            ${imagesGrid}
            
            <div class="mt-10 mb-6 pt-6 border-t border-cyan-500/20">
              <h3 class="text-xl font-bold mb-5 text-cyan-400">Development Story</h3>
              
              <div class="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <h4 class="text-lg font-bold mb-2 text-cyan-300">The Challenge</h4>
                  <p class="text-gray-300">${project.details.challenge}</p>
                </div>
                
                <div>
                  <h4 class="text-lg font-bold mb-2 text-cyan-300">The Solution</h4>
                  <p class="text-gray-300">${project.details.solution}</p>
                </div>
                
                <div>
                  <h4 class="text-lg font-bold mb-2 text-cyan-300">Outcome</h4>
                  <p class="text-gray-300">${project.details.outcome}</p>
                </div>
              </div>
            </div>
            
            <div class="flex justify-between items-center mt-8 pt-4 border-t border-cyan-500/20">
              <div>
                <div class="tooltip ${project.liveDisabled ? 'data-tooltip="No live site available"' : ''}">
                  <a href="${project.liveLink}" class="px-4 py-2 bg-gradient-to-r from-cyan-600 to-sky-600 text-white rounded-lg shadow-lg inline-flex items-center ${project.liveDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:from-cyan-500 hover:to-sky-500'}" ${project.liveDisabled ? 'onclick="return false;"' : ''}>
                    <span>View Live Site</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <div class="tooltip ${project.codeDisabled ? 'data-tooltip="Source code is private"' : ''}">
                  <a href="${project.codeLink}" class="px-4 py-2 bg-blue-800 text-white rounded-lg shadow-lg inline-flex items-center ${project.codeDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}" ${project.codeDisabled ? 'onclick="return false;"' : ''}>
                    <span>View Code</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Setup close button event
    this.modal.querySelector('#close-modal').addEventListener('click', () => this.closeModal());
  }

  // Separate HTML generation from DOM manipulation
  generateModalHTML(project) {
    const tagsHTML = project.tags.map(tag => `<span class="px-2 py-1 bg-blue-900/50 text-xs text-cyan-300 rounded">${tag}</span>`).join('');
    
    const statusClass = project.endDate === 'Ongoing' ? 'bg-green-500/20 text-green-400' : 'bg-cyan-500/20 text-cyan-300';
    const statusText = project.endDate === 'Ongoing' ? 'In Progress' : 'Completed';
    
    const featuresHTML = project.details.features.map(feature => `<li class="mb-2 flex items-start">
      <svg class="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>${feature}</span>
    </li>`).join('');
    
    const imagesHTML = project.details.images.map(img => `
      <div class="w-full p-2 project-gallery-item">
        <img src="${img}" alt="${project.title}" loading="lazy" class="rounded-lg shadow-lg">
      </div>
    `).join('');
    
    const imagesGrid = project.details.images.length > 0 ? `
      <div class="mt-8">
        <h3 class="text-xl font-bold mb-4 text-cyan-400">Project Gallery</h3>
        <div class="grid grid-cols-1 md:grid-cols-${Math.min(project.details.images.length, 3)} gap-4">
          ${imagesHTML}
        </div>
      </div>
    ` : '';

    return `
      <div id="modal-overlay" class="fixed inset-0 bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
      
      <div class="relative min-h-screen flex items-center justify-center p-4">
        <div id="modal-content" class="bg-blue-900/70 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto opacity-0 translate-y-10 transition-all duration-300 transform">
          <div class="relative">
            <button id="close-modal" class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div class="w-full h-48 md:h-64 overflow-hidden flex items-center justify-center bg-blue-900/50">
              <img src="${project.image}" alt="${project.title}" class="max-w-full max-h-full w-auto h-auto object-contain">
              <div class="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-70"></div>
            </div>
            
            <div class="absolute bottom-4 left-6">
              <span class="px-3 py-1 rounded-full ${statusClass} text-sm font-medium">${statusText}</span>
            </div>
          </div>
          
          <div class="p-6 md:p-8">
            <div class="flex flex-col md:flex-row justify-between md:items-center mb-6">
              <h2 class="text-2xl md:text-3xl font-bold text-cyan-400 mb-2 md:mb-0">${project.title}</h2>
              <div class="text-sm text-cyan-100">
                <span class="inline-block mr-3">Started: ${project.startDate}</span>
                <span>${project.endDate === 'Ongoing' ? '<span class="text-green-400 font-semibold">Ongoing</span>' : `Finished: ${project.endDate}`}</span>
              </div>
            </div>
            
            <div class="mb-6">
              <h3 class="text-xl font-bold mb-3 text-cyan-400">Project Overview</h3>
              <p class="text-gray-300 mb-4">${project.details.overview}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="glass-card p-4 rounded-lg">
                <h3 class="text-lg font-bold mb-2 text-cyan-400">Role</h3>
                <p class="text-gray-300">${project.details.role}</p>
              </div>
              
              <div class="glass-card p-4 rounded-lg">
                <h3 class="text-lg font-bold mb-2 text-cyan-400">Project Duration</h3>
                <p class="text-gray-300">${project.startDate} - ${project.endDate}</p>
              </div>
              
              <div class="glass-card p-4 rounded-lg">
                <h3 class="text-lg font-bold mb-2 text-cyan-400">Technologies</h3>
                <div class="flex flex-wrap gap-2">
                  ${tagsHTML}
                </div>
              </div>
            </div>
            
            <div class="mb-6">
              <h3 class="text-xl font-bold mb-3 text-cyan-400">Key Features</h3>
              <ul class="text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-4">
                ${featuresHTML}
              </ul>
            </div>
            
            ${imagesGrid}
            
            <div class="mt-10 mb-6 pt-6 border-t border-cyan-500/20">
              <h3 class="text-xl font-bold mb-5 text-cyan-400">Development Story</h3>
              
              <div class="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <h4 class="text-lg font-bold mb-2 text-cyan-300">The Challenge</h4>
                  <p class="text-gray-300">${project.details.challenge}</p>
                </div>
                
                <div>
                  <h4 class="text-lg font-bold mb-2 text-cyan-300">The Solution</h4>
                  <p class="text-gray-300">${project.details.solution}</p>
                </div>
                
                <div>
                  <h4 class="text-lg font-bold mb-2 text-cyan-300">Outcome</h4>
                  <p class="text-gray-300">${project.details.outcome}</p>
                </div>
              </div>
            </div>
            
            <div class="flex justify-between items-center mt-8 pt-4 border-t border-cyan-500/20">
              <div>
                <div class="tooltip ${project.liveDisabled ? 'data-tooltip="No live site available"' : ''}">
                  <a href="${project.liveLink}" class="px-4 py-2 bg-gradient-to-r from-cyan-600 to-sky-600 text-white rounded-lg shadow-lg inline-flex items-center ${project.liveDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:from-cyan-500 hover:to-sky-500'}" ${project.liveDisabled ? 'onclick="return false;"' : ''}>
                    <span>View Live Site</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <div class="tooltip ${project.codeDisabled ? 'data-tooltip="Source code is private"' : ''}">
                  <a href="${project.codeLink}" class="px-4 py-2 bg-blue-800 text-white rounded-lg shadow-lg inline-flex items-center ${project.codeDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}" ${project.codeDisabled ? 'onclick="return false;"' : ''}>
                    <span>View Code</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupModalEvents() {
    const modal = this.modal;
    
    // Setup close button event
    const closeButton = modal.querySelector('#close-modal');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.closeModal());
    }
    
    // Setup gallery image clicks
    const galleryItems = modal.querySelectorAll('.project-gallery-item');
    if (galleryItems.length > 0) {
      this.images = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        return img ? img.src : null;
      }).filter(Boolean);
      
      galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          this.openLightbox(index);
        });
      });
    }
  }
  
  openLightbox(index) {
    if (!this.lightbox) {
      this.createLightbox();
    }
    
    this.currentImageIndex = index;
    this.updateLightboxImage();
    
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  }
  
  closeLightbox() {
    if (this.lightbox) {
      this.lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }
  
  createLightbox() {
    // Create lightbox element only once when needed (lazy initialization)
    this.lightbox = document.createElement('div');
    this.lightbox.className = 'lightbox';
    this.lightbox.innerHTML = `
      <div class="lightbox-close">×</div>
      <div class="lightbox-nav lightbox-prev">❮</div>
      <div class="lightbox-nav lightbox-next">❯</div>
      <div class="lightbox-content">
        <img class="lightbox-image" src="" alt="Project Image">
      </div>
    `;
    
    document.body.appendChild(this.lightbox);
    
    // Setup lightbox event listeners
    const close = this.lightbox.querySelector('.lightbox-close');
    const content = this.lightbox.querySelector('.lightbox-content');
    const prev = this.lightbox.querySelector('.lightbox-prev');
    const next = this.lightbox.querySelector('.lightbox-next');
    
    // Close on click outside image
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox || e.target === content) {
        this.closeLightbox();
      }
    });
    
    // Close button
    close.addEventListener('click', () => this.closeLightbox());
    
    // Navigation
    prev.addEventListener('click', (e) => {
      e.stopPropagation();
      this.prevImage();
    });
    
    next.addEventListener('click', (e) => {
      e.stopPropagation();
      this.nextImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  
  handleKeyDown(e) {
    if (!this.lightbox || !this.lightbox.classList.contains('active')) return;
    
    switch (e.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowLeft':
        this.prevImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
    }
  }
  
  prevImage() {
    if (this.images.length <= 1) return;
    
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    this.updateLightboxImage();
  }
  
  nextImage() {
    if (this.images.length <= 1) return;
    
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.updateLightboxImage();
  }
  
  updateLightboxImage() {
    if (!this.lightbox) return;
    
    const image = this.lightbox.querySelector('.lightbox-image');
    if (image && this.images[this.currentImageIndex]) {
      // Use the Dataset API to store the current src for comparison
      const currentSrc = image.dataset.src;
      const newSrc = this.images[this.currentImageIndex];
      
      // Only update if the source has changed (optimization)
      if (currentSrc !== newSrc) {
        // Apply loading state
        image.style.opacity = '0.5';
        
        // Update the image
        image.src = newSrc;
        image.dataset.src = newSrc;
        
        // Remove loading state once loaded
        image.onload = () => {
          image.style.opacity = '1';
        };
      }
    }
  }
}

// Initialize the modal
const projectModal = new ProjectDetailsModal();

// Make modal accessible globally
window.openProjectDetails = (projectId) => {
  projectModal.openModal(projectId);
};

export default ProjectDetailsModal; 