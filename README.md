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

- ✅ Criação de postagens
- ✅ Listagem de todas as postagens
- ✅ Validação de dados com class-validator
- ✅ Timestamps automáticos
- ✅ CORS habilitado
- ✅ Console estilizado e colorido
- ✅ Tratamento de erros
- ✅ Integração com MySQL via TypeORM

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
git clone <seu-repositorio>
cd blog_pessoal
```

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

## 📡 Endpoints da API

### **Postagens**

#### Listar todas as postagens
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
    "data": "2025-12-02T12:00:00.000Z"
  }
]
```

#### Criar nova postagem
```http
POST /postagens
Content-Type: application/json
```

**Body**
```json
{
  "titulo": "Título da postagem",
  "texto": "Conteúdo da postagem"
}
```

**Resposta de Sucesso (200)**
```json
{
  "id": 1,
  "titulo": "Título da postagem",
  "texto": "Conteúdo da postagem",
  "data": "2025-12-02T12:00:00.000Z"
}
```

**Validações**
- `titulo`: obrigatório, máximo 100 caracteres
- `texto`: obrigatório, máximo 1000 caracteres

## 📁 Estrutura do Projeto

```
blog_pessoal/
├── src/
│   ├── main.ts                      # Arquivo principal da aplicação
│   ├── app.module.ts                # Módulo raiz
│   ├── app.service.ts               # Service principal
│   └── postagem/
│       ├── postagem.module.ts       # Módulo de postagens
│       ├── controllers/
│       │   └── postagem.controller.ts
│       ├── services/
│       │   └── postagem.service.ts
│       └── entities/
│           └── postagem.entity.ts
├── .env                              # Variáveis de ambiente
├── package.json                      # Dependências do projeto
├── tsconfig.json                     # Configuração TypeScript
└── nest-cli.json                     # Configuração NestJS
```

## 🗄️ Modelo de Dados

### Postagem (tb_postagens)

| Campo  | Tipo      | Descrição                    |
|--------|-----------|------------------------------|
| id     | number    | Identificador único (PK)     |
| titulo | string    | Título da postagem (max 100) |
| texto  | string    | Conteúdo (max 1000)          |
| data   | timestamp | Data de criação/atualização  |

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

## 🔍 Exemplos de Uso

### Usando cURL

**Criar postagem:**
```bash
curl -X POST http://localhost:4000/postagens \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Aprendendo NestJS",
    "texto": "NestJS é um framework incrível para Node.js!"
  }'
```

**Listar postagens:**
```bash
curl http://localhost:4000/postagens
```

### Usando JavaScript (Fetch API)

```javascript
// Criar postagem
const response = await fetch('http://localhost:4000/postagens', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    titulo: 'Aprendendo NestJS',
    texto: 'NestJS é um framework incrível para Node.js!'
  })
});

const postagem = await response.json();
console.log(postagem);
```

## 📝 Licença

Este projeto está sob a licença UNLICENSED.

## 👤 Autor

Desenvolvido com ❤️ por Daniel

---

<div align="center">
  
**[⬆ Voltar ao topo](#-blog-pessoal-api)**

</div>
