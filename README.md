
# SAL - Sistema de Agendamentos de Laboratórios

**Descrição:**  
O SAL é um sistema projetado para facilitar o agendamento e gerenciamento de laboratórios em instituições de ensino. Ele permite que professores reservem laboratórios para suas aulas de forma simples e organizada.

## Índice

- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/        # Controladores de rotas
│   ├── models/             # Definições de modelos do banco de dados
│   │   ├── connection/
│   │   ├── login/
│   │   ├── labsModels.js
│   │   ├── markModels.js
│   │   ├── profModels.js
│   │   └── reqsModels.js
│   ├── app.js              # Arquivo principal da aplicação
│   ├── requisicao.js       # Lógica de requisição
│   ├── router.js           # Definição de rotas
│   ├── server.js           # Configuração do servidor
│   └── verificador-email.js # Verificação de email
├── .env.exemple            # Exemplo de variáveis de ambiente
├── eslint.config.mjs       # Configuração do ESLint
├── package-lock.json       # Arquivo de lock das dependências
└── package.json            # Dependências e scripts do projeto

frontend/
├── public/                 # Arquivos estáticos
│   ├── index.html          # HTML principal
│   └── logo.svg            # Logo da aplicação
└── src/
    ├── assets/             # Recursos como imagens, fontes etc.
    ├── components/         # Componentes do React
    │   ├── Carousel/
    │   ├── Hamburger/
    │   ├── header/
    │   ├── Inputs/
    │   ├── LabsSelect/
    │   ├── Login/
    │   ├── Reserva/
    │   ├── Select/
    │   └── Table/
    ├── pages/              # Páginas da aplicação
    ├── App.css             # Estilos principais da aplicação
    ├── App.jsx             # Componente principal do React
    ├── index.css           # Estilos globais
    └── main.jsx            # Ponto de entrada do React
├── .eslintrc.cjs           # Configuração do ESLint para o frontend
├── .gitignore              # Arquivos e pastas a serem ignorados pelo git
├── package-lock.json       # Arquivo de lock das dependências do frontend
├── package.json            # Dependências e scripts do frontend
├── README.md               # Documentação do frontend
└── vite.config.js          # Configuração do Vite

.gitignore                  # Arquivos e pastas a serem ignorados pelo git (raiz do projeto)
exemplo-01.md               # Exemplo de documentação
package-lock.json           # Arquivo de lock das dependências (raiz do projeto)
package.json                # Dependências e scripts do projeto (raiz do projeto)
README.md                   # Documentação do projeto (raiz do projeto)

```

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) - Versão 14 ou superior
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) - Gerenciador de pacotes
- [MySQL](https://www.mysql.com/) - Versão 5.7 (Recomendado via docker)
- 
## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/AndersonReis04/SAL.git
   cd SAL
   ```

2. **Instale as dependências:**

   ```bash
   npm run install:all
   ```

3. **Configuração do banco de dados:**

   - Certifique-se de ter o MySQL configurado.
   - Copie o arquivo `.env.example` para `.env` e preencha com suas informações de banco de dados:

   ```bash
   HOST=192.168.1.40
   USER=root
   PASS=sua-senha
   NAME=nome-do-banco
   ```

## Uso

Para iniciar os servidores em modo de desenvolvimento, use o comando:

```bash
npm run dev
```

O servidor backend estará disponível em `http://192.168.1.40:3333`.
### Uso (Linux)

Algumas notas específicas para rodar o projeto em Linux:

- Arquivos de configuração
   - Edite os arquivos de configuração do projeto (por exemplo `config.js` e `connection.js`) antes de executar, pois determinados scripts não leem automaticamente o `.env`. Esses arquivos geralmente estão na pasta `backend` (ou em `backend/src` / `backend/src/models/connection` dependendo da organização do seu repositório). Ajuste host, usuário, senha e nome do banco conforme necessário.

- Ajuste do executável Python
   - Em Linux o comando padrão para Python costuma ser `python3`. Abra o arquivo que executa o script Python (por exemplo `backend/src/controllers/processXlsxController.js`) e substitua chamadas que usam `python` por `python3`.
   - Exemplo (antes → depois):
      - Antes:
         - exec('python path/to/script.py', ... )
      - Depois:
         - exec('python3 path/to/script.py', ... )

- Alternativa portátil (recomendada)
   - Para manter compatibilidade entre Windows e Linux, considere:
      - Colocar um shebang no script Python (`#!/usr/bin/env python3`) e marcar o arquivo como executável; então chame diretamente o script.
      - Ou no código Node detectar a plataforma e escolher `python` ou `python3` dinamicamente:
         - const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
         - exec(`${pythonCmd} path/to/script.py`, ...)

- Reiniciar e testar
   - Após ajustar as configurações e as chamadas ao Python, reinicie o servidor de desenvolvimento:
      - npm run dev
   - Verifique os logs para confirmar que a chamada ao script Python foi executada corretamente.

Essas alterações deixam o projeto pronto para execução em ambientes Linux sem impactar o fluxo de desenvolvimento no Windows.

### Endpoints (192.168.1.40:3333)

- `GET /marks`: Obtém todas as reservas de laboratórios.
- `POST /marks`: Cria uma nova reserva de laboratório.
- `GET /prof`: Obtém todos os professores.
- `GET /labs`: Obtém todos os laboratórios.
- `GET /reqs`: Obtém todas as requisições.
- ...

### Interface

A interface do usuário pode ser acessada em `http://192.168.1.40:5173`. Nela, é possível visualizar e agendar laboratórios.

## Contribuição

Contribuições são bem-vindas! Por favor, siga os passos abaixo para contribuir:

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b minha-feature`).
3. Faça suas alterações e commit (`git commit -m 'Minha nova feature'`).
4. Envie para o repositório (`git push origin minha-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Anderson Reis - [anderson@example.com](mailto:anderson@example.com)

[GitHub](https://github.com/AndersonReis04) | [LinkedIn](https://linkedin.com/in/anderson-reis)
