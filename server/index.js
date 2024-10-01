const express = require('express');
const path = require('path');

const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');

const app = express();
const port = 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');


const corsOptions ={
  origin:'http://localhost:3000',
  //credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/createComment', async function(request, response) {
  try {
    const { body } = request;
    const result = await comment.createComment(body);
    response.send(result);
  } catch (error) {
    response.status(500).send({ error: 'Failed to create comment' });
  }
});

app.get('/getComment', async function(request, response) {
  try {
    const { id } = request.query;
    if (!id) {
      return response.status(400).json({ error: 'ID is required' });
    }
    const result = await comment.getComment(id);
    if (!result) {
      return response.status(404).json({ error: 'Comment not found' });
    }
    response.status(200).json(result);
  } catch (error) {
    console.error('Error fetching comment:', error);
    res.status(500).json({ error: 'An error occurred while fetching the comment' });
  }
});

app.get('/getComments', async function(request, response) {
  comment.getComments().then(result => {
    response.send(result);
  });
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/public/index.html`);
});
