import { readFileSync } from 'fs';

const files_content = await readFileSync('package.json');
const pkg = JSON.parse(files_content);

export default pkg;
