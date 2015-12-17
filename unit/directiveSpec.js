describe('spec directive', function () {
    var compile, scope, httpBackend, directiveElem;

    beforeEach(function(){
        module('workoutApp');
        
        inject(function($compile, $rootScope, $httpBackend){
            compile = $compile;
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
        });
        
        httpBackend.whenGET('tmpl/date-editor.html').respond('template');
    });

    function getCompiledElement(){
        var element = angular.element('<div date-editor></div>');
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

    it('should loaded template', function () {
        httpBackend.expectGET('tmpl/date-editor.html');
        directiveElem = getCompiledElement();
        httpBackend.flush();
        expect(directiveElem.html()).toEqual('template');
    });
});