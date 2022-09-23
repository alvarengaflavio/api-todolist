const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./src/routes/todos.route');
const swaggerRoute = require('./src/swagger/swagger.route');
const port = {};

process.env.NODE_ENV !== 'production'
  ? (require('dotenv').config(),
    (port.port = process.env.devPORT),
    (port.url = process.env.devURL))
  : ((port.port = process.env.PORT), (port.url = port.port));

const connectToDatabase = require('./src/database/database');
/* Novo trecho */
connectToDatabase();
/* Novo Trecho */

app.use(express.json());
app.use(cors());
app.use('/todos', routes);
app.use('/api-docs', swaggerRoute);

app.listen(port.port, () => {
  console.log(`Server listening on ${port.url}`);
});

/*    npm run dev     */
