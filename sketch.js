var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var food;
var gameState,readState;


function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
  garden=loadImage("Garden.png");
  washroom=loadImage("Wash Room.png");
  bedroom=loadImage("Bed Room.png");
  }
function setup() {
  createCanvas(500, 500);
  
             
database=firebase.database();
    foodStock=database.ref('food');
              foodStock.on("value", readStock);}
function readStock(data)
{
  foodS=data.val();
  food.updateFoodStock(foodS);
}
function writeStock(x)
{
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  } 
  database.ref('/').update({
    food : x
  })
}
food = new Food();
readState=database.ref('gameState');
readState.on("value",function(data){
  gameState=data.val();
});
dog=createSprite(200,400,150,150);
dog.addImage(sadDog);
dog.scale=0.15;
feed = createButton("Feed the Dog");
feed.position(700,110);
feed.mousePressed(feedDog);
addFood = createButton("Add Food");
    addFood.position(800,110);
    addFood.mousePressed(addFoods);
  
function draw() {  
  currentTime=hour();
  if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime==(lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("Hungry")
    foodObj.display();
   }
   
   if(gameState!="Hungry"){
     feed.hide();
     addFood.hide();
     dog.remove();
   }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
   }

}

function feedDog(){
  dog.addImage(happyDog);

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    food:food.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}
