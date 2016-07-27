function Stage1(){
	this.background;
	this.spawner;
	this.bullets;
	this.enemies;
	this.objects;
	this.explosoes;
	this.score;
	this.dialogs;
	this.player = player;
	this.invalido = false;
	this.restart();
	this.gameover = false;
	this.bossAlive = true;
	soundlib.play("stage1_ost");
	this.delayNextStage = 1000;
}

Stage1.prototype.restart = function(){
	delete this.background;
	delete this.spawner;
	delete this.bullets;
	delete this.enemies;
	delete this.dialogs;
	this.background = new Background("space_background", 
									"space_background_parallax");
	player.reset();
	this.spawner = new Spawner(this, 1);
	this.score = score;
	this.bullets = [];
	this.enemies = [];
	this.objects = [];
	this.dialogs = [];
	this.explosions = [];
}

Stage1.prototype.checkRestart = function(){
	if(this.player.vidas < 0){
		soundlib.stop("stage1_ost");
		return true;
	}
	return false;
}

Stage1.prototype.passo = function(){

	this.moverObjetos(this.background);
	this.moverObjetos(this.explosions);
	this.moverObjetos(this.player);
	this.moverObjetos(this.enemies);
	this.moverObjetos(this.objects);

	this.restricoesObjetos(this.background);
	this.restricoesObjetos(this.explosions);
	this.restricoesObjetos(this.player);
	this.restricoesObjetos(this.enemies);
	this.restricoesObjetos(this.objects);
	this.restricoesObjetos(this.dialogs);

	ctx.clearRect(0,0, tela.width, tela.height);

	this.desenharObjetos(this.background);
	this.desenharObjetos(this.explosions);
	this.desenharObjetos(this.objects);
	this.desenharObjetos(this.player);
	this.desenharObjetos(this.enemies);
	this.desenharObjetos(this.score);
	this.desenharObjetos(this.dialogs);

	this.colisaoBomba();
	this.colisaoBalasPlayerComInimigo();
	if(this.colisaoComInimigos()){
		return new GameOver(true);
	}
	
	if(this.colisaoBalasInimigoComPlayer()){
		return new GameOver(true);
	}
	this.colisaoPowerUps();
	this.spawner.spawn();

	if(this.enemies.length == 0){
		if(this.spawner.terminou && this.dialogs.length == 0){		
			this.delayNextStage -= 300*dt;
			if(this.delayNextStage < 0){
				soundlib.stop("stage1_ost");
				return new Stage2(this.player);
			}
			else return this;
		}
		else{
			return this;
		}
	}
	else{
		return this;
	}
		
}


Stage1.prototype.colisaoBomba = function(){
	if(this.player.bomba){
		if(this.player.bomba.explodir()){
			this.explosions.push(new Explosion(this.player.bomba));
			soundlib.play("explosao");
			for(var j = this.enemies.length -1; j >= 0; j--){
				this.enemies[j].damage(10);
				this.score.soma(1);
			}
			this.explosions.push(new Explosion(this.player.bomba));
			this.player.bombaAtiva = false;
			delete this.player.bomba;
		}
	}
}

Stage1.prototype.colisaoComInimigos = function(){
	for(var i in this.enemies){
		if(this.player.colisao(this.enemies[i])){
			if(this.player.damage(1)){
				this.explosions.push(new Explosion(this.player));
			}
			if(this.checkRestart())
				return true;
		}
	}
	return false;
}

Stage1.prototype.colisaoBalasPlayerComInimigo = function(){
	for(var i = this.player.bullets.length-1; i >= 0; i--){
		for(var j = this.enemies.length -1; j >= 0; j--){
			if(this.player.bullets[i].colisao(this.enemies[j])){
				this.enemies[j].damage(1);
				this.player.bullets.splice(i, 1);
				this.score.soma(1);
				break;
			}
		}
	}
}

Stage1.prototype.colisaoBalasInimigoComPlayer = function(){
	for(var i in this.enemies){
		for(var j = this.enemies[i].bullets.length -1; j >= 0; j--){
			if(this.player.colisao(this.enemies[i].bullets[j])){
				if(this.player.damage(1)){
					this.explosions.push(new Explosion(this.player));
				}
				this.enemies[i].bullets.splice(j, 1);
				if(this.checkRestart())
					return true;
			}
		}
	}
	return false;
}

Stage1.prototype.colisaoPowerUps = function(){
	for(var i in this.objects){
		if(this.player.colisao(this.objects[i])){
			this.player.objeto(this.objects[i]);
			this.objects.splice(i, 1);
			this.score.soma(10);
		}
	}
}


Stage1.prototype.moverObjetos = function(obj){
	if (obj.constructor == Array){
		for(var i in obj){
			obj[i].mover();
		}
	}
	else obj.mover();
}

Stage1.prototype.restricoesObjetos = function(obj){
	if (obj.constructor == Array){
		for(var i in obj){
			obj[i].restricoes();

			if(obj[i].explodiu == true){
					this.explosions.push(new Explosion(obj[i]));
				obj[i].explodiu = false;
			}

			if(obj[i].invalido == true){				
				obj.splice(i, 1);
			}
			
		}
	}
	else obj.restricoes();
}

Stage1.prototype.desenharObjetos = function(obj){
	if (obj.constructor == Array){
		for(var i in obj){
			obj[i].desenhar();
		}
	}
	else obj.desenhar();
}



