

var Converter=function(_num,_numText){
	this.num=_num;
	this.numText=_numText;
}

Converter.prototype.setAttr=function(_num,_numText){
	if(_num!==undefined){
		this.num=_num;
	}
	if(_numText!==undefined){
		this.numText=_numText;
	}
}