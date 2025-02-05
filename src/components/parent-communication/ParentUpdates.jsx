import React, { useState } from 'react';

const ParentUpdates = ({ messages, onAddMessage, selectedLanguage }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'newsletter',
    recipients: 'all',
    scheduledDate: '',
    attachments: []
  });

  const updateTypes = [
    { id: 'newsletter', label: 'Newsletter' },
    { id: 'announcement', label: 'Announcement' },
    { id: 'reminder', label: 'Reminder' },
    { id: 'event', label: 'Event Update' }
  ];

  const recipientGroups = [
    { id: 'all', label: 'All Parents' },
    { id: 'class', label: 'Class Parents' },
    { id: 'grade', label: 'Grade Level' },
    { id: 'custom', label: 'Custom Group' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMessage({
      ...formData,
      timestamp: Date.now(),
      type: 'update'
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      type: 'newsletter',
      recipients: 'all',
      scheduledDate: '',
      attachments: []
    });
  };

  const getTranslatedLabel = (text) => {
    // In a real app, this would use a proper i18n library
    const translations = {
      es: {
        'Title': 'Título',
        'Content': 'Contenido',
        'Type': 'Tipo',
        'Recipients': 'Destinatarios',
        'Schedule': 'Programar',
        'Send Update': 'Enviar Actualización'
      },
      fr: {
        'Title': 'Titre',
        'Content': 'Contenu',
        'Type': 'Type',
        'Recipients': 'Destinataires',
        'Schedule': 'Programmer',
        'Send Update': 'Envoyer la mise à jour'
      },
      zh: {
        'Title': '标题',
        'Content': '内容',
        'Type': '类型',
        'Recipients': '接收者',
        'Schedule': '安排',
        'Send Update': '发送更新'
      }
    };

    return translations[selectedLanguage]?.[text] || text;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Update Form */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          {getTranslatedLabel('Create New Update')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedLabel('Title')} *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedLabel('Content')} *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="6"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('Type')}
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                {updateTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('Recipients')}
              </label>
              <select
                name="recipients"
                value={formData.recipients}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                {recipientGroups.map(group => (
                  <option key={group.id} value={group.id}>
                    {group.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedLabel('Schedule')}
            </label>
            <input
              type="datetime-local"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedLabel('Attachments')}
            </label>
            <input
              type="file"
              multiple
              className="w-full"
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  attachments: Array.from(e.target.files)
                }));
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {getTranslatedLabel('Send Update')}
          </button>
        </form>
      </div>

      {/* Updates List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {getTranslatedLabel('Sent Updates')}
        </h2>
        <div className="space-y-4">
          {messages
            .filter(msg => msg.type === 'update')
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(message => (
              <div
                key={message.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{message.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(message.timestamp).toLocaleDateString()} - {message.recipients}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    message.type === 'newsletter' ? 'bg-blue-100 text-blue-800' :
                    message.type === 'announcement' ? 'bg-yellow-100 text-yellow-800' :
                    message.type === 'reminder' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {message.type}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{message.content}</p>
                {message.attachments?.length > 0 && (
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-sm text-gray-600">
                      {message.attachments.length} attachment(s)
                    </p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ParentUpdates; 