githubUserSearch.controller('GitUserSearchController', ['Search', function(Search) {

  var self = this;

  self.doSearch = function(){
    if(self.searchTerm === ''){
      return
    }
    Search.query(self.searchTerm)
      .then(function(response) {
        self.searched = self.searchTerm;
        self.searchResult = response.data;
      })
  };

}]);