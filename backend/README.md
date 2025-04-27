# 🍎 EasyDiet Backend

## Visão Geral

O **EasyDiet** é uma aplicação que conecta o cliente do aplicativo a informações nutricionais de alimentos de forma simples e intuitiva.  
O backend é desenvolvido com **Flask**, seguindo boas práticas de organização de código, segurança e escalabilidade.

Este projeto é o ponto de partida para a criação de uma plataforma web onde usuários poderão pesquisar alimentos, consultar informações nutricionais e futuramente, montar suas próprias dietas personalizadas.

---

## Funcionalidades Desenvolvidas até Agora

- **Configuração de Ambiente Segura:**  
  Utilização de variáveis de ambiente (`.env`) para proteger dados sensíveis como `CLIENT_ID`, `CLIENT_SECRET` e `API_URL`.

- **Organização de Rotas com Blueprints:**  
  Modularização de endpoints utilizando o sistema de `Blueprints` do Flask para manter o projeto limpo e escalável.

- **Integração com API Externa (FatSecret):**  
  - Configuração inicial de autenticação OAuth2.
  - Realização de buscas simples de alimentos (por exemplo, "Apple") utilizando o token de acesso.
  - Estruturação de chamadas HTTP à API externa utilizando `requests`.

- **Tratamento de IP Restrictions:**  
  - Ajuste de permissões na API externa para permitir requisições a partir de IPs dinâmicos durante o desenvolvimento.

---

## **Estrutura do Projeto**

```bash
server/
│
├── api/
│   ├── endpoints/
│   │   ├── food_search.py   # Endpoints relacionados a pesquisa de alimentos
│   │   └── __init__.py      # Organização de Blueprints
│   └── __init__.py          # Inicialização da API
│
├── config/
│   └── config.py            # Carregamento de variáveis de ambiente
│
├── app.py                   # Criação da aplicação Flask
│
└── .env                     # Variáveis sensíveis (não commitado no repositório)
```

## Tecnologias Utilizadas

- **Python 3.11+**
- **Flask**
- **Requests**
- **FatSecret Platform API**

---

## 🎯 Próximos Passos

- Implementar autenticação de usuários (login/cadastro).
- Montar endpoints RESTful para gerenciar perfis e planos alimentares.
- Criar camada de cache para o token de acesso da API externa.
- Implementar tratamento completo de erros e logs de requisições.
- Conectar o frontend em React com os endpoints criados.
- Aplicar testes automatizados para garantir robustez do backend.

---

## Notas

- **Crie um ambiente virtual para trabalhar no projeto,** isso vai otimizar o seu tempo instalando dependências da aplicação, e tenha sempre noção de adicionar qualquer nova atualização de biblioteca ao `requirements.txt`, isso facilita muito o vercionamento do código.
- Devido a uma limitação do serviço, durante o desenvolvimento local, **as restrições de IP da API externa não serão desabilitadas**, o que pode dificultar testes e integração, ocorra um erro de IP Inválido, acesse as **restrições no site do serviço e registre seu IP.**
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
