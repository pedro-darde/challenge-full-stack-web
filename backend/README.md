# BACKEND

## Comandos
- Gerar uma nova migration <br /> 
    $-$ ```npm run typeorm migration:create -- -n "nome-da-migration"```
- Rodar as migrations <br />
  $-$  ```npm run typeorm migration:run```
- Iniciar api <br />
  $-$  ```npm run dev```


## Passos
- ```npm install```
- ```cp .env.example .env```
- Configurar o .env do projeto, apontar para a database etc.
- Após instalar os pacotes e configurar o .env, rodar: ```npm run dev```