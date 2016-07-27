/*
	Bomb class
*/	

function Bomb(x, y, vx, vy){
	this.x = x;
	this.y = y;
	this.initialx = x;
	this.initialy = y;
	this.w = 26;
	this.h = 31;
	this.originX = this.x - this.w/2;
	this.originY = this.y - this.h/2;
	this.ativa = false;
	this.load(vx, vy);
}

Bomb.prototype.load = function(vx, vy){
	this.col = 0;
	this.raio = 5;
	this.vx = 0;
	this.vy = (vy)?vy:-500;
	this.colLimit = 1;
}

Bomb.prototype.desenhar = function(){
	imglib.draw(ctx, "bomb", 0, 0, 38, 45,
		this.originX, this.originY, this.w, this.h);
}

Bomb.prototype.mover = function(){
	this.y += this.vy*dt;
	this.originY = this.y - this.h/2;
	this.x += this.vx*dt;
	this.originX = this.x - this.w/2;
	
}

Bomb.prototype.explodir = function(){
	if(this.distanciaPercorrida() > 100){
		return true;
	}else{
		return false;
	}
}

Bomb.prototype.distanciaPercorrida = function(){
	return Math.sqrt( 
		(this.x - this.initialx) * (this.x - this.initialx) + (this.y - this.initialy) * (this.y - this.initialy) 
	);
}