
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
SAL/
├── controllers/        # Controladores de rotas
├── models/             # Definições de modelos do banco de dados
├── routes/             # Definição de rotas
├── views/              # Arquivos de interface do usuário (se aplicável)
├── public/             # Arquivos estáticos como CSS, JS, imagens
├── config/             # Configurações da aplicação, como conexão com banco de dados
├── .env.example        # Exemplo de variáveis de ambiente
├── package.json        # Dependências e scripts do projeto
├── README.md           # Documentação do projeto
└── ...                 # Outros arquivos relevantes
```

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) - Versão 14 ou superior
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) - Gerenciador de pacotes
- [MySQL](https://www.mysql.com/) - Banco de dados

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/AndersonReis04/SAL.git
   cd SAL
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configuração do banco de dados:**

   - Certifique-se de ter o MySQL configurado.
   - Copie o arquivo `.env.example` para `.env` e preencha com suas informações de banco de dados:

   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=sua-senha
   DB_NAME=nome-do-banco
   ```

4. **Execute as migrações e seeds (se houver):**

   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

## Uso

Para iniciar o servidor, use o comando:

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`.

### Endpoints

- `GET /api/reservas`: Obtém todas as reservas de laboratórios.
- `POST /api/reservas`: Cria uma nova reserva de laboratório.
- `GET /api/professores`: Obtém todos os professores.
- `GET /api/laboratorios`: Obtém todos os laboratórios.
- ...

### Interface

A interface do usuário pode ser acessada em `http://localhost:3000`. Nela, é possível visualizar e agendar laboratórios.

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
