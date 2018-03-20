import SimpleWorker from './workers/simple.worker.js'
import PointlessWorker from './workers/pointless_calc.worker'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./dist/service-worker.js').then(registration => {
      console.log('SW registered 🎉: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed 😬: ', registrationError)
    })
  })
}

let w = new SimpleWorker()
let pw = new PointlessWorker()
let resultContainer = document.getElementById('resultContainer')
let btnNoWorker = document.getElementById('btnNoWorker')
let btnWorker = document.getElementById('btnWorker')

const iterations = 500
const multiplier = 1000000000

function calculatePrimes (iterations, multiplier) {
  var primes = []
  for (var i = 0; i < iterations; i++) {
    var candidate = i * (multiplier * Math.random())
    var isPrime = true
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
        // not prime
        isPrime = false
        break
      }
    }
    if (isPrime) {
      primes.push(candidate)
    }
  }
  return primes
}

function doPointlessComputationsWithBlocking () {
  let primes = calculatePrimes(iterations, multiplier)
  resultContainer.innerText = Math.random()
  console.log(primes)
}

btnWorker.addEventListener('click', () => {
  w.postMessage('ping')
  w.onmessage = event => {
    console.log(event.data)
  }

  pw.postMessage({
    iterations: iterations,
    multiplier: multiplier
  })
  pw.onmessage = event => {
    resultContainer.innerText = Math.random()
    console.log(event.data)
  }
})

btnNoWorker.addEventListener('click', function () {
  doPointlessComputationsWithBlocking()
})
