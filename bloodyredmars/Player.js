function Player(){
	this.reset();
	this.respawn();
	
}

Player.prototype.reset = function(){

	this.h = 70;
	this.w = 56;
	this.ccOffsetX = 14;
	this.ccOffsetY = 5;
	this.ccW = 28;
	this.ccH = 60;
	this.initialX = tela.width/2;
	this.initialY = tela.height - this.w*5;
	this.col = 0;
	this.colLimit = 2;
	this.vidas = 3;
	this.bullets = [];
	this.powerup = false;
	this.v = 200;
	this.left = 0;
	this.right = 0;
	this.up = 0;
	this.down = 0;
	this.cooldownEscudo;
	this.tipoTiro = 1;
	this.bombas = 3;
	this.bombaAtiva = false;
	this.bomba;
	this.tipoColisao = RETANGULAR;
}

Player.prototype.respawn = function(){
	this.x = this.initialX;
	this.y = this.initialY;
	this.originX = this.x - this.w/2;
	this.originY = this.y - this.h/2;
	this.vx = 0;
	this.vy = 0;
	this.cooldown = 0;
	this.invulneravel = 10;
	this.escudoTempo = 0;
	this.cooldownEscudo = 0;
	this.bombas = 3;
	this.powerup = false;
	this.ativo = true;
	this.atirando = false;
}

Player.prototype.desenhar = function(){
	if(this.ativo == true ){

		for(var i in this.bullets){
			this.bullets[i].desenhar();
		}

		if(this.escudoTempo > 0){
			ctx.beginPath();
			if(this.escudoTempo > 0.1){
				ctx.fillStyle="##6050dc";
				ctx.strokeStyle="blue";
				ctx.arc(this.x, this.y, this.h/2, 0, 2*Math.PI);
				ctx.stroke();	
			}
			ctx.closePath();
			this.cooldownEscudo = 2;
		}
		
		imglib.draw(ctx, "player_ship", Math.floor(this.col)*56, (Math.floor(this.invulneravel) % 2)*70, 56, 70, 
							this.originX, this.originY, 56, 70);

		this.col += 5*dt;
		if(this.col >= this.colLimit)
			this.col  -= 2;

		//stamina escudo
		if (this.cooldownEscudo >= 0){
			if (this.escudoTempo < 0){
				ctx.fillRect(150,680, 150 - (this.cooldownEscudo % 2)*75,15);
			}
			if (this.escudoTempo >= 0){
				ctx.fillRect(150,680, (this.escudoTempo % 2)*75,15);
			}
		}
		if (this.cooldownEscudo <= 0 && this.escudoTempo <= 0){
			ctx.fillRect(150,680, 150,15);
		}
		
		
		ctx.fillStyle = "black";
	    ctx.font = "10pt sans-serif";
	    ctx.fillText("Shield", 200, 692);
	    ctx.beginPath();
		ctx.rect(this.originX + this.ccOffsetX, this.originY + this.ccOffsetY, this.ccW, this.ccH);
		ctx.closePath();

	}

	for(var i = 0; i < this.vidas; i++){
		imglib.draw(ctx, "player_ship", 0, 0, 56, 70,i*28, 37, 28, 35);
	}	

	for(var i = 0; i < this.bombas; i++){
		imglib.draw(ctx, "bomb", 0, 0, 56, 56,i*20, 80, 28, 28);
	}

	if(this.bomba){
		this.bomba.desenhar();
	}
}

Player.prototype.mover = function(){
	if(this.ativo == false)
		return

	this.x += (this.left*this.v+this.right*this.v)*dt;
	this.y += (this.up*this.v+this.down*this.v)*dt;
	this.originX = this.x - this.w/2;
	this.originY = this.y - this.h/2;

	for(var i in this.bullets){
		this.bullets[i].mover();
	}

	if(this.bomba){
		this.bomba.mover();
	}	

	this.atirar();
}

Player.prototype.restricoes = function(){
	if(this.ativo == false)
		return

	if(this.originX < limitLeft){
		this.x = limitLeft + this.w/2;
		this.vx = 0;
	}
	if(this.originX + this.w > limitRight){
		this.x = limitRight - this.w/2;
		this.vx = 0;
	}
	if(this.originY + this.h > limitBottom){
		this.y = limitBottom - this.h/2;
		this.vy = 0;
	}
	if(this.originY < limitTop){
		this.y = limitTop + this.h/2;
		this.vy = 0;
	}

	this.cooldown -= 500*dt;
	this.escudoTempo -= dt;

	if(this.invulneravel > 0)
		this.invulneravel -= 4*dt;
	else
		this.invulneravel = 0;
	this.cooldownEscudo -= dt;


	for(var i in this.bullets){
		this.bullets[i].restricoes();
		if(this.bullets[i].invalido == true){
			this.bullets.splice(i, 1);		
		}					
	}


}

Player.prototype.damage = function(){
	if(this.invulneravel > 0 || this.escudoTempo > 0)
		return false;

	var that = this;
	this.vidas -= 1;
	this.x = tela.width/2;
	this.y = 900;
	this.ativo = false;
	this.powerup = false;
	this.tipoTiro = 1;
	soundlib.play("explosao");

	for(var i = this.bullets.length; i >= 0; i--){
		this.bullets.splice(i, 1);
	}
	if (this.bomba){
		this.bombaAtiva = false;
		delete this.bomba;	
	}
	setTimeout(function() {that.respawn();}, 1000);
	return true;
	
}

Player.prototype.colisao = function(alvo){
	if(this.ativo == false || alvo.ativo == false || this.invulneravel > 0 || this.escudoTempo > 0)
		if(alvo instanceof PowerUp == false)
			return false

	return houveColisao(this, alvo);
}

Player.prototype.atirar = function(){

	this.cooldown -= 50*dt;

	if(this.ativo == false || this.atirando == false || this.cooldown > 0)
		return;

	if(this.tipoTiro == 1){
		if(this.powerup == false)
			this.bullets.push(new Bullet1(this.x, this.y));
		else{
			this.bullets.push(new Bullet1(this.x, this.y, 30, -500));
			this.bullets.push(new Bullet1(this.x, this.y, -30, -500));
		}	
		soundlib.play("tiro");
	}
	else if(this.tipoTiro == 2){
		if(this.powerup == false){
			this.bullets.push(new Bullet2(this.x - 20, this.y-30));	
			this.bullets.push(new Bullet2(this.x + 10, this.y-30));
		}
		else{
			this.bullets.push(new Bullet2(this.x - 20, this.y-30));	
			this.bullets.push(new Bullet2(this.x + 10, this.y-30));
			this.bullets.push(new Bullet2(this.x, this.y, Math.PI/2, 500, 0));	
			this.bullets.push(new Bullet2(this.x, this.y, -Math.PI/2, -500, 0));
		}
		soundlib.play("laser");
	}
	this.cooldown = 100;
	
}

Player.prototype.iniciarTiro = function(atirar){
	this.atirando = atirar;
}

Player.prototype.objeto = function(object){
	console.log(object.tipo);
	if(object.tipo == 0){
		if(this.tipoTiro == 1)
			this.powerup = true;
		else{
			this.tipoTiro = 1;
			this.powerup = false;
		}
	}
	else if(object.tipo == 1){
		if(this.tipoTiro == 2)
			this.powerup = true;
		else{
			this.tipoTiro = 2;
			this.powerup = false;
		}
	}

}

Player.prototype.ativarEscudo = function(){
	console.log("Ativar");
	console.log(this.escudoTempo);
	console.log(this.cooldownEscudo);
	if(this.escudoTempo < 0 && this.cooldownEscudo < 0){
		this.escudoTempo = 2;	
	}
}

Player.prototype.comecaMovimento = function(direcao){
	if(direcao == "left"){
		this.left = -1;
		this.setCol(5);
	}else if(direcao == "right"){
		this.right = 1;
		this.setCol(2);
	}else if(direcao == "up"){
		this.up = -1;
	}else if(direcao == "down"){
		this.down = 1;
	}
}

Player.prototype.paraMovimento = function(direcao){
	if(direcao == "left"){
		this.left = 0;
		if(this.left != 1){
			this.setCol(0);
		}else this.setCol(2);
	}else if(direcao == "right"){
		this.right = 0;
		if(this.left != 1){
			this.setCol(0);
		}else this.setCol(5);
	}else if(direcao == "up"){
		this.up = 0;
	}else if(direcao == "down"){
		this.down = 0;
	}
}

Player.prototype.setCol = function(col){
	this.col = col;
	this.colLimit = col+2;
}

Player.prototype.soltarBomba = function(){
	if(!this.bombaAtiva && this.bombas > 0){
		this.bomba = new Bomb(this.x, this.y, 0,-150);	
		this.bombaAtiva = true;
		this.bombas -= 1;
	}else{
		return;
	}
}