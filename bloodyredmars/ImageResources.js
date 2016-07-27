function ImageResources(){
  this.resourcesCount = 0;
  this.resourcesLoaded = 0;
  this.images = {};
  this.loaded = (function(that){
    return function(){
              console.log("Imagem carregada!");
              that.resourcesLoaded++;
           };
  })(this);
  this.addImage = function(key, url){
    this.resourcesCount++;
    var img =  new Image();
    img.onload = this.loaded;
    img.src = url;
    this.images[key] = img;
  };
  this.isReady = function(){
    return (this.resourcesCount === this.resourcesLoaded);
  }

  this.draw = function(ctx, key, sx, sy, swidth, sheight, x, y, width, height){
    if(arguments.length == 4)
      ctx.drawImage(this.images[key], sx, sy);
    
    else if (arguments.length == 10) 
      ctx.drawImage(this.images[key], sx, sy, swidth, sheight, x, y, width, height);
   
  }

  this.drawRotated = function(ctx, key, sx, sy, swidth, sheight, x, y, width, height, angle){
    ctx.save();
    ctx.translate(x+width/2, y+height/2);
    ctx.rotate(angle);
    ctx.translate(-width/2,-height/2);
    ctx.drawImage(this.images[key], sx, sy, swidth, sheight, 0, 0, width, height);
    ctx.restore();

  }

}
