const assert = require('assert');
const {
    rgb2hex
} = require('../src/public/javascript/custom_modules/utils.js');
const {
    Search
} = require('../src/public/javascript/classes/search.js');
before(function() {
    //Clear console before running any tests
    console.clear();
});
beforeEach(function() {
    console.log('='.repeat(100));
});
describe('utils', function() {
    describe('#rgb2hex()', function() {
        it('should  throw an error when called with no arguments', function() {
            //assert.equal(rgb2hex(),'#000000');
            assert.throws(function() {
                rgb2hex();
            }, Error, 'Please pass a valid rgb color');
        });
        it('should return #FFFFFF when the color passed is rgb(255,255,255)', function() {
            assert.equal(rgb2hex('rgb(255,255,255)').toUpperCase(), '#FFFFFF');
        });
    });
});
describe('Search', function() {
    describe('#getMatches()', function() {
        const db = [{
            name: 'fooLand',
            toString: function() {
                return this.name;
            }
        }, {
            name: 'aLand',
            toString: function() {
                return this.name;
            }
        }, {
            name: 'alslFoo',
            toString: function() {
                return this.name;
            }
        }];

        const dbSearcher = new Search(db);
        it('should return an array with exactly 1 object when term is foo', function() {
            assert.equal(dbSearcher.getMatches('foo').length, 1);
        });
        it('should return an array with 2 objects when term is foo and ignoreCase is true', function() {
            assert.equal(dbSearcher.getMatches('foo', true).length, 2);
        });
        it('should return an emty array when term is "lol"', function() {
            assert.equal(dbSearcher.getMatches('lol').length, 0);
        });
        it('should return an array containing an object with name aLand when term is aLa and ignore is false', function() {
            const expected = [{
                name: 'aLand'
            }];
            let matches = dbSearcher.getMatches('aLa');
            const resultsAreTheSame = (matches.length == expected.length) && matches.every((match, index) => match.name == expected[index].name);
            assert.equal(resultsAreTheSame, true);
        });
        it('should return an array containing 2 objects with name aLand and alslFoo when term is aL and ignore case is true',function(){
            const expected = [{
                name:'aLand'
            },{
                name:'alslFoo'
            }];
            const matches = dbSearcher.getMatches('aL',true);
            //Make sure to convert each name of the expected array to uppercase in order to compare it with the results from getMatches()
            const resultsAreTheSame = (matches.length == expected.length) && matches.every((match,index)=>match.name == expected[index].name.toUpperCase());
            
            assert.equal(resultsAreTheSame,true);
        });
    });
});