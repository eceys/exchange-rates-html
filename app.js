const api = "http://api.exchangeratesapi.io/v1/latest?access_key=c"  //your api here

//var
let innerHtmlMoney;
const button = document.querySelector('.button');
const select = document.querySelectorAll('select');
const moneyFrom = document.getElementById('moneyFrom');
const box = document.querySelector('.text');

//event
button.addEventListener('click',exchange);
document.addEventListener("DOMContentLoaded",loadPages);


//func

async function loadPages(){
    moneyCatch();
}

async function moneyCatch(){
    const fetchUrl = await fetch(api);
    const data = await fetchUrl.json();    
    const keys = Object.keys(data.rates);
    keys.map(moneyExc => {
        return innerHtmlMoney += `<option value="${moneyExc}">${moneyExc}</option>`;
    });

    for(let a=0;a<select.length;a++){
        select[a].innerHTML = innerHtmlMoney;
    }
}

async function convert(a, b){
    
    const fetchUrl = await fetch(api);
    const data = await fetchUrl.json(); 
    const values = Object.values(data.rates);
    let writeMoney = moneyFrom.value;
    if(!writeMoney || writeMoney<=0){
        alert('Please, write money');
    }

    let result = ( writeMoney / values[a] ) * values[b];
    box.innerText = result;

}

async function exchange(){
    
    let selectFromMoney = select[0].selectedIndex;
    let selectToMoney = select[1].selectedIndex;
    convert(selectFromMoney, selectToMoney);
}

