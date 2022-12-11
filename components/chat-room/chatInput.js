import { Row, Col, Card, Affix } from 'antd';

export default function ChatInput() {
    return <div style={{
        maxHeight: '10vh'
    }}>
        <Affix offsetBottom={0}>
            <Row>
                <Col span={24}>
                    <Card>
                        TEXT HERE...
                    </Card>
                </Col>
            </Row>
        </Affix>
    </div>
}
