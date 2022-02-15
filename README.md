# Discord Bot

## Clonar o projeto

Escolha um diretório e clone o repositório:

```
git clone https://github.com/RenatoSTV/discord-bot.git
```

## Instalar

Instale as dependências do projeto:

```
yarn install
```

## config.json

Crie um arquivo na raiz do projeto com as seguintes informações:

```json
{
  "prefix": "Simbolo usado no começo de cada comando criado.",
  "token": "Token da aplicação do Discord.",
  "lolURL": "Url base do servidor escolhido da Riot. EX: 'https://br1.api.riotgames.com'",
  "lolAPItoken": "API Key de Desenvolvedor da Riot."
}
```

## Criando a aplicação no Discord

Vá até o site do [Discord Developers](https://discord.com/developers/applications) e crie seu Bot, é lá que você irá conseguir o token secreto para colocar nas informações do arquivo `config.json`

## Iniciar aplicação

Após tudo estár criado e configurado, inicie o projeto:

```
yarn start
```
