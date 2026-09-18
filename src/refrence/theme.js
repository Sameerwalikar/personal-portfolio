document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('theme-toggle');
    var body = document.body;
    var dlssToggle = document.getElementById('dlss-toggle');
    var dlssState = document.querySelector('.dlss-state');
    var profileImage = document.getElementById('profile-image');
    var profileFrame = document.querySelector('.profile-frame');
    var profileLoading = document.getElementById('profile-loading');
    var profileLoadingText = document.getElementById('profile-loading-text');
    var experienceTabs = document.querySelectorAll('.experience-tab');
    var dlssEnabled = false;
    var lenis = null;

    // Prevent browser from restoring scroll position on refresh and force top
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    toggle.addEventListener('click', function () {
        var isDark = body.getAttribute('data-theme') === 'dark';
        var nextTheme = isDark ? 'light' : 'dark';
        body.setAttribute('data-theme', nextTheme);
        if (typeof updateStatsCardsTheme === 'function') {
            updateStatsCardsTheme(nextTheme);
        }
    });

    experienceTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var panelId = tab.getAttribute('data-panel');
            var panel = document.getElementById(panelId);

            if (!panel) {
                return;
            }

            experienceTabs.forEach(function (item) {
                var itemPanel = document.getElementById(item.getAttribute('data-panel'));
                var isActive = item === tab;

                item.classList.toggle('is-active', isActive);
                item.setAttribute('aria-selected', isActive ? 'true' : 'false');

                if (itemPanel) {
                    itemPanel.classList.toggle('is-active', isActive);
                    itemPanel.hidden = !isActive;
                }
            });
        });
    });

    if (!dlssToggle || !profileImage || !profileFrame || !profileLoading || !profileLoadingText) {
        return;
    }

    [profileImage.dataset.pixelSrc, profileImage.dataset.upscaledSrc].forEach(function (src) {
        var preloadImage = new Image();
        preloadImage.src = src;
    });

    dlssToggle.addEventListener('click', function () {
        var nextEnabled = !dlssEnabled;
        var nextSrc = nextEnabled ? profileImage.dataset.upscaledSrc : profileImage.dataset.pixelSrc;
        var loadingText = nextEnabled ? 'Upscaling 360p to 4K' : 'Downscaling 4K to 360p';

        dlssToggle.disabled = true;
        profileFrame.classList.add('is-loading');
        profileLoading.hidden = false;
        profileLoadingText.textContent = loadingText;

        window.setTimeout(function () {
            dlssEnabled = nextEnabled;
            profileImage.src = nextSrc;
            profileImage.alt = dlssEnabled ? 'Upscaled profile portrait' : 'Pixelated profile portrait';
            profileImage.classList.toggle('is-pixelated', !dlssEnabled);
            dlssToggle.classList.toggle('is-on', dlssEnabled);
            dlssToggle.setAttribute('aria-checked', dlssEnabled ? 'true' : 'false');
            dlssState.textContent = dlssEnabled ? 'ON' : 'OFF';
            profileFrame.classList.remove('is-loading');
            profileLoading.hidden = true;
            dlssToggle.disabled = false;
        }, 3000);
    });

    // Project Cards Accordion
    var projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function (card) {
        card.addEventListener('click', function () {
            if (card.classList.contains('is-active')) {
                return;
            }

            // Collapse all cards
            projectCards.forEach(function (c) {
                c.classList.remove('is-active');
                var toggleButton = c.querySelector('.project-card-toggle');
                if (toggleButton) {
                    toggleButton.setAttribute('aria-expanded', 'false');
                }
            });

            // Expand clicked card
            card.classList.add('is-active');
            var currentToggle = card.querySelector('.project-card-toggle');
            if (currentToggle) {
                currentToggle.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ── Banner Name Hover Cycling ──
    var bannerName = document.querySelector('.banner-name');
    var defaultText = 'Mayur Pagote';
    var defaultFont = "'Parisienne', cursive";
    var bannerInterval = null;
    var bannerIndex = 0;

    var bannerVariations = [
        'मयूर पागोटे',
        'マユール パゴテ',
        '마유르 파고테',
        '马尤尔·帕戈特',
        'Маюр Паготе'
    ];

    function applyBannerVariation() {
        var text = bannerVariations[bannerIndex];
        bannerName.classList.remove('is-switching-in');
        bannerName.classList.add('is-switching-out');
        setTimeout(function () {
            bannerName.textContent = text;
            bannerName.classList.remove('is-switching-out');
            bannerName.classList.add('is-switching-in');
        }, 420);
        bannerIndex = (bannerIndex + 1) % bannerVariations.length;
    }

    var fontsLoaded = false;
    function lazyLoadFonts() {
        if (fontsLoaded) return;
        fontsLoaded = true;
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&family=Noto+Sans+JP&family=Noto+Sans+KR&family=Noto+Sans+SC&display=swap';
        document.head.appendChild(link);
    }

    if (bannerName) {
        bannerName.addEventListener('mouseenter', function () {
            lazyLoadFonts();
            bannerIndex = 0;
            applyBannerVariation();
            bannerInterval = setInterval(applyBannerVariation, 3000);
        });

        bannerName.addEventListener('mouseleave', function () {
            clearInterval(bannerInterval);
            bannerInterval = null;
            bannerName.classList.remove('is-switching-in');
            bannerName.classList.add('is-switching-out');
            setTimeout(function () {
                bannerName.textContent = defaultText;
                bannerName.classList.remove('is-switching-out');
                bannerName.classList.add('is-switching-in');
            }, 420);
        });
    }

    // Keyword Popups Cursor Tracking (Optimized: cache getBoundingClientRect on enter to avoid layout thrashing on move)
    var keywordWraps = document.querySelectorAll('.keyword-popup-wrap');
    keywordWraps.forEach(function (wrap) {
        var rect = null;
        wrap.addEventListener('mouseenter', function (e) {
            rect = wrap.getBoundingClientRect();
            var x = e.clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            wrap.style.setProperty('--mouse-x', x + 'px');
        });
        wrap.addEventListener('mousemove', function (e) {
            if (!rect) {
                rect = wrap.getBoundingClientRect();
            }
            var x = e.clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            wrap.style.setProperty('--mouse-x', x + 'px');
        });
        wrap.addEventListener('mouseleave', function () {
            rect = null;
        });
    });

    // Finder Modal Open/Close Logic
    var finderModal = document.getElementById('finder-modal');
    var finderTitle = document.getElementById('finder-window-title');
    var finderContent = document.getElementById('finder-window-content');
    var closeBtn = document.getElementById('finder-close-btn');
    var folderWrappers = document.querySelectorAll('.folder-wrapper');

    var folderData = {
        stats: {
            title: "Stats",
            html: '<div class="finder-stats-layout">' +
                '  <div class="finder-stats-sidebar">' +
                '    <button class="stats-sidebar-item active" data-tab="github" type="button">' +
                '      <img class="sidebar-tab-icon" src="assets/icons/social/github-outline.png" alt="GitHub">' +
                '      <span>GitHub Stats</span>' +
                '    </button>' +
                '    <button class="stats-sidebar-item" data-tab="leetcode" type="button">' +
                '      <img class="sidebar-tab-icon" src="assets/icons/social/leetcode-outline.png" alt="LeetCode">' +
                '      <span>LeetCode Stats</span>' +
                '    </button>' +
                '  </div>' +
                '  <div class="finder-stats-main">' +
                '    <div class="stats-tab-content active" id="stats-tab-github">' +
                '      <h4 class="stats-main-heading">GitHub Contributions</h4>' +
                '      <div class="stats-cards-container">' +
                '        <div class="stats-row">' +
                '          <div class="stats-card">' +
                '            <img class="gitpulse-card" data-card-type="total-contributions" src="" alt="Total Contributions">' +
                '          </div>' +
                '          <div class="stats-card">' +
                '            <img class="gitpulse-card" data-card-type="current-streak" src="" alt="Current Streak">' +
                '          </div>' +
                '        </div>' +
                '        <div class="stats-row">' +
                '          <div class="stats-card">' +
                '            <img class="gitpulse-card" data-card-type="longest-streak" src="" alt="Longest Streak">' +
                '          </div>' +
                '          <div class="stats-card">' +
                '            <img class="gitpulse-card" data-card-type="active-ratio" src="" alt="Active Days Ratio">' +
                '          </div>' +
                '        </div>' +
                '        <div class="stats-row">' +
                '          <div class="stats-card">' +
                '            <img class="gitpulse-card" data-card-type="prs-accepted" src="" alt="PRs Accepted">' +
                '          </div>' +
                '          <div class="stats-card">' +
                '            <img class="gitpulse-card" data-card-type="followers" src="" alt="Followers">' +
                '          </div>' +
                '        </div>' +
                '        <div class="stats-row">' +
                '          <div class="stats-card">' +
                '            <img class="gitpulse-card" data-card-type="public-repos" src="" alt="Public Repos">' +
                '          </div>' +
                '          <div class="stats-card">' +
                '            <img class="gitpulse-card" data-card-type="top-repo" src="" alt="Top Starred Repo">' +
                '          </div>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="stats-tab-content" id="stats-tab-leetcode">' +
                '      <h4 class="stats-main-heading">LeetCode Stats</h4>' +
                '      <div class="stats-cards-container">' +
                '        <div class="stats-card graph-card solved-card">' +
                '          <img class="gitpulse-leetcode-card" data-card-type="total-solved" src="" alt="Total Solved">' +
                '        </div>' +
                '        <div class="stats-row">' +
                '          <div class="stats-card">' +
                '            <img class="gitpulse-leetcode-card" data-card-type="contest-rating" src="" alt="Contest Rating">' +
                '          </div>' +
                '          <div class="stats-card">' +
                '            <img class="gitpulse-leetcode-card" data-card-type="max-streak" src="" alt="Max Streak">' +
                '          </div>' +
                '        </div>' +
                '        <div class="stats-row">' +
                '          <div class="stats-card">' +
                '            <img class="gitpulse-leetcode-card" data-card-type="reputation" src="" alt="Reputation">' +
                '          </div>' +
                '          <div class="stats-card">' +
                '            <img class="gitpulse-leetcode-card" data-card-type="views" src="" alt="Views">' +
                '          </div>' +
                '        </div>' +
                '        <div class="stats-row">' +
                '          <div class="stats-card" style="max-width: 320px;">' +
                '            <img class="gitpulse-leetcode-card" data-card-type="solutions" src="" alt="Solutions">' +
                '          </div>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>'
        },
        badges: {
            title: "Badges",
            html: '<div class="finder-badges-layout">' +
                '  <div class="finder-badges-sidebar">' +
                '    <button class="badges-sidebar-item active" data-tab="holopin" type="button">' +
                '      <svg class="sidebar-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; min-width: 16px; min-height: 16px;">' +
                '        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' +
                '      </svg>' +
                '      <span>Holopin Badges</span>' +
                '    </button>' +
                '    <button class="badges-sidebar-item" data-tab="github-badges" type="button">' +
                '      <img class="sidebar-tab-icon" src="assets/icons/social/github-outline.png" alt="GitHub">' +
                '      <span>GitHub Badges</span>' +
                '    </button>' +
                '    <button class="badges-sidebar-item" data-tab="hackerrank-badges" type="button">' +
                '      <img class="sidebar-tab-icon" src="assets/icons/social/hackerrank-outline.png" alt="HackerRank">' +
                '      <span>HackerRank Badges</span>' +
                '    </button>' +
                '    <button class="badges-sidebar-item" data-tab="leetcode-badges" type="button">' +
                '      <img class="sidebar-tab-icon" src="assets/icons/social/leetcode-outline.png" alt="LeetCode">' +
                '      <span>LeetCode Badges</span>' +
                '    </button>' +
                '  </div>' +
                '  <div class="finder-badges-main">' +
                '    <div class="badges-tab-content active" id="badges-tab-holopin">' +
                '      <h4 class="stats-main-heading">Holopin Badges</h4>' +
                '      <div class="stats-cards-container">' +
                '        <div class="stats-card graph-card skeleton">' +
                '          <a href="https://holopin.io/@mayurpagote" target="_blank" rel="noopener noreferrer" style="display: block; width: 100%;">' +
                '            <img class="holopin-board-img" src="https://holopin.io/api/user/board?user=mayurpagote" alt="Holopin Badges" style="opacity: 0; transition: opacity 0.3s ease;">' +
                '          </a>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="badges-tab-content" id="badges-tab-github-badges">' +
                '      <h4 class="stats-main-heading">GitHub Badges</h4>' +
                '      <div class="badge-grid">' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/github/pull-shark.png" alt="Pull Shark">' +
                '          <div class="badge-name">Pull Shark</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/github/yolo.png" alt="YOLO">' +
                '          <div class="badge-name">YOLO</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/github/quickdraw.png" alt="Quickdraw">' +
                '          <div class="badge-name">Quickdraw</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/github/starstruck.png" alt="Starstruck">' +
                '          <div class="badge-name">Starstruck</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/github/pair-extraordinaire.png" alt="Pair Extraordinaire">' +
                '          <div class="badge-name">Pair Extraordinaire</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/github/galaxy-brain.png" alt="Galaxy Brain">' +
                '          <div class="badge-name">Galaxy Brain</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/github/public-sponsor.png" alt="Public Sponsor">' +
                '          <div class="badge-name">Public Sponsor</div>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="badges-tab-content" id="badges-tab-hackerrank-badges">' +
                '      <h4 class="stats-main-heading">HackerRank Badges</h4>' +
                '      <div class="badge-grid">' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/hackerrank/problem-solving.svg" alt="Problem Solving">' +
                '          <div class="badge-name">Problem Solving</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/hackerrank/python.svg" alt="Python">' +
                '          <div class="badge-name">Python</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/hackerrank/cpp.svg" alt="C++">' +
                '          <div class="badge-name">C++</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/hackerrank/c-language.svg" alt="C Language">' +
                '          <div class="badge-name">C Language</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/hackerrank/java.svg" alt="Java">' +
                '          <div class="badge-name">Java</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/hackerrank/sql.svg" alt="SQL">' +
                '          <div class="badge-name">SQL</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/hackerrank/30-days-of-code.svg" alt="30 Days Of Code">' +
                '          <div class="badge-name">30 Days Of Code</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/hackerrank/ruby.svg" alt="Ruby">' +
                '          <div class="badge-name">Ruby</div>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="badges-tab-content" id="badges-tab-leetcode-badges">' +
                '      <h4 class="stats-main-heading">LeetCode Badges</h4>' +
                '      <div class="badge-grid">' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/leetcode/lg365.png" alt="365 Days Active">' +
                '          <div class="badge-name">365 Days Active</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/leetcode/lg200.png" alt="200 Days Active">' +
                '          <div class="badge-name">200 Days Active</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/leetcode/100-days.png" alt="100 Days Active">' +
                '          <div class="badge-name">100 Days Active</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/leetcode/50-days.png" alt="50 Days Active">' +
                '          <div class="badge-name">50 Days Active</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/leetcode/introduction-to-pandas.png" alt="Introduction to Pandas">' +
                '          <div class="badge-name">Introduction to Pandas</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/leetcode/lg25100.png" alt="100 Days Active (Annual)">' +
                '          <div class="badge-name">100 Days Active (Annual)</div>' +
                '        </div>' +
                '        <div class="badge-item">' +
                '          <img src="assets/badges/leetcode/lg2550.png" alt="50 Days Active (Annual)">' +
                '          <div class="badge-name">50 Days Active (Annual)</div>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>'
        },
        achievements: {
            title: "Certificate",
            html: '<div class="finder-badges-layout">' +
                '  <div class="finder-badges-sidebar">' +
                '    <button class="badges-sidebar-item active" data-tab="stanford-certs" type="button">' +
                '      <svg class="sidebar-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; min-width: 16px; min-height: 16px;">' +
                '        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>' +
                '        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>' +
                '      </svg>' +
                '      <span>Stanford</span>' +
                '    </button>' +
                '    <button class="badges-sidebar-item" data-tab="coursera-certs" type="button">' +
                '      <svg class="sidebar-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; min-width: 16px; min-height: 16px;">' +
                '        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>' +
                '        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' +
                '      </svg>' +
                '      <span>Coursera</span>' +
                '    </button>' +
                '    <button class="badges-sidebar-item" data-tab="datacamp-certs" type="button">' +
                '      <svg class="sidebar-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; min-width: 16px; min-height: 16px;">' +
                '        <polyline points="4 17 10 11 4 5"/>' +
                '        <line x1="12" y1="19" x2="20" y2="19"/>' +
                '      </svg>' +
                '      <span>DataCamp</span>' +
                '    </button>' +
                '    <button class="badges-sidebar-item" data-tab="hackerrank-certs" type="button">' +
                '      <img class="sidebar-tab-icon" src="assets/icons/social/hackerrank-outline.png" alt="HackerRank">' +
                '      <span>HackerRank</span>' +
                '    </button>' +
                '  </div>' +
                '  <div class="finder-badges-main">' +
                '    <div class="badges-tab-content active" id="badges-tab-stanford-certs">' +
                '      <h4 class="stats-main-heading">Stanford Certificates</h4>' +
                '      <div class="cert-grid">' +
                '        <a href="https://codeinplace.stanford.edu/cip5/certificate/vhubwi" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/stanford-code-in-place.png" alt="Code In Place">' +
                '          <div class="cert-name">Code In Place</div>' +
                '        </a>' +
                '      </div>' +
                '    </div>' +
                '    <div class="badges-tab-content" id="badges-tab-coursera-certs">' +
                '      <h4 class="stats-main-heading">Coursera Certificates</h4>' +
                '      <div class="cert-grid">' +
                '        <a href="https://www.coursera.org/account/accomplishments/specialization/99L4ZVJ78H3Z" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/docker-and-kubernetes-masterclass.png" alt="Docker and Kubernetes Masterclass">' +
                '          <div class="cert-name">Docker & K8s Masterclass</div>' +
                '        </a>' +
                '        <a href="https://www.coursera.org/account/accomplishments/specialization/XTLADEYQW89K" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/3d-printing-and-additive-manufacturing.png" alt="3D Printing and Additive Manufacturing">' +
                '          <div class="cert-name">3D Printing & Additive Manufacturing</div>' +
                '        </a>' +
                '        <a href="https://www.coursera.org/account/accomplishments/specialization/A734F3RVMRDV" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/professional-skills-for-the-workplace.png" alt="Professional Skills for the Workplace">' +
                '          <div class="cert-name">Professional Skills for the Workplace</div>' +
                '        </a>' +
                '        <a href="https://www.coursera.org/account/accomplishments/specialization/PR72N258N4D9" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/getting-started-with-google-workspace.png" alt="Getting started with Google Workspace">' +
                '          <div class="cert-name">Getting started with Google Workspace</div>' +
                '        </a>' +
                '        <a href="https://www.coursera.org/account/accomplishments/verify/XAK4SF2AVXBW" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/introduction-to-computing-systems.png" alt="Introduction to Computing Systems">' +
                '          <div class="cert-name">Introduction to Computing Systems</div>' +
                '        </a>' +
                '        <a href="https://www.coursera.org/account/accomplishments/verify/WOTL5GMH20LC" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/getting-started-with-git-and-github.png" alt="Getting Started with Git and GitHub">' +
                '          <div class="cert-name">Getting Started with Git & GitHub</div>' +
                '        </a>' +
                '        <a href="https://www.coursera.org/account/accomplishments/verify/TUMXV2SPAW7V" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/introduction-to-artificial-intelligence-ai.png" alt="Introduction to Artificial Intelligence (AI)">' +
                '          <div class="cert-name">Introduction to AI</div>' +
                '        </a>' +
                '        <a href="https://www.coursera.org/account/accomplishments/verify/KSP2NCC59XON" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/introduction-to-containers-docker-kubernetes-openshift.png" alt="Introduction to Containers w/ Docker, Kubernetes & OpenShift">' +
                '          <div class="cert-name">Containers, Docker, K8s & OpenShift</div>' +
                '        </a>' +
                '        <a href="https://www.coursera.org/account/accomplishments/verify/CHWMNHHL2UEM" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/innovation-through-design-think-make-break-repeat.png" alt="Innovation Through Design: Think, Make, Break, Repeat">' +
                '          <div class="cert-name">Innovation Through Design</div>' +
                '        </a>' +
                '      </div>' +
                '    </div>' +
                '    <div class="badges-tab-content" id="badges-tab-datacamp-certs">' +
                '      <h4 class="stats-main-heading">DataCamp Certificates</h4>' +
                '      <div class="cert-grid">' +
                '        <a href="https://www.datacamp.com/skill-verification/AIF0025987642620" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/ai-fundamentals.png" alt="AI Fundamentals">' +
                '          <div class="cert-name">AI Fundamentals</div>' +
                '        </a>' +
                '        <a href="https://www.datacamp.com/completed/statement-of-accomplishment/course/37e863a5e1050b8c3982d7156395e210195cb800" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/introduction-to-sql.png" alt="Introduction to SQL">' +
                '          <div class="cert-name">Introduction to SQL</div>' +
                '        </a>' +
                '        <a href="https://www.datacamp.com/completed/statement-of-accomplishment/course/18f2e453e19a28a846318208e75a13011aa0ce60" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/introduction-to-data.png" alt="Introduction to Data">' +
                '          <div class="cert-name">Introduction to Data</div>' +
                '        </a>' +
                '      </div>' +
                '    </div>' +
                '    <div class="badges-tab-content" id="badges-tab-hackerrank-certs">' +
                '      <h4 class="stats-main-heading">HackerRank Certificates</h4>' +
                '      <div class="cert-grid">' +
                '        <a href="https://www.hackerrank.com/certificates/be5250f6a5a8" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/python-basic.png" alt="Python (Basic) Certificate">' +
                '          <div class="cert-name">Python (Basic)</div>' +
                '        </a>' +
                '        <a href="https://www.hackerrank.com/certificates/746a4fe19571" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/problem-solving-basic.png" alt="Problem Solving (Basic) Certificate">' +
                '          <div class="cert-name">Problem Solving (Basic)</div>' +
                '        </a>' +
                '        <a href="https://www.hackerrank.com/certificates/4b499990ddf2" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/sql-basic.png" alt="SQL (Basic) Certificate">' +
                '          <div class="cert-name">SQL (Basic)</div>' +
                '        </a>' +
                '        <a href="https://www.hackerrank.com/certificates/7adc3e876bfa" target="_blank" rel="noopener noreferrer" class="cert-item">' +
                '          <img src="assets/certificates/sql-intermediate.png" alt="SQL (Intermediate) Certificate">' +
                '          <div class="cert-name">SQL (Intermediate)</div>' +
                '        </a>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>'
        },
        hobbies: {
            title: "I use",
            html: '<div class="finder-iuse-layout">' +
                '  <div class="iuse-grid">' +
                '    <div class="iuse-card">' +
                '      <h3 class="iuse-card-title">Development Tools</h3>' +
                '      <div class="iuse-items">' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/github-mono.png" class="iuse-outline-logo" alt="GitHub">' +
                '          <span>GitHub</span>' +
                '        </div>' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/vscode.png" alt="VS Code">' +
                '          <span>VS Code</span>' +
                '        </div>' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/pycharm.png" alt="PyCharm">' +
                '          <span>PyCharm</span>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="iuse-card">' +
                '      <h3 class="iuse-card-title">Languages</h3>' +
                '      <div class="iuse-items">' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/python.png" alt="Python">' +
                '          <span>Python</span>' +
                '        </div>' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/cpp.png" alt="C++">' +
                '          <span>C++</span>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="iuse-card">' +
                '      <h3 class="iuse-card-title">SQLs & Databases</h3>' +
                '      <div class="iuse-items">' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/mysql.png" alt="MySQL">' +
                '          <span>MySQL</span>' +
                '        </div>' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/oracle-sql.png" alt="Oracle SQL">' +
                '          <span>Oracle SQL</span>' +
                '        </div>' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/mongodb.png" alt="MongoDB">' +
                '          <span>MongoDB</span>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="iuse-card">' +
                '      <h3 class="iuse-card-title">Cloud Tools</h3>' +
                '      <div class="iuse-items">' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/docker.png" alt="Docker">' +
                '          <span>Docker</span>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="iuse-card">' +
                '      <h3 class="iuse-card-title">Operating Systems</h3>' +
                '      <div class="iuse-items">' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/windows.png" alt="Windows">' +
                '          <span>Windows</span>' +
                '        </div>' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/android.png" alt="Android">' +
                '          <span>Android</span>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="iuse-card">' +
                '      <h3 class="iuse-card-title">Learning Platforms</h3>' +
                '      <div class="iuse-items">' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/coursera.png" alt="Coursera">' +
                '          <span>Coursera</span>' +
                '        </div>' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/datacamp.png" alt="DataCamp">' +
                '          <span>DataCamp</span>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="iuse-card">' +
                '      <h3 class="iuse-card-title">AI Tools</h3>' +
                '      <div class="iuse-items">' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/claude.png" alt="Claude">' +
                '          <span>Claude</span>' +
                '        </div>' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/codex.png" class="iuse-outline-logo" alt="Codex">' +
                '          <span>Codex</span>' +
                '        </div>' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/antigravity.png" alt="Antigravity">' +
                '          <span>Antigravity</span>' +
                '        </div>' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/tech/openai.png" class="iuse-invert-light" alt="ChatGPT">' +
                '          <span>ChatGPT</span>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="iuse-card">' +
                '      <h3 class="iuse-card-title">Problem Practice</h3>' +
                '      <div class="iuse-items">' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/social/leetcode-color.png" alt="LeetCode">' +
                '          <span>LeetCode</span>' +
                '        </div>' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/social/codechef-color.png" alt="CodeChef">' +
                '          <span>CodeChef</span>' +
                '        </div>' +
                '        <div class="iuse-item">' +
                '          <img src="assets/icons/social/hackerrank-color.png" alt="HackerRank">' +
                '          <span>HackerRank</span>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>'
        },
        "system-info": {
            title: "System Info",
            html: '<div class="finder-stats-layout">' +
                '  <div class="finder-stats-sidebar">' +
                '    <button class="stats-sidebar-item active" data-tab="sys1" type="button">' +
                '      <svg class="sidebar-tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
                '        <rect x="2" y="4" width="20" height="14" rx="2" ry="2"></rect>' +
                '        <line x1="2" y1="20" x2="22" y2="20"></line>' +
                '        <line x1="12" y1="18" x2="12" y2="20"></line>' +
                '      </svg>' +
                '      <span>Acer Swift 3</span>' +
                '    </button>' +
                '    <button class="stats-sidebar-item" data-tab="sys2" type="button">' +
                '      <svg class="sidebar-tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
                '        <rect x="2" y="4" width="20" height="14" rx="2" ry="2"></rect>' +
                '        <line x1="2" y1="20" x2="22" y2="20"></line>' +
                '        <line x1="12" y1="18" x2="12" y2="20"></line>' +
                '      </svg>' +
                '      <span>HP Pavilion</span>' +
                '    </button>' +
                '    <button class="stats-sidebar-item" data-tab="sys3" type="button">' +
                '      <svg class="sidebar-tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
                '        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>' +
                '        <line x1="12" y1="18" x2="12.01" y2="18"></line>' +
                '      </svg>' +
                '      <span>OnePlus Nord 2</span>' +
                '    </button>' +
                '    <button class="stats-sidebar-item" data-tab="sys4" type="button">' +
                '      <svg class="sidebar-tab-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
                '        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>' +
                '        <line x1="12" y1="18" x2="12.01" y2="18"></line>' +
                '      </svg>' +
                '      <span>OnePlus Pad 2</span>' +
                '    </button>' +
                '  </div>' +
                '  <div class="finder-stats-main">' +
                '    <div class="stats-tab-content active" id="stats-tab-sys1">' +
                '      <h4 class="stats-main-heading">Acer Swift 3 OLED</h4>' +
                '      <div class="stats-cards-container">' +
                '        <div class="sys-info-card">' +
                '          <div class="sys-info-row"><span class="sys-info-label">Device Type</span><span class="sys-info-value">Ultrabook</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Processor</span><span class="sys-info-value">Intel Core i5-12500H</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Graphics</span><span class="sys-info-value">Intel Iris Xe</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Display</span><span class="sys-info-value">14" 2.8K (2880×1800) OLED, 90Hz, 16:10</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">RAM</span><span class="sys-info-value">16GB LPDDR5</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Storage</span><span class="sys-info-value">512GB NVME SSD</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Battery</span><span class="sys-info-value">~56Wh</span></div>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="stats-tab-content" id="stats-tab-sys2">' +
                '      <h4 class="stats-main-heading">HP Pavillion Gaming 16</h4>' +
                '      <div class="stats-cards-container">' +
                '        <div class="sys-info-card">' +
                '          <div class="sys-info-row"><span class="sys-info-label">Device Type</span><span class="sys-info-value">Gaming Laptop</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Processor</span><span class="sys-info-value">Intel Core i7-10870H</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Graphics</span><span class="sys-info-value">NVIDIA GeForce GTX 1650 Ti 4GB</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Display</span><span class="sys-info-value">16.1" Full HD IPS, 144Hz</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">RAM</span><span class="sys-info-value">16GB DDR4</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Storage</span><span class="sys-info-value">256 GB NVME SSD + 1tb HDD</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Battery</span><span class="sys-info-value">~52.5Wh</span></div>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="stats-tab-content" id="stats-tab-sys3">' +
                '      <h4 class="stats-main-heading">OnePlus Nord 2</h4>' +
                '      <div class="stats-cards-container">' +
                '        <div class="sys-info-card">' +
                '          <div class="sys-info-row"><span class="sys-info-label">Device Type</span><span class="sys-info-value">Smartphone</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Processor</span><span class="sys-info-value">MediaTek Dimensity 1200-AI</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Graphics</span><span class="sys-info-value">Mali-G77 MC9</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Display</span><span class="sys-info-value">6.43" AMOLED, 2400×1080, 90Hz</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">RAM</span><span class="sys-info-value">8GB LPDDR4X</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Storage</span><span class="sys-info-value">128 GB UFS 3.1</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Battery</span><span class="sys-info-value">4500mAh</span></div>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '    <div class="stats-tab-content" id="stats-tab-sys4">' +
                '      <h4 class="stats-main-heading">OnePlus Pad 2</h4>' +
                '      <div class="stats-cards-container">' +
                '        <div class="sys-info-card">' +
                '          <div class="sys-info-row"><span class="sys-info-label">Device Type</span><span class="sys-info-value">Android Tablet</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Processor</span><span class="sys-info-value">Qualcomm Snapdragon 8 Gen 3</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Graphics</span><span class="sys-info-value">Adreno 750</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Display</span><span class="sys-info-value">12.1" LCD, 3000×2120 (3K), 144Hz</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">RAM</span><span class="sys-info-value">8GB LPDDR5X</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Storage</span><span class="sys-info-value">128 GB UFS 3.1</span></div>' +
                '          <div class="sys-info-row"><span class="sys-info-label">Battery</span><span class="sys-info-value">9510mAh</span></div>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>'
        }
    };

    function initStatsTabs() {
        var tabButtons = document.querySelectorAll('.stats-sidebar-item');
        var tabContents = document.querySelectorAll('.stats-tab-content');
        var mainContent = document.querySelector('.finder-stats-main');

        if (!mainContent) return;

        var isScrolling = false;

        tabButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var targetTab = btn.getAttribute('data-tab');
                var targetEl = document.getElementById('stats-tab-' + targetTab);
                if (targetEl) {
                    isScrolling = true;
                    tabButtons.forEach(function (b) {
                        b.classList.toggle('active', b === btn);
                    });

                    mainContent.scrollTo({
                        top: targetEl.offsetTop - 12,
                        behavior: 'smooth'
                    });

                    var checkScrollEnd = setInterval(function () {
                        if (Math.abs(mainContent.scrollTop - (targetEl.offsetTop - 12)) < 3 || mainContent.scrollTop + mainContent.clientHeight >= mainContent.scrollHeight - 3) {
                            isScrolling = false;
                            clearInterval(checkScrollEnd);
                        }
                    }, 50);

                    setTimeout(function () {
                        isScrolling = false;
                        clearInterval(checkScrollEnd);
                    }, 800);
                }
            });
        });

        mainContent.addEventListener('scroll', function () {
            if (isScrolling) return;

            var activeTab = '';
            var containerTop = mainContent.scrollTop;

            tabContents.forEach(function (section) {
                var sectionTop = section.offsetTop;
                if (containerTop >= sectionTop - 60) {
                    activeTab = section.id.replace('stats-tab-', '');
                }
            });

            // Check if we are scrolled to the bottom to activate the last tab
            if (mainContent.scrollTop + mainContent.clientHeight >= mainContent.scrollHeight - 10 && tabContents.length > 0) {
                activeTab = tabContents[tabContents.length - 1].id.replace('stats-tab-', '');
            } else if (containerTop < 10 && tabContents.length > 0) {
                activeTab = tabContents[0].id.replace('stats-tab-', '');
            }

            if (activeTab) {
                tabButtons.forEach(function (b) {
                    var tabAttr = b.getAttribute('data-tab');
                    var isActive = tabAttr === activeTab;
                    b.classList.toggle('active', isActive);
                    if (isActive) {
                        b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                });
            }
        }, { passive: true });
    }

    function initBadgesTabs() {
        var tabButtons = document.querySelectorAll('.badges-sidebar-item');
        var tabContents = document.querySelectorAll('.badges-tab-content');
        var mainContent = document.querySelector('.finder-badges-main');

        if (!mainContent) return;

        var holopinImg = document.querySelector('.holopin-board-img');
        if (holopinImg) {
            var parent = holopinImg.closest('.stats-card');
            if (parent) {
                var handleLoad = function () {
                    parent.classList.remove('skeleton');
                    holopinImg.style.opacity = '1';
                };
                if (holopinImg.complete) {
                    handleLoad();
                } else {
                    holopinImg.onload = handleLoad;
                    holopinImg.onerror = handleLoad;
                }
            }
        }

        var isScrolling = false;

        tabButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var targetTab = btn.getAttribute('data-tab');
                var targetEl = document.getElementById('badges-tab-' + targetTab);
                if (targetEl) {
                    isScrolling = true;
                    tabButtons.forEach(function (b) {
                        b.classList.toggle('active', b === btn);
                    });

                    mainContent.scrollTo({
                        top: targetEl.offsetTop - 12,
                        behavior: 'smooth'
                    });

                    var checkScrollEnd = setInterval(function () {
                        if (Math.abs(mainContent.scrollTop - (targetEl.offsetTop - 12)) < 3 || mainContent.scrollTop + mainContent.clientHeight >= mainContent.scrollHeight - 3) {
                            isScrolling = false;
                            clearInterval(checkScrollEnd);
                        }
                    }, 50);

                    setTimeout(function () {
                        isScrolling = false;
                        clearInterval(checkScrollEnd);
                    }, 800);
                }
            });
        });

        mainContent.addEventListener('scroll', function () {
            if (isScrolling) return;

            var activeTab = '';
            var containerTop = mainContent.scrollTop;

            tabContents.forEach(function (section) {
                var sectionTop = section.offsetTop;
                if (containerTop >= sectionTop - 60) {
                    activeTab = section.id.replace('badges-tab-', '');
                }
            });

            // Check if we are scrolled to the bottom to activate the last tab
            if (mainContent.scrollTop + mainContent.clientHeight >= mainContent.scrollHeight - 10 && tabContents.length > 0) {
                activeTab = tabContents[tabContents.length - 1].id.replace('badges-tab-', '');
            } else if (containerTop < 10 && tabContents.length > 0) {
                activeTab = tabContents[0].id.replace('badges-tab-', '');
            }

            if (activeTab) {
                tabButtons.forEach(function (b) {
                    var tabAttr = b.getAttribute('data-tab');
                    var isActive = tabAttr === activeTab;
                    b.classList.toggle('active', isActive);
                    if (isActive) {
                        b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                });
            }
        }, { passive: true });
    }

    function updateStatsCardsTheme(theme) {
        var cardTheme = (theme === 'dark') ? 'dark' : 'light';

        // 1. Update GitHub Iframe
        var iframe = document.getElementById('gitpulse-github-iframe');
        if (iframe) {
            var newIframeSrc = 'https://gitpulse-sable.vercel.app/?user=Mayur-Pagote&theme=' + cardTheme + '&embed=true';
            if (iframe.getAttribute('src') !== newIframeSrc) {
                iframe.setAttribute('src', newIframeSrc);
            }
        }

        // 2. Update GitHub SVG Cards
        var ghCards = document.querySelectorAll('.gitpulse-card');
        ghCards.forEach(function (card) {
            var cardType = card.getAttribute('data-card-type');
            var newSrc = 'https://gitpulse-sable.vercel.app/api/svg/Mayur-Pagote/card/' + cardType + '?theme=' + cardTheme + '&year=' + new Date().getFullYear();
            if (card.getAttribute('src') !== newSrc) {
                var parent = card.closest('.stats-card');
                if (parent) {
                    parent.classList.add('skeleton');
                }
                card.style.opacity = '0';

                var handleLoad = function () {
                    if (parent) parent.classList.remove('skeleton');
                    card.style.opacity = '1';
                };

                card.onload = handleLoad;
                card.onerror = handleLoad;

                card.setAttribute('src', newSrc);

                if (card.complete) {
                    handleLoad();
                }
            }
        });

        // 3. Update LeetCode SVG Cards
        var lcCards = document.querySelectorAll('.gitpulse-leetcode-card');
        lcCards.forEach(function (card) {
            var cardType = card.getAttribute('data-card-type');
            var newSrc = 'https://gitpulse-sable.vercel.app/api/leetcode/svg/mayurpagote/card/' + cardType + '?theme=' + cardTheme + '&year=' + new Date().getFullYear();
            if (card.getAttribute('src') !== newSrc) {
                var parent = card.closest('.stats-card');
                if (parent) {
                    parent.classList.add('skeleton');
                }
                card.style.opacity = '0';

                var handleLoad = function () {
                    if (parent) parent.classList.remove('skeleton');
                    card.style.opacity = '1';
                };

                card.onload = handleLoad;
                card.onerror = handleLoad;

                card.setAttribute('src', newSrc);

                if (card.complete) {
                    handleLoad();
                }
            }
        });
    }

    function openFolder(folderKey) {
        var data = folderData[folderKey];
        if (!data || !finderModal || !finderTitle || !finderContent) return;

        finderTitle.textContent = data.title;
        finderContent.innerHTML = data.html;
        finderModal.hidden = false;
        document.body.style.overflow = 'hidden';
        if (lenis) {
            lenis.stop();
        }

        if (folderKey === 'stats' || folderKey === 'system-info') {
            initStatsTabs();
            if (folderKey === 'stats') {
                var currentTheme = document.body.getAttribute('data-theme') || 'dark';
                updateStatsCardsTheme(currentTheme);
            }
        }

        if (folderKey === 'badges' || folderKey === 'achievements') {
            initBadgesTabs();
        }
    }

    function closeFolder() {
        if (!finderModal) return;
        finderModal.hidden = true;
        document.body.style.overflow = '';
        if (lenis) {
            lenis.start();
        }
    }

    if (folderWrappers) {
        folderWrappers.forEach(function (wrapper) {
            wrapper.addEventListener('click', function () {
                var folderKey = wrapper.getAttribute('data-folder');
                openFolder(folderKey);
            });
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeFolder);
    }

    if (finderModal) {
        finderModal.addEventListener('click', function (e) {
            if (e.target === finderModal) {
                closeFolder();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeFolder();
            }
        });
    }

    // ── Riddle Game Logic inside Projects Card ──
    var ALL_RIDDLES = [
        {
            cat: 'CLASSIC',
            q: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind.',
            a: 'ECHO', alt: '',
            hints: ['I happen in mountains and deep caves.', 'You shout — and I return your own voice to you.', 'Rhymes with gecko, minus the G.'],
            fact: 'Echoes need a reflective surface at least 17 metres away to sound distinct from the original sound.'
        },
        {
            cat: 'MYSTERY',
            q: 'I have hands but cannot clap.',
            a: 'CLOCK', alt: 'WATCH',
            hints: ['I tell you something useful every single second.', 'My hands move — but I have no arms.', 'I tick and tock through every hour of the day.'],
            fact: 'The word "clockwise" exists because early mechanical clocks mimicked the movement of sundial shadows.'
        },
        {
            cat: 'WORD PLAY',
            q: 'Light as a feather, yet no person alive can hold me for more than five minutes.',
            a: 'BREATH', alt: '',
            hints: ['You do this automatically thousands of times each day.', 'Babies cry to take their very first one.', 'Divers desperately try to hold me underwater.'],
            fact: 'On average, a human takes about 20,000 breaths per day — roughly 600 million over an entire lifetime.'
        },
        {
            cat: 'CLASSIC',
            q: 'I have teeth but cannot bite.',
            a: 'COMB', alt: '',
            hints: ['I help you look presentable each morning.', 'Run me slowly through your hair.', 'My teeth are fine and close together.'],
            fact: 'The oldest known combs date back over 5,000 years to ancient Persia and Egypt, carved from bone and ivory.'
        },
        {
            cat: 'ANCIENT',
            q: 'I have an eye but cannot see.',
            a: 'NEEDLE', alt: '',
            hints: ['Thread passes through my eye.', 'I am essential for sewing and stitching.', 'I am thin, sharp, and pointed at one end.'],
            fact: 'The earliest known needles were carved from bone and date back approximately 60,000 years.'
        },
        {
            cat: 'HISTORY',
            q: 'I have a head and a tail, but no body.',
            a: 'COIN', alt: '',
            hints: ['Flip me to decide your fate.', 'I live in your pocket or purse.', 'I am used as currency.'],
            fact: 'The first coins were minted in Lydia (modern-day Turkey) around 600 BCE.'
        },
        {
            cat: 'PARADOX',
            q: 'I am always in front of you, yet I can never be seen.',
            a: 'FUTURE', alt: '',
            hints: ['It simply has not happened yet.', 'Time holds all the answers — just not yet.', 'Yesterday had one. Today has one too.'],
            fact: 'The concept of a strictly linear "future" is relatively modern. Many ancient cultures viewed time as cyclical.'
        },
        {
            cat: 'TECH',
            q: 'I have keys but no locks. I have space but no room. You can enter, but you can never go inside.',
            a: 'KEYBOARD', alt: '',
            hints: ['You use me to type every word you write.', 'Found on every desk and laptop in the world.', 'My keys include letters, numbers, and symbols.'],
            fact: 'The QWERTY layout was designed in 1873 to slow typists down and prevent typewriter jams.'
        },
        {
            cat: 'HISTORY',
            q: 'I can travel around the world while staying in a corner.',
            a: 'STAMP', alt: '',
            hints: ['I belong on an envelope.', 'I help letters reach their destination.', 'I am small, adhesive, and collected by hobbyists.'],
            fact: 'The world\'s first postage stamp — the Penny Black — was issued in Britain in 1840.'
        },
        {
            cat: 'NATURE',
            q: 'The more you take away from me, the bigger I become.',
            a: 'HOLE', alt: '',
            hints: ['Dig into the earth to make me larger.', 'I am a gap or an opening in something solid.', 'A donut has exactly one of me.'],
            fact: 'Black holes are not actually holes — they are regions of spacetime where gravity is immense.'
        },
        {
            cat: 'ELEMENTS',
            q: 'I am not alive, but I can grow. I have no lungs, but I need air. Water is my greatest enemy.',
            a: 'FIRE', alt: '',
            hints: ['Prometheus stole me for humanity.', 'I dance and flicker without any legs.', 'I produce heat and light.'],
            fact: 'Fire is not a physical object. It is a rapid chemical oxidation process — an event, not matter.'
        },
        {
            cat: 'NATURE',
            q: 'I run but never walk. I have a mouth but never talk. I have a bed but never sleep.',
            a: 'RIVER', alt: '',
            hints: ['I am flowing endlessly downhill.', 'Fish live and swim inside me.', 'I flow from mountains down to the sea.'],
            fact: 'The Amazon River alone discharges roughly 20% of all fresh water that flows into the oceans.'
        },
        {
            cat: 'WORD PLAY',
            q: 'You can catch me, but you can never throw me.',
            a: 'COLD', alt: '',
            hints: ['A common illness that strikes in winter.', 'It makes you sneeze and sniffle.', 'You "catch" me from others.'],
            fact: 'The common cold is caused by over 200 different viruses.'
        },
        {
            cat: 'LOGIC',
            q: 'I have branches, but no fruit, trunk, or leaves.',
            a: 'BANK', alt: '',
            hints: ['You keep your money somewhere safe.', 'I have many branches in every city.', 'I deal in loans, deposits, and accounts.'],
            fact: 'The word "bank" comes from the Italian "banca," meaning bench.'
        },
        {
            cat: 'CLASSIC',
            q: 'I allow you to look right through a solid wall.',
            a: 'WINDOW', alt: '',
            hints: ['Found in every house and office.', 'You look outside through me.', 'I am made of glass set into a frame.'],
            fact: 'In medieval England, glass windows were so luxurious they were taxed (the "Window Tax").'
        },
        {
            cat: 'PARADOX',
            q: 'I only go up. I never, ever come down.',
            a: 'AGE', alt: '',
            hints: ['It increases every year on a special day.', 'The older you get, the more of me you carry.', 'You cannot reverse me.'],
            fact: 'The oldest verified human to ever live reached the age of 122 years and 164 days.'
        },
        {
            cat: 'PARADOX',
            q: 'I am always coming, but I never arrive.',
            a: 'TOMORROW', alt: '',
            hints: ['It is always the very next day.', 'Yesterday\'s future — today\'s constant anticipation.', 'I remain just ahead of you.'],
            fact: 'Ancient texts reference the human tendency to "wait until tomorrow." Procrastination is timeless.'
        },
        {
            cat: 'ANCIENT',
            q: 'I have a spine, but I am not alive and I have no bones.',
            a: 'BOOK', alt: '',
            hints: ['You read me for knowledge or pleasure.', 'Libraries are filled with me.', 'My pages hold words and stories.'],
            fact: 'The Gutenberg Bible was the first book ever printed with movable metal type, around 1455.'
        },
        {
            cat: 'NATURE',
            q: 'Full of holes, yet I hold water perfectly well.',
            a: 'SPONGE', alt: '',
            hints: ['Used to clean dishes and surfaces.', 'I absorb liquid with remarkable ease.', 'Sea creatures of my kind have lived for 600 million years.'],
            fact: 'Natural sea sponges have no brain, no nervous system, and no organs.'
        },
        {
            cat: 'WORD PLAY',
            q: 'I begin with T, I end with T, and I have T in the middle.',
            a: 'TEAPOT', alt: '',
            hints: ['I am used to brew a hot drink.', 'A staple of the British afternoon.', 'Think about the letter hidden in the clue itself.'],
            fact: 'Britain consumes an estimated 100 million cups of tea per day.'
        },
        {
            cat: 'MYSTERY',
            q: 'I shave every single day, yet my beard stays exactly the same.',
            a: 'BARBER', alt: '',
            hints: ['I work with scissors, clippers, and a razor.', 'People come to me for haircuts and grooming.', 'It is other people\'s hair I cut — not my own.'],
            fact: 'The barber\'s red-and-white striped pole symbolises blood and bandages. For centuries, barbers also performed minor surgical procedures.'
        },
        {
            cat: 'ANCIENT',
            q: 'I am tall when I am young, and short when I am old.',
            a: 'CANDLE', alt: '',
            hints: ['I provide light in the darkness.', 'I melt slowly as I burn down.', 'I am made of wax with a wick at my centre.'],
            fact: 'Candles were first used around 3,000 BCE in ancient Egypt, made from tallow — rendered animal fat — wrapped around a plant-fibre wick.'
        },
        {
            cat: 'LOGIC',
            q: 'I have cities with no houses, forests with no trees, and water with no fish.',
            a: 'MAP', alt: '',
            hints: ['I help travellers find their way.', 'I represent the real world on a flat surface.', 'I existed long before GPS and smartphones were invented.'],
            fact: 'The world\'s oldest surviving map is a clay Babylonian tablet from around 600 BCE, depicting the world as a flat disc surrounded by ocean.'
        },
        {
            cat: 'WORD PLAY',
            q: 'I can be cracked, made, told, and played.',
            a: 'JOKE', alt: '',
            hints: ['It makes people laugh out loud.', 'Comedians tell many of these every night on stage.', 'A punchline is always the final part of me.'],
            fact: 'The world\'s oldest recorded joke dates to 1900 BCE in ancient Sumer. True to form, it was about bodily functions.'
        },
        {
            cat: 'BODY',
            q: 'I taste better than I smell.',
            a: 'TONGUE', alt: '',
            hints: ['Found entirely inside your mouth.', 'I help you speak clearly and taste all your food.', 'I am a muscle attached at only one end.'],
            fact: 'The tongue is made up of 8 separate muscles, not just one — making it the only muscle in the human body that is attached at just one end.'
        }
    ];

    var r_totalRiddles = 5;
    var r_maxGuesses = 6;
    var r_selectedRiddles = [];
    var r_state = {
        lvl: 0,
        score: 0,
        totalStars: 0,
        hintCount: 0,
        wrongs: 0,
        gLeft: r_maxGuesses,
        answered: false
    };

    var r_el = function (id) { return document.getElementById(id); };

    function r_showScreen(id) {
        var screens = ['r-home', 'r-play', 'r-win', 'r-end'];
        screens.forEach(function (sId) {
            var screenEl = r_el(sId);
            if (screenEl) {
                if (sId === id) {
                    screenEl.classList.add('r-active');
                } else {
                    if (id !== 'r-win' || sId !== 'r-play') {
                        screenEl.classList.remove('r-active');
                    }
                }
            }
        });
    }

    var r_twTimer = null;
    function r_typeWrite(text) {
        if (r_twTimer) clearInterval(r_twTimer);
        var target = r_el('r-question-txt');
        if (!target) return;
        target.innerHTML = '';
        var i = 0;
        var cursor = '<span class="riddle-cursor">|</span>';
        r_twTimer = setInterval(function () {
            if (i < text.length) {
                target.innerHTML = text.slice(0, ++i) + cursor;
            } else {
                target.innerHTML = text;
                clearInterval(r_twTimer);
            }
        }, 20);
    }

    function r_sound(t) {
        try {
            var ctx = new (window.AudioContext || window.webkitAudioContext)();
            var o = ctx.createOscillator();
            var g = ctx.createGain();
            o.connect(g); g.connect(ctx.destination);
            var P = {
                ok: [660, 0.08, 'sine'],
                bad: [160, 0.08, 'sawtooth'],
                hint: [440, 0.06, 'sine'],
                up: [600, 0.10, 'sine'],
                tap: [500, 0.03, 'square'],
                win: [700, 0.12, 'sine']
            };
            var params = P[t] || P.tap;
            var f = params[0], v = params[1], w = params[2];
            o.type = w;
            o.frequency.setValueAtTime(f, ctx.currentTime);
            g.gain.setValueAtTime(v, ctx.currentTime);
            if (['ok', 'up', 'win'].includes(t)) {
                o.frequency.setValueAtTime(f * 1.2, ctx.currentTime + 0.10);
                o.frequency.setValueAtTime(f * 1.45, ctx.currentTime + 0.22);
                o.frequency.setValueAtTime(f * 1.85, ctx.currentTime + 0.35);
                g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
                o.start(); o.stop(ctx.currentTime + 0.55);
            } else {
                g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.26);
                o.start(); o.stop(ctx.currentTime + 0.26);
            }
        } catch (_) { }
    }

    function r_strSim(a, b) {
        a = a.toLowerCase(); b = b.toLowerCase();
        if (a === b) return 1;
        var long = a.length > b.length ? a : b;
        var short = a.length > b.length ? b : a;
        if (!long.length) return 1;
        var m = 0;
        for (var i = 0; i < short.length; i++) {
            if (long.indexOf(short[i]) !== -1) m++;
        }
        return m / long.length;
    }

    function r_starsCalc(hintCount, wrongs) {
        return Math.max(1, 3 - hintCount - Math.floor(wrongs / 2));
    }

    function r_starsStr(n) {
        return '★'.repeat(n) + '☆'.repeat(3 - n);
    }

    function r_refreshHudStars() {
        if (r_state.answered) return;
        var n = r_starsCalc(r_state.hintCount, r_state.wrongs);
        var starsEl = r_el('r-hud-stars');
        if (starsEl) starsEl.textContent = r_starsStr(n);
    }

    function r_buildDots() {
        var c = r_el('r-prog-dots');
        if (!c) return;
        c.innerHTML = '';
        for (var i = 0; i < r_totalRiddles; i++) {
            var d = document.createElement('div');
            d.className = 'r-pdot' + (i < r_state.lvl ? ' done' : i === r_state.lvl ? ' now' : '');
            c.appendChild(d);
        }
    }

    function r_buildGuessDots() {
        var row = r_el('r-guess-row');
        if (!row) return;
        row.innerHTML = '<span class="r-guess-lbl">Guesses</span>';
        for (var i = 0; i < r_maxGuesses; i++) {
            var d = document.createElement('div');
            var cls = 'r-dot';
            if (i >= r_state.gLeft) cls += ' gone';
            if (r_state.gLeft === 1 && i === 0) cls += ' last';
            d.className = cls;
            row.appendChild(d);
        }
    }

    function r_buildBoxes(n) {
        var c = r_el('r-boxes');
        if (!c) return;
        c.innerHTML = '';
        for (var i = 0; i < n; i++) {
            var b = document.createElement('input');
            b.type = 'text'; b.maxLength = 1;
            b.className = 'r-box'; b.dataset.i = i;
            b.autocomplete = 'off'; b.spellcheck = false;
            b.addEventListener('input', r_onInput);
            b.addEventListener('keydown', r_onKey);
            b.addEventListener('focus', function () { this.select(); });
            c.appendChild(b);
        }

    }

    function r_allBoxes() { return Array.from(document.querySelectorAll('.r-box')); }
    function r_typedWord() { return r_allBoxes().map(function (b) { return b.value.toUpperCase(); }).join(''); }

    function r_onInput(e) {
        if (r_state.answered) return;
        var b = e.target;
        var v = b.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
        b.value = v ? v[v.length - 1] : '';
        if (b.value) {
            var i = parseInt(b.dataset.i), all = r_allBoxes();
            if (i < all.length - 1) all[i + 1].focus();
        }
        r_sound('tap');
    }

    function r_onKey(e) {
        if (r_state.answered) return;
        var b = e.target, i = parseInt(b.dataset.i), all = r_allBoxes();
        if (e.key === 'Backspace') {
            if (b.value === '') { if (i > 0) { all[i - 1].value = ''; all[i - 1].focus(); } }
            else { b.value = ''; }
            e.preventDefault();
        } else if (e.key === 'Enter') { r_checkAnswer(); }
        else if (e.key === 'ArrowLeft' && i > 0) { all[i - 1].focus(); e.preventDefault(); }
        else if (e.key === 'ArrowRight' && i < all.length - 1) { all[i + 1].focus(); e.preventDefault(); }
    }

    function r_loadRiddle(idx) {
        r_state.hintCount = 0; r_state.wrongs = 0; r_state.answered = false;
        r_state.gLeft = r_maxGuesses;

        var r = r_selectedRiddles[idx];

        r_el('r-hud-lv').textContent = (idx + 1) + '/' + r_totalRiddles;
        r_el('r-hud-score').textContent = String(r_state.score).padStart(4, '0');
        r_el('r-hud-stars').textContent = '★★★';
        r_el('r-cat-badge').textContent = r.cat;

        // Calculate max answer length considering alternatives
        var maxLen = r.a.length;
        var alts = (r.alt || '').split('|').map(function (s) { return s.trim(); }).filter(Boolean);
        alts.forEach(function (alt) {
            if (alt.length > maxLen) {
                maxLen = alt.length;
            }
        });

        var wordLenText = r.a.length + ' letter' + (r.a.length !== 1 ? 's' : '');
        if (maxLen > r.a.length) {
            wordLenText = r.a.length + ' or ' + maxLen + ' letters';
        }
        r_el('r-word-len').textContent = wordLenText;

        var fb = r_el('r-feedback');
        fb.textContent = '';
        fb.className = 'r-feedback';

        r_el('r-hint-area').innerHTML = '';
        r_el('r-hint-badge').textContent = r.hints.length;
        r_el('r-btn-hint').disabled = false;

        r_buildDots();
        r_buildBoxes(maxLen);
        r_buildGuessDots();
        r_typeWrite(r.q);

        r_showScreen('r-play');
        setTimeout(function () { var f = document.querySelector('.r-box'); if (f) f.focus(); }, 400);
    }

    function r_checkAnswer() {
        if (r_state.answered) return;
        var typed = r_typedWord();
        var r = r_selectedRiddles[r_state.lvl];
        var ans = r.a.toUpperCase();

        if (typed.length < ans.length) {
            r_setFeedback('Fill in all the letters first.', '');
            return;
        }

        var alts = (r.alt || '').split('|').map(function (s) { return s.trim().toUpperCase(); }).filter(Boolean);
        var correct = typed === ans || alts.indexOf(typed) !== -1;

        if (correct) {
            r_handleCorrect();
        } else {
            r_handleWrong(typed, ans);
        }
    }

    function r_handleCorrect() {
        r_state.answered = true;
        r_sound('ok');

        var boxes = r_allBoxes();
        boxes.forEach(function (b, i) {
            setTimeout(function () { b.classList.add('correct'); }, i * 50);
        });

        var stars = r_starsCalc(r_state.hintCount, r_state.wrongs);
        var pts = stars * 100 + (r_state.wrongs === 0 ? 50 : 0);
        r_state.score += pts;
        r_state.totalStars += stars;

        r_setFeedback('Correct!', 'ok');

        setTimeout(function () {
            r_sound('up');
            r_showLevelWin(stars, pts);
        }, 500 + boxes.length * 50);
    }

    function r_handleWrong(typed, ans) {
        r_state.wrongs++;
        r_state.gLeft--;
        r_sound('bad');
        r_refreshHudStars();

        var all = r_allBoxes();
        all.forEach(function (b) {
            b.classList.add('wrong');
            setTimeout(function () { b.classList.remove('wrong'); }, 500);
        });

        if (r_state.gLeft <= 0) {
            r_state.answered = true;
            all.forEach(function (b, i) {
                b.value = ans[i] || '';
                b.classList.remove('wrong');
                b.classList.add('revealed');
            });
            r_setFeedback('Out of guesses — the answer was: ' + ans, 'bad');
            setTimeout(function () { r_showLevelWin(0, 0); }, 2000);
        } else {
            var sim = r_strSim(typed, ans.toLowerCase());
            var msgs = [
                'Not quite. Keep thinking.',
                sim > 0.60 ? 'So close — almost there!' :
                    sim > 0.38 ? 'Getting warmer…' : 'Nope. Think differently.',
                'Still wrong — try a hint?',
                'Dig deeper. You can do this.'
            ];
            r_setFeedback(msgs[Math.min(r_state.wrongs - 1, msgs.length - 1)], 'bad');
            setTimeout(function () { all.forEach(function (b) { b.value = ''; }); all[0].focus(); }, 460);
        }
        r_buildGuessDots();
    }

    function r_useHint() {
        if (r_state.answered) return;
        var r = r_selectedRiddles[r_state.lvl];
        if (r_state.hintCount >= r.hints.length) { r_setFeedback('No more hints available.', ''); return; }

        var h = r.hints[r_state.hintCount++];
        r_sound('hint');
        r_refreshHudStars();

        var area = r_el('r-hint-area');
        var item = document.createElement('div');
        item.className = 'r-hint-item';
        item.innerHTML = '<div class="r-hint-n">Hint ' + r_state.hintCount + '</div><div class="r-hint-text">' + h + '</div>';
        area.appendChild(item);

        var left = r.hints.length - r_state.hintCount;
        r_el('r-hint-badge').textContent = left;
        if (left === 0) r_el('r-btn-hint').disabled = true;
    }

    function r_setFeedback(msg, cls) {
        var e = r_el('r-feedback');
        if (!e) return;
        var icon = cls === 'ok' ? '✓ ' : cls === 'bad' ? '✗ ' : '';
        e.textContent = icon + msg;
        e.className = 'r-feedback' + (cls ? ' ' + cls : '');
    }

    function r_showLevelWin(stars, pts) {
        var r = r_selectedRiddles[r_state.lvl];
        r_sound('up');

        var hdr = r_el('r-win-header');
        if (stars === 3 && r_state.wrongs === 0) {
            hdr.textContent = '✦ Perfect!';
            hdr.classList.add('perfect');
        } else if (stars > 0) {
            hdr.textContent = 'Correct!';
            hdr.classList.remove('perfect');
        } else {
            hdr.textContent = 'Revealed.';
            hdr.classList.remove('perfect');
        }

        var sc = r_el('r-win-stars');
        sc.textContent = r_starsStr(stars);

        r_el('r-win-answer-word').textContent = r.a.toUpperCase();
        r_el('r-win-fact').textContent = r.fact;

        if (pts > 0) {
            r_el('r-win-pts').innerHTML = '+<b>' + pts + '</b> points' + (r_state.wrongs === 0 && stars === 3 ? ' (perfect bonus)' : '');
        } else {
            r_el('r-win-pts').innerHTML = 'No points earned this round.';
        }

        r_el('r-btn-next').textContent = r_state.lvl >= r_selectedRiddles.length - 1 ? 'See Results →' : 'Next Riddle →';
        r_showScreen('r-win');
    }

    function r_showEnd() {
        r_sound('win');
        var total = r_selectedRiddles.length * 3;
        var pct = Math.round((r_state.totalStars / total) * 100);

        var title, sub;
        if (pct >= 93) { title = 'Extraordinary.'; sub = 'A mind like no other.'; }
        else if (pct >= 75) { title = 'Impressive.'; sub = 'Your wit is razor sharp.'; }
        else if (pct >= 55) { title = 'Well played.'; sub = 'A solid run through the riddles.'; }
        else if (pct >= 35) { title = 'Not bad.'; sub = 'Some riddles proved elusive.'; }
        else { title = 'Keep at it.'; sub = 'The riddles will yield to you yet.'; }

        r_el('r-end-title').textContent = title;
        r_el('r-end-sub').textContent = sub;
        r_el('r-end-score').textContent = String(r_state.score).padStart(4, '0');
        r_el('r-end-stars-count').textContent = r_state.totalStars + '/' + total;
        r_el('r-rank-badge').textContent = '— ' + r_rank(r_state.score) + ' —';
        r_el('r-end-stars').textContent = r_starsStr(Math.round((r_state.totalStars / total) * 3));

        r_showScreen('r-end');
    }

    function r_rank(s) {
        if (s >= 1600) return 'Grand Master';
        if (s >= 1200) return 'Sage';
        if (s >= 800) return 'Seeker';
        if (s >= 400) return 'Apprentice';
        return 'Wanderer';
    }

    function r_startGame() {
        var pool = [].concat(ALL_RIDDLES).sort(function () { return Math.random() - 0.5; });
        r_selectedRiddles = pool.slice(0, r_totalRiddles);
        r_state = { lvl: 0, score: 0, totalStars: 0, hintCount: 0, wrongs: 0, gLeft: r_maxGuesses, answered: false };
        r_loadRiddle(0);
    }

    function r_nextLevel() {
        if (r_state.lvl >= r_selectedRiddles.length - 1) {
            r_showEnd();
            return;
        }
        r_state.lvl++;
        r_state.hintCount = 0; r_state.wrongs = 0; r_state.gLeft = r_maxGuesses; r_state.answered = false;
        r_loadRiddle(r_state.lvl);
    }

    // Bindings
    r_el('r-btn-start').onclick = function () { r_sound('tap'); r_startGame(); };
    r_el('r-btn-check').onclick = function () { r_checkAnswer(); };
    r_el('r-btn-hint').onclick = function () { r_useHint(); };
    r_el('r-btn-next').onclick = function () { r_sound('tap'); r_nextLevel(); };
    r_el('r-btn-replay').onclick = function () { r_sound('tap'); r_showScreen('r-home'); };

    // Handle pasting words across boxes (bound once statically to prevent memory leaks)
    var rBoxesContainer = r_el('r-boxes');
    if (rBoxesContainer) {
        rBoxesContainer.addEventListener('paste', function (e) {
            if (r_state.answered) return;
            var pasteData = (e.clipboardData || window.clipboardData).getData('text');
            if (!pasteData) return;

            pasteData = pasteData.replace(/[^a-zA-Z]/g, '').toUpperCase();
            if (!pasteData) return;

            e.preventDefault();

            var targetInput = e.target;
            if (!targetInput || !targetInput.classList.contains('r-box')) return;

            var startIndex = parseInt(targetInput.dataset.i);
            var all = r_allBoxes();

            for (var j = 0; j < pasteData.length; j++) {
                var currentIndex = startIndex + j;
                if (currentIndex >= all.length) break;

                all[currentIndex].value = pasteData[j];
            }

            var nextFocusIndex = startIndex + pasteData.length;
            if (nextFocusIndex < all.length) {
                all[nextFocusIndex].focus();
            } else {
                all[all.length - 1].focus();
            }

            r_sound('tap');
        });
    }

    // Initialize Lenis Smooth Scroll if available
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
        });

        // Use requestAnimationFrame to update Lenis scroll position
        function raf(time) {
            if (lenis) {
                lenis.raf(time);
            }
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // Smoothly scroll to internal links using Lenis scrollTo
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ignore empty hashes or local finder/modal controls
            if (href === '#' || this.closest('.finder-modal')) return;

            if (lenis) {
                e.preventDefault();

                if (href === '#about') {
                    lenis.scrollTo(0, {
                        duration: 1.2
                    });
                } else {
                    const target = document.querySelector(href);
                    if (target) {
                        lenis.scrollTo(target, {
                            offset: -90, // Stop just above the section divider below navbar
                            duration: 1.2
                        });
                    }
                }
            }
        });
    });

    // Background preloader for stats SVG widgets
    window.addEventListener('load', function () {
        var themes = ['dark', 'light'];
        var ghCardTypes = [
            'total-contributions', 'current-streak', 'longest-streak', 'active-ratio',
            'prs-accepted', 'followers', 'public-repos', 'top-repo'
        ];
        var lcCardTypes = [
            'total-solved', 'contest-rating', 'max-streak', 'reputation', 'views', 'solutions'
        ];

        themes.forEach(function (theme) {
            ghCardTypes.forEach(function (type) {
                var img = new Image();
                img.src = 'https://gitpulse-sable.vercel.app/api/svg/Mayur-Pagote/card/' + type + '?theme=' + theme + '&year=' + new Date().getFullYear();
            });
            lcCardTypes.forEach(function (type) {
                var img = new Image();
                img.src = 'https://gitpulse-sable.vercel.app/api/leetcode/svg/mayurpagote/card/' + type + '?theme=' + theme + '&year=' + new Date().getFullYear();
            });
        });

        // Preload folder certificates and badges in the background after page load
        var staticAssets = [
            // Certificates
            'assets/certificates/stanford-code-in-place.png',
            'assets/certificates/docker-and-kubernetes-masterclass.png',
            'assets/certificates/3d-printing-and-additive-manufacturing.png',
            'assets/certificates/professional-skills-for-the-workplace.png',
            'assets/certificates/getting-started-with-google-workspace.png',
            'assets/certificates/introduction-to-computing-systems.png',
            'assets/certificates/getting-started-with-git-and-github.png',
            'assets/certificates/introduction-to-artificial-intelligence-ai.png',
            'assets/certificates/introduction-to-containers-docker-kubernetes-openshift.png',
            'assets/certificates/innovation-through-design-think-make-break-repeat.png',
            'assets/certificates/ai-fundamentals.png',
            'assets/certificates/introduction-to-sql.png',
            'assets/certificates/introduction-to-data.png',
            'assets/certificates/python-basic.png',
            'assets/certificates/problem-solving-basic.png',
            'assets/certificates/sql-basic.png',
            'assets/certificates/sql-intermediate.png',
            // Badges
            'assets/badges/github/pull-shark.png',
            'assets/badges/github/yolo.png',
            'assets/badges/github/quickdraw.png',
            'assets/badges/github/starstruck.png',
            'assets/badges/github/pair-extraordinaire.png',
            'assets/badges/github/galaxy-brain.png',
            'assets/badges/github/public-sponsor.png',
            'assets/badges/hackerrank/problem-solving.svg',
            'assets/badges/hackerrank/python.svg',
            'assets/badges/hackerrank/cpp.svg',
            'assets/badges/hackerrank/c-language.svg',
            'assets/badges/hackerrank/java.svg',
            'assets/badges/hackerrank/sql.svg',
            'assets/badges/hackerrank/30-days-of-code.svg',
            'assets/badges/hackerrank/ruby.svg',
            'assets/badges/leetcode/lg365.png',
            'assets/badges/leetcode/lg200.png',
            'assets/badges/leetcode/100-days.png',
            'assets/badges/leetcode/50-days.png',
            'assets/badges/leetcode/introduction-to-pandas.png',
            'assets/badges/leetcode/lg25100.png',
            'assets/badges/leetcode/lg2550.png'
        ];

        staticAssets.forEach(function (src) {
            var img = new Image();
            img.src = src;
        });
    });

    // ── Footer Social Dock Magnification (Spring Physics) ──
    const dock = document.getElementById('footer-dock');
    if (dock) {
        const icons = dock.querySelectorAll('.dock-icon-wrapper');
        const mass = 0.1;
        const stiffness = 150;
        const damping = 12;

        let currentMouseX = null;
        let isLoopRunning = false;
        let lastTime = null;

        // Initialize state for each icon
        const iconStates = Array.from(icons).map(icon => ({
            element: icon,
            currentSize: 40,
            targetSize: 40,
            velocity: 0
        }));

        function updateTargetSizes() {
            if (currentMouseX === null) {
                for (let state of iconStates) {
                    state.targetSize = 40;
                }
                return;
            }

            for (let state of iconStates) {
                // If element is hidden (display: none via hidden-mobile), reset state and skip
                if (!state.isVisible) {
                    state.targetSize = 40;
                    state.currentSize = 40;
                    state.velocity = 0;
                    state.element.style.width = '';
                    state.element.style.height = '';
                    continue;
                }

                const distance = Math.abs(currentMouseX - state.centerX);

                if (distance < 140) {
                    // Map distance [0, 140] to size [60, 40]
                    state.targetSize = 40 + (20 * (1 - distance / 140));
                } else {
                    state.targetSize = 40;
                }
            }
        }

        function updateSprings(time) {
            if (lastTime === null) {
                lastTime = time;
                requestAnimationFrame(updateSprings);
                return;
            }

            let dt = (time - lastTime) / 1000;
            lastTime = time;

            // Clamp dt to prevent huge jumps (e.g. background tab resuming)
            if (dt > 0.1) dt = 0.1;

            // Measure active icons ONCE at the start of the frame to avoid layout thrashing (FastDOM pattern)
            for (let state of iconStates) {
                state.isVisible = state.element.offsetWidth !== 0;
                if (state.isVisible) {
                    const rect = state.element.getBoundingClientRect();
                    state.centerX = rect.left + rect.width / 2;
                }
            }

            // Solve physics in fixed small substeps (1ms) for absolute stability
            const subStep = 0.001;
            let accumulator = dt;
            let isMoving = false;

            while (accumulator >= subStep) {
                updateTargetSizes();

                for (let state of iconStates) {
                    if (!state.isVisible) continue;

                    const force = (state.targetSize - state.currentSize) * stiffness;
                    const dampingForce = -damping * state.velocity;
                    const acceleration = (force + dampingForce) / mass;

                    state.velocity += acceleration * subStep;
                    state.currentSize += state.velocity * subStep;

                    // Keep running if sizes are still settling
                    if (Math.abs(state.velocity) > 0.001 || Math.abs(state.currentSize - state.targetSize) > 0.001) {
                        isMoving = true;
                    }
                }

                accumulator -= subStep;
            }

            // Apply current sizes to DOM
            for (let state of iconStates) {
                if (!state.isVisible) continue;
                const renderSize = Math.max(40, Math.min(60, state.currentSize));
                state.element.style.width = `${renderSize}px`;
                state.element.style.height = `${renderSize}px`;
            }

            // Keep loop active if mouse is still hovering or icons are still moving
            if (isMoving || currentMouseX !== null) {
                requestAnimationFrame(updateSprings);
            } else {
                // Sleep state: reset and snap to base size
                for (let state of iconStates) {
                    state.currentSize = 40;
                    state.velocity = 0;
                    state.element.style.width = '';
                    state.element.style.height = '';
                }
                lastTime = null;
                isLoopRunning = false;
            }
        }

        // Listeners for mouse tracking
        dock.addEventListener('mousemove', function (e) {
            currentMouseX = e.clientX;
            if (!isLoopRunning) {
                isLoopRunning = true;
                lastTime = null;
                requestAnimationFrame(updateSprings);
            }
        });

        dock.addEventListener('mouseleave', function () {
            currentMouseX = null;
            // If the loop is not running, trigger a single wake cycle to return elements to resting state
            if (!isLoopRunning) {
                isLoopRunning = true;
                lastTime = null;
                requestAnimationFrame(updateSprings);
            }
        });
    }
});

