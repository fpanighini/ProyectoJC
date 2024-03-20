function SmallCoin(x, y)
{
	var coin = new Texture("imgs/Coins.png");

	// Prepare coin sprite & its animation
	this.sprite = new Sprite(x, y, 16, 16, 3, coin);


	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [16, 0, 16, 16]);
	this.sprite.addKeyframe(0, [32, 0, 16, 16]);
	this.sprite.addKeyframe(0, [0, 0, 16, 16]);

}


SmallCoin.prototype.update = function update(deltaTime)
{	
	this.sprite.update(deltaTime);
}

SmallCoin.prototype.draw = function draw()
{
	this.sprite.draw();
}

SmallCoin.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}




