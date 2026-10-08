# Plano de Implementação: GitHub Pages Site

## Visão Geral

Implementação de um site portfólio pessoal estático usando HTML, CSS e JavaScript puros, hospedado no GitHub Pages. O plano segue uma abordagem incremental: estrutura base → estilos → funcionalidades → testes → validação.

## Tarefas

- [x] 1. Configurar estrutura do projeto e arquivos base
  - [x] 1.1 Criar estrutura de diretórios e arquivos iniciais
    - Criar os diretórios `styles/`, `scripts/`, `assets/images/`, `assets/icons/`
    - Criar `index.html` com doctype, meta tags (charset, viewport, description), título e links para CSS/JS
    - Criar `styles/main.css` com reset básico e variáveis CSS (design tokens) conforme definido no design
    - Criar `scripts/main.js` com estrutura modular básica (DOMContentLoaded listener)
    - _Requisitos: 6.1, 1.5_

- [x] 2. Implementar estrutura HTML semântica
  - [x] 2.1 Implementar componente de Navegação
    - Criar `<nav>` com role="navigation", aria-label, logo, botão toggle mobile e lista de links
    - Incluir atributos aria-expanded, aria-controls no botão toggle
    - Links devem apontar para os IDs de cada seção (#hero, #sobre, #projetos, #contato)
    - _Requisitos: 2.1, 2.5, 5.2, 5.5_

  - [x] 2.2 Implementar Seção Hero
    - Criar `<section id="hero">` com aria-labelledby
    - Incluir `<h1>` com nome do desenvolvedor e `<p>` com descrição (max 200 caracteres)
    - Adicionar CTA link para seção de contato
    - _Requisitos: 1.1, 1.5, 5.2_

  - [x] 2.3 Implementar Seção Sobre
    - Criar `<section id="sobre">` com aria-labelledby e `<h2>`
    - Estruturar área de texto (bio/experiência) e lista de habilidades
    - _Requisitos: 1.2, 1.5, 5.2_

  - [x] 2.4 Implementar Seção Projetos
    - Criar `<section id="projetos">` com aria-labelledby e `<h2>`
    - Criar container `div.projetos__grid` com role="list" para cards gerados via JS
    - Incluir fallback `<noscript>` com projetos em HTML estático
    - _Requisitos: 1.3, 1.5, 4.1, 5.2_

  - [x] 2.5 Implementar Seção Contato
    - Criar `<section id="contato">` com aria-labelledby e `<h2>`
    - Criar lista `<ul>` com links para GitHub, LinkedIn e email
    - Links externos com target="_blank" e rel="noopener noreferrer"
    - Ícones SVG inline com aria-hidden="true" e texto descritivo em `<span>`
    - Link de email com href="mailto:..."
    - _Requisitos: 1.4, 1.5, 7.1, 7.2, 7.3, 7.4, 7.5, 5.2_

- [x] 3. Implementar estilos CSS
  - [x] 3.1 Implementar variáveis CSS e estilos base
    - Definir custom properties em :root (cores, tipografia, espaçamento, layout, animações)
    - Implementar CSS reset/normalize
    - Definir estilos base para body, headings, links, listas
    - Configurar box-sizing border-box global
    - _Requisitos: 5.4, 5.1_

  - [x] 3.2 Implementar layout e componentes
    - Estilizar navegação fixa (position: sticky/fixed, z-index, altura 64px)
    - Estilizar seção Hero (centralização, tipografia grande)
    - Estilizar seção Sobre (layout flex/grid para texto + habilidades)
    - Estilizar grid de projetos (CSS Grid, cards com sombra e hover)
    - Estilizar seção Contato (lista de links com ícones)
    - Garantir containers com max-width: 1200px e padding lateral
    - _Requisitos: 3.1, 1.1, 1.2, 1.3, 1.4_

  - [x] 3.3 Implementar estilos responsivos e acessibilidade
    - Criar media queries para breakpoint 768px
    - Layout desktop: múltiplas colunas; mobile: coluna única
    - Menu hamburger visível apenas em mobile (display toggle)
    - Garantir áreas de toque mínimas de 44x44px em mobile
    - Estilizar indicadores de foco visíveis (:focus-visible) em todos os elementos interativos
    - Garantir destaque visual do link ativo na navegação (classe nav__link--active)
    - _Requisitos: 3.1, 3.2, 3.3, 3.4, 5.4, 5.5_

- [x] 4. Checkpoint - Validar HTML e CSS
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implementar funcionalidades JavaScript
  - [x] 5.1 Implementar dados dos projetos e renderização
    - Definir array `projects` com objetos Project (title, description, technologies, url)
    - Implementar função `renderProjectCard(project)` que gera HTML do card
    - Implementar função `renderProjects(projects)` com validação (min 3, max 6)
    - Cards com URL: `<a target="_blank" rel="noopener noreferrer">`
    - Cards sem URL: sem link, badge "Em breve" como indicação visual
    - Truncar descrição a 150 caracteres se necessário
    - Chamar renderização no DOMContentLoaded
    - _Requisitos: 4.1, 4.2, 4.3, 4.4_

  - [x] 5.2 Implementar navegação com scroll suave
    - Adicionar event listeners nos links da navegação
    - Implementar scroll suave com `scrollIntoView({ behavior: 'smooth' })` ou `window.scrollTo` com duração máxima de 800ms
    - Prevenir comportamento padrão do link (preventDefault)
    - _Requisitos: 2.2_

  - [x] 5.3 Implementar detecção de seção ativa
    - Implementar função `getActiveSection(sections, scrollPosition, offset)`
    - Usar IntersectionObserver para detectar seção visível na viewport
    - Adicionar/remover classe `nav__link--active` no link correspondente
    - Implementar fallback com scroll event listener caso IntersectionObserver não seja suportado
    - _Requisitos: 2.4_

  - [x] 5.4 Implementar toggle do menu mobile
    - Implementar função `toggleMobileMenu(menuElement, toggleButton)`
    - Alternar classe de visibilidade no menu
    - Atualizar atributo `aria-expanded` no botão toggle
    - Fechar menu ao clicar em um link de navegação
    - Fechar menu ao clicar fora da área do menu
    - _Requisitos: 2.5, 3.3_

- [x] 6. Checkpoint - Verificar funcionalidades
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implementar testes de propriedade com fast-check
  - [x] 7.1 Configurar ambiente de testes
    - Instalar dependências de desenvolvimento: fast-check, vitest (ou jest), jsdom
    - Criar arquivo de configuração do test runner (vitest.config.js ou jest.config.js)
    - Criar diretório `tests/` com arquivo de setup para jsdom
    - _Requisitos: 5.1_

  - [ ]* 7.2 Escrever teste de propriedade para limite de caracteres da hero
    - **Propriedade 1: Limite de caracteres da descrição hero**
    - Gerar strings arbitrárias e validar que a descrição exibida nunca excede 200 caracteres
    - **Valida: Requisito 1.1**

  - [ ]* 7.3 Escrever teste de propriedade para navegação completa
    - **Propriedade 2: Navegação contém links para todas as seções**
    - Gerar arrays arbitrários de NavSection e validar que o HTML renderizado contém exatamente um link por seção
    - **Valida: Requisito 2.1**

  - [ ]* 7.4 Escrever teste de propriedade para detecção de seção ativa
    - **Propriedade 3: Detecção de seção ativa por posição de scroll**
    - Gerar posições de scroll e offsets de seções arbitrários; validar que getActiveSection retorna o ID correto
    - **Valida: Requisito 2.4**

  - [ ]* 7.5 Escrever teste de propriedade para toggle do menu mobile
    - **Propriedade 4: Toggle do menu mobile é um round-trip**
    - Gerar estado inicial arbitrário (aberto/fechado); invocar toggleMobileMenu duas vezes e validar retorno ao estado original
    - **Valida: Requisito 2.5**

  - [ ]* 7.6 Escrever teste de propriedade para renderização de card de projeto
    - **Propriedade 5: Renderização de card de projeto respeita restrições**
    - Gerar objetos Project arbitrários válidos; validar que o HTML contém título, descrição (≤150 chars) e ≥1 tecnologia
    - **Valida: Requisito 4.1**

  - [ ]* 7.7 Escrever teste de propriedade para comportamento condicional de links
    - **Propriedade 6: Detalhes do projeto em modal**
    - Gerar projetos com e sem `links`, `images` e `forSale`; validar o conteúdo do modal e os atributos dos links
    - **Valida: Requisitos 4.2, 4.3**

  - [ ]* 7.8 Escrever teste de propriedade para quantidade de projetos
    - **Propriedade 7: Quantidade mínima de projetos**
    - Gerar arrays de projetos; validar que todos os projetos da categoria selecionada são exibidos
    - **Valida: Requisito 4.4**

  - [ ]* 7.9 Escrever teste de propriedade para links externos com segurança
    - **Propriedade 8: Links externos abrem em nova aba com segurança**
    - Gerar URLs arbitrárias; validar presença de target="_blank" e rel="noopener noreferrer" no HTML
    - **Valida: Requisitos 4.2, 7.4**

  - [ ]* 7.10 Escrever teste de propriedade para cálculo de contraste
    - **Propriedade 9: Cálculo de contraste de cores**
    - Gerar pares de cores arbitrárias; validar simetria do resultado e conformidade com fórmula WCAG 2.1
    - **Valida: Requisito 5.4**

- [x] 8. Implementar otimizações de performance e acessibilidade
  - [x] 8.1 Implementar otimizações de imagens e carregamento
    - Adicionar atributo `loading="lazy"` em imagens abaixo do fold
    - Implementar `srcset` com tamanhos responsivos para imagens
    - Definir width/height explícitos para evitar layout shift
    - Adicionar atributos `alt` descritivos (max 125 chars) em imagens informativas e `alt=""` em decorativas
    - _Requisitos: 3.5, 5.1, 5.3_

  - [x] 8.2 Implementar função de cálculo de contraste WCAG
    - Criar função utilitária para calcular luminância relativa e ratio de contraste
    - Garantir que as cores escolhidas nos design tokens atendem 4.5:1 (texto normal) e 3:1 (texto grande)
    - Documentar cores utilizadas e seus ratios de contraste
    - _Requisitos: 5.4_

- [x] 9. Integração final e validação
  - [x] 9.1 Integrar todos os componentes e validar requisitos
    - Verificar ordem das seções: Hero → Sobre → Projetos → Contato
    - Confirmar navegação por teclado em todos os elementos interativos (Tab, Enter, Escape)
    - Testar menu mobile em viewport < 768px
    - Validar que JavaScript desabilitado não quebra o site (fallback funcional)
    - Confirmar que todos os links externos têm atributos de segurança
    - _Requisitos: 1.5, 2.1, 2.5, 5.5, 6.1_

  - [ ]* 9.2 Escrever testes de integração e acessibilidade automatizados
    - Configurar axe-core para validação WCAG AA
    - Configurar html-validate para verificar semântica HTML
    - Testar responsividade nos breakpoints (320px, 768px, 1024px, 1440px)
    - _Requisitos: 5.2, 5.4, 3.1, 3.2_

- [x] 10. Checkpoint final - Validar tudo funciona corretamente
  - Ensure all tests pass, ask the user if questions arise.

## Notas

- Tarefas marcadas com `*` são opcionais e podem ser ignoradas para um MVP mais rápido
- Cada tarefa referencia requisitos específicos para rastreabilidade
- Checkpoints garantem validação incremental
- Testes de propriedade validam propriedades universais de corretude
- Testes unitários validam exemplos específicos e edge cases
- O site deve funcionar sem JavaScript (degradação graciosa)
- Todas as cores devem ser validadas contra WCAG 2.1 nível AA

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5"] },
    { "id": 2, "tasks": ["3.1"] },
    { "id": 3, "tasks": ["3.2", "3.3"] },
    { "id": 4, "tasks": ["5.1", "5.2", "5.3", "5.4"] },
    { "id": 5, "tasks": ["7.1"] },
    { "id": 6, "tasks": ["7.2", "7.3", "7.4", "7.5", "7.6", "7.7", "7.8", "7.9", "7.10"] },
    { "id": 7, "tasks": ["8.1", "8.2"] },
    { "id": 8, "tasks": ["9.1", "9.2"] }
  ]
}
```
