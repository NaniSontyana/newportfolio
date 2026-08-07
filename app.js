/* ==========================================================================
   NANI SONTYANA - PORTFOLIO INTERACTIVE LOGIC & DYNAMIC DATA ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    loadStoredData();
    initCanvasParticles();
    initTypingEffect();
    initNavbarScroll();
    initScrollAnimations();
    initStatCounters();
    initSkillFilters();
    initProjectFilters();
    initResumeModals();
    initSecretAdminTriggers();
    
    // Dynamic Render from portfolioData
    renderAllSectionsFromData();
});

/* ==========================================================================
   1. Data Persistence & Full Section Renderers
   ========================================================================== */
function loadStoredData() {
    const stored = localStorage.getItem('nani_portfolio_custom_v1');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (parsed && parsed.personalInfo) {
                window.portfolioData = parsed;
            }
        } catch (e) {
            console.error("Error loading stored portfolio customizer data", e);
        }
    }
}

function saveStoredData() {
    localStorage.setItem('nani_portfolio_custom_v1', JSON.stringify(portfolioData));
}

function renderAllSectionsFromData() {
    renderPersonalAndSummaryFromData();
    renderSkillsFromData();
    renderProjectsFromData();
    renderEducationAndCertsFromData();
    renderCustomizerLists();
}

function renderPersonalAndSummaryFromData() {
    if (!portfolioData || !portfolioData.personalInfo) return;
    const info = portfolioData.personalInfo;

    // Hero Name & Status
    const nameTrigger = document.getElementById('hero-name-admin-trigger');
    if (nameTrigger) nameTrigger.textContent = info.name || "Nani Sontyana";

    const statusDisplay = document.getElementById('hero-status-display');
    if (statusDisplay) {
        statusDisplay.innerHTML = `<span class="pulse-dot"></span> ${info.status || 'Available for Software Engineering Roles'}`;
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
                <div class="project-icon-wrapper">
                    <i class="${proj.icon || 'fa-solid fa-code'}"></i>
                </div>
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
                <div class="cert-info">
                    <h4>${cert.title}</h4>
                    <div class="cert-issuer">${cert.issuer}</div>
                    <div class="cert-date"><i class="fa-regular fa-calendar-check"></i> ${cert.year}</div>
                    <p>${cert.description}</p>
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

    const contents = ['personal', 'skills', 'projects', 'education', 'export'];
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
        status: getVal('cust-status') || "Available for Software Engineering Roles",
        summary: getVal('cust-summary') || "",
        aboutTitle: (portfolioData.personalInfo && portfolioData.personalInfo.aboutTitle) || "Engineered For Performance & Scale",
        aboutSubtitle: (portfolioData.personalInfo && portfolioData.personalInfo.aboutSubtitle) || "A quick snapshot of my technical capabilities and practical software engineering footprint.",
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
                <button onclick="deleteSkillFromUI('${s.id}')" style="background:rgba(255,77,77,0.15); border:1px solid rgba(255,77,77,0.3); color:#ff4d4d; border-radius:6px; padding:0.25rem 0.6rem; cursor:pointer; font-size:0.78rem;">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
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
                <button onclick="deleteProjectFromUI('${p.id}')" style="background:rgba(255,77,77,0.15); border:1px solid rgba(255,77,77,0.3); color:#ff4d4d; border-radius:6px; padding:0.25rem 0.6rem; cursor:pointer; font-size:0.78rem;">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
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
                <button onclick="deleteEduFromUI('${e.id}')" style="background:rgba(255,77,77,0.15); border:1px solid rgba(255,77,77,0.3); color:#ff4d4d; border-radius:6px; padding:0.25rem 0.6rem; cursor:pointer; font-size:0.78rem;">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
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
                <button onclick="deleteCertFromUI('${c.id}')" style="background:rgba(255,77,77,0.15); border:1px solid rgba(255,77,77,0.3); color:#ff4d4d; border-radius:6px; padding:0.25rem 0.6rem; cursor:pointer; font-size:0.78rem;">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
            </div>
        `).join('');
    }
}

function addNewSkillFromUI() {
    const name = document.getElementById('new-skill-name').value.trim();
    const category = document.getElementById('new-skill-category').value;
    const level = parseInt(document.getElementById('new-skill-level').value) || 85;
    const tagsStr = document.getElementById('new-skill-tags').value.trim();

    if (!name) {
        alert("Please enter a skill name.");
        return;
    }

    const newSkill = {
        id: "s_" + Date.now(),
        name: name,
        category: category,
        level: level,
        status: "Custom Skill",
        tags: tagsStr ? tagsStr.split(',').map(t => t.trim()) : ["Custom"],
        icon: "fa-solid fa-code",
        iconColor: "#00f2fe"
    };

    portfolioData.skills.push(newSkill);
    saveStoredData();
    renderAllSectionsFromData();

    document.getElementById('new-skill-name').value = '';
    document.getElementById('new-skill-tags').value = '';
}

function deleteSkillFromUI(id) {
    portfolioData.skills = portfolioData.skills.filter(s => s.id !== id);
    saveStoredData();
    renderAllSectionsFromData();
}

function addNewProjectFromUI() {
    const title = document.getElementById('new-proj-title').value.trim();
    const badge = document.getElementById('new-proj-badge').value.trim() || '2026';
    const category = document.getElementById('new-proj-category').value;
    const coverImage = document.getElementById('new-proj-cover').value.trim();
    const githubUrl = document.getElementById('new-proj-github').value.trim();
    const liveUrl = document.getElementById('new-proj-live').value.trim();
    const techStr = document.getElementById('new-proj-tech').value.trim();
    const desc = document.getElementById('new-proj-desc').value.trim();
    const bulletsStr = document.getElementById('new-proj-bullets').value.trim();

    if (!title || !desc) {
        alert("Please enter a project title and description.");
        return;
    }

    const parsedBullets = bulletsStr ? bulletsStr.split('\n').filter(line => line.trim().length > 0) : [desc];

    const newProj = {
        id: "p_" + Date.now(),
        title: title,
        category: category,
        badge: badge,
        icon: "fa-solid fa-rocket",
        gradientClass: "bg-gradient-rag",
        coverImage: coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        githubUrl: githubUrl || "https://github.com/nanisontyana",
        liveUrl: liveUrl || "",
        subtitle: title + " Microservices & Architecture",
        type: "Featured Platform",
        description: desc,
        tech: techStr ? techStr.split(',').map(t => t.trim()) : ["React", "Node.js", "Python Flask"],
        bullets: parsedBullets
    };

    portfolioData.projects.push(newProj);
    saveStoredData();
    renderAllSectionsFromData();

    document.getElementById('new-proj-title').value = '';
    document.getElementById('new-proj-badge').value = '';
    document.getElementById('new-proj-cover').value = '';
    document.getElementById('new-proj-github').value = '';
    document.getElementById('new-proj-live').value = '';
    document.getElementById('new-proj-tech').value = '';
    document.getElementById('new-proj-desc').value = '';
    document.getElementById('new-proj-bullets').value = '';
}

function deleteProjectFromUI(id) {
    portfolioData.projects = portfolioData.projects.filter(p => p.id !== id);
    saveStoredData();
    renderAllSectionsFromData();
}

function addNewEduFromUI() {
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
    portfolioData.education.push({
        id: "e_" + Date.now(),
        degree,
        institution: inst,
        duration,
        gpa,
        description: desc
    });

    saveStoredData();
    renderAllSectionsFromData();

    document.getElementById('new-edu-degree').value = '';
    document.getElementById('new-edu-inst').value = '';
    document.getElementById('new-edu-duration').value = '';
    document.getElementById('new-edu-gpa').value = '';
    document.getElementById('new-edu-desc').value = '';
}

function deleteEduFromUI(id) {
    portfolioData.education = (portfolioData.education || []).filter(e => e.id !== id);
    saveStoredData();
    renderAllSectionsFromData();
}

function addNewCertFromUI() {
    const title = document.getElementById('new-cert-title').value.trim();
    const issuer = document.getElementById('new-cert-issuer').value.trim();
    const year = document.getElementById('new-cert-year').value.trim() || 'Issued 2025';
    const desc = document.getElementById('new-cert-desc').value.trim();

    if (!title || !issuer) {
        alert("Please enter certification title and issuer.");
        return;
    }

    if (!portfolioData.certifications) portfolioData.certifications = [];
    portfolioData.certifications.push({
        id: "c_" + Date.now(),
        title,
        issuer,
        year,
        description: desc
    });

    saveStoredData();
    renderAllSectionsFromData();

    document.getElementById('new-cert-title').value = '';
    document.getElementById('new-cert-issuer').value = '';
    document.getElementById('new-cert-year').value = '';
    document.getElementById('new-cert-desc').value = '';
}

function deleteCertFromUI(id) {
    portfolioData.certifications = (portfolioData.certifications || []).filter(c => c.id !== id);
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

function resetPortfolioDataToDefaults() {
    if (confirm("Are you sure you want to reset all portfolio data to default settings?")) {
        localStorage.removeItem('nani_portfolio_custom_v1');
        if (typeof defaultPortfolioData !== 'undefined') {
            window.portfolioData = JSON.parse(JSON.stringify(defaultPortfolioData));
        }
        renderAllSectionsFromData();
        populatePersonalInputs();
        alert("Portfolio data reset to default settings successfully.");
    }
}


/* ==========================================================================
   3. Canvas Particle Constellation System
   ========================================================================== */
function initCanvasParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.floor((width * height) / 18000);

    let mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.size = Math.random() * 2 + 1;
            this.color = Math.random() > 0.5 ? '#ff2a4b' : '#ffffff';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 3;
                    this.y -= (dy / dist) * force * 3;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    const opacity = 1 - (dist / 120);
                    ctx.strokeStyle = `rgba(255, 42, 75, ${opacity * 0.3})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    }

    createParticles();
    animate();
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

/* ==========================================================================
   8. Project Modals & Interactive Demos
   ========================================================================== */
function openProjectModal(key) {
    let data = (portfolioData.projects || []).find(p => p.id === key);

    if (!data) return;

    const body = document.getElementById('modal-content-body');
    body.innerHTML = `
        <div class="modal-header-block">
            <span style="color:var(--primary-cyan); font-size:0.8rem; font-weight:700; text-transform:uppercase;">${data.badge}</span>
            <h2>${data.title}</h2>
            <p style="color:var(--text-muted); font-size:0.95rem;">${data.subtitle || ''}</p>
        </div>

        ${data.coverImage ? `<img src="${data.coverImage}" alt="${data.title}" style="width:100%; max-height:260px; object-fit:cover; border-radius:12px; margin-bottom:1.5rem; border:1px solid var(--glass-border);">` : ''}

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
            <h4 style="font-size:1rem; margin-bottom:0.8rem; color:var(--primary-cyan);">Key Architecture & Achievements:</h4>
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
