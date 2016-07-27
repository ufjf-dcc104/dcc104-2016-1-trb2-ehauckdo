
function Enemy2(x){
	this.raio = 20;
	this.w = this.raio*2;
	this.h = this.raio*2;
	this.x = x;
	this.y = -100;
	this.originX = this.x - this.raio;
	this.originY = this.y - this.raio;
	this.col = 0;
	this.ativo = true;
	this.invalido = false;
	this.vx = 0;		
	this.vy = 350;
	this.bullets = [];
	this.tipoColisao = CIRCULAR;
}


Enemy2.prototype.desenhar = function(){
	
	imglib.draw(ctx, "enemy2", Math.floor(this.col)*52, 0, 52, 43,
						this.originX, this.originY, 40, 40);
	

}

Enemy2.prototype.mover = function(){
	this.x += this.vx*dt;
	this.y += this.vy*dt;
	this.originX = this.x - this.raio;
	this.originY = this.y - this.raio;
}

Enemy2.prototype.restricoes = function(){
	if(this.y > limitBottom){
		this.invalido = true;
	}
}

Enemy2.prototype.damage = function(){
	if(this.y < limitTop)
		return;
	this.invalido = true;
	this.explodiu = true;
	soundlib.play("explosao");
}

