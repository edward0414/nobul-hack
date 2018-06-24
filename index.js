web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"AssetList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"assetInventory","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"Asset","type":"bytes32"}],"name":"totalByAsset","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"Asset","type":"bytes32"}],"name":"addAssetToInventory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"Asset","type":"bytes32"}],"name":"validAsset","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"AssetNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"asset","type":"bytes32"},{"indexed":false,"name":"assetCount","type":"uint8"}],"name":"AssetAdded","type":"event"}]')
AssetTrackerContract = web3.eth.contract(abi);
// In your nodejs AssetTrackerContract, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = AssetTrackerContract.at('0xc8cc47ea37c456c98c3d683aecc775710dc357d2');
assets = {"Engine": "asset-1", "Wheel": "asset-2", "Frame": "asset-3", "Door": "asset-4"}

function addAssetToInventory() {
  assetName = $("#asset").val();
  contractInstance.addAssetToInventory(assetName, {from: web3.eth.accounts[0]}, function() {
    let div_id = assets[assetName];
    $("#" + div_id).html(contractInstance.totalByAsset.call(assetName).toString());
  });
}

$(document).ready(function() {
  assetNames = Object.keys(assets);
  for (var i = 0; i < assetNames.length; i++) {
    let name = assetNames[i];
    let val = contractInstance.totalByAsset.call(name).toString()
    $("#" + assets[name]).html(val);
  }
  var assetEvent = contractInstance.AssetAdded();

  assetEvent.watch(function(error, result){
    if (!error){
        console.log(result);
    } else {
        console.log(error);
    }
  })
});