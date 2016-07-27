
function Enemy1(x){
	this.w = this.raio*2;
	this.h = this.raio*2;
	this.x = x;
	this.y = 0;
	this.invalido = false;

	if(x > tela.w/1.3)  //346
		this.vx = -50;
	else if(x < tela.w/2.8) //160
		this.vx = 50;
	else if(x < tela.w/2) // 250
		this.vx = -50
	else if(x > tela.w/2) //250
		this.vx = 50;
	else
		this.vx = 0;
	
	this.vy = 350;
	this.bullets = [];
	this.angle = 0;
	this.initializeRandomSize();
	this.tipoColisao = CIRCULAR;
	
}

Enemy1.prototype.initializeRandomSize = function(){
	chance = Math.random();
	if(chance > 0.95){
		this.size = 1;
		this.raio = 54;
		this.life = 2;
	}
	else if(chance > 0.8){
		this.size = 0.8;
		this.raio = 43;
		this.life = 1;	
	}
	else{
		this.raio = 21;
		this.size = 0.4;
		this.life = 0;
	}
	this.originX = this.x - this.raio;
	this.originY = this.y - this.raio;
}


Enemy1.prototype.desenhar = function(){
	imglib.drawRotated(ctx, "enemy1", 0, 0, 108, 108,
						this.originX, this.originY, this.raio*2, this.raio*2, this.angle);
}

Enemy1.prototype.mover = function(){
	this.x += this.vx*dt;
	this.y += this.vy*dt;
	this.originX = this.x - this.raio;
	this.originY = this.y - this.raio;
	this.angle += 0.05;
}

Enemy1.prototype.restricoes = function(){
	if(this.y > limitBottom){
		this.invalido = true;
	}
}

Enemy1.prototype.damage = function(dmg){
	damage = (dmg?dmg:1);
	this.life -= damage;
	if(this.life < 0){
		this.invalido = true;
		this.explodiu = true;
		soundlib.play("explosao");
	}
}
