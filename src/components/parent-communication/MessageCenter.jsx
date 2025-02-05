import React, { useState } from 'react';

const MessageCenter = ({ messages, onAddMessage, selectedLanguage }) => {
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    content: '',
    priority: 'normal',
    attachments: []
  });
  const [selectedParent, setSelectedParent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demo purposes
  const parents = [
    { id: 1, name: 'John Smith', student: 'Sarah Smith', unread: 2 },
    { id: 2, name: 'Maria Garcia', student: 'Carlos Garcia', unread: 0 },
    { id: 3, name: 'Wei Chen', student: 'Lucy Chen', unread: 1 }
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
    if (!selectedParent) return;

    onAddMessage({
      ...formData,
      id: Date.now(),
      timestamp: Date.now(),
      sender: 'teacher',
      recipient: selectedParent.name,
      type: 'direct-message'
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      recipient: '',
      subject: '',
      content: '',
      priority: 'normal',
      attachments: []
    });
  };

  const getTranslatedLabel = (text) => {
    // In a real app, this would use a proper i18n library
    const translations = {
      es: {
        'Search Parents': 'Buscar Padres',
        'Subject': 'Asunto',
        'Message': 'Mensaje',
        'Priority': 'Prioridad',
        'Send Message': 'Enviar Mensaje',
        'Attachments': 'Archivos Adjuntos',
        'Normal': 'Normal',
        'Urgent': 'Urgente'
      },
      fr: {
        'Search Parents': 'Rechercher des Parents',
        'Subject': 'Sujet',
        'Message': 'Message',
        'Priority': 'Priorité',
        'Send Message': 'Envoyer le Message',
        'Attachments': 'Pièces Jointes',
        'Normal': 'Normal',
        'Urgent': 'Urgent'
      },
      zh: {
        'Search Parents': '搜索家长',
        'Subject': '主题',
        'Message': '消息',
        'Priority': '优先级',
        'Send Message': '发送消息',
        'Attachments': '附件',
        'Normal': '普通',
        'Urgent': '紧急'
      }
    };

    return translations[selectedLanguage]?.[text] || text;
  };

  const filteredParents = parents.filter(parent =>
    parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parent.student.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getParentMessages = (parentName) => {
    return messages
      .filter(msg => 
        msg.type === 'direct-message' && 
        (msg.recipient === parentName || msg.sender === parentName)
      )
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Parents List */}
      <div className="border-r">
        <div className="mb-4">
          <input
            type="text"
            placeholder={getTranslatedLabel('Search Parents')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          {filteredParents.map(parent => (
            <div
              key={parent.id}
              onClick={() => setSelectedParent(parent)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedParent?.id === parent.id
                  ? 'bg-blue-50 border-blue-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{parent.name}</h3>
                  <p className="text-sm text-gray-600">{parent.student}</p>
                </div>
                {parent.unread > 0 && (
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                    {parent.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Thread */}
      <div className="md:col-span-2">
        {selectedParent ? (
          <div className="h-full flex flex-col">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl font-semibold">
                {getTranslatedLabel('Chat with')} {selectedParent.name}
              </h2>
              <p className="text-sm text-gray-600">
                {getTranslatedLabel('Parent of')} {selectedParent.student}
              </p>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {getParentMessages(selectedParent.name).map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'teacher' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'teacher'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    {message.subject && (
                      <div className="font-medium mb-1">{message.subject}</div>
                    )}
                    <div>{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.sender === 'teacher' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {getTranslatedLabel('Subject')}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {getTranslatedLabel('Message')} *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {getTranslatedLabel('Priority')}
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="normal">{getTranslatedLabel('Normal')}</option>
                    <option value="urgent">{getTranslatedLabel('Urgent')}</option>
                  </select>
                </div>
                <div className="flex-1">
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
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                {getTranslatedLabel('Send Message')}
              </button>
            </form>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            {getTranslatedLabel('Select a parent to start messaging')}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCenter; 