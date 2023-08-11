window.addEventListener("DOMContentLoaded",()=>{
    //Get Elements From Document 
    const billInput = document.getElementById("bill");
    const percentageTabs = document.querySelectorAll("div.tips-choice");
    const customTab = document.querySelector("input.tips-choice");
    const peopleInput = document.getElementById("num-of-people");
    const tipAmountPriceText = document.querySelector(".amount");
    const totalPriceText = document.querySelector(".total");
    const resetButton = document.getElementById("reset");
    // Essential Variables for Calculations
    let percentage = -1;
    let bill = -1 ;
    let people = -1 ;
    // returns the value of percentage accroding to the index of clicked tab .
    const getPercenatgeEq = (i) => {
        switch (i) {
            case 0:
                return 0.05;
                break;
            case 1:
                return 0.1;
                break;
            case 2:
                return 0.15;
                break;
            case 3:
                return 0.25;
                break;
            case 4:
                return 0.5;
                break;
            
        }

    };
    const unclickTabs = () =>{
        for(let tab of percentageTabs)
            tab.classList.remove("clicked");
    };
    const clickSelectedTab = (i) =>{
        percentageTabs[i].classList.add("clicked");
    };

    const clearCustomTab = ()=>{
        customTab.value = "";
        customTab.classList.remove("error");
        customTab.classList.remove("valid");
    };

    const resetPrices = ()=>{
        tipAmountPriceText.innerText = `$ 0.00`
        totalPriceText.innerText = `$ 0.00`;
    };

    const resetInput = (input)=>{
        input.value = "";
        input.classList.remove("error");
        input.classList.remove("valid");
    };

    const updateUI = ()=>{
        if(!(people === -1 || bill === -1 || percentage === -1)){
            resetButton.classList.add("active");
            let tipAmount = bill * percentage / people;
            let totalPrice = tipAmount + bill/people;
            tipAmount = tipAmount.toFixed(2);
            totalPrice = totalPrice.toFixed(2);
            tipAmountPriceText.innerText = `$ ${tipAmount}`
            totalPriceText.innerText = `$ ${totalPrice}`;
        }
        else{
            resetButton.classList.remove("active");
            resetPrices();
        }
    };

    const resetUI = ()=>{
        unclickTabs();
        clearCustomTab();
        resetInput(billInput);
        resetInput(peopleInput);
        resetPrices();
        resetButton.classList.remove("active");
        percentage = -1 ;
        bill = -1 ;
        people = -1 ;
    };

    for(let i = 0 ; i < percentageTabs.length ; i++)
        percentageTabs[i].addEventListener("click",()=>{
            clearCustomTab();
            if(percentageTabs[i].classList.contains("clicked")){
                percentage = -1;
                unclickTabs();
            }
            else{
                percentage = getPercenatgeEq(i);
                unclickTabs();
                clickSelectedTab(i);
            }
            updateUI();
            console.log(percentage);
        });

    customTab.addEventListener("input" , ()=>{
        unclickTabs();
        let percentageValue = customTab.value;
        if(!isNaN(parseFloat(percentageValue)) && parseFloat(percentageValue)+'' === percentageValue && parseFloat(percentageValue) >= 0){
            percentage = parseFloat(percentageValue) * 0.01;
            customTab.classList.remove("error");
            customTab.classList.add("valid");
        }
        else{
            percentage = -1 ;
            customTab.classList.add("error");
            customTab.classList.remove("valid");
        }
        updateUI();
        console.log(percentage);
    });

    billInput.addEventListener("input" , ()=>{
        let billValue = billInput.value;
        if(!isNaN(parseFloat(billValue)) && parseFloat(billValue)+'' === billValue && parseFloat(billValue) >= 0){
            bill = parseFloat(billValue);
            billInput.classList.remove("error");
            billInput.classList.add("valid");
        }
        else{
            bill = -1 ;
            billInput.classList.add("error");
            billInput.classList.remove("valid");
        }
        updateUI();
        console.log(bill);
    });

    peopleInput.addEventListener("input",()=>{
        let peopleValue = peopleInput.value;
        if(!isNaN(parseInt(peopleValue)) && parseInt(peopleValue)+'' === peopleValue && parseInt(peopleValue) > 0){
            people = parseInt(peopleValue);
            peopleInput.classList.remove("error");
            peopleInput.classList.add("valid");
        }
        else{
            people = -1 ;
            peopleInput.classList.add("error");
            peopleInput.classList.remove("valid");
        }
        updateUI();
        console.log(people);
    });

    resetButton.addEventListener("click",resetUI);

});