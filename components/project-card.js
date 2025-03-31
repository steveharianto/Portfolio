// Create a shared stylesheet link outside the class
const styleSheet = new CSSStyleSheet();
// Fetch the stylesheet once and use constructable stylesheets
fetch('/styles/project-card.css')
  .then(response => response.text())
  .then(css => {
    styleSheet.replaceSync(css);
  });

class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Use the shared stylesheet instead of creating new link elements
    this.shadowRoot.adoptedStyleSheets = [styleSheet];
    
    // Create the base structure once
    this.container = document.createElement('div');
    this.container.className = 'card';
    this.shadowRoot.appendChild(this.container);
    
    // Cache DOM references for faster updates
    this.elements = {
      imageContainer: null,
      image: null,
      title: null,
      dateWrapper: null,
      description: null,
      tags: null,
      actionLinks: null
    };
    
    // Initial render
    this.initializeDOM();
  }

  static get observedAttributes() {
    return ['image', 'title', 'description', 'tags', 'live-link', 'code-link', 'delay', 'live-disabled', 'code-disabled', 'start-date', 'end-date', 'project-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    // Only update the specific part that changed instead of re-rendering everything
    switch(name) {
      case 'image':
        if (this.elements.image) this.elements.image.src = newValue;
        break;
      case 'title':
        if (this.elements.title) this.elements.title.textContent = newValue;
        break;
      case 'description':
        if (this.elements.description) this.elements.description.textContent = newValue;
        break;
      case 'tags':
        this.updateTags(newValue);
        break;
      case 'start-date':
      case 'end-date':
        this.updateDates();
        break;
      case 'live-link':
      case 'code-link':
      case 'live-disabled':
      case 'code-disabled':
        this.updateActionLinks();
        break;
      default:
        // For other attributes, no immediate DOM updates needed
        break;
    }
  }
  
  // Initialize the DOM structure once
  initializeDOM() {
    // Create all DOM elements with empty/default values
    const fragment = document.createDocumentFragment();
    
    // Image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    imageContainer.style = "display: flex; align-items: center; justify-content: center; background-color: rgba(10, 27, 48, 0.6);";
    
    const img = document.createElement('img');
    img.style = "max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain;";
    imageContainer.appendChild(img);
    
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    imageContainer.appendChild(overlay);
    
    // Content container
    const content = document.createElement('div');
    content.className = 'content';
    
    // Title
    const title = document.createElement('h3');
    content.appendChild(title);
    
    // Date wrapper
    const dateWrapper = document.createElement('div');
    dateWrapper.className = 'date-wrapper';
    content.appendChild(dateWrapper);
    
    // Description
    const description = document.createElement('p');
    content.appendChild(description);
    
    // Tags
    const tags = document.createElement('div');
    tags.className = 'tags';
    content.appendChild(tags);
    
    // Details button
    const detailsButton = document.createElement('button');
    detailsButton.className = 'details-button';
    detailsButton.innerHTML = `
      View Details
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    `;
    content.appendChild(detailsButton);
    
    // Action links
    const actionLinks = document.createElement('div');
    actionLinks.className = 'action-links';
    content.appendChild(actionLinks);
    
    // Add everything to the container
    this.container.appendChild(imageContainer);
    this.container.appendChild(content);
    
    // Store references for later updates
    this.elements = {
      imageContainer,
      image: img,
      title,
      dateWrapper,
      description,
      tags,
      detailsButton,
      actionLinks
    };
    
    // Set up event listeners once
    detailsButton.addEventListener('click', () => {
      const projectId = this.getAttribute('project-id') || '0';
      window.openProjectDetails(projectId);
    });
    
    // Update with current attribute values
    this.updateAllContent();
  }
  
  // Update specific parts based on current attributes
  updateAllContent() {
    const image = this.getAttribute('image') || 'https://via.placeholder.com/600x400';
    const title = this.getAttribute('title') || 'Project Title';
    const description = this.getAttribute('description') || 'A brief description of the project, highlighting key features and technologies used.';
    
    this.elements.image.src = image;
    this.elements.image.alt = title;
    this.elements.title.textContent = title;
    this.elements.description.textContent = description;
    
    this.updateTags();
    this.updateDates();
    this.updateActionLinks();
  }
  
  updateTags() {
    const tags = this.getAttribute('tags') ? JSON.parse(this.getAttribute('tags')) : ['Tag 1', 'Tag 2', 'Tag 3'];
    
    // Clear existing tags and create new ones efficiently
    this.elements.tags.innerHTML = '';
    const tagFragment = document.createDocumentFragment();
    
    tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      tagFragment.appendChild(span);
    });
    
    this.elements.tags.appendChild(tagFragment);
  }
  
  updateDates() {
    const startDate = this.getAttribute('start-date') || 'N/A';
    const endDate = this.getAttribute('end-date') || 'N/A';
    
    this.elements.dateWrapper.innerHTML = `
      <span class="date-label">Started: ${startDate}</span>
      ${endDate === 'Ongoing' 
        ? '<span class="ongoing">Ongoing</span>' 
        : `<span class="date-label">Finished: <span class="completed">${endDate}</span></span>`}
    `;
  }
  
  updateActionLinks() {
    const liveLink = this.getAttribute('live-link') || '#';
    const codeLink = this.getAttribute('code-link') || '#';
    const liveDisabled = this.hasAttribute('live-disabled');
    const codeDisabled = this.hasAttribute('code-disabled');
    
    this.elements.actionLinks.innerHTML = `
      <div class="tooltip" ${liveDisabled ? 'data-tooltip="No live site available"' : ''}>
        <a href="${liveLink}" class="action-link ${liveDisabled ? 'disabled' : ''}" ${liveDisabled ? 'onclick="return false;"' : ''}>
          <span>View Live</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      
      <div class="tooltip" ${codeDisabled ? 'data-tooltip="Source code is private"' : ''}>
        <a href="${codeLink}" class="action-link ${codeDisabled ? 'disabled' : ''}" ${codeDisabled ? 'onclick="return false;"' : ''}>
          <span>View Code</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </a>
      </div>
    `;
  }
}

customElements.define('project-card', ProjectCard); 