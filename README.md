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
  - [💡 Escolhas e motivações](#-escolhas-e-motivações)
    - [Arquitetura](#arquitetura)
    - [Metodologias e Design Patterns](#metodologias-e-design-patterns)
    - [Frameworks e Libs](#frameworks-e-libs)

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

Clique no botão abaixo para importar os endpoints da API.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=MAXMILHAS%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2FakiraTatesawa%2Fteste-max-milhas%2Fmain%2Finsomnia%2Finsomnia_api_reference.json)

Obs.: Alguns endpoints estão automatizados para pegar o valor do cpf retornado pela rota POST e utilizá-lo como parâmetro.

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

3. Rode o projeto em modo de desenvolvimento com NPM ou docker:

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

## 💡 Escolhas e motivações

### Arquitetura

Escolhi uma arquitetura semelhante a **Clean Architecture**. Cada camada tem a sua própria responsabilidade e o código segue a regra de dependência, ou seja, uma camada interna jamais deve depender de um trecho código presente numa camada externa. A fim de obter um bom resultado, a estratégia utilizada foi o uso de ports/adapters e inversão de dependências.

- **Domain Layer:** desenvolvido utilizado padrões do **DDD (Domain-Driven Design)**, onde entidades e object values encapsulam as regras de negócio de domínio e cuidam da validação.

- **Application Layer:** responsável por implementar as regras de negócio da aplicação e domínio através de use cases.

- **Infra Layer:** neste projeto, é a única camada que possui dependências externas. Implementa frameworks e pacotes externos, como também é responsável pela persistência dos dados.

- **Core (ou Lib):** não é necessariamente uma camada. Armazena as abstrações fundamentais da aplicação, como classes abstratas de entidades, value objects, use cases, routers, etc.

### Metodologias e Design Patterns

- **TDD (Test-Driven Development):** não só traz a garantia de que o código está funcionando como deveria, como também aumenta a qualidade do resultado final através do método red-green-refactor.
   >"Usando essa metodologia, a pessoa desenvolvedora tem muito mais segurança ao realizar alterações no código e também obtém um feedback rápido caso algo não saia como o esperado em uma refatoração (...)"

- **BDD (Behavior-Driven Development):** utilizando as instruções básicas sobre o projeto que me foram fornecidas pela empresa, transcrevi os cenários da aplicação para a linguagem *Gherkin* e utilizei essa transcrição para me guiar durante a testagem do software.
    >"(...) o BDD na prática funciona como uma importante ferramenta de testagem e de início de atualização para softwares. O objetivo é melhorar as funcionalidades, escrevendo códigos que vão ao encontro das necessidades dos clientes."

- **POO:** a orientação a objetos me permite criar um código mais conciso e organizado, tornando mais fácil para colocar em prática os princípios do *SOLID*.

- **SOLID:** utilizando os princípios do SOLID, é possível criar um código extremamente desacoplado e altamente testável, aumentando a qualidade do software.

- **Repository Pattern:** delegar a interação com o banco de dados para um repositório ao invés de realizar operações diretamente pelos use cases aumenta o descoplamento do código e obedece o princípio da responsabilidade única. Além disso, invertendo as dependências de um use case e utilizando uma abstração de repositório no construtor, torna-se possível utilizar um mesmo use case para diversos repositórios, contanto que esses obedeçam o contrato estabelecido pela abstração.

    ```typescript
      // list-unique-cpf.use-case.ts

      export class ListUniqueCPFUseCase extends UseCase<ListUniqueCpfDTO, ListUniqueCPFOutput> {
        private readonly _cpfRepository: CPFRepository;

        // CPFRepository é uma interface
        constructor(cpfRepository: CPFRepository) {
          super();
          this._cpfRepository = cpfRepository;
        }
      }

      // Ambas as classes abaixo são implementações da interface CPFRepository
      const inMemoCPFRepository = new InMemoryCPFRepository();
      const prismaCPFRepository = new PrismaCPFRepository();

      // O mesmo use case funciona tanto com o in-memory quanto com o prisma
      const useCaseWithPrisma = new ListUniqueCPFUseCase(prismaCPFRepository)
      const useCaseWithInMemo = new ListUniqueCPFUseCase(inMemoCPFRepository)
    ```

- **Either Monad:** Either é uma estrutura nascida da programação funcional e nesse projeto ela foi utilizada para realizar o tratamento de erros. Uma operação pode retornar um erro (Left) ou um sucesso (Right) e o Either é responsável por armazenar o valor da operação e garantir a sua tipagem estática, independentemente do resultado. Portanto, em momento algum exceções foram lançadas na aplicação utilizando `throw`, mas sim armazenadas e tratadas no controller. Através dessa abordagem, garantimos que todo retorno de um método inclui também os tipos de erro que podem ocorrem nele, aumentando a legibilidade e clareza do código.

    ```typescript
      // Lista todos os possíveis tipos de retornos:
      // Erros: InvalidCpfException ou NotFoundCpfException
      // Sucesso: CpfDTO
      type ListUniqueCPFOutput = Either<
        DomainErrors.InvalidCpfException | ApplicationErrors.NotFoundCpfException,
        CpfDTO>
    ```

- **JSDoc:** utiliza comentários significativos para documentar classes e métodos. Utilizei o JSDoc para documentar todas as abstrações presentes na pasta `/core`, assim como as entidades de domínio e os erros de domínio e aplicação.

### Frameworks e Libs

- **Express:** framework para construção de web apps. Fornece uma gama de funcionalidades para lidar com requisições e respostas http. Escolhi por ser minimalista e pouco opinado, diferentemente do NestJS, assim tenho mais liberdade para utilizar design patterns, manipular erros, etc.

- **PrismaORM:** ORM bastante declarativo, permite a criação de banco de dados de forma fácil e legível, além de cuidar das migrações.

- **Jest + SWC:** a configuração do jest é muito simples e os testes são legíveis e facilmente interpretados. Além disso, ao adicionar o SWC como compilador, a testagem fica extremamente rápida.
