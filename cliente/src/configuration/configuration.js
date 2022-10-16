import dev from './configuration.dev';
import prod from './configuration.prod';

let Configuration = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default Configuration;