// jshint mocha: true
'use strict';

var globManip = require('..');
require('should');

describe('Manipulator', function() {
	it('should return results with the same type as the glob argument', function() {
		globManip.negate('a').should.equal('!a');
		globManip.negate(['a']).should.eql(['!a']);
	});
});

describe('Manipulations', function() {
	it('should negate globs', function() {
		globManip.negate(['aaa', '!bbb']).should.eql(['!aaa', 'bbb']);
	});

	it('should prefix globs', function() {
		globManip.prefix(['aaa', '!bbb'], 'base/').should.eql(['base/aaa', '!base/bbb']);
	});

	it('should unprefix globs', function() {
		globManip.unprefix(['base/aaa', '!base/bbb'], 'base/').should.eql(['aaa', '!bbb']);
	});

	it('should return whether a glob is positive', function() {
		globManip.isPositive('a').should.be.true;
	});

	it('should return whether a glob is negative', function() {
		globManip.isNegative('!a').should.be.true;
	});
});
