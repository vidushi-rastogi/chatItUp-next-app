import React, { useState } from "react";
import { SyncOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import styles from './shared-components.module.css';

const Refresh = ({flag, setFlag}) => {
    const [spin, setSpin] = useState(false);

    const handleRefresh = () => {
        setSpin(true);
        if (flag) {
            setFlag(false);
        }
        else {
            setFlag(true);
        }

        setTimeout(() => {
            setSpin(false);
        }, 1000)
    }

    return <Tooltip title='Refresh'>
        <SyncOutlined
            spin={spin} 
            onClick={handleRefresh} 
            className={styles.icons}/>
    </Tooltip>
}

export default Refresh;