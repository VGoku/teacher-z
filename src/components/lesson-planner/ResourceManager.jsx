import React, { useState } from 'react';

const ResourceManager = ({ resources, onAddResource, onUpdateResource, onDeleteResource }) => {
    const [newResource, setNewResource] = useState({
        title: '',
        type: 'link',
        url: '',
        description: '',
        tags: []
    });
    const [tagInput, setTagInput] = useState('');
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewResource(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !newResource.tags.includes(tagInput.trim())) {
            setNewResource(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setNewResource(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newResource.title && (newResource.url || newResource.type === 'note')) {
            onAddResource({
                ...newResource,
                id: Date.now().toString(),
                createdAt: new Date().toISOString()
            });
            setNewResource({
                title: '',
                type: 'link',
                url: '',
                description: '',
                tags: []
            });
        }
    };

    const filteredResources = resources
        .filter(resource => filter === 'all' || resource.type === filter)
        .filter(resource =>
            searchQuery
                ? resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                : true
        );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Resources & Notes</h2>
                <div className="flex gap-2">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 border rounded-md"
                    >
                        <option value="all">All Types</option>
                        <option value="link">Links</option>
                        <option value="video">Videos</option>
                        <option value="document">Documents</option>
                        <option value="note">Notes</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-3 py-2 border rounded-md"
                    />
                </div>
            </div>

            {/* Add New Resource Form */}
            <form onSubmit={handleSubmit} className="space-y-4 border-b pb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={newResource.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type
                        </label>
                        <select
                            name="type"
                            value={newResource.type}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="link">Link</option>
                            <option value="video">Video</option>
                            <option value="document">Document</option>
                            <option value="note">Note</option>
                        </select>
                    </div>
                </div>

                {newResource.type !== 'note' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            URL *
                        </label>
                        <input
                            type="url"
                            name="url"
                            value={newResource.url}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required={newResource.type !== 'note'}
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={newResource.description}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tags
                    </label>
                    <div className="flex gap-2 mb-2">
                        {newResource.tags.map(tag => (
                            <span
                                key={tag}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                            className="flex-1 px-3 py-2 border rounded-md"
                            placeholder="Add tags..."
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                        >
                            Add Tag
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Add Resource
                </button>
            </form>

            {/* Resources List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResources.map(resource => (
                    <div
                        key={resource.id}
                        className="border rounded-lg p-4 space-y-2"
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="font-medium">{resource.title}</h3>
                            <span className="text-sm text-white px-2 py-1 rounded-md bg-blue-500">
                                {resource.type}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600">{resource.description}</p>

                        {resource.type !== 'note' && (
                            <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline text-sm block"
                            >
                                {resource.url}
                            </a>
                        )}

                        <div className="flex flex-wrap gap-2">
                            {resource.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex justify-between items-center pt-2 text-sm text-gray-500">
                            <span>
                                Added: {new Date(resource.createdAt).toLocaleDateString()}
                            </span>
                            <button
                                onClick={() => onDeleteResource(resource.id)}
                                className="text-red-500 hover:text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourceManager; 