# iesb-pos-backend


## Instalação

```bash
$ npm i
```

## Criando usuário no postgres


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
## Rodando o app
Utilize o comando abaixo
```bash
$ npm run start:dev
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
