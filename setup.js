
var Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
solc = require('solc')
compiledCode = solc.compile(fs.readFileSync('AssetTracker.sol').toString())
abiDefinition = JSON.parse(compiledCode.contracts[':AssetTracker'].interface)
AssetTrackerContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':AssetTracker'].bytecode
deployedContract = AssetTrackerContract.new(['Waivers', 'Conditions', 'Legal', 'Money'], {data: byteCode, from:web3.eth.accounts[0], gas:4700000})

console.log("address:");
console.log(deployedContract.address);