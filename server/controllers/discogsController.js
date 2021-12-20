const Discogs = require('disconnect').Client;
const axios = require('axios');
const USER_ID = 'noiseoversignal';
const USER_TOKEN = 'vRQsurQnyqBagkJeTeMEoDgqoHejdzrqpllwwudw';

const collection = new Discogs('Collector/1.0', { userToken: USER_TOKEN })
  .user()
  .collection();

const discogsController = {};

discogsController.getCollection = (req, res, next) => {
  collection.getReleases(
    USER_ID,
    1,
    { page: req.params.page, per_page: 20, sort: 'artist', sort_order: 'asc' },
    (err, data) => {
      if (!data) {
        return next({
          log: 'discogsController.getCollection: ERROR: error getting collection from Discogs',
          message: JSON.stringify(err),
        });
      }
      // console.log(data)
      res.locals.collection = data;
      return next();
    }
  );
};

discogsController.getFolders = (req, res, next) => {
  const URL = `https://api.discogs.com/users/${USER_ID}/collection/folders?User-Agent="collector/1.0"&token=${USER_TOKEN}`;
  try {
    axios(URL, {
      method: 'GET',
    }).then((data) => {
      res.locals.folders = data.data.folders;
      return next();
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

discogsController.createQueue = (req, res, next) => {
  let containsQueueFolder = false;
  try {
    for (let folder of res.locals.folders) {
      if (folder.name === 'CollectorQueue') {
        containsQueueFolder = true;
        res.locals.queueFolder = folder;
        return next();
      }
    }
  } catch (err) {
    console.log(err);
  }

  if (!containsQueueFolder) {
    const POST_URL =
      'https://api.discogs.com/users/noiseoversignal/collection/folders?User-Agent="collector/1.0"&token=vRQsurQnyqBagkJeTeMEoDgqoHejdzrqpllwwudw';
    const body = { name: 'CollectorQueue' };
    try {
      axios(POST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(body),
      }).then((data) => {
        res.locals.queueFolder = data.data;
        return next();
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }
};

discogsController.getQueue = (req, res, next) => {
  for (let folder of res.locals.folders) {
    if (folder.name === 'CollectorQueue') {
      QUEUE_ID = folder.id;
      break;
    }
  }
  const URL = `https://api.discogs.com/users/${USER_ID}/collection/folders/${QUEUE_ID}/releases?User-Agent="collector/1.0"&token=${USER_TOKEN}`;
  try {
    axios(URL, {
      method: 'GET',
    }).then((data) => {
      // console.log(data)
      res.locals.queue = data.data;
      return next();
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

discogsController.addToQueue = (req, res, next) => {
  for (let folder of res.locals.folders) {
    if (folder.name === 'CollectorQueue') {
      QUEUE_ID = folder.id;
      break;
    }
  }
  const URL = `https://api.discogs.com/users/${USER_ID}/collection/folders/${QUEUE_ID}/releases/${req.params.release}?User-Agent="collector/1.0"&token=${USER_TOKEN}`;
  try {
    axios(URL, {
      method: 'POST',
    }).then((data) => {
      console.log(data.data);
      res.locals.added = data.data;
      return next();
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

discogsController.deleteFromQueue = (req, res, next) => {
  for (let folder of res.locals.folders) {
    if (folder.name === 'CollectorQueue') {
      QUEUE_ID = folder.id;
      break;
    }
  }
  const URL = `https://api.discogs.com/users/${USER_ID}/collection/folders/${QUEUE_ID}/releases/${req.params.release}/instances/${req.params.instance}?User-Agent="collector/1.0"&token=${USER_TOKEN}`;
  try {
    axios.delete(URL).then((data) => {
      console.log(data.data);
      return next();
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = discogsController;
