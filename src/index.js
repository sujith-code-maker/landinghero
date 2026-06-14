class LandingHero {
  constructor(options = {}) {
    // 1. Core Default Settings
    this.options = {
      container: '#hero-container',
      logoText: 'Landinghero',
      background: 'https://cdn.leonardo.ai/users/4c579b33-ec17-46e5-9e5f-a47642e91435/generations/1f167415-0e9f-60c0-8967-55b012a310b8/gemini-2.5-flash-image_make_man_slightly_short-0.jpg',
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

    this.init();
  }

  init() {
    this.targetElement = document.querySelector(this.options.container);
    if (!this.targetElement) {
      console.error(`LandingHero: Container element "${this.options.container}" not found.`);
      return;
    }
    this.injectStyles();
    this.render();
    
    // Save element references for direct styling and animation hooks
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

  // 2. Simple English Command Parser Engine ("Heroscript")
  Heroscript(scriptText) {
    const lines = scriptText.split('\n');
    
    lines.forEach(line => {
      const command = line.trim().toLowerCase();
      if (!command) return;

      // --- Style Commands ---
      if (command.startsWith('change background to ')) {
        const value = line.replace(/change background to /i, '').trim();
        this.setStyle('wrapper', 'backgroundImage', value.startsWith('http') ? `url('${value}')` : value);
      }
      else if (command.startsWith('change title color to ')) {
        const value = command.replace('change title color to ', '').trim();
        this.setStyle('title', 'color', value);
      }
      else if (command.startsWith('change cta background to ')) {
        const value = command.replace('change cta background to ', '').trim();
        this.setStyle('cta', 'backgroundColor', value);
      }
      else if (command.startsWith('change title size to ')) {
        const value = command.replace('change title size to ', '').trim();
        this.setStyle('title', 'fontSize', value);
      }

      // --- Animation Commands ---
      else if (command === 'fade in title') {
        this.animate('title', [
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 1000, easing: 'ease-out', fill: 'forwards' });
      }
      else if (command === 'pulse cta button') {
        this.animate('cta', [
          { transform: 'scale(1)' },
          { transform: 'scale(1.1)' },
          { transform: 'scale(1)' }
        ], { duration: 800, iterations: Infinity });
      }
      else if (command === 'slide in features') {
        this.elements.features.forEach((feat, index) => {
          feat.animate([
            { opacity: 0, transform: 'translateX(-50px)' },
            { opacity: 1, transform: 'translateX(0)' }
          ], { duration: 600, delay: index * 200, easing: 'ease-out', fill: 'forwards' });
        });
      }
    });
  }

  // 3. Explicit Style API
  setStyle(elementKey, property, value) {
    if (this.elements[elementKey]) {
      this.elements[elementKey].style[property] = value;
    } else {
      console.warn(`LandingHero: Element key "${elementKey}" is invalid.`);
    }
  }

  // 4. Explicit Animation API
  animate(elementKey, keyframes, timingOptions) {
    if (this.elements[elementKey]) {
      return this.elements[elementKey].animate(keyframes, timingOptions);
    }
  }

  injectStyles() {
    if (document.getElementById('landinghero-styles')) return;
    const styleEl = document.createElement('style');
    styleEl.id = 'landinghero-styles';
    styleEl.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&display=swap');
      .lh-wrapper * { box-sizing: border-box; margin: 0; padding: 0; font-family: "Poppins", sans-serif; }
      .lh-wrapper { background-image: url("${this.options.background}"); background-size: cover; background-position: center; background-attachment: fixed; background-repeat: no-repeat; overflow-x: hidden; scroll-behavior: smooth; color: white; }
      .lh-navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; align-items: center; background-color: rgba(0, 0, 0, 0.9); justify-content: space-between; padding: 20px 30px; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35); }
      .lh-logo { font-size: 20px; font-weight: bolder; color: white; transition: all 0.3s; }
      .lh-nav-links { display: flex; list-style: none; }
      .lh-nav-links li a { text-decoration: none; font-size: 12px; margin: 0 10px; color: white; transition: color 0.2s; }
      .lh-nav-links li a:hover { color: red; }
      .lh-hero { margin-top: 120px; display: flex; justify-content: center; align-items: center; text-align: center; flex-direction: column; padding: 50px; }
      .lh-hero h1 { font-size: 2.5rem; max-width: 800px; font-weight: bold; transition: all 0.3s; }
      .lh-highlight { color: white; background-color: red; padding: 4px 16px; font-size: 2.7rem; font-style: italic; display: inline-block; margin: 5px; }
      .lh-hero p { font-size: 1.25rem; margin: 25px 0; max-width: 700px; transition: all 0.3s; }
      .lh-cta-button { background-color: black; border-radius: 20px; margin-top: 20px; padding: 15px; width: 150px; color: white; border: 2px solid white; transition: background-color 0.3s, color 0.3s; text-decoration: none; text-align: center; cursor: pointer; font-weight: 600; display: inline-block; }
      .lh-cta-button:hover { background-color: white; color: black; border: 2px solid black; }
      .lh-features { display: flex; justify-content: space-around; padding: 50px; border-top: 1px solid rgba(255, 255, 255, 0.3); border-bottom: 1px solid rgba(255, 255, 255, 0.3); background: rgba(0,0,0,0.4); }
      .lh-feature { background: rgba(255, 255, 255, 0.2); border-radius: 16px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); padding: 20px; margin: 20px; border: 1px solid rgba(255, 255, 255, 0.3); flex: 1; text-align: center; opacity: 1; transition: all 0.3s; }
      .lh-feature-title { font-weight: bold; font-size: 2rem; }
      .lh-feature-description { margin-top: 10px; font-size: 1.1rem; }
      .lh-contact-section { padding: 60px 20px; display: flex; justify-content: center; background: rgba(0,0,0,0.2); }
      .lh-contact-card { background: rgba(0, 0, 0, 0.7); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 24px; padding: 30px; width: 100%; max-width: 700px; text-align: center; }
      .lh-contact-form { margin-top: 24px; display: grid; gap: 16px; }
      .lh-contact-form label { font-weight: 600; }
      .lh-contact-form textarea { width: 100%; min-height: 150px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.18); background: rgba(255, 255, 255, 0.08); color: #f4f4f4; padding: 18px; font-size: 0.95rem; resize: vertical; }
      .lh-submit-button { width: fit-content; margin: 0 auto; padding: 14px 28px; border: 1px solid white; background: rgba(255, 255, 255, 0.08); color: white; border-radius: 999px; cursor: pointer; transition: all 0.2s ease; }
      .lh-footer { background-color: rgba(0, 0, 0, 0.8); text-align: center; padding: 20px; }
      @media (max-width: 900px) { .lh-features { flex-direction: column; align-items: center; } .lh-feature { width: 90%; } }
      @media (max-width: 600px) { .lh-navbar { flex-direction: column; gap: 10px; } .lh-nav-links { flex-wrap: wrap; justify-content: center; gap: 10px; } .lh-hero h1 { font-size: 1.8rem; } .lh-highlight { font-size: 1.9rem; } }
    `;
    document.head.appendChild(styleEl);
  }

  render() {
    const featuresHTML = this.options.features.map((feat, index) => `
      <div class="lh-feature">
        <h2 class="lh-feature-title">${index + 1}</h2>
        <p class="lh-feature-description">${feat}</p>
      </div>
    `).join('');

    this.targetElement.innerHTML = `
      <div class="lh-wrapper">
        <div class="lh-navbar">
          <div class="lh-logo">${this.options.logoText}</div>
          <ul class="lh-nav-links">
            <li><a href="#lh-home">Home</a></li>
            <li><a href="#lh-about">About</a></li>
            <li><a href="#lh-contact">Contact</a></li>
          </ul>
        </div>
        <div id="lh-home" class="lh-hero">
          <h1>${this.options.title}</h1>
          <p>${this.options.description}</p>
          <a href="${this.options.ctaLink}" class="lh-cta-button">${this.options.ctaText}</a>
        </div>
        <div id="lh-about" class="lh-features">${featuresHTML}</div>
        <section id="lh-contact" class="lh-contact-section">
          <div class="lh-contact-card">
            <h2>Contact</h2>
            <p>Have a question or need support? Reach out and start your landing page journey.</p>
            <p style="margin-top: 10px; font-weight: bold;">Email: ${this.options.contactEmail}</p>
            <form class="lh-contact-form">
              <label for="lh-review">Send us your review</label>
              <textarea id="lh-review" name="review" placeholder="Write your review here..."></textarea>
              <button type="submit" class="lh-submit-button">Send Review</button>
            </form>
          </div>
        </section>
        <footer class="lh-footer">
          <p>&copy; ${new Date().getFullYear()} ${this.options.logoText}. All rights reserved.</p>
        </footer>
      </div>
    `;

    this.targetElement.querySelector('.lh-contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Review submitted successfully!');
    });
  }
}

export default LandingHero;