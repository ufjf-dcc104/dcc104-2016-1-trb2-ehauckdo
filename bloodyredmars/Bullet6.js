/*
	Bullet6 class
	art:
	http://opengameart.org/content/bullet-collection-2-m484-games
*/	

function Bullet6(x, y, vx, vy){
	this.x = x;
	this.y = y;
	this.invalido = false;
	this.image = "bullet6";
	this.raio = 8;
	this.w = 16;
	this.h = 16;
	this.x += 8;
	this.vx = (vx)?vx:0;
	this.vy = (vy)?vy:500;
	this.colLimit = 1;
	this.col = 0;
}


Bullet6.prototype.desenhar = function(){

	imglib.draw(ctx, this.image, Math.floor(this.col)*this.w, 0, this.w, this.h, 
						this.x, this.y, this.w, this.h);
	
	this.col += 3*dt;
	if(this.col > this.colLimit)
		this.col = 0;

}

Bullet6.prototype.mover = function(){

	this.y += this.vy*dt;
	this.x += this.vx*dt;
}

Bullet6.prototype.restricoes = function(){
	if(this.y+this.h < limitTop || this.y > limitBottom || this.x < limitLeft || this.x > limitRight){
		this.invalido = true;
	}
}

Bullet6.prototype.colisao = function(alvo){
	var distancia = Math.sqrt(Math.pow(alvo.x+(alvo.raio/2) - (this.x+(this.raio/2)), 2)+Math.pow(alvo.y+(alvo.raio/2) - (this.y+(this.raio/2)), 2));
	return(distancia<(alvo.raio+this.raio))
}