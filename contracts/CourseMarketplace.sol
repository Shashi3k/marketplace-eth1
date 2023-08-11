// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;
contract CourseMarketplace {
  
  enum State {
    Purchased,
    Activated,
    Deactivated
  }

  // mapping of course id t course hash
  mapping(uint => bytes32) private ownedCourseHash;

  // mapping of courseHash to course data
  mapping(bytes32 => Course) private ownedCourses;

  uint private totalOwnedCourses;

  /// Course already has a Owner
  error CourseHasOwner();

  /// onl Owner has access
  error OnlyOwner();

  modifier onlyOwner() {
    if (msg.sender != getContractOwner()) {
      revert OnlyOwner();
    }
    _;
  }

  address payable private owner;

  constructor(){
    setContractOwner(msg.sender);
  }

  struct Course {
    uint id; // 32
    uint price; // 32
    bytes32 proof; // 32
    address owner; // 20
    State state; // 1
  }

  function purchaseCourse(
    bytes16 courseId,
    bytes32 proof
  )
    external
    payable
  {
    bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));

    if(hasCourseOwnership(courseHash)){
      revert CourseHasOwner();
    }
    uint id = totalOwnedCourses++;

    ownedCourseHash[id]=courseHash;
    ownedCourses[courseHash]=Course({
      id: id,
      price: msg.value,
      proof: proof,
      owner: msg.sender,
      state: State.Purchased
    });
  }


  function getCourseCount()
  external
  view
  returns(uint){
    return totalOwnedCourses;
  }

  function getCourseHashAtIndex(uint index)
  external
  view
  returns(bytes32){
    return ownedCourseHash[index];
  }

  function getCourseByHash(bytes32 courseHash)
  external
  view
  returns(Course memory){
    return ownedCourses[courseHash];
  }

  function hasCourseOwnership(bytes32 courseHash)
  private
  view
  returns(bool){
    return (ownedCourses[courseHash].owner == msg.sender);
  }

  function setContractOwner(address newOwner) 
  private
  {
    owner=payable(newOwner);
  }

  function getContractOwner()
    public
    view
    returns (address)
  {
    return owner;
  }

  function changeOwner(address newOwner)
  external
  onlyOwner
  {
      setContractOwner(newOwner);
  }
}

