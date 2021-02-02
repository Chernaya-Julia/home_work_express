const { readJSON, writeJSON } = require('./utils');
const { join } = require('path');
//const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

const usersAddr = join(__dirname, './users.json');
const levelsAddr = join(__dirname, './levels.json');
app.use(express.json());
app.use(bodyParser.json());

app.get('/get', (req, res) => {
  readJSON(usersAddr, (_, data) => {
    res.send(data);
  });
});

app.post('/add', ({ body }, res) => {
  readJSON(usersAddr, (_, data) => {
    const lastUser = data[data.length - 1];
    const newData = [
      ...data,
      {
        ...body,
        id: ((lastUser && lastUser.id) || 0) + 1,
      },
    ];
    writeJSON(usersAddr, newData, () => {
      res.send(newData);
    });
  });
});

app.delete('/:id', ({ params }, res) => {
  readJSON(userAddr, (_, data) => {
    const newData = data.filter((usr) => {
        return (usr.id != id);
    });
    writeJSON(userAddr, 
        newData,
        () => {
            res.send(newData);
        }
    );
  });
});

app.patch('/:id', ({ body, params }, res) => {
  readJSON(userAddr, (_, data) => {
    const newData = data.map((usr) => {
        if (usr.id == id) {
            for (var key in usr) {
                usr[key] = body[key]?body[key]:usr[key]
            }
        } 
        return usr;
    });
    writeJSON(userAddr, 
        newData,
        () => {
            res.send(newData);
        }
    );
  });
});


app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`);
});
