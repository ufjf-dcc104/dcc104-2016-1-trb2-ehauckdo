function PowerUp(x, tipo){
	this.x = x;
	this.y = 0;
	this.raio = 30;
	this.w = 28
	this.h = 28
	this.vy = 150;
	this.ativo = true;
	this.tipo = (tipo)?tipo:0;
}

PowerUp.prototype.desenhar = function(){
	imglib.drawRotated(ctx, "powerup", this.tipo*this.w, 0, 28, 28, this.x, this.y, 28, 28, 0, 1);
}

PowerUp.prototype.mover = function(){

	this.y += this.vy*dt;
}

PowerUp.prototype.restricoes = function(){
	if(this.y > limitBottom){
		this.invalido = true;
	}
}

