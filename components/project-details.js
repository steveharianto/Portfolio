import projectsData from '../data/projects.js';

class ProjectDetailsModal {
  constructor() {
    this.modal = null;
    this.currentProject = null;
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
    this.renderProjectDetails();
    
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
  }

  renderProjectDetails() {
    const project = this.currentProject;
    const tagsHTML = project.tags.map(tag => `<span class="px-2 py-1 bg-purple-900/50 text-xs text-fuchsia-300 rounded">${tag}</span>`).join('');
    
    const statusClass = project.endDate === 'Ongoing' ? 'bg-green-500/20 text-green-400' : 'bg-fuchsia-500/20 text-fuchsia-300';
    const statusText = project.endDate === 'Ongoing' ? 'In Progress' : 'Completed';
    
    const featuresHTML = project.details.features.map(feature => `<li class="mb-2 flex items-start">
      <svg class="w-5 h-5 text-fuchsia-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>${feature}</span>
    </li>`).join('');
    
    const imagesHTML = project.details.images.map(img => `
      <div class="w-full p-2">
        <img src="${img}" alt="${project.title}" class="w-full h-auto rounded-lg shadow-lg object-cover">
      </div>
    `).join('');
    
    const imagesGrid = project.details.images.length > 0 ? `
      <div class="mt-8">
        <h3 class="text-xl font-bold mb-4 text-fuchsia-400">Project Gallery</h3>
        <div class="grid grid-cols-1 md:grid-cols-${Math.min(project.details.images.length, 3)} gap-4">
          ${imagesHTML}
        </div>
      </div>
    ` : '';

    this.modal.innerHTML = `
      <div id="modal-overlay" class="fixed inset-0 bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
      
      <div class="relative min-h-screen flex items-center justify-center p-4">
        <div id="modal-content" class="bg-purple-900/70 backdrop-blur-xl border border-fuchsia-500/30 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto opacity-0 translate-y-10 transition-all duration-300 transform">
          <div class="relative">
            <button id="close-modal" class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div class="w-full h-48 md:h-64 overflow-hidden">
              <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-70"></div>
            </div>
            
            <div class="absolute bottom-4 left-6">
              <span class="px-3 py-1 rounded-full ${statusClass} text-sm font-medium">${statusText}</span>
            </div>
          </div>
          
          <div class="p-6 md:p-8">
            <div class="flex flex-col md:flex-row justify-between md:items-center mb-6">
              <h2 class="text-2xl md:text-3xl font-bold text-fuchsia-400 mb-2 md:mb-0">${project.title}</h2>
              <div class="text-sm text-fuchsia-100">
                <span class="inline-block mr-3">Started: ${project.startDate}</span>
                <span>${project.endDate === 'Ongoing' ? '<span class="text-green-400 font-semibold">Ongoing</span>' : `Finished: ${project.endDate}`}</span>
              </div>
            </div>
            
            <div class="mb-6">
              <h3 class="text-xl font-bold mb-3 text-fuchsia-400">Project Overview</h3>
              <p class="text-gray-300 mb-4">${project.details.overview}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="glass-card p-4 rounded-lg">
                <h3 class="text-lg font-bold mb-2 text-fuchsia-400">Role</h3>
                <p class="text-gray-300">${project.details.role}</p>
              </div>
              
              <div class="glass-card p-4 rounded-lg">
                <h3 class="text-lg font-bold mb-2 text-fuchsia-400">Project Duration</h3>
                <p class="text-gray-300">${project.startDate} - ${project.endDate}</p>
              </div>
              
              <div class="glass-card p-4 rounded-lg">
                <h3 class="text-lg font-bold mb-2 text-fuchsia-400">Technologies</h3>
                <div class="flex flex-wrap gap-2">
                  ${tagsHTML}
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 class="text-xl font-bold mb-3 text-fuchsia-400">The Challenge</h3>
                <p class="text-gray-300">${project.details.challenge}</p>
              </div>
              
              <div>
                <h3 class="text-xl font-bold mb-3 text-fuchsia-400">The Solution</h3>
                <p class="text-gray-300">${project.details.solution}</p>
              </div>
            </div>
            
            <div class="mb-6">
              <h3 class="text-xl font-bold mb-3 text-fuchsia-400">Key Features</h3>
              <ul class="text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                ${featuresHTML}
              </ul>
            </div>
            
            <div class="mb-6">
              <h3 class="text-xl font-bold mb-3 text-fuchsia-400">Outcome</h3>
              <p class="text-gray-300">${project.details.outcome}</p>
            </div>
            
            ${imagesGrid}
            
            <div class="flex justify-between items-center mt-8 pt-4 border-t border-fuchsia-500/20">
              <div>
                <div class="tooltip ${project.liveDisabled ? 'data-tooltip="No live site available"' : ''}">
                  <a href="${project.liveLink}" class="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white rounded-lg shadow-lg inline-flex items-center ${project.liveDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:from-fuchsia-500 hover:to-pink-500'}" ${project.liveDisabled ? 'onclick="return false;"' : ''}>
                    <span>View Live Site</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <div class="tooltip ${project.codeDisabled ? 'data-tooltip="Source code is private"' : ''}">
                  <a href="${project.codeLink}" class="px-4 py-2 bg-purple-800 text-white rounded-lg shadow-lg inline-flex items-center ${project.codeDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}" ${project.codeDisabled ? 'onclick="return false;"' : ''}>
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
}

// Initialize the modal
const projectModal = new ProjectDetailsModal();

// Make modal accessible globally
window.openProjectDetails = (projectId) => {
  projectModal.openModal(projectId);
};

export default ProjectDetailsModal; 