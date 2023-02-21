import { useState, useEffect } from 'react';
import { StyledFlexBox } from "../../../styles/Shared.styles";
import { Area } from '@ant-design/plots';
const Subscribe = ({ data, unit, setUnit }) => {
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

  const config = {
    data,
    xField: 'date',
    yField: 'result',
    width: 600,
    height: 200,
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
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
            訂閱數統計
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
                onClick={() => setUnit(item.value)}
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
        >
          <Area {...config} className='chart' />

        </StyledFlexBox>
      </div>

    </StyledFlexBox>
  );
};

export default Subscribe;
