import React from 'react';
import { Avatar, Typography } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

export const SearchListEntry = (props: any) => {
    const { avatar, title, type, rating, year, isFavorite } = props;
    return (
        <div>
            {isFavorite && (
                <div
                    style={{
                        position: 'relative',
                        top: '-9px',
                        right: '5px',
                        float: 'right',
                        height: '14px',
                        width: '14px',
                    }}
                >
                    <HeartOutlined style={{ color: '#BF616A' }} />
                </div>
            )}
            <div
                style={{
                    padding: '.6em',
                    paddingLeft: '.8em',
                    display: 'flex',
                }}
            >
                <div
                    style={{
                        paddingRight: '.5em',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Avatar shape="square" size="large" src={avatar} />
                </div>
                <div style={{ width: '220px' }}>
                    <Paragraph
                        strong={true}
                        style={{ marginBottom: '0', fontSize: '16px' }}
                        ellipsis
                    >
                        {title}
                    </Paragraph>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Text
                            style={{
                                flex: '1 0 18%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            type="secondary"
                        >
                            {type}
                        </Text>
                        <div
                            style={{
                                flex: '1 0 18%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '8px',
                            }}
                        >
                            ⬤
                        </div>
                        <Text
                            style={{
                                flex: '1 0 18%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            type="secondary"
                        >
                            {year}
                        </Text>
                        <div
                            style={{
                                flex: '1 0 18%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '8px',
                            }}
                        >
                            ⬤
                        </div>
                        <Text
                            style={{
                                flex: '1 0 18%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            type="secondary"
                        >
                            {rating}%
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};
