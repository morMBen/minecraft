//Get container element
const container = document.getElementById("container");
//Get nav element
const nav = document.getElementById("navbar");
//Get body style 
const bodyStyle = document.querySelector("body").style;
//The object invntory for all the divs inside the container
let objInventory = [];
//Picking inventory
let bank = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//Number of tools
let numOfTools = 5;
//Tools specificatin
let toolsArr = ['Axe', 'shovel', 'mining', 'hoe', 'sword']
//The current tool
let task = null;
//---ON--set screen size--400px min---//
setOpeningPage();
setScreenSize('auto');
setToolsButtons(numOfTools);

//===========OPENING PAGE==========//
function setOpeningPage() {
    let mainDiv = document.createElement("div");
    mainDiv.classList.add('open');
    mainDiv.style.width = '100vw';
    mainDiv.style.height = '100vh';
    mainDiv.style.position = 'static';
    mainDiv.style.background = 'red';
    mainDiv.style.display = 'none';
    document.body.insertAdjacentElement('afterbegin', mainDiv);
}

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
//Check if the object id = string 'num,num2' hve a specific class true / false
function objectHasCalss(id, className) {
    let getObjById = objInventory.find(el => el.objId === id);
    if (getObjById.tempClass) {
        return getObjById.tempClass.toString() === className ? true : false;
    } else {
        return false;
    }

}
//Get object by ID
function getObjById(objectId) {
    return objInventory.find(el => el.objId === objectId);
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
function getBankSum() {
    return bank.reduce((a, b) => a + b);
}

console.log(getBankSum());
//=========EVENTS==========//
//The main chack for the container divs
function divsCheck(el) {
    let id = getIdByEl(el);
    let objClass = getObjById(id).tempClass;
    if (objClass && canIDeleteIt(id)) {
        if (task === 'Axe' || task === 'shovel' || task === 'mining' || task === 'hoe' || task === 'sword') {
            switch (task) {
                case 'shovel':
                    if (objClass === 'soil_img' || objClass === 'Rocky_soil_grass') {
                        deleteClassBoth(id);
                        getBankSum() < bank.length ? task = 'shovel' : task === null;
                    }
                    break;
            }
        }
    } else {
        // objClass ? task = objClass : null;
    }

    // return console.log(task);
};

//The main chack for the tools buttons
function chooseButton(el) {
    let button = el.classList[0];
    task = button;
};



//================SETTERS============//
//set class for obj only
function setObjClassById(objectId, className) {
    getObjById(objectId).tempClass = className;
}
//set class for element only
function setElclassById(elId, className) {
    getElByArr(string2Arr(elId)).classList.add(className);
}
//set class for element and obj
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

//===========CHECKS==========//
function canIDeleteIt(id) {
    let arrId = string2Arr(id);
    let bottom = getObjById(arr2String([Number(arrId[0]) + 1, arrId[1]]));
    let rigth = getObjById(arr2String([arrId[0], Number(arrId[1]) + 1]));
    let top = getObjById(arr2String([Number(arrId[0]) - 1, arrId[1]]));
    let left = getObjById(arr2String([arrId[0], Number(arrId[1]) - 1]));
    return top && rigth && bottom && left && top.tempClass && rigth.tempClass && bottom.tempClass && left.tempClass ? false : true;
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