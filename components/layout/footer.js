import { Row, Col } from 'antd';
import styles from './layout.module.css';

export default function PageFooter() {
    return <div>
        <Row>
            <Col span={24} className={styles.footer}>
                <p>Made By Vidushi</p>
            </Col>
        </Row>
    </div>
}