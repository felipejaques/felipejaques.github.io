export const contact = {
  email: 'felipejaques3@gmail.com',
  github: 'https://github.com/felipejaques',
  linkedin: 'https://linkedin.com/in/felipe-jaques',
}

export const currentYear = new Date().getFullYear()

export const navItems = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
]

export const categories = ['Web', 'Aplicativos', 'APIs', 'Server'] as const
export type Category = (typeof categories)[number]

export type ProjectLink = { label: string; url: string }
/** Paths are relative to public/; `thumb` is an optional lighter version for the gallery strip. */
export type ProjectImage = { src: string; alt: string; thumb?: string }

// Descriptions must stay within 150 characters (spec requirement 4.1).
// `details`, `images` and `links` feed the project modal; images live in public/projects/<slug>/.
export type Project = {
  number: string
  title: string
  description: string
  details?: string[]
  images?: ProjectImage[]
  stack: string[]
  links: ProjectLink[]
  category: Category
  /** Shows a "disponível para venda" badge and turns the contact button into a purchase inquiry. */
  forSale?: boolean
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'Alerta BR',
    description: 'Plataforma que cruza dados geográficos, demográficos e climáticos para antecipar riscos e apoiar decisões em todo o território nacional.',
    stack: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL'],
    details: [
      'Plataforma de prevenção a desastres naturais que monitora riscos climáticos em todo o Brasil, combinando dados geográficos, demográficos e meteorológicos em um índice de risco composto por município.',
      'O dashboard traz um mapa interativo com camadas de risco, precipitação e temperatura, além de alertas automáticos. Os relatórios mostram precipitação diária e acumulada e a evolução do índice de risco em janelas de 7, 30 e 90 dias. Há ainda simulações de cenários de impacto, como El Niño e La Niña.',
    ],
    images: [
      { src: 'projects/alertabr/inicio.jpg', thumb: 'projects/alertabr/inicio-thumb.jpg', alt: 'Tela inicial do AlertaBR com acesso a Dashboard, Relatórios e Cenários' },
      { src: 'projects/alertabr/mapa-de-risco.jpg', thumb: 'projects/alertabr/mapa-de-risco-thumb.jpg', alt: 'Mapa de Santa Catarina com o índice de risco por município e lista lateral de municípios' },
      { src: 'projects/alertabr/relatorios.jpg', thumb: 'projects/alertabr/relatorios-thumb.jpg', alt: 'Relatórios de Blumenau com gráficos de precipitação diária, acumulada e evolução do índice de risco' },
    ],
    links: [{ label: 'Repositório', url: 'https://github.com/felipejaques/alertabr' }],
    category: 'Web',
  },
  {
    number: '02',
    title: 'Finanças pessoais',
    description: 'Aplicativo mobile para acompanhar receitas, despesas e a vida financeira no dia a dia.',
    stack: ['Flutter', 'Java', 'PostgreSQL'],
    details: [
      'Aplicativo para organizar as finanças de forma prática: cadastro de contas bancárias e cartões de crédito, lançamento de receitas e despesas e transferências entre contas, com tags e observações para manter tudo em ordem.',
      'Um dashboard financeiro dá uma visão clara do saldo, das faturas em aberto e da evolução dos gastos. O projeto ainda está em desenvolvimento, com novas funcionalidades a caminho.',
    ],
    images: [
      { src: 'projects/financas-pessoais/visao-geral.jpg', alt: 'Telas do aplicativo de finanças pessoais no celular, com saldo e transferência, e o dashboard web no notebook' },
    ],
    links: [{ label: 'Repositório', url: 'https://github.com/felipejaques/person-finance-mobile' }],
    category: 'Aplicativos',
  },
  {
    number: '03',
    title: 'Dashboard financeiro',
    description: 'Painel web para visualizar e organizar dados de finanças pessoais em uma experiência simples.',
    stack: ['Angular', 'TypeScript', 'Java', 'PostgreSQL'],
    links: [{ label: 'Repositório', url: 'https://github.com/felipejaques/person-finance-front-end' }],
    category: 'Web',
  },
  {
    number: '04',
    title: 'Raspberry Awards',
    description: 'Consulta de vencedores do Golden Raspberry Awards, com filtros por ano e estatísticas de premiações.',
    stack: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL'],
    links: [{ label: 'Repositório', url: 'https://github.com/felipejaques/raspberry-awards-front-end' }],
    category: 'Web',
  },
  {
    number: '05',
    title: 'Recepção de hotel',
    description: 'API para gestão de reservas, check-in, check-out e cadastro de hóspedes.',
    stack: ['Java', 'Spring Boot', 'REST', 'PostgreSQL'],
    links: [{ label: 'Repositório', url: 'https://github.com/felipejaques/CRUD---hotel-reception' }],
    category: 'APIs',
  },
  {
    number: '06',
    title: 'HomeLab',
    description: 'Servidor doméstico com Armbian e CasaOS que orquestra containers Docker para mídia, downloads, serviços de rede e hospedagem de projetos pessoais.',
    details: [
      'Uma TV Box antiga ganhou uma segunda vida como mini servidor doméstico: com Armbian instalado no lugar do sistema original, o aparelho passou a rodar o CasaOS para gerenciar containers Docker.',
      'Hoje ele concentra serviços de mídia, downloads e rede, além de hospedar projetos pessoais, tudo com baixo consumo de energia. O passo a passo completo está no artigo publicado no LinkedIn.',
    ],
    images: [
      { src: 'projects/homelab/servidor.webp', alt: 'TV Box com a etiqueta "Servidor" na mão, em frente a um monitor exibindo o boot do Armbian' },
    ],
    stack: ['Linux', 'Armbian', 'CasaOS', 'Docker'],
    links: [{ label: 'Artigo no LinkedIn', url: 'https://www.linkedin.com/pulse/transformei-uma-tv-box-antigo-em-um-mini-servidor-com-felipe-jaques-whbcf' }],
    category: 'Server',
  },
]

export const skillGroups = [
  { title: 'Desenvolvimento', skills: ['Angular', 'React', 'TypeScript', 'Java', 'Spring Boot', 'Flutter'] },
  { title: 'Plataforma & dados', skills: ['Node.js', 'APIs REST', 'PostgreSQL', 'Oracle', 'MySQL', 'Docker'] },
  { title: 'Inteligência Artificial', skills: ['LLMs', 'MCP', 'IA generativa', 'AI-assisted development'] },
]

export const experience = [
  {
    company: 'Senior Sistemas',
    role: 'Desenvolvedor de software',
    period: 'MAI 2018 — ATUAL',
    location: 'Blumenau, SC',
    paragraphs: [
      'Atuação full stack em produtos da plataforma Ronda Senior X, com Angular, Java e Flutter. Participação em soluções como Security Hub, Gestão de Rotinas e Gestão de Ocorrências.',
      'Antes disso, desenvolvi soluções BPM para FIEP, Porto Seguro e CAIXA, e atuei na sustentação de produtos da Fábrica de Software.',
    ],
    tags: ['Angular', 'Java / Spring', 'Flutter', 'Node.js', 'Oracle'],
  },
  {
    company: 'SOU.IS Tecnologia e Sistemas',
    role: 'Suporte técnico',
    period: 'FEV 2017 — MAI 2018',
    location: 'Blumenau, SC',
    paragraphs: ['Suporte a sistemas ERP, ajudando clientes a manter seus processos e operações funcionando.'],
    tags: ['Suporte técnico', 'ERP'],
  },
]

export const education = [
  { period: '2018 — 2021', place: 'Unicesumar', detail: 'Análise e Desenvolvimento de Sistemas' },
  { period: '2016', place: 'SENAI Blumenau', detail: 'Aprendizagem Industrial em Informática' },
  { period: 'Formação complementar', place: 'Cursos e estudos contínuos', detail: 'Spring Boot, JavaScript ES6, UI Design e Flutter' },
]
