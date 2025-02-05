import React, { useState, useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const SurveyAnalytics = ({ survey, responses }) => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [exportFormat, setExportFormat] = useState('csv');

    const analytics = useMemo(() => {
        if (!responses || !survey) return null;

        return survey.questions.map(question => {
            const questionResponses = responses.map(r => r.answers[question.id]);

            switch (question.type) {
                case 'rating':
                    const ratingCounts = {};
                    questionResponses.forEach(rating => {
                        ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
                    });
                    const ratingData = Object.entries(ratingCounts).map(([rating, count]) => ({
                        rating: Number(rating),
                        count
                    }));
                    const averageRating = questionResponses.reduce((a, b) => a + b, 0) / questionResponses.length;

                    return {
                        ...question,
                        chartData: ratingData,
                        stats: {
                            average: averageRating.toFixed(1),
                            total: questionResponses.length
                        }
                    };

                case 'multiChoice':
                    const optionCounts = {};
                    questionResponses.forEach(choice => {
                        optionCounts[choice] = (optionCounts[choice] || 0) + 1;
                    });
                    const pieData = Object.entries(optionCounts).map(([option, count]) => ({
                        name: option,
                        value: count
                    }));

                    return {
                        ...question,
                        chartData: pieData,
                        stats: {
                            total: questionResponses.length,
                            mostCommon: Object.entries(optionCounts).sort((a, b) => b[1] - a[1])[0][0]
                        }
                    };

                case 'text':
                    const wordCount = questionResponses.reduce((acc, text) => acc + (text?.split(/\s+/).length || 0), 0);
                    const averageLength = wordCount / questionResponses.length;

                    return {
                        ...question,
                        responses: questionResponses.filter(Boolean),
                        stats: {
                            total: questionResponses.length,
                            averageLength: averageLength.toFixed(1)
                        }
                    };

                default:
                    return question;
            }
        });
    }, [survey, responses]);

    const handleExport = () => {
        if (!analytics) return;

        const data = responses.map(response => {
            const row = {
                respondentId: response.id,
                submittedAt: response.submittedAt
            };

            survey.questions.forEach(question => {
                row[`Q${question.id}_${question.text}`] = response.answers[question.id];
            });

            return row;
        });

        if (exportFormat === 'csv') {
            const headers = Object.keys(data[0]);
            const csv = [
                headers.join(','),
                ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
            ].join('\n');

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${survey.title}-responses.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    if (!analytics) return <div>No data available</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Survey Analytics</h2>
                <div className="flex gap-2">
                    <select
                        value={exportFormat}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="px-3 py-2 border rounded-md"
                    >
                        <option value="csv">CSV</option>
                        <option value="excel">Excel</option>
                    </select>
                    <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Export Data
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-full bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Survey Overview</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Total Responses</p>
                            <p className="text-2xl font-semibold">{responses.length}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Completion Rate</p>
                            <p className="text-2xl font-semibold">
                                {((responses.filter(r => r.completed).length / responses.length) * 100).toFixed(1)}%
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Average Time</p>
                            <p className="text-2xl font-semibold">
                                {Math.round(responses.reduce((acc, r) => acc + r.duration, 0) / responses.length)}s
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {analytics.map((question) => (
                    <div
                        key={question.id}
                        className="border rounded-lg p-6 space-y-4"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium">{question.text}</h3>
                                <p className="text-sm text-gray-500">{question.type}</p>
                            </div>
                            {question.stats && (
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">
                                        {question.stats.total} responses
                                    </p>
                                    {question.stats.average && (
                                        <p className="text-sm font-medium">
                                            Average: {question.stats.average}
                                        </p>
                                    )}
                                    {question.stats.mostCommon && (
                                        <p className="text-sm font-medium">
                                            Most Common: {question.stats.mostCommon}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {question.type === 'rating' && (
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={question.chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="rating" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}

                        {question.type === 'multiChoice' && (
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={question.chartData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {question.chartData.map((entry, index) => (
                                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        )}

                        {question.type === 'text' && question.responses && (
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    Average response length: {question.stats.averageLength} words
                                </p>
                                <div className="max-h-40 overflow-y-auto space-y-2">
                                    {question.responses.map((response, index) => (
                                        <p key={index} className="text-sm bg-gray-50 p-2 rounded">
                                            {response}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SurveyAnalytics; 