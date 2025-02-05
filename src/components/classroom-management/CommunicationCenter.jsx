import React, { useState } from 'react';

const CommunicationCenter = ({
  students,
  notifications,
  onSendNotification,
  selectedClass
}) => {
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState('notifications');
  const [formData, setFormData] = useState({
    recipients: [],
    subject: '',
    message: '',
    type: 'announcement',
    priority: 'normal'
  });

  const notificationTypes = [
    { value: 'announcement', label: 'Announcement', icon: '📢' },
    { value: 'assignment', label: 'Assignment Update', icon: '📝' },
    { value: 'grade', label: 'Grade Update', icon: '📊' },
    { value: 'reminder', label: 'Reminder', icon: '⏰' },
    { value: 'event', label: 'Event', icon: '📅' }
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low', class: 'bg-gray-100 text-gray-800' },
    { value: 'normal', label: 'Normal', class: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'High', class: 'bg-yellow-100 text-yellow-800' },
    { value: 'urgent', label: 'Urgent', class: 'bg-red-100 text-red-800' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRecipientChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData(prev => ({
      ...prev,
      recipients: selectedOptions
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendNotification({
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      sender: 'Teacher',
      status: 'sent'
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      recipients: [],
      subject: '',
      message: '',
      type: 'announcement',
      priority: 'normal'
    });
    setShowComposeForm(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Communication Center</h2>
        <button
          onClick={() => setShowComposeForm(!showComposeForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showComposeForm ? 'Cancel' : 'Compose Message'}
        </button>
      </div>

      {/* Compose Form */}
      {showComposeForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipients
              </label>
              <select
                multiple
                name="recipients"
                value={formData.recipients}
                onChange={handleRecipientChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                size="4"
              >
                <option value="all">All Students</option>
                {students
                  .filter(student => !selectedClass || student.classId === selectedClass)
                  .map(student => (
                    <option key={student.id} value={student.id}>
                      {student.firstName} {student.lastName}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {notificationTypes.map(type => (
                  <label
                    key={type.value}
                    className={`flex items-center justify-center p-2 rounded border cursor-pointer
                      ${formData.type === type.value
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'hover:bg-gray-50'
                      }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="mr-2">{type.icon}</span>
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <div className="flex flex-wrap gap-2">
                {priorityLevels.map(priority => (
                  <label
                    key={priority.value}
                    className={`px-3 py-1 rounded cursor-pointer
                      ${formData.priority === priority.value
                        ? priority.class
                        : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={priority.value}
                      checked={formData.priority === priority.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    {priority.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send Message
            </button>
          </div>
        </form>
      )}

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setSelectedTab('notifications')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              selectedTab === 'notifications'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setSelectedTab('sent')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              selectedTab === 'sent'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sent Messages
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {notifications
            .filter(notification => {
              if (selectedTab === 'sent') {
                return notification.sender === 'Teacher';
              }
              return true;
            })
            .map(notification => {
              const type = notificationTypes.find(t => t.value === notification.type);
              const priority = priorityLevels.find(p => p.value === notification.priority);

              return (
                <div key={notification.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <span>{type?.icon}</span>
                      <h3 className="font-medium">{notification.subject}</h3>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${priority?.class}`}>
                      {priority?.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{formatDate(notification.timestamp)}</span>
                    <span>
                      {notification.recipients.includes('all')
                        ? 'Sent to all students'
                        : `Sent to ${notification.recipients.length} students`}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CommunicationCenter; 