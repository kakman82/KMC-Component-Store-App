const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//* Initialize Express
const app = express();

//* MIDDLEWARES;
// cors hatası verdiğinde--> https://stackoverflow.com/questions/43150051/how-to-enable-cors-nodejs-with-express
app.use(cors());
// Logger Middleware - dev, tiny log da gösterim özelliklerinden biri https://www.npmjs.com/package/morgan
app.use(morgan('dev'));

// bodyParser için deprecate uyarısı veriyor yukarıdaki satırdaki gibi yani her zamanki gibi kullanınca. Expressin 4.16 sürümünden sonrakilerde gerek yokmuş yüklemeye, expressin kendi içindeki json metodunu kullanmak yeterli ref: https://stackoverflow.com/questions/66525078/bodyparser-is-deprecated
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* DEFINING ROUTES
const productRoutes = require('./routes/api/productRoutes');
const currencyRateRoutes = require('./routes/api/currencyRateRoutes');

app.use('/api', productRoutes);
app.use('/api', currencyRateRoutes);

//* process.env.PORT bu tanım Heroku deploy için
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
