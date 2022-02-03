const mongoose = require('mongoose')

const options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

mongoose.connect(`mongodb+srv://${process.env.MONGO_KEY}@cluster0.xndhz.mongodb.net/objects?retryWrites=true&w=majority`,
    options,
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connexion BDD réussie!');
        }
    }

)