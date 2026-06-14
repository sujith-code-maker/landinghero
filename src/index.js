class LandingHero {
  constructor(options = {}) {
    // 1. Core Default Settings
    this.options = {
      container: '#hero-container',
      logoText: 'Landinghero',
      background: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80',
      title: 'Turn your ideas into <span class="lh-highlight">landing pages</span> in "seconds"',
      description: 'A lightweight, high-performance JavaScript module designed to build stunning, responsive, and conversion-optimized landing page hero sections in seconds.',
      ctaText: 'Get Started',
      ctaLink: '#',
      features: [
        'Built with pure modern JavaScript—no bulky frameworks required.',
        'Automatically adapts to mobile, tablet, and desktop viewports out of the box.',
        'Easy configuration for backgrounds (images, videos, gradients), CTA buttons, and alignment.'
      ],
      contactEmail: 'support@landinghero.com',
      ...options
    };

    this.templates = {}; // Storage for user dynamic template injections
    this.init();
  }

  init(containerSelector) {
    const target = containerSelector || this.options.container;
    this.targetElement = document.querySelector(target);
    if (!this.targetElement) {
      console.error(`LandingHero: Container element "${target}" not found.`);
      return;
    }
    this.injectStyles();
    this.render();
    this.cacheElements();
  }

  cacheElements() {
    this.elements = {
      wrapper: this.targetElement.querySelector('.lh-wrapper'),
      navbar: this.targetElement.querySelector('.lh-navbar'),
      logo: this.targetElement.querySelector('.lh-logo'),
      title: this.targetElement.querySelector('.lh-hero h1'),
      description: this.targetElement.querySelector('.lh-hero p'),
      cta: this.targetElement.querySelector('.lh-cta-button'),
      features: this.targetElement.querySelectorAll('.lh-feature'),
      contactCard: this.targetElement.querySelector('.lh-contact-card')
    };
  }

  // 2. Definitive Image-Accurate Syntax Engine
  Heroscript(scriptText) {
    const lines = scriptText.split('\n');

    const styleMap = {
      'bgcol': 'backgroundColor',
      'col': 'color',
      'disp': 'display',
      'pad': 'padding',
      'mar': 'margin',
      'jus-con': 'justifyContent',
      'cursor': 'cursor',
      'font': 'fontFamily'
    };

    lines.forEach(line => {
      line = line.trim();
      if (!line || line.startsWith('//')) return;

      // Handle explicit Engine Initializer syntax -> landinghero.init("#hero" as lh)
      if (line.startsWith('landinghero.init')) {
        const matchInit = line.match(/init\s*\(\s*['"]?([^'"]+?)['"]?\s+as\s+\w+\s*\)/i);
        if (matchInit) this.init(matchInit[1]);
        return;
      }

      // Handle raw HTML Appender rule -> lh.cont.add.html( <h1>hi</h1> )
      if (line.startsWith('lh.cont.add.html')) {
        const htmlContent = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')')).trim();
        if (this.elements.contactCard) {
          this.elements.contactCard.insertAdjacentHTML('beforeend', htmlContent);
        }
        return;
      }

      // Parse primary prefix selectors (e.g., lh.navbar, lh.hero.btn)
      const mainRegex = /^(?:lh\.)?([a-zA-Z0-9._-]+)\s*\((.*)\)\s*;?$/;
      const match = line.match(mainRegex);
      if (!match) return;

      const rawTarget = match[1];
      let innerContent = match[2].trim();

      // Normalize element targeting maps based on your diagram specs
      let elementKey = rawTarget;
      if (rawTarget === 'navbar') elementKey = 'navbar';
      if (rawTarget === 'navbar.logotext') elementKey = 'logo';
      if (rawTarget === 'body') elementKey = 'wrapper';
      if (rawTarget === 'hero.btn') elementKey = 'cta';
      if (rawTarget === 'hero.txt') elementKey = 'description';
      if (rawTarget === 'hero.higlt.span') elementKey = 'highlight';
      if (rawTarget === 'cont.div') elementKey = 'contactCard';

      // Advanced nested parameter extractor loop (clears semicolons and commas)
      const pairs = innerContent.split(/[;,](?![^(]*\))/);

      pairs.forEach(pair => {
        if (!pair.includes('=')) return;
        let [key, val] = pair.split('=').map(s => s.trim());
        val = val.replace(/^['"]|['"]$/g, ''); // Strip outer literal strings

        // Rule: Nested Element Image Replacer -> img.replace.text(url='...', alt='...')
        if (key.startsWith('img.replace.text')) {
          const urlMatch = val.match(/url\s*=\s*['"]?([^'"]+?)['"]?(?:\s*|$)/);
          const url = urlMatch ? urlMatch[1] : '';
          if (this.elements[elementKey]) {
            this.elements[elementKey].innerHTML = `<img src="${url}" style="height:32px; vertical-align:middle;"/>`;
          }
        }
        // Rule: Background Graphic Replacer -> bg.img(url='...')
        else if (key.startsWith('bg.img')) {
          const urlMatch = val.match(/url\s*=\s*['"]?([^'"]+?)['"]?(?:\s*|$)/);
          if (urlMatch && this.elements.wrapper) {
            this.elements.wrapper.style.backgroundImage = `url('${urlMatch[1]}')`;
          }
        }
        // Rule: Direct HTML Content Modification
        else if (key === 'text') {
          if (elementKey === 'highlight') {
            const spanEl = this.targetElement.querySelector('.lh-highlight');
            if (spanEl) spanEl.innerHTML = val;
          } else if (this.elements[elementKey]) {
            this.elements[elementKey].innerHTML = val;
          }
        }
        // Rule: Click Binding Engine Actions
        else if (key === 'click') {
          if (this.elements[elementKey]) {
            this.elements[elementKey].addEventListener('click', (e) => {
              e.preventDefault();
              alert(`Heroscript triggered Action: ${val}`);
            });
          }
        }
        // Rule: Modern Interface Typographical Rendering Engine Rules
        else if (key === 'anim' && val === 'typing') {
          if (this.elements[elementKey]) {
            this.elements[elementKey].style.borderRight = '2px solid white';
            this.elements[elementKey].style.whiteSpace = 'nowrap';
            this.elements[elementKey].style.overflow = 'hidden';
            this.elements[elementKey].style.animation = 'lh-typing 3.5s steps(40, end), lh-blink .75s step-end infinite';
          }
        }
        // Rule: Dynamic Native CSS styles mapping
        else if (styleMap[key]) {
          if (this.elements[elementKey]) {
            this.elements[elementKey].style[styleMap[key]] = val;
          }
        }
      });
    });
  }

  // Developer Access Utilities explicitly asked for in your schema print log comments
  access.code(elementName) {
    const el = this.elements[elementName] || this.targetElement.querySelector(`.lh-${elementName}`);
    return el ? el.outerHTML : 'Element not found';
  }

  injectStyles() {
    if (document.getElementById('landinghero-styles')) return;
    const styleEl = document.createElement('style');
    styleEl.id = 'landinghero-styles';
    styleEl.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&display=swap');
      .lh-wrapper * { box-sizing: border-box; margin: 0; padding: 0; font-family: "Poppins", sans-serif; }
      .lh-wrapper { background-size: cover; background-position: center; min-height: 100vh; color: white; transition: all 0.3s; }
      .lh-navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; align-items: center; justify-content: space-between; transition: all 0.3s; }
      .lh-logo { font-size: 20px; font-weight: bolder; transition: all 0.3s; }
      .lh-hero { padding-top: 160px; display: flex; justify-content: center; align-items: center; text-align: center; flex-direction: column; padding-bottom: 50px; }
      .lh-hero h1 { font-size: 3.5rem; max-width: 800px; font-weight: bold; }
      .lh-highlight { color: white; background-color: red; padding: 4px 16px; display: inline-block; margin: 5px; }
      .lh-hero p { font-size: 1.25rem; margin: 25px 0; max-width: 700px; }
      .lh-cta-button { display: inline-block; margin-top: 20px; text-decoration: none; font-weight: 600; transition: all 0.3s; }
      .lh-features { display: flex; justify-content: space-around; padding: 50px; background: rgba(0,0,0,0.4); }
      .lh-feature { background: rgba(255, 255, 255, 0.1); padding: 20px; margin: 20px; flex: 1; text-align: center; border-radius: 8px; }
      .lh-contact-card { background: rgba(0, 0, 0, 0.7); padding: 30px; margin: 20px auto; max-width: 700px; text-align: center; border-radius: 12px; }
      .lh-footer { background-color: rgba(0, 0, 0, 0.8); text-align: center; padding: 20px; }
      @keyframes lh-typing { from { width: 0 } to { width: 100% } }
      @keyframes lh-blink { from, to { border-color: transparent } 50% { border-color: white } }
    `;
    document.head.appendChild(styleEl);
  }

  render() {
    const featuresHTML = this.options.features.map((feat, index) => `
      <div class="lh-feature"><h2>${index + 1}</h2><p>${feat}</p></div>
    `).join('');

    this.targetElement.innerHTML = `
      <div class="lh-wrapper">
        <div class="lh-navbar">
          <div class="lh-logo">${this.options.logoText}</div>
        </div>
        <div id="lh-home" class="lh-hero">
          <h1>${this.options.title}</h1>
          <p>${this.options.description}</p>
          <a href="${this.options.ctaLink}" class="lh-cta-button">${this.options.ctaText}</a>
        </div>
        <div id="lh-about" class="lh-features">${featuresHTML}</div>
        <div class="lh-contact-card"><h2>Contact Unit</h2></div>
        <footer class="lh-footer"><p>&copy; ${new Date().getFullYear()} ${this.options.logoText}.</p></footer>
      </div>
    `;
  }
}

export default LandingHero;
