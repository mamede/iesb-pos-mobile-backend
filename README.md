# iesb-pos-backend


## Instalação

```bash
$ npm i
```

Lembre-se de usar o comando abaixo para copiar o .env.example e definir no arquivo .env as configurações dos dados de acesso do seu banco!

```shell
cp .env.example .env
```
 
```js
TYPEORM_HOST=
TYPEORM_PORT=
TYPEORM_USERNAME=
TYPEORM_PASSWORD=
TYPEORM_DATABASE=
```
## Criando usuário no postgres
Use os comandos abaixo:
```sql
CREATE ROLE username WITH LOGIN PASSWORD 'iesbpos123';

ALTER ROLE username CREATEDB;

CREATE DATABASE "nome do banco"
```


## Rodando o app
Utilize o comando abaixo
```bash
$ npm run start:dev
```

## Criando seu usuário.
Rode o comando `npm run typeorm migration:run` e após isso acesse a rota `/api/v1/users/register`
No corpo da requisição adicione o json abaixo:
```json
{
  "username": "username",
  "password": "iesbpos123"
}
```

## Login
Após criar seu usuário acesse a rota `` e insira no corpo da requisição o json abaixo:
```json
{
  "username": "username",
  "password": "iesbpos123"
}
```

## Database
Para checar se o database está up, acesse a rota `v1/healtz`
Você terá uma resposta parecida com essa abaixo

```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "database": {
      "status": "up"
    }
  }
}
```

## Swagger
As rotas estão documentadas usando o swagger, basta acessar a rota `/docs`
