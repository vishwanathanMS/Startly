import { useState, useEffect } from 'react';
import './QuickLinks.css';

interface Link {
    id: string;
    name: string;
    url: string;
    icon: string;
}

interface LinkGroup {
    id: string;
    name: string;
    links: Link[];
    isCollapsed?: boolean;
}

// SVG Icons
const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);

const SaveIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        <polyline points="17 21 17 13 7 13 7 21"></polyline>
        <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
);

const ChevronUpIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const PlusIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const DEFAULT_GROUPS: LinkGroup[] = [
    {
        id: '1',
        name: 'Social',
        links: [
            { id: '1', name: 'GitHub', url: 'https://github.com', icon: '💻' },
            { id: '2', name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
        ]
    },
    {
        id: '2',
        name: 'Media',
        links: [
            { id: '3', name: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
            { id: '4', name: 'Netflix', url: 'https://netflix.com', icon: '🎬' },
            { id: '5', name: 'Spotify', url: 'https://spotify.com', icon: '🎵' },
        ]
    }
];

export default function QuickLinks() {
    const [groups, setGroups] = useState<LinkGroup[]>(DEFAULT_GROUPS);
    
    // Group states
    const [isAddingGroup, setIsAddingGroup] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
    const [editingGroupName, setEditingGroupName] = useState('');

    // Link dialog states
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<{link: Link, groupId: string, isNew: boolean} | null>(null);

    useEffect(() => {
        const savedGroups = localStorage.getItem('startly-link-groups');
        if (savedGroups) {
            setGroups(JSON.parse(savedGroups));
        } else {
            // Migrate old links to a default group if possible
            const savedLinks = localStorage.getItem('startly-links');
            if (savedLinks) {
                try {
                    const parsedLinks = JSON.parse(savedLinks);
                    if (parsedLinks.length > 0) {
                        setGroups([{ id: Date.now().toString(), name: 'My Links', links: parsedLinks }]);
                    }
                } catch(e) {}
            }
        }
    }, []);

    const saveGroups = (newGroups: LinkGroup[]) => {
        setGroups(newGroups);
        localStorage.setItem('startly-link-groups', JSON.stringify(newGroups));
    };

    // Group Actions
    const handleSaveNewGroup = () => {
        if (!newGroupName.trim()) return;
        const newGroup: LinkGroup = {
            id: Date.now().toString(),
            name: newGroupName,
            links: []
        };
        saveGroups([...groups, newGroup]);
        setIsAddingGroup(false);
        setNewGroupName('');
    };

    const handleSaveGroupName = (groupId: string) => {
        if (!editingGroupName.trim()) {
            setEditingGroupId(null);
            return;
        }
        const newGroups = groups.map(g => g.id === groupId ? { ...g, name: editingGroupName } : g);
        saveGroups(newGroups);
        setEditingGroupId(null);
    };

    const toggleGroupCollapse = (groupId: string) => {
        saveGroups(groups.map(g => g.id === groupId ? { ...g, isCollapsed: !g.isCollapsed } : g));
    };



    // Link Actions
    const handleAddLinkClick = (groupId: string) => {
        setEditingLink({
            groupId,
            isNew: true,
            link: { id: Date.now().toString(), name: '', url: 'https://', icon: '🔗' }
        });
        setIsLinkDialogOpen(true);
    };

    const handleEditLinkClick = (groupId: string, link: Link) => {
        setEditingLink({
            groupId,
            isNew: false,
            link: { ...link }
        });
        setIsLinkDialogOpen(true);
    };

    const handleSaveLink = () => {
        if (!editingLink) return;
        const { groupId, link, isNew } = editingLink;
        
        const newGroups = groups.map(g => {
            if (g.id === groupId) {
                if (isNew) {
                    return { ...g, links: [...g.links, link] };
                } else {
                    return { ...g, links: g.links.map(l => l.id === link.id ? link : l) };
                }
            }
            return g;
        });
        saveGroups(newGroups);
        setIsLinkDialogOpen(false);
        setEditingLink(null);
    };

    const handleDeleteLink = () => {
        if (!editingLink || editingLink.isNew) return;
        const { groupId, link } = editingLink;
        const newGroups = groups.map(g => {
            if (g.id === groupId) {
                return { ...g, links: g.links.filter(l => l.id !== link.id) };
            }
            return g;
        });
        saveGroups(newGroups);
        setIsLinkDialogOpen(false);
        setEditingLink(null);
    };

    return (
        <div className="quick-links">
            <div className="links-header">
                <h2>Quick Links</h2>
            </div>

            <div className="groups-grid">
                {groups.map((group) => (
                    <div key={group.id} className="link-group-card glass-strong">
                        <div className="group-header">
                            {editingGroupId === group.id ? (
                                <div className="group-name-edit">
                                    <input 
                                        type="text" 
                                        value={editingGroupName} 
                                        onChange={e => setEditingGroupName(e.target.value)} 
                                        onKeyDown={e => e.key === 'Enter' && handleSaveGroupName(group.id)}
                                        autoFocus
                                        className="group-inline-input"
                                    />
                                    <div className="group-actions">
                                        <button className="icon-action-btn" onClick={() => handleSaveGroupName(group.id)}>
                                            <SaveIcon />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="group-name-view">
                                    <h3>{group.name}</h3>
                                    <div className="group-actions">
                                        <button className="icon-action-btn" onClick={() => {
                                            setEditingGroupId(group.id);
                                            setEditingGroupName(group.name);
                                        }}>
                                            <EditIcon />
                                        </button>
                                        <button className="icon-action-btn" onClick={() => toggleGroupCollapse(group.id)}>
                                            {group.isCollapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {!group.isCollapsed && (
                            <div className="group-content">
                                <div className="vertical-links-list">
                                    {group.links.map(link => (
                                        <div className="link-item glass" key={link.id}>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-anchor">
                                                <span className="link-icon">{link.icon}</span>
                                                <span className="link-name">{link.name}</span>
                                            </a>
                                            <button className="edit-link-icon-btn" onClick={() => handleEditLinkClick(group.id, link)}>
                                                <EditIcon />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button className="add-link-btn" onClick={() => handleAddLinkClick(group.id)}>
                                    <PlusIcon /> Add Link
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                <div className="link-group-card empty-card glass-strong">
                    {isAddingGroup ? (
                        <div className="group-name-edit new-group">
                            <input 
                                type="text" 
                                value={newGroupName} 
                                onChange={e => setNewGroupName(e.target.value)} 
                                onKeyDown={e => e.key === 'Enter' && handleSaveNewGroup()}
                                placeholder="Group Name"
                                autoFocus
                                className="group-inline-input"
                            />
                            <div className="group-actions">
                                <button className="icon-action-btn" onClick={handleSaveNewGroup}>
                                    <SaveIcon />
                                </button>
                                <button className="icon-action-btn" onClick={() => setIsAddingGroup(false)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button className="add-group-btn" onClick={() => setIsAddingGroup(true)}>
                            <PlusIcon />
                        </button>
                    )}
                </div>
            </div>

            {isLinkDialogOpen && editingLink && (
                <div className="edit-modal-overlay" onClick={() => setIsLinkDialogOpen(false)}>
                    <div className="edit-modal glass-strong" onClick={(e) => e.stopPropagation()}>
                        <h3>{editingLink.isNew ? 'Add Link' : 'Edit Link'}</h3>
                        <div className="edit-form">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={editingLink.link.name}
                                    onChange={(e) => setEditingLink({ ...editingLink, link: { ...editingLink.link, name: e.target.value } })}
                                    className="glass"
                                    placeholder="e.g. GitHub"
                                />
                            </div>
                            <div className="form-group">
                                <label>URL</label>
                                <input
                                    type="url"
                                    value={editingLink.link.url}
                                    onChange={(e) => setEditingLink({ ...editingLink, link: { ...editingLink.link, url: e.target.value } })}
                                    className="glass"
                                    placeholder="https://"
                                />
                            </div>
                            <div className="form-group">
                                <label>Icon (Emoji)</label>
                                <input
                                    type="text"
                                    value={editingLink.link.icon}
                                    onChange={(e) => setEditingLink({ ...editingLink, link: { ...editingLink.link, icon: e.target.value } })}
                                    maxLength={2}
                                    className="glass"
                                />
                            </div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={handleSaveLink}>
                                    Save
                                </button>
                                <button className="btn-secondary glass" onClick={() => setIsLinkDialogOpen(false)}>
                                    Cancel
                                </button>
                                {!editingLink.isNew && (
                                    <button
                                        className="btn-danger"
                                        onClick={handleDeleteLink}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
