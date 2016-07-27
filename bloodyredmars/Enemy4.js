function Enemy4(x){
	this.raio = 30;
	this.width = this.raio*2;
	this.height = this.raio*2;
	this.x = x;
	this.y = -100;
	this.originX = this.x - this.raio;
	this.originY = this.y - this.raio;
	this.col = 0;
	this.colLimit = 3;
	this.ativo = true;
	this.invalido = false;
	this.vx = -70;	
	this.vy = 100;
	this.ax = 0;
	this.ay = 0;
	this.bullets = [];
	this.atirarCooldown = Math.floor(Math.random()*100)+100;
	this.state = 0;
	this.angle = 0;
	this.tipoColisao = CIRCULAR
}


Enemy4.prototype.desenhar = function(){

	if(this.ativo){
		imglib.drawRotated(ctx, "enemy4", Math.floor(this.col)*85, 0, 85, 85,
		this.originX, this.originY, 60, 60, this.angle, 1);

		this.col += 5*dt;
		if(this.col >= this.colLimit)
			this.col  -= this.colLimit;
	}

	for(var i in this.bullets){
		this.bullets[i].desenhar();
	}
	
}

Enemy4.prototype.mover = function(){

	if(this.ativo){
		this.vx = this.vx + this.ax*dt;
	 	this.x = this.x + this.vx*dt;
	 	this.vy = this.vy + this.ay*dt;
	 	this.y = this.y + this.vy*dt;
	 	this.originX = this.x - this.raio;
		this.originY = this.y - this.raio;
	}

	for(var i in this.bullets){
		this.bullets[i].mover();
	}
}

Enemy4.prototype.restricoes = function(){
	
	for(var i in this.bullets){
		this.bullets[i].restricoes();
		if(this.bullets[i].invalido == true){
			this.bullets.splice(i, 1);		
		}					
	}	

	if(this.y > limitBottom || (this.ativo == false && this.bullets.length == 0)){
		this.invalido = true;
		return;
	}

	this.atirar();

	// primeiro estado
	// vai até limit left
	if(this.state == 0){
		if(this.x < limitLeft + this.raio){
			this.vx = 70;
			this.state = 1;
		} 
	}
	// segundo estado
	///  vai até limit right
	else if (this.state == 1){
		if(this.x > limitRight - this.raio){
			
			this.vx = -70;
			this.state = 0;
		}
	}

	this.angle = this.getAngle();


}

Enemy4.prototype.damage = function(){
	if(this.y < limitTop || !this.ativo)
		return;

	this.ativo = false;
	this.explodiu = true;
	soundlib.play("explosao");
	
}


Enemy4.prototype.atirar = function(){
	if(this.ativo == false) 
		return;	
	this.atirarCooldown -= 100*dt;
	if(this.atirarCooldown <= 0){
		this.atirarCooldown = 500;
		v = 350;
		d = Math.sqrt(Math.pow(this.x-player.x,2)+Math.pow(this.y-player.y,2));
		vx = -v*((this.x-player.x)/d);
		vy = -v*((this.y-player.y)/d);
		this.bullets.push(new Bullet3(this.x, this.y, vx, vy));
	}
}

Enemy4.prototype.getAngle = function(){
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