import React, { useState, useEffect } from 'react';

const LessonCalendar = ({
  lessons,
  selectedDate,
  viewMode,
  onDateSelect,
  onLessonUpdate
}) => {
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (viewMode === 'month') {
      generateMonthCalendar();
    } else {
      generateWeekCalendar();
    }
  }, [viewMode, currentMonth, lessons]);

  const generateMonthCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startOffset = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // Add previous month's days
    for (let i = 0; i < startOffset; i++) {
      const prevDate = new Date(year, month, -startOffset + i + 1);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        lessons: getLessonsForDate(prevDate)
      });
    }
    
    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        lessons: getLessonsForDate(currentDate)
      });
    }
    
    // Add next month's days to complete the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        lessons: getLessonsForDate(nextDate)
      });
    }
    
    setCalendarDays(days);
  };

  const generateWeekCalendar = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(currentDate.getDate() + i);
      days.push({
        date: currentDate,
        isCurrentMonth: currentDate.getMonth() === currentMonth.getMonth(),
        lessons: getLessonsForDate(currentDate)
      });
    }
    
    setCalendarDays(days);
  };

  const getLessonsForDate = (date) => {
    return lessons.filter(lesson => {
      const lessonDate = new Date(lesson.date);
      return lessonDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    onDateSelect(newDate);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins ? ` ${mins}m` : ''}`;
  };

  return (
    <div className="space-y-4">
      {/* Calendar Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => viewMode === 'month' ? navigateMonth(-1) : navigateWeek(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          ←
        </button>
        
        <h2 className="text-xl font-semibold">
          {viewMode === 'month' ? (
            currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })
          ) : (
            `Week of ${calendarDays[0]?.date.toLocaleDateString()}`
          )}
        </h2>
        
        <button
          onClick={() => viewMode === 'month' ? navigateMonth(1) : navigateWeek(1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {/* Day Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="bg-gray-100 p-2 text-center text-sm font-medium"
          >
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {calendarDays.map(({ date, isCurrentMonth, lessons }, index) => (
          <div
            key={index}
            className={`bg-white p-2 min-h-[120px] ${
              viewMode === 'week' ? 'min-h-[200px]' : ''
            } ${
              isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
            } ${
              date.toDateString() === new Date().toDateString()
                ? 'bg-blue-50'
                : ''
            }`}
          >
            <div className="font-medium text-sm mb-1">
              {date.getDate()}
            </div>
            
            <div className="space-y-1">
              {lessons.map(lesson => (
                <div
                  key={lesson.id}
                  className={`text-xs p-1 rounded ${
                    lesson.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : lesson.status === 'in-progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  <div className="font-medium">{lesson.title}</div>
                  {viewMode === 'week' && (
                    <>
                      <div>{lesson.class} - {lesson.subject}</div>
                      <div>{formatTime(lesson.duration)}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-sm mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-100"></span>
          <span>Planned</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-yellow-100"></span>
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-100"></span>
          <span>Completed</span>
        </div>
      </div>
    </div>
  );
};

export default LessonCalendar; 