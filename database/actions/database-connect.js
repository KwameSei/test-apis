import knexConnection from "../mysql_connect.js";

knexConnection.raw("show schemas")
  .then(response => {
    console.log(response);
  })

  // To connect to mysql database
  // node database/actions/database-connect.js