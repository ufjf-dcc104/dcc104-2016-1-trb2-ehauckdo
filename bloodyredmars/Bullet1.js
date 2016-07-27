/*
	Bullet1 class
	art:
	http://opengameart.org/content/bullet-collection-2-m484-games

*/	

function Bullet1(x, y, vx, vy){
	this.x = x;
	this.y = y;
	this.originX = this.x - this.raio;
	this.originY = this.y - this.raio;
	this.invalido = false;
	this.image = "bullet1";
	this.raio = 5;
	this.w = 10;
	this.h = 10;
	this.vx = (vx)?vx:0;
	this.vy = (vy)?vy:-500;
	this.colLimit = 1;
	this.col = 0;
}


Bullet1.prototype.desenhar = function(){

	imglib.draw(ctx, this.image, Math.floor(this.col)*this.w, 0, this.w, this.h, 
						this.originX, this.originY, this.w, this.h);
	
	this.col += 3*dt;
	if(this.col > this.colLimit)
		this.col = 0;

}

Bullet1.prototype.mover = function(){

	this.y += this.vy*dt;
	this.x += this.vx*dt;
	this.originX = this.x - this.raio;
	this.originY = this.y - this.raio;
}

Bullet1.prototype.restricoes = function(){
	if(this.y+this.h < limitTop || this.y > limitBottom || this.x < limitLeft || this.x > limitRight){
		this.invalido = true;
	}
}

Bullet1.prototype.colisao = function(alvo){
	var distancia = Math.sqrt(Math.pow(alvo.x+(alvo.raio/2) - (this.x+(this.raio/2)), 2)+Math.pow(alvo.y+(alvo.raio/2) - (this.y+(this.raio/2)), 2));
	return(distancia<(alvo.raio+this.raio))
}