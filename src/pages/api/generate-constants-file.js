import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '❌ Method not allowed' });
  }

  try {
    const { users, skills, projects, services } = req.body;

    const now = new Date();
    const timestamp = now.toLocaleString('fr-FR');

    const formatArray = (name, array) => {
      const sectionName = name
        .replace('List', '')
        .replace(/([A-Z])/g, ' $1') // ajoute un espace avant majuscules
        .toLowerCase()
        .trim();

      const comment = `// 📦 Data for ${sectionName}`;

      const content = array
        .map((item) => {
          const formatted = Object.entries(item)
            .map(([key, value]) => {
              const safeValue =
                typeof value === 'string'
                  ? `'${value.replace(/'/g, "\\'")}'`
                  : value;
              return `  ${key}: ${safeValue}`;
            })
            .join(',\n');
          return `{\n${formatted}\n}`;
        })
        .join(',\n');

      return `${comment}\nexport const ${name} = [\n${content}\n];\n`;
    };

    const finalContent =
      `// 🚨 File generated automatically on ${timestamp}\n\n` +
      formatArray('userList', users) +
      '\n' +
      formatArray('skillsList', skills) +
      '\n' +
      formatArray('projectsList', projects) +
      '\n' +
      formatArray('servicesList', services);

    const filePath = path.resolve(
      process.cwd(),
      '../PortFolio/src/constants/constants-generated.js'
    );

    fs.writeFileSync(filePath, finalContent, 'utf8');

    return res.status(200).json({ message: '✅ File generated successfully' });
  } catch (error) {
    console.error('❌ Generation Error:', error);
    return res
      .status(500)
      .json({ error: '❌ Server error during file generation' });
  }
}
