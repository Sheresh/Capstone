var PLAY = 1;
var END = 0;
var gameState= PLAY;
var score=0;

var witch, girl, coins, bg;
var witchImg,girlImg, coinImg, bgImg;
var coinGroup;
var spookyMusic;
var invisibleGround;


function preload(){
  witchImg = loadImage("Witch.png");
  girlImg = loadAnimation("Girl_running1.png","girl_running_2.png");
  coinImg = loadImage("Coin.png");
  spookyMusic = loadSound("spooky.wav");
  bgImg = loadImage("scary.jpg");

}

function setup() {
    createCanvas(900,500);
    spookyMusic.loop();

bg = createSprite(450,250);
bg.addImage("background",bgImg);
bg.scale = 1;


girl = createSprite(250,400,20,50);
girl.addAnimation("running",girlImg);
girl.scale = 0.6;

witch = createSprite(50,400,20,50);
witch.addImage(witchImg);
witch.scale = 0.5;

invisibleGround = createSprite(450,0,400,10);
invisibleGround.visible = false;

coinGroup = createGroup();
 
}

function draw() {
background(255);
text("Score:"+score, 500,50);


  if(gameState === PLAY){
    //move the bg
    bg.velocityX = -4;
    //scoring
  if (girl.isTouching(coinGroup)){
    score = score + 1;
  }

    if (bg.x < 225){
      bg.x = width/2;
    }

    if(keyDown("space")&& girl.y >=100) {
    girl.velocityY = -13
  }

  girl.velocityY = girl.velocityY +  0.8 ; 
  if(coinGroup.isTouching(girl)){
    score=+1;
}
}
spawnCoins();
  
if (gameState === END) {
  bg.velocityX = 0;
  girl.velocityY=0;
  gameOver.visible = true;
  restart.visible = true;
  coinGroup.setVelocityXEach(0);
  coinGroup.setLifetimeEach(-1);
}
girl.collide(invisibleGround);


drawSprites();
}

function spawnCoins() {
  //write code here to spawn the coins
   if (frameCount % 100 === 0) {
     coins = createSprite(700,Math.round(random(200,350)));
    coins.addImage(coinImg);
    coins.scale = 0.3;
    coins.velocityX = -3;
    
     //assign lifetime to the variable
    coins.lifetime = 134;
    
    //adjust the depth
    coins.depth = girl.depth;
    girl.depth = girl.depth + 1;
    
    //adding cloud to the group
   coinGroup.add(coins);
    }
}