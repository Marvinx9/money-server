<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <header>
    <h1>Administração de Finanças - Back-End</h1>
    <p>
      Este projeto é o back-end de uma aplicação web para administração de finanças, 
      responsável por gerenciar usuários, autenticação, transações financeiras e disponibilizar uma API RESTful para consumo pelo front-end. 
      A aplicação foi desenvolvida utilizando <strong>NestJS</strong> com <strong>PostgreSQL</strong> como banco de dados.
    </p>
  </header>

  <nav>
    <h2>Índice</h2>
    <ul>
      <li><a href="#funcionalidades">Funcionalidades</a></li>
      <li><a href="#pré-requisitos">Pré-requisitos</a></li>
      <li><a href="#instalação-e-configuração">Instalação e Configuração</a></li>
      <li><a href="#estrutura-do-projeto">Estrutura do Projeto</a></li>
      <li><a href="#tecnologias-utilizadas">Tecnologias Utilizadas</a></li>
      <li><a href="#contribuições">Contribuições</a></li>
      <li><a href="#licença">Licença</a></li>
    </ul>
  </nav>

  <section id="funcionalidades">
    <h2>Funcionalidades</h2>
    <ul>
      <li><strong>Gerenciamento de Usuários</strong>: Criação, atualização e exclusão de contas de usuário.</li>
      <li><strong>Autenticação</strong>: Sistema de login com geração de tokens JWT.</li>
      <li><strong>Gerenciamento de Transações</strong>: CRUD completo para transações financeiras.</li>
      <li><strong>Documentação da API</strong>: Disponível através do Swagger UI.</li>
      <li><strong>Validações e Segurança</strong>: Dados protegidos e validados antes de serem processados.</li>
    </ul>
  </section>

  <section id="pré-requisitos">
    <h2>Pré-requisitos</h2>
    <p>Antes de começar, você precisará ter instalado em sua máquina:</p>
    <ul>
      <li><strong>Node.js</strong> (versão >= 16)</li>
      <li><strong>npm</strong> ou <strong>yarn</strong></li>
      <li><strong>PostgreSQL</strong> (versão >= 12)</li>
      <li>Um navegador web moderno para acessar o Swagger UI.</li>
    </ul>
  </section>

  <section id="instalação-e-configuração">
    <h2>Instalação e Configuração</h2>
    <ol>
      <li><strong>Clone o repositório:</strong>
        <pre><code>git clone https://github.com/Marvinx9/money-server.git</code></pre>
      </li>
      <li><strong>Crie tabela de usuarios</strong>
        <pre><code>
	CREATE TABLE USERS (
	ID SERIAL PRIMARY KEY,
	NAME VARCHAR(50) NOT NULL,
	SURNAME VARCHAR(50) NOT NULL,
	E_MAIL VARCHAR(100) NOT NULL,
	PASSWORD VARCHAR(255) NOT NULL
	);
	</code></pre>
      </li>
      <li><strong>Crie tabela de transações</strong>
        <pre><code>
	CREATE TABLE TRANSACTIONS (
	ID SERIAL PRIMARY KEY,
	USER_ID INTEGER NOT NULL,
	TITLE VARCHAR(255),
	AMOUNT NUMERIC(10, 2) NOT NULL,
	CATEGORY VARCHAR(50),
	TYPE VARCHAR(1),
	CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
	);
	</code></pre>
      </li>
      <li><strong>Crie uma constraint</strong>
        <pre><code>
	ALTER TABLE TRANSACTIONS
	ADD CONSTRAINT PK_TRANSACTIONS_USER_ID
	FOREIGN KEY (USER_ID) REFERENCES USERS(ID);
	</code></pre>
      </li>
      <li><strong>Instale as dependências:</strong>
        <pre><code>npm install # ou yarn install</code></pre>
      </li>
      <li><strong>Configure o arquivo <code>.env</code>:</strong>
        <p>Crie um arquivo <code>.env</code> na raiz do projeto com as seguintes variáveis:</p>
        <pre><code>DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta</code></pre>
      </li>
      <li><strong>Inicie o projeto:</strong>
        <pre><code>npm run start:dev
# ou
yarn start:dev</code></pre>
      </li>
      <li><strong>Acesse a documentação da API:</strong> Abra <a href="http://localhost:3000/api">http://localhost:3000/api</a> no navegador.</li>
    </ol>
  </section>

  <section id="estrutura-do-projeto">
    <h2>Estrutura do Projeto</h2>
    <pre><code>src/
├── auth/              # Módulo de autenticação (JWT, Guards, etc.)
├── transactions/      # Módulo para gerenciar transações financeiras
├── users/             # Módulo de gerenciamento de usuários
├── database/          # Configuração e entidades do banco de dados
├── shared/            # Classes e serviços reutilizáveis
├── main.ts            # Ponto de entrada da aplicação NestJS
└── app.module.ts      # Módulo principal
    </code></pre>
  </section>

  <section id="tecnologias-utilizadas">
    <h2>Tecnologias Utilizadas</h2>
    <ul>
      <li><strong>NestJS</strong>: Framework para construção de aplicações Node.js.</li>
      <li><strong>SQL</strong>: Para interação com o banco de dados.</li>
      <li><strong>PostgreSQL</strong>: Banco de dados relacional.</li>
      <li><strong>Swagger</strong>: Documentação interativa da API.</li>
      <li><strong>JWT</strong>: Gerenciamento de autenticação segura.</li>
    </ul>
  </section>

  <section id="contribuições">
    <h2>Contribuições</h2>
    <p>Contribuições são bem-vindas! Siga os passos abaixo para contribuir:</p>
    <ol>
      <li>Faça um fork do projeto.</li>
      <li>Crie uma branch para sua feature ou correção:
        <pre><code>git checkout -b minha-feature</code></pre>
      </li>
      <li>Faça commit das suas alterações:
        <pre><code>git commit -m "Adiciona nova funcionalidade"</code></pre>
      </li>
      <li>Envie para o repositório remoto:
        <pre><code>git push origin minha-feature</code></pre>
      </li>
      <li>Abra um pull request no GitHub.</li>
    </ol>
  </section>

  <section id="licença">
    <h2>Licença</h2>
    <p>Este projeto está licenciado sob a <a href="./LICENSE">MIT License</a>.</p>
  </section>
</body>
</html>
