/// Using local network
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));

/// Openzeppelin test-helper
const { time } = require('@openzeppelin/test-helpers');

/// Artifact of smart contracts 
const NFTYieldFarming = artifacts.require("NFTYieldFarming");
const NFTToken = artifacts.require("MockNFTToken");  /// As a NFT token (ERC1155)
const LPToken = artifacts.require("MockLPToken");    /// As a LP token
const GovernanceToken = artifacts.require("GovernanceToken");  /// As a reward token and a governance token

/***
 * @dev - Execution COMMAND: $ truffle test ./test/test-local/NFTYieldFarming.test.js
 **/
contract("NFTYieldFarming", function(accounts) {
    /// Acccounts
    let deployer = accounts[0];
    let admin = accounts[1];
    let user1 = accounts[2];
    let user2 = accounts[3];

    /// Global contract instance
    let nftYieldFarming;
    let nftToken;
    let lpToken;
    let governanceToken;

    /// Global variable for each contract addresses
    let NFT_YIELD_FARMING;
    let NFT_TOKEN;
    let LP_TOKEN;
    let GOVERNANCE_TOKEN;

    describe("Check state in advance", () => {
        it("Check all accounts", async () => {
            console.log('\n=== accounts ===\n', accounts, '\n========================\n');
        }); 
    }); 

    describe("Setup smart-contracts", () => {
        it("Deploy the NFT token (ERC721) contract instance", async () => {
            nftToken = await NFTToken.new({ from: deployer });
            NFT_TOKEN = nftToken.address;
        });

        it("Deploy the LP token (ERC20) contract instance", async () => {
            lpToken = await LPToken.new({ from: deployer });
            LP_TOKEN = lpToken.address;
        });

        it("Deploy the Governance token (ERC20) contract instance", async () => {
            governanceToken = await GovernanceToken.new({ from: deployer });
            GOVERNANCE_TOKEN = governanceToken.address;
        });

        it("Deploy the NFTYieldFarming contract instance", async () => {
            const _devaddr = admin;  /// Admin address
            const _governanceTokenPerBlock = "100";
            const _startBlock = "100";
            const _bonusEndBlock = "1000";

            nftYieldFarming = await NFTYieldFarming.new(GOVERNANCE_TOKEN, _devaddr, _governanceTokenPerBlock, _startBlock, _bonusEndBlock, { from: deployer });
            NFT_YIELD_FARMING = nftYieldFarming.address;
        });
    });

    describe("Preparation for tests in advance", () => {
        it("Mint the NFT token (ERC721) to user1", async () => {
            const tokenURI = "https://testnft.example/token-id-8u5h2m.json";
            let txReceipt = await nftToken.mintTo(user1, tokenURI, { from: deployer });
        });

        it("Transfer the LP token (ERC20) from deployer to user1", async () => {
            const amount = web3.utils.toWei('1000', 'ether');
            let txReceipt = await lpToken.transfer(user1, amount, { from: deployer });
        });
    });

    describe("Process of the NFT yield farming (in case all staked-LP tokens are not withdrawn)", () => {
        it("Add NFT as a target", async () => {
            //let txReceipt = await nftYieldFarming.addNFT(NFT_TOKEN, total, price, { from: deployer });
        });

        it("Stake LP tokens to the NFT", async () => {});

        it("Claim specified amount of LP tokens and receive reward tokens", async () => {});
    });

    describe("Process of the NFT yield farming (in case all staked-LP tokens are withdrawn)", () => {
        it("Add NFT as a target", async () => {});

        it("Stake LP tokens to the NFT", async () => {});

        it("Withdraw all amount of LP tokens and receive reward tokens", async () => {});  /// [This is should be]       
    });


});