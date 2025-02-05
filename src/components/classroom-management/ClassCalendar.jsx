import React, { useState } from 'react';

const ClassCalendar = ({
  assignments,
  selectedClass
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    type: 'class',
    location: ''
  });

  const eventTypes = [
    { value: 'class', label: 'Regular Class', color: 'bg-blue-100 text-blue-800' },
    { value: 'exam', label: 'Exam', color: 'bg-red-100 text-red-800' },
    { value: 'assignment', label: 'Assignment Due', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'meeting', label: 'Meeting', color: 'bg-purple-100 text-purple-800' },
    { value: 'activity', label: 'Activity', color: 'bg-green-100 text-green-800' }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      const prevMonthLastDay = new Date(year, month, 0);
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay.getDate() - startingDay + i + 1),
        isCurrentMonth: false
      });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long' });
  };

  const getEventsForDate = (date) => {
    return assignments
      .filter(assignment => {
        const dueDate = new Date(assignment.dueDate);
        return dueDate.toDateString() === date.toDateString();
      })
      .map(assignment => ({
        ...assignment,
        type: 'assignment'
      }));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle event creation (to be implemented)
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      type: 'class',
      location: ''
    });
    setShowEventForm(false);
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold">Class Calendar</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded hover:bg-gray-100"
            >
              ◀
            </button>
            <span className="text-lg font-medium">
              {getMonthName(currentDate)} {currentDate.getFullYear()}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded hover:bg-gray-100"
            >
              ▶
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowEventForm(!showEventForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Event
        </button>
      </div>

      {/* Event Form */}
      {showEventForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
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
              Add Event
            </button>
          </div>
        </form>
      )}

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {getDaysInMonth(currentDate).map((day, index) => {
            const events = getEventsForDate(day.date);
            const isSelected = selectedDate && 
              selectedDate.toDateString() === day.date.toDateString();
            
            return (
              <div
                key={index}
                className={`bg-white min-h-[100px] p-2 ${
                  !day.isCurrentMonth ? 'bg-gray-50' : ''
                } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleDateClick(day.date)}
              >
                <div className={`text-sm font-medium ${
                  !day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
                }`}>
                  {day.date.getDate()}
                </div>
                <div className="mt-1 space-y-1">
                  {events.map((event, eventIndex) => {
                    const type = eventTypes.find(t => t.value === event.type);
                    return (
                      <div
                        key={eventIndex}
                        className={`px-2 py-1 text-xs rounded truncate ${type?.color}`}
                      >
                        {event.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-lg font-medium mb-4">
            Events for {selectedDate.toLocaleDateString()}
          </h3>
          <div className="space-y-4">
            {getEventsForDate(selectedDate).map((event, index) => {
              const type = eventTypes.find(t => t.value === event.type);
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${type?.color}`}>
                        {type?.label}
                      </span>
                    </div>
                    {event.description && (
                      <p className="mt-1 text-sm text-gray-600">
                        {event.description}
                      </p>
                    )}
                    {event.location && (
                      <p className="mt-1 text-sm text-gray-500">
                        📍 {event.location}
                      </p>
                    )}
                  </div>
                  {(event.startTime || event.endTime) && (
                    <div className="text-sm text-gray-500">
                      {event.startTime && formatTime(event.startTime)}
                      {event.endTime && ` - ${formatTime(event.endTime)}`}
                    </div>
                  )}
                </div>
              );
            })}
            {getEventsForDate(selectedDate).length === 0 && (
              <p className="text-center text-gray-500">
                No events scheduled for this date
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassCalendar; 