# Desafio Técnico: MAX MILHAS API

## 📌 Descrição

Esse projeto foi proposto pela empresa [MaxMilhas](https://www.maxmilhas.com.br/) como desafio técnico.

A API é responsável pela criação, listagem e remoção de CPFs.

## 📑 Índice

- [Desafio Técnico: MAX MILHAS API](#desafio-técnico-max-milhas-api)
  - [📌 Descrição](#-descrição)
  - [📑 Índice](#-índice)
  - [🧰 Tecnologias Utilizadas](#-tecnologias-utilizadas)
  - [🧭 Referências da API](#-referências-da-api)
    - [Cadastro de CPF](#cadastro-de-cpf)
      - [Requisição](#requisição)
      - [Resposta](#resposta)
    - [Listagem de um único CPF](#listagem-de-um-único-cpf)
      - [Resposta](#resposta-1)
    - [Listagem de todos os CPFs](#listagem-de-todos-os-cpfs)
      - [Resposta](#resposta-2)
    - [Remoção de um CPF](#remoção-de-um-cpf)
      - [Resposta](#resposta-3)
  - [🚀 Rodando a Aplicação](#-rodando-a-aplicação)
  - [🧪 Testes Automatizados](#-testes-automatizados)
  - [🗂 Estrutura das pastas](#-estrutura-das-pastas)

## 🧰 Tecnologias Utilizadas

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

## 🧭 Referências da API

---

### Cadastro de CPF

```http
POST /cpf
```

Nesta rota, é possível realizar o cadastro de um CPF fornecendo o valor `cpf` no corpo da requisição http.

- `cpf` deve ser único, sem pontuação e não deve ser composto somente de dígitos repetidos;

#### Requisição

```json
{
  "cpf": "73172066010"
}
```

#### Resposta

```http
HTTP/1.1 201 Created
```

```json
{
  "cpf": "73172066010",
  "createdAt": "2023-02-25T20:13:22.737Z"
}
```

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`           |   `201`    | **Created**          |
| `json`           |   `409`    | **Conflict**, CPF já está cadastrado no sistema |
| `json`           |   `400`    | **Bad Request**, corpo da requisição inválido, ex.: `cpf` não é uma string |
| `json`           |   `422`    | **Unprocessable Entity**, dados inválidos, ex.: CPF com um formato não permitido |

---

### Listagem de um único CPF

```http
GET /cpf/:cpf
```

Nesta rota, é possível buscar um CPF.

#### Resposta

```http
HTTP/1.1 200 OK
```

```json
{
  "cpf": "73172066010",
  "createdAt": "2023-02-25T20:13:22.737Z"
}
```

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`           |   `200`    | **OK**          |
| `json`           |   `404`    | **Not Found**, CPF não encontrado |
| `json`           |   `422`    | **Unprocessable Entity**, dados inválidos, ex.: CPF com um formato não permitido |

---

### Listagem de todos os CPFs

```http
GET /cpf
```

Nesta rota, é possível buscar todos os CPFs cadastrados no sistema.

#### Resposta

```http
HTTP/1.1 200 OK
```

```json
[
 {
  "cpf": "00247785750",
  "createdAt": "2023-02-25T20:12:58.738Z"
 },
 {
  "cpf": "65664224983",
  "createdAt": "2023-02-25T20:12:58.738Z"
 },
 {
  "cpf": "21227881274",
  "createdAt": "2023-02-25T20:12:58.738Z"
 },
 {
  "cpf": "73172066010",
  "createdAt": "2023-02-25T20:13:22.737Z"
 }
]
```

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`           |   `200`    | **OK**          |

---

### Remoção de um CPF

```http
DELETE /cpf/:cpf
```

Nesta rota, é possível deletar um CPF.

#### Resposta

```http
HTTP/1.1 200 OK
```

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`           |   `200`    | **OK**          |
| `json`           |   `404`    | **Not Found**, CPF não encontrado |
| `json`           |   `422`    | **Unprocessable Entity**, dados inválidos, ex.: CPF com um formato não permitido |

## 🚀 Rodando a Aplicação

1. Clone e navegue até o repositório:

    ```bash
      git clone https://github.com/akiraTatesawa/teste-max-milhas.git

      cd teste-max-milhas/
    ```

2. Crie um arquivo `.env.development` seguindo o exemplo descrito em `.env.sample`:

    | Nome                 | Descrição                         |
    |--------------------- |---------------------------------- |
    | `PORT`               | porta onde a aplicação vai rodar  |
    | `POSTGRES_USERNAME`  | username do postgres              |
    | `POSTGRES_PASSWORD`  | senha do postgres                 |
    | `POSTGRES_HOST`      | host do postgres                  |
    | `POSTGRES_PORT`      | porta do postgres                 |
    | `POSTGRES_DATABASE`  | nome do banco de dados            |
    | `DATABASE_URL`       | URL de conexão do postgres        |

    - É importante manter a variável `POSTGRES_HOST` como sendo igual a `max-milhas-postgres-development`.

3. Instale as dependências do projeto:

    ```bash
      npm i
    ```

4. Rode o projeto em modo de desenvolvimento com NPM ou docker:

    ```bash
      ## Rodando com NPM e Node
      npm run dev:docker

      ## Rodando com Docker e docker-compose
      docker-compose -f docker-compose.development.yml --env-file .env.development up
    ```

## 🧪 Testes Automatizados

1. Crie um arquivo `.env.test` seguindo o exemplo abaixo:

    | Nome                 | Descrição                         |
    |--------------------- |---------------------------------- |
    | `POSTGRES_USERNAME`  | username do postgres              |
    | `POSTGRES_PASSWORD`  | senha do postgres                 |
    | `POSTGRES_HOST`      | host do postgres                  |
    | `POSTGRES_PORT`      | porta do postgres                 |
    | `POSTGRES_DATABASE`  | nome do banco de dados de teste   |
    | `DATABASE_URL`       | URL de conexão do postgres        |

    - É importante manter a variável `POSTGRES_HOST` como sendo igual a `max-milhas-postgres-test`.

2. Rode o comando de testes com NPM ou docker:

    ```bash
      ## Rodando com NPM e Node
      npm run test:docker

      ## Rodando com Docker e docker-compose
      docker-compose -f docker-compose.test.yml --env-file .env.test up
    ```

## 🗂 Estrutura das pastas

| Diretório         | Conteúdo                                                           |
|-------------------|--------------------------------------------------------------------|
| `.`               | tsconfig, dockerfile, eslintrc, arquivos de configuração         |
| `/logs`           | logs da aplicação                                                  |
| `/features`       | descrição das features e user stories em gherkin                   |
| `/insomnia`       | json com as rotas da API para ser utilizado no Insomnia            |
| `/tests`          | repositórios em memória, test helpers, factories, testes e2e       |
| `/src`            | código da aplicação                                                |
| `/src/core`       | abstrações e monads                                                |
| `/src/domain`     | entidades de domínio, value objects e erros de domínio             |
| `/src/app`        | use cases, dtos, mappers, ports e erros de aplicação               |
| `/src/infra`      | frameworks, bibliotecas externas, interface adapters               |
| `/src/infra/data` | repositórios, data mappers, orm, migrations, seeds                 |
| `/src/infra/http` | controllers, middlewares, routers, presenters, view models, server |
