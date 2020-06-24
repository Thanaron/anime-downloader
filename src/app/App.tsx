import React from 'react';
import { Layout, Input, List, Typography, Divider, Table } from 'antd';
import { SearchListEntry } from './components/SearchListEntry/SearchListEntry';
import { EllipsisOutlined } from '@ant-design/icons';
import TitleBar from 'frameless-titlebar';
import './App.less';

const { remote } = window.require('electron');

const { Sider, Content } = Layout;
const { Search } = Input;
const { Title, Paragraph, Text } = Typography;

function App() {
    const data = [
        {
            key: 'English',
            value: 'My Hero Academia 2',
        },
        {
            key: 'Japanese',
            value: '僕のヒーローアカデミア 2ndシーズン',
        },
    ];

    const currentWindow = remote.getCurrentWindow();

    const menu = [
        {
            label: 'Debug',
            submenu: [
                {
                    label: 'Open DevTools',
                    click: () => {
                        currentWindow.webContents.openDevTools();
                    },
                },
            ],
        },
    ];

    return (
        <div>
            <TitleBar
                theme={{ bar: { background: '#2E3440', borderBottom: '0' } }}
                menu={menu}
                onClose={() => currentWindow.close()}
                onMinimize={() => currentWindow.minimize()}
                onMaximize={() => {
                    if (currentWindow.isMaximized()) {
                        currentWindow.unmaximize();
                        return;
                    }
                    currentWindow.maximize();
                }}
                onDoubleClick={() => currentWindow.maximize()}
            />
            <Layout
                className="App"
                style={{ height: '100%' }}
                draggable={false}
            >
                <Sider width="300" draggable="true" className="Sider">
                    <div style={{ height: 40 }}>
                        <EllipsisOutlined
                            style={{ width: 40, height: 40 }}
                            rotate={90}
                        />
                    </div>
                    <Divider />
                    <div>
                        <Search
                            placeholder="Placeholder"
                            onSearch={(value) => console.log(value)}
                            style={{
                                margin: '1em',
                                width: '90%',
                            }}
                        />
                        <List
                            itemLayout="vertical"
                            dataSource={data}
                            style={{
                                height: 'calc(100vh - 110px)',
                                boxSizing: 'border-box',
                                overflowY: 'auto',
                            }}
                            renderItem={(item) => (
                                <List.Item>
                                    <SearchListEntry
                                        avatar="https://media.kitsu.io/anime/poster_images/13600/tiny.jpg?1515605847"
                                        title="Lorem ipsum dolor sit amet, consectetaur adipisicing elit"
                                        type="Movie"
                                        rating="83.40"
                                        year={
                                            Math.floor(
                                                Math.random() * (2020 - 2000)
                                            ) + 2000
                                        }
                                        isFavorite={true}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Sider>
                <Content>
                    <div style={{ position: 'relative' }}>
                        <div
                            style={{
                                boxShadow:
                                    'inset 0 -100px 30px -20px rgba(0,0,0,0.5)',
                                height: '25vh',
                            }}
                        >
                            <img
                                style={{
                                    opacity: '0.3',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    overflow: 'hidden',
                                }}
                                src="https://media.kitsu.io/anime/cover_images/13600/small.jpg?1519181113"
                            />
                        </div>
                        <Title
                            style={{
                                position: 'absolute',
                                bottom: '-.5em',
                                left: '.2em',
                                color: '#ECEFF4',
                                maxWidth: '40vw',
                            }}
                            level={1}
                        >
                            Lorem ipsum dolor sit amet{' '}
                            <Text
                                style={{ fontSize: '24px', color: '#81A1C1' }}
                            >
                                2017
                            </Text>
                        </Title>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <List
                            style={{
                                width: '300px',
                                backgroundColor: 'none',
                                position: 'absolute',
                                right: 5,
                                top: 5,
                                color: 'white',
                            }}
                            header="Anime Details"
                            size="small"
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item
                                    style={{
                                        borderBottom: '0px',
                                        padding: '5px',
                                    }}
                                >
                                    <Text strong style={{ color: '#ECEFF4' }}>
                                        {item.key}
                                    </Text>{' '}
                                    <Text
                                        style={{
                                            color: '#D8DEE9',
                                        }}
                                        ellipsis
                                    >
                                        {item.value}
                                    </Text>
                                </List.Item>
                            )}
                        />
                    </div>
                    <div
                        style={{
                            width: 'calc(100% - 300px)',
                            padding: 20,
                        }}
                    >
                        {/* <div
                            style={{
                                backgroundColor: '#4C566A',
                                padding: '15px',
                                borderRadius: '20px',
                            }}
                        >
                            <Paragraph style={{ color: '#D8DEE9' }}>
                                At U.A. Academy, not even a violent attack can
                                disrupt their most prestigious event: the school
                                sports festival. Renowned across Japan, this
                                festival is an opportunity for aspiring heroes
                                to showcase their abilities, both to the public
                                and potential recruiters.
                            </Paragraph>
                            <Paragraph style={{ color: '#D8DEE9' }}>
                                However, the path to glory is never easy,
                                especially for Izuku Midoriya—whose quirk
                                possesses great raw power but is also
                                cripplingly inefficient. Pitted against his
                                talented classmates, such as the fire and ice
                                wielding Shouto Todoroki, Izuku must utilize his
                                sharp wits and master his surroundings to
                                achieve victory and prove to the world his
                                worth.
                            </Paragraph>
                        </div> */}
                        <div style={{ paddingTop: '20px' }}>
                            <Table
                                style={{
                                    height: '100vh',
                                }}
                            ></Table>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    );
}

export default App;
