function Bullet2(x, y, angle, vx, vy){
	this.x = x;
	this.y = y;
	this.raio = 5;
	this.w = 16;
	this.h = 58;
	this.originX = this.x - this.w/2;
	this.originY = this.y - this.h/2;
	this.invalido = false;
	this.image = "bullet2";
	this.vx = (vx != null)?vx:0;
	this.vy = (vy != null)?vy:-500;
	this.colLimit = 1;
	this.col = 0;
	this.angle = (angle)?angle:0;;
}


Bullet2.prototype.desenhar = function(){

	imglib.drawRotated(ctx, this.image, Math.floor(this.col)*this.w, 0, this.w, this.h, 
						this.originX, this.originY, this.w, this.h, this.angle, 1);

	this.col += 3*dt;
	if(this.col > this.colLimit)
		this.col = 0;

}

Bullet2.prototype.mover = function(){

	this.x += this.vx*dt;
	this.y += this.vy*dt;
	this.originX = this.x - this.w/2;
	this.originY = this.y - this.h/2;
}

Bullet2.prototype.restricoes = function(){
	if(this.y+this.h < limitTop || this.y > limitBottom || this.x < limitLeft || this.x > limitRight){
		this.invalido = true;
	}
}

Bullet2.prototype.colisao = function(alvo){
	var distancia = Math.sqrt(Math.pow(alvo.x+(alvo.raio/2) - (this.x+(this.raio/2)), 2)+Math.pow(alvo.y+(alvo.raio/2) - (this.y+(this.raio/2)), 2));
	return(distancia<(alvo.raio+this.raio))
}