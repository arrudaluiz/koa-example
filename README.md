# Koa

## Instalação

```bash
# iniciar o repositório
npm init -y

# instalar o node na versão v7.6.0 ou superior para ter suporte ao padrão ES2015 e ao uso de funções assíncronas
npm install 7.6

# instalar o koa
npm i koa
```

## Exemplo desenvolvido: Lista de tarefas

### Middlewares utilizados

#### koa-logger:

É um registrador de _logs_ de servidor estilizado por padrão.

#### koa-body:

Utilizado para lidar com as requisições do tipo `application/json` feitas pelas rotas _POST_ e _PUT_ deste exemplo, realizando a conversão do objeto de contexto e posibilitando a recuperação do corpo da requisição através do atributo `ctx.request.body`.

#### koa-router:

Utilizado para criar os métodos dos verbos _http_ que chamam os métodos de controle atribuídos às rotas com o recurso e verbo equivalentes.

Exemplo: o método de controle `task.list` é chamado ao ser requisitado o recurso `/tasks` com o verbo _GET_, enquanto `task.create` é chamado requisitando o mesmo recurso `/tasks` mas com o verbo _POST_.

### Como executar

```bash
# instalar dependências
npm install

# iniciar servidor na porta 3000
npm run dev
```

> Obs.: as rotas podem ser importadas no Postman com o arquio `postman.json`.

Documentação: https://koajs.com/
