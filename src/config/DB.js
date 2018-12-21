// module.exports = {
//     // DB: 'mongodb://192.168.2.70:27017/EmployeeMaster'
//   //  DB: 'mongodb://gallop_kkl:gallop_kkl_123@ds261072.mlab.com:61072/galloptest'
//   DB: 'mongodb://gallop_kkl:gallop_kkl_123@ds145043.mlab.com:45043/employeemaster'
//  };

module.exports = {
  local:
  {
    name:"EmployeeMaster",
    url:"mongodb://localhost/EmployeeMaster"
  },

  cosmosdb:
  {
    name:"bravo",
    //url:"mongodb://bravoapp.documents.azure.com:10255/EmployeeMaster?ssl=true",
    url:"mongodb://bravo.documents.azure.com:10255/bravo?ssl=true",
    port:10255
  }

};