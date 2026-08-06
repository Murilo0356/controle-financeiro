# Documentação do Projeto: FinDesk (Front-end)

O **FinDesk** é uma aplicação web voltada para a gestão de finanças pessoais. Este repositório contém o código-fonte da camada de interface de usuário (Front-end), desenvolvida com a biblioteca React e empacotada com Vite.

---

## SUMÁRIO

1. Visão Geral da Arquitetura
2. Requisitos do Sistema e Dependências
3. Estrutura de Diretórios
4. Módulos e Fluxos da Aplicação
5. Camada de Autenticação e Segurança
6. Instalação e Execução
7. Integração Futura com o Back-end

---

## 1. VISÃO GERAL DA ARQUITETURA

A interface foi concebida seguindo o modelo de Aplicação de Página Única (Single Page Application - SPA). O roteamento interno é gerenciado pelo `react-router-dom`, permitindo transições entre telas sem a necessidade de recarregar a página.

A arquitetura está dividida em três camadas principais:
* **Camada de Visão (Pages e Componentes):** Responsável pela renderização dos elementos de interface, formulários, capturas de eventos e tratamento de layout responsivo.
* **Camada de Serviços (Services):** Concentra a lógica de comunicação com APIs externas ou simuladores (mocks) de dados.
* **Camada de Utilitários (Utils):** Funções auxiliares reutilizáveis para validação de dados (como validação de e-mail e cálculo de força de senha).

---

## 2. REQUISITOS DO SISTEMA E DEPENDÊNCIAS

### Pré-requisitos
* Node.js (versão 18.0.0 ou superior)
* Gerenciador de pacotes npm (versão 9.0.0 ou superior) ou Yarn

### Principais Dependências
* **react:** Biblioteca base para construção dos componentes de interface.
* **react-dom:** Pacote de integração do React com o DOM do navegador.
* **react-router-dom:** Biblioteca responsável pelo gerenciamento de rotas e navegação.
* **react-icons:** Conjunto de ícones vetoriais em formato de componentes React.
* **vite:** Ferramenta de compilação rápida para projetos web modernos.

---

## 3. ESTRUTURA DE DIRETÓRIOS

```text
src/
├── assets/             # Recursos estáticos (imagens, logotipos, SVG)
├── Componentes/        # Componentes globais de controle de acesso
│   └── RotaProtegida.jsx
├── Pages/              # Módulos das telas da aplicação
│   ├── Cadastro/       # Tela de registro de novos usuários
│   ├── Componentes/   # Componentes reutilizáveis de tela (ex: SideBar)
│   ├── Dashboard/      # Painel principal de estatísticas e navegação
│   ├── EsquecerSenha/  # Telas de solicitação e redefinição de senha
│   ├── Login/          # Tela de entrada e autenticação
│   └── Perfil/         # Gerenciamento de perfil e alteração de senha
├── services/           # Regras de negócio, mocks e chamadas à API
│   ├── authService.js
│   └── dashboardService.js
├── utils/              # Funções utilitárias de validação
│   ├── ValidarEmail.js
│   └── ValidarSenha.js
├── App.jsx             # Declaração das rotas da aplicação
├── main.jsx            # Ponto de entrada do React no DOM
└── index.css           # Estilos globais e reset de CSS