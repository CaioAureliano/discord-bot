module.exports = (client) => {
    return {
        name: 'ready',
        once: true,
        execute(client) {
            console.log('Ready!');
        },
    }
};