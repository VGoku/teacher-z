import React, { useState } from 'react';

const MeetingScheduler = ({ meetings, onAddMeeting, selectedLanguage }) => {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    date: '',
    time: '',
    duration: '30',
    type: 'in-person',
    topic: '',
    notes: '',
    status: 'scheduled'
  });

  const meetingTypes = [
    { id: 'in-person', label: 'In Person' },
    { id: 'virtual', label: 'Virtual Meeting' },
    { id: 'phone', label: 'Phone Call' }
  ];

  const meetingDurations = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' }
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
    onAddMeeting({
      ...formData,
      id: Date.now(),
      timestamp: Date.now(),
      type: 'meeting'
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      parentName: '',
      studentName: '',
      date: '',
      time: '',
      duration: '30',
      type: 'in-person',
      topic: '',
      notes: '',
      status: 'scheduled'
    });
  };

  const getTranslatedLabel = (text) => {
    // In a real app, this would use a proper i18n library
    const translations = {
      es: {
        'Parent Name': 'Nombre del Padre',
        'Student Name': 'Nombre del Estudiante',
        'Date': 'Fecha',
        'Time': 'Hora',
        'Duration': 'Duración',
        'Meeting Type': 'Tipo de Reunión',
        'Topic': 'Tema',
        'Notes': 'Notas',
        'Schedule Meeting': 'Programar Reunión'
      },
      fr: {
        'Parent Name': 'Nom du Parent',
        'Student Name': 'Nom de l\'Élève',
        'Date': 'Date',
        'Time': 'Heure',
        'Duration': 'Durée',
        'Meeting Type': 'Type de Réunion',
        'Topic': 'Sujet',
        'Notes': 'Notes',
        'Schedule Meeting': 'Planifier la Réunion'
      },
      zh: {
        'Parent Name': '家长姓名',
        'Student Name': '学生姓名',
        'Date': '日期',
        'Time': '时间',
        'Duration': '时长',
        'Meeting Type': '会议类型',
        'Topic': '主题',
        'Notes': '备注',
        'Schedule Meeting': '安排会议'
      }
    };

    return translations[selectedLanguage]?.[text] || text;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Meeting Form */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          {getTranslatedLabel('Schedule New Meeting')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('Parent Name')} *
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('Student Name')} *
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('Date')} *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('Time')} *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('Duration')}
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                {meetingDurations.map(duration => (
                  <option key={duration.value} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('Meeting Type')}
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                {meetingTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedLabel('Topic')} *
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedLabel('Notes')}
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {getTranslatedLabel('Schedule Meeting')}
          </button>
        </form>
      </div>

      {/* Meetings List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {getTranslatedLabel('Scheduled Meetings')}
        </h2>
        <div className="space-y-4">
          {meetings
            .sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`))
            .map(meeting => (
              <div
                key={meeting.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{meeting.topic}</h3>
                    <p className="text-sm text-gray-600">
                      {meeting.parentName} - {meeting.studentName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(`${meeting.date} ${meeting.time}`).toLocaleString()} ({meeting.duration} mins)
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    meeting.type === 'in-person' ? 'bg-green-100 text-green-800' :
                    meeting.type === 'virtual' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {meetingTypes.find(t => t.id === meeting.type)?.label}
                  </span>
                </div>
                {meeting.notes && (
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-sm text-gray-700">{meeting.notes}</p>
                  </div>
                )}
                <div className="mt-2 pt-2 border-t flex gap-2">
                  <button
                    onClick={() => onAddMeeting({
                      ...meeting,
                      status: meeting.status === 'completed' ? 'scheduled' : 'completed'
                    })}
                    className={`text-sm px-3 py-1 rounded ${
                      meeting.status === 'completed'
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    {meeting.status === 'completed' ? 'Reopen' : 'Mark Complete'}
                  </button>
                  {meeting.type === 'virtual' && (
                    <button
                      className="text-sm px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      Join Meeting
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingScheduler; 