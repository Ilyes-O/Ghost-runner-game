var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var spookySound;


function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}


function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 500);
  ghost.addImage(ghostImg);
  ghost.scale = .3
  
  spookySound.loop();

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}


function draw() {
  background(0);
  var edges = createEdgeSprites();
  if (gameState === "play") {

    if (tower.y > 400) {
      tower.y = 300;
    }

    if (keyDown("space")) {
      ghost.velocityY = -10;
    }
    ghost.velocityY = ghost.velocityY + .2;

    if (keyDown("left")) {
      ghost.x = ghost.x - 3;
    }
    if (keyDown("right")) {
      ghost.x = ghost.x + 3;
    }


    spawnDoors();
    ghost.collide(edges[0]);
    ghost.collide(edges[1]);

    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
      gameState = "end";
    }
    
  }
  

  if (gameState === "end"){ 
    invisibleBlockGroup.destroyEach();
    climbersGroup.destroyEach();
    doorsGroup.destroyEach();
    ghost.destroy();
    tower.destroy();
    stroke("yellow"); 
    fill("yellow"); textSize(30); 
    text("Game Over", 230,250) 
  }

  drawSprites();
}






function spawnDoors() {
  if (frameCount % 250 === 0) {
    door = createSprite(200, -50);
    door.x = Math.round(random(200, 400));
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 700;
    doorsGroup.add(door);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;

    climber = createSprite(200, 10);
    climber.x = door.x;
    climber.addImage(climberImg);
    climber.lifetime = 700;
    climber.velocityY = 1;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(200, 15);
    invisibleBlock.x = door.x;
    invisibleBlock.width = climber.width;
    invisibleBlock.lifetime = 700;
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.height = 2;
  }
}
