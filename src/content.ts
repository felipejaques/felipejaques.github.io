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
/** Shown in the project modal as "Problema / Decisões técnicas / Dificuldades / Aprendizados". */
export type CaseStudy = { problem: string; decisions: string[]; challenges: string[]; learnings: string[] }

// Descriptions must stay within 150 characters (spec requirement 4.1).
// `details`, `images` and `links` feed the project modal; images live in public/projects/<slug>/.
export type Project = {
  number: string
  title: string
  description: string
  details?: string[]
  images?: ProjectImage[]
  caseStudy?: CaseStudy
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
    caseStudy: {
      problem: 'Os dados que ajudam a prever desastres estão espalhados em fontes públicas diferentes (IBGE, INMET, ANA), cada uma com seu formato. Faltava uma visão única do risco por município para que Defesa Civil, pesquisadores e cidadãos pudessem agir antes do problema.',
      decisions: [
        'FastAPI com SQLAlchemy assíncrono: a ingestão faz muitas chamadas a APIs externas, e o I/O assíncrono evita que elas travem a API.',
        'PostgreSQL com PostGIS em vez de um banco de documentos, para resolver no próprio banco as consultas espaciais, como malhas municipais e estação mais próxima com ST_Distance.',
        'Motor de regras em vez de machine learning: o índice de 0 a 100 (40% clima, 30% geografia, 30% social) é explicável, e quem recebe um alerta precisa entender o motivo.',
        'Leaflet em vez de Mapbox, por ser open source e não cobrar por requisição.',
        'Ambiente completo em Docker Compose (API, front-end, PostGIS e Redis) com healthchecks, e decisões registradas em ADRs.',
      ],
      challenges: [
        'Integrar o web service SOAP da ANA, com envelopes XML montados à mão e parsing tolerante a variações de namespace e de estrutura da resposta.',
        'Limpar dados reais: vírgula decimal, leituras de sensores com defeito, vários formatos de data em UTC-3 e medições duplicadas.',
        'Respeitar os limites das APIs públicas com retry, backoff e intervalo entre as chamadas.',
        'Tornar navegáveis os 5.570 municípios no mapa, com drill-down de estado para município.',
      ],
      learnings: [
        'Em projetos de dados, a maior parte do esforço está na ingestão e na limpeza, não na visualização.',
        'Interpretabilidade é requisito: quando a decisão é pública, um modelo simples e explicável vale mais que um preciso e opaco.',
        'Próximos passos: agendar a ingestão automaticamente e ampliar a cobertura de testes.',
      ],
    },
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
    caseStudy: {
      problem: 'Planilhas e apps genéricos não lidam bem com cartão de crédito de verdade: faturas, compras parceladas e pagamentos que mexem no saldo de contas diferentes. Eu queria um controle financeiro que refletisse essa realidade.',
      decisions: [
        'Um único back-end em Spring Boot 3 e Java 17 atende o app Flutter e o dashboard web.',
        'Schema versionado com Flyway e JPA em modo validate: o banco evolui por migrações e o mapeamento nunca altera o schema por conta própria.',
        'Login com Google: o app obtém o ID token, o back-end o valida com o verificador oficial do Google e emite um JWT próprio.',
        'Flutter com Provider para o estado, e URL da API via --dart-define para trocar de ambiente sem mexer no código.',
      ],
      challenges: [
        'Modelar o cartão de crédito, com parcelas distribuídas em faturas futuras, fechamento e pagamento de fatura. É o módulo mais complexo do back-end.',
        'Evoluir o modelo sem perder dados: carteira multibanco, cartões e login Google entraram como migrações incrementais.',
        'Vincular o login Google a usuários já cadastrados pelo e-mail, sem duplicar contas.',
      ],
      learnings: [
        'Regras financeiras parecem simples até surgirem parcelas e faturas. Modelar o domínio antes da tela evita retrabalho.',
        'Migrações versionadas desde o primeiro dia deixam a evolução do banco previsível.',
        'Próximos passos: fluxos de cartão no app, aba de planejamento e testes automatizados.',
      ],
    },
    links: [{ label: 'Repositório', url: 'https://github.com/felipejaques/person-finance-mobile' }],
    category: 'Aplicativos',
  },
  {
    number: '03',
    title: 'Dashboard financeiro',
    description: 'Painel web para visualizar e organizar dados de finanças pessoais em uma experiência simples.',
    stack: ['Angular', 'TypeScript', 'Java', 'PostgreSQL'],
    caseStudy: {
      problem: 'No celular é fácil lançar uma despesa, mas analisar o mês e organizar contas, cartões e categorias pede uma tela maior.',
      decisions: [
        'Cliente web do mesmo back-end do app de finanças, reaproveitando a API e a autenticação JWT.',
        'Angular organizado em core (guards, interceptors e serviços), shared e módulos por funcionalidade: carteiras, bancos, categorias, cartões, transações e dashboard.',
        'Interceptor HTTP para anexar o token e guards para proteger as rotas.',
        'PrimeNG e Chart.js para componentes e gráficos prontos.',
        'Imagem Docker multi-stage servida por Nginx.',
      ],
      challenges: [
        'Manter as regras financeiras consistentes entre web e mobile consumindo a mesma API.',
        'Servir uma SPA em Nginx sem erro 404 ao recarregar uma rota interna.',
      ],
      learnings: [
        'Separar o código por funcionalidade mantém o projeto fácil de navegar conforme ele cresce.',
        'Próximo passo: atualizar a versão do Angular, que ficou para trás.',
      ],
    },
    links: [{ label: 'Repositório', url: 'https://github.com/felipejaques/person-finance-front-end' }],
    category: 'Web',
  },
  {
    number: '04',
    title: 'Raspberry Awards',
    description: 'Consulta de vencedores do Golden Raspberry Awards, com filtros por ano e estatísticas de premiações.',
    stack: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL'],
    caseStudy: {
      problem: 'Desafio técnico de processo seletivo: a partir da lista de indicados e vencedores do Golden Raspberry Awards, encontrar os produtores com o menor e o maior intervalo entre duas vitórias e montar um painel para explorar os dados.',
      decisions: [
        'Back-end em Spring Boot com H2 em memória, que carrega o CSV na inicialização: sem dependências externas, roda com um único comando.',
        'Endpoint que devolve todos os produtores empatados no menor e no maior intervalo, e não apenas um.',
        'Front-end em Angular 21 com SSR, lista paginada com filtros por ano e vencedor, e testes com Vitest.',
      ],
      challenges: [
        'Normalizar o campo de produtores, que mistura separadores como em "A, B and C".',
        'Calcular os intervalos só entre vitórias consecutivas do mesmo produtor e tratar os empates.',
      ],
      learnings: [
        'Um teste de integração no endpoint dá segurança para refatorar a regra de cálculo.',
        'Desafios curtos são uma boa oportunidade para experimentar versões novas do ecossistema, como Angular 21 e Vitest.',
      ],
    },
    links: [{ label: 'Repositório', url: 'https://github.com/felipejaques/raspberry-awards-front-end' }],
    category: 'Web',
  },
  {
    number: '05',
    title: 'Recepção de hotel',
    description: 'API para gestão de reservas, check-in, check-out e cadastro de hóspedes.',
    stack: ['Java', 'Spring Boot', 'REST', 'PostgreSQL'],
    caseStudy: {
      problem: 'Desafio técnico: uma API para a recepção de um hotel cadastrar hóspedes, fazer check-in e check-out e calcular o valor da hospedagem.',
      decisions: [
        'API REST em Spring Boot com JPA e PostgreSQL, organizada em controller, service e repository.',
        'Regras de cobrança concentradas no serviço de check-in: diária diferente em dias úteis e fins de semana, estacionamento opcional e taxa extra por saída após o horário.',
        'Busca de hóspedes por nome, documento ou telefone.',
      ],
      challenges: [
        'Calcular o valor dia a dia, considerando quais dias do período caem no fim de semana.',
      ],
      learnings: [
        'Olhando hoje, eu usaria java.time no lugar de Date e Calendar, o que evita erros como confundir os formatos de 12 e 24 horas na regra do horário de saída.',
        'Também trataria as exceções de parsing em vez de ignorá-las e cobriria as regras de cobrança com testes unitários.',
      ],
    },
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
    caseStudy: {
      problem: 'Hospedar projetos pessoais e serviços de casa sem pagar por nuvem nem manter um computador ligado o dia inteiro.',
      decisions: [
        'Reaproveitar uma TV Box antiga, de baixo consumo, em vez de comprar hardware novo.',
        'Trocar o sistema original pelo Armbian para ter um Linux completo.',
        'Usar o CasaOS para gerenciar os containers Docker por uma interface web.',
        'Rodar cada serviço no seu próprio container, isolado e fácil de atualizar ou remover.',
      ],
      challenges: [
        'Instalar um sistema não oficial em um hardware sem suporte do fabricante.',
        'Encaixar vários serviços nos limites de CPU e memória do aparelho.',
      ],
      learnings: [
        'Prática de Linux, redes e containers fora do ambiente corporativo.',
        'Documentar o processo virou um artigo no LinkedIn, que ajuda quem quer fazer o mesmo.',
      ],
    },
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
