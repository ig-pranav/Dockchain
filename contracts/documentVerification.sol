pragma solidity ^0.5.16;

/*
Contract name documentVerification
It has a structure named verification consisting of various variables
*/
contract documentVerification
{
    struct verification{
        string document_name; //type of document example birthcertificate,marksheet,etc.
        string document_number; //Every document has a valid number. This variable stores that number.
        string document_hash; //document hash
        address uploaded_by; //It stores the address of person who uploaded the documnent.
        bool value; //It is used to check whether the document has been upoaded previously or not.
    }
    
    mapping(string => verification) hash; //It maps the structure with unique hash of every document.
    mapping(string => verification) hash1;

    address owner;
    constructor() public {
        owner=msg.sender;
    }
    modifier ownerOnly{
        require(owner==msg.sender, 'only owner can upload data');
        _;
    }
    
    /*function setDocument is used to upload the document on blockchain
    It takes 3 inputs- document_name, document_number and hash of the document
    */
   function setDocument(string memory typeOfDocument,string memory docId,string memory _hash) necessary(docId) ownerOnly public{
        hash[docId]=verification(typeOfDocument,docId,_hash,msg.sender,true);
        hash1[typeOfDocument]=verification(typeOfDocument,docId,_hash,msg.sender,true);
    }
    
    /* function getDocument is used to check the validity of the document
    Instead of assigning any id to uploaded document to verify in future,
    it takes document hash as input and tells if the document is present along with the details 
    of the document.
    */
    function getDocument( string memory typeOfDocument,string memory docId) public view returns(string memory document_name,string memory document_number,string memory document_hash,address uploaded_by){
        if(hash[docId].value && hash1[typeOfDocument].value){
            return(hash[docId].document_name,hash[docId].document_number,hash[docId].document_hash,hash[docId].uploaded_by);
        }
    }
    
    //modifier checks whether a document has been pre uploaded or not.
    //If it exists, message 'Document already uploaded' is displayed.
    modifier necessary(string memory docId){
        bool present;
        if(hash[docId].value)
            present=true;
        else
            present=false;
        require(!present,'Document already uploaded');
        _;
    }
    
   
}