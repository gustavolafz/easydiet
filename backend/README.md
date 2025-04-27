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

## **Estrutura do Projeto**

```bash
server/
│
├── api/
│   └── endpoints/
│       ├── __init__.py           # Organização das Blueprints dos endpoints
│       ├── food.py               # Endpoints de busca e detalhes de alimentos
│       └── external_api/
│           ├── __init__.py        # Inicialização da camada de chamadas externas
│           └── fatsecret_api.py   # Integração com a API FatSecret
│
├── core/
│   └── config/
│       └── config.py     # Configurações gerais (variáveis de ambiente, etc.)
│
├── db/              
│   └── database.py                        # Conexão e configuração do MongoDB
│
├── models/
│   └── (modelos de dados)  # Estruturas dos documentos e objetos da aplicação
│
├── services/
│   └── (serviços de negócio)        # Lógicas de serviço usadas nos endpoints
│
├── app.py           # Criação e configuração principal da aplicação Flask
│
└── .env             # Variáveis sensíveis (não commitado no repositório)
```

## Tecnologias Utilizadas

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
