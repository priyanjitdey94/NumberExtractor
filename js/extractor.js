
var Extractor=function(){
	this.text="";
	this.convertedText="";
	this.textArray=[];
	this.points=[];
	this.numberFound=[];
	this.numberConverted=[];
	this.onePlace = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
	this.tenPlace = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
	this.oneInTenPlace = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
	this.mileStone = ['', 'thousand', 'million', 'billion', 'hundred'];
}

Extractor.prototype.setAttr=function(_str){
	this.text=_str;
}

Extractor.prototype.initialize=function(){
	this.text="";
	this.convertedText="";
	this.textArray=[];
	this.points=[];
	this.numberFound=[];
	this.numberConverted=[];
}

Extractor.prototype.isPresent=function(str,mode){
	var i,j,k;
	if(str===""){
		return false;
	}
	str=str.toLowerCase();
	//console.log(str);
	for(i=0;i<this.onePlace.length;i++){
		if(str===this.onePlace[i]){
			return true;
		}
	}
	for(i=0;i<this.tenPlace.length;i++){
		if(str===this.tenPlace[i]){
			return true;
		}
	}
	for(i=0;i<this.oneInTenPlace.length;i++){
		if(str===this.oneInTenPlace[i]){
			return true;
		}
	}
	for(i=0;i<this.mileStone.length;i++){
		if(str===this.mileStone[i]){
			return true;
		}
	}
	return false;
}

Extractor.prototype.findNum=function(){
	this.textArray=this.text.split(" ");
	//console.log(str);
	var i,j,k;
	for(i=0;i<this.textArray.length;i++){
		if(this.isPresent(this.textArray[i])){
			//console.log(str[i]);
			j=i+1;
			while(j<this.textArray.length && this.isPresent(this.textArray[j],1)){
				//console.log(str[j]);
				j++;
			}
			this.points.push(i);
			this.points.push(j-1);
			i=j-1;
		}
	}
	for(i=0;i<this.points.length;i+=2){
		var temp="";
		for(j=this.points[i];j<=this.points[i+1];j++){
			temp+=this.textArray[j]+" ";
		}
		console.log(temp);
		this.numberFound.push(temp);
	}
}

Extractor.prototype.toNumber=function(){
	var i,j;
	for(i=0;i<this.numberFound.length;i++){
		this.numberConverted.push(converterObj.textToNumber(this.numberFound[i].toLowerCase()));
	}
	console.log(this.numberConverted);
	return this.numberConverted;
}

Extractor.prototype.replaceText=function(){
	var i,j,k;
	j=0;
	k=0;
	this.convertedText="";
	for(i=0;i<this.textArray.length;){
		if(i===this.points[j]){
			this.convertedText+=(this.numberConverted[k]+" ");
			k++;
			j+=2;
			i=this.points[j-1]+1;
		}else{
			this.convertedText+=(this.textArray[i]+" ");i++;
		}
	}
	console.log(this.convertedText);
	document.getElementById('input2').value=this.convertedText;
}

var extractor=new Extractor();



var startS2N = function () {
	var _str = document.getElementById('input1').value;
	extractor.initialize();
	extractor.setAttr(_str);
	extractor.findNum();
	extractor.toNumber();
	extractor.replaceText();
};
