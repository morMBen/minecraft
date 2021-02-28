//Get container element
const container = document.getElementById("container");
//Get nav element
const nav = document.getElementById("navbar");
//Get body style 
const bodyStyle = document.querySelector("body").style;
//The object invntory for all the divs inside the container
let objInventory = [];
//The object invntory for all the divs inside the container
let navDivInventory = [];
//Number of tools
let numOfTools = 3;
//Number of colums
let screenColums = 0;
//Number of slots in the bank
let slotsBankNum = 34;
//Picking inventory can be or objId or 0 for empty
let bank = [];
//Tools specificatin
let toolsArr = ['Axe', 'shovel', 'hoe', 'mining', 'sword']
//The current tool
let task = null;
//The current itemOn
let itemOn = null;
//The game is on - boolean
let gameIsOn = false;
//The setting is open? - boolean
let settingIsOpen = false;
//---ON--set screen size--400px min---//

setScreenSize(6000);
setToolsButtons(numOfTools);
setDivsBank(slotsBankNum);

setOffGameScreen();
setOnOpeningPage();

// setOffOpeningPage();
// setOnOpeningPage();
// setScreenSize(7000);
// setToolsButtons(numOfTools);
// setDivsBank(slotsBankNum);
//===========OPENING PAGE==========//
function setOnOpeningPage() {
    setMainDivOpening();
    creatButtonsNoStyle();
    creatInputNoStyle();
    document.body.style.width = 'auto';

}
function setMainDivOpening() {
    let mainDiv = document.createElement("div");
    mainDiv.classList.add('open');
    mainDiv.style.width = '100vw';
    mainDiv.style.height = '100vh';
    mainDiv.style.position = 'static';
    mainDiv.style.background = 'black';
    mainDiv.style.display = 'flex';
    mainDiv.style.alignItems = 'center';
    mainDiv.style.justifyContent = 'center';
    mainDiv.style.flexDirection = 'column';
    mainDiv.style.backgroundImage = 'url(/img/opening_backgrund.png)';
    document.body.insertAdjacentElement('afterbegin', mainDiv);
    mainDiv.style.backgroundRepeat = 'no-repeat';
    mainDiv.style.backgroundPosition = 'center';
    mainDiv.style.backgroundSize = 'cover';
}
function creatButtonsNoStyle() {
    let father = document.querySelector('.open');
    for (let i = 1; i <= 3; i++) {
        let button = document.createElement("button");
        let temp = father.appendChild(button);
        temp.classList.add('openingButton', `btn${i}`);
        temp.textContent = 'button1';
        temp.style.width = '30vw';
        temp.style.fontSize = '3vw';
        temp.style.marginTop = '10px';
        temp.style.padding = '5px';
    }
    let button1 = document.querySelector('.btn1');
    let button2 = document.querySelector('.btn2');
    let button3 = document.querySelector('.btn3');
    button1.style.visibility = 'hidden';
    button1.textContent = 'Resume'
    button2.textContent = 'New Game'
    button3.textContent = 'Setting'
    button2.addEventListener('click', () => {
        startNewGame();
    })
    button3.addEventListener('click', () => {
        openCloseSetting();
    })
}
function creatInputNoStyle() {
    let father = document.querySelector('.open');
    for (let i = 1; i <= 3; i++) {
        let inp = document.createElement("input");
        father.appendChild(inp);
        inp.classList.add('openinInput', `in${i}`);
        inp.textContent = 'inp';
        inp.setAttribute('type', 'text');
        inp.style.width = '29vw';
        inp.style.fontSize = '1.8vw';
        inp.style.marginTop = '10px';
        inp.style.padding = '5px';
        inp.style.visibility = 'hidden';
    }
    let input1 = document.querySelector('.in1');
    input1.setAttribute('placeholder', 'Set Width: number');
    let input2 = document.querySelector('.in2');
    input2.setAttribute('placeholder', 'Number Of Tools: 3 - 5');
    let input3 = document.querySelector('.in3');
    input3.setAttribute('placeholder', 'Inventory Size: 4 - 64 blocks');
}
//===========OPENING PAGE EVENTS==========//
function resetDefultVal() {
    task = null;
    bank = [];
    gameIsOn = true;
    navDivInventory = [];
    numOfTools = 3;
    slotsBankNum = 4;
}
function startNewGame() {

    if (settingIsOpen) {
        let screenWidth = document.querySelector('.in1');
        let userNumOfTools = document.querySelector('.in2');
        let userInventorySize = document.querySelector('.in3');

        if (checkIfAllTheInpusGood(checkIfWidthInputIsNum(screenWidth.value, screenWidth), checkToolsNumInput(userNumOfTools.value, userNumOfTools, 5), checkBankSizeInput(userInventorySize.value, userInventorySize))) {
            resetDefultVal();
            Number(screenWidth.value) >= 400 ? setScreenSize(Number(screenWidth.value)) : setScreenSize('auto');
            Number(userNumOfTools.value) > 2 && Number(userNumOfTools.value) < 6 ? setToolsButtons(Number(userNumOfTools.value)) : setToolsButtons(numOfTools);
            Number(userInventorySize.value) > 3 && Number(userInventorySize.value) < 65 ? setDivsBank(Number(userInventorySize.value)) : setDivsBank(slotsBankNum);
            // console.log(Number(screenWidth.value));
            ;
            setOffOpeningPage();
        }
    } else {
        setOffOpeningPage();
        resetDefultVal()
        setScreenSize('auto');
        setToolsButtons(numOfTools);
        setDivsBank(slotsBankNum);
    }

    for (let i = 0; i < screenColums; i++) {
        let random = Math.floor(Math.random() * 3);
        switch (random) {
            case 0:
                setClude(arr2String([2, i]));
                i += 7;
                break;
            case 1:
                setRock(arr2String([10, i]));
                i += 5;
                break;

        }

    }
    settTree(arr2String([3, 17]), 7);


}
function openCloseSetting() {
    let temp = document.querySelector('.in1');
    if (settingIsOpen) {
        temp.style.visibility = 'hidden';
        temp.nextElementSibling.style.visibility = 'hidden';
        temp.nextElementSibling.nextElementSibling.style.visibility = 'hidden';

        settingIsOpen = false;
    } else {
        temp.style.visibility = 'visible';

        temp.nextElementSibling.style.visibility = 'visible';
        temp.nextElementSibling.nextElementSibling.style.visibility = 'visible';

        settingIsOpen = true;
    }
}
//===========Closing PAGE EVENTS==========//
function exitToMenu() {
    let button = document.querySelector('.exit_button');
    button.addEventListener('click', () => {
        console.log(button);
        setOffGameScreen();
        setOnOpeningPage();
    })
}


//===========SET OFF================//
function setOffGameScreen() {
    container.innerHTML = "";
    nav.innerHTML = "";
    bank = [];
    task = null;
    itemOn = null;
}
function setOffOpeningPage() {
    document.body.firstElementChild.innerHTML = "";
    document.body.firstElementChild.remove();
}

//==========POSE GAME===============//


//===========NEW GAME SET==========//
//Fubcion to set new object/div inside the inventory 
function addNewDiv(inventory, idArr, rClass = undefined) {
    inventory.push({
        objId: idArr,
        tempClass: rClass,
    })
};
//---Screen size select function
function setScreenSize(num) {
    //defult size
    if (num === 'auto') {
        // conteiner grid nav fixed
        bodyStyle.width = "auto";
        bodyStyle.display = "grid";
        bodyStyle.gridTemplateColumns = "2.5fr 1fr";
        bodyStyle.gridTemplateRows = "1fr";
        nav.style.position = "relative";
        //---ON-- set the container divs---//
        setMainSky(20, 30);
        screenColums = 30;
        //custom screen size case
    } else {
        //The screen is smaller then 1000px
        if (!(num >= 1000)) {
            //body flex  nav relativ
            nav.style.position = "relative";
            bodyStyle.display = "flex";
            bodyStyle.justifyContent = "center";
            bodyStyle.width = "100vw";
            nav.style.width = `${num * 0.3}px`;
            container.style.width = `${num * 0.7}px`;
        } else {//The screen is larger then 1000px
            // conteiner grid nav fixed
            nav.style.right = '0';
            nav.style.width = "30vw";
            bodyStyle.gridTemplateColumns = "1fr";
            bodyStyle.gridTemplateRows = "1fr";
            nav.style.position = "fixed";
            bodyStyle.display = "grid";
            bodyStyle.width = `${num}px`;
        }//---ON-- set the container divs---//
        setMainSky(20, (num - num % 40) / 40);
        screenColums = num - num % 40;
    }//---ON-- set the nav divs---//
    setSideBar(20, 30);
}
//Set grid property
function setGridProperty(el, rows, cols) {
    el.style.setProperty('--grid-rows', rows);
    el.style.setProperty('--grid-cols', cols);
}
//Function that fill the divs of the container
function setMainSky(rows, cols) {
    //---ON--grid property of container---/
    setGridProperty(container, rows, cols);
    //array in array that set new div with:
    //.sky & .box_row_<> & .box_col<> & .sky class
    // place it in the grid container of the grid
    // set new object thet contain
    //objID & class.
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            //creat new div
            let block = document.createElement("div");
            //set class names
            container.appendChild(block).className = `box_row_${i} box_col_${j}  grid-item sky`;
            block.onclick = function () {
                return divsCheck(block);
            };
            //---ON--set new obj in inventory---//
            addNewDiv(objInventory, `${i},${j}`);
            if (i > 13) {
                setObjClassById(`${i},${j}`, "soil_img");
                block.classList.add("soil_img");
            }
            if (i === 13) {
                setObjClassById(`${i},${j}`, "soil_grass");
                block.classList.add("soil_grass");
            }
        }
    };
};
//function that fill the divs of the navbar
function setSideBar(rows, cols) {
    //---ON--grid property of navbar---/
    setGridProperty(nav, rows, cols / 2.5);
    //creat new div for the halftop navbr
    let sideBlock = document.createElement("div");
    //set class names
    nav.appendChild(sideBlock).className = `top_side_block side_bar`;
    for (i = 0; i < rows / 2; i++) {
        for (j = 0; j < cols / 2.5; j++) {
            //set new div for the bottom side of the nav bar
            let sideBlock = document.createElement("div");
            //set class names
            nav.appendChild(sideBlock).className = `nav_row_${i} nav_col_${j}  side_bar`;

        }
    };
}
//set top side manu bar tool button 3-5
function setToolsButtons(num) {
    for (let i = 0; i < num; i++) {
        let button = document.createElement('button');
        setToolButtonStyle(toolsArr[i], button);
        button.onclick = function () { chooseButton(button) };
    }
    setUserMessegeBox();
}
//set tools style
function setToolButtonStyle(tool, button) {
    button.style.width = '50px';
    button.style.height = '50px';
    button.classList.add(tool);
    nav.firstElementChild.insertAdjacentElement("afterbegin", button);
    button.style.backgroundRepeat = 'no-repeat';
    button.style.backgroundPosition = 'center';
    button.style.backgroundSize = 'cover';
    button.style.border = 'green solid 1px';
    button.style.margin = '10px';
}
//Set the maseage box for the user
function setUserMessegeBox() {

    let userMassgeBox = document.createElement('div');
    nav.firstElementChild.insertAdjacentElement("afterbegin", userMassgeBox);
    userMassgeBox.style.width = '100%';
    userMassgeBox.style.height = '2rem';
    userMassgeBox.style.display = "flex";
    userMassgeBox.style.justifyContent = "space-evenly";
    userMassgeBox.style.alignItems = "center";
    userMassgeBox.style.textAlign = 'center';
    userMassgeBox.classList.add('massege_box');
    let massgeText = document.createElement('h2');
    userMassgeBox.insertAdjacentElement("afterbegin", massgeText);
    massgeText.style.width = 'auto';
    massgeText.style.fontWeight = 'bold';
    massgeText.style.fontWeight = 'bold';
    massgeText.style.fontSize = '2.2vw'
    massgeText.classList.add('massege_text');
    massgeText.textContent = 'Choose tool:';
    let menuButton = document.createElement('button');
    userMassgeBox.insertAdjacentElement("beforeend", menuButton);
    menuButton.style.fontSize = '2vw'
    menuButton.style.margin = '1.5rem'
    menuButton.style.padding = '0.5rem'
    menuButton.classList.add('exit_button');
    menuButton.style.fontWeight = 'bold';
    menuButton.style.background = 'grey';
    menuButton.style.color = '	#bf0000';
    menuButton.textContent = 'Exit';
    menuButton.classList.add('massege_text');
    exitToMenu();
    // let teskDisplay = document.createElement('button');
    // userMassgeBox.insertAdjacentElement("afterbegin", menuButton);
    // menuButton.style.height = '100%';
    // menuButton.style.width = '100%';
    // menuButton.classList.add('massege_text');
    // menuButton.textContent = 'sdafdfasda';
}
//Set the div bank from 1 - 64

function setDivsBank(num) {
    let numOfDivInBlock = getSizeOfDivsBank(num);
    let colStartPoint = ((12 - (Math.floor(Math.sqrt(numOfDivInBlock)) + 1)) / 2);
    let rowStartPoint = ((10 - (Math.floor(Math.sqrt(numOfDivInBlock)) + 1)) / 2);
    let colEndPoint = 11 - colStartPoint;
    let rowEndPoint = 9 - rowStartPoint;
    if (Math.sqrt(numOfDivInBlock) % 2) {
        colEndPoint -= 1;
        rowEndPoint -= 1;
    }
    let counter = 0;
    let tempEl = document.querySelector("#navbar").firstElementChild;
    for (let i = 0; i < 120; i++) {
        tempEl = tempEl.nextElementSibling;
        let tempArr = string2Arr(getIdByEl(tempEl));
        tempArr[0] = Number(tempArr[0]);
        tempArr[1] = Number(tempArr[1]);
        // console.log(tempArr);
        if (tempArr[0] >= rowStartPoint && tempArr[0] <= rowEndPoint && tempArr[1] >= colStartPoint && tempArr[1] <= colEndPoint) {
            if (counter < num) {
                getNavBankElByArr(tempArr).classList.add('side_bar_div_bank');
                addNewDiv(navDivInventory, `${tempArr[0]},${tempArr[1]}`, 'empty_space');
                bank.push([`${tempArr[0]},${tempArr[1]}`, 0]);
                tempEl.onclick = function () {
                    return divsNarbarCheck(this);
                };
            } else {
                getNavBankElByArr(tempArr).classList.add('death_space');
                addNewDiv(navDivInventory, `${tempArr[0]},${tempArr[1]}`, 'death_space');
            }

            counter++;
        }
    };
    //switch to check the size of the 
    function getSizeOfDivsBank(num) {
        if (num < 5) {
            return 4;
        } else if (num < 10) {
            return 9;
        } else if (num < 17) {
            return 16;
        } else if (num < 26) {
            return 25;
        } else if (num < 37) {
            return 36;
        } else if (num < 50) {
            return 49;
        } else if (num < 65) {
            return 64;
        }
    }
}

//================GETTERS============//
//Turn string to arr
function string2Arr(str) {
    return str.split(',');
}
//Turn arr to string
function arr2String(arr) {
    return arr.join()
}
//Get element from container by arr with to numbers
function getElByArr(arr) {
    let temp = document.querySelector(`.box_row_${arr[0]}.box_col_${arr[1]}`);
    return temp || -1;
}
//Get element from navbar by arr with to numbers
function getNavBankElByArr(arr) {
    let temp = document.querySelector(`.nav_row_${arr[0]}.nav_col_${arr[1]}`);
    return temp || -1;
}
//Get element by class name
function getElByClass(className) {
    return document.querySelector(className);
}
//Get id by element (returns string)
function getIdByEl(el) {
    let temp = el.classList;
    let rows = temp[0].slice(8);
    let cols = temp[1].slice(8);
    return `${rows},${cols}`;
}
//Get bank sum
function getBankEmptySpace() {
    let temp = 0;
    bank.forEach(el => {
        return el[1] === 0 ? temp++ : null;
    })
    return temp;
}


//***Main obetcts inventory*****//
//Get object by ID
function getObjById(objectId) {
    return objInventory.find(el => el.objId === objectId);
}
//Check if the object id = string 'num,num2' hve a specific class true / false
function objectHasCalss(id, className) {
    let getObjById = objInventory.find(el => el.objId === id);
    if (getObjById.tempClass) {
        return getObjById.tempClass.toString() === className ? true : false;
    } else {
        return false;
    }

}
//***Nav obetcts inventory*****//
//Get object by ID
function getNavObjById(objectId) {
    return navDivInventory.find(el => el.objId === objectId);
}

//=========EVENTS==========//
//The main chack for the container divs
function divsCheck(el) {
    let id = getIdByEl(el);
    let objClass = getObjById(id).tempClass;
    if (objClass && canIDeleteIt(id) && getBankEmptySpace() > 0) {
        if (checkIfTheStringIsTool(task) && itemOn === null) {
            switch (task) {
                case 'shovel':
                    whatTheToolPick(objClass, 'shovel', id, 'soil_img', 'soil_grass');
                    break;
                case 'Axe':
                    whatTheToolPick(objClass, 'Axe', id, 'wood');
                    break;

                case 'mining':
                    whatTheToolPick(objClass, 'mining', id, 'rock');
                    break;
                case 'hoe':
                    whatTheToolPick(objClass, 'hoe', id, 'tree');
                    break;
                case 'sword':
                    whatTheToolPick(objClass, 'sword', id, 'cloud');
                    break;
            }
        }
    } else if (checkIfTheTaskIsItem(task)) {
        if (!objClass) {
            switch (task) {
                case 'soil_grass':
                    setClassBoth(id, 'soil_grass');
                    break;
                case 'soil_img':
                    setClassBoth(id, 'soil_img');
                    break;
                case 'wood':
                    setClassBoth(id, 'wood');
                    break;
                case 'tree':
                    setClassBoth(id, 'tree');
                    break;
                case 'cloud':
                    setClassBoth(id, 'cloud');
                    break;
                case 'rock':
                    setClassBoth(id, 'rock');
                    break;
            }
            task = null;
            itemOn = null;
        }
    }
    else {
        // objClass ? task = objClass : null;
    }

    // return console.log(task);
};


//להוציא החוצה ולשים בשמור
//The main chack for the navbar divs
function divsNarbarCheck(el) {
    if (true) {
        let id = getIdByEl(el);
        let elementClass = getNavObjById(id).tempClass;
        if (!(elementClass === 'empty_space') && !(elementClass === 'side_bar_div_bank')) {
            task = elementClass;
            itemOn = [id, elementClass];
            deleteElFromBankArr(id);
        }
    }
    console.log(task);
}



function whatTheToolPick(currObjClass, tool, id, objClassName, objClassName2 = 0) {
    if (currObjClass === objClassName || currObjClass === objClassName2) {
        deleteClassBoth(id);
        setElInBankArr(currObjClass);
        setAllItemInNavDiv();
    }
}
//set item in the bank of item
function setElInBankArr(currObjClass) {
    tempArr = bank.map((el) => {
        return el[1];
    })
    tempArr.unshift(currObjClass);
    tempArr.pop();
    bank = bank.map((el, index) => {
        return [el[0], tempArr[index]];
    })
    // console.log(bank);
}
function deleteElFromBankArr(id) {
    let spotInBanktoDelete;
    bank.forEach((el, index) => {
        el[0] === id ? spotInBanktoDelete = index : null;
    })
    bank[spotInBanktoDelete][1] = 0;
    tempArr = bank.map((el) => {
        return el[1];
    })
    tempArr = tempArr.sort((a, b) => {
        if (a === 0) { return 1 }
        if (b === 0) { return -1 }
        return 0;
    })
    bank = bank.map((el, index) => {
        return [el[0], tempArr[index]];
    })
    setAllItemInNavDiv();
}

//The main chack for the tools buttons
function chooseButton(el) {
    let button = el.classList[0];
    task = button;
};
//Set all the div in the navbar acording to the current bank
function setAllItemInNavDiv() {

    bank.forEach(el => {
        deleteClassBothNavObj(el[0]);
        if (!(el[1] === 0)) {
            setClassBothNavObj(el[0], el[1]);
        } else {
            setClassBothNavObj(el[0], 'side_bar_div_bank');
        }

    })

}


//================SETTERS============//
//set class for container obj only
function setObjClassById(objectId, className) {
    getObjById(objectId).tempClass = className;
}
//set class for element only
function setElclassById(elId, className) {
    getElByArr(string2Arr(elId)).classList.add(className);
}
//set class for element and Main obj and obj
function setClassBoth(elNObjId, className) {
    setObjClassById(elNObjId, className);
    setElclassById(elNObjId, className);
}
//delete class for obj only
function deleteTempClassObj(id) {
    getObjById(id).tempClass = undefined;
}
//delete class for element only
function deleteTempClassEl(id) {
    let el = getElByArr(string2Arr(id)).className.split(' ');
    getElByArr(string2Arr(id)).classList.remove(el[el.length - 1]);
}
//delete class for element and obj
function deleteClassBoth(id) {
    deleteTempClassEl(id);
    deleteTempClassObj(id);
}
//*************Navs***************/
//set class for nav obj only
function setNavObjClassById(objectId, className) {
    getNavObjById(objectId).tempClass = className;
}
//set Nav class for element only
function setNavElclassById(elId, className) {
    getNavBankElByArr(string2Arr(elId)).classList.add(className);
}
//set class for element and Main obj and obj
function setClassBothNavObj(elNObjId, className) {
    setNavObjClassById(elNObjId, className);
    setNavElclassById(elNObjId, className);
}
//delete class for nav obj only
function deleteNavTempClassObj(id) {
    getNavObjById(id).tempClass = undefined;
}
//delete navbar class for element only
function deleteNavTempClassEl(id) {
    let el = getNavBankElByArr(string2Arr(id)).className.split(' ');
    getNavBankElByArr(string2Arr(id)).classList.remove(el[el.length - 1]);
}
//delete class for nav obj and element and obj
function deleteClassBothNavObj(id) {
    deleteNavTempClassEl(id);
    deleteNavTempClassObj(id);
}
// function resetAllDivsInNav() {

// }



//===========CHECKS==========//
function canIDeleteIt(id) {
    let arrId = string2Arr(id);
    let bottom = getObjById(arr2String([Number(arrId[0]) + 1, arrId[1]]));
    let rigth = getObjById(arr2String([arrId[0], Number(arrId[1]) + 1]));
    let top = getObjById(arr2String([Number(arrId[0]) - 1, arrId[1]]));
    let left = getObjById(arr2String([arrId[0], Number(arrId[1]) - 1]));
    return top.tempClass && rigth.tempClass && bottom.tempClass && left.tempClass ? false : true;
}
function checkIfTheStringIsTool(task) {
    if (task === 'Axe' || task === 'shovel' || task === 'mining' || task === 'hoe' || task === 'sword') {
        return true;
    }
    else { return false; }
}
function checkIfTheTaskIsItem(task) {
    if (task === 'soil_grass' || task === 'wood' || task === 'soil_img' || task === 'tree' || task === 'cloud' || task === 'rock') {
        return true;
    }
    else { return false; }
}


// ------- check if the width input is a correct number
function checkIfWidthInputIsNum(v, el) {
    let temp = v === '' ? '' : Number(v);
    if (temp === '' || (temp && temp > 400)) {
        return true;
    } else {
        el.value = '';
        el.setAttribute('placeholder', 'Wrong input!');
        return false;
    }
}
// ------- check if the number of tools input is a correct number
function checkToolsNumInput(v1, el1, toolsNum) {
    let temp = v1 === '' ? '' : Number(v1);
    if (temp === '' || (temp && temp > 2 && temp <= toolsNum)) {
        return true;
    } else {
        el1.value = '';
        el1.setAttribute('placeholder', 'Wrong input!');
        return false;
    }
}
// ------- check if the bank inventory of input is a correct number
function checkBankSizeInput(v1, el1) {
    let temp = v1 === '' ? '' : Number(v1);
    if (temp === '' || (temp && temp > 3 && temp <= 65)) {
        return true;
    } else {
        el1.value = '';
        el1.setAttribute('placeholder', 'Wrong input!');
        return false;
    }
}
//cheak if all inputs are good
function checkIfAllTheInpusGood(check1, check2, check3) {
    let goodInput = 0;
    if (check1) {
        goodInput++;
    }
    if (check2) {
        goodInput++;
    }
    if (check3) {
        goodInput++;
    }
    return goodInput === 3 ? true : false;
}




function settTree(startPoint, y) {
    let startPointToArr = string2Arr(startPoint);
    let rowStart = Number(startPointToArr[0]);
    let colStart = Number(startPointToArr[1]);
    // console.log(rowStart);
    for (let i = rowStart + 6; i < rowStart + 10; i++) {
        setClassBoth(arr2String([i, colStart + 3]), 'wood');
    }

    let gapY = 2
    let fullY = y;
    for (let i = rowStart; i < rowStart + 6; i++) {
        for (let j = colStart; j < colStart + 7; j++) {

            if (gapY === 0 || (j - 17 > (fullY - gapY) / 2 - 1 && j - 17 < (fullY - gapY) / 2 + gapY)) {
                setClassBoth(arr2String([i, j]), 'tree');
            }
        }
        gapY++;
    }
}


function setClude(startPoint) {
    let startPointToArr = string2Arr(startPoint);
    let rowStart = Number(startPointToArr[0]);
    let colStart = Number(startPointToArr[1]);
    for (let i = rowStart, c = 0; i < rowStart + 4; i++) {
        for (let j = colStart; j < colStart + 5; j++, c++) {
            if (i === rowStart + 3) {
                c + 14;
            }
            if (!(c === 0 || c === 4 || c === 15 || c === 19)) {
                setClassBoth(arr2String([i, j]), 'cloud');
            }
        }
    }
}


function setRock(startPoint) {
    let startPointToArr = string2Arr(startPoint);
    let rowStart = Number(startPointToArr[0]);
    let colStart = Number(startPointToArr[1]);
    console.log(rowStart, colStart)
    for (let i = rowStart, c = 0; i < rowStart + 3; i++) {
        for (let j = colStart; j < colStart + 4; j++, c++) {
            if (i === rowStart + 3) {
                c + 14;
            }
            if (!(c === 0 || c === 3)) {
                setClassBoth(arr2String([i, j]), 'rock');
            }
        }
    }
}

function setRock(startPoint) {
    let startPointToArr = string2Arr(startPoint);
    let rowStart = Number(startPointToArr[0]);
    let colStart = Number(startPointToArr[1]);
    console.log(rowStart, colStart)
    for (let i = rowStart, c = 0; i < rowStart + 3; i++) {
        for (let j = colStart; j < colStart + 4; j++, c++) {
            if (i === rowStart + 3) {
                c + 14;
            }
            if (!(c === 0 || c === 3)) {
                setClassBoth(arr2String([i, j]), 'rock');
            }
        }
    }
}
// }


