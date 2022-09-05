describe("Servers test (with setup and tear-down)", function() {
  let storeServerId;
  beforeEach(function () {
    serverNameInput.value = 'Alice';
    storeServerId = serverId;
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  afterEach(function() {
    allServers = {};
    serverTbody.innerHTML = '';
    serverId = storeServerId;
  });
});

describe("Test updateServerTable", function() {
  beforeAll(function() {
    allPayments = {
      payment1: {billAmt: '100', tipAmt: '16', tipPercent: 16},
      payment2: {billAmt: '200', tipAmt: '30', tipPercent: 15}
    }
    allServers = {
      server1: {serverName: 'Jasmina'},
      server2: {serverName: 'Fred'},
      server3: {serverName: 'Montaliya'}
    }
    updateServerTable();
  });

  it('should calculate the correct tip average and append tr to tbody', function () {
    expect(serverTbody.children[0].children[1].firstChild.data).toBe('$15.33');
    expect(serverTbody.children[1].children[0].firstChild.data).toBe('Fred');
    expect(serverTbody.children[2].children[2].firstChild.data).toBe('\u2716');
  });

  afterEach(function() {
    allPayments = {};
    allServers = {};
    serverTbody.innerHTML = '';
    summaryTds[0].innerHTML = '$0';
    summaryTds[1].innerHTML = '$0';
    summaryTds[2].innerHTML = '0%';
  });
})