const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.listen(port);

app.get('/', (req, res) => {
    res.send('Howdy yall, its a me, QynNyn!');
});

console.log(`Server started on port ${port}`);
