pragma solidity ^0.4.18;
// We have to specify what version of compiler this code will compile with

contract recordTracker {
  /* mapping field below is equivalent to an associative array or hash.
  */
    event RecordAdded(bytes32 Record, bool submitted);

    mapping (bytes32 => bool) public recordDocument;
  
    bytes32[] public RecordList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of Records who will be used
  */
    function recordTracker(bytes32[] RecordNames) public {
        RecordList = RecordNames;
    }

  // This function returns the record
    function showRecord(bytes32 Record) view public returns (bool) {
        require(validRecord(Record));
        return recordDocument[Record];
    }

  // This function adds the record to the document map
    function addRecordToDocument(bytes32 Record) public {
        require(validRecord(Record));
        recordDocument[Record] = true;
        emit RecordAdded(Record, recordDocument[Record]);
    }

    function validRecord(bytes32 Record) view public returns (bool) {
        for(uint i = 0; i < RecordList.length; i++) {
            if (RecordList[i] == Record) {
                return true;
            }
        }
        return false;
    }
}
