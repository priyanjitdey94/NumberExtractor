
var converterObj=new Converter();
converterObj.setAttr(0,'');

var Extractor=function(){
	this.text="";
	this.convertedText="";
	this.textArray=[];
	this.points=[];
	this.numberFound=[];
	this.numberConverted=[];
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

Extractor.prototype.convertToArray=function(){
	var i,j,ar=[];
	for(i=0;i<this.points.length;i+=3){
		var temp="";
		for(j=this.points[i];j<this.points[i+1];j++){
			temp+=this.textArray[j]+" ";
		}
		ar.push(temp);
	}
	return ar;
}

Extractor.prototype.isPresent=function(str,mode){
	var i,j,k;
	if(str===""){
		return false;
	}
	str=str.toLowerCase();
	//console.log(str);
	for(i=0;i<converterObj.onePlace.length;i++){
		if(str===converterObj.onePlace[i] || str===converterObj.cOnePlace[i]){
			return true;
		}
	}
	for(i=0;i<converterObj.tenPlace.length;i++){
		if(str===converterObj.tenPlace[i] || str===converterObj.cTenPlace[i]){
			return true;
		}
	}
	for(i=0;i<converterObj.oneInTenPlace.length;i++){
		if(str===converterObj.oneInTenPlace[i] || str===converterObj.cOneInTenPlace[i]){
			return true;
		}
	}
	for(i=0;i<converterObj.mileStone.length;i++){
		if(str===converterObj.mileStone[i] || str===converterObj.cMileStone[i]){
			return true;
		}
	}
	return false;
}

Extractor.prototype.findNum=function(){
	this.textArray=this.text.split(" ");
	//console.log(str);
	var i,j,k,str;
	for(i=0;i<this.textArray.length;i++){
		if(this.textArray[i]==''){
			continue;
		}
		str=converterObj.checkForCardinal(this.textArray[i]);
		console.log(str+' '+this.textArray[i]);
		if(str===this.textArray[i] && this.isPresent(this.textArray[i])){
			console.log(str[i]);
			j=i+1;
			if(j==this.textArray.length){
				this.points.push(i);
				this.points.push(i);
				this.points.push(0);
			}
			while(j<this.textArray.length){
				str=converterObj.checkForCardinal(this.textArray[j]);
				if(str===this.textArray[j] && this.isPresent(str)){
					j++;
					continue;
				}else if(this.isPresent(str)){
					str=this.textArray[j-1];
					if(converterObj.presentInOnePlace(str)===-1 && str!=='ten'){
						this.points.push(i);
						this.points.push(j);
						this.points.push(1);
					}else{
						this.points.push(i);this.points.push(j-1);this.points.push(0);
						this.points.push(j);this.points.push(j);this.points.push(1);
					}
					i=j;
					break;
				}else{
					this.points.push(i);
					this.points.push(j-1);
					this.points.push(0);
					i=j-1;
					break;
				}
			}
		}else if(str!==this.textArray[i] && this.isPresent(this.textArray[i])){
			this.points.push(i);
			this.points.push(i);
			this.points.push(1);
		}
	}
	for(i=0;i<this.points.length;i+=3){
		var temp="";
		for(j=this.points[i];j<this.points[i+1];j++){
			temp+=this.textArray[j]+" ";
		}
		this.numberFound.push(temp);
	}

	return this.numberFound;
}

Extractor.prototype.toNumber=function(){
	var i,j;
	for(i=0;i<this.points.length;i+=3){
		var temp="";
		this.textArray[this.points[i+1]]=converterObj.checkForCardinal(this.textArray[this.points[i+1]]);
		for(j=this.points[i];j<=this.points[i+1];j++){
			temp+=this.textArray[j]+" ";
		}
		this.numberConverted.push(converterObj.textToNumber(temp.trim()));
	}
	console.log(this.numberConverted);
	return this.numberConverted;
}

Extractor.prototype.getOrdinalSuffix=function(num){
	var lsn=num%10;
	if(lsn===1){
		return 'st';
	}else if(lsn===2){
		return 'nd';
	}else if(lsn===3){
		return 'rd';
	}else return 'th';
}

Extractor.prototype.replaceText=function(){
	var i,j,k,l;
	j=0;
	k=0;
	l=0;
	this.convertedText="";
	console.log(this.points);
	for(i=0;i<this.textArray.length;){
		if(i===this.points[j]){
			if(this.points[j+2]===1){
				var suffix=this.getOrdinalSuffix(this.numberConverted[k]);
				this.convertedText+=(this.numberConverted[k]+suffix+" ");
			}else{
				this.convertedText+=(this.numberConverted[k]+" ");
			}
			k++;
			j+=3;
			i=this.points[j-2]+1;
		}else{
			this.convertedText+=(this.textArray[i]+" ");i++;
		}
	}
	//console.log(this.convertedText);
	document.getElementById('input2').value=this.convertedText;
}

var extractor=new Extractor();

window.startS2N = function () {
	var _str = document.getElementById('input1').value;
	extractor.initialize();
	extractor.setAttr(_str);
	extractor.findNum();
	extractor.toNumber();
	extractor.replaceText();
};
