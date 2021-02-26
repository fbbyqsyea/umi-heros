import React, { FC } from 'react';
import styles from './summoner.less';
import { Row, Col } from 'antd';
import { connect, ConnectProps, summonerModelState } from 'umi'

interface PageProps extends ConnectProps {
  summoner:SummonerModelState;
}

const Summoner:FC<PageProps> = (props) => {
  const { summoners = [] } = props.summoner;
  return (
    <div>
      <Row>
        {summoners.map(item => (
          <Col key={item.summoner_id} span={3} className={styles.summoneritem}>
            <img src={`https://game.gtimg.cn/images/yxzj/img201606/summoner/${item.summoner_id}.jpg`} />
            <p>{item.summoner_name}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default connect(({ summoner }:{summoner:summonerModelState}) => ({summoner}))(Summoner)