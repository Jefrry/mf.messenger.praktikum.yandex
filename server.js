const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/static`));

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}/`);
});