function GameOver(perdeu){
	
	this.perdeu = perdeu;
	this.invalido = false;
	this.textPosition = 0;
	this.updateRate = 1;
	this.textDone = false;
	this.updateRate = 0.000005;
	this.posicaoImagem = 0;
	this.currentText = 0;
	this.score = score;
	this.processaTexto();
	

}

GameOver.prototype.processaTexto = function(){
	this.text = [];
	if(!this.perdeu)
		this.text[0] = "Você conseguiu destruir a RCPM e a ditura de Li Xiu!    Score Total: "+this.score.score;
	else
		this.text[0] = "Você falhou na sua missão!A RCMP e a ditadura de Li Xiu seguirão desenvolvendo seu arsenal nuclear!        Score Total: "+this.score.score;
	this.text[1] = "Este jogo foi construido utilizando assets dos seguintes produtos comerciais: "
	this.text[2] = "Sonic Wings (Video System), Alpha Mission II (SNK), Dinahoo (Capcom), Subterranean Animism (ZUN), Storm Assault (?)"
	this.text[3] = "Este jogo foi construído exclusivamente com propósitos educacionais. Copyright infringement is not intended."
	this.text[0] = this.splitBySize(this.text[0]);
	this.text[1] = this.splitBySize(this.text[1]);
	this.text[2] = this.splitBySize(this.text[2]);
	this.text[3] = this.splitBySize(this.text[3]);
	
}

GameOver.prototype.passo = function(){

	this.atualizar();

	ctx.clearRect(0,0, tela.width, tela.height);
	
	this.desenhar();

	if(this.invalido == false)
		return this;
	else{
		this.score.score = 0;
	 	return new Stage0();
	}
}

GameOver.prototype.atualizar = function(){
	
	this.updateRate -= 2000*dt;
	if(this.updateRate <= 0){
		if(this.textDone == true){
			return;
		}

		if(this.textPosition < this.text[this.currentText].length){
			this.textPosition += 1;
		}
		else{
			this.textDone = true;
			this.updateRate = 5000;
			return;
		}
		this.updateRate = 100;
	}
}

GameOver.prototype.desenhar = function(){

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, limitRight, limitBottom);

		
	ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;
    if(!this.perdeu)
    	ctx.fillText("PARABENS!", limitRight/3,limitBottom/2 );
    else
    	ctx.fillText("GAME OVER", limitRight/3, limitBottom/2);

    if(this.text[this.currentText] != null)
    	this.wrapText(this.text[this.currentText].substring(0, this.textPosition), 30, limitTop + 450)
   
}


GameOver.prototype.wrapText = function (text, x, y) {
  var lineHeight = ctx.measureText("M").width * 1.2;
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    ctx.fillText(lines[i], x, y);
    y += lineHeight;
  }
}

GameOver.prototype.proximo = function(){
	this.currentText += 1;
	if(this.text[this.currentText] == null){
		this.invalido = true;
		this.textDone = true;
	}
	else{
		this.textPosition = 0;
		this.textDone = false;
	}

}

GameOver.prototype.getTextWidth = function(text, font) {
    ctx.font = font;
    var metrics = ctx.measureText(text);
    return metrics.width;
}

GameOver.prototype.splitBySize = function(text){
	current_string = "";
	for(var i = 0; i < text.length; i++){
		if(text.charAt(i) == '\n')
			continue;
		if(this.getTextWidth(current_string, "30px Arial") < 360)
			current_string += text.charAt(i);
		else{
			if(text.charAt(i) == " ")
				text = text.slice(0, i) + "\n" + text.slice(i);
			else 
				text = text.slice(0, i) + "-\n" + text.slice(i);
			current_string = "";
		}
		

	}
	return text;
}
