const MultiSig = artifacts.require('MultiSig');
const { toWei, toBN } = web3.utils;
contract('MultiSig', function (accounts) {
    const _creator = accounts[0];
    const _owners = accounts.slice(0, 3);
    const _beneficiary = accounts[4];

    let contract;
    let beforeBalance;
    beforeEach(async () => {
        beforeBalance = toBN(await web3.eth.getBalance(_beneficiary));
        contract = await MultiSig.new(_owners, 2);
    });

    describe("after depositing and submitting a transaction", () => {
        const transferAmount = toWei("0.5");
        beforeEach(async () => {
            await contract.sendTransaction({ from: _owners[1], value: toWei("1") });
            await contract.submitTransaction(_beneficiary, transferAmount, "0x", {
                from: _creator
            });
        });

        it('should not execute transaction yet', async () => {
            const txn = await contract.transactions.call(0);
            assert(!txn.executed);
        });

        it('should not update the beneficiary balance', async () => {
            const afterBalance = await web3.eth.getBalance(_beneficiary);
            assert.equal(afterBalance.toString(), beforeBalance.toString());
        });

        describe('after confirming', () => {
            beforeEach(async () => {
                await contract.confirmTransaction(0, { from: _owners[1] });
            });

            it('should try to execute transaction after confirming', async () => {
                const txn = await contract.transactions.call(0);
                assert(txn.executed);
            });

            it('should update the beneficiary balance', async () => {
                const afterBalance = toBN(await web3.eth.getBalance(_beneficiary));
                assert.equal(afterBalance.sub(beforeBalance).toString(), transferAmount.toString());
            });
        });
    });
});
