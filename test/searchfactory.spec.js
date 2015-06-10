describe('factory: Search', function(){

  var search;

  beforeEach(module('GitUserSearch'));

  beforeEach(inject(function(Search) {
    search = Search;
  }));

  it('responds to query', function(){
    search.query('hello')
      .then(function(response){
        expect(response.data).toEqual(items)
      })
  })
})