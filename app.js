/* ==========================================================================
   NANI SONTYANA - PORTFOLIO INTERACTIVE LOGIC & DYNAMIC DATA ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
    await loadStoredData();
    initProBackground();
    initTypingEffect();
    initMobileMenuNav();
    initLeetCodeLiveStats();
    initScrollAnimations();
    initStatCounters();
    initSkillFilters();
    initProjectFilters();
    initProjectSliderNavigation();
    initResumeModals();
    
    // High-End Interactive Animation Suite
    initSpotlightAnd3DTilt();
    initMagneticButtons();
    initClickRipples();
    initScrollProgressBar();
    
    // Dynamic Render from portfolioData
    renderAllSectionsFromData();
});

/* ==========================================================================
   1. Data Persistence & Full Section Renderers (IndexedDB + localStorage)
   ========================================================================== */
function getPortfolioData() {
    if (typeof window !== 'undefined' && window.portfolioData && window.portfolioData.projects) {
        return window.portfolioData;
    }
    if (typeof portfolioData !== 'undefined' && portfolioData && portfolioData.projects) {
        return portfolioData;
    }
    if (typeof defaultPortfolioData !== 'undefined' && defaultPortfolioData && defaultPortfolioData.projects) {
        return defaultPortfolioData;
    }
    return {};
}

async function loadStoredData() {
    const data = getPortfolioData();
    if (typeof window !== 'undefined') {
        window.portfolioData = data;
    }
}

function renderAllSectionsFromData() {
    renderPersonalAndSummaryFromData();
    renderSkillsFromData();
    renderProjectsFromData();
    renderExperienceFromData();
    renderEducationAndCertsFromData();

    // Refresh interactive animation triggers for dynamic elements
    initSpotlightAnd3DTilt();
    initMagneticButtons();
    initScrollAnimations();
}

function renderPersonalAndSummaryFromData() {
    const data = getPortfolioData();
    if (!data.personalInfo) return;
    const info = data.personalInfo;

    // Hero Name & Status
    const heroName = document.querySelector('.hero-title .gradient-text');
    if (heroName) heroName.textContent = info.name || "Nani Sontyana";

    const statusDisplay = document.getElementById('hero-status-display');
    if (statusDisplay) {
        statusDisplay.innerHTML = `<span class="pulse-dot"></span> ${info.status || 'Actively Seeking Software Engineering Roles'}`;
    }

    // Hero Summary / Bio Description
    const summaryDisplay = document.getElementById('hero-summary-display');
    if (summaryDisplay) {
        summaryDisplay.textContent = info.summary || '';
    }

    // Impact Metrics
    const cgpaEl = document.getElementById('metric-cgpa-display');
    if (cgpaEl) cgpaEl.textContent = info.cgpa || '8.14';

    const speedEl = document.getElementById('metric-apispeed-display');
    if (speedEl) speedEl.textContent = info.apiSpeedup || '25%';

    const mlAccEl = document.getElementById('metric-mlacc-display');
    if (mlAccEl) mlAccEl.textContent = info.mlAccuracy || '75%+';

    const codeDupEl = document.getElementById('metric-codedup-display');
    if (codeDupEl) codeDupEl.textContent = info.codeDupDrop || '30%';

    // About Section Header
    const aboutTitleEl = document.getElementById('about-title-display');
    if (aboutTitleEl) {
        aboutTitleEl.innerHTML = info.aboutTitle || `Engineered For <span class="gradient-text">Performance & Scale</span>`;
    }
    const aboutSubtitleEl = document.getElementById('about-subtitle-display');
    if (aboutSubtitleEl) {
        aboutSubtitleEl.textContent = info.aboutSubtitle || 'A quick snapshot of my technical capabilities and practical software engineering footprint.';
    }

    // TS Code Snippet Card
    const codeName = document.getElementById('code-window-name');
    if (codeName) codeName.textContent = `"${info.name}"`;
    const codeRole = document.getElementById('code-window-role');
    if (codeRole) codeRole.textContent = `"${info.title}"`;
    const codeDegree = document.getElementById('code-window-degree');
    if (codeDegree) codeDegree.textContent = `"B.Tech Computer Science (${info.cgpa} CGPA)"`;

    // Contact Section
    const emailVal = document.getElementById('contact-email-val');
    if (emailVal) emailVal.textContent = info.email || '';
    const emailLink = document.getElementById('contact-email-link');
    if (emailLink) emailLink.href = `mailto:${info.email || ''}`;

    const phoneVal = document.getElementById('contact-phone-val');
    if (phoneVal) phoneVal.textContent = info.phone || '';
    const phoneLink = document.getElementById('contact-phone-link');
    if (phoneLink) phoneLink.href = `tel:${(info.phone || '').replace(/\s+/g, '')}`;

    const linkedinVal = document.getElementById('contact-linkedin-val');
    if (linkedinVal) linkedinVal.textContent = (info.linkedin || '').replace(/^https?:\/\//, '');
    const linkedinLink = document.getElementById('contact-linkedin-link');
    if (linkedinLink) linkedinLink.href = info.linkedin || '#';

    const githubVal = document.getElementById('contact-github-val');
    if (githubVal) githubVal.textContent = (info.github || '').replace(/^https?:\/\//, '');
    const githubLink = document.getElementById('contact-github-link');
    if (githubLink) githubLink.href = info.github || '#';

    const footerName = document.getElementById('footer-name-val');
    if (footerName) footerName.textContent = info.name || "Nani Sontyana";

    // Dynamic Background Video Source
    const videoSource = document.getElementById('bg-video-source');
    const bgVideoEl = document.getElementById('bg-video');
    if (videoSource && bgVideoEl && info.bgVideo) {
        if (videoSource.getAttribute('src') !== info.bgVideo) {
            videoSource.setAttribute('src', info.bgVideo);
            bgVideoEl.load();
            bgVideoEl.play().catch(e => console.log("Auto-play prevented", e));
        }
    }
}

function renderSkillsFromData() {
    const grid = document.getElementById('skills-grid');
    const data = getPortfolioData();
    if (!grid || !data.skills) return;

    grid.innerHTML = data.skills.map(skill => `
        <div class="skill-card glass-card" data-cat="${skill.category}">
            <div class="skill-head">
                <i class="${skill.icon} skill-icon" style="color:${skill.iconColor || 'var(--primary-cyan)'};"></i>
                <div>
                    <h4>${skill.name}</h4>
                    <span class="skill-level">${skill.status || ''}</span>
                </div>
            </div>
            <div class="skill-bar"><div class="skill-progress" style="width: ${skill.level}%;"></div></div>
            <div class="skill-tags">
                ${(skill.tags || []).map(t => `<span>${t}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderProjectsFromData() {
    const grid = document.getElementById('projects-grid');
    const data = getPortfolioData();
    if (!grid || !data.projects) return;

    grid.innerHTML = data.projects.map(proj => `
        <div class="project-card glass-card" data-category="${proj.category}">
            <div class="project-banner ${proj.gradientClass || 'bg-gradient-rag'}">
                ${proj.coverImage ? `<img src="${proj.coverImage}" alt="${proj.title}" class="project-cover-img" loading="lazy">` : ''}
                <div class="project-badge">${proj.badge}</div>
                ${!proj.coverImage ? `
                <div class="project-icon-wrapper">
                    <i class="${proj.icon || 'fa-solid fa-code'}"></i>
                </div>` : ''}
            </div>

            <div class="project-content">
                <div class="project-meta">
                    <span class="proj-type">${proj.type || 'Software System'}</span>
                </div>
                <h3 class="project-title">${proj.title}</h3>
                <p class="project-desc">${proj.description}</p>

                <div class="project-tech">
                    ${(proj.tech || []).map(t => `<span>${t}</span>`).join('')}
                </div>

                <div class="project-action-links">
                    ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="proj-action-btn"><i class="fa-brands fa-github"></i> Code</a>` : ''}
                    ${proj.liveUrl ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="proj-action-btn live"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>` : ''}
                </div>

                <div class="project-footer">
                    <button class="btn-project-details" onclick="openProjectModal('${proj.id}')">
                        <i class="fa-solid fa-sliders"></i> Deep-Dive Architecture
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Re-bind interactive 3D tilt and mouse spotlight animations to dynamic project cards
    initSpotlightAnd3DTilt();
}

function renderExperienceFromData() {
    const expContainer = document.getElementById('experience-list-container');
    const data = getPortfolioData();
    if (!expContainer || !data.experience) return;

    expContainer.innerHTML = data.experience.map(exp => `
        <div class="timeline-item glass-card" data-aos="fade-up" style="margin-bottom:2rem;">
            <div class="timeline-dot">
                <i class="fa-solid fa-briefcase"></i>
            </div>

            <div class="timeline-header">
                <div>
                    <h3 class="company-name">${exp.company}</h3>
                    <div class="role-title">${exp.role}</div>
                </div>
                <div class="timeline-date">
                    <span class="badge-date"><i class="fa-regular fa-calendar"></i> ${exp.duration}</span>
                    <span class="badge-location"><i class="fa-solid fa-location-dot"></i> ${exp.location || 'Remote'}</span>
                </div>
            </div>

            <div class="timeline-body">
                <ul class="experience-bullets">
                    ${(exp.bullets || []).map(b => `
                        <li>
                            <i class="fa-solid fa-circle-check bullet-icon"></i>
                            <span>${b}</span>
                        </li>
                    `).join('')}
                </ul>

                <div class="exp-tech-stack">
                    ${(exp.tech || []).map(t => `<span class="tech-chip">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function renderEducationAndCertsFromData() {
    const data = getPortfolioData();

    const eduContainer = document.getElementById('education-list-container');
    if (eduContainer && data.education) {
        eduContainer.innerHTML = data.education.map(item => `
            <div class="edu-card glass-card" style="margin-bottom:1rem;">
                <div class="edu-year">${item.duration}</div>
                <h4>${item.degree}</h4>
                <div class="institution">${item.institution}</div>
                <div class="gpa-badge"><i class="fa-solid fa-star"></i> ${item.gpa}</div>
                <p class="edu-desc">${item.description}</p>
            </div>
        `).join('');
    }

    const certsContainer = document.getElementById('certs-list-container');
    if (certsContainer && data.certifications) {
        certsContainer.innerHTML = data.certifications.map(cert => `
            <div class="cert-card glass-card" style="margin-bottom:1rem;">
                <div class="cert-icon">
                    <i class="fa-solid fa-award"></i>
                </div>
                <div class="cert-info" style="flex-grow:1;">
                    <h4>${cert.title}</h4>
                    <div class="cert-issuer">${cert.issuer}</div>
                    <div class="cert-date"><i class="fa-regular fa-calendar-check"></i> ${cert.year}</div>
                    <p style="margin-bottom:0.5rem;">${cert.description}</p>
                    ${cert.certUrl ? `
                        <a href="${cert.certUrl}" target="_blank" rel="noopener noreferrer" class="btn-cert-link">
                            <i class="fa-solid fa-shield-halved"></i> Verify Certificate
                        </a>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }
}




/* ==========================================================================
   3. Professional Dark Blueprint & Ambient Depth Backdrop System
   ========================================================================== */
function initProBackground() {
    window.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    }, { passive: true });
}

/* ==========================================================================
   4. Typing Effect for Hero Subtitle
   ========================================================================== */
function initTypingEffect() {
    const target = document.getElementById('typed-text');
    if (!target) return;

    const phrases = [
        "Full-Stack Web Applications",
        "RAG AI Document Intelligence Systems",
        "Java Spring Boot REST Microservices",
        "Predictive Employee Analytics Engines",
        "Event-Driven Scheduled Workflows"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            target.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
        } else {
            target.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIdx === currentPhrase.length) {
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ==========================================================================
   5. Navbar Scroll & Mobile Menu Toggle
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });
    });

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

/* ==========================================================================
   6. Scroll Animations & Counters
   ========================================================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.glass-card, .section-header, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initStatCounters() {
    const statsSection = document.querySelector('.stats-banner');
    if (!statsSection) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            const counters = document.querySelectorAll('.stat-num');

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const duration = 1800;
                const step = target / (duration / 20);

                const timer = setInterval(() => {
                    count += step;
                    if (count >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(count);
                    }
                }, 20);
            });
        }
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

/* ==========================================================================
   7. Skill & Project Filters
   ========================================================================== */
function initSkillFilters() {
    const buttons = document.querySelectorAll('.skill-tab-btn:not([id^="cust-tab-"])');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');
            const cards = document.querySelectorAll('.skill-card');

            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-cat') === category) {
                    card.style.display = 'block';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => { card.style.display = 'none'; }, 200);
                }
            });
        });
    });
}

function initProjectFilters() {
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            const projects = document.querySelectorAll('.project-card');

            projects.forEach(proj => {
                const categories = proj.getAttribute('data-category').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    proj.style.display = 'flex';
                    setTimeout(() => { proj.style.opacity = '1'; proj.style.transform = 'translateY(0)'; }, 50);
                } else {
                    proj.style.opacity = '0';
                    proj.style.transform = 'translateY(20px)';
                    setTimeout(() => { proj.style.display = 'none'; }, 250);
                }
            });
        });
    });
}

function initProjectSliderNavigation() {
    const leftBtn = document.getElementById('projects-scroll-left');
    const rightBtn = document.getElementById('projects-scroll-right');
    const grid = document.getElementById('projects-grid');

    if (!grid) return;

    if (leftBtn) {
        leftBtn.addEventListener('click', () => {
            grid.scrollBy({ left: -360, behavior: 'smooth' });
        });
    }

    if (rightBtn) {
        rightBtn.addEventListener('click', () => {
            grid.scrollBy({ left: 360, behavior: 'smooth' });
        });
    }

    // Mouse drag scrolling support
    let isDown = false;
    let startX;
    let scrollLeft;

    grid.addEventListener('mousedown', (e) => {
        if (e.target.closest('a, button')) return;
        isDown = true;
        startX = e.pageX - grid.offsetLeft;
        scrollLeft = grid.scrollLeft;
    });

    grid.addEventListener('mouseleave', () => { isDown = false; });
    grid.addEventListener('mouseup', () => { isDown = false; });

    grid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - grid.offsetLeft;
        const walk = (x - startX) * 1.5;
        grid.scrollLeft = scrollLeft - walk;
    });
}

/* ==========================================================================
   8. Project Modals & Interactive Demos
   ========================================================================== */
function getProjectArchitectureHTML(proj) {
    if (!proj) return '';

    let nodes = [];
    if (proj.id === 'documind') {
        nodes = [
            { icon: 'fa-brands fa-react', label: 'React.js Client UI' },
            { icon: 'fa-brands fa-node-js', label: 'Node.js Gateway' },
            { icon: 'fa-brands fa-python', label: 'Flask + LangChain' },
            { icon: 'fa-solid fa-database', label: 'PostgreSQL + pgvector' }
        ];
    } else if (proj.id === 'smarthr') {
        nodes = [
            { icon: 'fa-brands fa-react', label: 'Recharts HR Dashboard' },
            { icon: 'fa-brands fa-node-js', label: 'Express Router API' },
            { icon: 'fa-solid fa-brain', label: 'Scikit-Learn ML Model' },
            { icon: 'fa-solid fa-envira', label: 'MongoDB Data Store' }
        ];
    } else if (proj.id === 'subtracker') {
        nodes = [
            { icon: 'fa-brands fa-node-js', label: 'Node.js Subscription Core' },
            { icon: 'fa-solid fa-shield-halved', label: 'Arcjet Rate Limiter' },
            { icon: 'fa-solid fa-clock', label: 'Upstash QStash Cron' },
            { icon: 'fa-solid fa-paper-plane', label: 'Nodemailer Alerts' }
        ];
    } else if (proj.id === 'mentymaps') {
        nodes = [
            { icon: 'fa-solid fa-map-location-dot', label: 'Mapbox GL JS Interface' },
            { icon: 'fa-brands fa-node-js', label: 'Socket.io + Redis PubSub' },
            { icon: 'fa-solid fa-database', label: 'PostgreSQL + PostGIS (<50ms)' },
            { icon: 'fa-solid fa-cubes-stacked', label: 'DBSCAN Spatial Clustering' }
        ];
    } else if (proj.id === 'aicodereview') {
        nodes = [
            { icon: 'fa-brands fa-github', label: 'GitHub App Webhook Listener' },
            { icon: 'fa-solid fa-code-branch', label: 'AST Parser & Diff Isolator' },
            { icon: 'fa-solid fa-brain', label: 'LLM Reasoning & Security Engine' },
            { icon: 'fa-solid fa-comments', label: 'Inline PR Review Dispatcher (<3s)' }
        ];
    } else if (proj.id === 'ecommerce2') {
        nodes = [
            { icon: 'fa-brands fa-react', label: 'React + Redux Toolkit Client' },
            { icon: 'fa-brands fa-node-js', label: 'Express API Gateway + JWT' },
            { icon: 'fa-solid fa-credit-card', label: 'Stripe Webhook Gateway' },
            { icon: 'fa-solid fa-database', label: 'PostgreSQL + Redis Cache (<50ms)' }
        ];
    } else {
        nodes = [
            { icon: 'fa-solid fa-laptop-code', label: 'Frontend Client Interface' },
            { icon: 'fa-solid fa-server', label: 'Microservice API Gateway' },
            { icon: 'fa-solid fa-database', label: 'Database & Cache Layer' }
        ];
    }

    return `
        <div class="arch-diagram-card">
            <h4 style="color:var(--primary-cyan); font-size:0.95rem; margin-bottom:0.85rem;">
                <i class="fa-solid fa-diagram-project"></i> System Architecture & Microservice Flowchart:
            </h4>
            <div class="arch-nodes-flex">
                ${nodes.map((n, idx) => `
                    <div class="arch-node"><i class="${n.icon}"></i> ${n.label}</div>
                    ${idx < nodes.length - 1 ? `<div class="arch-arrow"><i class="fa-solid fa-arrow-right"></i></div>` : ''}
                `).join('')}
            </div>
        </div>
    `;
}

function openProjectModal(key) {
    let data = (getPortfolioData().projects || []).find(p => p.id === key);

    if (!data) return;

    const body = document.getElementById('modal-content-body');
    body.innerHTML = `
        <div class="modal-header-block" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.8rem;">
            <div>
                <span style="color:var(--primary-cyan); font-size:0.8rem; font-weight:700; text-transform:uppercase;">${data.badge}</span>
                <h2 style="margin-top:0.2rem;">${data.title}</h2>
                <p style="color:var(--text-muted); font-size:0.95rem;">${data.subtitle || ''}</p>
            </div>
        </div>

        ${data.coverImage ? `<img src="${data.coverImage}" alt="${data.title}" style="width:100%; max-height:260px; object-fit:cover; border-radius:12px; margin-bottom:1.5rem; border:1px solid var(--glass-border);">` : ''}

        ${getProjectArchitectureHTML(data)}

        <div style="margin-bottom:1.5rem;">
            <h4 style="font-size:1rem; margin-bottom:0.6rem; color:var(--primary-cyan);">Technologies Applied:</h4>
            <div class="project-tech">
                ${(data.tech || []).map(t => `<span>${t}</span>`).join('')}
            </div>
        </div>

        <div class="project-action-links" style="margin-bottom:1.5rem; gap:1rem;">
            ${data.githubUrl ? `<a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="proj-action-btn" style="padding:0.65rem 1.25rem;"><i class="fa-brands fa-github"></i> View GitHub Code Repository</a>` : ''}
            ${data.liveUrl ? `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="proj-action-btn live" style="padding:0.65rem 1.25rem;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Launch Live Deployment</a>` : ''}
        </div>

        <div style="margin-bottom:1.5rem;">
            <h4 style="font-size:1rem; margin-bottom:0.8rem; color:var(--primary-cyan);">Key Architecture & Achievements (Hidden Details):</h4>
            <ul class="experience-bullets">
                ${(data.bullets || []).map(b => `<li><i class="fa-solid fa-circle-check bullet-icon"></i><span>${b}</span></li>`).join('')}
            </ul>
        </div>
    `;

    document.getElementById('project-modal').classList.add('active');
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.remove('active');
}

/* ==========================================================================
   9. Resume & Contact Handlers
   ========================================================================== */
function initResumeModals() {
    const resumeModal = document.getElementById('resume-modal');
    const openBtns = [
        document.getElementById('open-resume-btn'),
        document.getElementById('open-resume-btn-hero')
    ];

    openBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                resumeModal.classList.add('active');
            });
        }
    });
}

function closeResumeModal() {
    document.getElementById('resume-modal').classList.remove('active');
}

function printResume() {
    window.print();
}

function handleFormSubmit(event) {
    event.preventDefault();

    const btn = document.getElementById('form-submit-btn');
    const feedback = document.getElementById('form-feedback');

    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...`;

    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;

        feedback.className = "form-feedback success";
        feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. Nani Sontyana will get back to you shortly.`;

        document.getElementById('contact-form').reset();

        setTimeout(() => {
            feedback.style.display = "none";
        }, 6000);
    }, 1000);
}

/* ==========================================================================
   10. High-End Interactive Animation Suite
   ========================================================================== */

// Top Scroll Progress Bar
function initScrollProgressBar() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    });
}



// Vercel / Linear Dynamic Mouse Spotlight Glow & 3D Tilt Engine
function initSpotlightAnd3DTilt() {
    const cards = document.querySelectorAll('.glass-card, .project-card, .skill-card, .timeline-content, .code-window');

    cards.forEach(card => {
        // Skip modal cards to prevent wobble/lag when clicking close button
        if (card.classList.contains('modal-card')) return;

        // Ensure spotlight glow layer exists
        if (!card.querySelector('.spotlight-glow')) {
            const glow = document.createElement('div');
            glow.className = 'spotlight-glow';
            card.appendChild(glow);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Calculate 3D tilt angles (-7 deg to +7 deg)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = ((y - centerY) / centerY) * -5.5;
            const tiltY = ((x - centerX) / centerX) * 5.5;

            card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

// Instant Modal Exit Handlers (Backdrop Click & Escape Key)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
});

// Magnetic Buttons Physics (Subtle magnetic attraction towards cursor)
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.btn, .social-icon-btn, .nav-btn, .btn-resume-nav, .btn-customize-nav');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * 0.28;
            const deltaY = (e.clientY - centerY) * 0.28;

            btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.05)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate3d(0, 0, 0) scale(1)`;
        });
    });
}

// Click Radial Ripple Effect
function initClickRipples() {
    document.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.btn, .social-icon-btn, .glass-card, .project-card, .skill-card, .nav-link');
        if (!targetBtn) return;

        const rect = targetBtn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'click-ripple';

        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;

        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        targetBtn.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 650);
    });
}

/* Mobile Responsive Navigation Drawer & Navbar Scroll Handler */
function initMobileMenuNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Scroll Navbar blur effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            if (navbar) navbar.classList.add('scrolled');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
        }
    });

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Toggle body scroll locking when mobile menu is open
            document.body.style.overflow = isActive ? 'hidden' : '';

            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.className = isActive ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars-staggered';
            });
        });

        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars-staggered';
            }
        });
    }
}

/* Live LeetCode Stats Fetcher with Graceful Failover */
async function initLeetCodeLiveStats() {
    const totalEl = document.getElementById('lc-total-solved');
    const easyEl = document.getElementById('lc-easy-solved');
    const medEl = document.getElementById('lc-medium-solved');
    const hardEl = document.getElementById('lc-hard-solved');

    if (!totalEl) return;

    try {
        const response = await fetch('https://alfa-leetcode-api.onrender.com/userProfile/NaniSontyana');
        if (response.ok) {
            const data = await response.json();
            if (data && typeof data.totalSolved === 'number') {
                totalEl.textContent = `${data.totalSolved}+`;
                if (easyEl && typeof data.easySolved === 'number') easyEl.textContent = `Easy: ${data.easySolved}`;
                if (medEl && typeof data.mediumSolved === 'number') medEl.textContent = `Med: ${data.mediumSolved}`;
                if (hardEl && typeof data.hardSolved === 'number') hardEl.textContent = `Hard: ${data.hardSolved}`;
            }
        }
    } catch (e) {
        console.warn("LeetCode live API fallback active", e);
    }
}



