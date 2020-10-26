
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground, ground2;
var score=0;
var survivalTime;
var PLAY=1
var END=0
var gameState=PLAY


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
  
  monkey = createSprite (50,150,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.075;
  
  ground = createSprite (300,175,1200,5);
  ground.velocityX=-5;
  ground.x = ground.width /2;
  
  ground2 = createSprite (300,180,1200,10);
  ground2.visible=false;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //monkey.debug=true
  
}

function draw() {
  background("lightblue");
  
  if (gameState===PLAY){
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+ score,500,50);
    
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+ survivalTime,50,50);
  
  if(monkey.isTouching(FoodGroup)){
    score=score+0.5
  }
    
  if(monkey.collide(obstacleGroup)){
    gameState=END
  }
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space") && monkey.y >= 150){
    monkey.velocityY=-9;
  }  
  
  monkey.velocityY=monkey.velocityY + 0.5;

  console.log(monkey.y);
  
  monkey.collide(ground2);
  
  bananas()
  
  obstacles()
  
  drawSprites(); 
} else if(gameState===END){
  textSize(50)
  fill("lightgreen")
  stroke("black")
  text("Game Over", 200,130)
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:"+ survivalTime,50,50);

  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+ score,500,50);
  
  }

  
}

function bananas(){
var r=Math.round(random(100,160))
  if(World.frameCount%80===0){
  banana = createSprite (600,150,20,20);
  banana.addImage(bananaImage);
  banana.scale=0.07;
  banana.velocityX=-7;
  banana.y=r;
  banana.setLifetime=120;
    
  FoodGroup.add(banana);
  }
  
}

function obstacles(){
  if(World.frameCount%300===0){
   obstacle = createSprite(600,165,20,20);
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.07;
   obstacle.velocityX=-7;
   obstacle.setLifetime=150;
    
   obstacleGroup.add(obstacle);
  
  }
}






