CIRCULAR = 0;
RETANGULAR = 1;

function houveColisao(objA, objB){
	
	if(objA.tipoColisao == CIRCULAR){
		if(objB.tipoColisao == CIRCULAR){
			return colisaoCircular(objA, objB);
		}
		else
			return colisaoCircularRetangular(objA, objB);

	}
	else if(objA.tipoColisao == RETANGULAR){
		if(objB.tipoColisao == RETANGULAR){
			return colisaoRetangular(objA, objB);
		}
		else
			return colisaoCircularRetangular(objB, objA);
	}

}

function colisaoCircular(objA, objB){
	return false;
	var distancia = Math.sqrt(Math.pow(objB.x - objA.x, 2)+Math.pow(objB.y - objA.y, 2));
	return(distancia<(objB.raio+objA.raio))
}

function colisaoRetangular(objA, objB){
	retangulo1 = Object()
	retangulo1.x = objA.originX + objA.ccOffsetX;
	retangulo1.y = objA.originY + objA.ccOffsetY;
	retangulo1.h = objA.ccH;
	retangulo1.w = objA.ccW;

	retangulo2 = Object()
	retangulo2.x = objB.originX + objB.ccOffsetX;
	retangulo2.y = objB.originY + objB.ccOffsetY;
	retangulo2.h = objB.ccH;
	retangulo2.w = objB.ccW;

	return !(	(retangulo1.y + retangulo1.h) < (retangulo2.y)
		     || (retangulo1.y) > (retangulo2.y + retangulo2.h)
		     || (retangulo1.x + retangulo1.w) < (retangulo2.x)
		     || (retangulo1.x) > (retangulo2.x + retangulo2.w)
			);

}

//source:
// http://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
function colisaoCircularRetangular(objA, objB){

	circleDistanceX = Math.abs(objA.x - objB.x);
    circleDistanceY = Math.abs(objA.y - objB.y);

    if (circleDistanceX > (objB.ccW/2 + objA.raio)) { return false; }
    if (circleDistanceY > (objB.ccH/2 + objA.raio)) { return false; }

    if (circleDistanceX <= (objB.ccW/2)) { return true; } 
    if (circleDistanceY <= (objB.ccH/2)) { return true; }

    cornerDistance_sq = (circleDistanceX - objB.ccW/2)^2 +
                         (circleDistanceY - objB.ccH/2)^2;

    return (cornerDistance_sq <= (objA.raio^2));

}