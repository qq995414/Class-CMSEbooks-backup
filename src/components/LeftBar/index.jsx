import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import { Link, useLocation } from "react-router-dom";
import { Fragment } from "react";
import { Divider } from "@mui/material";

const LEFT_BAR_ITEMS = [
  {
    text: "總覽",
    link: "/home",
    icon: "/images/icon-home.svg",
    activeIcon: "/images/icon-home-active.svg",
  },
  {
    text: "圖書管理",
    link: "/book-manage",
    icon: "/images/icon-bookManage.svg",
    activeIcon: "/images/icon-bookManage-active.svg",
  },
  {
    text: "圖書分類設定",
    link: "/book-category",
    icon: "/images/icon-bookCategory.svg",
    activeIcon: "/images/icon-bookCategory-active.svg",
  },
  {
    text: "教材開放設定",
    link: "/opening",
    icon: "/images/icon-opening.svg",
    activeIcon: "/images/icon-opening-active.svg",
  },
  {
    text: "會員管理",
    link: "/member",
    icon: "/images/icon-member.svg",
    activeIcon: "/images/icon-member-active.svg",
  },
  /*{
    text: "訂閱付款管理",
    link: "/payment",
    icon: "/images/icon-payment.svg",
    activeIcon: "/images/icon-payment-active.svg",
  },*/
  {
    text: "新進訂單通知",
    link: "/notice",
    icon: "/images/icon-notice.svg",
    activeIcon: "/images/icon-notice-active.svg",
  },
  {
    text: "請款申請管理",
    link: "/invoice",
    icon: "/images/icon-invoice.svg",
    activeIcon: "/images/icon-invoice-active.svg",
  },
  {
    text: "消息管理",
    link: "/info",
    icon: "/images/icon-info.svg",
    activeIcon: "/images/icon-info-active.svg",
  },
  {
    text: "優惠券管理",
    link: "/coupon",
    icon: "/images/icon-coupon.svg",
    activeIcon: "/images/icon-coupon-active.svg",
  },
  {
    text: "經銷商優惠",
    link: "/dealer-discount",
    icon: "/images/icon-dealerDiscount.svg",
    activeIcon: "/images/icon-dealerDiscount-active.svg",
  },
  {
    text: "經銷商管理",
    link: "/dealer-manage",
    icon: "/images/icon-dealerManage.svg",
    activeIcon: "/images/icon-dealerManage-active.svg",
  },
  {
    text: "後台管理設定",
    link: "/settings",
    icon: "/images/icon-settings.svg",
    activeIcon: "/images/icon-settings-active.svg",
  },
];
const LeftBar = () => {
  const { pathname } = useLocation();

  return (
    <StyledFlexBox
      bg="#fff"
      pt={16}
      height="100%"
      position="fixed"
      width={180}
      top={52}
      flexDirection="column"
    >
      {LEFT_BAR_ITEMS.map((item, index) => {
        const isActive =
          item.link === "/"
            ? item.link === pathname
            : pathname.includes(item.link);

        return (
          <Fragment key={item.text}>
            <Link to={item.link}>
              <StyledFlexBox
                pl={20}
                fontSize={14}
                color={isActive ? "#fff" : "#a7a7a7"}
                height={50}
                alignItems="center"
                bg={isActive ? "#8c9eff" : "inherit"}
              >
                <StyledImage
                  src={isActive ? item.activeIcon : item.icon}
                  mr="12px"
                />
                {item.text}
              </StyledFlexBox>
            </Link>
            {(index === 3 || index === 7) && (
              <Divider sx={{ my: "7px", bg: "#E9E9E9" }} />
            )}
          </Fragment>
        );
      })}
    </StyledFlexBox>
  );
};

export default LeftBar;
