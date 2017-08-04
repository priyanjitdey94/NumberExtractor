
describe('Converter',function(){
	it('should check convertToText',function(){
		var conv=new Converter();
		conv.setAttr(12);
		expect(conv.numberToText(12)).toEqual('twelve');
	});
});