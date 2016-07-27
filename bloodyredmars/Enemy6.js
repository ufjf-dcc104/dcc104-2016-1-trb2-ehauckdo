
function Enemy6(x){
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
	this.orbit = new Object();
	this.orbit.x = 500;
	this.orbit.y = 100;
	this.orbit.angle = Math.PI;
	this.orbit.r = 200;
}


Enemy6.prototype.desenhar = function(){
	
	imglib.drawRotated(ctx, "enemy2", Math.floor(this.col)*52, 0, 52, 43,
						this.originX, this.originY, 40, 30, this.angle);

}

Enemy6.prototype.mover = function(){
	if(this.state < 2){
		this.vx = this.vx + this.ax*dt;
	 	this.x = this.x + this.vx*dt;
	 	this.vy = this.vy + this.ay*dt;
	 	this.y = this.y + this.vy*dt;
	}
	else{
		this.x = this.orbit.x + Math.cos(this.orbit.angle) * this.orbit.r;
		this.y = this.orbit.y + Math.sin(this.orbit.angle) * this.orbit.r;
		this.orbit.angle += this.v*dt;
		this.angle = this.orbit.angle + this.anglev;
	}
	this.originX = this.x - this.raio;
	this.originY = this.y - this.raio;
}

Enemy6.prototype.restricoes = function(){

	// primeiro estado
	// chega em y > 100 e pára
	if(this.state == 0){
		if(this.y > 100){
			this.vy = 0;
			this.ay = 0;
			this.vx = 0;
			this.ax = 0;
			this.state = 1;
			this.cooldown = 0;
		} 
	}
	// segundo estado
	/// aguarda alguns ms em y > 100, depois acelera na direçao do player
	else if (this.state == 1){
		this.cooldown -= 1000*dt;
	
		if(this.cooldown < 0){
			if(this.x > limitRight/2){
				offset = -600;
				this.v = 0.75;
				this.orbit.angle = 2*Math.PI;
				this.anglev = 2*Math.PI;
				this.orbit.r = 600;
			}
			else{ 
				offset = 600;
				this.v = -0.75;
				this.orbit.angle = Math.PI;
				this.anglev = Math.PI;
				this.orbit.r = 600;
			}
			this.state += 1;
			this.orbit.x = this.x+offset;
			this.orbit.y = this.y;
	
		}
	}
	
	if(	this.originY > limitBottom 
		|| this.x+this.raio > limitRight
		|| this.originX < limitLeft)
	{
		this.invalido = true;
	}
}

Enemy6.prototype.damage = function(){
	this.invalido = true;
	this.explodiu = true;
	soundlib.play("explosao");
}

