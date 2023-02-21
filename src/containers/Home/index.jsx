import Header from "../../components/Header";
import LeftBar from "../../components/LeftBar";
import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import Book from "./Book";
import Order from "./Order";
import Profit from "./Profit";
import Subscribe from "./Subscribe";
import { fetchOrverview } from "../../api/User";
import { useEffect, useState } from "react";
import { useUpdateEffect } from 'usehooks-ts'
import { useEffectOnce } from 'usehooks-ts'

const Home = () => {
  const [data, setData] = useState([]);
  const [unit, setUnit] = useState("day");
  const [profitData, setprofitData] = useState([]);
  const [load, setLoad] = useState(0);
  const [SubscribeUnit, setSubscribeUnit] = useState("day");
  const [OrderUnit, setOrderUnit] = useState("day");
  useEffectOnce(() => {
    fetchOrverview({ profit_statistics_type: unit, subscription_statistics_type: SubscribeUnit, order_statistics_type: OrderUnit }).then((res) => {
      setData(res.data[0])


    });
  })


  useUpdateEffect(() => {
    (async () => {
      fetchOrverview({ profit_statistics_type: unit, subscription_statistics_type: SubscribeUnit, order_statistics_type: OrderUnit }).then((res) => {
        setData(res.data[0])

      });
    })()
    setprofitData([])
  }, [SubscribeUnit, OrderUnit])

  return (
    <>
      <Header />
      <LeftBar />
      <StyledFlexBox
        top={50}
        left={180}
        pt={40}
        px={50}
        flexDirection="column"
        maxWidth="calc(100% - 180px)"
        overflowX="auto"
        overflowY="auto"
        maxHeight="calc(100vh - 50px)"
      >
        <StyledFlexBox fontSize={24} fontWeight={700} mb={32} color="#242731">
          總覽
        </StyledFlexBox>
        <StyledFlexBox
          minWidth={1144}
          height={140}
          bg="#fff"
          borderRadius="10px"
          justifyContent="space-around"
          alignItems="center"
        >
          <StyledFlexBox flexDirection="column" py={30}>
            <StyledFlexBox
              fontSize={20}
              fontWeight={700}
              color="#242731"
              mb={2}
              pt={2}
              lineHeight="26px"
            >
              本日獲利
            </StyledFlexBox>
            <StyledFlexBox
              fontSize={18}
              fontWeight={500}
              color="#5055D6"
              alignItems="flex-end"
              mb={24}
              lineHeight="23px"
            >
              ${data && data.daliy_profit}
              <StyledFlexBox
                fontSize={12}
                fontWeight={500}
                color="#A4A5A6"
                ml="5px"
                lineHeight="15.6px"
              >
                元
              </StyledFlexBox>
            </StyledFlexBox>
            <StyledFlexBox fontSize={14} fontWeight={500} color="#72767C">
              比昨日{data.profit_increase >= 1 ? "增加" : "減少"}{data && String(parseFloat(data.profit_increase).toFixed(1)).substr(1, String(parseFloat(data.profit_increase).toFixed(1)).length)}%
            </StyledFlexBox>
          </StyledFlexBox>
          <StyledFlexBox height={72} alignItems="center" >
            <StyledFlexBox
              width={56}
              height={56}
              borderRadius="50%"
              bg={"#A3D951"}
              justifyContent="center"
              alignItems="center"
              mr="16px"
            >
              <StyledImage src="/images/icon-book.svg" />
            </StyledFlexBox>
            <StyledFlexBox flexDirection="column">
              <StyledFlexBox fontSize={16} color="#7c7c7c" mb="4px">
                書本總數
              </StyledFlexBox>
              <StyledFlexBox fontSize={28} fontWeight={700} color="#252525">
                {data && data.book_total}
              </StyledFlexBox>
            </StyledFlexBox>
          </StyledFlexBox>
          <StyledFlexBox height={72} alignItems="center" >
            <StyledFlexBox
              width={56}
              height={56}
              borderRadius="50%"
              bg={"#8C9EFF"}
              justifyContent="center"
              alignItems="center"
              mr="16px"
            >
              <StyledImage src="/images/icon-profile.svg" />
            </StyledFlexBox>
            <StyledFlexBox flexDirection="column">
              <StyledFlexBox fontSize={16} color="#7c7c7c" mb="4px">
                會員總數
              </StyledFlexBox>
              <StyledFlexBox fontSize={28} fontWeight={700} color="#252525">
                {data && data.member_total}
              </StyledFlexBox>
            </StyledFlexBox>
          </StyledFlexBox>
          <StyledFlexBox height={72} alignItems="center" >
            <StyledFlexBox
              width={56}
              height={56}
              borderRadius="50%"
              bg="#FF8956"
              justifyContent="center"
              alignItems="center"
              mr="16px"
            >
              <StyledImage src="/images/icon-bookmarks.svg" />
            </StyledFlexBox>
            <StyledFlexBox flexDirection="column">
              <StyledFlexBox fontSize={16} color="#7c7c7c" mb="4px">
                訂閱總數
              </StyledFlexBox>
              <StyledFlexBox fontSize={28} fontWeight={700} color="#252525">
                {data && data.subscription_total}
              </StyledFlexBox>
            </StyledFlexBox>
          </StyledFlexBox>
          <StyledFlexBox height={72} alignItems="center" >
            <StyledFlexBox
              width={56}
              height={56}
              borderRadius="50%"
              bg="#13C2C2"
              justifyContent="center"
              alignItems="center"
              mr="16px"
            >
              <StyledImage src="/images/icon-bookmarks.svg" />
            </StyledFlexBox>
            <StyledFlexBox flexDirection="column">
              <StyledFlexBox fontSize={16} color="#7c7c7c" mb="4px">
                本日訂單數
              </StyledFlexBox>
              <StyledFlexBox fontSize={28} fontWeight={700} color="#252525">
                {data && data.daliy_order}
              </StyledFlexBox>
            </StyledFlexBox>
          </StyledFlexBox>
        </StyledFlexBox>
        <StyledFlexBox mt={32} minWidth={1141} justifyContent="space-between">
          {data.profit_statistics && <Profit showData={data?.profit_statistics} setUnit={setUnit} unit={unit} OrderUnit={OrderUnit} SubscribeUnit={SubscribeUnit} />}

          {data.book_statistics && <Book showData={data?.book_statistics} />}

        </StyledFlexBox>
        <StyledFlexBox mt={32} minWidth={1141} pb={20} justifyContent="space-between">
          {data.subscription_statistics && <Subscribe data={data.subscription_statistics} unit={SubscribeUnit} setUnit={setSubscribeUnit} />}
          {data.order_statistics && <Order data={data.order_statistics} unit={OrderUnit} setUnit={setOrderUnit} />}
        </StyledFlexBox>
      </StyledFlexBox>
    </>
  );
};

export default Home;
