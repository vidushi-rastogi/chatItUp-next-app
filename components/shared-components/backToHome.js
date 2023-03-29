import React from 'react';
import { Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './shared-components.module.css';

const BackToHome = () => (
    <Tooltip title='Back'>
        <ArrowLeftOutlined onClick={() => window.location.href = '/'} className={styles.icons} />
    </Tooltip>
)

export default BackToHome;