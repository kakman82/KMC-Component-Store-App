const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

//* .env;
dotenv.config();
//* Initialize Express
const app = express();

//* uncaughtException sonrası serveri durdurmak için ref: Jonas
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

//* MIDDLEWARES;
// cors hatası verdiğinde--> https://stackoverflow.com/questions/43150051/how-to-enable-cors-nodejs-with-express
app.use(cors());
// Logger Middleware - dev, tiny log da gösterim özelliklerinden biri https://www.npmjs.com/package/morgan
app.use(morgan('dev'));

// bodyParser için deprecate uyarısı veriyor yukarıdaki satırdaki gibi yani her zamanki gibi kullanınca. Expressin 4.16 sürümünden sonrakilerde gerek yokmuş yüklemeye, expressin kendi içindeki json metodunu kullanmak yeterli ref: https://stackoverflow.com/questions/66525078/bodyparser-is-deprecated
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* Api rate limit;
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100, // start blocking after 100 requests
  message: 'Too many accounts created from this IP, please try again after an hour',
});
app.use('/api', limiter);

//* MONGODB Conn;
const dbUrl = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@kmc-store-app.5eyad.mongodb.net/KMC?retryWrites=true&w=majority`;
mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('DB connection is successful!');
    }
  }
);

//* DEFINING ROUTES
const productRoutes = require('./routes/api/productRoutes');
const currencyRateRoutes = require('./routes/api/currencyRateRoutes');
const userRoutes = require('./routes/api/userRoutes');

app.use('/api', productRoutes);
app.use('/api', currencyRateRoutes);
app.use('/api', userRoutes);

//* 404 page: tanımlı route dışında bir url olduğunda ve bu url yi handle edecek bir funck da olmadığında 404 sayfa serverda bulunamadı hatası için;
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

//* Server Listen and start
//* process.env.PORT bu tanım Heroku deploy için
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
