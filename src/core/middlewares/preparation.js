import favicon from "serve-favicon";
import bodyParser from "body-parser";

const favicon_MW = favicon(
    process.cwd() + "/" + "src" + "/" + "public" + "/" + "favicon.ico"
  )

export const preparation_MWs = [
  favicon_MW, 
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json()
];
