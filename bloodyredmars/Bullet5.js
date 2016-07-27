/*
	Bullet5 class
	art:
	Ripped from Touhou Subterranean Animism 
*/	

function Bullet5(x, y, vx, vy){
	this.x = x;
	this.y = y;
	this.invalido = false;
	this.image = "bullet5";
	this.w = 24;
	this.h = 24;
	this.raio = 8;
	this.x += 12;
	vxx = (Math.floor(Math.random() * 150))-150;
	if(vx == undefined)
		this.vx = vxx;
	else
		this.vx = vx;
	if(vy == undefined)
		this.vy = 200;
	else
		this.vy = vy;
	this.colLimit = 2;
	this.col = 0;
}


Bullet5.prototype.desenhar = function(){

	imglib.draw(ctx, this.image, Math.floor(this.col)*this.w, 0, this.w, this.h, 
						this.x, this.y, this.w, this.h);
	
	this.col += 3*dt;
	if(this.col > this.colLimit)
		this.col = 0;

}

Bullet5.prototype.mover = function(){

	this.y += this.vy*dt;
	this.x += this.vx*dt;
}

Bullet5.prototype.restricoes = function(){
	if(this.y+this.h < limitTop || this.y > limitBottom || this.x < limitLeft || this.x > limitRight){
		this.invalido = true;
	}
}

Bullet5.prototype.colisao = function(alvo){
	var distancia = Math.sqrt(Math.pow(alvo.x+(alvo.raio/2) - (this.x+(this.raio/2)), 2)+Math.pow(alvo.y+(alvo.raio/2) - (this.y+(this.raio/2)), 2));
	return(distancia<(alvo.raio+this.raio))
}