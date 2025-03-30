import { LitElement, html, css } from 'lit';

class ProjectCard extends LitElement {
  static properties = {
    image: { type: String },
    title: { type: String },
    description: { type: String },
    tags: { type: Array },
    liveLink: { type: String, attribute: 'live-link' },
    codeLink: { type: String, attribute: 'code-link' },
    delay: { type: Number },
    liveDisabled: { type: Boolean, attribute: 'live-disabled' },
    codeDisabled: { type: Boolean, attribute: 'code-disabled' },
    startDate: { type: String, attribute: 'start-date' },
    endDate: { type: String, attribute: 'end-date' },
    projectId: { type: Number, attribute: 'project-id' }
  };

  static styles = css`
    /* Shared styles defined once */
    .card { /* ... */ }
    /* ... rest of your styles ... */
  `;

  // Efficient reactive templating
  render() {
    return html`
      <div class="card" data-aos="fade-up" data-aos-delay="${this.delay}">
        <!-- ... card template using lit-html ... -->
      </div>
    `;
  }
}

customElements.define('project-card', ProjectCard); 