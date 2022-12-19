const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.2'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": "",
  "tts": false,
  "components": [
    {
      "type": 1,
      "components": [
        {
          "style": 3,
          "label": `Next meme`,
          "custom_id": `row_0_button_0`,
          "disabled": false,
          "emoji": {
            "id": null,
            "name": `⏭`
          },
          "type": 2
        }
      ]
    }
  ],
  "embeds": [
    {
      "type": "rich",
      "title": `NES සිරිපාල`,
      "description": `Sinhala memes`,
      "color": 0x00FFFF,
      "timestamp": `2001-11-30T18:00:00.000Z`,
      "image": {
        "url": `https://i.imgur.com/w3duR07.png\n`,
        "height": 0,
        "width": 0
      },
      "footer": {
        "text": `Powered by NES සිරිපාල memes! | Meme requested by {ctx.author}`
      }
    }
  ]
});