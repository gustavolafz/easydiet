# 🍎 EasyDiet Backend

## Visão Geral

O **EasyDiet** é uma aplicação que conecta o cliente do aplicativo à informações nutricionais de alimentos de forma simples e intuitiva.  
O backend é desenvolvido com **Flask**, seguindo boas práticas de organização de código, segurança e escalabilidade.

Este projeto é o ponto de partida para a criação de uma plataforma web onde usuários poderão pesquisar alimentos, consultar informações nutricionais e futuramente, montar suas próprias dietas personalizadas.

---

## Funcionalidades Desenvolvidas até Agora

- **Configuração de Ambiente Segura:**  
  Utilização de variáveis de ambiente (`.env`) para proteger dados sensíveis como `CLIENT_ID`, `CLIENT_SECRET` e `API_URL`. Ao clonar o repositório você deve criar seu arquivo .env e preenchê-lo com as informações necessárias, assim como no `.env.example`.

- **Organização de Rotas com Blueprints:**  
  Modularização de endpoints utilizando o sistema de `Blueprints` do Flask para manter o projeto limpo e escalável.

- **Integração com API Externa (FatSecret):**  
  - Configuração inicial de autenticação OAuth2.
  - Realização de buscas simples de alimentos (por exemplo, "Apple") utilizando o token de acesso.
  - Estruturação de chamadas HTTP à API externa utilizando `requests`.

---

## **Estrutura de Pastas do Projeto**

```bash
├── app.py                          # Arquivo principal para inicializar o Flask
├── .env                            # Variáveis de ambiente (não commitado)
├── .env.example                    # Exemplo de variáveis de ambiente
├── .gitignore                      # Arquivo para ignorar arquivos no Git
├── README.md                       # Documentação do projeto
├── requirements.txt                # Dependências do projeto
│
├── server/
│   ├── api/
│   │   ├── __init__.py             # Inicialização do módulo API
│   │   ├── endpoints/
│   │   │   ├── __init__.py         # Inicialização dos endpoints
│   │   │   ├── auth.py             # Endpoints de autenticação
│   │   │   ├── food.py             # Endpoints de busca de alimentos
│   │   ├── external_api/
│   │       ├── __init__.py         # Inicialização do módulo de APIs externas
│   │       ├── fatsecret.py        # Integração com a API FatSecret
│   │
│   ├── core/
│   │   ├── config.py               # Configurações globais do projeto
│   │   ├── error_handlers.py       # Manipuladores de erros globais
│   │   ├── security.py             # Funções de segurança (hashing de senhas)
│   │   ├── validation_middleware.py # Middleware de validação com Pydantic
│   │
│   ├── db/
│   │   ├── database.py             # Conexão com o MongoDB
│   │
│   ├── models/
│   │   ├── user.py                 # Modelo de usuário para MongoDB
│   │
│   ├── schemas/
│   │   ├── auth.py                 # Schemas Pydantic para autenticação
│   │   ├── user.py                 # Schemas Pydantic para usuários
│   │
│   ├── services/
│   │   ├── auth.py                 # Serviço de autenticação
│   │   ├── user.py                 # Serviço de gerenciamento de usuários
│   │
│   ├── utils/
│       ├── auth.py                 # Utilitário para autenticação na API externa
│       ├── bson_utils.py           # Utilitário para manipulação de ObjectId
```
## Diagrama da Arquitetura

```bash
+-------------------+
|    Frontend App   |
+-------------------+
          |
          v
+-------------------+
|      Flask API    |
+-------------------+
          |
          v
+-------------------+       +-------------------+
|  Endpoints (API)  |<----->|  Services Layer   |
+-------------------+       +-------------------+
          |                         |
          v                         v
+-------------------+       +-------------------+
| External API (Fat |       |  Database (MongoDB|
| Secret)           |       |  via PyMongo)     |
+-------------------+       +-------------------+
```

## 🧱 Descrição dos Componentes

- **Frontend App**  
  Interface cliente que consome a API, podendo ser uma aplicação web em React ou um app mobile.

- **Flask API**  
  Backend responsável por processar requisições HTTP e coordenar as respostas.

- **Endpoints**  
  Rotas HTTP definidas no Flask que expõem os serviços para o frontend (ex: `/login`, `/register`, etc).

- **Services Layer**  
  Camada de serviço com a lógica de negócio — autenticação, criação de usuários, atualizações, etc.

- **External API**  
  Integração com a **FatSecret Platform API** para busca e informações nutricionais de alimentos.

- **Database (MongoDB)**  
  Banco de dados NoSQL para armazenar informações persistentes dos usuários e registros relacionados.

---

## 🚀 Tecnologias Utilizadas

- **Python 3.11+**
- **Flask**
- **MongoDB**
- **FatSecret Platform API**


---

## 🎯 Próximos Passos

- Implementar autenticação de usuários (login/cadastro). ✅
- Montar endpoints RESTful para gerenciar perfis e planos alimentares.
- Implementar tratamento completo de erros e logs de requisições.
- Conectar o frontend em React com os endpoints criados.
- Fazer o Deploy da nossa API na AWS.
- Aplicar testes automatizados para garantir robustez do backend.

---

## Notas

- **Crie um ambiente virtual para trabalhar no projeto,** isso vai otimizar o seu tempo instalando dependências da aplicação, e tenha sempre noção de adicionar qualquer nova atualização de biblioteca ao `requirements.txt`, isso facilita muito o vercionamento do código.

- Devido a uma limitação do serviço, durante o desenvolvimento local, **as restrições de IP da API externa não serão desabilitadas**, o que pode dificultar testes e integração, caso ocorra um erro de IP Inválido, acesse as **restrições no site do serviço e registre seu IP.**

- Todo o projeto está sendo desenvolvido com foco em **boas práticas de engenharia de software** e **arquitetura limpa**.

---

## 💡 Sobre o Projeto

O **EasyDiet** tem como missão de atuar como servidor que se comunica com uma API Externa para um aplicativo que facilita o acesso a informações nutricionais confiáveis de forma descomplicada, permitindo que qualquer pessoa possa planejar melhor sua alimentação.

Esse projeto também é parte do processo de aprendizado profundo em desenvolvimento backend, com o objetivo de formar uma equipe de desenvolvedores de **nível internacional** em Flask e arquitetura de APIs.

---

<!-- > Desenvolvido com ❤️ e dedicação para criar um backend de alta qualidade!

--- -->

<!-- ## 🖋️ Autores

- **Nome:** [Seu Nome Aqui]
- **Contato:** [Seu contato GitHub, email, etc.] -->
