# 📝 Blog Pessoal API

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)

Uma API REST moderna e escalável para gerenciamento de postagens de blog, construída com NestJS e TypeScript.

[Funcionalidades](#-funcionalidades) •
[Tecnologias](#-tecnologias) •
[Instalação](#-instalação) •
[Uso](#-uso) •
[API](#-endpoints-da-api) •
[Estrutura](#-estrutura-do-projeto)

</div>

---

## ✨ Funcionalidades

### 📝 Postagens
- ✅ Criar postagens
- ✅ Listar todas as postagens (protegido por JWT)
- ✅ Buscar postagem por ID (protegido por JWT)
- ✅ Buscar postagens por título (protegido por JWT)
- ✅ Atualizar postagens (protegido por JWT)
- ✅ Deletar postagens (protegido por JWT)

### 👥 Usuários
- ✅ Criar usuários (registro público)
- ✅ Listar usuários (protegido por JWT)
- ✅ Buscar usuário por ID (protegido por JWT)
- ✅ Buscar usuários por email ou username (protegido por JWT)
- ✅ Atualizar usuários (protegido por JWT)
- ✅ Deletar usuários (protegido por JWT)
- ✅ **Senhas nunca são retornadas nos responses** 🔐

### 🏷️ Temas
- ✅ Criar temas (protegido por JWT)
- ✅ Listar todos os temas (protegido por JWT)
- ✅ Buscar tema por ID (protegido por JWT)
- ✅ Buscar temas por descrição (protegido por JWT)
- ✅ Atualizar temas (protegido por JWT)
- ✅ Deletar temas (protegido por JWT)

### 🔐 Autenticação
- ✅ Login com email e senha
- ✅ Geração de JWT tokens
- ✅ Validação de credenciais com bcrypt
- ✅ Proteção de rotas com JWT Guard
- ✅ Estratégia Local (email/password)
- ✅ Estratégia JWT para rotas protegidas

### 🛠️ Recursos Gerais
- ✅ Validação de dados com class-validator
- ✅ Timestamps automáticos (createdAt, updatedAt)
- ✅ CORS habilitado
- ✅ Console estilizado e colorido
- ✅ Tratamento de erros type-safe
- ✅ Integração com MySQL via TypeORM
- ✅ Relacionamento entre entidades (Tema ↔ Postagens ↔ Usuários)
- ✅ ClassSerializerInterceptor para excluir senhas automaticamente
- ✅ Senhas hasheadas com bcrypt
- ✅ Validação de força de senha

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript e JavaScript
- **[MySQL](https://www.mysql.com/)** - Sistema de gerenciamento de banco de dados
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação baseada em decorators
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Transformação e exclusão de propriedades
- **[JWT](https://jwt.io/)** - JSON Web Tokens para autenticação
- **[Passport](http://www.passportjs.org/)** - Middleware de autenticação
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Hash seguro de senhas
- **[Chalk](https://github.com/chalk/chalk)** - Estilização do terminal

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MySQL](https://www.mysql.com/) (versão 8 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Shidoshi93/blog_pessoal
cd blog_pessoal
```
[website]: https://www.meusite.com.br "Nosso Website Principal"

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
# Servidor
PORT=4000
NODE_ENV=development

# Banco de Dados
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=blog_pessoal

# JWT
JWT_SECRET=sua_chave_secreta_super_segura_aqui
JWT_EXPIRES_IN=3600
```

4. **Configure o banco de dados**

Crie o banco de dados no MySQL:
```sql
CREATE DATABASE blog_pessoal;
```

5. **Execute a aplicação**
```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run build
npm run start:prod
```

## 💻 Uso

Após iniciar o servidor, você verá um console estilizado:

```
╔════════════════════════════════════════╗
║   🚀 SERVIDOR INICIADO COM SUCESSO! 🚀 ║
╚════════════════════════════════════════╝

✓ Aplicação: Blog Pessoal
✓ Porta: 4000
✓ URL: http://localhost:4000
✓ Ambiente: development
✓ CORS: Habilitado
✓ Timezone: UTC-3
```

A API estará disponível em `http://localhost:4000`

---

## 🔐 Autenticação

### Como fazer login

1. **Registre um novo usuário**
```bash
curl -X POST http://localhost:4000/user/ \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "seu_usuario",
    "email": "seu_email@example.com",
    "password": "SenhaForte123!"
  }'
```

2. **Faça login para obter o token JWT**
```bash
curl -X POST http://localhost:4000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "seu_email@example.com",
    "password": "SenhaForte123!"
  }'
```

Resposta:
```json
{
  "username": "seu_usuario",
  "id": 1,
  "email": "seu_email@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

3. **Use o token para acessar rotas protegidas**
```bash
curl -X GET http://localhost:4000/user/ \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

### 🔒 Segurança

- ✅ Senhas são hasheadas com **bcrypt**
- ✅ Senhas **nunca** são retornadas nos responses
- ✅ JWT tokens com expiração configurável
- ✅ Validação de força de senha obrigatória
- ✅ Rotas sensíveis protegidas com JwtAuthGuard

### 📊 Resumo dos Endpoints - Autenticação

| Método | Endpoint      | Descrição              | Autenticação | Status |
|--------|---------------|------------------------|--------------|--------|
| POST   | `/auth/login` | Faz login e obtém token| ❌ Não | 200    |
| POST   | `/user/`      | Cria novo usuário      | ❌ Não | 201    |
| GET    | `/user/`      | Lista todos os usuários| ✅ Obrigatória | 200    |

---

<details>
<summary><h2>📡 Endpoints da API</h2></summary>

### **Autenticação**

<details>
  <summary>
    <b>🔓 Fazer Login</b>
  </summary>

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SenhaForte123!"
}
```

**Resposta (200 OK):**
```json
{
  "username": "john_doe",
  "id": 1,
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

</details>

### **Usuários**

<details>
  <summary>
    <b>📝 Criar Usuário (Registro)</b>
  </summary>

```http
POST /user/
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SenhaForte123!",
  "photo": "https://example.com/photo.jpg"
}
```

**Resposta (201 Created):**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "photo": "https://example.com/photo.jpg",
  "createdAt": "2025-12-11T10:30:00Z",
  "updatedAt": "2025-12-11T10:30:00Z"
}
```

</details>

<details>
  <summary>
    <b>📋 Listar Usuários (Protegido)</b>
  </summary>

```http
GET /user/
Authorization: Bearer {token}
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "photo": "https://example.com/photo.jpg",
    "createdAt": "2025-12-11T10:30:00Z",
    "updatedAt": "2025-12-11T10:30:00Z"
  }
]
```

> **Nota:** As senhas nunca aparecem nos responses!

</details>

### **Postagens**

<details>
  <summary>
    <b>📋 Listar todas as postagens (Protegido)</b>
  </summary>

```http
GET /posts
Authorization: Bearer {token}
```

**Resposta de Sucesso (200)**
```json
[
  {
    "id": 1,
    "titulo": "Minha primeira postagem",
    "texto": "Conteúdo da postagem...",
    "createdAt": "2025-12-02T12:00:00.000Z",
    "updatedAt": "2025-12-02T12:00:00.000Z",
    "theme": {
      "id": 1,
      "descricao": "Tecnologia",
      "data": "2025-12-04T12:00:00.000Z"
    }
  },
  {
    "id": 2,
    "titulo": "Segunda postagem",
    "texto": "Mais conteúdo...",
    "data": "2025-12-02T13:00:00.000Z",
    "tema": {
      "id": 2,
      "descricao": "Programação",
      "data": "2025-12-04T13:00:00.000Z"
    }
  }
]
```

</details>

<details>
<summary><b>🔍 Buscar postagem por ID</b></summary>

```http
GET /postagens/:id
```

**Parâmetros**
- `id` (number): ID da postagem

**Exemplo**
```http
GET /postagens/1
```

**Resposta de Sucesso (200)**
```json
{
  "id": 1,
  "titulo": "Minha primeira postagem",
  "texto": "Conteúdo da postagem...",
  "data": "2025-12-02T12:00:00.000Z",
  "tema": {
    "id": 1,
    "descricao": "Tecnologia",
    "data": "2025-12-04T12:00:00.000Z"
  }
}
```

**Resposta de Erro (404)**
```json
{
  "statusCode": 404,
  "message": "Postagem não encontrada!"
}
```

</details>

<details>
<summary><b>🔎 Buscar postagens por título</b></summary>

```http
GET /postagens/titulo/:titulo
```

**Parâmetros**
- `titulo` (string): Título ou parte do título da postagem

**Exemplo**
```http
GET /postagens/titulo/NestJS
```

**Resposta de Sucesso (200)**
```json
[
  {
    "id": 1,
    "titulo": "Aprendendo NestJS",
    "texto": "NestJS é um framework incrível!",
    "data": "2025-12-02T12:00:00.000Z",
    "tema": {
      "id": 1,
      "descricao": "Tecnologia",
      "data": "2025-12-04T12:00:00.000Z"
    }
  }
]
```

</details>

<details>
<summary><b>➕ Criar nova postagem</b></summary>

```http
POST /postagens
Content-Type: application/json
```

**Body**
```json
{
  "titulo": "Título da postagem",
  "texto": "Conteúdo da postagem",
  "tema": {
    "id": 1
  }
}
```

**Resposta de Sucesso (200)**
```json
{
  "id": 1,
  "titulo": "Título da postagem",
  "texto": "Conteúdo da postagem",
  "data": "2025-12-02T12:00:00.000Z",
  "tema": {
    "id": 1,
    "descricao": "Tecnologia",
    "data": "2025-12-04T12:00:00.000Z"
  }
}
```

**Validações**
- `titulo`: obrigatório, máximo 100 caracteres
- `texto`: obrigatório, máximo 1000 caracteres
- `tema.id`: obrigatório, deve ser um tema existente

</details>

<details>
<summary><b>✏️ Atualizar postagem existente</b></summary>

```http
PUT /postagens
Content-Type: application/json
```

**Body**
```json
{
  "id": 1,
  "titulo": "Título atualizado",
  "texto": "Conteúdo atualizado",
  "tema": {
    "id": 2
  }
}
```

**Resposta de Sucesso (200)**
```json
{
  "id": 1,
  "titulo": "Título atualizado",
  "texto": "Conteúdo atualizado",
  "data": "2025-12-02T14:00:00.000Z",
  "tema": {
    "id": 2,
    "descricao": "Programação",
    "data": "2025-12-04T13:00:00.000Z"
  }
}
```

**Observação**: O `id` da postagem e o `tema.id` são obrigatórios para atualização

</details>

<details>
<summary><b>🗑️ Deletar postagem</b></summary>

```http
DELETE /postagens/:id
```

**Parâmetros**
- `id` (number): ID da postagem a ser deletada

**Exemplo**
```http
DELETE /postagens/1
```

**Resposta de Sucesso (204)**
```
No Content
```

**Resposta de Erro (404)**
```json
{
  "statusCode": 404,
  "message": "Postagem não encontrada!"
}
```

</details>

---

### 📊 Resumo dos Endpoints - Postagens

| Método | Endpoint                | Descrição                        | Autenticação | Status |
|--------|-------------------------|----------------------------------|--------------|--------|
| GET    | `/posts`                | Lista todas as postagens         | ✅ Obrigatória | 200    |
| GET    | `/posts/:id`            | Busca postagem por ID            | ✅ Obrigatória | 200    |
| GET    | `/posts/titulo/:titulo` | Busca postagens por título       | ✅ Obrigatória | 200    |
| POST   | `/posts`                | Cria nova postagem               | ✅ Obrigatória | 200    |
| PUT    | `/posts`                | Atualiza postagem existente      | ✅ Obrigatória | 200    |
| DELETE | `/posts/:id`            | Deleta postagem por ID           | ✅ Obrigatória | 204    |

---

### **Temas** 🏷️ (Protegido 🔐)

> **⚠️ Nota de Segurança**: Todos os endpoints de temas requerem autenticação JWT. Envie o token no header `Authorization: Bearer {token}`

<details>
<summary><b>📋 Listar todos os temas</b></summary>

```http
GET /temas
Authorization: Bearer {token}
```

**Resposta de Sucesso (200)**
```json
[
  {
    "id": 1,
    "descricao": "Tecnologia",
    "data": "2025-12-04T12:00:00.000Z"
  },
  {
    "id": 2,
    "descricao": "Programação",
    "data": "2025-12-04T13:00:00.000Z"
  }
]
```

</details>

<details>
<summary><b>🔍 Buscar tema por ID</b></summary>

```http
GET /temas/:id
Authorization: Bearer {token}
```

**Parâmetros**
- `id` (number): ID do tema

**Exemplo**
```http
GET /temas/1
Authorization: Bearer {token}
```

**Resposta de Sucesso (200)**
```json
{
  "id": 1,
  "descricao": "Tecnologia",
  "data": "2025-12-04T12:00:00.000Z"
}
```

**Resposta de Erro (404)**
```json
{
  "statusCode": 404,
  "message": "Tema não encontrado!"
}
```

</details>

<details>
<summary><b>🔎 Buscar temas por descrição</b></summary>

```http
GET /temas/descricao/:descricao
Authorization: Bearer {token}
```

**Parâmetros**
- `descricao` (string): Descrição ou parte da descrição do tema

**Exemplo**
```http
GET /temas/descricao/Tecnologia
Authorization: Bearer {token}
```

**Resposta de Sucesso (200)**
```json
[
  {
    "id": 1,
    "descricao": "Tecnologia",
    "data": "2025-12-04T12:00:00.000Z"
  }
]
```

</details>

<details>
<summary><b>➕ Criar novo tema</b></summary>

```http
POST /temas
Content-Type: application/json
Authorization: Bearer {token}
```

**Body**
```json
{
  "descricao": "Inteligência Artificial"
}
```

**Resposta de Sucesso (200)**
```json
{
  "id": 1,
  "descricao": "Inteligência Artificial",
  "data": "2025-12-04T12:00:00.000Z"
}
```

**Validações**
- `descricao`: obrigatório, máximo 255 caracteres

</details>

<details>
<summary><b>✏️ Atualizar tema existente</b></summary>

```http
PUT /temas
Content-Type: application/json
Authorization: Bearer {token}
```

**Body**
```json
{
  "id": 1,
  "descricao": "Inteligência Artificial e Machine Learning"
}
```

**Resposta de Sucesso (200)**
```json
{
  "id": 1,
  "descricao": "Inteligência Artificial e Machine Learning",
  "data": "2025-12-04T14:00:00.000Z"
}
```

**Observação**: O `id` é obrigatório para atualização

</details>

<details>
<summary><b>🗑️ Deletar tema</b></summary>

```http
DELETE /temas/:id
Authorization: Bearer {token}
```

**Parâmetros**
- `id` (number): ID do tema a ser deletado

**Exemplo**
```http
DELETE /temas/1
Authorization: Bearer {token}
```

**Resposta de Sucesso (204)**
```
No Content
```

**Resposta de Erro (404)**
```json
{
  "statusCode": 404,
  "message": "Tema não encontrado!"
}
```

</details>

---

### 📊 Resumo dos Endpoints - Temas

| Método | Endpoint                | Descrição                        | Autenticação | Status |
|--------|-------------------------|----------------------------------|--------------|--------|
| GET    | `/temas`                | Lista todos os temas             | ✅ Obrigatória | 200    |
| GET    | `/temas/:id`            | Busca tema por ID                | ✅ Obrigatória | 200    |
| GET    | `/temas/descricao/:descricao` | Busca temas por descrição  | ✅ Obrigatória | 200    |
| POST   | `/temas`                | Cria novo tema                   | ✅ Obrigatória | 200    |
| PUT    | `/temas`                | Atualiza tema existente          | ✅ Obrigatória | 200    |
| DELETE | `/temas/:id`            | Deleta tema por ID               | ✅ Obrigatória | 204    |

</details>

---

<details>
<summary><h2>📁 Estrutura do Projeto</h2></summary>

```
blog_pessoal/
├── src/
│   ├── main.ts                      # Arquivo principal da aplicação
│   ├── app.module.ts                # Módulo raiz (com ClassSerializerInterceptor)
│   ├── app.service.ts               # Service principal
│   ├── auth/                         # 🔐 Módulo de Autenticação
│   │   ├── auth.module.ts           # Configuração JWT e estratégias
│   │   ├── controller/
│   │   │   └── auth.controller.ts   # Endpoint POST /auth/login
│   │   ├── service/
│   │   │   └── auth.service.ts      # Validação e geração JWT
│   │   ├── strategies/
│   │   │   ├── local.strategy.ts    # Estratégia de validação local
│   │   │   └── jwt.strategy.ts      # Estratégia de validação JWT
│   │   ├── guards/
│   │   │   ├── local-auth.guard.ts  # Guard para login
│   │   │   └── jwt-auth.guard.ts    # Guard para rotas protegidas
│   │   └── dtos/
│   │       └── login.dto.ts         # DTO para login
│   ├── user/                         # 👥 Módulo de Usuários
│   │   ├── user.module.ts           # Módulo de usuários
│   │   ├── controller/
│   │   │   └── user.controller.ts   # Endpoints de usuários
│   │   ├── service/
│   │   │   └── user.service.ts      # Lógica de usuários
│   │   └── entities/
│   │       └── user.entity.ts       # Entidade com @Exclude() na senha
│   ├── postagem/
│   │   ├── postagem.module.ts       # Módulo de postagens
│   │   ├── controllers/
│   │   │   └── postagem.controller.ts # Endpoints protegidos
│   │   ├── services/
│   │   │   └── postagem.service.ts
│   │   └── entities/
│   │       └── postagem.entity.ts
│   └── tema/
│       ├── tema.module.ts           # Módulo de temas
│       ├── controller/
│       │   └── tema.controller.ts   # Endpoints protegidos
│       ├── service/
│       │   └── tema.service.ts
│       └── entities/
│           └── tema.entity.ts
├── .env                              # Variáveis de ambiente (JWT_SECRET, JWT_EXPIRES_IN)
├── .env.example                      # Template de variáveis
├── package.json                      # Dependências do projeto
├── tsconfig.json                     # Configuração TypeScript
├── eslint.config.mjs                 # Configuração ESLint (strict mode)
└── nest-cli.json                     # Configuração NestJS
```

</details>

---

<details>
<summary><h2>🗄️ Modelo de Dados</h2></summary>

### Usuário (tb_usuarios) 👥

| Campo    | Tipo      | Descrição                            |
|----------|-----------|--------------------------------------|
| id       | number    | Identificador único (PK)             |
| username | string    | Nome de usuário (único)              |
| email    | string    | Email (único)                        |
| password | string    | Senha criptografada com bcrypt       |
| data     | timestamp | Data de criação/atualização          |

**Nota:** A senha nunca é retornada nas respostas de API, mesmo ao fazer login. Apenas o username, id, email e token são retornados.

### Postagem (tb_postagens)

| Campo    | Tipo      | Descrição                    |
|----------|-----------|------------------------------|
| id       | number    | Identificador único (PK)     |
| titulo   | string    | Título da postagem (max 100) |
| texto    | string    | Conteúdo (max 1000)          |
| usuario  | Usuário   | Usuário que criou (FK)       |
| tema     | Tema      | Tema relacionado (FK)        |
| data     | timestamp | Data de criação/atualização  |

### Tema (tb_temas)

| Campo     | Tipo      | Descrição                    |
|-----------|-----------|------------------------------|
| id        | number    | Identificador único (PK)     |
| descricao | string    | Descrição do tema (max 255)  |
| data      | timestamp | Data de criação/atualização  |

### Relacionamentos

- Um **Usuário** pode criar várias **Postagens** (One-to-Many)
- Uma **Postagem** pertence a um **Usuário** (Many-to-One)
- Um **Tema** pode ter várias **Postagens** (One-to-Many)
- Uma **Postagem** pertence a um **Tema** (Many-to-One)
- Ao deletar um **Tema**, todas as **Postagens** relacionadas são deletadas em cascata (CASCADE)

</details>

---

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev      # Inicia em modo watch

# Produção
npm run build          # Compila o projeto
npm run start:prod     # Inicia em modo produção

# Testes
npm run test           # Executa testes unitários
npm run test:e2e       # Executa testes end-to-end
npm run test:cov       # Executa testes com cobertura

# Linting e formatação
npm run lint           # Verifica problemas no código
npm run format         # Formata o código
```

---

<details>
<summary><h2>🔍 Exemplos de Uso</h2></summary>

### Usando cURL

**Criar tema:**
```bash
curl -X POST http://localhost:4000/temas \
  -H "Content-Type: application/json" \
  -d '{
    "descricao": "Tecnologia"
  }'
```

**Criar postagem:**
```bash
curl -X POST http://localhost:4000/postagens \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Aprendendo NestJS",
    "texto": "NestJS é um framework incrível para Node.js!",
    "tema": {
      "id": 1
    }
  }'
```

**Listar postagens:**
```bash
curl http://localhost:4000/postagens
```

**Listar temas:**
```bash
curl http://localhost:4000/temas
```

### Usando JavaScript (Fetch API)

```javascript
// Criar tema
const responseTema = await fetch('http://localhost:4000/temas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    descricao: 'Tecnologia'
  })
});

const tema = await responseTema.json();
console.log('Tema criado:', tema);

// Criar postagem com tema
const responsePostagem = await fetch('http://localhost:4000/postagens', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    titulo: 'Aprendendo NestJS',
    texto: 'NestJS é um framework incrível para Node.js!',
    tema: {
      id: tema.id
    }
  })
});

const postagem = await responsePostagem.json();
console.log('Postagem criada:', postagem);
```

</details>

## � Segurança

### Boas Práticas Implementadas

- **Senhas Criptografadas**: Todas as senhas são criptografadas com bcrypt e nunca são retornadas nas respostas de API
- **JWT Seguro**: Tokens JWT com expiração de 1 hora, assinados com chave secreta do servidor
- **Variáveis de Ambiente**: Chaves sensíveis (JWT_SECRET, credenciais DB) armazenadas em `.env` não versionado
- **Validação de Entrada**: Todas as requisições são validadas com `class-validator`
  - Emails validados com formato correto
  - Senhas obrigadas ser fortes (mínimo 8 caracteres, maiúsculas, números, caracteres especiais)
- **CORS Habilitado**: Requisições cross-origin controladas via variável `ENABLECORS`
- **Proteção de Rotas**: Endpoints sensíveis protegidos com JWT usando `@UseGuards(JwtAuthGuard)`
- **Type Safety**: TypeScript em modo strict com ESLint rigoroso para prevenir vulnerabilidades
## 🧪 Testes

### Rodando Testes Unitários

```bash
npm test
```

Roda todos os testes unitários encontrados em:
- `/test/**/*.spec.ts`
- `/src/**/*.spec.ts`

### Rodando Testes E2E

```bash
npm run test:e2e
```

Roda testes end-to-end encontrados em `/test/**/*.e2e-spec.ts`

### Watching Tests

```bash
npm run test:watch
```

Executa testes em modo watch, executando novamente a cada mudança nos arquivos.

### Coverage

```bash
npm run test:cov
```

Gera relatório de cobertura de testes na pasta `/coverage`
## �📝 Licença

Este projeto está sob a licença UNLICENSED.

## 👤 Autor

Desenvolvido com ❤️ por Daniel

---

<div align="center">
  
**[⬆ Voltar ao topo](#-blog-pessoal-api)**

</div>
