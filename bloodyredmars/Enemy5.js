function Enemy5(x){
	this.raio = 60;
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
	this.vx = 0;	
	this.vy = 40;
	this.ax = 0;
	this.ay = 0;
	this.bullets = [];
	this.atirarCooldown = 0;
	this.state = 0;
	this.stateDuration = 0;
	this.life = 8;
}


Enemy5.prototype.desenhar = function(){

	if(this.ativo){
		imglib.draw(ctx, "enemy5", Math.floor(this.col)*152, 0, 152, 130,
		this.originX, this.originY, 120, 120);

		/*ctx.beginPath();
		ctx.arc(this.x, this.y, this.raio, 0, 2*Math.PI);
		ctx.closePath();*/

		this.col += 5*dt;
		if(this.col >= this.colLimit)
				this.col  -= this.colLimit;
	}

	for(var i in this.bullets){
		this.bullets[i].desenhar();
	}
	
	
}

Enemy5.prototype.mover = function(){
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

Enemy5.prototype.restricoes = function(){
	
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
	// sobe
	if(this.ativo){
		if(this.state == 0 && this.stateDuration <= 0){
			this.vy = 30;
			this.stateDuration = 1;
			this.state = 1;
		}
		// segundo estado
		/// desce
		else if (this.state == 1 && this.stateDuration <= 0){
			this.vy = 80;
			this.stateDuration = 1.5;
			this.state = 1;
		}

		this.stateDuration -= dt;
	}

}

Enemy5.prototype.damage = function(dmg){
	if(this.y < limitTop || !this.ativo)
		return;

	damage = (dmg?dmg:1);
	this.life -= damage;
	if(this.life < 0){
		this.ativo = false;
		this.explodiu = true;
		soundlib.play("explosao");
	}
	
}


Enemy5.prototype.atirar = function(){
	if(this.ativo == false) 
		return;	
	this.atirarCooldown -= 100*dt;
	if(this.atirarCooldown <= 0){
		this.atirarCooldown = 300;
		this.bullets.push(new Bullet5(this.x, this.y, 0, 200)); //diagonal esquerda
		this.bullets.push(new Bullet5(this.x, this.y, 100, 200)); //vertical
		this.bullets.push(new Bullet5(this.x, this.y, -100, 200)); //diagonal direita
	}
}
