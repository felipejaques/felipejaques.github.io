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

// Descriptions must stay within 150 characters (spec requirement 4.1).
export type Project = {
  number: string
  title: string
  description: string
  stack: string[]
  url: string
  category: Category
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'Alerta BR',
    description: 'Plataforma que cruza dados geográficos, demográficos e climáticos para antecipar riscos e apoiar decisões em todo o território nacional.',
    stack: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL'],
    url: 'https://github.com/felipejaques/alertabr',
    category: 'Web',
  },
  {
    number: '02',
    title: 'Finanças pessoais',
    description: 'Aplicativo mobile para acompanhar receitas, despesas e a vida financeira no dia a dia.',
    stack: ['Flutter', 'Java', 'PostgreSQL'],
    url: 'https://github.com/felipejaques/person-finance-mobile',
    category: 'Aplicativos',
  },
  {
    number: '03',
    title: 'Dashboard financeiro',
    description: 'Painel web para visualizar e organizar dados de finanças pessoais em uma experiência simples.',
    stack: ['Angular', 'TypeScript', 'Java', 'PostgreSQL'],
    url: 'https://github.com/felipejaques/person-finance-front-end',
    category: 'Web',
  },
  {
    number: '04',
    title: 'Raspberry Awards',
    description: 'Consulta de vencedores do Golden Raspberry Awards, com filtros por ano e estatísticas de premiações.',
    stack: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL'],
    url: 'https://github.com/felipejaques/raspberry-awards-front-end',
    category: 'Web',
  },
  {
    number: '05',
    title: 'Recepção de hotel',
    description: 'API para gestão de reservas, check-in, check-out e cadastro de hóspedes.',
    stack: ['Java', 'Spring Boot', 'REST', 'PostgreSQL'],
    url: 'https://github.com/felipejaques/CRUD---hotel-reception',
    category: 'APIs',
  },
  {
    number: '06',
    title: 'HomeLab',
    description: 'Servidor doméstico com Armbian e CasaOS que orquestra containers Docker para mídia, downloads, serviços de rede e hospedagem de projetos pessoais.',
    stack: ['Linux', 'Armbian', 'CasaOS', 'Docker'],
    url: 'https://www.linkedin.com/pulse/transformei-uma-tv-box-antigo-em-um-mini-servidor-com-felipe-jaques-whbcf',
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
