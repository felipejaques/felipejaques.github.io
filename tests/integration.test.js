/**
 * Integration test for Task 9.1: Validates all components work together
 * and meet requirements 1.5, 2.1, 2.5, 5.5, 6.1
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const html = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');
const mainJs = require('../scripts/main.js');

describe('Task 9.1: Integração final e validação de requisitos', () => {
  let doc;

  beforeEach(() => {
    doc = new DOMParser().parseFromString(html, 'text/html');
  });

  describe('Requisito 1.5: Ordem das seções (Hero → Sobre → Projetos → Contato)', () => {
    it('deve exibir as seções na ordem correta', () => {
      const sections = doc.querySelectorAll('main > section[id]');
      const sectionIds = Array.from(sections).map(s => s.id);
      
      expect(sectionIds).toEqual(['hero', 'sobre', 'projetos', 'contato']);
    });

    it('hero deve ser a primeira seção dentro de main', () => {
      const firstSection = doc.querySelector('main > section');
      expect(firstSection.id).toBe('hero');
    });

    it('contato deve ser a última seção dentro de main', () => {
      const sections = doc.querySelectorAll('main > section');
      const lastSection = sections[sections.length - 1];
      expect(lastSection.id).toBe('contato');
    });
  });

  describe('Requisito 2.1: Navegação contém links para todas as seções', () => {
    it('deve ter links para hero, sobre, projetos e contato', () => {
      const navLinks = doc.querySelectorAll('.nav__link');
      const hrefs = Array.from(navLinks).map(l => l.getAttribute('href'));
      
      expect(hrefs).toContain('#hero');
      expect(hrefs).toContain('#sobre');
      expect(hrefs).toContain('#projetos');
      expect(hrefs).toContain('#contato');
    });

    it('deve ter exatamente 4 links na navegação', () => {
      const navLinks = doc.querySelectorAll('.nav__link');
      expect(navLinks.length).toBe(4);
    });
  });

  describe('Requisito 2.5: Menu mobile com aria-expanded e aria-controls', () => {
    it('botão toggle deve ter aria-expanded', () => {
      const toggle = doc.querySelector('.nav__toggle');
      expect(toggle).not.toBeNull();
      expect(toggle.hasAttribute('aria-expanded')).toBe(true);
    });

    it('botão toggle deve ter aria-controls apontando para nav-menu', () => {
      const toggle = doc.querySelector('.nav__toggle');
      expect(toggle.getAttribute('aria-controls')).toBe('nav-menu');
    });

    it('menu deve ter id correspondente ao aria-controls', () => {
      const menu = doc.getElementById('nav-menu');
      expect(menu).not.toBeNull();
    });

    it('botão toggle deve ter aria-label acessível', () => {
      const toggle = doc.querySelector('.nav__toggle');
      expect(toggle.getAttribute('aria-label')).toBeTruthy();
    });
  });

  describe('Requisito 5.5: Navegação por teclado - elementos interativos', () => {
    it('todos os links de navegação devem ser elementos <a> (nativamente focáveis)', () => {
      const navLinks = doc.querySelectorAll('.nav__link');
      navLinks.forEach(link => {
        expect(link.tagName.toLowerCase()).toBe('a');
      });
    });

    it('botão toggle deve ser <button> (nativamente focável)', () => {
      const toggle = doc.querySelector('.nav__toggle');
      expect(toggle.tagName.toLowerCase()).toBe('button');
    });

    it('CTA do hero deve ser um elemento <a> (nativamente focável)', () => {
      const cta = doc.querySelector('.hero__cta');
      expect(cta).not.toBeNull();
      expect(cta.tagName.toLowerCase()).toBe('a');
    });

    it('links de contato devem ser elementos <a> (nativamente focáveis)', () => {
      const contactLinks = doc.querySelectorAll('.contato__link');
      expect(contactLinks.length).toBeGreaterThan(0);
      contactLinks.forEach(link => {
        expect(link.tagName.toLowerCase()).toBe('a');
      });
    });
  });

  describe('Requisito 6.1: Site composto por arquivos estáticos', () => {
    it('não deve conter elementos de formulário com action de servidor', () => {
      const forms = doc.querySelectorAll('form[action]');
      forms.forEach(form => {
        const action = form.getAttribute('action');
        // Permitir only # or javascript: or empty (client-side only)
        expect(action === '' || action === '#' || action.startsWith('javascript:')).toBe(true);
      });
    });

    it('não deve conter scripts de servidor embutidos (PHP, etc.)', () => {
      expect(html).not.toContain('<?php');
      expect(html).not.toContain('<%');
    });
  });

  describe('Fallback funcional com JavaScript desabilitado', () => {
    it('seção projetos deve conter <noscript> com conteúdo estático', () => {
      const projetosSection = doc.getElementById('projetos');
      const noscript = projetosSection.querySelector('noscript');
      expect(noscript).not.toBeNull();
    });

    it('<noscript> deve conter ao menos 3 cards estáticos de projetos', () => {
      // Parse noscript content manually from HTML source
      const noscriptMatch = html.match(/<noscript>([\s\S]*?)<\/noscript>/);
      expect(noscriptMatch).not.toBeNull();
      
      const noscriptContent = noscriptMatch[1];
      const cardMatches = noscriptContent.match(/class="projetos__card"/g);
      expect(cardMatches).not.toBeNull();
      expect(cardMatches.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Links externos com atributos de segurança', () => {
    it('link do GitHub deve ter target="_blank" e rel="noopener noreferrer"', () => {
      const githubLink = doc.querySelector('a[href*="github.com"]');
      expect(githubLink).not.toBeNull();
      expect(githubLink.getAttribute('target')).toBe('_blank');
      expect(githubLink.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('link do LinkedIn deve ter target="_blank" e rel="noopener noreferrer"', () => {
      const linkedinLink = doc.querySelector('a[href*="linkedin.com"]');
      expect(linkedinLink).not.toBeNull();
      expect(linkedinLink.getAttribute('target')).toBe('_blank');
      expect(linkedinLink.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('links de projetos com URL devem ter target="_blank" e rel="noopener noreferrer"', () => {
      const projectsWithUrl = mainJs.projects.filter(p => p.url);
      projectsWithUrl.forEach(project => {
        const cardHtml = mainJs.renderProjectCard(project);
        expect(cardHtml).toContain('target="_blank"');
        expect(cardHtml).toContain('rel="noopener noreferrer"');
      });
    });
  });

  describe('Acessibilidade: atributos ARIA e semântica', () => {
    it('nav deve ter role="navigation" e aria-label', () => {
      const nav = doc.querySelector('nav');
      expect(nav.getAttribute('role')).toBe('navigation');
      expect(nav.getAttribute('aria-label')).toBeTruthy();
    });

    it('todas as seções devem ter aria-labelledby', () => {
      const sections = doc.querySelectorAll('main > section');
      sections.forEach(section => {
        expect(section.hasAttribute('aria-labelledby')).toBe(true);
        const labelId = section.getAttribute('aria-labelledby');
        const labelElement = doc.getElementById(labelId);
        expect(labelElement).not.toBeNull();
      });
    });

    it('ícones SVG devem ter aria-hidden="true"', () => {
      const svgs = doc.querySelectorAll('.contato__icon');
      svgs.forEach(svg => {
        expect(svg.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });
});
