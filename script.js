let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("reset-btn");
let msgRef = document.getElementById("msg");

//Winning Pattern Array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5], // corrected the pattern here
    [6, 7, 8],
];


// Player X plays first 
let xTurn =true;
let count =0;

// disable All buttons
const disableAllButtons = () =>{
    btnRef.forEach((elemen) => (elemen.disabled = true));
    // enable popup
    popupRef.classList.remove("hide");
}

// enable all buttons for new game start 
const enableAllButtons = () =>{
    btnRef.forEach((element)=>{
        element.innerText ="";
        element.disabled=false;
    });
    popupRef.classList.add("hide");
}

// new Game 

newgameBtn.addEventListener("click" , ()=>{
    count=0;
    enableAllButtons();
});
 //  restart game 
restartBtn.addEventListener("click" , ()=>{
    count=0;
    enableAllButtons();
});



// function for draw match 

const drawGame = ()=>{
    disableAllButtons();
    msgRef.innerHTML="&#x1F60E; <br> Its Draw Match";
};

// this function is executed when a player is winner
const winFunction = (letter) =>{
    disableAllButtons();
    if(letter === "X"){
        msgRef.innerHTML="&#x1f389;  <br> 'X' Wins! ";
    }else {
        msgRef.innerHTML="&#x1F389;   <br> 'O' wins!";
    }
}

const winChecker = () => {
    //Loop through all win patterns 
    for (let i of winningPattern) {
        let [elementl, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        //Check if elements are filled
        // if 3 empty elements are same and would given win as would
        if((elementl != "" )&& (element2 != "") && (element3 != "")){
            if(elementl===element2&&element2===element3){
                // if all the buttons having same value the pass the value in winFunction
                winFunction(elementl);
            }
        }
    }
};




//Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            // Display X for player X's turn
            element.innerText = "X";
            xTurn = false; // Toggle the turn
        } else {
            // Display O for player O's turn
            element.innerText = "O";
            xTurn = true; // Toggle the turn
        }
        element.disabled = true; // Disable the button after click

        // Increment count on each click 
        count += 1;
        if (count === 9) {
            drawGame(); // Check for a draw
        }
        winChecker(); // Check for a winner on every click
    });
});
window.onload=enableAllButtons;



