import { StyledFlexBox } from "../../../styles/Shared.styles";
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie, measureTextWidth } from '@ant-design/plots';

const Book = ({ showData }) => {
  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }

  const data = [
    {
      type: '電子獨家教材(訂閱)',
      value: showData.subscription_chaoyang,
    },
    {
      type: '電子課外書(訂閱)',
      value: showData.subscription_others,
    },
    {
      type: '電子獨家教材(免費)',
      value: showData.free_chaoyang,
    },
    {
      type: '電子課外書(免費)',
      value: showData.free_others,
    },
    {
      type: '實體教材',
      value: showData.physical_chaoyang,
    },
    {
      type: '實體課外書',
      value: showData.physical_others,
    },
  ];

  const config = {
    appendPadding: 0,
    padding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    width: 700,
    height: 250,
    meta: {
      value: {
        formatter: (v) => `${v} ¥`,
      },
    },
    label: {
      type: 'inner',
      padding: 100,
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? "" : '';
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? ` ${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
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
            書本種類統計
          </StyledFlexBox>
        </StyledFlexBox>
        <StyledFlexBox
          justifyContent="space-between"
          alignItems="center"
          height="fit-content"

        >
          {showData && showData.length != 0 ? <Pie {...config} className='chart' /> : ""}

        </StyledFlexBox>
      </div>

    </StyledFlexBox>
  );
};

export default Book;
