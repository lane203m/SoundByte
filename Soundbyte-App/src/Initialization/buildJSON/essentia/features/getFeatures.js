import PromiseWorker from 'promise-worker';
import Worker from '../../workers/primes/node_modules/worker-loader!./essentiaFeatureWorker';
const worker = new Worker();
const promiseWorker = new PromiseWorker(worker);
const getPrimes = (amount) => promiseWorker.postMessage({
  type: 'getPrimesMessage', amount
});
export default { getPrimes }
