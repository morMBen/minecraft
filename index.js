//get container element
const container = document.getElementById("container");
//get nav element
const nav = document.getElementById("navbar");
//get body style 
const bodyStyle = document.querySelector("body").style;
//the object invntory for all the divs inside the container
let objInventory = [];

//---ON--set screen size--400px min---//
setScreenSize('auto');


//===========NEW GAME SET==========//

//fubcion to set new object/div inside the inventory 
function addNewDiv(inventory, idArr, rClass = null) {
    inventory.push({
        objId: idArr,
        tempClass: rClass,
    })
};
//---screen size select function
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
//set grid property
function setGridProperty(el, rows, cols) {
    el.style.setProperty('--grid-rows', rows);
    el.style.setProperty('--grid-cols', cols);
}
//function that fill the divs of the container
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
            //---ON--set new obj in inventory---//
            addNewDiv(objInventory, `${i},${j}`);
            if (i > 12) {
                setObjClassById(`${i},${j}`, "grass_img");
                block.classList.add("grass_img");
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



//================GETTERS============//

//turn string to arr
function string2Arr(str) {
    return str.split(',');
}
//turn arr to string
function arr2String(arr) {
    return arr.join()
}
//get element from container by arr with to numbers
function getElByArr(arr) {
    let temp = document.querySelector(`.box_row_${arr[0]}.box_col_${arr[1]}`);
    return temp || -1;
}
//check if the object id = string 'num,num2' hve a specific class true / false
function objectHasCalss(id, className) {
    let getObjById = objInventory.find(el => el.objId === id);
    if (getObjById.tempClass) {
        return getObjById.tempClass.toString() === className ? true : false;
    } else {
        return false;
    }

}
//get object by ID
function getObjById(objectId) {
    return objInventory.find(el => el.objId === objectId);
}




//================SETTERS============//
function setObjClassById(objectId, className) {
    getObjById(objectId).tempClass = className;
}
function setElclassById(elId, className) {
    getElByArr(string2Arr(elId)).classList.add(className);
}
function setClassBoth(elNObjId, className) {
    setObjClassById(elNObjId, className);
    setElclassById(elNObjId, className);
}

function deleteTempClassObj(id) {
    getObjById(id).tempClass = undefined;
}
function deleteTempClassEl(id) {
    let el = getElByArr(string2Arr(id)).className.split(' ');
    getElByArr(string2Arr(id)).classList.remove(el[el.length - 1]);

}
function deleteClassBoth(id) {
    deleteTempClassEl(id);
    deleteTempClassObj(id);
}

// deleteTempClassEl('5,3');


// console.log(getObjById('5,3'));
setClassBoth('5,3', "grass_img")

// deleteClassBoth('5,3');






// console.log(getElByNumArr([10, 7]));
// let temp = getElByNumArr([10, 7]).classList.add("grass_img")
// console.log(temp);

// const temp = document.querySelector(".nav_row_2.nav_col_5");
// console.log(getElByNumArr(8, 5));
// console.log(getClassNumFromString("box_row_13"))





// const getObjById = objInventory.find(el => el.tempClass === 'sky');

// let brr = getElByNumArr([5, 5]);
// console.log(brr);