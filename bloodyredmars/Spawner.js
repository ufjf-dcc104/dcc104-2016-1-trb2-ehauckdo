/*
	Spawner class

*/	


function Spawner(stage, stageNumber){
	this.stage = stage;
	this.terminou = false;
	this.cooldownValor = 1000;
	this.cooldownCount = 0;
	this.enemyCount = 0;
	this.currentWave = 0;
	this.lastWave = 0;
	this.updateRate = 1000;
	this.stageNumber = stageNumber;
	this.initializeEnemyMatrix();

}

Spawner.prototype.spawn = function(){
	if(this.terminou == false){

		this.cooldownCount += this.updateRate*dt;
		if(this.cooldownCount >= this.cooldownValor){
			
			for(var i = 1; i < 10; i++){

				if(this.enemies[this.currentWave][i] == 1){
					this.stage.enemies.push(new Enemy1(i*45));
				}
				else if(this.enemies[this.currentWave][i] == 2){
					this.stage.enemies.push(new Enemy2(i*45));
				}
				else if(this.enemies[this.currentWave][i] == 3){
					this.stage.enemies.push(new Enemy3(i*45));
				}else if(this.enemies[this.currentWave][i] == 4){
					this.stage.enemies.push(new Enemy4(i*45));
				}else if(this.enemies[this.currentWave][i] == 5){
					this.stage.enemies.push(new Enemy5(i*45));
				}else if(this.enemies[this.currentWave][i] == 6){
					this.stage.enemies.push(new Enemy6(i*45));
				}else if(this.enemies[this.currentWave][i] == 8){
					this.stage.enemies.push(new Boss());
					this.stage.mudarMusica("boss_ost");
				}else if(this.enemies[this.currentWave][i] == 9){
					this.stage.dialogs.push(new Dialog(1));
				}else if(this.enemies[this.currentWave][i] == 10){
					this.stage.dialogs.push(new Dialog(2));
				}else if(this.enemies[this.currentWave][i] == 11){
					this.stage.dialogs.push(new Dialog(3));
				}else if(this.enemies[this.currentWave][i] == 20){
					console.log("powerup1");
					this.stage.objects.push(new PowerUp(i*45, 0));
				}
				else if(this.enemies[this.currentWave][i] == 21){
					console.log("powerup2");
					this.stage.objects.push(new PowerUp(i*45, 1));
				}else if(this.enemies[this.currentWave][i] == 7){
					this.stage.enemies.push(new Enemy7(i*45));
				}


			}

			this.updateRate = 1000 / this.enemies[this.currentWave][0];

			this.cooldownCount = 0;
			this.currentWave += 1;

			if(this.currentWave > this.lastWave-1){
				this.terminou = true;
			}

			
		}
	}
}



Spawner.prototype.initializeEnemyMatrix = function(){

	switch(this.stageNumber){
		case 1:
			this.enemies = [];
			
			last_enemy = 0;
			new_enemy = 0;

			this.enemies.unshift(	[10, 	0, 0, 0, 0, 10, 0, 0, 0, 0] ); //130

			this.enemies.unshift(	[10, 	0, 3, 0, 2, 0, 3, 2, 0, 0] ); // 129
			this.enemies.unshift(	[0.1, 	0, 2, 0, 0, 2, 0, 0, 2, 0] );
			this.enemies.unshift(	[0.5, 	0, 0, 3, 0, 0, 3, 0, 0, 0] );
			this.enemies.unshift(	[0.5, 	3, 0, 0, 0, 0, 0, 0, 0, 3] );
			this.enemies.unshift(	[0.1, 	0, 2, 0, 0, 0, 0, 0, 2, 0] );
			this.enemies.unshift(	[1.0, 	3, 0, 0, 0, 2, 0, 0, 0, 3] );
			this.enemies.unshift(	[0.1, 	0, 0, 0, 3, 0, 3, 0, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 6, 0, 0, 0, 6, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 6, 0, 0, 0, 0, 0, 6, 0] );
			this.enemies.unshift(	[0.1, 	6, 0, 0, 0, 0, 0, 0, 0, 6] ); 

			this.enemies.unshift(	[0.3, 	0, 6, 0, 2, 0, 2, 0, 6, 0] ); // 119
			this.enemies.unshift(	[0.3, 	2, 0, 2, 0, 2, 0, 2, 0, 2] );
			this.enemies.unshift(	[0.5, 	2, 0, 0, 0, 0, 0, 0, 0, 2] );
			this.enemies.unshift(	[0.1, 	0, 3, 0, 0, 0, 0, 0, 3, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 2, 0, 0, 0, 2, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 0, 0, 2, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 2, 0, 0, 0, 2, 0, 0] );
			this.enemies.unshift(	[0.3, 	0, 0, 2, 0, 0, 0, 2, 0, 0] );
			this.enemies.unshift(	[0.1, 	2, 0, 0, 0, 0, 0, 0, 0, 2] );
			this.enemies.unshift(	[1.0, 	0, 0, 0, 0, 2, 0, 0, 0, 0] ); 

			this.enemies.unshift(	[1.0, 	0, 	2, 	0, 0, 0, 0, 0, 2, 0] ); //109
			this.enemies.unshift(	[0.2, 	0, 0, 0, 2, 0, 2, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	3, 0, 3, 0, 0, 0, 3, 0, 3] );
			this.enemies.unshift(	[0.1, 	0, 6, 0, 0, 0, 0, 0, 6, 0] );
			this.enemies.unshift(	[1.0, 	2, 0, 0, 0, 0, 0, 0, 0, 2] );
			this.enemies.unshift(	[0.1, 	0, 2, 0, 0, 0, 0, 0, 2, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 2, 0, 0, 0, 2, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 0, 2, 0, 2, 0, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 0, 0, 2, 0, 0, 0, 0] ); 

			this.enemies.unshift(	[3, 	0, 	0, 	0, 0, 21, 0, 0, 0, 0] ); //99
			this.enemies.unshift(	[0.1, 	0, 6, 0, 6, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.5, 	0, 0, 3, 0, 0, 0, 6, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 0, 0, 0, 6, 0, 6, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 3, 0, 3, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.5, 	0, 6, 0, 0, 0, 0, 0, 6, 0] );
			this.enemies.unshift(	[0.5, 	0, 0, 0, 2, 0, 2, 0, 0, 0] );
			this.enemies.unshift(	[1.0, 	0, 0, 0, 0, 0, 3, 0, 3, 0] );
			this.enemies.unshift(	[1.0, 	0, 3, 0, 3, 0, 0, 0, 0, 0] ); 

			this.enemies.unshift(	[0.3, 	0, 6, 0, 2, 0, 2, 0, 6, 0] ); // 90
			this.enemies.unshift(	[0.3, 	2, 0, 2, 0, 2, 0, 2, 0, 2] );
			this.enemies.unshift(	[0.5, 	2, 0, 0, 0, 0, 0, 0, 0, 2] );
			this.enemies.unshift(	[0.1, 	0, 2, 0, 0, 0, 0, 0, 2, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 2, 0, 0, 0, 2, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 0, 0, 2, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 2, 0, 0, 0, 2, 0, 0] );
			this.enemies.unshift(	[0.3, 	0, 0, 2, 0, 0, 0, 2, 0, 0] );
			this.enemies.unshift(	[0.1, 	2, 0, 0, 0, 0, 0, 0, 0, 2] );
			this.enemies.unshift(	[1.0, 	0, 0, 0, 0, 2, 0, 0, 0, 0] ); 
			
			this.enemies.unshift(	[0.1, 	0, 3, 0, 0, 0, 0, 0, 3, 0] ); //80
			this.enemies.unshift(	[0.1, 	0, 0, 0, 0, 2, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 0, 2, 0, 2, 0, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 2, 0, 2, 0, 2, 0, 0] );
			this.enemies.unshift(	[2.0, 	2, 0, 0, 0, 0, 0, 0, 0, 2] );
			this.enemies.unshift(	[0.1, 	0, 2, 0, 0, 0, 0, 0, 2, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 2, 0, 0, 0, 2, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 0, 2, 0, 2, 0, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 0, 0, 2, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.5, 	0, 3, 0, 3, 0, 3, 0, 3, 0] ); 

			this.enemies.unshift(	[0.5, 	0, 3, 0, 2, 0, 3, 2, 0, 0] ); //70
			this.enemies.unshift(	[0.1, 	0, 2, 0, 0, 2, 0, 0, 2, 0] );
			this.enemies.unshift(	[0.5, 	0, 0, 3, 0, 0, 3, 0, 0, 0] );
			this.enemies.unshift(	[0.5, 	3, 0, 0, 0, 0, 0, 0, 0, 3] );
			this.enemies.unshift(	[0.1, 	0, 2, 0, 0, 0, 0, 0, 2, 0] );
			this.enemies.unshift(	[1.0, 	0, 0, 0, 0, 2, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 0, 2, 0, 2, 0, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 2, 0, 0, 0, 2, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 2, 0, 0, 0, 0, 0, 2, 0] );
			this.enemies.unshift(	[0.1, 	2, 0, 0, 0, 0, 0, 0, 0, 2] ); 
			
			this.enemies.unshift(	[2.0, 	0, 0, 0, 0, 20, 3, 0, 3, 0] ); //60
			this.enemies.unshift(	[0.5, 	0, 3, 0, 3, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.5, 	0, 0, 0, 0, 2, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 0, 2, 0, 2, 0, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 2, 0, 2, 0, 2, 0, 0] );
			this.enemies.unshift(	[1.0, 	2, 0, 0, 0, 0, 0, 0, 0, 2] );
			this.enemies.unshift(	[0.1, 	0, 2, 0, 0, 0, 0, 0, 2, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 2, 0, 0, 0, 2, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 0, 2, 0, 2, 0, 0, 0] );
			this.enemies.unshift(	[0.1, 	0, 0, 0, 0, 2, 0, 0, 0, 0] ); 

			this.enemies.unshift( 	[20, 	0, 0, 0, 0, 9, 0, 0, 0, 0] ); // 50
			
			for(var i = 0; i < 50; i++){

				this.enemies.unshift([]);
				this.enemies[0][0] = Math.random() * 0.5 + 0.1;
				for(var j = 1; j < 10; j++){
					this.enemies[0][j] = 0;
				}
				new_enemy = Math.floor(Math.random()*9)+1;
				while(new_enemy == last_enemy){
					new_enemy = Math.floor(Math.random()*9)+1;
				}
				this.enemies[0][new_enemy] = 1;
				last_enemy = new_enemy;

			}

			this.enemies[49][0] = 5.0;
			break;
		case 2:
			this.enemies = [];
			
			//wave mista
			this.enemies.unshift(	[0, 	0, 0, 0, 0,  8, 0, 0, 0, 0] );
			this.enemies.unshift(	[25, 	0, 0, 0, 0, 11, 0, 0, 0, 0] );

			this.enemies.unshift(	[9.5, 	0, 5, 0, 0, 0, 0, 0, 0, 0] ); // 49
			this.enemies.unshift(	[2.0, 	0, 0, 0, 0, 5, 0, 0, 0, 0] );
			this.enemies.unshift(	[2.6, 	0, 0, 5, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[3.0, 	0, 0, 0, 0, 5, 0, 0, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 4, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 0, 4, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 0, 0, 0, 4, 0, 0, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 5, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[1.6, 	0, 0, 0, 5, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[1.2, 	0, 0, 0, 0, 0, 0, 5, 0, 0] );

			this.enemies.unshift(	[2.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );

			this.enemies.unshift(	[2.2, 	0, 0, 0, 0, 0, 0, 0, 7, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 0, 7, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 0, 7, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 0, 7, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 0, 7, 0] );

			this.enemies.unshift(	[2.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );

			this.enemies.unshift(	[2.2, 	0, 0, 0, 0, 0, 7, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 7, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 7, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 7, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 7, 0, 0, 0] );

			this.enemies.unshift(	[10, 	0, 4, 0, 0, 0, 4, 0, 0, 0] ); // 39
			this.enemies.unshift(	[1.0, 	0, 0, 0, 4, 0, 0, 4, 0, 0] );
			this.enemies.unshift(	[1.4, 	0, 0, 4, 0, 0, 0, 4, 0, 4] );
			this.enemies.unshift(	[1.5, 	0, 0, 0, 4, 0, 4, 0, 0, 0] );
			this.enemies.unshift(	[1.0, 	0, 4, 0, 4, 0, 0, 4, 0, 0] );
			this.enemies.unshift(	[1.0, 	4, 0, 4, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[3.0, 	0, 0, 0, 0, 0, 0, 5, 0, 0] );
			this.enemies.unshift(	[1.0, 	0, 0, 5, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[1.5, 	0, 0, 0, 4, 0, 4, 0, 0, 0] );
			this.enemies.unshift(	[1.0, 	0, 4, 0, 0, 21, 0, 0, 4, 0] );

			this.enemies.unshift(	[1.0, 	0, 0, 0, 0, 0, 0, 0, 0, 4] ); // 29
			this.enemies.unshift(	[1.5, 	4, 0, 0, 0, 4, 0, 0, 4, 0] ); 
			this.enemies.unshift(	[1.4, 	0, 4, 0, 4, 0, 0, 4, 0, 0] );
			this.enemies.unshift(	[1.5, 	0, 0, 4, 0, 0, 4, 0, 0, 0] );
			this.enemies.unshift(	[1.0, 	0, 0, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[1.6, 	0, 5, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[1.4, 	0, 0, 0, 0, 0, 0, 4, 0, 4] );
			this.enemies.unshift(	[1.0, 	4, 0, 4, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[1.0, 	0, 0, 0, 4, 0, 4, 0, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 0, 0, 0, 0, 0, 5, 0, 0] );

			
			this.enemies.unshift(	[2.2, 	0, 0, 0, 0, 0, 0, 7, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 7, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 7, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 7, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 7, 0, 0] );

			this.enemies.unshift(	[2.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );

			this.enemies.unshift(	[2.5, 	0, 5, 0, 0, 0, 0, 0, 0, 0] ); // 19
			this.enemies.unshift(	[2.0, 	0, 0, 0, 0, 5, 0, 0, 0, 0] );
			this.enemies.unshift(	[2.6, 	0, 0, 5, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[3.0, 	0, 0, 0, 0, 5, 0, 0, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 4, 0, 4, 4, 0, 0, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 0, 4, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 0, 0, 0, 4, 0, 4, 0, 4] );
			this.enemies.unshift(	[2.0, 	0, 4, 0, 4, 0, 4, 0, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 0, 4, 0, 0, 4, 0, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 0, 4, 0, 4, 0, 0, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 5, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[1.6, 	0, 0, 0, 5, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[1.2, 	0, 0, 0, 0, 0, 0, 5, 0, 0] );

			this.enemies.unshift(	[1.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );

			this.enemies.unshift(	[2.2, 	0, 0, 0, 0, 0, 0, 7, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 7, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 7, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 7, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 7, 0, 0] );

			this.enemies.unshift(	[2.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );

			this.enemies.unshift(	[1.7, 	0, 4, 0, 4, 0, 4, 0, 0, 0] ); //9
			this.enemies.unshift(	[1.0, 	0, 0, 0, 4, 0, 0, 4, 0, 0] );
			this.enemies.unshift(	[1.4, 	0, 0, 4, 0, 0, 0, 4, 0, 4] );
			this.enemies.unshift(	[1.5, 	0, 0, 0, 4, 0, 4, 0, 0, 0] );
			this.enemies.unshift(	[1.0, 	0, 4, 0, 4, 0, 0, 4, 0, 0] );
			this.enemies.unshift(	[1.0, 	4, 0, 4, 0, 0, 0, 0, 0, 0] );

			this.enemies.unshift(	[2.0, 	0, 0, 0, 0, 0, 5, 0, 0, 0] );
			this.enemies.unshift(	[1.8, 	0, 0, 4, 0, 4, 0, 0, 0, 0] );
			this.enemies.unshift(	[1.5, 	0, 0, 0, 0, 0, 4, 0, 4, 0] );
			//fim wave mista

			//wave inimigo 5
			this.enemies.unshift(	[2.0, 	0, 0, 0, 0, 0, 0, 5, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 0, 0, 5, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 5, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 0, 0, 0, 0, 5, 0, 0, 0] );
			this.enemies.unshift(	[2.0, 	0, 0, 0, 5, 0, 0, 0, 0, 0] );
			//fim wave inimigo 5

			//power up
			this.enemies.unshift(	[0.5, 	0, 0, 0, 0, 21, 0, 0, 0, 0] );	//0

			//wave inimigo 7
			this.enemies.unshift(	[2.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 7, 0, 0, 0, 0, 0, 0, 0] );

			this.enemies.unshift(	[2.2, 	0, 0, 0, 0, 0, 0, 0, 7, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 0, 7, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 0, 7, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 0, 7, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 0, 0, 7, 0] );

			this.enemies.unshift(	[2.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 7, 0, 0, 0, 0, 0] );

			this.enemies.unshift(	[2.2, 	0, 0, 0, 0, 0, 7, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 7, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 7, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 7, 0, 0, 0] );
			this.enemies.unshift(	[0.2, 	0, 0, 0, 0, 0, 7, 0, 0, 0] );
			//fim wave inimigo 7

			break;
	}

	this.lastWave = this.enemies.length;

	
}