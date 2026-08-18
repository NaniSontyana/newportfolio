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
    initSecretAdminTriggers();
    
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
const IDB_NAME = 'NaniPortfolioDB';
const IDB_STORE = 'portfolio_store';

function openPortfolioDB() {
    return new Promise((resolve) => {
        if (!window.indexedDB) {
            resolve(null);
            return;
        }
        const request = indexedDB.open(IDB_NAME, 1);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(IDB_STORE)) {
                db.createObjectStore(IDB_STORE);
            }
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = () => resolve(null);
    });
}

async function loadStoredData() {
    let loadedData = null;

    // 1. Try IndexedDB first as the primary reliable database (supports large image payloads & large datasets without 5MB quota cap)
    try {
        const db = await openPortfolioDB();
        if (db) {
            const dataStr = await new Promise((resolve) => {
                const tx = db.transaction(IDB_STORE, 'readonly');
                const store = tx.objectStore(IDB_STORE);
                const req = store.get('current_portfolio_data');
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => resolve(null);
            });
            if (dataStr) {
                const parsed = JSON.parse(dataStr);
                if (parsed && parsed.personalInfo && parsed.projects) {
                    loadedData = parsed;
                }
            }
        }
    } catch (e) {
        console.warn("IndexedDB load warning", e);
    }

    // 2. Fallback to localStorage if IndexedDB had no record
    if (!loadedData) {
        const stored = localStorage.getItem('nani_portfolio_custom_v1');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed && parsed.personalInfo && parsed.projects) {
                    loadedData = parsed;
                }
            } catch (e) {
                console.error("Error parsing stored portfolio customizer data", e);
            }
        }
    }

    // 3. Version & Master Code Sync Check:
    // If a new git commit was pushed with an updated dataVersion in portfolio-data.js,
    // or if loadedData is missing projects from defaultPortfolioData, auto-sync to master code!
    const codeVersion = typeof defaultPortfolioData !== 'undefined' ? defaultPortfolioData.dataVersion : null;

    if (loadedData) {
        if (codeVersion && loadedData.dataVersion !== codeVersion) {
            // New commit deployed! Auto-sync to fresh master code so git commits are always preserved
            portfolioData = JSON.parse(JSON.stringify(defaultPortfolioData));
            window.portfolioData = portfolioData;
            saveStoredData();
            return;
        }

        portfolioData = loadedData;
        window.portfolioData = loadedData;

        // Try syncing to localStorage for instant synchronous loads where quota allows
        try {
            localStorage.setItem('nani_portfolio_custom_v1', JSON.stringify(loadedData));
        } catch (err) {
            // Quota exceeded - remove stale key from localStorage so it never overrides IndexedDB
            try { localStorage.removeItem('nani_portfolio_custom_v1'); } catch (e) {}
        }
    } else if (typeof defaultPortfolioData !== 'undefined') {
        portfolioData = JSON.parse(JSON.stringify(defaultPortfolioData));
        window.portfolioData = portfolioData;
    }
}

function saveStoredData() {
    const currentData = window.portfolioData || portfolioData;
    if (!currentData) return;

    portfolioData = currentData;
    window.portfolioData = currentData;
    const dataStr = JSON.stringify(currentData);

    // 1. Asynchronously backup to IndexedDB for large image data payloads & complete project details
    openPortfolioDB().then(db => {
        if (db) {
            const tx = db.transaction(IDB_STORE, 'readwrite');
            const store = tx.objectStore(IDB_STORE);
            store.put(dataStr, 'current_portfolio_data');
        }
    }).catch(e => console.error("IndexedDB save error", e));

    // 2. Synchronously save to localStorage immediately, clearing stale data if quota fails
    try {
        localStorage.setItem('nani_portfolio_custom_v1', dataStr);
    } catch (err) {
        console.warn("localStorage quota warning. Safely storing payload in IndexedDB and clearing stale localStorage key.", err);
        try {
            localStorage.removeItem('nani_portfolio_custom_v1');
        } catch (e) {}
    }
}

function renderAllSectionsFromData() {
    renderPersonalAndSummaryFromData();
    renderSkillsFromData();
    renderProjectsFromData();
    renderExperienceFromData();
    renderEducationAndCertsFromData();
    renderCustomizerLists();

    // Refresh interactive animation triggers for dynamic elements
    initSpotlightAnd3DTilt();
    initMagneticButtons();
    initScrollAnimations();
}

function renderPersonalAndSummaryFromData() {
    if (!portfolioData || !portfolioData.personalInfo) return;
    const info = portfolioData.personalInfo;

    // Hero Name & Status
    const nameTrigger = document.getElementById('hero-name-admin-trigger');
    if (nameTrigger) nameTrigger.textContent = info.name || "Nani Sontyana";

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
    if (!grid || !portfolioData || !portfolioData.skills) return;

    grid.innerHTML = portfolioData.skills.map(skill => `
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
    if (!grid || !portfolioData || !portfolioData.projects) return;

    grid.innerHTML = portfolioData.projects.map(proj => `
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
    if (!expContainer || !portfolioData || !portfolioData.experience) return;

    expContainer.innerHTML = portfolioData.experience.map(exp => `
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
    const eduContainer = document.getElementById('education-list-container');
    if (eduContainer && portfolioData.education) {
        eduContainer.innerHTML = portfolioData.education.map(item => `
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
    if (certsContainer && portfolioData.certifications) {
        certsContainer.innerHTML = portfolioData.certifications.map(cert => `
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
                    ` : `
                        <button class="btn-cert-link btn-cert-add" onclick="promptAddCertLink(event, '${cert.id}')">
                            <i class="fa-solid fa-link"></i> Add Certificate Link
                        </button>
                    `}
                </div>
            </div>
        `).join('');
    }
}

/* ==========================================================================
   2. Secret Admin Triggers & Customizer Portal Logic
   ========================================================================== */
function initSecretAdminTriggers() {
    const logoHeader = document.getElementById('logo-admin-trigger');
    const logoFooter = document.getElementById('footer-logo-admin-trigger');
    const heroName = document.getElementById('hero-name-admin-trigger');

    let clickCount = 0;
    let timer = null;

    const triggerAdmin = (e) => {
        e.preventDefault();
        clickCount++;
        if (clickCount === 1) {
            timer = setTimeout(() => {
                openCustomizerModal();
                clickCount = 0;
            }, 300);
        } else if (clickCount >= 2) {
            clearTimeout(timer);
            openCustomizerModal();
            clickCount = 0;
        }
    };

    if (logoHeader) logoHeader.addEventListener('click', triggerAdmin);
    if (logoFooter) logoFooter.addEventListener('click', triggerAdmin);
    if (heroName) heroName.addEventListener('click', openCustomizerModal);
}

function openCustomizerModal() {
    populatePersonalInputs();
    renderCustomizerLists();
    document.getElementById('customizer-modal').classList.add('active');
}

function closeCustomizerModal() {
    document.getElementById('customizer-modal').classList.remove('active');
}

function switchCustTab(tab) {
    document.querySelectorAll('.skill-tab-btn[id^="cust-tab-"]').forEach(b => b.classList.remove('active'));
    const activeTabBtn = document.getElementById(`cust-tab-${tab}`);
    if (activeTabBtn) activeTabBtn.classList.add('active');

    const contents = ['personal', 'skills', 'projects', 'experience', 'education', 'export'];
    contents.forEach(c => {
        const el = document.getElementById(`cust-content-${c}`);
        if (el) el.style.display = c === tab ? 'block' : 'none';
    });

    if (tab === 'export') {
        generateConfigExportJS();
    }
}

function populatePersonalInputs() {
    if (!portfolioData || !portfolioData.personalInfo) return;
    const info = portfolioData.personalInfo;

    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || '';
    };

    setVal('cust-name', info.name);
    setVal('cust-title', info.title);
    setVal('cust-status', info.status);
    setVal('cust-summary', info.summary);
    setVal('cust-about-title', info.aboutTitle);
    setVal('cust-about-subtitle', info.aboutSubtitle);
    setVal('cust-cgpa', info.cgpa);
    setVal('cust-apispeed', info.apiSpeedup);
    setVal('cust-mlacc', info.mlAccuracy);
    setVal('cust-codedup', info.codeDupDrop);
    setVal('cust-email', info.email);
    setVal('cust-phone', info.phone);
    setVal('cust-linkedin', info.linkedin);
    setVal('cust-github', info.github);
    setVal('cust-bg-video', info.bgVideo);
}

function savePersonalInfoFromUI() {
    const getVal = (id) => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
    };

    portfolioData.personalInfo = {
        name: getVal('cust-name') || "Nani Sontyana",
        title: getVal('cust-title') || "Full-Stack & AI Systems Engineer",
        status: getVal('cust-status') || "Actively Seeking Software Engineering Roles",
        summary: getVal('cust-summary') || "",
        aboutTitle: getVal('cust-about-title') || "Engineered For Performance & Scale",
        aboutSubtitle: getVal('cust-about-subtitle') || "A quick snapshot of my technical capabilities and practical software engineering footprint.",
        cgpa: getVal('cust-cgpa') || "8.14",
        apiSpeedup: getVal('cust-apispeed') || "25%",
        mlAccuracy: getVal('cust-mlacc') || "75%+",
        codeDupDrop: getVal('cust-codedup') || "30%",
        email: getVal('cust-email') || "nanisontyana47@gmail.com",
        phone: getVal('cust-phone') || "+91 9618466575",
        linkedin: getVal('cust-linkedin') || "https://linkedin.com/in/nani-sontyana",
        github: getVal('cust-github') || "https://github.com/nanisontyana",
        bgVideo: getVal('cust-bg-video') || "custom-bg-video.mp4"
    };

    saveStoredData();
    renderAllSectionsFromData();
    alert("SUCCESS! Personal Info & Summary updated across the portfolio.");
}

function renderCustomizerLists() {
    // Skills List
    const skillsList = document.getElementById('cust-skills-list');
    const skillCount = document.getElementById('skill-count');
    if (skillsList && portfolioData.skills) {
        skillCount.textContent = portfolioData.skills.length;
        skillsList.innerHTML = portfolioData.skills.map(s => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); padding:0.6rem 0.9rem; border-radius:8px; border:1px solid var(--glass-border);">
                <div>
                    <strong style="color:var(--text-main); font-size:0.9rem;">${s.name}</strong>
                    <span style="font-size:0.75rem; color:var(--primary-cyan); margin-left:0.5rem; text-transform:uppercase;">[${s.category}]</span>
                </div>
                <div style="display:flex; gap:0.5rem;">
                    <button onclick="populateSkillFormForEdit('${s.id}')" style="background:rgba(0,242,254,0.15); border:1px solid rgba(0,242,254,0.4); color:var(--primary-cyan); border-radius:6px; padding:0.25rem 0.65rem; cursor:pointer; font-size:0.78rem;">
                        <i class="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                    <button onclick="deleteSkillFromUI('${s.id}')" style="background:rgba(255,77,77,0.15); border:1px solid rgba(255,77,77,0.3); color:#ff4d4d; border-radius:6px; padding:0.25rem 0.65rem; cursor:pointer; font-size:0.78rem;">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Projects List
    const projList = document.getElementById('cust-projects-list');
    const projCount = document.getElementById('proj-count');
    if (projList && portfolioData.projects) {
        projCount.textContent = portfolioData.projects.length;
        projList.innerHTML = portfolioData.projects.map(p => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); padding:0.6rem 0.9rem; border-radius:8px; border:1px solid var(--glass-border);">
                <div>
                    <strong style="color:var(--text-main); font-size:0.9rem;">${p.title}</strong>
                    <span style="font-size:0.75rem; color:var(--text-muted); display:block;">${p.badge}</span>
                </div>
                <div style="display:flex; gap:0.5rem;">
                    <button onclick="populateProjectFormForEdit('${p.id}')" style="background:rgba(0,242,254,0.15); border:1px solid rgba(0,242,254,0.4); color:var(--primary-cyan); border-radius:6px; padding:0.25rem 0.65rem; cursor:pointer; font-size:0.78rem;">
                        <i class="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                    <button onclick="deleteProjectFromUI('${p.id}')" style="background:rgba(255,77,77,0.15); border:1px solid rgba(255,77,77,0.3); color:#ff4d4d; border-radius:6px; padding:0.25rem 0.65rem; cursor:pointer; font-size:0.78rem;">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Education List
    const eduList = document.getElementById('cust-edu-list');
    const eduCount = document.getElementById('edu-count');
    if (eduList && portfolioData.education) {
        eduCount.textContent = portfolioData.education.length;
        eduList.innerHTML = portfolioData.education.map(e => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); padding:0.6rem 0.9rem; border-radius:8px; border:1px solid var(--glass-border);">
                <div>
                    <strong style="color:var(--text-main); font-size:0.9rem;">${e.degree}</strong>
                    <span style="font-size:0.75rem; color:var(--text-muted); display:block;">${e.institution} (${e.duration})</span>
                </div>
                <div style="display:flex; gap:0.5rem;">
                    <button onclick="populateEduFormForEdit('${e.id}')" style="background:rgba(0,242,254,0.15); border:1px solid rgba(0,242,254,0.4); color:var(--primary-cyan); border-radius:6px; padding:0.25rem 0.65rem; cursor:pointer; font-size:0.78rem;">
                        <i class="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                    <button onclick="deleteEduFromUI('${e.id}')" style="background:rgba(255,77,77,0.15); border:1px solid rgba(255,77,77,0.3); color:#ff4d4d; border-radius:6px; padding:0.25rem 0.6rem; cursor:pointer; font-size:0.78rem;">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Certifications List
    const certList = document.getElementById('cust-cert-list');
    const certCount = document.getElementById('cert-count');
    if (certList && portfolioData.certifications) {
        certCount.textContent = portfolioData.certifications.length;
        certList.innerHTML = portfolioData.certifications.map(c => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); padding:0.6rem 0.9rem; border-radius:8px; border:1px solid var(--glass-border);">
                <div>
                    <strong style="color:var(--text-main); font-size:0.9rem;">${c.title}</strong>
                    <span style="font-size:0.75rem; color:var(--text-muted); display:block;">${c.issuer} (${c.year})</span>
                </div>
                <div style="display:flex; gap:0.5rem;">
                    <button onclick="populateCertFormForEdit('${c.id}')" style="background:rgba(0,242,254,0.15); border:1px solid rgba(0,242,254,0.4); color:var(--primary-cyan); border-radius:6px; padding:0.25rem 0.65rem; cursor:pointer; font-size:0.78rem;">
                        <i class="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                    <button onclick="deleteCertFromUI('${c.id}')" style="background:rgba(255,77,77,0.15); border:1px solid rgba(255,77,77,0.3); color:#ff4d4d; border-radius:6px; padding:0.25rem 0.6rem; cursor:pointer; font-size:0.78rem;">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Experience List
    const expList = document.getElementById('cust-exp-list');
    const expCount = document.getElementById('exp-count');
    if (expList && portfolioData.experience) {
        expCount.textContent = portfolioData.experience.length;
        expList.innerHTML = portfolioData.experience.map(x => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); padding:0.6rem 0.9rem; border-radius:8px; border:1px solid var(--glass-border);">
                <div>
                    <strong style="color:var(--text-main); font-size:0.9rem;">${x.company}</strong>
                    <span style="font-size:0.75rem; color:var(--text-muted); display:block;">${x.role} (${x.duration})</span>
                </div>
                <div style="display:flex; gap:0.5rem;">
                    <button onclick="populateExpFormForEdit('${x.id}')" style="background:rgba(0,242,254,0.15); border:1px solid rgba(0,242,254,0.4); color:var(--primary-cyan); border-radius:6px; padding:0.25rem 0.65rem; cursor:pointer; font-size:0.78rem;">
                        <i class="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                    <button onclick="deleteExpFromUI('${x.id}')" style="background:rgba(255,77,77,0.15); border:1px solid rgba(255,77,77,0.3); color:#ff4d4d; border-radius:6px; padding:0.25rem 0.6rem; cursor:pointer; font-size:0.78rem;">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function populateSkillFormForEdit(skillId) {
    const s = (portfolioData.skills || []).find(item => item.id === skillId);
    if (!s) return;
    const editIdInput = document.getElementById('editing-skill-id');
    if (editIdInput) editIdInput.value = s.id;
    document.getElementById('new-skill-name').value = s.name || '';
    document.getElementById('new-skill-category').value = s.category || 'languages';
    document.getElementById('new-skill-level').value = s.level || 85;
    document.getElementById('new-skill-tags').value = (s.tags || []).join(', ');

    const heading = document.getElementById('skill-form-heading');
    if (heading) heading.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Skill: <span style="color:#00f2fe;">${s.name}</span>`;
    const btnSave = document.getElementById('btn-save-skill');
    if (btnSave) btnSave.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Save Skill Changes`;
    const btnCancel = document.getElementById('btn-cancel-skill-edit');
    if (btnCancel) btnCancel.style.display = 'inline-flex';
}

function resetSkillForm() {
    const editIdInput = document.getElementById('editing-skill-id');
    if (editIdInput) editIdInput.value = '';
    document.getElementById('new-skill-name').value = '';
    document.getElementById('new-skill-level').value = '';
    document.getElementById('new-skill-tags').value = '';

    const heading = document.getElementById('skill-form-heading');
    if (heading) heading.innerHTML = `<i class="fa-solid fa-plus"></i> Add / Edit Skill`;
    const btnSave = document.getElementById('btn-save-skill');
    if (btnSave) btnSave.innerHTML = `<i class="fa-solid fa-plus"></i> Save / Add Skill`;
    const btnCancel = document.getElementById('btn-cancel-skill-edit');
    if (btnCancel) btnCancel.style.display = 'none';
}

function addNewSkillFromUI() {
    const editIdInput = document.getElementById('editing-skill-id');
    const editId = editIdInput ? editIdInput.value : '';
    const name = document.getElementById('new-skill-name').value.trim();
    const category = document.getElementById('new-skill-category').value;
    const level = parseInt(document.getElementById('new-skill-level').value) || 85;
    const tagsStr = document.getElementById('new-skill-tags').value.trim();

    if (!name) {
        alert("Please enter a skill name.");
        return;
    }

    if (!portfolioData.skills) portfolioData.skills = [];
    const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()) : ["Custom"];

    if (editId) {
        const idx = portfolioData.skills.findIndex(s => s.id === editId);
        if (idx !== -1) {
            portfolioData.skills[idx] = {
                ...portfolioData.skills[idx],
                name,
                category,
                level,
                tags
            };
        }
    } else {
        const newSkill = {
            id: "s_" + Date.now(),
            name: name,
            category: category,
            level: level,
            status: "Custom Skill",
            tags: tags,
            icon: "fa-solid fa-code",
            iconColor: "#00f2fe"
        };
        portfolioData.skills.push(newSkill);
    }

    saveStoredData();
    renderAllSectionsFromData();
    resetSkillForm();
}

function deleteSkillFromUI(id) {
    portfolioData.skills = portfolioData.skills.filter(s => s.id !== id);
    saveStoredData();
    renderAllSectionsFromData();
}

function handleProjectImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1000;
            const MAX_HEIGHT = 700;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
            document.getElementById('new-proj-cover').value = compressedDataUrl;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function downloadPortfolioConfigFile() {
    const fileContent = `/* ==========================================================================
   PORTFOLIO CONFIGURATION DATA
   Saved on ${new Date().toLocaleDateString()}
   ========================================================================== */

const defaultPortfolioData = ${JSON.stringify(portfolioData, null, 4)};

// Global portfolioData object initialized immediately from localStorage or defaults
var portfolioData;
try {
    const localSaved = localStorage.getItem('nani_portfolio_custom_v1');
    if (localSaved) {
        const parsed = JSON.parse(localSaved);
        if (parsed && parsed.personalInfo && parsed.projects) {
            portfolioData = parsed;
        } else {
            portfolioData = JSON.parse(JSON.stringify(defaultPortfolioData));
        }
    } else {
        portfolioData = JSON.parse(JSON.stringify(defaultPortfolioData));
    }
} catch (e) {
    portfolioData = JSON.parse(JSON.stringify(defaultPortfolioData));
}

if (typeof window !== 'undefined') {
    window.portfolioData = portfolioData;
}
`;

    const blob = new Blob([fileContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("Downloaded updated portfolio-data.js! Replace portfolio-data.js in your project folder to save changes permanently in your code repository.");
}

function populateProjectFormForEdit(projId) {
    const proj = (portfolioData.projects || []).find(p => p.id === projId);
    if (!proj) return;

    document.getElementById('editing-proj-id').value = proj.id;
    document.getElementById('new-proj-title').value = proj.title || '';
    document.getElementById('new-proj-badge').value = proj.badge || '';
    document.getElementById('new-proj-cover').value = proj.coverImage || '';
    document.getElementById('new-proj-category').value = proj.category || 'ai fullstack';
    document.getElementById('new-proj-github').value = proj.githubUrl || '';
    document.getElementById('new-proj-live').value = proj.liveUrl || '';
    document.getElementById('new-proj-tech').value = (proj.tech || []).join(', ');
    document.getElementById('new-proj-desc').value = proj.description || '';
    document.getElementById('new-proj-bullets').value = (proj.bullets || []).join('\n');

    const heading = document.getElementById('proj-form-heading');
    if (heading) {
        heading.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Project: <span style="color:#00f2fe;">${proj.title}</span>`;
    }
    const saveBtn = document.getElementById('btn-save-project');
    if (saveBtn) {
        saveBtn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Save Project Changes`;
    }
    const cancelBtn = document.getElementById('btn-cancel-proj-edit');
    if (cancelBtn) {
        cancelBtn.style.display = 'inline-flex';
    }
}

function resetProjectForm() {
    const editIdInput = document.getElementById('editing-proj-id');
    if (editIdInput) editIdInput.value = '';
    document.getElementById('new-proj-title').value = '';
    document.getElementById('new-proj-badge').value = '';
    document.getElementById('new-proj-cover').value = '';
    document.getElementById('new-proj-github').value = '';
    document.getElementById('new-proj-live').value = '';
    document.getElementById('new-proj-tech').value = '';
    document.getElementById('new-proj-desc').value = '';
    document.getElementById('new-proj-bullets').value = '';

    const heading = document.getElementById('proj-form-heading');
    if (heading) {
        heading.innerHTML = `<i class="fa-solid fa-plus"></i> Add / Edit Project & Hidden Details`;
    }
    const saveBtn = document.getElementById('btn-save-project');
    if (saveBtn) {
        saveBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Save / Add Project`;
    }
    const cancelBtn = document.getElementById('btn-cancel-proj-edit');
    if (cancelBtn) {
        cancelBtn.style.display = 'none';
    }
}

function addNewProjectFromUI() {
    const editIdInput = document.getElementById('editing-proj-id');
    const editId = editIdInput ? editIdInput.value : '';
    const title = document.getElementById('new-proj-title').value.trim();
    const badge = document.getElementById('new-proj-badge').value.trim() || '2026';
    const category = document.getElementById('new-proj-category').value;
    const coverImage = document.getElementById('new-proj-cover').value.trim();
    const githubUrl = document.getElementById('new-proj-github').value.trim();
    const liveUrl = document.getElementById('new-proj-live').value.trim();
    const techStr = document.getElementById('new-proj-tech').value.trim();
    const desc = document.getElementById('new-proj-desc').value.trim();
    const bulletsStr = document.getElementById('new-proj-bullets').value.trim();

    if (!title) {
        alert("Please enter a project title.");
        return;
    }

    if (!portfolioData.projects) portfolioData.projects = [];

    if (editId) {
        const idx = portfolioData.projects.findIndex(p => p.id === editId);
        if (idx !== -1) {
            const existing = portfolioData.projects[idx];
            const parsedBullets = bulletsStr
                ? bulletsStr.split('\n').map(b => b.trim()).filter(b => b.length > 0)
                : (existing.bullets && existing.bullets.length > 0 ? existing.bullets : [desc || "Designed scalable architecture and user interface."]);

            const parsedTech = techStr
                ? techStr.split(',').map(t => t.trim()).filter(t => t.length > 0)
                : (existing.tech && existing.tech.length > 0 ? existing.tech : ["React", "Node.js"]);

            portfolioData.projects[idx] = {
                ...existing,
                title: title || existing.title,
                badge: badge || existing.badge,
                coverImage: coverImage || existing.coverImage,
                category: category || existing.category,
                filterCat: category === "ai fullstack" ? "ai" : (category === "backend fullstack" ? "backend" : "fullstack"),
                githubUrl: githubUrl !== undefined && githubUrl !== '' ? githubUrl : existing.githubUrl,
                liveUrl: liveUrl !== undefined && liveUrl !== '' ? liveUrl : existing.liveUrl,
                description: desc || existing.description,
                tech: parsedTech,
                bullets: parsedBullets
            };
        }
    } else {
        const parsedBullets = bulletsStr
            ? bulletsStr.split('\n').map(b => b.trim()).filter(b => b.length > 0)
            : [desc || "Designed scalable architecture and user interface."];

        const newProj = {
            id: "p_" + Date.now(),
            title: title,
            category: category || "ai fullstack",
            filterCat: category === "ai fullstack" ? "ai" : (category === "backend fullstack" ? "backend" : "fullstack"),
            badge: badge || "2026",
            icon: "fa-solid fa-rocket",
            gradientClass: "bg-gradient-rag",
            coverImage: coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
            githubUrl: githubUrl || "",
            liveUrl: liveUrl || "",
            subtitle: title + " Microservices & Architecture",
            type: "Featured Platform",
            description: desc || "Scalable full-stack application built with microservice architecture.",
            tech: techStr ? techStr.split(',').map(t => t.trim()).filter(t => t.length > 0) : ["React", "Node.js", "Python Flask"],
            bullets: parsedBullets
        };
        portfolioData.projects.push(newProj);
    }

    saveStoredData();
    renderAllSectionsFromData();
    resetProjectForm();
    alert(`SUCCESS! Project "${title}" saved cleanly to browser database (IndexedDB). All details preserved.`);
}

function deleteProjectFromUI(id) {
    portfolioData.projects = portfolioData.projects.filter(p => p.id !== id);
    saveStoredData();
    renderAllSectionsFromData();
}

function populateEduFormForEdit(eduId) {
    const e = (portfolioData.education || []).find(item => item.id === eduId);
    if (!e) return;
    const editIdInput = document.getElementById('editing-edu-id');
    if (editIdInput) editIdInput.value = e.id;
    document.getElementById('new-edu-degree').value = e.degree || '';
    document.getElementById('new-edu-inst').value = e.institution || '';
    document.getElementById('new-edu-duration').value = e.duration || '';
    document.getElementById('new-edu-gpa').value = e.gpa || '';
    document.getElementById('new-edu-desc').value = e.description || '';

    const heading = document.getElementById('edu-form-heading');
    if (heading) heading.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Education: <span style="color:#00f2fe;">${e.degree}</span>`;
    const btnSave = document.getElementById('btn-save-edu');
    if (btnSave) btnSave.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Save Education Changes`;
    const btnCancel = document.getElementById('btn-cancel-edu-edit');
    if (btnCancel) btnCancel.style.display = 'inline-flex';
}

function resetEduForm() {
    const editIdInput = document.getElementById('editing-edu-id');
    if (editIdInput) editIdInput.value = '';
    document.getElementById('new-edu-degree').value = '';
    document.getElementById('new-edu-inst').value = '';
    document.getElementById('new-edu-duration').value = '';
    document.getElementById('new-edu-gpa').value = '';
    document.getElementById('new-edu-desc').value = '';

    const heading = document.getElementById('edu-form-heading');
    if (heading) heading.innerHTML = `<i class="fa-solid fa-plus"></i> Add / Edit Education Degree`;
    const btnSave = document.getElementById('btn-save-edu');
    if (btnSave) btnSave.innerHTML = `<i class="fa-solid fa-plus"></i> Save / Add Education Entry`;
    const btnCancel = document.getElementById('btn-cancel-edu-edit');
    if (btnCancel) btnCancel.style.display = 'none';
}

function addNewEduFromUI() {
    const editIdInput = document.getElementById('editing-edu-id');
    const editId = editIdInput ? editIdInput.value : '';
    const degree = document.getElementById('new-edu-degree').value.trim();
    const inst = document.getElementById('new-edu-inst').value.trim();
    const duration = document.getElementById('new-edu-duration').value.trim() || '2022 - 2026';
    const gpa = document.getElementById('new-edu-gpa').value.trim() || 'CGPA: 8.0';
    const desc = document.getElementById('new-edu-desc').value.trim();

    if (!degree || !inst) {
        alert("Please enter degree and institution.");
        return;
    }

    if (!portfolioData.education) portfolioData.education = [];

    if (editId) {
        const idx = portfolioData.education.findIndex(e => e.id === editId);
        if (idx !== -1) {
            portfolioData.education[idx] = {
                ...portfolioData.education[idx],
                degree,
                institution: inst,
                duration,
                gpa,
                description: desc
            };
        }
    } else {
        portfolioData.education.push({
            id: "e_" + Date.now(),
            degree,
            institution: inst,
            duration,
            gpa,
            description: desc
        });
    }

    saveStoredData();
    renderAllSectionsFromData();
    resetEduForm();
}

function deleteEduFromUI(id) {
    portfolioData.education = (portfolioData.education || []).filter(e => e.id !== id);
    saveStoredData();
    renderAllSectionsFromData();
}

function populateCertFormForEdit(certId) {
    const c = (portfolioData.certifications || []).find(item => item.id === certId);
    if (!c) return;
    const editIdInput = document.getElementById('editing-cert-id');
    if (editIdInput) editIdInput.value = c.id;
    document.getElementById('new-cert-title').value = c.title || '';
    document.getElementById('new-cert-issuer').value = c.issuer || '';
    document.getElementById('new-cert-year').value = c.year || '';
    if (document.getElementById('new-cert-url')) document.getElementById('new-cert-url').value = c.certUrl || '';
    document.getElementById('new-cert-desc').value = c.description || '';

    const heading = document.getElementById('cert-form-heading');
    if (heading) heading.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Certification: <span style="color:#00f2fe;">${c.title}</span>`;
    const btnSave = document.getElementById('btn-save-cert');
    if (btnSave) btnSave.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Save Certification Changes`;
    const btnCancel = document.getElementById('btn-cancel-cert-edit');
    if (btnCancel) btnCancel.style.display = 'inline-flex';
}

function resetCertForm() {
    const editIdInput = document.getElementById('editing-cert-id');
    if (editIdInput) editIdInput.value = '';
    document.getElementById('new-cert-title').value = '';
    document.getElementById('new-cert-issuer').value = '';
    document.getElementById('new-cert-year').value = '';
    if (document.getElementById('new-cert-url')) document.getElementById('new-cert-url').value = '';
    document.getElementById('new-cert-desc').value = '';

    const heading = document.getElementById('cert-form-heading');
    if (heading) heading.innerHTML = `<i class="fa-solid fa-plus"></i> Add / Edit Verified Certification`;
    const btnSave = document.getElementById('btn-save-cert');
    if (btnSave) btnSave.innerHTML = `<i class="fa-solid fa-plus"></i> Save / Add Certification Entry`;
    const btnCancel = document.getElementById('btn-cancel-cert-edit');
    if (btnCancel) btnCancel.style.display = 'none';
}

function addNewCertFromUI() {
    const editIdInput = document.getElementById('editing-cert-id');
    const editId = editIdInput ? editIdInput.value : '';
    const title = document.getElementById('new-cert-title').value.trim();
    const issuer = document.getElementById('new-cert-issuer').value.trim();
    const year = document.getElementById('new-cert-year').value.trim() || 'Issued 2025';
    const certUrl = document.getElementById('new-cert-url') ? document.getElementById('new-cert-url').value.trim() : '';
    const desc = document.getElementById('new-cert-desc').value.trim();

    if (!title || !issuer) {
        alert("Please enter certification title and issuer.");
        return;
    }

    if (!portfolioData.certifications) portfolioData.certifications = [];

    if (editId) {
        const idx = portfolioData.certifications.findIndex(c => c.id === editId);
        if (idx !== -1) {
            portfolioData.certifications[idx] = {
                ...portfolioData.certifications[idx],
                title,
                issuer,
                year,
                certUrl,
                description: desc
            };
        }
    } else {
        portfolioData.certifications.push({
            id: "c_" + Date.now(),
            title,
            issuer,
            year,
            certUrl,
            description: desc
        });
    }

    saveStoredData();
    renderAllSectionsFromData();
    resetCertForm();
}

function promptAddCertLink(e, certId) {
    if (e) e.preventDefault();
    const cert = (portfolioData.certifications || []).find(c => c.id === certId);
    if (!cert) return;

    const url = prompt(`Paste Certificate Verification URL for "${cert.title}":`, cert.certUrl || 'https://');
    if (url && url.trim() && url !== 'https://') {
        cert.certUrl = url.trim();
        saveStoredData();
        renderAllSectionsFromData();
    }
}

function deleteCertFromUI(id) {
    portfolioData.certifications = (portfolioData.certifications || []).filter(c => c.id !== id);
    saveStoredData();
    renderAllSectionsFromData();
}

function populateExpFormForEdit(expId) {
    const x = (portfolioData.experience || []).find(item => item.id === expId);
    if (!x) return;
    const editIdInput = document.getElementById('editing-exp-id');
    if (editIdInput) editIdInput.value = x.id;
    document.getElementById('new-exp-company').value = x.company || '';
    document.getElementById('new-exp-role').value = x.role || '';
    document.getElementById('new-exp-duration').value = x.duration || '';
    document.getElementById('new-exp-location').value = x.location || '';
    document.getElementById('new-exp-tech').value = (x.tech || []).join(', ');
    document.getElementById('new-exp-bullets').value = (x.bullets || []).join('\n');

    const heading = document.getElementById('exp-form-heading');
    if (heading) heading.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Experience: <span style="color:#00f2fe;">${x.company}</span>`;
    const btnSave = document.getElementById('btn-save-exp');
    if (btnSave) btnSave.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Save Experience Changes`;
    const btnCancel = document.getElementById('btn-cancel-exp-edit');
    if (btnCancel) btnCancel.style.display = 'inline-flex';
}

function resetExpForm() {
    const editIdInput = document.getElementById('editing-exp-id');
    if (editIdInput) editIdInput.value = '';
    document.getElementById('new-exp-company').value = '';
    document.getElementById('new-exp-role').value = '';
    document.getElementById('new-exp-duration').value = '';
    document.getElementById('new-exp-location').value = '';
    document.getElementById('new-exp-tech').value = '';
    document.getElementById('new-exp-bullets').value = '';

    const heading = document.getElementById('exp-form-heading');
    if (heading) heading.innerHTML = `<i class="fa-solid fa-plus"></i> Add / Edit Work / Internship Experience`;
    const btnSave = document.getElementById('btn-save-exp');
    if (btnSave) btnSave.innerHTML = `<i class="fa-solid fa-plus"></i> Save / Add Experience Entry`;
    const btnCancel = document.getElementById('btn-cancel-exp-edit');
    if (btnCancel) btnCancel.style.display = 'none';
}

function addNewExpFromUI() {
    const editIdInput = document.getElementById('editing-exp-id');
    const editId = editIdInput ? editIdInput.value : '';
    const company = document.getElementById('new-exp-company').value.trim();
    const role = document.getElementById('new-exp-role').value.trim();
    const duration = document.getElementById('new-exp-duration').value.trim() || '2024';
    const location = document.getElementById('new-exp-location').value.trim() || 'Remote';
    const techStr = document.getElementById('new-exp-tech').value.trim();
    const bulletsStr = document.getElementById('new-exp-bullets').value.trim();

    if (!portfolioData.experience) portfolioData.experience = [];

    if (editId) {
        const idx = portfolioData.experience.findIndex(x => x.id === editId);
        if (idx !== -1) {
            const existing = portfolioData.experience[idx];
            const bullets = bulletsStr
                ? bulletsStr.split('\n').map(b => b.trim()).filter(b => b.length > 0)
                : (existing.bullets && existing.bullets.length > 0 ? existing.bullets : ["Delivered full-stack microservices and API solutions."]);

            portfolioData.experience[idx] = {
                ...existing,
                company: company || existing.company,
                role: role || existing.role,
                duration: duration || existing.duration,
                location: location || existing.location,
                tech: techStr ? techStr.split(',').map(t => t.trim()).filter(t => t.length > 0) : existing.tech,
                bullets
            };
        }
    } else {
        const bullets = bulletsStr
            ? bulletsStr.split('\n').map(b => b.trim()).filter(b => b.length > 0)
            : ["Delivered full-stack microservices and API solutions."];

        portfolioData.experience.push({
            id: "exp_" + Date.now(),
            company,
            role,
            duration,
            location,
            tech: techStr ? techStr.split(',').map(t => t.trim()).filter(t => t.length > 0) : ["Full Stack"],
            bullets
        });
    }

    saveStoredData();
    renderAllSectionsFromData();
    resetExpForm();
    alert("SUCCESS! Experience entry updated.");
}

function deleteExpFromUI(id) {
    portfolioData.experience = (portfolioData.experience || []).filter(x => x.id !== id);
    saveStoredData();
    renderAllSectionsFromData();
}

function generateConfigExportJS() {
    const box = document.getElementById('export-json-box');
    if (box) {
        box.value = `const portfolioData = ${JSON.stringify(portfolioData, null, 4)};`;
    }
}

function applyLiveConfigFromTextarea() {
    const box = document.getElementById('export-json-box');
    if (!box) return;

    try {
        let code = box.value.trim();
        if (code.startsWith('const portfolioData =')) {
            code = code.replace(/^const portfolioData\s*=\s*/, '');
        }
        if (code.endsWith(';')) {
            code = code.slice(0, -1);
        }

        const newData = JSON.parse(code);
        
        if (newData && newData.skills && newData.projects) {
            window.portfolioData = newData;
            saveStoredData();
            renderAllSectionsFromData();
            alert("SUCCESS! Portfolio configuration updated live on the website.");
        } else {
            alert("Invalid configuration format. Must contain skills and projects arrays.");
        }
    } catch (err) {
        alert("JSON Syntax Error: " + err.message + "\nPlease check formatting.");
    }
}

function copyConfigToClipboard() {
    const box = document.getElementById('export-json-box');
    if (box) {
        box.select();
        navigator.clipboard.writeText(box.value);
        alert("Portfolio Config JavaScript copied to clipboard! Paste it into portfolio-data.js to save your changes permanently.");
    }
}

function downloadPortfolioConfigFile() {
    const jsContent = `/* ==========================================================================
   PORTFOLIO CONFIGURATION DATA (EXPORTED)
   ========================================================================== */

const defaultPortfolioData = ${JSON.stringify(portfolioData, null, 4)};

// Global portfolioData object initialized immediately from localStorage or defaults
let portfolioData;
try {
    const localSaved = localStorage.getItem('nani_portfolio_custom_v1');
    if (localSaved) {
        const parsed = JSON.parse(localSaved);
        if (parsed && parsed.personalInfo && parsed.projects) {
            portfolioData = parsed;
        } else {
            portfolioData = JSON.parse(JSON.stringify(defaultPortfolioData));
        }
    } else {
        portfolioData = JSON.parse(JSON.stringify(defaultPortfolioData));
    }
} catch (e) {
    portfolioData = JSON.parse(JSON.stringify(defaultPortfolioData));
}
`;

    const blob = new Blob([jsContent], { type: 'application/javascript;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'portfolio-data.js');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert("SUCCESS! 'portfolio-data.js' downloaded.\nSave or replace 'portfolio-data.js' in your project root to keep your changes permanently in source control!");
}

function resetPortfolioDataToDefaults() {
    if (confirm("Are you sure you want to reset all portfolio data to default settings?")) {
        localStorage.removeItem('nani_portfolio_custom_v1');
        openPortfolioDB().then(db => {
            if (db) {
                const tx = db.transaction(IDB_STORE, 'readwrite');
                tx.objectStore(IDB_STORE).delete('current_portfolio_data');
            }
        }).catch(e => console.error("IndexedDB reset error", e));
        if (typeof defaultPortfolioData !== 'undefined') {
            const defaults = JSON.parse(JSON.stringify(defaultPortfolioData));
            portfolioData = defaults;
            window.portfolioData = defaults;
        }
        renderAllSectionsFromData();
        populatePersonalInputs();
        alert("Portfolio data reset to default settings successfully.");
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
    } else if (proj.id === 'swiftcart') {
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
    let data = (portfolioData.projects || []).find(p => p.id === key);

    if (!data) return;

    const body = document.getElementById('modal-content-body');
    body.innerHTML = `
        <div class="modal-header-block" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.8rem;">
            <div>
                <span style="color:var(--primary-cyan); font-size:0.8rem; font-weight:700; text-transform:uppercase;">${data.badge}</span>
                <h2 style="margin-top:0.2rem;">${data.title}</h2>
                <p style="color:var(--text-muted); font-size:0.95rem;">${data.subtitle || ''}</p>
            </div>
            <button class="btn btn-sm btn-glass" onclick="openEditProjectModal('${data.id}')" style="border-color:var(--primary-cyan); color:var(--primary-cyan); font-size:0.85rem; padding:0.45rem 0.95rem; cursor:pointer;">
                <i class="fa-solid fa-pen-to-square"></i> Edit Project Details
            </button>
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

function openEditProjectModal(projId) {
    closeProjectModal();
    openCustomizerModal();
    switchCustTab('projects');
    populateProjectFormForEdit(projId);
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



