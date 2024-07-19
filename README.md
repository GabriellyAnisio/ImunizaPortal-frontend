# README - Front-end do Sistema de Agendamento de Vacinação

## Descrição

Este repositório contém o front-end para o sistema de agendamento de vacinação contra COVID-19. A aplicação permite aos usuários agendar pacientes para vacinação e consultar os agendamentos por dia e horário.

## Requisitos

- **Agendamento**: Feito através de um formulário com validação.
- **Disponibilidade**: Exibição de 20 vagas por dia, com 2 agendamentos por horário.
- **Consulta**: Página para visualizar agendamentos agrupados por dia e horário.
- **Intervalo**: 1 hora entre agendamentos.

## Regras de Negócio

- **Informações do Paciente**: Nome, data de nascimento, dia e horário do agendamento.
- **Validação**: Formulários validados usando Formik (com Yup) ou React Hook Forms (ZOD).
- **Feedback**: Mensagem de sucesso em um modal/popup.
- **Persistência**: Dados não devem ser perdidos ao recarregar a página.

## Tecnologias Utilizadas

- **Front-end**: React, react-datepicker, Formik (com Yup) ou React Hook Forms (ZOD), ContextAPI.
- **Client HTTP**: Axios.

## Instalação

### Requisitos

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passos para Instalação

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/GabriellyAnisio/ImunizaPortal-frontend.git
    ```

2. **Navegue para o diretório do projeto**:

    ```bash
    cd ImunizaPortal-frontend
    ```

3. **Instale as dependências**:

    ```bash
    npm install
    # ou
    yarn install
    ```

4. **Inicie o servidor de desenvolvimento**:

    ```bash
    npm start
    # ou
    yarn start
    ```

## Contato

Para dúvidas ou mais informações, entre em contato com [mgabriellyanisio@gmail.com](mailto:mgabriellyanisio@gmail.com).

