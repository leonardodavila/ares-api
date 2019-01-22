const DatapathService = require('./datapath-service');

const getDatapaths = function(req, res) {
  const dbConnection = req._rdbConn;
  const networkId = req.params.networkId;
  const datapathsPromise = DatapathService.listDatapaths(dbConnection, networkId);

  datapathsPromise
    .then(function(datapaths) {
      res.send(datapaths);
    })
    .catch(function(err) {
      res.status(500).json({ message: 'Um erro aconteceu' });
    });
};

const getDatapathById = function(req, res) {
  const dbConnection = req._rdbConn;
  const networkId = req.params.networkId;
  const id = req.params.id;
  const datapathPromise = DatapathService.getDatapathById(dbConnection, networkId, id);

  datapathPromise
    .then(function(datapath) {
      if (datapath) {
        res.send(datapath);
      } else {
        res.status(404).json({ message: 'Recurso não encontrado' });
      }
    })
    .catch(function(err) {
      res.send(404).json({ message: err });
    });
};

module.exports = {
  getDatapaths: getDatapaths,
  getDatapathById: getDatapathById
};
