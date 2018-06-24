pragma solidity ^0.4.18;
// We have to specify what version of compiler this code will compile with

contract AssetTracker {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is Asset name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  event AssetAdded(bytes32 asset, bool assetCount);

  mapping (bytes32 => bool) public assetInventory;
  
  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of Assets
  */
  
  bytes32[] public AssetList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of Assets who will be contesting in the election
  */
  function AssetTracker(bytes32[] AssetNames) public {
    AssetList = AssetNames;
  }

  // This function returns the total votes a Asset has received so far
  function totalByAsset(bytes32 Asset) view public returns (bool) {
    require(validAsset(Asset));
    return assetInventory[Asset];
  }

  // This function increments the vote count for the specified Asset. This
  // is equivalent to casting a vote
  function addAssetToInventory(bytes32 Asset) public {
    require(validAsset(Asset));
    assetInventory[Asset] = true;
    emit AssetAdded(Asset, assetInventory[Asset]);
  }

  function validAsset(bytes32 Asset) view public returns (bool) {
    for(uint i = 0; i < AssetList.length; i++) {
      if (AssetList[i] == Asset) {
        return true;
      }
    }
    return false;
  }
}
