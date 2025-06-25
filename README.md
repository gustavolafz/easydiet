# 🍎 EasyDiet Backend

## 🔍 Visão Geral

O **EasyDiet** é uma aplicação que conecta o cliente à informações nutricionais de forma simples e intuitiva.  
O backend é desenvolvido com **Flask**, seguindo boas práticas de organização, segurança e escalabilidade.

> 💡 Este projeto é a fundação para uma futura plataforma onde usuários poderão buscar alimentos, consultar informações nutricionais e montar suas dietas personalizadas.

---

## ✅ Funcionalidades Desenvolvidas

- 🔐 **Ambiente Seguro** com `.env` para armazenar `CLIENT_ID`, `CLIENT_SECRET`, etc.
- 🧩 **Organização por Blueprints** para modularização dos endpoints.
- 🔗 **Integração com a API FatSecret** (OAuth2 + buscas de alimentos via `requests`).

---

## 📁 Estrutura de Pastas

```bash
├── app.py                          # Inicia o app Flask
├── .env / .env.example             # Configuração de variáveis de ambiente
├── requirements.txt                # Dependências do projeto
├── README.md                       # Este arquivo
│
├── server/
│   ├── api/
│   │   ├── endpoints/              # Rotas: auth, food
│   │   └── external_api/           # Comunicação com a FatSecret API
│   ├── core/                       # Configs, segurança, middleware
│   ├── db/                         # Conexão com MongoDB
│   ├── models/                     # Modelos do banco
│   ├── schemas/                    # Schemas Pydantic
│   ├── services/                   # Lógica de negócio
│   └── utils/                      # Helpers gerais
```

---

## 🧠 Arquitetura da Aplicação

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
| External API      |       |  MongoDB Database |
| (FatSecret)       |       | (via PyMongo)     |
+-------------------+       +-------------------+
```

---

## 🧱 Descrição dos Componentes

- 🎨 **Frontend App**  
  Cliente que consome a API — web (React) ou mobile.

- ⚙️ **Flask API**  
  Camada backend que processa requisições e integra componentes.

- 🚪 **Endpoints**  
  Rotas HTTP do Flask que expõem os serviços (ex: `/login`, `/search`).

- 🧠 **Services Layer**  
  Lógica de negócio: autenticação, manipulação de usuários, etc.

- 🌐 **External API (FatSecret)**  
  Fornece informações nutricionais via autenticação OAuth2.

- 💾 **Database (MongoDB)**  
  Armazenamento de dados com modelagem flexível e persistência.

---

## 🚀 Tecnologias Utilizadas

- 🐍 **Python 3.11+**
- 🔥 **Flask**
- 🍃 **MongoDB**
- 🥗 **FatSecret Platform API**
- 📦 **Pydantic**, **PyMongo**, **Requests**

---

## 🛠️ Próximos Passos

- [x] Implementar autenticação de usuários
- [ ] Criar endpoints RESTful para perfis e planos alimentares
- [ ] Adicionar tratamento robusto de erros e logging
- [ ] Conectar com frontend em React
- [ ] Realizar deploy na AWS
- [ ] Adicionar testes automatizados

---

## 📝 Notas

- Crie um **ambiente virtual** para facilitar instalação de dependências.
- Sempre mantenha o `requirements.txt` atualizado.
- Em caso de erro "IP Inválido" da API externa, **registre seu IP no painel da FatSecret.**
- A arquitetura segue princípios de **Clean Code** e **Engenharia de Software Profissional**.

---

## 💡 Sobre o Projeto

O **EasyDiet** é um servidor backend robusto que facilita o acesso a dados nutricionais confiáveis.  
Ele também serve como base de aprendizado prático em Flask, APIs REST e arquitetura de software — mirando **padrões internacionais de qualidade**.

---

## DEPLOY

IP: http://50.16.164.251/

<!-- ## 🖋️ Autores

- **Gustavo Lima**
- **[GitHub: gustavolafz]** 
- **OUTROS AUTORES (COLOQUEM OS NOMES)**
- **[GitHub ou LinkedIn]** -->

<!-- > Desenvolvido com ❤️ por quem acredita em comida inteligente. -->

