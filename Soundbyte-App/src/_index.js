const fs = require('fs');

const mainBox = document.querySelector(".main-section");
//console.log(mainBox);

//Main settup
const setupContent = `
<div class="mainTemp">
    <p>Welcome,</p>
    <p>It looks like we'' need to do the first time set-up.<p/>
    <div class="fileUpload">
    Please provide your own JSON file.
    <form>

    <label class="file">
        <input type="file" id="file" aria-label="File browser">
        <span class="file-custom"></span>
    </label>

    <p>If you leave it blank and submit, the app will use the default JSON file.</p>

    </div>
    <div class="submit">
        <button type="submit">Submit</button>
    </div>    
</div>

`;

const navButtons = document.querySelectorAll(".navButton");
let navIndex = -1;

if(navIndex === -1) {
    mainBox.innerHTML = setupContent;
}
//Config file check


//Add EventListener on navButton
navButtons.forEach((navButton, index) => {
    navButton.addEventListener('click', () => {
        //console.log(index);
        navigation(index);
    });
});

const navigation = (index) => {
    navIndex = index;

    //reset active menu
    navButtons.forEach((navButton) => {
        navButton.classList.remove("active");
    });

    //set active on current menu
    navButtons[index].classList.add("active");

    //update template
    document.querySelector(".main-section").innerHTML = updateTemplate(navIndex);
};

const updateTemplate = (navIndex) => {
    switch(navIndex){
        case 0:
            //preprocess for suggestion


            // render with jsx
            return (
                `
                <span>content of Suggestion with index ${navIndex} </span>
                `
            );

        case 1:
            //preprocess for Criteria Search


            // render with jsx
            return (
                `
                <span>content of Criteria Search with index ${navIndex} </span>
                `
            );

        case 2:
            //preprocess for suggestion


            // render with jsx
            return (
                `
                <span>content of Auto Generation with index ${navIndex} </span>
                `
            );
    }
};