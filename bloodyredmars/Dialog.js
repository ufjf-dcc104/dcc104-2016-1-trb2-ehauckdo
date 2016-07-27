function Dialog(numero_texto){
	
	this.currentText = 0;
	this.cDialog = 0;
	this.cLine = 0;
	this.textPosition = 0;
	this.updateRate = 1;
	this.textDone = false;
	this.invalido = false;
	this.updateRate = 0.000005;
	this.posicaoImagem = 0;
	this.processaTexto(numero_texto);

	this.textX = 90;
	this.textY = 50;
}

Dialog.prototype.processaTexto = function(numero_texto){
	if(numero_texto == 1){
		this.text = [];
		this.text[0] = [];
		this.text[0][0] = "Capitão, acabei de obter informações da equipe de inteligência. A RPCM acaba de lançar seu esquadrão de defesa."; 
		this.text[0][1] = "Eles farão o possível para impedir sua aproximação. Tenha cuidado!";
		this.text[1] = [];
		this.text[1][0] = "Entendido, Comandante!";

		this.text[0][0] = this.splitBySize(this.text[0][0]);
		this.text[0][1] = this.splitBySize(this.text[0][1]);
		this.text[1][0] = this.splitBySize(this.text[1][0]);
	}
	else if(numero_texto == 2){
		this.text = [];
		this.text[0] = [];
		this.text[0][0] = " "; 
		this.text[1] = [];
		this.text[1][0] = "Comandante, passei pelas defesas da RPCM. Iniciando invasão!";
		this.text[2] = [];
		this.text[2][0] = "Excelente, Capitão! Destrua a instalação central onde os minérios estão sendo extraídos.";
		this.text[2][1] = "O inimigo não poupará esforços em detê-lo, não os subestime!";
		this.text[0][0] = this.splitBySize(this.text[0][0]);
		this.text[1][0] = this.splitBySize(this.text[1][0]);
		this.text[2][0] = this.splitBySize(this.text[2][0]);
		this.text[2][1] = this.splitBySize(this.text[2][1]);
	}
	else if(numero_texto == 3){
		this.text = [];
		this.text[0] = [];
		this.text[0][0] = "Capitão! Informação urgente da equipe de inteligência! A RPCM construiu uma estrutura de voo sob sua estação central, e ela acabou de decolar!! "; 
		this.text[0][1] = "Repito! A estação central da RPCM acabou de decolar e está seguindo em sua direção! Capitão, destrua-a!!";
		this.text[1] = [];
		this.text[1][0] = "Entendido, Comandante!";

		this.text[0][0] = this.splitBySize(this.text[0][0]);
		this.text[0][1] = this.splitBySize(this.text[0][1]);
		this.text[1][0] = this.splitBySize(this.text[1][0]);
	}

}

Dialog.prototype.passo = function(){

	this.atualizar();
	this.desenhar();

}

Dialog.prototype.restricoes = function(){
	this.atualizar();
}

Dialog.prototype.atualizar = function(){


	this.updateRate -= 2000*dt;
	if(this.updateRate <= 0){
		if(this.textDone == true){
			return;
		}

		if(this.textPosition< this.text[this.cDialog][this.cLine].length){
			this.textPosition += 1;
		}
		else{
			this.textDone = true;
			this.updateRate = 5000;
			var self = this;
			setTimeout(function(){ self.proximo(); }, 3000);
			return;
		}
		this.updateRate = 100;
	}

}

Dialog.prototype.desenhar = function(){

	imglib.draw(ctx, "dialog", 30, 30);
	imglib.draw(ctx, "chars", 0, 0, 48, 74, 35, 35, 48, 74);

	imglib.draw(ctx, "dialog", 30, 550);
	imglib.draw(ctx, "chars", 48, 0, 48, 74, 380, 555, 48, 74);

	
	ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;
    if(this.text[this.cDialog] != undefined){
    	
    	this.wrapText(this.text[this.cDialog][this.cLine].substring(0, this.textPosition), this.textX, this.textY)
    }

   
}


Dialog.prototype.wrapText = function (text, x, y) {
  var lineHeight = ctx.measureText("M").width * 1.2;
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    ctx.fillText(lines[i], x, y);
    y += lineHeight;
  }
}

Dialog.prototype.proximo = function(){
	this.cLine += 1;
	if(this.text[this.cDialog][this.cLine] == null){
		this.cDialog += 1;
		if(this.text[this.cDialog] == null){
			this.invalido = true;
			this.textDone = true;
			this.cLine = 0;
		}
		else{
			this.cLine = 0;
			this.textPosition = 0;
			this.textDone = false;
			if(this.cDialog % 2 == 0){
	    		this.textX = 90;
	    		this.textY = 50;
	    	}
	    	else{
	    		this.textX = 40;
	    		this.textY = 575;
	    	}
		}
	}
	else{
		this.textPosition = 0;
		this.textDone = false;
	}

}

Dialog.prototype.getTextWidth = function(text, font) {
    ctx.font = font;
    var metrics = ctx.measureText(text);
    return metrics.width;
}

Dialog.prototype.splitBySize = function(text){
	current_string = "";
	for(var i = 0; i < text.length; i++){
		if(text.charAt(i) == '\n')
			continue;
		if(this.getTextWidth(current_string, "30px Arial") < 500)
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
