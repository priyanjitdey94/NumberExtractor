/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

//Class that carries out all the conversion work
var Converter = function () {
  this.num = 0;
  this.numText = '';
  this.onePlace = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  this.tenPlace = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  this.oneInTenPlace = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  this.mileStone = ['', 'thousand', 'million', 'billion', 'hundred'];
  this.cOnePlace = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth'];
  this.cOneInTenPlace = ['tenth', 'eleventh', 'twelveth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth',
    'seventeenth', 'eighteenth', 'nineteenth'];
  this.cTenPlace = ['', '', 'twentieth', 'thirteeth', 'fortieth', 'fiftieth', 'sixtieth', 'seventieth',
    'eightieth', 'ninetieth'];
  this.cMileStone = ['', 'thousandth', 'millionth', 'billionth', 'hundredth'];
};

//class to set this.num and this.numText
Converter.prototype.setAttr = function (_num, _numText) {
  if (_num !== undefined) {
    this.num = _num;
  }
  if (_numText !== undefined) {
    this.numText = _numText;
  }
};

//Check if str is cardinal
Converter.prototype.checkForCardinal = function (str) {
  var i, j, k;
  for (i = 0; i < this.cOnePlace.length; i++) {
    if (str === this.cOnePlace[i]) {
      return this.onePlace[i];
    }
  }
  for (i = 0; i < this.cTenPlace.length; i++) {
    if (str === this.cTenPlace[i]) {
      return this.tenPlace[i];
    }
  }
  for (i = 0; i < this.cOneInTenPlace.length; i++) {
    if (str === this.cOneInTenPlace[i]) {
      return this.oneInTenPlace[i];
    }
  }
  for (i = 0; i < this.cMileStone.length; i++) {
    if (str === this.cMileStone[i]) {
      return this.mileStone[i];
    }
  }
  return str;
};

//check if str is ordinal
Converter.prototype.checkForOrdinal = function (str) {
  var i, j, k;
  for (i = 0; i < this.onePlace.length; i++) {
    if (str === this.onePlace[i]) {
      return this.cOnePlace[i];
    }
  }
  for (i = 0; i < this.tenPlace.length; i++) {
    if (str === this.tenPlace[i]) {
      return this.cTenPlace[i];
    }
  }
  for (i = 0; i < this.oneInTenPlace.length; i++) {
    if (str === this.oneInTenPlace[i]) {
      return this.cOneInTenPlace[i];
    }
  }
  for (i = 0; i < this.mileStone.length; i++) {
    if (str === this.mileStone[i]) {
      return this.cMileStone[i];
    }
  }
};

Converter.prototype.toHundredPlace = function (x, y, z) {
  var str = '';
  if (x > 0) {
    str += this.onePlace[x] + ' Hundred ';
  }

  if (y === 1) {
    // console.log(typeof this.oneInTenPlace[z]);
    str += this.oneInTenPlace[z] + ' ';
  } else if (y > 1) {
    str += this.tenPlace[y] + ' ';
    str += this.onePlace[z] + '';
  } else {
    str += this.onePlace[z] + '';
  }
  return str;
};

//convert number to text
Converter.prototype.numberToText = function (_num) {
  if (_num !== undefined) {
    this.num = _num;
  }
  // console.log("j");
  // if(this.num===NaN || typeof this.num=='number'){
  //    return "Incorrect arguement";
  // }
  if(this.num===0){
    return 'zero';
  }
  var temp = this.num,
    numArray = [],
    i,
    j,
    k;

  while (temp > 0) {
    numArray.push(temp % 10);
    temp /= 10;
    temp = Math.floor(temp);
  }
  if (numArray.length % 3 !== 0) {
    numArray.push(0);
  }
  if (numArray.length % 3 !== 0) {
    numArray.push(0);
  }
  var str = [];
  for (i = 2, j = 0; i < numArray.length; i += 3, j++) {
    var tempStr = this.toHundredPlace(numArray[i], numArray[i - 1], numArray[i - 2]);
    if (tempStr.trim() !== '') {
      str.push(tempStr + ' ' + this.mileStone[j]);
    }
  }
  var finalStr = '';
  for (i = str.length - 1; i >= 0; i--) {
    finalStr += str[i] + ' ';
  }
  // document.getElementById('answer').innerHTML = finalStr;
  return finalStr.trim();
};

Converter.prototype.presentInOnePlace = function (str) {
  var i,
    j,
    k;
  for (i = 0; i < this.onePlace.length; i++) {
    if (str === this.onePlace[i]) {
      return i;
    }
  }
  return -1;
};

Converter.prototype.presentInTenPlace = function (str) {
  var i,
    j,
    k;
  for (i = 0; i < this.tenPlace.length; i++) {
    if (str === this.tenPlace[i]) {
      return i * 10;
    }
  }
  return -1;
};

Converter.prototype.presentInOneInTenPlace = function (str) {
  var i,
    j,
    k;
  for (i = 0; i < this.oneInTenPlace.length; i++) {
    if (str === this.oneInTenPlace[i]) {
      return 10 + i;
    }
  }
  return -1;
};

Converter.prototype.presentInMilestone = function (str) {
  if (str === 'million') {
    return 1000000;
  } else if (str === 'billion') {
    return 1000000000;
  } else if (str === 'thousand') {
    return 1000;
  } else return 1;
};


//Convert text to number
Converter.prototype.textToNumber = function (_str) {
  if (_str !== undefined) {
    this.numText = _str;
  }
  if (this.numText === '' || typeof this.numText !== 'string') {
    return 'Illegal arguement';
  }
  var textArray = [],
    i,
    j,
    k;

  textArray = this.numText.split(' ');

  var finalNum = 0,
    tempNum,
    factor = 1;
  for (i = textArray.length - 1; i >= 0;) {
    if (textArray[i] === 'hundred') {
      if (i === 0) {
        tempNum = 100;
        finalNum += 100 * factor;
        i--;
      } else {
        tempNum = this.presentInOnePlace(textArray[i - 1]);
        if (tempNum > 0) {
          finalNum += tempNum * 100 * factor;
          // console.log(tempNum * 100 * factor);
          i -= 2;
        } else {
          finalNum += 100 * factor;
          i--;
        }
      }
      continue;
    }
    tempNum = this.presentInOnePlace(textArray[i]);
    if (tempNum > 0) {
      // console.log(tempNum*factor);
      finalNum += tempNum * factor;
      i--;
      continue;
    }
    tempNum = this.presentInTenPlace(textArray[i]);
    if (tempNum > 0) {
      // console.log(tempNum*factor);
      finalNum += (tempNum * factor);
      i--;
      continue;
    }
    tempNum = this.presentInOneInTenPlace(textArray[i]);
    if (tempNum > 0) {
      // console.log(tempNum*factor);
      finalNum += (tempNum * factor);
      i--;
      continue;
    }
    tempNum = this.presentInMilestone(textArray[i]); i--;
    factor = tempNum;
  }
  // console.log(finalNum);
  // document.getElementById('answer2').innerHTML = finalNum;
  return finalNum;
};

//convert ordinal to cardinal
Converter.prototype.ordinalToCardinal = function (_str) {
  var str = _str.slice(0, _str.length - 2), num;
  console.log(_str+"j");
  if (isNaN(parseInt(str)) || str.match(/[a-zA-z]/i)) {
    return 'Illegal arguement';
  } else {
    num = parseInt(str);
  }
  var text = this.numberToText(num);
  var convertedString = text.split(' ');
  var lastWord = convertedString.pop();
  lastWord = this.checkForOrdinal(lastWord);
  convertedString.push(lastWord);
  var temp = '';
  for (var i = 0; i < convertedString.length; i++) {
    temp += convertedString[i] + ' ';
  }
  temp = temp.trim();
  return (temp);
};

/* harmony default export */ __webpack_exports__["a"] = Converter;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__converter_js__ = __webpack_require__(0);


var converterObj = new __WEBPACK_IMPORTED_MODULE_0__converter_js__["a" /* default */]();
converterObj.setAttr(0, '');

//Class to handle all the processing of text.
var Extractor = function () {
  this.text = '';
  this.convertedText = '';
  this.textArray = [];
  this.points = [];
  this.numberFound = [];
  this.numberConverted = [];
};

//Set attribute of this.text.
Extractor.prototype.setAttr = function (_str) {
  this.text = _str;
};

//Initialize everything
Extractor.prototype.initialize = function () {
  this.text = '';
  this.convertedText = '';
  this.textArray = [];
  this.points = [];
  this.numberFound = [];
  this.numberConverted = [];
};

//Remove any newline space and tabs
Extractor.prototype.cleanText = function (_str) {
  if (_str !== undefined) {
    if (typeof _str !== 'string') {
      return 'illegal arguement';
    }
    this.text = _str;
  }
  this.text = this.text.replace(/(\n\r|\n|\r)/gm, ' ');
  this.text = this.text.replace(/\t+/g, '');
  var str = this.text.split(' ');
  this.textArray = [];
  for (var i = 0; i < str.length; i++) {
    if (str[i] === '' || str[i] === ' ') {
      continue;
    }
    this.textArray.push(str[i]);
  }
  return this.textArray;
};


//Check if str is a number
Extractor.prototype.isPresent = function (str, mode) {
  var i;
  if (str === '') {
    return false;
  }
  str = str.toLowerCase();
  // console.log(str);
  for (i = 0; i < converterObj.onePlace.length; i++) {
    if (str === converterObj.onePlace[i] || str === converterObj.cOnePlace[i]) {
      return true;
    }
  }
  for (i = 0; i < converterObj.tenPlace.length; i++) {
    if (str === converterObj.tenPlace[i] || str === converterObj.cTenPlace[i]) {
      return true;
    }
  }
  for (i = 0; i < converterObj.oneInTenPlace.length; i++) {
    if (str === converterObj.oneInTenPlace[i] || str === converterObj.cOneInTenPlace[i]) {
      return true;
    }
  }
  for (i = 0; i < converterObj.mileStone.length; i++) {
    if (str === converterObj.mileStone[i] || str === converterObj.cMileStone[i]) {
      return true;
    }
  }
  return false;
};

//check if str is number
Extractor.prototype.isNum=function(str){
  var i,j;
  for(i=0;i<str.length;i++){
    if(isNaN(parseInt(str.charAt(i)))){
      return false;
    }
  }
  return true;
}

//check if str is ordinal
Extractor.prototype.isOrdinal=function(str){
  var i,j,temp='';
  temp=str.charAt(str.length-2)+str.charAt(str.length-1);
  if(temp!=='rd' && temp !=='th' && temp!=='nd' && temp!=='st'){
    return false;
  }
  for(i=0;i<str.length-2;i++){
    if(isNaN(parseInt(str[i]))){
      // console.log(parseInt(str[i]));
      return false;
    }
  }
  return true;
}

/*
* 0 - S to N
* 1 - C to O
* 2 - N to S
* 3 - O to C
*/

Extractor.prototype.findNum = function () {
  this.textArray = this.cleanText();
  // console.log(this.textArray);
  var i, j, str;
  for (i = 0; i < this.textArray.length; i++) {
    if (this.textArray[i] === '') {
      continue;
    }
    if(this.isNum(this.textArray[i].trim())){
      this.points.push(i);
      this.points.push(i);
      this.points.push(2);
      continue;
    }
    if(this.isOrdinal(this.textArray[i].trim())){
      this.points.push(i);
      this.points.push(i);
      this.points.push(3);
      continue;
    }
    str = converterObj.checkForCardinal(this.textArray[i]);
    // console.log(j);
    if (str === this.textArray[i] && this.isPresent(this.textArray[i])) {
      j = i + 1;
      //console.log(j);
      if (j === this.textArray.length) {
        // console.log(i+"i");
        this.points.push(i);
        this.points.push(i);
        this.points.push(0);
      }
      while (j < this.textArray.length) {
        str = converterObj.checkForCardinal(this.textArray[j]);
        // console.log(str);
        if (str === this.textArray[j] && this.isPresent(str)) {
          j++;
          if (j === this.textArray.length) {
            // console.log(i+" "+j);
            this.points.push(i);
            this.points.push(j - 1);
            this.points.push(0);
            i = j;
          }
          continue;
        } else if (this.isPresent(str)) {
          // console.log('here');
          str = this.textArray[j];
          if (converterObj.presentInOnePlace(str) === -1 && str !== 'ten') {
            this.points.push(i);
            this.points.push(j);
            this.points.push(1);
          } else {
            this.points.push(i); this.points.push(j - 1); this.points.push(0);
            this.points.push(j); this.points.push(j); this.points.push(1);
          }
          i = j;
          break;
        } else {
          this.points.push(i);
          this.points.push(j - 1);
          this.points.push(0);
          i = j - 1;
          break;
        }
      }
    } else if (str !== this.textArray[i] && this.isPresent(this.textArray[i])) {
      this.points.push(i);
      this.points.push(i);
      this.points.push(1);
    }
  }
  // console.log(this.points);
  for (i = 0; i < this.points.length; i += 3) {
    var temp = '';
    for (j = this.points[i]; j <= this.points[i + 1]; j++) {
      // console.log(this.textArray[j]);
      temp += this.textArray[j] + ' ';
    }
    this.numberFound.push(temp);
  }
  // console.log(this.numberFound);
  return this.numberFound;
};

//Conversion taking place here
Extractor.prototype.toNumber = function () {
  var i, j;
  // console.log(this.points);
  for (i = 0; i < this.points.length; i += 3) {
    var temp = '';
    var option=document.getElementsByName('textnum');
    if(this.points[i+2]===2){
      if(option[1].checked){
        this.numberConverted.push(converterObj.numberToText(parseInt(this.textArray[this.points[i]])));
      }else{
        this.numberConverted.push(this.textArray[this.points[i]]);
      }
    }else if(this.points[i+2]===0){
      temp='';
      for(j=this.points[i];j<=this.points[i+1];j++){
        temp+=this.textArray[j]+' ';
      }
      if(option[0].checked){
        temp=temp.toLowerCase();
        this.numberConverted.push(converterObj.textToNumber(temp.trim()));
      }else{
        this.numberConverted.push(temp.trim());
      }
    }
    
    option=document.getElementsByName('cardinalOrdinal');
    if(this.points[i+2]===1){
      this.textArray[this.points[i+1]]=converterObj.checkForCardinal(this.textArray[this.points[i+1]]);
      for(j=this.points[i];j<=this.points[i+1];j++){
        temp+=this.textArray[j]+' ';
      }
      if(option[0].checked){
        temp=temp.toLowerCase();
        this.numberConverted.push(converterObj.textToNumber(temp.trim()));  
      }else{
        this.numberConverted.push(temp.trim());
      }
    }else if(this.points[i+2]===3){
      temp='';
      temp+=this.textArray[this.points[i]];
      temp=temp.toLowerCase();
      
      if(option[1].checked){
        //console.log('change'+temp);
        this.numberConverted.push(converterObj.ordinalToCardinal(temp.trim()));
      }else{
        this.numberConverted.push(temp.trim());
      }
    }
  }
  // console.log(this.numberConverted);
  return this.numberConverted;
};

//Find accurate suffix for ordinal and cardinal number
Extractor.prototype.getOrdinalSuffix = function (num) {
  var i,j,k;
  if(typeof num === 'number'){
    //  num=converterObj.numberToText(num);
    var lsn = num % 10;
    if (lsn === 1) {
      return num+'st';
    } else if (lsn === 2) {
      return num+'nd';
    } else if (lsn === 3) {
      return num+'rd';
    } else return num+'th';
  }
  var temp=num.split(' ');
  //console.log(temp);
  var s=temp.pop();
  //console.log(temp);
  temp.push(converterObj.checkForOrdinal(s));
  var str='';
  for(i=0;i<temp.length;i++){
    str+=(temp[i]+' ');
  }
  return str.trim();
  
};

//Replace in original text
Extractor.prototype.replaceText = function () {
  var i, j, k;
  j = 0;
  k = 0;
  this.convertedText = '';
  //console.log(this.numberConverted);
  for (i = 0; i < this.textArray.length;) {
    if (i === this.points[j]) {
      if (this.points[j + 2] === 1) {
        var suffix = this.getOrdinalSuffix(this.numberConverted[k]);
        this.convertedText += (suffix + ' ');
      } else {
        this.convertedText += (this.numberConverted[k] + ' ');
      }
      k++;
      j += 3;
      i = this.points[j - 2] + 1;
    } else {
      this.convertedText += (this.textArray[i] + ' '); i++;
    }
  }
  // console.log(this.convertedText);
  document.getElementById('input2').value = this.convertedText;
};

var extractor = new Extractor();

// Adding methods to globals classes
Object.prototype.print = function () {
  console.log(this.valueOf());
};


window.startS2N = function () {
  var _str = document.getElementById('input1').value;
  extractor.initialize();
  extractor.setAttr(_str);
  extractor.findNum();
  extractor.toNumber();
  extractor.replaceText();
};


/***/ })
/******/ ]);