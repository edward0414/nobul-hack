web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"AssetList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"assetInventory","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"Asset","type":"bytes32"}],"name":"totalByAsset","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"Asset","type":"bytes32"}],"name":"addAssetToInventory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"Asset","type":"bytes32"}],"name":"validAsset","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"AssetNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"asset","type":"bytes32"},{"indexed":false,"name":"assetCount","type":"uint8"}],"name":"AssetAdded","type":"event"}]');
AssetTrackerContract = web3.eth.contract(abi);
// In your nodejs AssetTrackerContract, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = AssetTrackerContract.at("0xcc846d6d5e8c59400c8f23be010dc468af6fe88c");
assets = {"Waivers": "asset-1", "Conditions": "asset-2", "Legal": "asset-3", "Money": "asset-4"}
assetsArray = ['Waivers', 'Conditions', 'Legal', 'Money'];
isCompleteArray = [false, false, false, false];
//deployedContract = AssetTrackerContract.new(['Waivers', 'Conditions', 'Legal', 'Money'], {data: byteCode, from:web3.eth.accounts[0], gas:4700000})
// ['Waivers', 'Conditions', 'Legal', 'Money']
function addAssetToInventory() {
  assetName = $("#asset").val();
  contractInstance.addAssetToInventory(assetName, {from: web3.eth.accounts[0]}, function() {
    let div_id = assets[assetName];
    $("#" + div_id).html(contractInstance.totalByAsset.call(assetName).toString());
  });
}

function addWaiver() {
  assetName = "Waivers";
  contractInstance.addAssetToInventory(assetName, {from: web3.eth.accounts[0]}, function() {
    let div_id = assets[assetName];
    $("#" + div_id).html(contractInstance.totalByAsset.call(assetName).toString());
  });
}
function addConditions() {
  assetName = "Conditions";
  contractInstance.addAssetToInventory(assetName, {from: web3.eth.accounts[0]}, function() {
    let div_id = assets[assetName];
    $("#" + div_id).html(contractInstance.totalByAsset.call(assetName).toString());
  });
}
function addMoney() {
  assetName = "Money";
  contractInstance.addAssetToInventory(assetName, {from: web3.eth.accounts[0]}, function() {
    let div_id = assets[assetName];
    $("#" + div_id).html(contractInstance.totalByAsset.call(assetName).toString());
  });
}

function addLegal() {
  assetName = "Legal";
  contractInstance.addAssetToInventory(assetName, {from: web3.eth.accounts[0]}, function() {
    let div_id = assets[assetName];
    $("#" + div_id).html(contractInstance.totalByAsset.call(assetName).toString());
  });
}

function checkAllDone() {
  var allDone = true;
  for (i= 0; i < isCompleteArray.length; i++){
    if (!isCompleteArray[i]) {
      return false;
    }
  } 
  var doneElem = document.getElementById("done");
  if (doneElem) {
    doneElem.style.visibility="visible"; 
  } 
  return true;
}
var assetEvent = contractInstance.AssetAdded();

assetEvent.watch(function(error, result){
  if (!error){
      console.log(result);
      var index = result.args.assetCount.c[0] + 1;
      var assetType = assetsArray[index];

      alert("An update was made to your home purchase, please check your account");
  } else {
      console.log(error);
  }
})

$(document).ready(function() {
  var doneElem = document.getElementById("done");
  if (doneElem) {
    doneElem.style.visibility="hidden"; 
  } 
  assetNames = Object.keys(assets);
  for (var i = 0; i < assetNames.length; i++) {
    let name = assetNames[i];
    let val = contractInstance.totalByAsset.call(name);
    //bool val
    let isComplete = "false";
    if (val > 0) {
      isComplete = "true";
    }
    isCompleteArray[i] = val > 0;
    $("#" + assets[name]).html(isComplete);
    checkAllDone();
  }

});