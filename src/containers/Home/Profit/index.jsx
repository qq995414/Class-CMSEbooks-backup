import { useState, useEffect } from 'react';
import { StyledFlexBox } from "../../../styles/Shared.styles";
import { Column } from '@ant-design/plots';
import { fetchOrverview } from "../../../api/User";

const Profit = ({ showData, setUnit, unit, OrderUnit, SubscribeUnit }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchOrverview({ profit_statistics_type: unit, subscription_statistics_type: SubscribeUnit, order_statistics_type: OrderUnit }).then((res) => {
      setData(res.data[0].profit_statistics)


    });
  }, [])
  useEffect(() => {
    (async () => {
      fetchOrverview({ profit_statistics_type: unit, subscription_statistics_type: SubscribeUnit, order_statistics_type: OrderUnit }).then((res) => {
        setData(res.data[0].profit_statistics)

      });
    })()
  }, [unit])

  const ITEMS = [
    {
      text: "每日",
      value: "day",
    },
    {
      text: "每週",
      value: "week",
    },
    {
      text: "每月",
      value: "month",
    },
  ];
  const onUnitChange = (value) => {
    setUnit(value);
  };


  const config = {
    data,
    isStack: true,
    xField: 'date',
    height: 200,
    width: "100%",
    yField: 'value',
    seriesField: 'type',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };
  return (
    <StyledFlexBox
      bg="#fff"
      borderRadius="16px"
      p={32}
      width={"49%"}
      height={313}
    >
      <div style={{ width: "100%" }}>

        <StyledFlexBox
          justifyContent="space-between"
          alignItems="center"
          height="fit-content"
          width="100%"
        >
          <StyledFlexBox color="#0D0E12" fontSize={20}>
            利潤統計
          </StyledFlexBox>
          <StyledFlexBox>
            {ITEMS.map((item, index) => (
              <StyledFlexBox
                cursor="pointer"
                key={item.value}
                bg="#f6f6f6"
                py="6px"
                px="12px"
                color={unit === item.value ? "#4F4F4F" : "#bdbdbd"}
                fontSize={14}
                height={32}
                fontWeight={unit === item.value ? 700 : 400}
                alignItems="center"
                {...(index !== 0 && {
                  borderLeft: "1px solid rgba(83, 90, 101, 0.2)",
                })}
                {...(index === 0 && {
                  borderTopLeftRadius: "4px",
                  borderBottomLeftRadius: "4px",
                })}
                {...(index === ITEMS.length - 1 && {
                  borderTopRightRadius: "4px",
                  borderBottomRightRadius: "4px",
                })}
                onClick={() => onUnitChange(item.value)}
              >
                {item.text}
              </StyledFlexBox>
            ))}
          </StyledFlexBox>

        </StyledFlexBox>
        <StyledFlexBox
          justifyContent="space-between"
          alignItems="center"
          height="fit-content"
          width="100%"
          pt={20}
        >{console.log(showData[0].date)}
          {
            showData && showData.length !== 0 ? < Column {...config} className='chart' /> : ""
          }
        </StyledFlexBox>

      </div>

    </StyledFlexBox>
  );
};

export default Profit;
