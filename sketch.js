
var monkey , monkeyIMG;
var bananasGroup, bananaImage; obstacle, obstacleGroup, obstacleImage
var obstacleGroup, obstacleImage;
var score
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survivalTime
var message
var ground, invisbleGround;
var obstacle,obstacleImage

function preload(){
  
  
  monkeyIMG = loadImage("tiger1.png");
  bananaImage = loadImage("coin.jpg");
  obstacleImage = loadImage("log.png");
 
}



function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  console.log(message);
  
  monkey=createSprite(150,620,30,30);
  monkey.addImage(monkeyIMG);
  monkey.scale=0.5;
  
  ground=createSprite(450,830,6000,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite(450,830,6000,10);
  invisibleGround.velocityX=-4;
  invisibleGround.x=ground.width/2;
  invisibleGround.visible = false;
  
  obstacleGroup = createGroup();
  bananasGroup = createGroup();
  
  score=0;
}


function draw() {
  
background("green");

  stroke("green");
  textSize(50);
  fill("red");
  text("Score:"+score,570,100);
  
  stroke("black");
  textSize(20);
  fill("black");
  //survivalTime=Math.ceil(frameCount/frameRate())
  //text("Survival Time: "+ survivalTime, 100,50);
  
  if(gameState===PLAY) {
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    food();
    Obstacles();
    
    if(bananasGroup.isTouching(monkey)) {
      bananasGroup.destroyEach();
      score = score + 2;
    }
    
     if(keyDown("space")&& monkey.y >= 140) {
        monkey.velocityY = -12;
    }

    /*if(obstacleGroup.isTouching(monkey)){
      gameState=END;
      monkey.velocityY = 0;
      monkey.velocityX = 0;
      bananasGroup.velocityX = 0;
      bananasGroup.velocityY = 0;
      obstacleGroup.velocityX = 0;
      obstacleGroup.velocityY = 0;
      bananasGroup.destroyEach();
      obstacleGroup.destroyEach();
      textSize(30);
      text("gameOver", 500, 500);
    }*/
  
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
  monkey.collide(invisibleGround);
  }
    if (obstacleGroup.isTouching(monkey)){
    gameState=END;
    bananasGroup.destroyEach();
    obstacleGroup.destroyEach();
    score = 0;
    survivalTime = 0;
    textSize(30);
      text("gameOver", 500, 500);

  }
                                                                               
    
  
  
  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    var banana=createSprite(450,700,30,10);
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.y = random(420,530);
    banana.velocityX = -7;
    banana.setLifetime = 100 ;
    monkey.depth = banana.depth;
    monkey.depth = banana.depth + 1;
    bananasGroup.add(banana);
  }
    
}

function Obstacles() {
  if (frameCount % 300 === 0){
    var obstacle=createSprite(420,790,90,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-5;
    obstacle.scale = 0.3;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}