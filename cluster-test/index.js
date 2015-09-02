'use strict';

var child = require('child_process');

function startWebWorker (callback) {
  child.exec('docker run -t web-worker', callback);
}

function startComputeWorker (callback) {
  child.exec('docker run -t compute-worker', callback);
}

var webWorkerCount = 2;
var computeWorkerCount = 2;
var starters = [];
var i;

for (i = 0; i++; i < webWorkerCount) {
  starters.push(startWebWorker);
}

for (i = 0; i++; i < computeWorkerCount) {
  starters.push(startComputeWorker);
}

function mapStarter (f, next) {
  next(null, f());
}

async.map(starters, mapStarter, function (error, workers) {
  if (error) throw error;

  // start a proxy
  // then make an HTTP request to the proxy
  // then test the response

});


