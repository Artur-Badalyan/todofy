const express = require('express');
const cors = require('cors');
const routes = require('./routes/userRoutes');
const db = require('./models');

const app = express();
require('dotenv').config();

// app.use(cors());
// app.use(express.json());
app.use((req,res) => {
    console.log('\n\n\n 1111111')
})
app.use(routes);
const { PORT } = process.env;

db.sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`listening on: http://localhost:${PORT}`);
    });
});
