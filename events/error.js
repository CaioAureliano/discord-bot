module.exports = (client) => {
    return {
        name: 'error',
        async execute(error) {
            console.error(error);
        },
    };
};