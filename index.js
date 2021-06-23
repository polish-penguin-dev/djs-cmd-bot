console.log("The scripts are loading, hopefully no errors.")
const Discord = require("discord.js")
const client = new Discord.Client


client.on("ready", () => { 
console.log("The bot is ready.")


client.api.applications(client.user.id).commands.post({
    data: {
        name: "announcement",
        description: "announce something!",

        options: [
            {
                name: "content",
                description: "announcement message",
                type: 3,
                required: true
            }
        ]
    }

});

client.api.applications(client.user.id).commands.post({
    data: {
        name: "penguin",
        description: "I wonder what this does!"
    }

});


client.ws.on("INTERACTION_CREATE", async interaction => {
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;

    if (command == "penguin") {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "penguin. Yes, I do agree indeed with that statement."
                }
            }
        });
    }

    if (command == "announcement") {
        const description = args.find(arg => arg.name.toLowerCase() == "content").value;
        const embed = new Discord.MessageEmbed()
        .setTitle("ANNOUNCEMENT!")
        .setDescription("@here " + description)
        .setColor("BLUE");
    


client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
        type: 4,
        data: await createAPIMessage(interaction, embed)
    }
});
    }

});
});

async function createAPIMessage(interaction, content) {
    const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
    .resolveData()
    .resolveFiles();

    return {...apiMessage.data, files: apiMessage.files };
}

client.login(process.env.token);
