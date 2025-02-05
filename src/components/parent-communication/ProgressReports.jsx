import React, { useState } from 'react';

const ProgressReports = ({ reports, onAddReport, selectedLanguage }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    period: 'term1',
    academicProgress: {
      subjects: [],
      overallGrade: '',
      attendance: '',
      participation: ''
    },
    behavioralProgress: {
      behavior: '',
      socialSkills: '',
      workHabits: ''
    },
    teacherComments: '',
    nextSteps: '',
    sendToParent: true
  });

  // Mock data for demo purposes
  const students = [
    { 
      id: 1, 
      name: 'Sarah Smith',
      parent: 'John Smith',
      subjects: [
        { name: 'Mathematics', grade: 'A' },
        { name: 'Science', grade: 'B+' },
        { name: 'English', grade: 'A-' }
      ]
    },
    { 
      id: 2, 
      name: 'Carlos Garcia',
      parent: 'Maria Garcia',
      subjects: [
        { name: 'Mathematics', grade: 'B' },
        { name: 'Science', grade: 'A' },
        { name: 'English', grade: 'B+' }
      ]
    }
  ];

  const periods = [
    { id: 'term1', label: 'Term 1' },
    { id: 'term2', label: 'Term 2' },
    { id: 'term3', label: 'Term 3' },
    { id: 'term4', label: 'Term 4' }
  ];

  const ratings = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'satisfactory', label: 'Satisfactory' },
    { value: 'needsImprovement', label: 'Needs Improvement' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStudentSelect = (studentId) => {
    const student = students.find(s => s.id === parseInt(studentId));
    if (student) {
      setFormData(prev => ({
        ...prev,
        studentName: student.name,
        parentName: student.parent,
        academicProgress: {
          ...prev.academicProgress,
          subjects: student.subjects
        }
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReport({
      ...formData,
      id: Date.now(),
      timestamp: Date.now(),
      type: 'progress-report'
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      parentName: '',
      period: 'term1',
      academicProgress: {
        subjects: [],
        overallGrade: '',
        attendance: '',
        participation: ''
      },
      behavioralProgress: {
        behavior: '',
        socialSkills: '',
        workHabits: ''
      },
      teacherComments: '',
      nextSteps: '',
      sendToParent: true
    });
  };

  const getTranslatedLabel = (text) => {
    // In a real app, this would use a proper i18n library
    const translations = {
      es: {
        'Student': 'Estudiante',
        'Period': 'Período',
        'Academic Progress': 'Progreso Académico',
        'Behavioral Progress': 'Progreso Conductual',
        'Teacher Comments': 'Comentarios del Profesor',
        'Next Steps': 'Próximos Pasos',
        'Send to Parent': 'Enviar a los Padres',
        'Generate Report': 'Generar Informe'
      },
      fr: {
        'Student': 'Élève',
        'Period': 'Période',
        'Academic Progress': 'Progrès Académique',
        'Behavioral Progress': 'Progrès Comportemental',
        'Teacher Comments': 'Commentaires de l\'Enseignant',
        'Next Steps': 'Prochaines Étapes',
        'Send to Parent': 'Envoyer aux Parents',
        'Generate Report': 'Générer le Rapport'
      },
      zh: {
        'Student': '学生',
        'Period': '学期',
        'Academic Progress': '学业进展',
        'Behavioral Progress': '行为进展',
        'Teacher Comments': '教师评语',
        'Next Steps': '下一步计划',
        'Send to Parent': '发送给家长',
        'Generate Report': '生成报告'
      }
    };

    return translations[selectedLanguage]?.[text] || text;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Report Form */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          {getTranslatedLabel('Generate Progress Report')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('Student')} *
              </label>
              <select
                onChange={(e) => handleStudentSelect(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">{getTranslatedLabel('Select Student')}</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslatedLabel('Period')} *
              </label>
              <select
                name="period"
                value={formData.period}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Academic Progress */}
          <div className="space-y-4">
            <h3 className="font-medium">
              {getTranslatedLabel('Academic Progress')}
            </h3>
            
            {formData.academicProgress.subjects.map((subject, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span>{subject.name}</span>
                <span className="font-medium">{subject.grade}</span>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {getTranslatedLabel('Attendance')}
                </label>
                <select
                  name="academicProgress.attendance"
                  value={formData.academicProgress.attendance}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">{getTranslatedLabel('Select Rating')}</option>
                  {ratings.map(rating => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {getTranslatedLabel('Participation')}
                </label>
                <select
                  name="academicProgress.participation"
                  value={formData.academicProgress.participation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">{getTranslatedLabel('Select Rating')}</option>
                  {ratings.map(rating => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Behavioral Progress */}
          <div className="space-y-4">
            <h3 className="font-medium">
              {getTranslatedLabel('Behavioral Progress')}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {getTranslatedLabel('Behavior')}
                </label>
                <select
                  name="behavioralProgress.behavior"
                  value={formData.behavioralProgress.behavior}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">{getTranslatedLabel('Select Rating')}</option>
                  {ratings.map(rating => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {getTranslatedLabel('Social Skills')}
                </label>
                <select
                  name="behavioralProgress.socialSkills"
                  value={formData.behavioralProgress.socialSkills}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">{getTranslatedLabel('Select Rating')}</option>
                  {ratings.map(rating => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {getTranslatedLabel('Work Habits')}
                </label>
                <select
                  name="behavioralProgress.workHabits"
                  value={formData.behavioralProgress.workHabits}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">{getTranslatedLabel('Select Rating')}</option>
                  {ratings.map(rating => (
                    <option key={rating.value} value={rating.value}>
                      {rating.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedLabel('Teacher Comments')}
            </label>
            <textarea
              name="teacherComments"
              value={formData.teacherComments}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslatedLabel('Next Steps')}
            </label>
            <textarea
              name="nextSteps"
              value={formData.nextSteps}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="sendToParent"
              checked={formData.sendToParent}
              onChange={(e) => handleInputChange({
                target: { name: 'sendToParent', value: e.target.checked }
              })}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">
              {getTranslatedLabel('Send to Parent')}
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {getTranslatedLabel('Generate Report')}
          </button>
        </form>
      </div>

      {/* Reports List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {getTranslatedLabel('Generated Reports')}
        </h2>
        <div className="space-y-4">
          {reports
            .filter(report => report.type === 'progress-report')
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(report => (
              <div
                key={report.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{report.studentName}</h3>
                    <p className="text-sm text-gray-600">
                      {periods.find(p => p.id === report.period)?.label} - {report.parentName}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(report.timestamp).toLocaleDateString()}
                  </span>
                </div>

                {/* Academic Progress Summary */}
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    {getTranslatedLabel('Academic Progress')}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {report.academicProgress.subjects.map((subject, index) => (
                      <div key={index} className="text-sm">
                        {subject.name}: {subject.grade}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 pt-3 border-t flex gap-2">
                  <button className="text-sm px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200">
                    {getTranslatedLabel('View Full Report')}
                  </button>
                  {report.sendToParent && (
                    <button className="text-sm px-3 py-1 rounded bg-green-100 text-green-600 hover:bg-green-200">
                      {getTranslatedLabel('Resend to Parent')}
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

export default ProgressReports; 