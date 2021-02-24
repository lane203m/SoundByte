/*var registerPromiseWorker = require('promise-worker/register');
registerPromiseWorker((message) => {
  if(message.type === 'getPrimesMessage') {
    let amount = message.amount;
    // this function returns an array of primes
    // [1, 2, 3, 5, 7, 11, 13, ...]
    let primes = calculate_first_n_primes(amount);
    return JSON.stringify({ primes: primes });
  }
});

// worker.js
var registerPromiseWorker = require('promise-worker/register');
 
registerPromiseWorker(function (msg) {
  return {hello: 'main thread'};
});*/

const registerPromiseWorker = require('promise-worker/register');
registerPromiseWorker((message) => {
  if(message.type === 'getPrimesMessage') {
    let amount = message.amount;
    // this function returns an array of primes
    // [1, 2, 3, 5, 7, 11, 13, ...]
    let primes = calculate_first_n_primes(amount);
    return JSON.stringify({ primes: primes });
  }
});
