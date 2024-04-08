var gameOverTime = 200;
var scoreCountTime = gameOverTime + 300;
var dinoJumpTime = gameOverTime + 600;

//button movements
document.onkeydown = function(e){
    // if you need to find the value of pressed key
    // console.log("key code is : ", e.keyCode); 
    dino = document.querySelector(".dino");
    
    if(e.keyCode == 38 || e.keyCode == 32 || e.keyCode == 82){
        dino.classList.add('animateDino');
        
        setTimeout(()=>{
            dino.classList.remove('animateDino');
            //jump timer for dino
        }, dinoJumpTime);
    }
    else if(e.keyCode == 39){
        dinoX = parseInt( window.getComputedStyle(dino, null).getPropertyValue('left') );
        if(dinoX < 1150){
            dino.style.left = dinoX + 50 + 'px';
        }        
    }
    else if(e.keyCode == 37){
        dinoX = parseInt( window.getComputedStyle(dino, null).getPropertyValue('left') );
        if(dinoX > 0)
        {
            dino.style.left = dinoX - 50 + 'px';
        }
    }
}

//score count
let score = 0;
setInterval( () => {
    dino = document.querySelector(".dino");
    obstacle = document.querySelector(".obstacle");
    gameOver = document.querySelector(".gameOver");

    //dino (x,y) value in integer
    dx = parseInt( window.getComputedStyle(dino, null).getPropertyValue('left') );
    dy = parseInt( window.getComputedStyle(dino, null).getPropertyValue('top') );

    //obstacle (x,y) value in integer
    ox = parseInt( window.getComputedStyle(obstacle, null).getPropertyValue('left') );
    oy = parseInt( window.getComputedStyle(obstacle, null).getPropertyValue('top') );

    /*
    //converts into percentage % for responsive left% style and offset difference 

    wx = window.innerWidth;
    wy = window.innerHeight;
    // console.log(wx, wy);
    dx1 = (dx/wx) * 100;
    dy1 = (dy/wy) * 100;
    // console.log(dx1,dy1);
    ox1 = (ox/wx) * 100;
    oy1 = (oy/wy) * 100;
    // console.log(ox1,oy1);
    */

    //find the difference for fullStop or where the value of (x,y) match
    offsetX = parseInt(Math.abs(dx - ox));
    offsetY = parseInt(Math.abs(dy - oy));
    // console.log(offsetX, offsetY);

    let oneRound = true;
    //compare around value for stop!!
    if(offsetX < 200 && offsetY < 80){
        obstacle.classList.remove('obstacleAni');
        gameOver.style.display = 'block';
    }
    //complete oneRound & score ++
    else if(offsetX < 100 && oneRound){
        score += 5;
        updateScore(score);
        oneRound = false; //stop the score count
        setTimeout(() => {
            oneRound = true;
        }, scoreCountTime);
    }

}, gameOverTime);

//update score for every round
function updateScore(score){
    let scoreCount = document.getElementById("scoreCount");
    scoreCount.innerHTML = score;
}


// reset(retry) btn
let reset = document.querySelector("#reset");
reset.addEventListener('click', ()=>{
    obstacle.classList.add('obstacleAni');
    gameOver.style.display = 'none';
    scoreCount.innerHTML = 0;
    score = 0;
});
