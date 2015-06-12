githubUserSearch.controller('GitUserSearchController', ['Search', function(Search) {

  var self = this;

  self.doSearch = function(){
    if(self.searchTerm === ''){
      return
    }
    Search.query(self.searchTerm)
      .then(function(response) {
        self.searched = self.searchTerm;
        console.log(response.data.items);
        //why are we only getting login, avatar url and html url from github?
        self.searchResult = response.data;
      })
  };

}]);