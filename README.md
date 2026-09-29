# Portfólio | Felipe Jaques

Portfólio pessoal de Felipe Jaques, desenvolvedor de software full stack. O site reúne projetos, experiência profissional e formas de contato.

## Tecnologias

- React 19 e TypeScript
- Vite 6
- Framer Motion
- Lucide React
- Oxlint

## Requisitos

- Node.js 22 ou compatível
- npm (o projeto inclui `package-lock.json`)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

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

- `src/`: aplicação React, estilos e componentes
- `public/`: arquivos estáticos copiados para o build
- `dist/`: arquivos gerados por `npm run build` (não versionados)
- `.github/workflows/deploy.yml`: automação de build e publicação
