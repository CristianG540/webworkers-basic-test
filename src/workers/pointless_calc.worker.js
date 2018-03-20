/* eslint-env serviceworker */

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

self.addEventListener('message', e => {
  const d = e.data
  let primes = calculatePrimes(d.iterations, d.multiplier)
  self.postMessage(primes)
})
