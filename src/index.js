import app from "./app";
import https from "https"
import fs from "fs"


var https_options = {

    key: fs.readFileSync("C:\\clouddemosjnc.dyndns.org-key.pem"),
  
    cert: fs.readFileSync("C:\\clouddemosjnc.dyndns.org-crt.pem"),

  };

/* app.listen(app.get("port"), '0.0.0.0'); */

/* https.createServer(https_options).listen(app.get("port"), '0.0.0.0') */

var httpsServer = https.createServer(https_options, app);
httpsServer.listen(app.get("port"), '0.0.0.0');

console.log("Server on port", app.get("port"));
