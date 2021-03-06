class ProgressBar extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.createShadowRoot();
    this._complete = 0;
  }

  get complete() {
    return this._complete;
  }

  set complete(val) {
    this.setAttribute('complete', val);
  }

  static get observedAttributes() {
    return ['complete'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    const innerBar = this.shadow.querySelector('.progress-bar');
    console.log(this.shadow)
    switch(name) {
      case 'complete':
      
      this._complete = parseInt(newVal, 10) || 0;
      if (innerBar) {
        innerBar.style.width = this.complete + '%';
        innerBar.innerHTML = this.complete + '%';
      }
    }
  }

  connectedCallback() {
    console.log(1)
    var template = `
      <style>
        .progress-bar {
          width: 50%;
          height: 30px;
          background-color: #EDF2F4;
          border-radius: 5px;
          color: #FFF;
        }
        .progress-bar-inner {
          height: 100%;
          line-height: 30px;
          background-color: #2B2D42;
          text-align: center;
          border-radiusL 5px;
          transition: width 0.25s
        }
      </style>
      <div class="progress-bar">
        <div class="progress-bar-inner">
          ${this.complete}
        </div>
      </div>
    `;
    this.shadow.innerHTML = template;
  }
  
}

window.customElements.define('progress-bar', ProgressBar);