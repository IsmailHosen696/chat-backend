const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(process.env.CONNECTIOIN_URI).then(() => {
            console.log("db connected")
        }).catch((er) => {
            console.log(er);
            process.exit(1)
        })
    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}

module.exports = connection;