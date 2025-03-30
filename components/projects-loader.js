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
    const projectsToLoad = this.allProjects.slice(this.loadedCount, this.loadedCount + count);
    
    projectsToLoad.forEach((project, index) => {
      const projectCard = document.createElement('project-card');
      
      // Set attributes based on project data
      projectCard.setAttribute('image', project.image);
      projectCard.setAttribute('title', project.title);
      projectCard.setAttribute('description', project.description);
      projectCard.setAttribute('tags', JSON.stringify(project.tags));
      projectCard.setAttribute('live-link', project.liveLink);
      projectCard.setAttribute('code-link', project.codeLink);
      projectCard.setAttribute('delay', (index * 100).toString());
      projectCard.setAttribute('project-id', project.id.toString());
      
      // Set date information
      projectCard.setAttribute('start-date', project.startDate);
      projectCard.setAttribute('end-date', project.endDate);
      
      // Set disabled states
      if (project.liveDisabled) {
        projectCard.setAttribute('live-disabled', '');
      }
      
      if (project.codeDisabled) {
        projectCard.setAttribute('code-disabled', '');
      }
      
      // Append to container
      this.container.appendChild(projectCard);
    });
    
    this.loadedCount += projectsToLoad.length;
    
    // Hide "View More" button if all projects are loaded
    if (this.loadedCount >= this.allProjects.length && this.viewMoreBtn) {
      this.viewMoreBtn.style.display = 'none';
    }
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