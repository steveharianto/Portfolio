class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Add shared stylesheet once instead of inline styles
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '/styles/project-card.css');
    this.shadowRoot.appendChild(linkElem);
  }

  static get observedAttributes() {
    return ['image', 'title', 'description', 'tags', 'live-link', 'code-link', 'delay', 'live-disabled', 'code-disabled', 'start-date', 'end-date', 'project-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    // Only create/update DOM structure, no styles
    const container = document.createElement('div');
    container.className = 'card';
    
    const image = this.getAttribute('image') || 'https://via.placeholder.com/600x400';
    const title = this.getAttribute('title') || 'Project Title';
    const description = this.getAttribute('description') || 'A brief description of the project, highlighting key features and technologies used.';
    const tags = this.getAttribute('tags') ? JSON.parse(this.getAttribute('tags')) : ['Tag 1', 'Tag 2', 'Tag 3'];
    const liveLink = this.getAttribute('live-link') || '#';
    const codeLink = this.getAttribute('code-link') || '#';
    const delay = this.getAttribute('delay') || '100';
    const liveDisabled = this.hasAttribute('live-disabled');
    const codeDisabled = this.hasAttribute('code-disabled');
    const startDate = this.getAttribute('start-date') || 'N/A';
    const endDate = this.getAttribute('end-date') || 'N/A';
    const projectId = this.getAttribute('project-id') || '0';

    container.innerHTML = `
      <div class="image-container" style="display: flex; align-items: center; justify-content: center; background-color: rgba(10, 27, 48, 0.6);">
        <img src="${image}" alt="${title}" style="max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain;">
        <div class="overlay"></div>
      </div>
      
      <div class="content">
        <h3>${title}</h3>
        
        <div class="date-wrapper">
          <span class="date-label">Started: ${startDate}</span>
          ${endDate === 'Ongoing' 
            ? '<span class="ongoing">Ongoing</span>' 
            : `<span class="date-label">Finished: <span class="completed">${endDate}</span></span>`}
        </div>
        
        <p>${description}</p>
        
        <div class="tags">
          ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        
        <button class="details-button" onclick="window.openProjectDetails(${projectId})">
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        
        <div class="action-links">
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
        </div>
      </div>
    `;
    
    // Clear previous content except the stylesheet link
    while (this.shadowRoot.childNodes.length > 1) {
      this.shadowRoot.removeChild(this.shadowRoot.lastChild);
    }
    
    this.shadowRoot.appendChild(container);
  }
}

customElements.define('project-card', ProjectCard); 