

var Converter=function(){
	this.num=0;
	this.numText="";
	this.onePlace=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
	this.tenPlace=["","","Twenty","Thrity","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
	this.oneInTenPlace=["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
	this.mileStone=["","Thousand","Million","Billion"];
}

Converter.prototype.setAttr=function(_num,_numText){
	if(_num!==undefined){
		this.num=_num;
	}
	if(_numText!==undefined){
		this.numText=_numText;
	}
}

Converter.prototype.toHundredPlace=function(x,y,z){
	var str="";
	console.log(x+' '+y+' '+z);
	//console.log(this);
	if(x>0){
		str+=this.onePlace[x]+" Hundred ";
	}

	if(y===1){
		console.log(this);
		str+=this.oneInTenPlace[z]+" ";
	}else if(y>1){
		str+=this.tenPlace[y]+" ";
		str+=this.onePlace[z]+"";
	}else{
		str+=this.onePlace[z]+"";
	}
	return str;
}

Converter.prototype.convertToText=function(_num){
	if(_num!==undefined){
		this.num=_num;
	}
	var temp=this.num,
		numArray=[],
		i,
		j,
		k;

	while(temp>0){
		numArray.push(temp%10);
		temp/=10;
		temp=Math.floor(temp);
	}
	//console.log(numArray);
	if(numArray.length%3!==0){
		numArray.push(0);
	}
	if(numArray.length%3!==0){
		numArray.push(0);
	}
	//numArray.reverse();
	console.log(numArray);
	var str=[];
	for(i=2,j=0;i<numArray.length;i+=3,j++){
		str.push(this.toHundredPlace(numArray[i],numArray[i-1],numArray[i-2])+" "+this.mileStone[j]);
	}
	console.log(str);
}

var converterObj=new Converter();
converterObj.setAttr(2105296);
converterObj.convertToText();