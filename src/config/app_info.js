import { readFileSync } from 'fs';

const files_content = readFileSync('package.json');
const pkg = JSON.parse(files_content);

export default pkg;
