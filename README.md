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
- ✅ Listar todas as postagens
- ✅ Buscar postagem por ID
- ✅ Buscar postagens por título
- ✅ Atualizar postagens
- ✅ Deletar postagens

### 🏷️ Temas
- ✅ Criar temas
- ✅ Listar todos os temas
- ✅ Buscar tema por ID
- ✅ Buscar temas por descrição
- ✅ Atualizar temas
- ✅ Deletar temas

### 🛠️ Recursos Gerais
- ✅ Validação de dados com class-validator
- ✅ Timestamps automáticos
- ✅ CORS habilitado
- ✅ Console estilizado e colorido
- ✅ Tratamento de erros
- ✅ Integração com MySQL via TypeORM
- ✅ Relacionamento entre entidades (Tema ↔ Postagens)

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript e JavaScript
- **[MySQL](https://www.mysql.com/)** - Sistema de gerenciamento de banco de dados
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação baseada em decorators
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
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=blog_pessoal
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

<details>
<summary><h2>📡 Endpoints da API</h2></summary>

### **Postagens**

<details>
  <summary>
    <b>📋 Listar todas as postagens</b>
  </summary>

```http
GET /postagens
```

**Resposta de Sucesso (200)**
```json
[
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

| Método | Endpoint                | Descrição                        | Status |
|--------|-------------------------|----------------------------------|--------|
| GET    | `/postagens`            | Lista todas as postagens         | 200    |
| GET    | `/postagens/:id`        | Busca postagem por ID            | 200    |
| GET    | `/postagens/titulo/:titulo` | Busca postagens por título   | 200    |
| POST   | `/postagens`            | Cria nova postagem               | 200    |
| PUT    | `/postagens`            | Atualiza postagem existente      | 200    |
| DELETE | `/postagens/:id`        | Deleta postagem por ID           | 204    |

---

### **Temas**

<details>
<summary><b>📋 Listar todos os temas</b></summary>

```http
GET /temas
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
```

**Parâmetros**
- `id` (number): ID do tema

**Exemplo**
```http
GET /temas/1
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
```

**Parâmetros**
- `descricao` (string): Descrição ou parte da descrição do tema

**Exemplo**
```http
GET /temas/descricao/Tecnologia
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
```

**Parâmetros**
- `id` (number): ID do tema a ser deletado

**Exemplo**
```http
DELETE /temas/1
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

| Método | Endpoint                | Descrição                        | Status |
|--------|-------------------------|----------------------------------|--------|
| GET    | `/temas`                | Lista todos os temas             | 200    |
| GET    | `/temas/:id`            | Busca tema por ID                | 200    |
| GET    | `/temas/descricao/:descricao` | Busca temas por descrição  | 200    |
| POST   | `/temas`                | Cria novo tema                   | 200    |
| PUT    | `/temas`                | Atualiza tema existente          | 200    |
| DELETE | `/temas/:id`            | Deleta tema por ID               | 204    |

</details>

---

<details>
<summary><h2>📁 Estrutura do Projeto</h2></summary>

```
blog_pessoal/
├── src/
│   ├── main.ts                      # Arquivo principal da aplicação
│   ├── app.module.ts                # Módulo raiz
│   ├── app.service.ts               # Service principal
│   ├── postagem/
│   │   ├── postagem.module.ts       # Módulo de postagens
│   │   ├── controllers/
│   │   │   └── postagem.controller.ts
│   │   ├── services/
│   │   │   └── postagem.service.ts
│   │   └── entities/
│   │       └── postagem.entity.ts
│   └── tema/
│       ├── tema.module.ts           # Módulo de temas
│       ├── controller/
│       │   └── tema.controller.ts
│       ├── service/
│       │   └── tema.service.ts
│       └── entities/
│           └── tema.entity.ts
├── .env                              # Variáveis de ambiente
├── package.json                      # Dependências do projeto
├── tsconfig.json                     # Configuração TypeScript
└── nest-cli.json                     # Configuração NestJS
```

</details>

---

<details>
<summary><h2>🗄️ Modelo de Dados</h2></summary>

### Postagem (tb_postagens)

| Campo    | Tipo      | Descrição                    |
|----------|-----------|------------------------------|
| id       | number    | Identificador único (PK)     |
| titulo   | string    | Título da postagem (max 100) |
| texto    | string    | Conteúdo (max 1000)          |
| data     | timestamp | Data de criação/atualização  |
| tema     | Tema      | Tema relacionado (FK)        |

### Tema (tb_temas)

| Campo     | Tipo      | Descrição                    |
|-----------|-----------|------------------------------|
| id        | number    | Identificador único (PK)     |
| descricao | string    | Descrição do tema (max 255)  |
| data      | timestamp | Data de criação/atualização  |

### Relacionamentos

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

## 📝 Licença

Este projeto está sob a licença UNLICENSED.

## 👤 Autor

Desenvolvido com ❤️ por Daniel

---

<div align="center">
  
**[⬆ Voltar ao topo](#-blog-pessoal-api)**

</div>
