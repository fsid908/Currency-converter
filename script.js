const BASE_URL =
 "https://api.currencyapi.com/v3/latest?apikey=cur_live_GsvAVuphP0FKS66Zyeg7kj50QBx4MXlT80pTaFKj";

 const dropdowns = document.querySelectorAll(".dropdown select");

 const fromCurr = document.querySelector(".from select")
 const toCurr = document.querySelector(".to select")
 const msg =  document.querySelector(".msg");
 const btn = document.querySelector("form button");

 for(let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode ==="USD"){
           newOption.selected = "selected";
    }else if(select.name === "To" && currCode ==="INR"){
           newOption.selected = "selected";
        }
        select.append(newOption);
 }
 select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
 });
 }

 const updateFlag = (element)=>{
  let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
 };
btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(isNaN(amtVal)==="" || amtVal<1 ){
        amtVal = 1;
        amount.value = "1";
    }
   const URL = `${BASE_URL}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.data[toCurr.value]?.value;
    let displayRate = rate.toFixed(5);
    let finalAmount = amtVal*displayRate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    msg.style.color = "rgb(20, 233, 20)";
})