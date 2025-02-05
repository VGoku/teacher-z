import React, { useState } from 'react';

const GameHub = ({ sessionData, onStartGame, onParticipantJoin, onScoreUpdate }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameSettings, setGameSettings] = useState({
    timeLimit: 300,
    pointsPerQuestion: 10,
    teamMode: false,
    difficulty: 'medium'
  });

  const games = [
    {
      id: 'flashcards',
      title: 'Speed Flashcards',
      icon: '🎴',
      description: 'Race against time to match terms with their definitions.',
      minPlayers: 1,
      maxPlayers: 30
    },
    {
      id: 'word_chain',
      title: 'Word Chain Challenge',
      icon: '🔤',
      description: 'Build chains of related vocabulary words.',
      minPlayers: 2,
      maxPlayers: 10
    },
    {
      id: 'quiz_race',
      title: 'Quiz Race',
      icon: '🏃',
      description: 'Compete to answer questions correctly in the shortest time.',
      minPlayers: 2,
      maxPlayers: 20
    },
    {
      id: 'category_sort',
      title: 'Category Sorting',
      icon: '📦',
      description: 'Sort items into their correct categories against the clock.',
      minPlayers: 1,
      maxPlayers: 15
    }
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy', color: 'green' },
    { value: 'medium', label: 'Medium', color: 'blue' },
    { value: 'hard', label: 'Hard', color: 'red' }
  ];

  const handleStartGame = () => {
    if (!selectedGame) return;

    onStartGame({
      id: Date.now(),
      type: 'game',
      gameType: selectedGame.id,
      settings: gameSettings,
      status: 'waiting',
      participants: [],
      scores: {},
      startTime: null,
      endTime: null
    });
  };

  const handleSettingChange = (setting, value) => {
    setGameSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="space-y-6">
      {!sessionData.activeQuiz ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Game Selection */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Select a Game</h2>
              <div className="grid grid-cols-1 gap-4">
                {games.map(game => (
                  <div
                    key={game.id}
                    onClick={() => setSelectedGame(game)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedGame?.id === game.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          <span>{game.icon}</span>
                          {game.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {game.description}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {game.minPlayers}-{game.maxPlayers} players
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Settings */}
            {selectedGame && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Game Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time Limit (seconds)
                    </label>
                    <input
                      type="number"
                      value={gameSettings.timeLimit}
                      onChange={(e) => handleSettingChange('timeLimit', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md"
                      min="60"
                      max="900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Points per Question
                    </label>
                    <input
                      type="number"
                      value={gameSettings.pointsPerQuestion}
                      onChange={(e) => handleSettingChange('pointsPerQuestion', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md"
                      min="1"
                      max="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty
                    </label>
                    <div className="flex gap-2">
                      {difficulties.map(diff => (
                        <button
                          key={diff.value}
                          onClick={() => handleSettingChange('difficulty', diff.value)}
                          className={`flex-1 py-2 px-4 rounded-md border ${
                            gameSettings.difficulty === diff.value
                              ? `bg-${diff.color}-100 border-${diff.color}-500 text-${diff.color}-700`
                              : 'bg-white hover:bg-gray-50'
                          }`}
                        >
                          {diff.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="teamMode"
                      checked={gameSettings.teamMode}
                      onChange={(e) => handleSettingChange('teamMode', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="teamMode" className="text-sm text-gray-700">
                      Enable Team Mode
                    </label>
                  </div>

                  <button
                    onClick={handleStartGame}
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600"
                  >
                    Start Game
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Game Instructions */}
          {selectedGame && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium mb-2">How to Play: {selectedGame.title}</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                {selectedGame.id === 'flashcards' && (
                  <>
                    <li>Cards with terms and definitions will appear on screen</li>
                    <li>Match them as quickly as possible</li>
                    <li>Score points based on speed and accuracy</li>
                  </>
                )}
                {selectedGame.id === 'word_chain' && (
                  <>
                    <li>Start with a given word</li>
                    <li>Each player adds a related word</li>
                    <li>Score points for valid connections</li>
                  </>
                )}
                {selectedGame.id === 'quiz_race' && (
                  <>
                    <li>Answer multiple-choice questions</li>
                    <li>Faster correct answers earn more points</li>
                    <li>Watch out for streak bonuses!</li>
                  </>
                )}
                {selectedGame.id === 'category_sort' && (
                  <>
                    <li>Items will appear on screen</li>
                    <li>Drag them to their correct categories</li>
                    <li>Score points for speed and accuracy</li>
                  </>
                )}
              </ul>
            </div>
          )}
        </>
      ) : (
        // Active Game View
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {games.find(g => g.id === sessionData.activeQuiz.gameType)?.title}
          </h2>
          
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-blue-100 rounded-lg">
              <p className="text-blue-800">
                Game Code: <span className="font-mono font-bold">{sessionData.activeQuiz.id}</span>
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
            {sessionData.activeQuiz.status === 'waiting' ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Waiting for Players...</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {sessionData.participants.map(participant => (
                    <div
                      key={participant.id}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                    >
                      {participant.name}
                    </div>
                  ))}
                </div>
                {sessionData.participants.length >= games.find(g => g.id === sessionData.activeQuiz.gameType)?.minPlayers && (
                  <button
                    onClick={() => {/* Start the game */}}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Start Game
                  </button>
                )}
              </div>
            ) : (
              <div>
                {/* Game specific UI will be rendered here */}
                <p className="text-gray-600">Game in progress...</p>
              </div>
            )}
          </div>

          {/* Scoreboard */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Scoreboard</h3>
            <div className="max-w-md mx-auto">
              {Object.entries(sessionData.scores)
                .sort(([, a], [, b]) => b - a)
                .map(([participantId, score]) => {
                  const participant = sessionData.participants.find(p => p.id === parseInt(participantId));
                  return participant ? (
                    <div
                      key={participantId}
                      className="flex justify-between items-center p-2 border-b"
                    >
                      <span>{participant.name}</span>
                      <span className="font-medium">{score} pts</span>
                    </div>
                  ) : null;
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameHub; 