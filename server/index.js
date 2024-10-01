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

// Enable CORS for all origins
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

app.get('/getComment', function(request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then(result => {
    response.send(result);
  });
});

app.get('/getComments', async function(request, response) {
  try {
    const result = await comment.getComments();
    if (!result || result.length === 0) {
      //result.setHeader("Access-Control-Allow-Origin", "*");
      return response.status(404).send({ error: 'No comments found' });
    }

    // Successfully return the result
    response.status(200).send(result);
  } catch (error) {
    // Handle specific errors (for example, database connection errors)
    console.error('Error fetching comments:', error);

    // Respond with a generic error message and status code
    response.status(500).send({ error: 'An error occurred while fetching comments' });
  }
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});

/*
app.delete('/deleteComment', async (req, res) => {
  const { id } = req.query; // Access the 'id' from the query string

  if (!id) {
    return res.status(400).send({ error: 'ID is required to delete comment' });
  }

  try {
    // Call the deleteComment method from the Comment class
    const result = await comment.deleteComment(id);

    // If a comment was deleted, send a success response
    if (result.changes > 0) {
      res.send({ message: `Comment with ID ${id} was deleted.` });
    } else {
      // If no comment was deleted (e.g., ID not found)
      res.status(404).send({ error: `Comment with ID ${id} not found.` });
    }
  } catch (error) {
    console.error('Error during delete operation:', error);
    res.status(500).send({ error: 'Failed to delete comment.' });
  }
});
*/

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/public/index.html`);
});
