describe('GitUserSearchController', function() {
  beforeEach(module('GitUserSearch'));

  var ctrl;
  var httpBackend;

  beforeEach(inject(function($controller) {
    ctrl = $controller('GitUserSearchController');
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend
    }));


  it('initialises with an empty search result and term', function() {
    expect(ctrl.searchResult).toBeUndefined();
    expect(ctrl.searchTerm).toBeUndefined();
  });

  describe('when searching for a user', function() {

    beforeEach(function(){httpBackend
      .expectGET("https://api.github.com/search/users?q=hello")
      .respond(
       { items: items }
    )});

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    var items = [
      {
        "login": "tansaku",
        "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
        "html_url": "https://github.com/tansaku"
      },
      {
        "login": "stephenlloyd",
        "avatar_url": "https://avatars.githubusercontent.com/u/196474?v=3",
        "html_url": "https://github.com/stephenlloyd"
      }
    ];

    it('displays search results', function() {
      ctrl.searchTerm = 'hello';
      ctrl.doSearch();
      httpBackend.flush();
      expect(ctrl.searchResult.items).toEqual(items);
    });

    it('displays what the user just searched for', function(){
      ctrl.searchTerm = 'hello';
      ctrl.doSearch(); //is this an actual http request or? how is doSearch() connected to httpBackend
      httpBackend.flush();
      expect(ctrl.searched).toEqual("hello");
    });

  });

  describe('when doing an empty search', function() {

    beforeEach(function(){httpBackend
      .whenGET("https://api.github.com/search/users?q=")
      .respond( 422, 'Validation failed')});


    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('does not search an empty text field', function(){
      ctrl.searchTerm='';
      ctrl.doSearch();
      expect(ctrl.searchResult).toBe(undefined);
    });
  });

});