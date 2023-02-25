import { ethers } from "hardhat";
import { expect } from "chai";

describe("MyNFT", function () {
  let nftContract;
  let fakeERC20Contract;
  let owner;
  let user1;
  let user2;

  const NAME = "MyNFT";
  const SYMBOL = "NFT";
  const BALANCE_REQUIRED = 1000;

  beforeEach(async function () {
    const ERC20 = await ethers.getContractFactory("FakeERC20");
    fakeERC20Contract = await ERC20.deploy();
    await fakeERC20Contract.mint(owner.address, BALANCE_REQUIRED);

    const MyNFT = await ethers.getContractFactory("MyNFT");
    nftContract = await MyNFT.deploy(fakeERC20Contract.address);
    await nftContract.deployed();

    [owner, user1, user2] = await ethers.getSigners();
  });

  describe("mint", function () {
    it("should mint a new NFT to the caller if they have a valid balance", async function () {
      await expect(nftContract.connect(user1).mint())
        .to.emit(nftContract, "Transfer")
        .withArgs(ethers.constants.AddressZero, user1.address, 1);

      await expect(nftContract.connect(user2).mint())
        .to.be.revertedWith("Invalid balance");
    });
  });
});
