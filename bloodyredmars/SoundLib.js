SoundLib = function(){
	this.canais = {};	

	this.load = function(nome, src){
		this.canais[nome] = new Audio(src);
		this.canais[nome].load();
	}

	this.play = function(nome, loop){
		this.canais[nome].currentTime = 0;
		this.canais[nome].play();
		this.canais[nome].loop = loop;
	}

	this.volume = function(volume){
		for (var key in this.canais){
			this.canais[key].volume = volume;
		}
	}

	this.stop = function(nome){
		this.canais[nome].pause();
	}
	

}