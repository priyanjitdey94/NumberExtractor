
describe('Converter',function(){
	it('should check convertToText',function(){
		expect(Converter.prototype.convertToText(11)).toEqual(['Eleven']);
	});
});