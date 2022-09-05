describe("Test submitPaymentInfo", function() {
  let storePaymentId;
  let curPayment;

  beforeAll(function () {
    storePaymentId = paymentId;
    billAmtInput.value = '200';
    tipAmtInput.value = '26';
    paymentId = 863;
    curPayment = submitPaymentInfo();
  });

  it('should create curPayment with correct bill amount', function () {
    expect(curPayment.billAmt).toBe('200');
  });

  it('should create curPayment with correct tip amount', function () {
    expect(curPayment.tipAmt).toBe('26');
  });

  it('should create curPayment with correct tip percentage', function () {
    expect(curPayment.tipPercent).toBe(13);
  });

  it('should reset Bill Amount input value', function () {
    expect(billAmtInput.value).toBe('');
  });

  it('should reset Tip Amount input value', function () {
    expect(tipAmtInput.value).toBe('');
  });

  it('should update count up payment id', function () {
    expect(paymentId).toBe(864);
  });

  afterAll(function() {
    billAmtInput.value = '';
    tipAmtInput.value = '';
    paymentId = storePaymentId;
    document.getElementById('payment864').remove();
    allPayments = {};
    summaryTds[0].innerHTML = '$0';
    summaryTds[1].innerHTML = '$0';
    summaryTds[2].innerHTML = '0%';
  });

});

describe("Test createCurPayment", function() {
    beforeEach(function () {
      billAmtInput.value = '200';
      tipAmtInput.value = '30';
    });
  
    it('should return an object with correct bill amount', function () {
      expect(createCurPayment().billAmt).toBe('200');
    });

    it('should return an object with correct tip amount', function () {
      expect(createCurPayment().tipAmt).toBe('30');
    });

    it('should return an object with correct tip percentage', function () {
      expect(createCurPayment().tipPercent).toBe(15);
    });

    it('should return nothing when there is a missing value', function () {
      billAmtInput.value = '';
      expect(createCurPayment()).toBe(undefined);
    });
  
    afterAll(function() {
      billAmtInput.value = '';
      tipAmtInput.value = '';
    });
  });

  describe("Test appendPaymentTable", function() {
    let sampleCurPayemnt = {
      billAmt: '200',
      tipAmt: '36',
      tipPercent: 18,
    }
    let storePaymentId;

    beforeAll(function() {
      storePaymentId = paymentId;
      paymentId = 938;
      appendPaymentTable(sampleCurPayemnt);
    });

    it('should append a tr', function () {
      expect(paymentTbody.children[0]).not.toBe(undefined);
    });

    it('should append a tr with an id according to paymentId', function () {
      expect(paymentTbody.children[0].id).toBe('payment938');
    });

    it('should append a tr that displays the correct bill amount', function () {
      expect(paymentTbody.children[0].children[0].firstChild.data).toBe('$200');
    });

    it('should append a tr that displays the correct tip amount', function () {
      expect(paymentTbody.children[0].children[1].firstChild.data).toBe('$36');
    });

    it('should append a tr that displays the correct tip percentage', function () {
      expect(paymentTbody.children[0].children[2].firstChild.data).toBe('18%');
    });

    it('should append a tr that displays an "x" to remove the tr', function () {
      expect(paymentTbody.children[0].children[3].firstChild.data).toBe('\u2716');
    });

    afterAll(function() {
      document.getElementById('payment938').remove();
      paymentId = storePaymentId;
    });

  });

  describe("Test updateSummary", function () {
    beforeEach(function() {
      allPayments = {
        payment1: {billAmt: '100', tipAmt: '16', tipPercent: 16},
        payment2: {billAmt: '50', tipAmt: '10', tipPercent: 20},
        payment3: {billAmt: '200', tipAmt: '30', tipPercent: 15}
      }
    });

    it('should display the correct Bill total', function () {
      updateSummary();
      expect(summaryTds[0].firstChild.data).toBe('$350');
    });

    it('should display the correct Tip total', function () {
      updateSummary();
      expect(summaryTds[1].firstChild.data).toBe('$56');
    });

    it('should display the correct Tip percent avg', function () {
      updateSummary();
      expect(summaryTds[2].firstChild.data).toBe('17%');
    });

    it('should display 0% if no payments', function () {
      allPayments = {};
      updateSummary();
      expect(summaryTds[2].firstChild.data).toBe('0%');
    });

    afterEach(function() {
      allPayments = {};
      summaryTds[0].innerHTML = '$0';
      summaryTds[1].innerHTML = '$0';
      summaryTds[2].innerHTML = '0%';
    });
  });