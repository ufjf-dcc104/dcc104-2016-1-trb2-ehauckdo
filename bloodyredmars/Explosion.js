function Explosion(obj){
	this.x = obj.x;
	this.y = obj.y;
	this.vx = obj.vx;
	this.vy = obj.vy;
	this.col = 0;
	this.colLimit = 3;
	if(obj.raio){
		this.proportion = obj.raio/100;

	}
	else if(obj.width){
		this.proportion = obj.width/100;
	}
	this.size = this.proportion*100;
	this.originX = this.x - this.size;
	this.originY = this.y - this.size;

}

Explosion.prototype.desenhar = function(){
	imglib.draw(ctx, "explosion", Math.floor(this.col)*100, 0, 100, 86,
							this.originX, this.originY, this.size, this.size);
}

Explosion.prototype.mover = function(){
	this.y += this.vy*dt;
	this.x += this.vx*dt;
	this.originX = this.x - this.size;
	this.originY = this.y - this.size;
}

Explosion.prototype.restricoes = function(){
	this.col += 5*dt;
	if(this.col >= this.colLimit)
		this.invalido = true;
}

