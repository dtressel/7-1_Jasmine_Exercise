describe("Test calculateTipPercent", function() {
    it('should calculate the tip percent', function () {
      expect(calculateTipPercent(100, 10)).toBe(10);
      expect(calculateTipPercent(100, 0)).toBe(0);
      expect(calculateTipPercent(233, 233)).toBe(100);
      expect(calculateTipPercent(52, 7)).toBe(13);
    });
  });

describe("Test appendTd", function() {
  it('should append a td to the tr', function () {
    let sampleTr = document.createElement('tr');
    sampleTr.setAttribute('id', 'sample');
    appendTd(sampleTr, 'test');
    expect(sampleTr.firstElementChild.localName).toBe('td');
    expect(sampleTr.firstElementChild.firstChild.data).toBe('test');
  });
});

describe("Test appendDeleteBtn", function() {
  it('should append a delete button to the tr', function () {
    let sampleTr = document.createElement('tr');
    sampleTr.setAttribute('id', 'sample');
    appendDeleteBtn(sampleTr, 'test');
    expect(sampleTr.firstElementChild.localName).toBe('td');
    expect(sampleTr.firstElementChild.firstChild.data).toBe('\u2716');
  });
});

describe("Test sumPaymentTotal", function() {
  it('should sum the payments of a certain category', function () {
    allPayments = {
      payment1: {billAmt: '200', tipAmt: '30', tipPercent: 15},
      payment2: {billAmt: '50', tipAmt: '10', tipPercent: 20},
      payment3: {billAmt: '100', tipAmt: '18', tipPercent: 18}
  };
    expect(sumPaymentTotal('billAmt')).toBe(350);
    expect(sumPaymentTotal('tipAmt')).toBe(58);
    expect(sumPaymentTotal('tipPercent')).toBe(53);
  });

  afterEach(function() {
    allPayments = {};
  });
});

describe("Test addEListenerToDeleteX", function() {
  let testTable = document.createElement('table');
  let testTr = document.createElement('tr');
  let testTd = document.createElement('td');

  beforeEach(function () {
    testTable.style.display = 'none';
    testTr.setAttribute('id', 'test-tr-387');
    testTd.textContent = '\u2716'
    testTr.append(testTd);
    testTable.append(testTr);
    document.querySelector('body').append(testTable);
  });

  it('should add an event listener that deletes its parent when clicked', function () {
    addEListenerToDeleteX(testTd);
    expect(testTable.children[0].id).toBe('test-tr-387');
    testTd.click();
    expect(testTable.children[0]).toBe(undefined);
  });

  afterEach(function () {
    testTable.remove();
  });
});