var assert = chai.assert;
var should = chai.should();
console.log(this);
describe('view2', function() {

    beforeEach(function() {
        browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
        expect(element.all(by.css('[ng-view] p')).first().getText()).
            toMatch(/partial for view 2/);
    });

});
