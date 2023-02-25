import { ethers } from 'hardhat';

async function main() {
  // Deploy the ERC20 token contract
  const ERC20Token = await ethers.getContractFactory('ERC20Token');
  const erc20Token = await ERC20Token.deploy();

  // Deploy the MyNFT contract
  const MyNFT = await ethers.getContractFactory('MyNFT');
  const myNFT = await MyNFT.deploy(erc20Token.address);

  console.log(`MyNFT deployed to: ${myNFT.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
