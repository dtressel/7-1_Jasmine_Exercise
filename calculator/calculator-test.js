
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({amount: 100000, years: 30, rate: 6.9})).toBe('$658.60')
  expect(calculateMonthlyPayment({amount: 500000, years: 10, rate: 3.9})).toBe('$5,038.53')
  expect(calculateMonthlyPayment({amount: 120000, years: 10, rate: 0})).toBe('$1,000.00')
});


it("should return a result with 2 decimal places", function() {
  let amount;
  let years;
  let rate;
  for (let i = 0; i < 1000; i++) {
    amount = Math.floor(Math.random() * 1000001);
    years = Math.floor(Math.random() * 50) + 1;
    rate = Math.floor(Math.random() * 1600) / 100;
    expect(calculateMonthlyPayment({amount: amount, years: years, rate: rate})[calculateMonthlyPayment({amount: amount, years: years, rate: rate}).length - 3]).toBe('.')
  }
});

/// etc
