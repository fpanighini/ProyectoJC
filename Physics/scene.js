

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TileMap
	this.pos = 0;

	var tilesheet = new Texture("imgs/CompleteTilesheetLvl1.png");
	this.map = new Tilemap(tilesheet, [16, 16], [4, 8], [0, 0], level01V3);

	//var tilesheet = new Texture("imgs/lava.png");
	//this.map = new Tilemap(tilesheet, [16, 16], [6, 4], [0, 0], lava);
	
	// Create entities
	this.player = new Player(150, 384, this.map,this.pos);
	//this.bubble = new Bubble(360, 112);
	this.goomba = new Goomba(512, 384);
	//this.bubbleActive = true;
	this.goombaActive = true;

	this.question_box = new Question_Box(224, 352);


	this.marioDead = false;
	this.startmarioDead = false;

	

	// Store current time
	this.currentTime = 0
}

Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
	
	this.player.moveMario(deltaTime);

	// Update entities
	this.player.update(deltaTime);
	//this.bubble.update(deltaTime);
	this.goomba.update(deltaTime);

	this.question_box.update(deltaTime);
	
	// Check for collision between entities
	/*if(this.player.collisionBox().intersect(this.bubble.collisionBox()))
		this.bubbleActive = false;*/
	
	if(this.player.collisionBox().intersect(this.goomba.collisionBox())){
		//this.goombaActive = false;
		if(!this.marioDead){
			this.player.dead();
		}
		
		this.marioDead = true;
	}

}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);



	
	if (keyboard[65]) {
		this.pos = this.pos - 5;
		//this.map.basePos = [this.pos,0]
	}
	if (keyboard[68]) {
		this.pos = this.pos + 5;
		//this.map.basePos = [this.pos,0]

	}	

	console.log(this.pos);
	if(this.player.sprite.x >= (200+this.pos) && this.player.sprite.x < 3000){
		this.pos +=2;
		this.player.posMap = this.pos;
	}
	// Draw tilemap
	context.save();
	context.translate(-this.pos,0);
	this.map.draw();
	

	this.question_box.draw();
	// Draw entities
	/*if(this.bubbleActive)
		this.bubble.draw();*/
	if(this.goombaActive)
		this.goomba.draw();
	this.player.draw();
	context.restore();


}



