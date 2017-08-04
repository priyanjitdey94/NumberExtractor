
describe('Converter',function(){
	beforeAll(function(){
		var tempHTML='Number to string converter: <input type="text" id="uInput1" name="userInput1"><button onclick="startN2S()">'+
					'Submit</button>'+
					'<p id="answer"></p>'+
					'<br><br>'+
					'String to number converter: <input type="text" id="uInput2" name="userInput2"><button onclick="startS2N()">'+
					'Submit</button>'+
					'<p id="answer2"></p>';
		document.body.insertAdjacentHTML('afterbegin',tempHTML);
	});

	it('should check numberToText',function(){
		var conv=new Converter();
		conv.setAttr(12);
		expect(conv.numberToText(12)).toEqual('twelve');
		conv.setAttr(2);
		expect(conv.numberToText(2)).toEqual('two');
		conv.setAttr(112);
		expect(conv.numberToText(112)).toEqual('one Hundred twelve');
		conv.setAttr(122);
		expect(conv.numberToText(122)).toEqual('one Hundred twenty two');
	});

	it('should check textToNumber',function(){
		var conv=new Converter();
		conv.setAttr(0,'hundred');
		expect(conv.textToNumber()).toEqual(100);
		expect(conv.textToNumber('hundred')).toEqual(100);
		expect(conv.textToNumber(23232)).toEqual('Illegal arguement');
		expect(conv.textToNumber('one hundred')).toEqual(100);
		expect(conv.textToNumber('two thousand hundred')).toEqual(2100);
		expect(conv.textToNumber('one billion two hundred thirty four million five hundred sixty seven thousand eight hundred ninety')).toEqual(1234567890);
		expect(conv.textToNumber('two thousand hundred twelve')).toEqual(2112);
	});
});