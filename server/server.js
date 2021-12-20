const path = require('path');
const express = require('express');
const app = express();

// const apiRouter = require('./routes/api');
const discogsController = require('./controllers/discogsController')

const PORT = 3000;
// const CONSUMER_KEY = 'yMwYqZmzFMRrxIfSdXHT';
// const CONSUMER_SECRET = 'YVZaOKrYMgMmMsNZcMvLCBGCOAeSEsZw';

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../client')));

/**
 * define route handlers
 */
// app.use('/api', apiRouter);

app.get('/api/getFolders', discogsController.getFolders, (req, res) => {
  res.status(200).json(res.locals.folders);
})
app.get('/api/getCollection/:page', discogsController.getCollection, (req, res) => {
  res.status(200).json({
    collection: res.locals.collection.releases, 
    totalPages: res.locals.collection.pagination.pages,
    totalReleases: res.locals.collection.pagination.items
  })
})

app.get('/api/getQueue/', discogsController.getFolders, discogsController.getQueue, (req, res) => {
  res.status(200).json({
    collection: res.locals.queue.releases, 
    totalPages: res.locals.queue.pagination.pages
  })
})

app.post('/api/createQueue', discogsController.getFolders, discogsController.createQueue, (req, res) => {
  res.status(201).json(res.locals.queueFolder);
})

app.post('/api/addToQueue/:release', discogsController.getFolders, discogsController.addToQueue, discogsController.getQueue, (req, res) => {
  res.status(201).json(res.locals.added);
})

app.delete('/api/deleteFromQueue/:release/:instance', discogsController.getFolders, discogsController.deleteFromQueue, (req, res) => {
  res.status(204).json('Release deleted.')
})

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
