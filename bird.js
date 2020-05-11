//a bunch of vars

var canv = document.getElementById("canvas");
var cont = canv.getContext("2d");
var joe = new Image();
var bg = new Image();
var btm = new Image();
var topPipe = new Image();
var btmPipe = new Image();
var gate = 85; //sets dificulty
var constant;
var joeX = 10;//joe position x
var joeY = 150;//joe position y
var gravity = 1.5;
var score = 0;

//vars but with fresh new array feature

var pipe = [];

pipe[0] = {
    x : canv.width,
    y : 0
};


//it puts the img in the vars or it gets the hose again 

joe.src = "img/joe.png";
bg.src = "img/background.png";
btm.src = "img/ground.png";
topPipe.src = "img/toppipe.png";
btmPipe.src = "img/btmpipe.png";

//flaps the bird

document.addEventListener("keydown",flap);

//putting the func back into function

function flap(){
    joeY -= 25;
}

function draw(){
    
    cont.drawImage(bg,0,0);

    joeY += gravity;
    
    //it lays the pipe

    for(var i = 0; i < pipe.length; i++){
        
        constant = topPipe.height+gate;
        cont.drawImage(topPipe,pipe[i].x,pipe[i].y);
        cont.drawImage(btmPipe,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : canv.width,
                y : Math.floor(Math.random()*topPipe.height)-topPipe.height
            }); 
        }

        // collision logic
        
        if( joeX + joe.width >= pipe[i].x && joeX <= pipe[i].x + topPipe.width && (joeY <= pipe[i].y + topPipe.height ||
             joeY+joe.height >= pipe[i].y+constant) || joeY + joe.height >=  canv.height - btm.height){
            location.reload(); 
        }
        
        //adds a point

        if(pipe[i].x == 5){
            score++;
        }
        
        
    }

    cont.drawImage(btm,0,canv.height - btm.height);    
    cont.drawImage(joe,joeX,joeY);    
    cont.font = "42px Arial";
    cont.fillStyle = "red";
    cont.fillText("Frustration : "+score,10,canv.height-20);    
    requestAnimationFrame(draw);
    
}

draw();
