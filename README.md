# ig-news
Blog de notícias por assinatura. Desenvolvido durante o Ignite da Rocketseat (Trilha Reactjs)

## Projeto 

 - Login com usuário do Github utilizando Next-Auth;
 - Pagamentos via Stripe.
 - SSG e SSG
 - Armazenamento de dados com FaunaDB;
 - PrismicCMS para gerenciamento de conteúdo
 - Página de preview do conteúdo;
 
https://user-images.githubusercontent.com/82395681/137013122-600bfded-a496-416c-b2b8-daf7ca52a74f.mp4


## 💻 Tecnologias
 - [React](https://pt-br.reactjs.org/)
 - [Nextjs](https://nextjs.org/)
 - [NextAuth](https://next-auth.js.org/)
 - [FaunaDB](https://fauna.com/)
 - [Stripe](https://stripe.com/en-br)
 - [PrismicCMS](https://prismic.io/)
 - [Axios](https://axios-http.com/)
 - [Sass](https://sass-lang.com/)

# Instalação e uso

## Configurações necessárias

### **Requisitos**

Criar conta e configurar os serviços externos:
*Configurações dos serviços estão localizadas no arquivo servicesConfig.md na raiz do projeto.*
- [Stripe](https://stripe.com/)
- [FaunaDB](https://fauna.com/)
- [Prismic CMS](https://prismic.io/)

### **Clone do projeto**

```bash
# Abra um terminal e copie este repositório com o comando
$ git clone https://github.com/arthurllopes/ig-news.git
# Entre na pasta do repositório clonado
$ cd ig-news
```

### **Iniciando o projeto**

```
# Instale as dependências
npm install

# Na raiz do projeto crie uma copia do arquivo .env.local.example
# Altere o nome da copia para .env.local
# Preencha as variáveis ambiente de acordo com as instruções
$ cp .env.local.example .env.local

# Execute stripe listen para ouvir eventos do webhook
$ stripe listen --forward-to localhost:3000/api/webhooks 

# Rode a aplicação
npm start
```
<br>

## Autor
Feito por Arthur Lopes 👋🏽 Entre em contato!
