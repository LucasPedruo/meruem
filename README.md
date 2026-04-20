# Meruem - Plataforma Colaborativa FullDev

Bem-vindo ao projeto colaborativo **Meruem**! Este repositório é mantido por voluntários da comunidade FullDev e tem como objetivo criar uma plataforma moderna para conectar membros, divulgar avisos, eventos e facilitar o acesso aos grupos de ajuda da comunidade.

---

## Visão Geral

O Meruem é a nova plataforma de links da comunidade FullDev, permitindo que qualquer pessoa entre nos grupos de WhatsApp, acesse avisos, links úteis e participe dos eventos e iniciativas voluntárias. Esta versão está sendo desenvolvida em **Angular**, refatorando o modelo anterior feito em **React** ([fulldev.com.br](https://fulldev.com.br)).

O Backend e o UI/UX já estão estruturados e a equipe está focada em entregar uma experiência moderna, acessível e colaborativa.

---

## Equipe de Desenvolvimento

- **Kaynan**: Backend (Membro do conselho da comunidade)
- **Lucas Pedro**: Owner do projeto
- **Wagner**: Front-End Senior
- **Henrike**: Front-End Jr
- **Maria**: Front-End Jr / Estágio
- **Natan**: Organização de Issues (Membro do conselho)

Todos os membros são voluntários e colaboram para o crescimento da comunidade.

---

## Organização e Comunicação

- **Figma UI/UX**: [Acessar Figma](https://www.figma.com/design/TFZk7pEOmlobbXcDBTtQEn/FullDev-Meruem?node-id=3-421&t=mFN4fvdbZgYkMOxY-1)
- **GitHub Projects**: Organização das issues e tarefas do projeto
- **Slack**: Em breve migração para organização dos projetos

---

## Stack e Principais Bibliotecas

### Frontend

- **Angular**: 20.3+
- **TypeScript**: 5.9+
- **SCSS**: Padrão para estilização

### Lint/Padronização

- **ESLint**: 9.36+
- **Prettier**: 3.6+
- **Husky**: 9.1+
- **lint-staged**: 16.2+

### Testes

- **Jasmine**: 5.9+
- **Karma**: 6.4+

### Ferramentas de Apoio

- **VS Code**
- **Figma**
- **GitHub Projects**

---

## VS Code Theme (FullDev)

[![FullDev Beru Theme](https://img.shields.io/badge/VS%20Code-FullDev%20Beru%20Theme-007ACC?logo=visualstudiocode&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=FullDev.beru-theme)

Use este botao para instalar/abrir o tema no Marketplace e testar a aparencia do projeto no VS Code.

---

## Boas Práticas Aplicadas

- **Padronização de Código:**
  - ESLint e Prettier configurados para garantir consistência e legibilidade.
  - Husky e lint-staged integrados para rodar lint e format automaticamente em pre-commit.
  - Style guide definido no `.prettierrc` e regras recomendadas do ESLint + @typescript-eslint.
- **Organização de Branches:**
  - Branches criadas para cada tarefa ou melhoria (`chore/configuracao-padrao-husky-eslint-prettier`, etc).
- **Documentação:**
  - README completo e atualizado.
  - Issues organizadas no GitHub Projects.
- **Testes:**
  - Testes unitários com Jasmine/Karma.
  - Scripts para rodar lint, format e testes facilmente.
- **Colaboração:**
  - Comunicação ativa via WhatsApp, Slack e GitHub.
  - Figma para UI/UX compartilhado.

---

## Como Contribuir

1. **Confirme seu e-mail no GitHub para acesso ao repositório.**
2. **Participe do grupo Time FullDev para integração com a equipe.**
3. **Confira as issues no GitHub Projects e converse com o Natan para dúvidas sobre tarefas.**
4. **Siga o style guide e as ferramentas de padronização (ESLint, Prettier, Husky).**
5. **Participe das plannings semanais (dia a definir por enquete).**

---

## Como Rodar o Projeto

```sh
npm install
ng serve
```

Acesse [http://localhost:4200](http://localhost:4200) para visualizar a aplicação.

---

## Testes e Padronização

- **Lint:** `npm run lint`
- **Format:** `npm run format`
- **Testes unitários:** `ng test`
- **Pre-commit:** Husky executa lint e prettier automaticamente, e também build para evitar quebras do sistema.

---

## Documentação e Recursos

- [Angular CLI](https://angular.dev/tools/cli)
- [Figma do projeto](https://www.figma.com/design/TFZk7pEOmlobbXcDBTtQEn/FullDev-Meruem?node-id=3-421&t=mFN4fvdbZgYkMOxY-1)
- [Site antigo (React)](https://fulldev.com.br)

---

> Este projeto é feito por voluntários e para voluntários. Sinta-se à vontade para se apresentar, trocar LinkedIn e colaborar!

---

Todos os direitos reservados à FullDev • 2025

---

## ✅ Estrutura de Pastas Implementada

O projeto agora possui uma estrutura organizacional limpa e escalável:

```
src/app/
├── core/                    # Funcionalidades core da aplicação (futuro)
│   └── services/           # Serviços globais (preparado para expansão)
├── shared/                 # Componentes e utilitários reutilizáveis
│   ├── components/         # Componentes compartilhados (organizados)
│   ├── directives/         # Diretivas personalizadas (preparado)
│   └── pipes/              # Pipes personalizados (preparado)
├── features/               # Páginas da aplicação (organizadas)
│   ├── home/              # Página inicial
│   ├── sobre/             # Página sobre
│   ├── contato/           # Página de contato
│   ├── voluntario/        # Página de voluntários
│   └── grupos/            # Página de grupos
└── layouts/               # Layouts da aplicação (preparado)
    └── main-layout/       # Layout principal (estrutura criada)
```

### ✅ Critérios de Aceite Atendidos

**✅ Projeto roda sem erros com `ng serve`**

- Todos os componentes funcionando como antes
- Nenhuma funcionalidade foi alterada

**✅ Linting e formatting funcionando**

- ESLint configurado para TypeScript
- Prettier formatando todos os arquivos
- Pre-commit hooks mantidos

**✅ Estrutura de pastas documentada no README**

- Documentação completa da nova organização
- Arquivo index.ts em cada pasta para facilitar imports
- Estrutura preparada para crescimento futuro

### 🎯 O que foi feito

**Organização Estrutural:**

- ✅ Criadas pastas `core/`, `shared/`, `features/`, `layouts/`
- ✅ Arquivos `index.ts` para organizar exports
- ✅ Estrutura preparada para serviços, componentes, pipes e diretivas
- ✅ Mantida toda funcionalidade existente intacta

**Benefícios:**

- 📁 **Organização**: Código bem estruturado e fácil de navegar
- 🔄 **Escalabilidade**: Pronto para adicionar novos recursos
- 🤝 **Colaboração**: Estrutura clara para toda a equipe
- 🛠️ **Manutenção**: Fácil localizar e modificar componentes

A estrutura está pronta para receber novos componentes, serviços e funcionalidades de forma organizada! 🎉
