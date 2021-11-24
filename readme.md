# URL Shortener

<div align="center"></br>
  <img alt="API badge" src="https://img.shields.io/badge/API%20REST-E64D80?style=for-the-badge" />
  <img alt="NodeJS badge" src="https://img.shields.io/badge/Node.js-90C53F?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img alt="ExpressJS badge" src="https://img.shields.io/badge/Express.js-333331?style=for-the-badge" />
  <img alt="Sequelize badge" src="https://img.shields.io/badge/Sequelize-00B1EA?style=for-the-badge&logo=sequelize&logoColor=white" />
</div></br>

Aplicação responsável por encurtar urls, serviço muito usado na internet. O serviço também pode informar sobre urls geradas, mostrando, o número de acessos e a data do último acesso.


---

# Iniciando

Saída no console se tudo estiver certo ao iniciar a `API REST`.

    API IS RUNNING AT: http://127.0.0.1:3000
    DATABASE OK

**`URL BASE:`** **`http://127.0.0.1:3000`**

---

# Encurtando URL

| URL               | método     |
|-------------------|------------|
| **`/shortenurl`** | **`POST`** |

**Parâmetro obrigatório**

| Campo     | Tipo         | In   | Descrição              |
|-----------|--------------|------|------------------------|
| **`url`** | **`string`** | body | url que será encurtada |

**Exemplo do body**

```json
{
	"url": "https://github.com/FelipeDasr/url-shortener-api"
}
```

**Resposta de sucesso**

**Código**: **`201 CREATED`**

```json
{
  "shortUrl": "http://127.0.0.1:3000/raklgnK",
  "code": "raklgnK"
}
```

---

# Acessando url

| URL             | método    |
|-----------------|-----------|
| **`/:urlCode`** | **`GET`** |

**Parâmetro obrigatório**

| Campo          | Tipo         | In       | Descrição               |
|----------------|--------------|----------|-------------------------|
| **`:urlCode`** | **`string`** | url path | código da url encurtada |

**Exemplo de acesso**

**`GET`** **`http://127.0.0.1:3000/:urlCode`**

**`GET`** **`http://127.0.0.1:3000/raklgnK`**

**Direcionamento para a página original esperada**

---

# Estatísticas da URL

| URL                        | método    |
|----------------------------|-----------|
| **`/statistics/:urlCode`** | **`GET`** |

**Parâmetro obrigatório**

| Campo          | Tipo         | In       | Descrição               |
|----------------|--------------|----------|-------------------------|
| **`:urlCode`** | **`string`** | url path | código da url encurtada |

**Exemplo do requisição**

**`GET`** **`http://127.0.0.1:3000/statistics/:urlCode`**

**`GET`** **`http://127.0.0.1:3000/statistics/raklgnK`**

**Resposta de sucesso**

**Código**: **`200 OK`**

```json
{
  "shortUrl": {
    "originalUrl": "https://github.com/FelipeDasr/url-shortener-api",
    "code": "raklgnK",
    "hits": 9,
    "createdAt": "2021-11-24T00:56:22.287Z",
    "lastHit": "2021-11-24T01:09:14.066Z"
  },
  "error": false
}
```