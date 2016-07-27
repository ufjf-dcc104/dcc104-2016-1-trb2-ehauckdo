function Stage0(){
	
	this.currentText = 0;
	this.textPosition = 0;
	this.updateRate = 1;
	this.textDone = false;
	this.invalido = false;
	this.updateRate = 0.000005;
	this.posicaoImagem = 0;
	this.processaTexto();
	

}

Stage0.prototype.processaTexto = function(){
	this.text = [];
	this.text[0] = "Após conflitos com os outros membros da coalizão formada para a conquista de Marte, os representantes da China,"+
					" sob o comando do ditador Li Xiu, iniciam um massacre contra os habitantes do planeta vermelho.";
	this.text[1] = "A recém-formada colônia marciana é então declarada República Popular da China de Marte (RPCM).";
	this.text[2] = "Após descobrir os planos de Li Xiu de explorar os minérios do planeta vermelho para criar bombas nucleares, os governantes" +
					" da Terra se viram obrigados a tomar uma ação.";
	this.text[3] = "Um esquadrão de elite foi formado para invadir Marte e acabar com os planos do ditador Li Xiu. Você é o capitão deste esquadrão "+
					"e o único capaz de deter uma catastrofe nuclear interplanetária."
	this.text[0] = this.splitBySize(this.text[0]);
	this.text[1] = this.splitBySize(this.text[1]);
	this.text[2] = this.splitBySize(this.text[2]);
	this.text[3] = this.splitBySize(this.text[3]);
}

Stage0.prototype.passo = function(){

	this.atualizar();

	ctx.clearRect(0,0, tela.width, tela.height);
	
	this.desenharBackground();
	this.desenhar();

	if(this.invalido == false)
		return this;
	else return new Stage1();
}

Stage0.prototype.atualizar = function(){
	if(this.posicaoImagem < 600)
		this.posicaoImagem += 10*dt;

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

Stage0.prototype.desenhar = function(){

	imglib.draw(ctx, "intro", this.posicaoImagem, 0, 400, 400, 20, 20, 400, 400);
	
	ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;
    if(this.text[this.currentText] != null)
    	this.wrapText(this.text[this.currentText].substring(0, this.textPosition), 30, limitTop + 350)
   
}

Stage0.prototype.desenharBackground = function(){
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 450, 700);
}

Stage0.prototype.wrapText = function (text, x, y) {
  var lineHeight = ctx.measureText("M").width * 1.2;
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    ctx.fillText(lines[i], x, y);
    y += lineHeight;
  }
}

Stage0.prototype.proximo = function(){
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

Stage0.prototype.getTextWidth = function(text, font) {
    ctx.font = font;
    var metrics = ctx.measureText(text);
    return metrics.width;
}

Stage0.prototype.splitBySize = function(text){
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
