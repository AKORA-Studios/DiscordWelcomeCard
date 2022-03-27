const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const folders = readdirSync(join(__dirname), {
  withFileTypes: true,
})
  .filter((d) => d.isDirectory() && d.name !== 'node_modules')
  .map((d) => d.name);

const funcRegExp = /const image = await drawCard\({[^;]*;/g;

for (let dir of folders) {
  const path = join(__dirname, dir);
  require(join(path, 'index.js'));
  let file = readFileSync(join(path, 'index.js')).toString('utf-8');
  let code = funcRegExp.exec(file)[0];
  let author = file.slice(8).split('\r')[0];

  let text = `# ${dir}
  ${author}
  
  ![Card](./card.png)

  \`\`\`js
  ${code}
  \`\`\`
  `;
  writeFileSync(join(path, 'README.md'), text);
  console.log(author, code);
}
