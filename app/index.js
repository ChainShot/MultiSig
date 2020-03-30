import populateTransactions from "./populateTransactions";
import populateInfo from "./populateInfo";
import MultiSig from './artifacts/MultiSig';
import {address} from './config';
import {ethers} from 'ethers';
import "./index.css";

const provider = new ethers.providers.Web3Provider(web3.currentProvider);

async function newTransaction() {
  await ethereum.enable();

  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, MultiSig.abi, signer);

  const destination = document.getElementById("destination").value;
  const wei = document.getElementById("wei").value;
  await contract.submitTransaction(destination, wei, "0x");

  populateTransactions();
}

populateTransactions();
populateInfo();

document.getElementById("deploy").addEventListener("click", newTransaction);
