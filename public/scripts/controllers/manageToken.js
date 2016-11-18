(function(module) {

  const manageToken = {};
  
  let ttToken; 

  manageToken.getToken = () => {
    if (!ttToken) ttToken = JSON.parse(localStorage.getItem('timetrackertoken'));
    return ttToken;
  };
  
  manageToken.removeToken = () => {
    ttToken = '', 
    localStorage.removeItem('timetrackertoken');
  };

  module.manageToken = manageToken;

})(window);