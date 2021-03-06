/*
	Bullet3 class
	art:
	Alpha Mission II (NeoGeo)

*/	

function Bullet3(x, y, vx, vy){
	this.x = x;
	this.y = y;
	this.invalido = false;
	this.image = "bullet3";
	this.raio = 6;
	this.w = 12;
	this.h = 12;
	this.vx = (vx)?vx:0;
	this.vy = (vy)?vy:200;
	this.colLimit = 1;
	this.col = 0;
}


Bullet3.prototype.desenhar = function(){

	imglib.draw(ctx, this.image, Math.floor(this.col)*this.w, 0, this.w, this.h, 
						this.x, this.y, this.w, this.h);
	
	this.col += 5*dt;
	if(Math.floor(this.col) > this.colLimit)
		this.col = 0;

}

Bullet3.prototype.mover = function(){
	this.y += this.vy*dt;
	this.x += this.vx*dt;
}

Bullet3.prototype.restricoes = function(){
	if(this.y+this.h < limitTop || this.y > limitBottom || this.x < limitLeft || this.x > limitRight){
		this.invalido = true;
	}
}

Bullet3.prototype.colisao = function(alvo){
	var distancia = Math.sqrt(Math.pow(alvo.x+(alvo.raio/2) - (this.x+(this.raio/2)), 2)+Math.pow(alvo.y+(alvo.raio/2) - (this.y+(this.raio/2)), 2));
	return(distancia<(alvo.raio+this.raio))
}