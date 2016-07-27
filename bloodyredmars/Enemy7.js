function Enemy7(x){
	this.raio = 25;
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
	this.vy = 350;
	this.ax = 0;
	this.ay = 0;
	this.bullets = [];
	this.atirarCooldown = 0;
	this.state = 0;
	this.life = 1;
}


Enemy7.prototype.desenhar = function(){

	if(this.ativo){
		imglib.draw(ctx, "enemy6", Math.floor(this.col)*65, 0, 65, 60,
		this.originX, this.originY, 65, 60);

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.raio, 0, 2*Math.PI);
		ctx.closePath();

		this.col += 5*dt;
		if(this.col >= this.colLimit)
				this.col  -= this.colLimit;
	}	
	
}

Enemy7.prototype.mover = function(){
	if(this.ativo){
		this.vx = this.vx + this.ax*dt;
	 	this.x = this.x + this.vx*dt;
	 	this.vy = this.vy + this.ay*dt;
	 	this.y = this.y + this.vy*dt;
	 	this.originX = this.x - this.raio;
		this.originY = this.y - this.raio;
	}

}

Enemy7.prototype.restricoes = function(){

	if(this.y > limitBottom || (this.ativo == false)){
		this.invalido = true;
		return;
	}
		
	// primeiro estado
	// sobe
	if(this.ativo){
		if(this.state == 0){
			if(this.y > limitBottom/2){
				var tmp = Math.floor(Math.random() * (1 - (-1) + 1)) + (-1); // -1, 0 ou 1
				this.vx = 250 * tmp;
				this.vy = 250;
				this.state = 1;
			}
		}
		// else if (this.state == 1 && this.stateDuration <= 0){
		// 	this.vy = 80;
		// 	this.state = 1;
		// }
	}

	if(this.x < limitLeft + 20){
		this.vx = 250;
	}
	if(this.x > limitRight - 20){
		this.vx = -250;
	}

}

Enemy7.prototype.damage = function(){
	if(this.y < limitTop || !this.ativo)
		return;
	this.ativo = false;
	this.explodiu = true;
	soundlib.play("explosao");
}