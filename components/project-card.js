class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .card {
          background: rgba(26, 11, 48, 0.4);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(217, 70, 239, 0.2);
          border-radius: 0.75rem;
          overflow: hidden;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 15px rgba(217, 70, 239, 0.2);
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5), 0 0 20px rgba(217, 70, 239, 0.4);
          border-color: rgba(217, 70, 239, 0.4);
        }
        
        .image-container {
          position: relative;
          overflow: hidden;
          height: 180px;
        }
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        
        .card:hover img {
          transform: scale(1.1);
        }
        
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26, 11, 48, 0.9) 0%, rgba(26, 11, 48, 0.5) 50%, rgba(26, 11, 48, 0) 100%);
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        
        .card:hover .overlay {
          opacity: 0.9;
        }
        
        .content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.75rem 0;
          color: rgb(232, 121, 249);
          font-family: 'Rajdhani', sans-serif;
          letter-spacing: 0.5px;
        }
        
        .date-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }
        
        .date-label {
          color: rgba(232, 121, 249, 0.7);
          font-family: 'Poppins', sans-serif;
        }
        
        .ongoing {
          color: rgb(34, 197, 94);
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          background-color: rgba(34, 197, 94, 0.15);
          border-radius: 1rem;
        }
        
        .completed {
          color: rgb(232, 121, 249);
          font-weight: 600;
        }
        
        p {
          color: rgb(214, 219, 225);
          margin: 0 0 1.5rem 0;
          font-family: 'Poppins', sans-serif;
          line-height: 1.5;
          flex-grow: 1;
        }
        
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .tag {
          padding: 0.35rem 0.75rem;
          background: rgba(88, 28, 135, 0.5);
          font-size: 0.75rem;
          color: rgb(216, 180, 254);
          border-radius: 0.25rem;
          font-family: 'Poppins', sans-serif;
          letter-spacing: 0.5px;
          transition: all 0.2s;
        }
        
        .card:hover .tag {
          background: rgba(107, 33, 168, 0.6);
          color: rgb(228, 200, 255);
        }
        
        .details-button {
          display: block;
          width: 100%;
          padding: 0.75rem;
          margin: 0.5rem 0 1.25rem 0;
          background: rgba(88, 28, 135, 0.5);
          color: rgb(232, 121, 249);
          border: 1px solid rgba(217, 70, 239, 0.3);
          border-radius: 0.375rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          text-decoration: none;
        }
        
        .details-button:hover {
          background: rgba(107, 33, 168, 0.7);
          border-color: rgba(217, 70, 239, 0.6);
          transform: translateY(-2px);
        }
        
        .details-button svg {
          width: 1rem;
          height: 1rem;
          transition: transform 0.2s;
        }
        
        .details-button:hover svg {
          transform: translateY(2px);
        }
        
        .action-links {
          display: flex;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(217, 70, 239, 0.15);
        }
        
        .action-link {
          color: rgb(216, 180, 254);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          transition: color 0.2s;
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
        }
        
        .action-link:not(.disabled):hover {
          color: rgb(232, 121, 249);
        }
        
        .action-link svg {
          width: 1rem;
          height: 1rem;
        }
        
        .disabled {
          color: rgba(216, 180, 254, 0.4);
          cursor: not-allowed;
        }
        
        /* Tooltip styles */
        .tooltip {
          position: relative;
        }
        
        .tooltip::before {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 140%;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.5rem 0.75rem;
          background: rgba(88, 28, 135, 0.95);
          color: white;
          font-size: 0.75rem;
          border-radius: 0.375rem;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s;
          pointer-events: none;
          z-index: 10;
          border: 1px solid rgba(217, 70, 239, 0.3);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .tooltip::after {
          content: '';
          position: absolute;
          bottom: 140%;
          left: 50%;
          transform: translateX(-50%) translateY(6px);
          border: 6px solid transparent;
          border-top-color: rgba(88, 28, 135, 0.95);
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s;
        }
        
        .tooltip:hover::before,
        .tooltip:hover::after {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(-6px);
        }
        
        .tooltip:hover::after {
          transform: translateX(-50%) translateY(0);
        }
      </style>
      
      <div class="card" data-aos="fade-up" data-aos-delay="${delay}">
        <div class="image-container">
          <img src="${image}" alt="${title}">
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
      </div>
    `;
  }
}

customElements.define('project-card', ProjectCard); 