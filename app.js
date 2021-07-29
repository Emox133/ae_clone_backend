const express = require("express");
const paypal = require("paypal-rest-sdk");
const cors = require('cors')
const productsRouter = require('./routers/productRouter')
const paymentRouter = require('./routers/paymentRouter')
const cartRouter = require('./routers/cartRouter')
const globalErrorHandler = require('./controllers/errorController')
const usersRouter = require('./routers/usersRouter')

const app = express();
app.use(cors())
app.use(express.json())

paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id:
        "AWng1JEcR7_mPCdRIAvuL3InCTSXaHCugwWQ3mWOnqAjW9NMI1auQQQyxn2JWPOQFIbR8-x-_9OOf1if",
    client_secret:
        "EDGwoYyHiNTtOFW0ugpvEuQH9JYjnY2xE-Va2INvpKhvDs_MCQITItIwULd8olQ_FijxogpTPTksdIB6"
});

app.get("/", (req, res) => {
    res.render("index");
});

app.use('/api/v1/products', productsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/cart', cartRouter)

app.all('*', (req, res, next) => {
    res.status(404).json({
        message: `Stranica ${req.originalUrl} nije pronađena.`
    })
}); 

app.use(globalErrorHandler)

module.exports = app