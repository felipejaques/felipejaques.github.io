/**
 * Main JavaScript module for Felipe Jaques Portfolio
 * Handles navigation, scroll behavior, mobile menu, and project rendering.
 */
'use strict';

// ============================================================================
// DATA
// ============================================================================

const projects = [
  {
    title: "API REST com Node.js",
    description: "API completa com autenticação JWT e documentação Swagger",
    technologies: ["Node.js", "Express", "MongoDB"],
    url: "https://github.com/felipejaques/api-rest"
  },
  {
    title: "Dashboard Analytics",
    description: "Painel de visualização de dados com gráficos interativos",
    technologies: ["JavaScript", "D3.js", "CSS Grid"],
    url: null
  },
  {
    title: "Portfolio Site",
    description: "Site pessoal construído com HTML, CSS e JavaScript puros",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://github.com/felipejaques/felipejaques.github.io"
  }
];

// ============================================================================
// TASK 5.1: Project Rendering
// ============================================================================

/**
 * Renderiza um card de projeto.
 * @param {Project} project - Dados do projeto
 * @returns {string} - HTML do card
 */
function renderProjectCard(project) {
  var description = project.description;
  if (description && description.length > 150) {
    description = description.substring(0, 150) + '...';
  }

  var techHtml = project.technologies
    .map(function (tech) {
      return '<li class="projetos__card-tech-item">' + tech + '</li>';
    })
    .join('');

  var cardContent =
    '<h3 class="projetos__card-title">' + project.title + '</h3>' +
    '<p class="projetos__card-description">' + description + '</p>' +
    '<ul class="projetos__card-tech" role="list">' + techHtml + '</ul>';

  if (project.url) {
    return '<div class="projetos__card" role="listitem">' +
      '<a href="' + project.url + '" target="_blank" rel="noopener noreferrer" class="projetos__card-link">' +
      cardContent +
      '</a>' +
      '</div>';
  }

  return '<div class="projetos__card projetos__card--no-link" role="listitem">' +
    cardContent +
    '<span class="projetos__card-badge">Em breve</span>' +
    '</div>';
}

/**
 * Renderiza a lista completa de projetos (3-6 projetos).
 * @param {Array<Project>} projects - Array de projetos
 * @returns {string} - HTML de todos os cards
 * @throws {Error} - Se projects.length < 3
 */
function renderProjects(projects) {
  if (!projects || projects.length < 3) {
    throw new Error('A lista de projetos deve conter no mínimo 3 projetos.');
  }

  var projectsToRender = projects.slice(0, 6);

  return projectsToRender
    .map(function (project) {
      return renderProjectCard(project);
    })
    .join('');
}

// ============================================================================
// TASK 5.2: Smooth Scroll Navigation
// ============================================================================

/**
 * Inicializa o scroll suave nos links de navegação.
 */
function initSmoothScroll() {
  var navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var targetId = href.substring(1);
        var targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Also handle the hero CTA link
  var ctaLink = document.querySelector('.hero__cta');
  if (ctaLink) {
    ctaLink.addEventListener('click', function (e) {
      var href = ctaLink.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var targetElement = document.getElementById(href.substring(1));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}

// ============================================================================
// TASK 5.3: Active Section Detection
// ============================================================================

/**
 * Determina qual seção está atualmente visível na viewport.
 * @param {Array<{id: string, offsetTop: number, offsetHeight: number}>} sections
 * @param {number} scrollPosition - Posição atual do scroll (window.scrollY)
 * @param {number} offset - Offset da navbar (altura da nav)
 * @returns {string|null} - ID da seção ativa ou null
 */
function getActiveSection(sections, scrollPosition, offset) {
  if (!sections || sections.length === 0) {
    return null;
  }

  var adjustedPosition = scrollPosition + offset;

  for (var i = sections.length - 1; i >= 0; i--) {
    var section = sections[i];
    if (adjustedPosition >= section.offsetTop) {
      return section.id;
    }
  }

  return sections[0].id;
}

/**
 * Inicializa a detecção de seção ativa usando IntersectionObserver ou fallback.
 */
function initActiveSectionDetection() {
  var navLinks = document.querySelectorAll('.nav__link');
  var sections = document.querySelectorAll('section[id]');

  function setActiveLink(sectionId) {
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === '#' + sectionId) {
        link.classList.add('nav__link--active');
      } else {
        link.classList.remove('nav__link--active');
      }
    });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  } else {
    // Fallback: scroll event listener
    window.addEventListener('scroll', function () {
      var nav = document.querySelector('.nav');
      var navHeight = nav ? nav.offsetHeight : 64;
      var scrollPos = window.scrollY || window.pageYOffset;

      var sectionData = [];
      sections.forEach(function (section) {
        sectionData.push({
          id: section.id,
          offsetTop: section.offsetTop,
          offsetHeight: section.offsetHeight
        });
      });

      var activeId = getActiveSection(sectionData, scrollPos, navHeight);
      if (activeId) {
        setActiveLink(activeId);
      }
    });
  }
}

// ============================================================================
// TASK 5.4: Mobile Menu Toggle
// ============================================================================

/**
 * Alterna o estado do menu mobile (aberto/fechado).
 * @param {HTMLElement} menuElement - Elemento do menu
 * @param {HTMLElement} toggleButton - Botão de toggle
 * @returns {boolean} - Novo estado (true = aberto, false = fechado)
 */
function toggleMobileMenu(menuElement, toggleButton) {
  var isOpen = menuElement.classList.contains('nav__menu--open');
  var newState = !isOpen;

  if (newState) {
    menuElement.classList.add('nav__menu--open');
    toggleButton.setAttribute('aria-expanded', 'true');
  } else {
    menuElement.classList.remove('nav__menu--open');
    toggleButton.setAttribute('aria-expanded', 'false');
  }

  return newState;
}

/**
 * Inicializa o comportamento do menu mobile.
 */
function initMobileMenu() {
  var toggleButton = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');

  if (!toggleButton || !menu) {
    return;
  }

  // Toggle menu on button click
  toggleButton.addEventListener('click', function () {
    toggleMobileMenu(menu, toggleButton);
  });

  // Close menu when clicking a nav link
  var navLinks = menu.querySelectorAll('.nav__link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (menu.classList.contains('nav__menu--open')) {
        menu.classList.remove('nav__menu--open');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('nav__menu--open')) {
      var isClickInsideMenu = menu.contains(e.target);
      var isClickOnToggle = toggleButton.contains(e.target);

      if (!isClickInsideMenu && !isClickOnToggle) {
        menu.classList.remove('nav__menu--open');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

// ============================================================================
// TASK 8.2: Cálculo de Contraste WCAG 2.1
// ============================================================================

/**
 * Calcula a luminância relativa de uma cor em formato hexadecimal.
 * Fórmula WCAG 2.1: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 * 
 * @param {string} hex - Cor em formato hex (#RRGGBB ou #RGB)
 * @returns {number} - Luminância relativa (0 a 1)
 */
function getRelativeLuminance(hex) {
  // Normalizar hex: remover # e expandir shorthand (#RGB -> #RRGGBB)
  var cleanHex = hex.replace(/^#/, '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2];
  }

  var r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  var g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  var b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  // Aplicar linearização sRGB
  var rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  var gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  var bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // Luminância relativa
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calcula o ratio de contraste entre duas cores conforme WCAG 2.1.
 * Fórmula: (L1 + 0.05) / (L2 + 0.05) onde L1 é a luminância mais clara.
 * O resultado é simétrico: getContrastRatio(a, b) === getContrastRatio(b, a).
 * 
 * @param {string} color1 - Primeira cor em formato hex (#RRGGBB ou #RGB)
 * @param {string} color2 - Segunda cor em formato hex (#RRGGBB ou #RGB)
 * @returns {number} - Ratio de contraste (1 a 21)
 */
function getContrastRatio(color1, color2) {
  var lum1 = getRelativeLuminance(color1);
  var lum2 = getRelativeLuminance(color2);

  var lighter = Math.max(lum1, lum2);
  var darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/*
 * Documentação de Contraste dos Design Tokens
 * ============================================
 * Cores do sistema e seus ratios de contraste:
 *
 * --color-text (#1f2937) vs --color-bg (#ffffff):         ratio ~14.68:1 ✓ (WCAG AA texto normal ≥4.5:1)
 * --color-text-light (#6b7280) vs --color-bg (#ffffff):   ratio ~4.83:1  ✓ (WCAG AA texto normal ≥4.5:1)
 * --color-primary (#2563eb) vs --color-bg (#ffffff):      ratio ~5.17:1  ✓ (WCAG AA texto normal ≥4.5:1)
 * --color-primary-dark (#1d4ed8) vs --color-bg (#ffffff): ratio ~6.70:1  ✓ (WCAG AA texto normal ≥4.5:1)
 * --color-text (#1f2937) vs --color-bg-alt (#f9fafb):     ratio ~14.1:1  ✓ (WCAG AA texto normal ≥4.5:1)
 * --color-text-light (#6b7280) vs --color-bg-alt (#f9fafb): ratio ~4.6:1 ✓ (WCAG AA texto normal ≥4.5:1)
 * --color-bg (#ffffff) vs --color-primary (#2563eb):      ratio ~5.17:1  ✓ (CTA button white text on primary bg ≥4.5:1)
 *
 * Todas as combinações de cores utilizadas atendem WCAG 2.1 nível AA:
 * - Texto normal: ratio ≥ 4.5:1
 * - Texto grande (≥18pt ou ≥14pt bold): ratio ≥ 3:1
 */

// ============================================================================
// INITIALIZATION
// ============================================================================

if (typeof document !== 'undefined') {
document.addEventListener('DOMContentLoaded', function () {
  // Task 5.1: Render projects
  var grid = document.querySelector('.projetos__grid');
  if (grid) {
    try {
      grid.innerHTML = renderProjects(projects);
    } catch (error) {
      console.error('Erro ao renderizar projetos:', error.message);
    }
  }

  // Task 5.2: Smooth scroll
  initSmoothScroll();

  // Task 5.3: Active section detection
  initActiveSectionDetection();

  // Task 5.4: Mobile menu
  initMobileMenu();
});
}

// ============================================================================
// EXPORTS (for testability)
// ============================================================================

if (typeof module !== 'undefined') {
  module.exports = {
    getActiveSection: getActiveSection,
    toggleMobileMenu: toggleMobileMenu,
    renderProjectCard: renderProjectCard,
    renderProjects: renderProjects,
    projects: projects,
    getRelativeLuminance: getRelativeLuminance,
    getContrastRatio: getContrastRatio
  };
}
