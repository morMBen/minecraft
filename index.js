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
//Number of slots in the bank
let slotsBankNum = 5;
//Picking inventory can be or objId or 0 for empty
let bank = [0];
//Tools specificatin
let toolsArr = ['Axe', 'shovel', 'mining', 'hoe', 'sword']
//The current tool
let task = null;
//---ON--set screen size--400px min---//
setScreenSize('auto');
setToolsButtons(numOfTools);
bankInit();
setDivsBank(slotsBankNum);
// setOffGameScreen();
// setOnOpeningPage();

// setOffOpeningPage();
// setOnOpeningPage();
// setScreenSize(1600);
// setToolsButtons(numOfTools);
//===========OPENING PAGE==========//
function setOnOpeningPage() {
    let mainDiv = document.createElement("div");
    mainDiv.classList.add('open');
    mainDiv.style.width = '100vw';
    mainDiv.style.height = '100vh';
    mainDiv.style.position = 'static';
    mainDiv.style.background = 'red';
    mainDiv.style.display = 'absolut';
    document.body.insertAdjacentElement('afterbegin', mainDiv);
}
//===========SET OFF================//
function setOffGameScreen() {
    container.innerHTML = "";
    nav.innerHTML = "";
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
            if (i > 12) {
                setObjClassById(`${i},${j}`, "soil_img");
                block.classList.add("soil_img");
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
            // addNewDiv(navDivInventory, `${i},${j}`, 'empty_space');
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
    userMassgeBox.style.textAlign = 'center';
    userMassgeBox.classList.add('massege_box');
    let massgeText = document.createElement('h2');
    userMassgeBox.insertAdjacentElement("afterbegin", massgeText);
    massgeText.style.width = '100%';
    massgeText.classList.add('massege_text');
    massgeText.textContent = 'Choose tool:';
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
//Set the bank to the correct number of slots
function bankInit() {
    bank = new Array(slotsBankNum);
    for (i = 0; i < slotsBankNum; i++) {
        bank[i] = 0;
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
function getBankSum() {// לשנות==========----------===========---------
    return bank.reduce((a, b) => a + (b === 0 ? b : 1));
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
    if (objClass && canIDeleteIt(id)) {
        if (task === 'Axe' || task === 'shovel' || task === 'mining' || task === 'hoe' || task === 'sword') {
            switch (task) {
                case 'shovel':
                    whatTheToolPick(objClass, 'shovel', id, 'soil_img', 'Rocky_soil_grass');
                    break;
                case 'Axe':
                    whatTheToolPick(objClass, 'Axe', id, 'wood');
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
    } else {
        // objClass ? task = objClass : null;
    }

    // return console.log(task);
};
function whatTheToolPick(currObjClass, tool, id, objClassName, objClassName2 = 0) {
    if (currObjClass === objClassName || currObjClass === objClassName2) {
        deleteClassBoth(id);

        // setClassBothNavObj('4,4', 'cloud');
        getBankSum() < bank.length ? task = tool : task === null;
    }
}
function setElInBankArr() {

}
console.log(bank);


//The main chack for the tools buttons
function chooseButton(el) {
    let button = el.classList[0];
    task = button;
};


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
//delete class for nav obj and element and obj
function deleteClassBothNavObj(id) {
    deleteTempClassEl(id);
    deleteNavTempClassObj(id);
}

//===========CHECKS==========//
function canIDeleteIt(id) {
    let arrId = string2Arr(id);
    let bottom = getObjById(arr2String([Number(arrId[0]) + 1, arrId[1]]));
    let rigth = getObjById(arr2String([arrId[0], Number(arrId[1]) + 1]));
    let top = getObjById(arr2String([Number(arrId[0]) - 1, arrId[1]]));
    let left = getObjById(arr2String([arrId[0], Number(arrId[1]) - 1]));
    return top.tempClass && rigth.tempClass && bottom.tempClass && left.tempClass ? false : true;
}






// deleteTempClassEl('5,3');


// console.log(getObjById('5,3'));


// deleteClassBoth('5,3');




setClassBoth('8,3', 'cloud')
setClassBoth('9,3', 'cloud')
setClassBoth('8,4', 'cloud')
setClassBoth('9,4', 'cloud')
setClassBoth('10,4', 'cloud')
setClassBoth('10,5', 'cloud')
setClassBoth('9,5', 'cloud')
setClassBoth('8,5', 'cloud')

setClassBoth('12,13', 'rock')
setClassBoth('11,13', 'rock')
setClassBoth('12,14', 'rock')
setClassBoth('11,14', 'rock')
setClassBoth('10,14', 'rock')
setClassBoth('12,15', 'rock')
setClassBoth('11,15', 'rock')
setClassBoth('12,16', 'rock')

setClassBoth('12,20', 'wood')
setClassBoth('11,20', 'wood')
setClassBoth('10,20', 'wood')
setClassBoth('9,20', 'wood')


setClassBoth('8,20', 'tree')
setClassBoth('7,20', 'tree')
setClassBoth('6,20', 'tree')
setClassBoth('5,20', 'tree')

setClassBoth('8,21', 'tree')
setClassBoth('7,21', 'tree')
setClassBoth('6,21', 'tree')
setClassBoth('5,21', 'tree')
setClassBoth('8,19', 'tree')
setClassBoth('7,19', 'tree')
setClassBoth('6,19', 'tree')
setClassBoth('5,19', 'tree')
setClassBoth('8,18', 'tree')
setClassBoth('7,18', 'tree')
setClassBoth('6,18', 'tree')
setClassBoth('5,18', 'tree')