

var Converter=function(){
	this.num=0;
	this.numText="";
	this.onePlace=["","one","two","three","four","five","six","seven","eight","nine"];
	this.tenPlace=["","","twenty","thrity","forty","fifty","sixty","seventy","eighty","ninety"];
	this.oneInTenPlace=["ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
	this.mileStone=["","thousand","million","billion","hundred"];
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
	if(x>0){
		str+=this.onePlace[x]+" Hundred ";
	}

	if(y===1){
		//console.log(typeof this.oneInTenPlace[z]);
		str+=this.oneInTenPlace[z]+" ";
	}else if(y>1){
		str+=this.tenPlace[y]+" ";
		str+=this.onePlace[z]+"";
	}else{
		str+=this.onePlace[z]+"";
	}
	return str;
}

Converter.prototype.numberToText=function(_num){
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
	if(numArray.length%3!==0){
		numArray.push(0);
	}
	if(numArray.length%3!==0){
		numArray.push(0);
	}
	var str=[];
	for(i=2,j=0;i<numArray.length;i+=3,j++){
		str.push(this.toHundredPlace(numArray[i],numArray[i-1],numArray[i-2])+" "+this.mileStone[j]);
	}
	var finalStr="";
	for(i=str.length-1;i>=0;i--){
		finalStr+=str[i]+" ";
	}
	console.log(finalStr);
	return finalStr.trim();
}

Converter.prototype.presentInOnePlace=function(str){
	var i,
		j,
		k;
	for(i=0;i<this.onePlace.length;i++){
		if(str===this.onePlace[i]){
			return i;
		}
	}
	return -1;
}


Converter.prototype.presentInTenPlace=function(str){
	var i,
		j,
		k;
	for(i=0;i<this.tenPlace.length;i++){
		if(str===this.tenPlace[i]){
			return i*10;
		}
	}
	return -1;
}

Converter.prototype.presentInOneInTenPlace=function(str){
	var i,
		j,
		k;
	for(i=0;i<this.oneInTenPlace.length;i++){
		if(str===this.oneInTenPlace[i]){
			return 10+i;
		}
	}
	return -1;
}

Converter.prototype.presentInMilestone=function(str){
	if(str==="million"){
		return 1000000;
	}else if(str==="billion"){
		return 1000000000;
	}else if(str==="thousand"){
		return 1000;
	}else return 1;

}

Converter.prototype.textToNumber=function(_str){
	if(_str!==undefined){
		this.numText=_str.toLowerCase();
	}
	var textArray=[],
		i,
		j,
		k;

	textArray=this.numText.split(' ');
	//console.log(textArray);

	var finalNum=0,
		tempNum,
		factor=1;
	for(i=textArray.length-1;i>=0;){
		if(textArray[i]==='hundred'){
			if(i===0){
				tempNum=100;
				finalNum=100*factor;
				i--;
			}else{
				tempNum=this.presentInOnePlace(textArray[i-1]);
				if(tempNum>0){
					finalNum+=tempNum*100*factor;
					i-=2;
				}else{
					finalNum+=100*factor;
					i--;
				}
			}
			continue;
		}
		tempNum=this.presentInOnePlace(textArray[i]);
		if(tempNum>0){
			//console.log(tempNum*factor);
			finalNum+=tempNum*factor;
			i--;
			continue;
		}
		tempNum=this.presentInTenPlace(textArray[i]);
		if(tempNum>0){
			//console.log(tempNum*factor);
			finalNum+=(tempNum*factor);
			i--;
			continue;
		}
		tempNum=this.presentInOneInTenPlace(textArray[i]);
		if(tempNum>0){
			//console.log(tempNum*factor);
			finalNum+=(tempNum*factor);
			i--;
			continue;
		}
		tempNum=this.presentInMilestone(textArray[i]);i--;
		factor=tempNum;
	}
	console.log(finalNum);
	return finalNum;
}


var converterObj=new Converter();
//converterObj.setAttr(2105296);
//converterObj.convertToText();
converterObj.numberToText(converterObj.textToNumber("nineteen million two hundred ten thousand ten"));

var start=function(_num){
	var obj=new Converter();
	converterObj.setAttr(_num);
	converterObj.numberToText();
}