
function Enemy3(x){
	this.raio = 20;
	this.width = this.raio*2;
	this.height = this.raio*2;
	this.x = x;
	this.y = -100;
	this.col = 0;
	this.ativo = true;
	this.invalido = false;
	this.vx = 0;	
	this.vy = 0;
	this.ax = 0;
	this.ay = 150;	
	this.v = 350;
	this.bullets = [];
	this.state = 0;
	this.angle = 0;
	this.tipoColisao = CIRCULAR;
}


Enemy3.prototype.desenhar = function(){
	
	imglib.drawRotated(ctx, "enemy2", Math.floor(this.col)*52, 0, 52, 43,
						this.originX, this.originY, 40, 30, this.angle);
	
}

Enemy3.prototype.mover = function(){
	this.vx = this.vx + this.ax*dt;
 	this.x = this.x + this.vx*dt;
 	this.vy = this.vy + this.ay*dt;
 	this.y = this.y + this.vy*dt;
 	this.originX = this.x - this.raio;
	this.originY = this.y - this.raio;
}

Enemy3.prototype.restricoes = function(){

	// primeiro estado
	// chega em y > 100 e pára
	if(this.state == 0){
		if(this.y > 100){
			this.vy = 0;
			this.ay = 0;
			this.vx = 0;
			this.ax = 0;
			this.state = 1;
			this.cooldown = 600;
		} 
	}
	// segundo estado
	/// aguarda alguns ms em y > 100, depois acelera na direçao do player
	else if (this.state == 1){
		this.cooldown -= 1000*dt;
		this.angle = this.getAngle();
		if(this.cooldown < 0){
			this.state += 1;
			d = Math.sqrt(Math.pow(this.x-player.x,2)+Math.pow(this.y-player.y,2));
			this.ax = 500*((player.x-this.x)/d);
			this.ay = 500*((player.y-this.y)/d);
		}
	}
	
	if(this.originY > limitBottom){
		this.invalido = true;
	}
}

Enemy3.prototype.damage = function(){
	this.invalido = true;
	this.explodiu = true;
	soundlib.play("explosao");
}

Enemy3.prototype.getAngle = function(){
	y = this.x - player.x;
	x = player.y - this.y ;
	theta = Math.atan2(-y, x);
	if(theta > 1){
		theta = 1;
	}
	else if(theta < -1){
		theta = -1;
	}
	return -theta;
}