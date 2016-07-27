function Stage2(){
	this.background;
	this.spawner = [];
	this.bullets = [];
	this.enemies = [];
	this.objects = [];
	this.explosions = [];
	this.dialogs = [];
	this.score = score;
	this.player = player;
	this.invalido = false;
	this.gameover = false;
	this.bossAlive = true;
	this.currentSong = "stage2_ost";
	soundlib.play(this.currentSong, true);
	this.delayNextStage = 1000;
	this.background = new Background("mars_background");
	this.spawner = new Spawner(this, 2);
}

Stage2.prototype.restart = function(){
	delete this.background;
	delete this.spawner;
	delete this.bullets;
	delete this.enemies;
	delete this.objects;
	delete this.dialogs;
	this.background = new Background("mars_background");
	player.reset();
	this.score.score = 0;
	this.spawner = new Spawner(this, 2);
	this.bullets = [];
	this.enemies = [];
	this.objects = [];
	this.explosions = [];
	this.dialogs = [];
}

Stage2.prototype.startStage = function(){
	self = this;
	setInterval(function(){self.passo()}, 1000/fps);
}

Stage2.prototype.checkRestart = function(){
	if(this.player.vidas < 0){
		soundlib.stop(this.currentSong);
		return true;
	}
	return false;
}

Stage2.prototype.passo = function(){

	//this.player.invulneravel = 1;

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
	
	this.desenharObjetos(this.enemies);
	this.desenharObjetos(this.player);
	this.desenharObjetos(this.score);
	this.desenharObjetos(this.dialogs);
	

	this.colisaoBomba();
	this.colisaoBalasPlayerComInimigo();
	if(this.colisaoComInimigos()){
		soundlib.stop(this.currentSong);
		return new GameOver(true);
	}
	
	if(this.colisaoBalasInimigoComPlayer()){
		soundlib.stop(this.currentSong);
		return new GameOver(true);
	}
	this.colisaoPowerUps();
	this.spawner.spawn();

	if(this.enemies.length == 0){
		if(this.spawner.terminou && this.dialogs.length == 0){		
			this.delayNextStage -= 300*dt;
			if(this.delayNextStage < 0){
				soundlib.stop(this.currentSong);
				return new GameOver(false);
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


Stage2.prototype.colisaoBomba = function(){
	if(this.player.bomba){
		if(this.player.bomba.explodir()){
			this.explosions.push(new Explosion(this.player.bomba));
			soundlib.play("explosao");
			for(var j = this.enemies.length -1; j >= 0; j--){
				this.enemies[j].damage(10);
				this.score.soma(1);
			}
			this.player.bombaAtiva = false;
			delete this.player.bomba;
		}
	}
}

Stage2.prototype.colisaoComInimigos = function(){
	for(var i in this.enemies){
		if(this.player.colisao(this.enemies[i])){
			if(this.player.damage()){
				this.explosions.push(new Explosion(this.player));
			}
			if(this.checkRestart())
				return true;
		}
	}
	return false;
}

Stage2.prototype.colisaoBalasPlayerComInimigo = function(){
	for(var i = this.player.bullets.length-1; i >= 0; i--){
		for(var j = this.enemies.length -1; j >= 0; j--){
			if(this.player.bullets[i].colisao(this.enemies[j])){
				this.enemies[j].damage();
				this.player.bullets.splice(i, 1);
				this.score.soma(1);
				break;
			}
		}
	}
}

Stage2.prototype.colisaoBalasInimigoComPlayer = function(){
	for(var i in this.enemies){
		for(var j = this.enemies[i].bullets.length -1; j >= 0; j--){
			if(this.player.colisao(this.enemies[i].bullets[j])){
				if(this.player.damage()){
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

Stage2.prototype.colisaoPowerUps = function(){
	for(var i in this.objects){
		if(this.player.colisao(this.objects[i])){
			this.player.objeto(this.objects[i]);
			this.objects.splice(i, 1);
			this.score.soma(10);
		}
	}
}


Stage2.prototype.moverObjetos = function(obj){
	if (obj.constructor == Array){
		for(var i in obj){
			obj[i].mover();
		}
	}
	else obj.mover();
}

Stage2.prototype.restricoesObjetos = function(obj){
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

Stage2.prototype.desenharObjetos = function(obj){
	if (obj.constructor == Array){
		for(var i in obj){
			obj[i].desenhar();
		}
	}
	else obj.desenhar();
}

Stage2.prototype.mudarMusica = function(musica){
	soundlib.stop(this.currentSong);
	soundlib.play(musica, true);
	this.currentSong = musica;
}


