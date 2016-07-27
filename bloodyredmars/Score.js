/*
	Score class
*/	

function Score(x, y){
	this.x = x;
	this.y = y;
	this.score = 0;
}

Score.prototype.desenhar = function(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;
    ctx.fillText(this.score, 5, 30);
}

Score.prototype.soma = function(ponto){
	this.score += ponto;
}
