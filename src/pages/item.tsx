import React, {FC} from 'react';
import styles from './item.less';
import { Row, Col, Radio, Card } from 'antd';
import { connect, ConnectProps, ItemModelState } from 'umi'

function Item({item, dispatch}) {
  const {items = [], filterKey = 0} = item;
  const RadioGroup = Radio.Group;
  const onChange = e => {
    console.log(e.target.value);
    dispatch({
      type:'item/save',
      payload:{
        filterKey:e.target.value,
      },
    });
  };
  const itemType = [
    { key: 0, value: '全部' },
    { key: 1, value: '攻击' },
    { key: 2, value: '法术' },
    { key: 3, value: '防御' },
    { key: 4, value: '移动' },
    { key: 5, value: '打野' },
    { key: 7, value: '辅助' },
  ];
  return (
    <div>
      <Card className={styles.radioPanel}>
        <RadioGroup onChange={onChange} value={filterKey}>
          {itemType.map(item => (
            <Radio value={item.key} key={`item-radio-${item.key}`}>
            {item.value}
            </Radio>
          ))}
        </RadioGroup>
      </Card>
      <Row>
        {items.filter(item => filterKey === 0 || item.item_type == filterKey).map(item => (
          <Col key={item.item_id} span={3} className={styles.item}>
           <img src={`https://game.gtimg.cn/images/yxzj/img201606/itemimg/${item.item_id}.jpg`} />
           <p>{item.item_name}</p>
          </Col>
        ))}
      </Row>
    </div>
  ); 
}

export default connect(({ item }) => ({item}))(Item);
