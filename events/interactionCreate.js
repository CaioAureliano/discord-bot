module.exports = (client) => {
    return {
        name: 'interactionCreate',
        async execute(interaction) {
            const command = client.commands.get(interaction.commandName);
    
            if (!command) return;
    
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
            }
        },
    }
};