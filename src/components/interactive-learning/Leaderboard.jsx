import React, { useState } from 'react';

const Leaderboard = ({ scores, participants, activities }) => {
  const [timeRange, setTimeRange] = useState('all');
  const [category, setCategory] = useState('overall');

  const timeRanges = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'all', label: 'All Time' }
  ];

  const categories = [
    { id: 'overall', label: 'Overall', icon: '🏆' },
    { id: 'quiz', label: 'Quizzes', icon: '📝' },
    { id: 'game', label: 'Games', icon: '🎮' },
    { id: 'participation', label: 'Participation', icon: '🌟' }
  ];

  const getFilteredScores = () => {
    const now = new Date();
    const filteredActivities = activities.filter(activity => {
      if (category !== 'overall' && activity.type !== category) return false;

      const activityDate = new Date(activity.timestamp);
      switch (timeRange) {
        case 'today':
          return activityDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.setDate(now.getDate() - 7));
          return activityDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
          return activityDate >= monthAgo;
        default:
          return true;
      }
    });

    // Calculate scores based on filtered activities
    const filteredScores = {};
    filteredActivities.forEach(activity => {
      Object.entries(activity.data?.scores || {}).forEach(([participantId, score]) => {
        filteredScores[participantId] = (filteredScores[participantId] || 0) + score;
      });
    });

    return filteredScores;
  };

  const calculateAchievements = (participantId) => {
    const participantActivities = activities.filter(activity => 
      activity.data?.scores?.[participantId]
    );

    return {
      totalActivities: participantActivities.length,
      perfectScores: participantActivities.filter(activity => 
        activity.data?.scores?.[participantId] === activity.data?.maxScore
      ).length,
      streak: calculateStreak(participantActivities, participantId)
    };
  };

  const calculateStreak = (activities, participantId) => {
    let streak = 0;
    let maxStreak = 0;
    let lastDate = null;

    activities
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .forEach(activity => {
        const activityDate = new Date(activity.timestamp).toDateString();
        
        if (lastDate === activityDate) return;

        if (lastDate === null || 
            new Date(lastDate).getTime() + 24 * 60 * 60 * 1000 >= new Date(activityDate).getTime()) {
          streak++;
          maxStreak = Math.max(maxStreak, streak);
        } else {
          streak = 1;
        }

        lastDate = activityDate;
      });

    return maxStreak;
  };

  const getParticipantRank = (participantId, scores) => {
    const sortedScores = Object.entries(scores)
      .sort(([, a], [, b]) => b - a);
    return sortedScores.findIndex(([id]) => id === participantId) + 1;
  };

  const filteredScores = getFilteredScores();

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Range
          </label>
          <div className="flex gap-2">
            {timeRanges.map(range => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1 rounded-md ${
                  timeRange === range.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-3 py-1 rounded-md flex items-center gap-1 ${
                  category === cat.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Top 3 Podium */}
          <div className="md:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Top Performers</h2>
            <div className="flex justify-center items-end gap-4 h-48">
              {Object.entries(filteredScores)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([participantId, score], index) => {
                  const participant = participants.find(p => p.id === parseInt(participantId));
                  const height = [80, 100, 60][index];
                  return participant ? (
                    <div
                      key={participantId}
                      className="flex flex-col items-center"
                      style={{ height: `${height}%` }}
                    >
                      <div className="text-2xl mb-2">
                        {['🥈', '🥇', '🥉'][index]}
                      </div>
                      <div
                        className={`w-24 rounded-t-lg ${
                          index === 1 ? 'bg-yellow-500' :
                          index === 0 ? 'bg-gray-300' :
                          'bg-orange-400'
                        } flex-1`}
                      ></div>
                      <div className="text-center mt-2">
                        <div className="font-medium">{participant.name}</div>
                        <div className="text-sm text-gray-600">{score} pts</div>
                      </div>
                    </div>
                  ) : null;
                })}
            </div>
          </div>

          {/* Full Rankings */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-3">Rankings</h3>
            <div className="space-y-2">
              {Object.entries(filteredScores)
                .sort(([, a], [, b]) => b - a)
                .map(([participantId, score]) => {
                  const participant = participants.find(p => p.id === parseInt(participantId));
                  const rank = getParticipantRank(participantId, filteredScores);
                  return participant ? (
                    <div
                      key={participantId}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full font-medium">
                        {rank}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{participant.name}</div>
                        <div className="text-sm text-gray-600">
                          {score} points
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {calculateAchievements(participantId).totalActivities} activities
                        </div>
                        <div className="text-xs text-gray-500">
                          {calculateAchievements(participantId).streak} day streak
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-lg font-medium mb-3">Achievements</h3>
            <div className="space-y-4">
              {participants.map(participant => {
                const achievements = calculateAchievements(participant.id);
                return (
                  <div
                    key={participant.id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="font-medium mb-2">{participant.name}</div>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="p-2 bg-white rounded">
                        <div className="text-xl mb-1">🎯</div>
                        <div className="font-medium">
                          {achievements.perfectScores}
                        </div>
                        <div className="text-xs text-gray-500">
                          Perfect Scores
                        </div>
                      </div>
                      <div className="p-2 bg-white rounded">
                        <div className="text-xl mb-1">🔥</div>
                        <div className="font-medium">
                          {achievements.streak}
                        </div>
                        <div className="text-xs text-gray-500">
                          Day Streak
                        </div>
                      </div>
                      <div className="p-2 bg-white rounded">
                        <div className="text-xl mb-1">📊</div>
                        <div className="font-medium">
                          {achievements.totalActivities}
                        </div>
                        <div className="text-xs text-gray-500">
                          Activities
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 