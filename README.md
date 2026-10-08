# Portfólio | Felipe Jaques

Portfólio pessoal de Felipe Jaques, desenvolvedor de software full stack. O site reúne projetos, experiência profissional e formas de contato.

## Tecnologias

- React 19 e TypeScript
- Vite 6
- Framer Motion
- Lucide React
- Oxlint

## Requisitos

- Node.js 22 (versão em `.nvmrc`, usada também pela CI; mínimo 20)
- npm (o projeto inclui `package-lock.json`)

## Comandos disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Verifica os tipos e gera a versão de produção em dist/
npm run preview  # Serve localmente o build de produção
npm run lint     # Executa o Oxlint
```

Para testar a versão de produção localmente:

```bash
npm run build
npm run preview
```

## Estrutura principal

- `src/content.ts`: textos e dados do site (projetos, experiência, formação, habilidades, contato)
- `src/components/`: uma seção da página por componente (`Header`, `Hero`, `Projects`…)
- `src/theme.ts`: tema claro/escuro (segue o sistema até o visitante escolher; a escolha fica no `localStorage`)
- `src/App.css` e `src/index.css`: estilos e variáveis de cor de cada tema
- `public/`: arquivos estáticos copiados para o build (avatar em WebP, `og-image.jpg` para compartilhamento)
- `dist/`: arquivos gerados por `npm run build` (não versionados)
- `.github/workflows/deploy.yml`: a cada push na `main`, roda lint e build e publica no GitHub Pages
