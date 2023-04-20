# iesb-pos-backend


## Instalação

```bash
$ npm i
```

## Criando usuário no postgres


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
