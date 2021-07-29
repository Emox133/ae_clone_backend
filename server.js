const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({
    path: `${__dirname}/config.env`
})

const PORT = process.env.PORT || 5000
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('Konekcija sa bazom podataka uspješna...'))

app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});