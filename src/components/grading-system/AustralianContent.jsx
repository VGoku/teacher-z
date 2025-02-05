import React, { useState } from 'react';
import { Card, Tabs, List, Tag, Space, Input, Select, message, Collapse } from 'antd';
import { FileTextOutlined, VideoCameraOutlined, BookOutlined, LinkOutlined } from '@ant-design/icons';
import { australianPlays, australianMovies, educationalPlatforms } from '../../models/AustralianContent';

const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const AustralianContent = ({ onSelectContent }) => {
    const [plays, setPlays] = useState(australianPlays);
    const [movies, setMovies] = useState(australianMovies);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [yearFilter, setYearFilter] = useState('all');
    const [ratingFilter, setRatingFilter] = useState('all');
    const [regionFilter, setRegionFilter] = useState('Australia');
    const [selectedContent, setSelectedContent] = useState(null);

    const handleSearch = (value) => {
        setSearchQuery(value);
        if (!value) {
            setPlays(australianPlays);
            setMovies(australianMovies);
            return;
        }

        const searchValue = value.toLowerCase();
        const filteredPlays = australianPlays.filter(play =>
            play.title.toLowerCase().includes(searchValue) ||
            play.playwright.toLowerCase().includes(searchValue) ||
            play.themes.some(theme => theme.toLowerCase().includes(searchValue))
        );
        const filteredMovies = australianMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchValue) ||
            movie.director.toLowerCase().includes(searchValue) ||
            movie.themes.some(theme => theme.toLowerCase().includes(searchValue))
        );

        setPlays(filteredPlays);
        setMovies(filteredMovies);
    };

    const filterContent = (content) => {
        return content.filter(item => {
            const matchesYear = yearFilter === 'all' || item?.year?.toString() === yearFilter;
            const matchesRating = ratingFilter === 'all' || item?.rating === ratingFilter;
            const matchesRegion = regionFilter === 'all' || item?.region === regionFilter;
            return matchesYear && matchesRating && matchesRegion;
        });
    };

    const handleContentSelect = (content) => {
        setSelectedContent(content);
        if (onSelectContent) {
            onSelectContent(content);
        }
    };

    const handleExternalLink = async (url, platformName) => {
        try {
            // First check if the URL is valid
            const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });

            message.info(`You are being redirected to ${platformName}. This will open in a new tab.`);
            window.open(url, '_blank', 'noopener,noreferrer');
        } catch (error) {
            // If the URL is not accessible, provide alternative links
            if (platformName === 'Screen Australia') {
                message.error(
                    'The direct link is not accessible. Please visit the Screen Australia homepage at https://www.screenaustralia.gov.au and navigate to Education & Resources.',
                    6
                );
                // Open the main website instead
                window.open('https://www.screenaustralia.gov.au', '_blank', 'noopener,noreferrer');
            } else {
                message.error(`Unable to access ${platformName}. Please try again later or check their main website.`, 4);
            }
            console.error(`Error accessing ${platformName}:`, error);
        }
    };

    const renderContentList = (content, type) => (
        <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
            dataSource={filterContent(content)}
            loading={loading}
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
                                <Space>
                                    <Tag color={type === 'play' ? 'blue' : 'green'}>
                                        {type === 'play' ? <FileTextOutlined /> : <VideoCameraOutlined />}
                                        {' '}{type}
                                    </Tag>
                                    <Tag color="orange">{item.rating}</Tag>
                                </Space>
                            </div>
                            <p className="text-sm text-gray-600">
                                {type === 'play' ? item.playwright : item.director} ({item.year})
                            </p>
                            <p className="text-sm text-gray-500">
                                Duration: {item.duration}
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
                                <p className="text-xs text-gray-500">
                                    Source: {item.source}
                                </p>
                            </div>
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    );

    const renderEducationalPlatforms = () => (
        <Card title="Australian Educational Platforms" className="mb-4">
            <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={Object.values(educationalPlatforms)}
                renderItem={platform => (
                    <List.Item>
                        <Card title={platform.name} size="small">
                            <p className="text-sm text-gray-600 mb-2">{platform.description}</p>
                            <div className="mb-2">
                                <h4 className="text-sm font-medium">Key Features:</h4>
                                <ul className="list-disc list-inside text-sm">
                                    {platform.features.map((feature, index) => (
                                        <li key={index} className="text-gray-600">{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-2">
                                <h4 className="text-sm font-medium">Subjects:</h4>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {platform.subjects.map((subject, index) => (
                                        <Tag key={index} color="blue">{subject}</Tag>
                                    ))}
                                </div>
                            </div>
                            {platform.alternativeResources ? (
                                <div className="mb-2">
                                    <h4 className="text-sm font-medium">Available Resources:</h4>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {platform.alternativeResources.map((resource, index) => (
                                            <a
                                                key={index}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleExternalLink(resource.url, resource.title);
                                                }}
                                                href={resource.url}
                                                className="text-blue-500 hover:text-blue-600 cursor-pointer text-sm"
                                            >
                                                {resource.title} <LinkOutlined />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleExternalLink(platform.url, platform.name);
                                }}
                                href={platform.url}
                                className="text-blue-500 hover:text-blue-600 cursor-pointer"
                            >
                                Visit Main Platform <LinkOutlined />
                            </a>
                        </Card>
                    </List.Item>
                )}
            />
        </Card>
    );

    const years = [...new Set([
        ...australianPlays.map(p => p?.year?.toString() || ''),
        ...australianMovies.map(m => m?.year?.toString() || '')
    ])].filter(Boolean).sort();

    const ratings = [...new Set([
        'all',
        ...australianPlays.map(p => p?.rating || ''),
        ...australianMovies.map(m => m?.rating || '')
    ])].filter(Boolean).sort();

    const regions = [...new Set([
        'all',
        ...australianPlays.map(p => p?.region || ''),
        ...australianMovies.map(m => m?.region || '')
    ])].filter(Boolean).sort();

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
                <Space wrap>
                    <Select
                        value={yearFilter || 'all'}
                        onChange={setYearFilter}
                        style={{ width: 120 }}
                    >
                        <Option value="all">All Years</Option>
                        {years.map(year => (
                            <Option key={year} value={year}>{year}</Option>
                        ))}
                    </Select>
                    <Select
                        value={ratingFilter || 'all'}
                        onChange={setRatingFilter}
                        style={{ width: 120 }}
                    >
                        <Option value="all">All Ratings</Option>
                        {ratings.filter(r => r !== 'all' && r).map(rating => (
                            <Option key={rating} value={rating}>{rating}</Option>
                        ))}
                    </Select>
                    <Select
                        value={regionFilter || 'all'}
                        onChange={setRegionFilter}
                        style={{ width: 120 }}
                    >
                        <Option value="all">All Regions</Option>
                        {regions.filter(r => r !== 'all' && r).map(region => (
                            <Option key={region} value={region}>{region}</Option>
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

            {renderEducationalPlatforms()}

            <Tabs defaultActiveKey="plays" items={tabItems} />

            {selectedContent && (
                <div className="space-y-4">
                    <Card title="Educational Resources" className="mt-4">
                        <Collapse defaultActiveKey={['1']} className="bg-white">
                            <Panel header="Cultural Context" key="1">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Historical Background</h4>
                                        <p className="text-gray-700">
                                            {selectedContent.educationalResources.culturalContext.historicalBackground}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">Cultural Significance</h4>
                                        <p className="text-gray-700">
                                            {selectedContent.educationalResources.culturalContext.culturalSignificance}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">Teaching Resources</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedContent.educationalResources.culturalContext.teachingResources.map((resource, index) => (
                                                <a
                                                    key={index}
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-3 py-1 bg-white border rounded-full text-sm hover:bg-blue-50"
                                                >
                                                    {resource.title}
                                                    <Tag className="ml-2" color="blue">{resource.type}</Tag>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Panel>

                            <Panel header="Curriculum Links" key="2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedContent.educationalResources.curriculumLinks.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block p-4 border rounded-lg hover:bg-gray-50"
                                        >
                                            <h5 className="font-medium text-blue-600">{link.platform}</h5>
                                            <p className="text-sm text-gray-600">{link.description}</p>
                                        </a>
                                    ))}
                                </div>
                            </Panel>

                            <Panel header="Lesson Plans" key="3">
                                {selectedContent.educationalResources.lessonPlans.map((plan, index) => (
                                    <Card key={index} className="mb-4" size="small">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-start">
                                                <h5 className="font-medium">{plan.title}</h5>
                                                <Tag color="green">{plan.duration}</Tag>
                                            </div>

                                            <div>
                                                <h6 className="text-sm font-medium mb-1">Objectives:</h6>
                                                <ul className="list-disc list-inside">
                                                    {plan.objectives.map((objective, idx) => (
                                                        <li key={idx} className="text-sm text-gray-600">{objective}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h6 className="text-sm font-medium mb-1">Activities:</h6>
                                                <ul className="list-disc list-inside">
                                                    {plan.activities.map((activity, idx) => (
                                                        <li key={idx} className="text-sm text-gray-600">{activity}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h6 className="text-sm font-medium mb-1">Assessment Ideas:</h6>
                                                <ul className="list-disc list-inside">
                                                    {plan.assessmentIdeas.map((idea, idx) => (
                                                        <li key={idx} className="text-sm text-gray-600">{idea}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </Panel>

                            <Panel header="Themes and Discussion" key="4">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Key Themes</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedContent.educationalResources.themes.map((theme, index) => (
                                                <Tag key={index} color="purple">{theme}</Tag>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">Discussion Questions</h4>
                                        <ul className="list-disc list-inside">
                                            {selectedContent.educationalResources.discussionQuestions.map((question, index) => (
                                                <li key={index} className="text-gray-600">{question}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Panel>
                        </Collapse>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AustralianContent; 