(function(module) {
//TODO: Add to index.html

  const manageToken = {};
  
  let ttToken; 

  manageToken.getToken = () => {
    if (!ttToken) ttToken = JSON.parse(localStorage.getItem('timetrackertoken'));
    return ttToken;
  };(function(module) {
//TODO: Add to index.html

    const manageToken = {};
  
    let ttToken; 

    manageToken.getToken = () => {
      if (!ttToken) ttToken = JSON.parse(localStorage.getItem('timetrackertoken'));
      return ttToken;
    };
  
    module.manageToken = manageToken;

  })(window);
  
  module.manageToken = manageToken;

})(window);