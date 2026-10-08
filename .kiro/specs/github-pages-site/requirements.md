# Documento de Requisitos

## Introdução

Este documento define os requisitos para o site pessoal GitHub Pages (felipejaques.github.io). O site servirá como portfólio profissional e ponto de presença online, apresentando informações sobre o desenvolvedor, projetos realizados e formas de contato.

## Glossário

- **Site**: O site estático hospedado no GitHub Pages acessível via felipejaques.github.io
- **Visitante**: Qualquer pessoa que acessa o Site através de um navegador web
- **Seção_Hero**: Área principal de destaque na página inicial com apresentação do desenvolvedor
- **Seção_Sobre**: Área com informações profissionais e pessoais do desenvolvedor
- **Seção_Projetos**: Área que exibe os projetos e trabalhos realizados
- **Seção_Contato**: Área com informações e links para contato
- **Navegação**: Menu que permite ao Visitante acessar as diferentes seções do Site
- **Layout_Responsivo**: Capacidade do Site de se adaptar a diferentes tamanhos de tela (desktop, tablet, celular)

## Requisitos

### Requisito 1: Estrutura da Página Inicial

**User Story:** Como Visitante, eu quero ver uma página inicial bem estruturada, para que eu possa conhecer rapidamente o desenvolvedor e navegar pelo conteúdo.

#### Critérios de Aceitação

1. THE Site SHALL exibir a Seção_Hero com o nome do desenvolvedor e uma breve descrição profissional de no máximo 200 caracteres
2. THE Site SHALL exibir a Seção_Sobre com informações sobre experiência e habilidades do desenvolvedor
3. THE Site SHALL exibir a Seção_Projetos com cards dos projetos realizados em um grid
4. THE Site SHALL exibir a Seção_Contato com links para redes sociais e email
5. THE Site SHALL exibir as seções na ordem: Seção_Hero, Seção_Sobre, Seção_Projetos, Seção_Contato

### Requisito 2: Navegação

**User Story:** Como Visitante, eu quero navegar facilmente entre as seções do site, para que eu possa encontrar as informações que procuro.

#### Critérios de Aceitação

1. THE Navegação SHALL exibir links para todas as seções do Site
2. WHEN o Visitante clicar em um link da Navegação, THE Site SHALL rolar até a seção correspondente com uma animação de rolagem com duração máxima de 800ms
3. WHILE o Visitante rolar a página, THE Navegação SHALL permanecer visível e fixada no topo da tela
4. WHILE o Visitante estiver em uma seção, THE Navegação SHALL destacar visualmente o link correspondente à seção atualmente visível na viewport
5. WHEN a largura da viewport for inferior a 768px, THE Navegação SHALL exibir um botão de menu que, ao ser acionado, expande ou recolhe a lista de links de navegação

### Requisito 3: Layout Responsivo

**User Story:** Como Visitante, eu quero acessar o site de qualquer dispositivo, para que eu possa visualizar o conteúdo adequadamente em desktop, tablet ou celular.

#### Critérios de Aceitação

1. WHILE a largura da tela for maior que 768px, THE Site SHALL exibir o layout em formato desktop com múltiplas colunas
2. WHILE a largura da tela for menor ou igual a 768px, THE Site SHALL exibir o layout em formato mobile com coluna única
3. WHILE a largura da tela for menor ou igual a 768px, THE Navegação SHALL se transformar em um menu hamburguer
4. THE Site SHALL garantir que todos os elementos interativos possuam área de toque mínima de 44x44 pixels em dispositivos mobile
5. THE Site SHALL exibir imagens em tamanho adequado para a viewport atual, utilizando técnicas de imagens responsivas

### Requisito 4: Apresentação de Projetos

**User Story:** Como Visitante, eu quero ver os projetos do desenvolvedor com detalhes, para que eu possa avaliar a experiência técnica.

#### Critérios de Aceitação

1. THE Seção_Projetos SHALL exibir cada projeto com título, descrição de no máximo 150 caracteres e no mínimo 1 tecnologia utilizada
2. WHEN o Visitante clicar em um projeto, THE Site SHALL abrir o link do repositório ou demo em uma nova aba
3. IF o link do projeto não estiver disponível, THEN THE Site SHALL exibir o projeto sem link clicável e com indicação visual de que o link está indisponível
4. THE Seção_Projetos SHALL exibir no mínimo 3 e no máximo 6 projetos

### Requisito 5: Performance e Acessibilidade

**User Story:** Como Visitante, eu quero que o site carregue rapidamente e seja acessível, para que eu tenha uma boa experiência de uso.

#### Critérios de Aceitação

1. THE Site SHALL atingir um Time to Interactive (TTI) inferior a 3 segundos quando testado em uma conexão 3G simulada (1.6 Mbps download, 750 Kbps upload, 300ms RTT)
2. THE Site SHALL utilizar HTML semântico de modo que uma validação automatizada de HTML não reporte erros de uso de elementos semânticos (por exemplo: headings em ordem hierárquica, listas marcadas com elementos de lista, landmarks presentes para regiões principais)
3. THE Site SHALL incluir atributo alt descritivo com no máximo 125 caracteres em todas as imagens informativas, e atributo alt vazio (alt="") em todas as imagens decorativas
4. THE Site SHALL manter contraste de cores em conformidade com WCAG 2.1 nível AA (mínimo 4.5:1 para texto normal e 3:1 para texto grande)
5. THE Site SHALL permitir navegação completa por teclado, com indicadores de foco visíveis em todos os elementos interativos

### Requisito 6: Hospedagem no GitHub Pages

**User Story:** Como desenvolvedor, eu quero que o site seja hospedado via GitHub Pages, para que eu tenha hospedagem gratuita e deploy automático.

#### Critérios de Aceitação

1. THE Site SHALL ser composto exclusivamente por arquivos estáticos (HTML, CSS, JavaScript)
2. WHEN um commit for enviado para a branch principal, THE Site SHALL ser atualizado automaticamente pelo GitHub Pages em até 10 minutos
3. THE Site SHALL ser acessível pelo domínio felipejaques.github.io
4. THE Site SHALL retornar código de status HTTP 200 para a página principal quando acessado via HTTPS

### Requisito 7: Informações de Contato

**User Story:** Como Visitante, eu quero encontrar facilmente as formas de contato do desenvolvedor, para que eu possa entrar em contato profissionalmente.

#### Critérios de Aceitação

1. THE Seção_Contato SHALL exibir link para o perfil do GitHub com ícone identificável e texto descritivo
2. THE Seção_Contato SHALL exibir link para o perfil do LinkedIn com ícone identificável e texto descritivo
3. THE Seção_Contato SHALL exibir endereço de email para contato profissional com link mailto
4. WHEN o Visitante clicar em um link de rede social, THE Site SHALL abrir o perfil correspondente em uma nova aba com atributo rel="noopener noreferrer"
5. THE Seção_Contato SHALL exibir os links de contato em uma lista acessível por teclado
