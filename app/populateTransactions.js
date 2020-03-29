import MultiSig from './artifacts/MultiSig';
import {address} from './config';
import {ethers} from 'ethers';
import buildTransaction from './transaction';

const provider = new ethers.providers.Web3Provider(web3.currentProvider);
const contract = new ethers.Contract(address, MultiSig.abi, provider);

const transactions = [];
export default async function populateTransactions() {
  const transactionIds = await contract.getTransactionIds(true, true);
  for(let i = 0; i < transactionIds.length; i++) {
    const id = transactionIds[i];
    const attributes = await contract.transactions(id);
    const confirmations = await contract.getConfirmations(id);
    transactions.push({ id, attributes, confirmations });
  }
  renderTransactions();
}

function renderTransactions() {
  const container = document.getElementById("container");
  container.innerHTML = transactions.map(buildTransaction).join("");
  transactions.forEach(({ id }) => {
    document.getElementById(`confirm-${id}`).addEventListener('click', async () => {
      const signer = provider.getSigner();
      console.log(id);
      await contract.connect(signer).confirmTransaction(id);
    });
  });
}
