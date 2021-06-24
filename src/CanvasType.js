
class CanvasType{
	
	constructor(canvas, opt){
		this.active = false;
		this.text = '';
		this.canvas = canvas;
		
		this.typeArea = {};
		this.typeArea.width = opt.typeArea.width || canvas.width;
		this.typeArea.height = opt.typeArea.height || canvas.height;
		this.typeArea.x = opt.typeArea.x || 0;
		this.typeArea.y = opt.typeArea.y || 0;
		
		this._keydownHandler = this.keydownHandler.bind(this);
		this.attachEventHandlers();
	}
	
	setTypeArea(x, y, w, h){
		this.typeArea.width = w;
		this.typeArea.height = h;
		this.typeArea.x = x;
		this.typeArea.y = y;
	}
	
	keydownHandler(){
		
	}
	
	attachEventHandlers(){
		this.canvas.addEventListener(this._keydownHandler);
	}
	
	removeEventHandlers(){
		this.canvas.removeEventListener(this._keydownHandler);
	}
	
}