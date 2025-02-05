import React, { useState } from 'react';
import { Card, Tabs, List, Tag, Space, Input, Select, Button, message, Collapse } from 'antd';
import { FileTextOutlined, VideoCameraOutlined, BookOutlined, LinkOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { australianPlays, australianMovies, educationalPlatforms } from '../../models/AustralianContent';

const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;

// Add Australian cultural patterns
const culturalPatterns = {
    header: `linear-gradient(rgba(0, 0, 51, 0.8), rgba(0, 0, 51, 0.8)),
             url('https://www.flagmakers.com.au/wp-content/uploads/2017/12/australian-flag-2.jpg')`,
    indigenous: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="%23CD853F" stroke-width="2" fill="none"/></svg>')`
};

const AustralianContent = ({ onSelectContent }) => {
    const [plays, setPlays] = useState(australianPlays);
    const [movies, setMovies] = useState(australianMovies);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [yearFilter, setYearFilter] = useState('all');
    const [ratingFilter, setRatingFilter] = useState('all');
    const [regionFilter, setRegionFilter] = useState('Australia');
    const [selectedContent, setSelectedContent] = useState(null);
    const [themeFilter, setThemeFilter] = useState([]);
    const [genreFilter, setGenreFilter] = useState('all');
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');

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
            const matchesThemes = themeFilter.length === 0 ||
                themeFilter.every(theme => item.themes.includes(theme));
            const matchesGenre = genreFilter === 'all' || item?.category === genreFilter;

            return matchesYear && matchesRating && matchesRegion && matchesThemes && matchesGenre;
        }).sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            }
            return a[sortBy] < b[sortBy] ? 1 : -1;
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

    // Add styled header component
    const AustralianHeader = () => (
        <div
            className="relative mb-6 p-8 rounded-lg text-white"
            style={{
                background: culturalPatterns.header,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-red-900/70 rounded-lg"></div>
            <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-2">Australian Educational Content</h1>
                <p className="text-lg opacity-90">
                    Discover Australia's rich cultural heritage through films and theatrical works
                </p>
                <div className="flex gap-4 mt-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-sm font-semibold">{plays.length}</p>
                        <p className="text-xs">Australian Plays</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-sm font-semibold">{movies.length}</p>
                        <p className="text-xs">Australian Films</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-sm font-semibold">{Object.keys(educationalPlatforms).length}</p>
                        <p className="text-xs">Learning Platforms</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // Modify the card rendering to include cultural elements
    const renderContentList = (content, type) => (
        <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
            dataSource={filterContent(content)}
            loading={loading}
            renderItem={item => (
                <List.Item>
                    <Card
                        hoverable
                        className={`h-full transform transition-all duration-300 hover:scale-105 
                            ${selectedContent?.id === item.id ? 'border-blue-500 shadow-lg' : ''}`}
                        style={{
                            backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.95), rgba(255,255,255,0.98))',
                            backgroundSize: '100% 100%'
                        }}
                        onClick={() => handleContentSelect(item)}
                    >
                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium text-navy-800">{item.title}</h3>
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
                        <div className="absolute top-0 right-0 w-12 h-12 opacity-10"
                            style={{
                                backgroundImage: culturalPatterns.indigenous,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />
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

    const allThemes = [...new Set([
        ...australianPlays.flatMap(p => p.themes),
        ...australianMovies.flatMap(m => m.themes)
    ])].sort();

    const genres = [...new Set([
        'all',
        ...australianPlays.map(p => p.category),
        ...australianMovies.map(m => m.category)
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
            <AustralianHeader />

            <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-sm">
                <Space wrap>
                    <Select
                        value={regionFilter}
                        onChange={setRegionFilter}
                        style={{ width: 150 }}
                        placeholder="Select Region"
                    >
                        <Option value="all">All Regions</Option>
                        {regions.filter(r => r !== 'all' && r).map(region => (
                            <Option key={region} value={region}>{region}</Option>
                        ))}
                    </Select>

                    <Select
                        value={ratingFilter}
                        onChange={setRatingFilter}
                        style={{ width: 120 }}
                        placeholder="Rating"
                    >
                        <Option value="all">All Ratings</Option>
                        {ratings.filter(r => r !== 'all' && r).map(rating => (
                            <Option key={rating} value={rating}>{rating}</Option>
                        ))}
                    </Select>

                    <Select
                        mode="multiple"
                        value={themeFilter}
                        onChange={setThemeFilter}
                        style={{ width: 200 }}
                        placeholder="Select Themes"
                        maxTagCount={2}
                    >
                        {allThemes.map(theme => (
                            <Option key={theme} value={theme}>{theme}</Option>
                        ))}
                    </Select>

                    <Select
                        value={genreFilter}
                        onChange={setGenreFilter}
                        style={{ width: 150 }}
                        placeholder="Select Genre"
                    >
                        <Option value="all">All Genres</Option>
                        {genres.filter(g => g !== 'all').map(genre => (
                            <Option key={genre} value={genre}>{genre}</Option>
                        ))}
                    </Select>

                    <Select
                        value={yearFilter}
                        onChange={setYearFilter}
                        style={{ width: 120 }}
                        placeholder="Year"
                    >
                        <Option value="all">All Years</Option>
                        {years.map(year => (
                            <Option key={year} value={year}>{year}</Option>
                        ))}
                    </Select>

                    <Select
                        value={sortBy}
                        onChange={setSortBy}
                        style={{ width: 120 }}
                        placeholder="Sort By"
                    >
                        <Option value="title">Title</Option>
                        <Option value="year">Year</Option>
                        <Option value="rating">Rating</Option>
                    </Select>

                    <Button
                        onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                        icon={sortOrder === 'asc' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    />

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