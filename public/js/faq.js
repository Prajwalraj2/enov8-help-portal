let faqs = {}, domains = [];

// Sidebar and dark mode functionality
const body = document.querySelector('body'),
      sidebar = body.querySelector('.sidebar'),
      toggle = body.querySelector(".toggle"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

// Sidebar toggle functionality
if (toggle) {
    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        
        if (window.innerWidth <= 1024) {
            // Mobile/Tablet behavior: toggle open/close overlay
            if (sidebar.classList.contains("open")) {
                sidebar.classList.remove("open");
            } else {
                sidebar.classList.add("open");
                sidebar.classList.remove("close"); // Ensure it's fully visible when opened
            }
        } else {
            // Desktop behavior: toggle close/expand
            sidebar.classList.toggle("close");
            saveSidebarState();
        }
    });
}

// Dark mode toggle functionality
if (modeSwitch) {
    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");
        
        if(body.classList.contains("dark")) {
            modeText.innerText = "Light mode";
        } else {
            modeText.innerText = "Dark mode";
        }
        saveSidebarState();
    });
}

// Mobile responsive functionality
function checkScreenSize() {
    if (window.innerWidth <= 1024) {
        // On mobile/tablet, start with sidebar closed
        sidebar.classList.add("close");
        sidebar.classList.remove("open");
    } else {
        // On desktop, remove mobile classes and restore normal behavior
        sidebar.classList.remove("open");
        // Restore desktop sidebar state from localStorage
        const sidebarState = localStorage.getItem('sidebarState');
        if (sidebarState === 'closed') {
            sidebar.classList.add('close');
        } else {
            sidebar.classList.remove('close');
        }
    }
}

// Check screen size on load and resize
window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 1024) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isToggleButton = toggle && toggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isToggleButton && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            sidebar.classList.add('close'); // Return to closed state
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Press Escape to close sidebar on mobile
    if (event.key === 'Escape' && window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
        sidebar.classList.add('close');
    }
    
    // Press 'S' to focus search box
    if (event.key === 's' || event.key === 'S') {
        if (!event.ctrlKey && !event.metaKey && !event.target.matches('input, textarea')) {
            event.preventDefault();
            const searchInput = document.querySelector('.search-bar');
            if (searchInput) {
                searchInput.focus();
                if (window.innerWidth > 1024) {
                    sidebar.classList.remove('close');
                } else {
                    // On mobile, open the sidebar when focusing search
                    sidebar.classList.add('open');
                    sidebar.classList.remove('close');
                }
            }
        }
    }
});

// Initialize the sidebar state based on localStorage
function initializeSidebar() {
    const sidebarState = localStorage.getItem('sidebarState');
    const darkMode = localStorage.getItem('darkMode');
    
    if (sidebarState === 'closed') {
        sidebar.classList.add('close');
    }
    
    if (darkMode === 'enabled') {
        body.classList.add('dark');
        if (modeText) {
            modeText.innerText = "Light mode";
        }
    }
}

// Save sidebar state to localStorage
function saveSidebarState() {
    if (sidebar.classList.contains('close')) {
        localStorage.setItem('sidebarState', 'closed');
    } else {
        localStorage.setItem('sidebarState', 'open');
    }
    
    if (body.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// FAQ functionality
async function loadDomainsAndFAQs() {
  try {
    const [faqRes, domainRes] = await Promise.all([
      fetch('/api/faqs'),
      fetch('/api/faqs/domains/list')
    ]);
    const faqData = await faqRes.json();
    const domainData = await domainRes.json();
    domains = domainData;

    faqs = faqData.reduce((acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push({ q: item.q, a: item.a, type: item.type });
      return acc;
    }, {});

    let sidebarHTML = '';
    domains.forEach(d => {
      const icon = d.iconClass || 'bx bx-folder'; // fallback icon
      sidebarHTML += `
        <li class="nav-link">
          <a href="#" class="d-flex align-items-center" data-section="${d.key}" title="${d.name}">
            <div class="icon">
              <i class="${icon}"></i>
            </div>
            <span class="text nav-text">${d.name}</span>
          </a>
        </li>`;
    });

    $('#sidebar').html(sidebarHTML);
    
    // Set first item as active
    if (domains.length > 0) {
      $('#sidebar .nav-link').first().find('a').addClass('active');
      renderFAQ(domains[0]?.key || '');
    }
  } catch (err) {
    console.error('Error loading FAQ data:', err);
    $('#faqContent').html(`
      <div class="text-center py-5">
        <i class="bx bx-error-circle text-danger" style="font-size: 3rem;"></i>
        <h5 class="mt-3 text-danger">Failed to load FAQ data</h5>
        <p class="text-muted">Please check your connection and try again.</p>
        <button class="btn btn-primary" onclick="loadDomainsAndFAQs()">
          <i class="bx bx-refresh me-2"></i>Retry
        </button>
      </div>
    `);
  }
}

function renderFAQ(section) {
  const selectedType = $('#typeFilter .active').data('type');
  const allFaqs = faqs[section] || [];
  const filteredFaqs = selectedType === 'all' ? allFaqs : allFaqs.filter(f => f.type === selectedType);
  renderFilteredFAQ(filteredFaqs, section);
}

function renderFilteredFAQ(data, section = '') {
  if (!data || data.length === 0) {
    $('#faqContent').html(`
      <div class="text-center py-5">
        <i class="bx bx-info-circle text-info" style="font-size: 3rem;"></i>
        <h5 class="mt-3">No FAQs found</h5>
        <p class="text-muted">There are no FAQs available for the selected criteria.</p>
      </div>
    `);
    return;
  }

  let html = `<div class="accordion" id="faqAccordion">`;
    
  data.forEach((item, idx) => {
    const typeIcon = item.type === 'conceptual' ? 'bx-brain' : 'bx-wrench';
    const typeBadge = item.type === 'conceptual' ? 'info' : 'success';
    
    html += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${idx}">
          <button class="accordion-button ${idx !== 0 ? 'collapsed' : ''}" type="button" 
                  data-bs-toggle="collapse" data-bs-target="#collapse${idx}" 
                  aria-expanded="${idx === 0 ? 'true' : 'false'}" aria-controls="collapse${idx}">
            <div class="d-flex align-items-center w-100">
              <i class="bx ${typeIcon} me-3 text-${typeBadge}"></i>
              <span class="flex-grow-1">${item.q}</span>
              <span class="badge bg-${typeBadge} ms-2">${item.type}</span>
            </div>
          </button>
        </h2>
        <div id="collapse${idx}" class="accordion-collapse collapse ${idx === 0 ? 'show' : ''}" 
             data-bs-parent="#faqAccordion">
          <div class="accordion-body">${item.a}</div>
        </div>
      </div>`;
  });
  
  html += `</div>`;
  $('#faqContent').html(html);
}

function searchAllFAQs(searchTerm) {
  const lowerSearch = searchTerm.toLowerCase();
  let allResults = [];
  
  Object.keys(faqs).forEach(section => {
    const matches = faqs[section].filter(faq => 
      faq.q.toLowerCase().includes(lowerSearch) || 
      faq.a.toLowerCase().includes(lowerSearch)
    );
    
    matches.forEach(match => {
      allResults.push({
        ...match,
        section: section,
        sectionName: domains.find(d => d.key === section)?.name || section
      });
    });
  });

  if (allResults.length === 0) {
    $('#faqContent').html(`
      <div class="text-center py-5">
        <i class="bx bx-search-alt text-warning" style="font-size: 3rem;"></i>
        <h5 class="mt-3">No results found</h5>
        <p class="text-muted">No results found for "<strong>${searchTerm}</strong>"</p>
        <p class="text-muted">Try using different keywords or check your spelling.</p>
      </div>
    `);
    return;
  }

  let html = `<div class="accordion" id="searchAccordion">`;

  allResults.forEach((item, idx) => {
    const typeIcon = item.type === 'conceptual' ? 'bx-brain' : 'bx-wrench';
    const typeBadge = item.type === 'conceptual' ? 'info' : 'success';
    
    html += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="searchHeading${idx}">
          <button class="accordion-button collapsed" type="button" 
                  data-bs-toggle="collapse" data-bs-target="#searchCollapse${idx}">
            <div class="d-flex align-items-center w-100">
              <i class="bx ${typeIcon} me-3 text-${typeBadge}"></i>
              <div class="flex-grow-1">
                <div>${item.q}</div>
                <small class="text-muted">
                  <i class="bx bx-category me-1"></i>${item.sectionName}
                </small>
              </div>
              <span class="badge bg-${typeBadge} ms-2">${item.type}</span>
            </div>
          </button>
        </h2>
        <div id="searchCollapse${idx}" class="accordion-collapse collapse" 
             data-bs-parent="#searchAccordion">
          <div class="accordion-body">${item.a}</div>
        </div>
      </div>`;
  });
  
  html += `</div>`;
  $('#faqContent').html(html);
}

function showSuggestions(value) {
  const search = value.toLowerCase();
  if (!search) {
    $('#searchSuggestions').hide();
    return;
  }
  
  const allQuestions = [];
  Object.entries(faqs).forEach(([section, items]) => {
    items.forEach(faq => allQuestions.push({ 
      q: faq.q, 
      section,
      sectionName: domains.find(d => d.key === section)?.name || section
    }));
  });
  
  const matches = allQuestions.filter(f => 
    f.q.toLowerCase().includes(search)
  ).slice(0, 5);
  
  if (!matches.length) {
    $('#searchSuggestions').hide();
    return;
  }

  const suggestionsHTML = matches.map(m => `
    <li class="list-group-item list-group-item-action d-flex align-items-center" 
        data-question="${m.q}">
      <i class="bx bx-search me-2 text-muted"></i>
      <div class="flex-grow-1">
        <div>${m.q}</div>
        <small class="text-muted">${m.sectionName}</small>
      </div>
    </li>
  `).join('');
  
  $('#searchSuggestions').html(suggestionsHTML).show();
}

$(document).ready(function () {
  // Initialize sidebar
  initializeSidebar();
  
  // Load FAQs
  loadDomainsAndFAQs();
  
  // Sidebar navigation
  $(document).on('click', '#sidebar .nav-link a', function (e) {
    e.preventDefault();
    $('#sidebar .nav-link a').removeClass('active');
    $(this).addClass('active');
    renderFAQ($(this).data('section'));
    $('.search-bar').val('');
    $('#searchSuggestions').hide();
    
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 1024) {
      sidebar.classList.remove('open');
      sidebar.classList.add('close');
    }
  });

  // Search functionality
  $('.search-bar').on('input', function () {
    const val = $(this).val().trim();
    showSuggestions(val);
    
    if (val) {
      searchAllFAQs(val);
    } else {
      const activeSection = $('#sidebar .nav-link a.active').data('section');
      if (activeSection) {
        renderFAQ(activeSection);
      }
    }
  });
  
  // Search suggestions
  $('#searchSuggestions').on('click', 'li', function () {
    const question = $(this).data('question');
    $('.search-bar').val(question);
    $('#searchSuggestions').hide();
    searchAllFAQs(question);
  });
  
  // Hide suggestions when clicking outside
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.search-box').length) {
      $('#searchSuggestions').hide();
    }
  });
  
  // Type filter
  $('#typeFilter .btn').click(function () {
    $('#typeFilter .btn').removeClass('active');
    $(this).addClass('active');
    
    const searchVal = $('.search-bar').val().trim();
    if (searchVal) {
      searchAllFAQs(searchVal);
    } else {
      const activeSection = $('#sidebar .nav-link a.active').data('section');
      if (activeSection) {
        renderFAQ(activeSection);
      }
    }
  });
});

// Initialize sidebar on page load
window.addEventListener('load', initializeSidebar);