import Web3 from 'web3';
import Axios from 'axios';

const CryptoCompareAPI = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD,EUR';

const URL = 'https://mainnet.infura.io/v3/051c129edf6b4cf386619981ddc8bce4';
const web3 = new Web3(URL);

const getData = async (address: string) => {
    try {
        // Get balance
        const balance = await web3.eth.getBalance(address);
        console.log(balance);
    
        // Convert balance to ether
        const balanceInEther = web3.utils.fromWei(balance, 'ether');
        console.log(balanceInEther);
    
        // get conversion rate
        const result = await Axios.get(CryptoCompareAPI);
        console.log(result.data);

        // convert
        const balanceInUSD = parseInt(balanceInEther)*result.data.USD;
        const balanceInEuro = parseInt(balanceInEther)*result.data.EUR;

        return {
            address,
            balanceInEther,
            balanceInUSD,
            balanceInEuro
        };

    } catch (err) {
        console.error(err);
        throw new Error('Service Crashed : Web3.js');
    }

};

export {getData};