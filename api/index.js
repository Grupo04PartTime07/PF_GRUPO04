const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const Categories = require('./src/models/Categories.js');



conn.sync({ alter: true }).then(() => {
  server.listen(3001, () => {
    console.log('** Listening at 3001**');
  });
});
