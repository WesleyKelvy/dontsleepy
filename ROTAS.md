# Documentação das Rotas da API - dont-sleepy-back

## Como usar no Insomnia

1. Abra o Insomnia.
2. Crie uma nova requisição.
3. Escolha o método (GET, POST, PATCH, DELETE).
4. Coloque a URL (exemplo: `http://localhost:3000/users/create`).
5. Se precisar enviar dados, use o corpo da requisição (Body) no formato JSON.
6. Para rotas protegidas, faça login primeiro e use o token JWT como Bearer Token em "Auth".

---

## Rotas de Usuário

### Criar usuário

- **POST /users/create**
- Cria um novo usuário.
- **Body:**

```json
{
    "email": "seu@email.com",
    "name": "Seu Nome",
    "password": "suasenha",
    "birthDate": "2000-01-01",
    "cep": "12345678",
    "estado": "SP",
    "cidade": "São Paulo",
    "uf": "SP",
    "bairro": "Centro",
    "rua": "Rua Exemplo",
    "numero": "123"
}
```

- **Explicação:** Você cria sua conta colocando seus dados. Igual criar um perfil em um joguinho.

### Listar todos os usuários

- **GET /users/all**
- Lista todos os usuários cadastrados.
- **Explicação:** Mostra todo mundo que já criou conta (só para testes, normalmente não se usa em produção).

### Atualizar dados do usuário

- **PATCH /users/update**
- Atualiza informações do usuário logado (menos e-mail e senha).
- **Body:**

```json
{
    "name": "Novo Nome",
    "birthDate": "2000-01-01",
    "cep": "87654321",
    "estado": "RJ",
    "cidade": "Rio de Janeiro",
    "uf": "RJ",
    "bairro": "Bairro Novo",
    "rua": "Rua Nova",
    "numero": "321"
}
```

- **Explicação:** Você pode mudar seu nome, endereço, etc. Mas não pode trocar o e-mail nem a senha por aqui.

---

## Rotas de Autenticação

### Login

- **POST /auth/login**
- Faz login e retorna um token JWT.
- **Body:**

```json
{
    "email": "seu@email.com",
    "password": "suasenha"
}
```

- **Explicação:** Você entra na sua conta. O sistema te dá uma "chave mágica" (token) para acessar as rotas protegidas.

---

## Rotas de Soneca (Sleep)

### Criar soneca

- **POST /sleep**
- Registra uma nova soneca para o usuário logado.
- **Body:**

```json
{
    "start": "2025-05-27T13:00:00.000Z",
    "end": "2025-05-27T13:30:00.000Z"
}
```

- **Explicação:** Marca quando você dormiu e acordou. O sistema calcula quanto tempo você dormiu.

### Listar todas as sonecas

- **GET /sleep**
- Lista todas as sonecas do usuário logado.
- **Explicação:** Mostra todas as vezes que você dormiu.

### Ver detalhes de uma soneca

- **GET /sleep/:id**
- Mostra detalhes de uma soneca específica.
- **Explicação:** Mostra informações de uma soneca só.

### Atualizar uma soneca

- **PATCH /sleep/:id**
- Atualiza os horários de uma soneca.
- **Body:**

```json
{
    "start": "2025-05-27T14:00:00.000Z",
    "end": "2025-05-27T14:30:00.000Z"
}
```

- **Explicação:** Corrige o horário de uma soneca, caso tenha errado.

### Deletar uma soneca

- **DELETE /sleep/:id**
- Remove uma soneca do histórico.
- **Explicação:** Apaga uma soneca que não quer mais guardar.

### Histórico semanal de sonecas

- **GET /sleep/history/weekly?date=YYYY-MM-DD**
- Mostra quantas sonecas você teve na semana da data informada (ou da semana atual se não passar data).
- **Explicação:** Conta quantas vezes você dormiu na semana.

### Histórico mensal de sonecas

- **GET /sleep/history/monthly?date=YYYY-MM-DD**
- Mostra quantas sonecas você teve no mês da data informada (ou do mês atual se não passar data).
- **Explicação:** Conta quantas vezes você dormiu no mês.

### Histórico anual de sonecas

- **GET /sleep/history/yearly?date=YYYY-MM-DD**
- Mostra quantas sonecas você teve no ano da data informada (ou do ano atual se não passar data).
- **Explicação:** Conta quantas vezes você dormiu no ano.

### Tempo desde a última soneca

- **GET /sleep/time-since-last**
- Mostra há quantos dias e horas você não dorme.
- **Explicação:** Diz quanto tempo faz que você não dorme (tipo um cronômetro de sono).

### Sonecas do último mês

- **GET /sleep/last-month**
- Lista todas as sonecas do mês atual, mostrando o dia, início, fim e duração.
- **Explicação:** Mostra todas as sonecas do mês, para você ver seu histórico recente.

---

## Observações

- Sempre use o token JWT nas rotas protegidas (todas de sleep e atualização de usuário).
- Para passar o token no Insomnia, vá em "Auth" e escolha "Bearer Token".
- Datas devem estar no formato ISO (exemplo: `2025-05-27T13:00:00.000Z`).
