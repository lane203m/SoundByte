/*var PromiseWorker = require('promise-worker');
//var Worker = require('worker.js');
const worker = new Worker('../buildJSON/workers/primes/worker');
const promiseWorker = new PromiseWorker(worker);
const getPrimes = (amount) => promiseWorker.postMessage({
  type: 'getPrimesMessage', amount
});
module.exports = getPrimes;


var PromiseWorker = require('promise-worker');
var worker = new Worker('../buildJSON/workers/primes/worker.js');
var promiseWorker = new PromiseWorker(worker);
 
function log(str) {
  console.log(str);
  //display.innerHTML += str + '\n';
}
var msg = {hello: 'worker'};
log('Sending message to worker: ' + JSON.stringify(msg));
promiseWorker.postMessage(msg).then(function (response) {
  log('Got response: ' + JSON.stringify(response));
});*/

const PromiseWorker = require('promise-worker');
const Worker = require( 'worker-loader!./worker');
const worker = new Worker();
const promiseWorker = new PromiseWorker(worker);
const getPrimes = (amount) => promiseWorker.postMessage({
  type: 'getPrimesMessage', amount
});
module.exports = { getPrimes }