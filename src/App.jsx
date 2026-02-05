import React, { useState, useEffect } from 'react';
import { generateMarkdown } from './utils/generator';
import SectionContainer from './components/Form/SectionContainer';
import InputGroup from './components/Form/InputGroup';

// Icons (using lucide-react if available, fallback to text if not installed yet)
import { User, Code2, Database, Github, MessageSquare, Monitor, BookOpen } from 'lucide-react';

// Skill Data (Short list for MVP)
const TECH_STACK = {
    languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart'],
    frontend: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt', 'HTML5', 'CSS3', 'Tailwind', 'Sass'],
    backend: ['Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Rails', 'Laravel'],
    tools: ['Git', 'Docker', 'Kubernetes', 'AWS', 'Firebase', 'Figma', 'Linux', 'Jenkins']
};

function App() {
    const [activeTab, setActiveTab] = useState('profile');
    const [data, setData] = useState({
        name: '',
        subtitle: '',
        bio: '',
        language: 'en', // 'en' or 'pt-br'
        username: '', // GitHub username for stats
        skills: {
            languages: [],
            frameworks: [],
            tools: []
        },
        socials: {
            github: '',
            linkedin: '',
            twitter: '',
            website: '',
            email: '',
        },
        addons: {
            displayStats: true,
            displayStreak: true,
            displayTrophies: false,
        },
        projects: [
            { name: 'Project 1', description: 'A cool project', link: '' },
            { name: 'Project 2', description: 'Another cool project', link: '' }
        ]
    });

    const [markdown, setMarkdown] = useState('');

    // Update markdown whenever data changes
    useEffect(() => {
        const md = generateMarkdown(data);
        setMarkdown(md);
    }, [data]);

    const handleChange = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handleDeepChange = (category, field, value) => {
        setData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }));
    };

    const handleSkillToggle = (category, skill) => {
        setData(prev => {
            const current = prev.skills[category] || [];
            const updated = current.includes(skill)
                ? current.filter(s => s !== skill)
                : [...current, skill];

            return {
                ...prev,
                skills: {
                    ...prev.skills,
                    // Map flat categories to data struct if needed, here we simplified
                    // Actually let's just put all in 'languages' for generator simplicity or split them
                    // Let's use the exact key passed
                    [category]: updated
                }
            };
        });
    };

    const handleProjectChange = (index, field, value) => {
        const newProjects = [...data.projects];
        newProjects[index][field] = value;
        setData(prev => ({ ...prev, projects: newProjects }));
    };

    const addProject = () => {
        setData(prev => ({ ...prev, projects: [...prev.projects, { name: '', description: '', link: '' }] }));
    };

    const removeProject = (index) => {
        setData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(markdown);
        alert('Copied to clipboard!');
    };

    return (
        <div className="container">
            <div className="header">
                <h1>GitHub Profile Generator</h1>
                <p>Create a stunning GitHub profile in seconds.</p>
            </div>

            <div className="main-layout">
                {/* Left Column: Editor */}
                <div className="editor-area">
                    <div className="tabs">
                        <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                            <User size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} /> Profile
                        </button>
                        <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
                            <Code2 size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} /> Skills
                        </button>
                        <button className={`tab-btn ${activeTab === 'socials' ? 'active' : ''}`} onClick={() => setActiveTab('socials')}>
                            <MessageSquare size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} /> Socials
                        </button>
                        <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
                            <Monitor size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} /> Projects
                        </button>
                        <button className={`tab-btn ${activeTab === 'addons' ? 'active' : ''}`} onClick={() => setActiveTab('addons')}>
                            <BookOpen size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} /> Add-ons
                        </button>
                    </div>

                    {activeTab === 'profile' && (
                        <SectionContainer title="Personal Details">
                            <InputGroup label="Profile Language" id="language">
                                <select
                                    className="input"
                                    value={data.language}
                                    onChange={(e) => handleChange('language', e.target.value)}
                                >
                                    <option value="en">English</option>
                                    <option value="pt-br">Português (BR)</option>
                                </select>
                            </InputGroup>
                            <InputGroup label="Name" id="name">
                                <input
                                    className="input"
                                    id="name"
                                    value={data.name}
                                    placeholder="John Doe"
                                    onChange={(e) => handleChange('name', e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup label="Subtitle / Headline" id="subtitle">
                                <input
                                    className="input"
                                    id="subtitle"
                                    value={data.subtitle}
                                    placeholder="Full Stack Developer"
                                    onChange={(e) => handleChange('subtitle', e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup label="About Me (Bio)" id="bio">
                                <textarea
                                    className="input"
                                    id="bio"
                                    rows="4"
                                    value={data.bio}
                                    placeholder="I'm a passionate developer..."
                                    onChange={(e) => handleChange('bio', e.target.value)}
                                />
                            </InputGroup>
                        </SectionContainer>
                    )}

                    {activeTab === 'skills' && (
                        <SectionContainer title="Tech Stack">
                            <p className="label" style={{ marginBottom: '1rem' }}>Languages</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
                                {TECH_STACK.languages.map(skill => (
                                    <button
                                        key={skill}
                                        onClick={() => handleSkillToggle('languages', skill)}
                                        className={`btn ${data.skills.languages?.includes(skill) ? 'btn-primary' : 'tab-btn'}`}
                                        style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>

                            <p className="label" style={{ marginBottom: '1rem' }}>Frameworks & Libraries</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
                                {TECH_STACK.frontend.concat(TECH_STACK.backend).map(skill => (
                                    <button
                                        key={skill}
                                        onClick={() => handleSkillToggle('frameworks', skill)}
                                        className={`btn ${data.skills.frameworks?.includes(skill) ? 'btn-primary' : 'tab-btn'}`}
                                        style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>

                            <p className="label" style={{ marginBottom: '1rem' }}>Tools & Platforms</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {TECH_STACK.tools.map(skill => (
                                    <button
                                        key={skill}
                                        onClick={() => handleSkillToggle('tools', skill)}
                                        className={`btn ${data.skills.tools?.includes(skill) ? 'btn-primary' : 'tab-btn'}`}
                                        style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </SectionContainer>
                    )}

                    {activeTab === 'socials' && (
                        <SectionContainer title="Social & Contact">
                            <InputGroup label="GitHub Username (Required for stats)" id="gh_username">
                                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(15,23,42,0.4)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    <span style={{ padding: '0.75rem', color: '#94a3b8', borderRight: '1px solid var(--border)' }}>@</span>
                                    <input
                                        className="input"
                                        style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}
                                        id="gh_username"
                                        value={data.username}
                                        placeholder="octocat"
                                        onChange={(e) => handleChange('username', e.target.value)}
                                    />
                                </div>
                            </InputGroup>
                            <InputGroup label="LinkedIn URL" id="linkedin">
                                <input className="input" value={data.socials.linkedin || ''} onChange={(e) => handleDeepChange('socials', 'linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." />
                            </InputGroup>
                            <InputGroup label="Twitter / X" id="twitter">
                                <input className="input" value={data.socials.twitter || ''} onChange={(e) => handleDeepChange('socials', 'twitter', e.target.value)} placeholder="https://twitter.com/..." />
                            </InputGroup>
                            <InputGroup label="Website / Portfolio" id="website">
                                <input className="input" value={data.socials.website || ''} onChange={(e) => handleDeepChange('socials', 'website', e.target.value)} placeholder="https://myportfolio.com" />
                            </InputGroup>
                            <InputGroup label="Email" id="email">
                                <input className="input" value={data.socials.email || ''} onChange={(e) => handleDeepChange('socials', 'email', e.target.value)} placeholder="me@example.com" />
                            </InputGroup>
                        </SectionContainer>
                    )}

                    {activeTab === 'projects' && (
                        <SectionContainer title="Featured Projects">
                            {data.projects.map((proj, idx) => (
                                <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span className="label">Project {idx + 1}</span>
                                        <button onClick={() => removeProject(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Remove</button>
                                    </div>
                                    <input
                                        className="input"
                                        style={{ marginBottom: '0.5rem' }}
                                        placeholder="Project Name"
                                        value={proj.name}
                                        onChange={(e) => handleProjectChange(idx, 'name', e.target.value)}
                                    />
                                    <input
                                        className="input"
                                        style={{ marginBottom: '0.5rem' }}
                                        placeholder="Description"
                                        value={proj.description}
                                        onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                                    />
                                    <input
                                        className="input"
                                        placeholder="Link (GitHub or Live)"
                                        value={proj.link}
                                        onChange={(e) => handleProjectChange(idx, 'link', e.target.value)}
                                    />
                                </div>
                            ))}
                            <button className="btn" style={{ background: 'rgba(255,255,255,0.1)' }} onClick={addProject}>+ Add Project</button>
                        </SectionContainer>
                    )}

                    {activeTab === 'addons' && (
                        <SectionContainer title="Add-ons & Stats">
                            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                                <label className="skill-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={data.addons.displayStats}
                                        onChange={(e) => handleDeepChange('addons', 'displayStats', e.target.checked)}
                                    />
                                    <span>Sort GitHub Stats Card</span>
                                </label>
                                <label className="skill-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={data.addons.displayStreak}
                                        onChange={(e) => handleDeepChange('addons', 'displayStreak', e.target.checked)}
                                    />
                                    <span>Show Streak Stats</span>
                                </label>
                                {/* More addons can be added here */}
                            </div>
                            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                                Note: Stats require a valid GitHub username in the Socials tab.
                            </p>
                        </SectionContainer>
                    )}
                </div>

                {/* Right Column: Preview */}
                <div className="preview-area">
                    <div className="preview-header">
                        <h2 style={{ margin: 0 }}>Preview.md</h2>
                        <button className="btn btn-primary" onClick={copyToClipboard}>Copy Markdown</button>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* 
                We use a textarea for the raw code because rendering full GitHub markdown accurately in browser 
                without a heavy library is hard. A textarea allows the user to see exactly what they will get.
             */}
                        <textarea
                            className="code-output glass"
                            readOnly
                            value={markdown}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
