// Import the projects data
import projectsData from '../data/projects.js';
import './project-details.js';

class ProjectsLoader {
  constructor(containerId, initialCount = 3) {
    this.container = document.getElementById(containerId);
    this.initialCount = initialCount;
    this.loadedCount = 0;
    this.allProjects = projectsData;
    this.viewMoreBtn = document.getElementById('view-more-projects');
    
    // Initialize
    this.init();
  }
  
  init() {
    // Load initial projects
    this.loadProjects(this.initialCount);
    
    // Add event listener to "View More" button
    if (this.viewMoreBtn) {
      this.viewMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.loadMoreProjects();
      });
    }
  }
  
  loadProjects(count) {
    // Batch DOM operations to avoid layout thrashing
    requestAnimationFrame(() => {
      // Create document fragment to batch DOM operations
      const fragment = document.createDocumentFragment();
      
      const projectsToLoad = this.allProjects.slice(this.loadedCount, this.loadedCount + count);
      
      projectsToLoad.forEach((project, index) => {
        const projectCard = document.createElement('project-card');
        
        // Create a project object with all properties
        const projectProps = {
          image: project.image,
          title: project.title,
          description: project.description,
          tags: JSON.stringify(project.tags),
          'live-link': project.liveLink,
          'code-link': project.codeLink,
          delay: (index * 100).toString(),
          'project-id': project.id.toString(),
          'start-date': project.startDate,
          'end-date': project.endDate
        };
        
        // Set attributes in a batch
        Object.entries(projectProps).forEach(([key, value]) => {
          projectCard.setAttribute(key, value);
        });
        
        // Set boolean attributes
        if (project.liveDisabled) projectCard.setAttribute('live-disabled', '');
        if (project.codeDisabled) projectCard.setAttribute('code-disabled', '');
        
        // Add to fragment instead of direct DOM
        fragment.appendChild(projectCard);
      });
      
      // Single DOM operation to add all cards
      this.container.appendChild(fragment);
      this.loadedCount += projectsToLoad.length;
      
      // Hide "View More" button if needed
      if (this.loadedCount >= this.allProjects.length && this.viewMoreBtn) {
        this.viewMoreBtn.style.display = 'none';
      }
    });
  }
  
  loadMoreProjects() {
    // Load 3 more projects
    this.loadProjects(3);
  }
}

// Initialize projects loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProjectsLoader('projects-container');
});

export default ProjectsLoader; 