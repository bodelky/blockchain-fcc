pragma solidity ^0.8.12;
// SPDX-License-Identifier: MIT

contract SimpleStorage {

    uint256 private favoriteNumber;

    function setFavoriteNumber(uint256 _favNumber) public {
        favoriteNumber = _favNumber;
    }

    function retrieve() public view returns(uint256) {
        return favoriteNumber;
    }

}