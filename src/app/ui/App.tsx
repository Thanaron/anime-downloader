import React from 'react';
import {
    Layout,
    Input,
    List,
    Typography,
    Divider,
    Table,
    Popover,
    Button,
    Select,
    Badge,
    Tooltip,
} from 'antd';
import { SearchListEntry } from './components/SearchListEntry/SearchListEntry';
import {
    EllipsisOutlined,
    MenuOutlined,
    HeartOutlined,
    DownloadOutlined,
} from '@ant-design/icons';
import TitleBar from 'frameless-titlebar';
import './App.less';
import { Option } from 'antd/lib/mentions';

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

    const tableData = [
        {
            episode: 1,
            resolution: '1080p',
            size: '730 MB',
        },
        {
            episode: 1,
            resolution: '1080p',
            size: '730 MB',
        },
        {
            episode: 1,
            resolution: '1080p',
            size: '730 MB',
        },
        {
            episode: 1,
            resolution: '1080p',
            size: '730 MB',
        },
        {
            episode: 1,
            resolution: '1080p',
            size: '730 MB',
        },
        {
            episode: 1,
            resolution: '1080p',
            size: '730 MB',
        },
        {
            episode: 1,
            resolution: '1080p',
            size: '730 MB',
        },
        {
            episode: 1,
            resolution: '1080p',
            size: '730 MB',
        },
        {
            episode: 1,
            resolution: '1080p',
            size: '730 MB',
        },
    ];

    const tableColumns = [
        {
            title: 'Episode',
            dataIndex: 'episode',
            key: 'episode',
        },
        {
            title: 'Resolution',
            dataIndex: 'resolution',
            key: 'resolution',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
    ];

    const currentWindow = remote.getCurrentWindow();

    const menu = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Exit',
                },
            ],
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Preferences',
                },
            ],
        },
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
        {
            label: 'Help',
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
                    <div style={{ height: 40 }} className="SiderHeader">
                        {
                            <div
                                style={{
                                    position: 'absolute',
                                    left: '5px',
                                    top: '9px',

                                    verticalAlign: 'middle',
                                }}
                            >
                                <Badge dot>
                                    <Button>
                                        <DownloadOutlined
                                            style={{ fontSize: 20 }}
                                        />
                                    </Button>
                                </Badge>
                            </div>
                        }

                        {
                            <MenuOutlined
                                style={{
                                    position: 'absolute',
                                    right: '5px',
                                    top: '12px',
                                    fontSize: '20px',
                                    verticalAlign: 'middle',
                                }}
                            />
                        }
                    </div>

                    <div>
                        <div
                            style={{
                                margin: '1em',
                                width: '90%',
                            }}
                        >
                            <Popover
                                content={
                                    <Select>
                                        <Option>Test</Option>
                                    </Select>
                                }
                                title="T"
                            >
                                <Search
                                    placeholder="Placeholder"
                                    onSearch={(value) => console.log(value)}
                                />
                            </Popover>
                        </div>

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
                                maxWidth: '50vw',
                            }}
                            level={1}
                        >
                            Boku no Hero Academia 2{' '}
                            <Text
                                style={{ fontSize: '24px', color: '#81A1C1' }}
                            >
                                2017
                            </Text>
                        </Title>
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '0em',
                                right: '0.3em',
                                color: '#a3be8c',
                            }}
                        >
                            <Text strong style={{ color: 'inherit' }}>
                                90%{' '}
                            </Text>
                            <Text>Community Approval</Text>
                        </div>
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
                                        padding: 5,
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <Text
                                        strong
                                        style={{
                                            color: '#ECEFF4',
                                            width: '35%',
                                        }}
                                    >
                                        English (American)
                                    </Text>

                                    <Text
                                        style={{
                                            color: '#D8DEE9',
                                            width: '65%',
                                            display: 'inlineFlex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        &nbsp;{item.value}
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
                        {/* <div style={{ paddingTop: '20px' }}>
                            <Table
                                style={{
                                    height: '100vh',
                                }}
                                size="small"
                                dataSource={tableData}
                                columns={tableColumns}
                            ></Table>
                        </div> */}
                    </div>
                </Content>
            </Layout>
            {/* <Button style={{
                position: 'absolute',
                left: '50%',
                marginLeft: '-50px',
                bottom: '1em',
                backgroundColor: '#d08770',
                borderRadius: '20px',
                padding: '20px !important',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#4c566a'
            }}>Download 4 Videos</Button> */}
        </div>
    );
}

export default App;
