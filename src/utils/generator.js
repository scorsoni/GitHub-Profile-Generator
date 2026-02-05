export const generateMarkdown = (data) => {
    const {
        name,
        subtitle,
        bio,
        layout,
        skills,
        socials,
        addons,
        projects,
        username,
        language = 'en'
    } = data;

    const t = {
        en: {
            greeting: "Hi, I'm",
            defaultSubtitle: "A passionate developer from Planet Earth",
            tech: "🛠️ Technologies & Tools",
            projects: "🚀 Featured Projects",
            connect: "Connect with me"
        },
        'pt-br': {
            greeting: "Olá, eu sou",
            defaultSubtitle: "Um desenvolvedor apaixonado por tecnologia",
            tech: "🛠️ Tecnologias e Ferramentas",
            projects: "🚀 Projetos em Destaque",
            connect: "Entre em contato"
        }
    }[language] || {
        greeting: "Hi, I'm",
        defaultSubtitle: "A passionate developer from Planet Earth",
        tech: "🛠️ Technologies & Tools",
        projects: "🚀 Featured Projects",
        connect: "Connect with me"
    };

    const parts = [];

    // Header
    const headerSection = `
<h1 align="center">${t.greeting} ${name || 'User'} 👋</h1>
<h3 align="center">${subtitle || t.defaultSubtitle}</h3>
`;
    parts.push(headerSection);

    // Bio
    if (bio) {
        parts.push(`\n<p align="center"> ${bio} </p>\n`);
    }

    // Divider
    parts.push('<br/>\n');

    // Stats
    if (username && (addons.displayStats || addons.displayStreak || addons.displayTrophies)) {
        const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=gotham&hide_border=true&count_private=true`;
        const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=gotham&hide_border=true`;
        const languagesUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=gotham&hide_border=true`;

        let statsContent = '<div align="center">\n';

        if (addons.displayStats) {
            statsContent += `  <img src="${statsUrl}" height="180" alt="stats" />\n`;
        }
        if (addons.displayStreak) {
            statsContent += `  <img src="${streakUrl}" height="180" alt="streak" />\n`;
        }

        statsContent += '</div>\n';

        if (addons.displayStats) {
            statsContent += `<div align="center">\n  <img src="${languagesUrl}" height="180" alt="languages" />\n</div>\n`;
        }

        parts.push(statsContent);
        parts.push('<br/>\n');
    }

    // Tech Stack
    if (skills && (skills.languages.length > 0 || skills.frameworks.length > 0 || skills.tools.length > 0)) {
        parts.push(`### ${t.tech}\n`);
        parts.push('<div align="center">\n');

        const allSkills = [...skills.languages, ...skills.frameworks, ...skills.tools];

        // Map of display name to devicon name
        const iconMap = {
            'c++': 'cplusplus',
            'c#': 'csharp',
            'node.js': 'nodejs',
            'vue': 'vuejs',
            'next.js': 'nextjs',
            'angular': 'angularjs',
            'aws': 'amazonwebservices',
            'docker': 'docker',
            'jenkins': 'jenkins',
            'kubernetes': 'kubernetes',
            'linux': 'linux',
            'sass': 'sass',
            'tailwind': 'tailwindcss',
            'html5': 'html5',
            'css3': 'css3',
            'javascript': 'javascript',
            'typescript': 'typescript',
            'python': 'python',
            'java': 'java',
            'go': 'go',
            'rust': 'rust',
            'php': 'php',
            'ruby': 'ruby',
            'swift': 'swift',
            'kotlin': 'kotlin',
            'dart': 'dart',
            'flutter': 'flutter',
            'react': 'react',
            'firebase': 'firebase',
            'git': 'git',
            'figma': 'figma'
        };

        allSkills.forEach(skill => {
            let safeName = iconMap[skill.toLowerCase()] || skill.toLowerCase().replace(/\./g, '').replace(/\s+/g, '');
            // Special case for some icons that might need 'plain' or 'original' logic
            // For simplicity, we try 'original' for all, or 'plain' for some if known.
            // But devicon usually supports -original. 
            parts.push(`  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${safeName}/${safeName}-original.svg" height="40" alt="${skill}" width="40" style="margin: 4px;"/>`);
        });
        parts.push('\n</div>\n');
        parts.push('<br/>\n');
    }

    // Projects
    if (projects && projects.length > 0) {
        parts.push(`### ${t.projects}\n`);
        const projectRows = projects.map(p => {
            return `- [**${p.name}**](${p.link || '#'}) - ${p.description}`;
        }).join('\n');
        parts.push(projectRows + '\n');
        parts.push('<br/>\n');
    }

    // Socials
    if (socials) {
        parts.push('<div align="center">\n');
        Object.entries(socials).forEach(([platform, link]) => {
            if (link) {
                // Using shields.io for social badges
                const color = '24292e'; // default github color or similar
                parts.push(`  <a href="${link}" target="_blank"><img src="https://img.shields.io/badge/${platform}-${color}?style=for-the-badge&logo=${platform}&logoColor=white" alt="${platform}" /></a>`);
            }
        });
        parts.push('\n</div>\n');
    }

    return parts.join('\n');
};
