function Background(background, parallax){
	this.x = 0;
	this.y = -800;
	this.vy = 100;
	this.image = background;
	if(parallax != null){
		this.parallax = new Background(parallax);
		this.vy = 70;
	}
}

Background.prototype.mover = function (){
	this.y = this.y + this.vy*dt;
	if(this.parallax != null)
		this.parallax.mover();
}

Background.prototype.desenhar = function (){
	imglib.draw(ctx, this.image, this.x, this.y);
	if(this.parallax != null)
		this.parallax.desenhar();
}

Background.prototype.restricoes = function(){
	if(this.y >= 0){
		this.y = -800;
	}
	if(this.parallax != null)
		this.parallax.restricoes();
}