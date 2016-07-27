function Boss(){
	this.w = 425;
	this.h = 335
	this.raio = 100;

	this.initialX = limitRight/2;
	this.initialY = -150;
	
	this.restart();
	this.bullets = [];
	
}

Boss.prototype.restart = function(){
	this.x = this.initialX;
	this.y = this.initialY;
	this.originX = this.x - this.w/2;
	this.originY = this.y - this.h/2;
	this.ativo = true;
	this.invalido = false;
	this.counter = 0;
	this.col = 0;
	this.colLimit = 4;
	this.vx = 0;
	this.vy = 100;
	this.life = 200;
	this.atirarCooldown1 = 0;
	this.atirarCooldown2 = 0;
	this.atirarCooldown3 = 100;
	this.atirar3Atirando = 0;
	this.miraCooldown = 100;
	this.state = 0;
	this.initializeCannon();
}

Boss.prototype.initializeCannon = function(){
	this.cannonA = [];
	this.cannonB = [];
	this.cannonA.x = this.x-65;
	this.cannonA.y = this.y+12;
	this.cannonA.angle = Math.PI;
	this.cannonB.x = this.x+35;
	this.cannonB.y = this.y+12;
	this.cannonB.angle = Math.PI;
}

Boss.prototype.desenhar = function(){

	if(this.ativo == true){

		imglib.draw(ctx, "boss", 0, 0, this.w, this.h,
							this.originX, this.originY, this.w, this.h);
		imglib.drawRotated(ctx, "cannon", 0, 0, 38, 38, 
								this.cannonA.x, this.cannonA.y, 38,38, this.cannonA.angle);
		imglib.drawRotated(ctx, "cannon", 0, 0, 38, 38, 
								this.cannonB.x, this.cannonB.y, 38,38, this.cannonB.angle);

		this.col += 3*dt;
			if(this.col >= this.colLimit)
				this.col  = 0;
	}

	for(var i in this.bullets){
		this.bullets[i].desenhar();
	}

}

Boss.prototype.mover = function(){
	if(this.ativo == true){
		this.x += this.vx*dt;
		this.y += this.vy*dt;
		this.originX = this.x - this.w/2;
		this.originY = this.y - this.h/2;

		this.cannonA.x = this.x-65;
		this.cannonA.y = this.y+12;
		this.cannonB.x = this.x+35;
		this.cannonB.y = this.y+12;
	}

	for(var i in this.bullets){
		this.bullets[i].mover();
	}
}

Boss.prototype.restricoes = function(){
	if(this.ativo){

		if(this.state == 0){
			if(this.y > 150){
				this.vy = 80;
				this.vx = 80;
				this.y = 150;
				this.state += 1;
			}
		}
		else{
			if(this.x + this.w/3 > limitRight){
			this.vx = -20;
			}
			if(this.originX + this.w/3 < limitLeft){
				this.vx = 20;
			}
			if(this.y > 155){
				this.vy = -20;
			}
			if(this.y < 145){
				this.vy = 20;
			}

		}
		
		
		this.atirar1();
		this.atirar2();
		this.atirar3();

	}
	else if (this.bullets.length == 0){
		this.invalido = true;
		return;
	}

	for(var i in this.bullets){
		this.bullets[i].restricoes();
		if(this.bullets[i].invalido == true){
			this.bullets.splice(i, 1);		
		}					
	}	

}



Boss.prototype.atirar1 = function(){
	this.atirarCooldown1 -= 100*dt;
	if(this.atirarCooldown1 <= 0){

		angle = this.getAngle(this.cannonA)
		if(this.cannonA.angle < angle)
			this.cannonA.angle += 0.02;
		else
			this.cannonA.angle -= 0.02;

		angle = this.getAngle(this.cannonB)
		if(this.cannonB.angle < angle)
			this.cannonB.angle += 0.02;
		else
			this.cannonB.angle -= 0.02;

		this.miraCooldown -= 100*dt;
		if(this.miraCooldown <= 0){
		
			this.miraCooldown = 200;
			this.atirarCooldown1 = 200;

			v = 350;
			d = Math.sqrt(Math.pow(this.cannonA.x-player.x,2)+Math.pow(this.cannonA.y-player.y,2));
			vx = -v*((this.cannonA.x-player.x)/d);
			vy = -v*((this.cannonA.y-player.y)/d);
			this.bullets.push(new Bullet4(this.cannonA.x, this.cannonA.y+15, vx, vy));
			d = Math.sqrt(Math.pow(this.cannonB.x-player.x,2)+Math.pow(this.cannonB.y-player.y,2));
			vx = -v*((this.cannonB.x-player.x)/d);
			vy = -v*((this.cannonB.y-player.y)/d);
			this.bullets.push(new Bullet4(this.cannonB.x, this.cannonB.y+15, vx, vy));
		
		}
	
		
	}
}


Boss.prototype.atirar2 = function(){
	if(this.ativo == false) 
		return;	
	this.atirarCooldown2 -= 40*dt;
	if(this.atirarCooldown2 <= 0){
		this.atirarCooldown2 = 100;
		this.atirar2aux(this.x-160, this.y+15);
		this.atirar2aux(this.x+160, this.y+15);
	}

}

Boss.prototype.atirar2aux = function(x, y){

	for(var i = 1; i < 20; i++){
		vx = 200*Math.cos(i*2*Math.PI/20);
		vy = 200*Math.sin(i*2*Math.PI/20);
		this.bullets.push(new Bullet3(x, y, vx, vy));
	}



}

Boss.prototype.atirar3 = function(){
	this.atirarCooldown3 -= 100*dt;
	if(this.atirarCooldown3 <= 0){
		
		vx = 200*Math.cos(this.atirar3Atirando*2*Math.PI/30);
		vy = 200*Math.sin(this.atirar3Atirando*2*Math.PI/30);
		this.bullets.push(new Bullet4(this.x, this.y, vx, vy));

		this.atirar3Atirando +=1;
		if(this.atirar3Atirando > 39){
			this.atirar3Atirando = 0;
			this.atirarCooldown3 = 1000;
		}
		else
			this.atirarCooldown3 = 2;

	}

}




Boss.prototype.damage = function(dmg){
	if(this.ativo){
		damage = (dmg?dmg:1);
		this.life -= damage;
		if(this.life <= 0){
			this.explodiu = true;
			soundlib.play("explosao");
			this.ativo = false;
		}
	}
}

Boss.prototype.getAngle = function(cannon){
	y = cannon.x - player.x;
	x = player.y - cannon.y ;
	theta = Math.atan2(-y, x);
	if(theta > 1){
		theta = 1;
	}
	else if(theta < -1){
		theta = -1;
	}
	return -theta;
}