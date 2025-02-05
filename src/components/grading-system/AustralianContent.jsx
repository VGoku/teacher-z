import React, { useState, useEffect } from 'react';
import { Card, Tabs, List, Tag, Space, Button, Input, Select, message } from 'antd';
import { FileTextOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { australianContentService } from '../../services/australianContentService';

const { Search } = Input;
const { Option } = Select;

const AustralianContent = ({ onSelectContent }) => {
    const [plays, setPlays] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [yearFilter, setYearFilter] = useState('all');
    const [selectedContent, setSelectedContent] = useState(null);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const [playsData, moviesData] = await Promise.all([
                australianContentService.getAllPlays(),
                australianContentService.getAllMovies()
            ]);
            setPlays(playsData);
            setMovies(moviesData);
        } catch (error) {
            message.error('Failed to fetch content');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (value) => {
        setSearchQuery(value);
        if (!value) {
            fetchContent();
            return;
        }

        try {
            const results = await australianContentService.search(value);
            setPlays(results.plays);
            setMovies(results.movies);
        } catch (error) {
            message.error('Search failed');
        }
    };

    const filterContentByYear = (content) => {
        if (yearFilter === 'all') return content;
        return content.filter(item => item.year.toString() === yearFilter);
    };

    const handleContentSelect = (content) => {
        setSelectedContent(content);
        if (onSelectContent) {
            onSelectContent(content);
        }
    };

    const renderContentList = (content, type) => (
        <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
            dataSource={filterContentByYear(content)}
            renderItem={item => (
                <List.Item>
                    <Card
                        hoverable
                        className={`h-full ${selectedContent?.id === item.id ? 'border-blue-500' : ''}`}
                        onClick={() => handleContentSelect(item)}
                    >
                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium">{item.title}</h3>
                                <Tag color={type === 'play' ? 'blue' : 'green'}>
                                    {type === 'play' ? <FileTextOutlined /> : <VideoCameraOutlined />}
                                    {' '}{type}
                                </Tag>
                            </div>
                            <p className="text-sm text-gray-600">
                                {type === 'play' ? item.playwright : item.director} ({item.year})
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {item.themes.map((theme, index) => (
                                    <Tag key={index} color="default">{theme}</Tag>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2">
                                {item.synopsis}
                            </p>
                            <div className="mt-2">
                                <p className="text-xs text-gray-500">
                                    Curriculum Year: {item.curriculum.year}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Subjects: {item.curriculum.subjects.join(', ')}
                                </p>
                            </div>
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    );

    const years = [...new Set([
        ...plays.map(p => p.year),
        ...movies.map(m => m.year)
    ])].sort();

    const tabItems = [
        {
            key: 'plays',
            label: 'Plays',
            children: renderContentList(plays, 'play')
        },
        {
            key: 'movies',
            label: 'Movies',
            children: renderContentList(movies, 'movie')
        }
    ];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Australian Content</h2>
                <Space>
                    <Select
                        value={yearFilter}
                        onChange={setYearFilter}
                        style={{ width: 120 }}
                    >
                        <Option value="all">All Years</Option>
                        {years.map(year => (
                            <Option key={year} value={year.toString()}>{year}</Option>
                        ))}
                    </Select>
                    <Search
                        placeholder="Search content..."
                        onSearch={handleSearch}
                        style={{ width: 250 }}
                        allowClear
                    />
                </Space>
            </div>

            <Tabs defaultActiveKey="plays" items={tabItems} />

            {selectedContent && (
                <Card title="Educational Resources" className="mt-4">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium mb-2">Themes</h4>
                            <ul className="list-disc list-inside">
                                {selectedContent.educationalResources.themes.map((theme, index) => (
                                    <li key={index} className="text-gray-600">{theme}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Discussion Questions</h4>
                            <ul className="list-disc list-inside">
                                {selectedContent.educationalResources.discussionQuestions.map((question, index) => (
                                    <li key={index} className="text-gray-600">{question}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Activities</h4>
                            <ul className="list-disc list-inside">
                                {selectedContent.educationalResources.activities.map((activity, index) => (
                                    <li key={index} className="text-gray-600">{activity}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Curriculum Outcomes</h4>
                            <ul className="list-disc list-inside">
                                {selectedContent.curriculum.outcomes.map((outcome, index) => (
                                    <li key={index} className="text-gray-600">{outcome}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default AustralianContent; 