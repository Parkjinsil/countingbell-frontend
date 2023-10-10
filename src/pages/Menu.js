import React, {useState} from "react";
import styled from "styled-components";

import image11 from "../assets/111.png";
import image22 from "../assets/222.png";
import image33 from "../assets/333.png";

const Wrap = styled.div`
    text-align: center;
`;

const Section = styled.section`
    display: inline-block;
    width: 1270px;
    margin-bottom: 30px;  
}
`;

const MenuHeader = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1.5px solid #ffac95;
    margin-bottom: 10px;

    img {
        width: 80px;
        height: 75px;
        margin: 0 20px;
    }
    .menu-name {
        height: 65px;
        color: #FF5E33;
        font-size: 22px;
        font-weight: bolder;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    a {
        width: 80px;
        height: 75;
        font-size: 12px;
        margin-top: 5px;
        position: relative;
        color: rgba(8,8,8,.5);
        font-weight: 800;
    }
    a span::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 72px;
        right: 0;
        bottom: 0;
        background-image: url(../assets/222.png);
        background-size: 435px 414px;
        background-position: -35px -402px;
        background-repeat: no-repeat;
        width: 10px;
        height: 12px;
        margin: auto;
    }
    a span::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 61px;
        right: 0;
        bottom: 0;
        background-image: url(../assets/222.png);
        background-size: 435px 414px;
        background-position: -35px -402px;
        background-repeat: no-repeat;
        width: 10px;
        height: 12px;
        margin: auto;
    }    
`;

const MenuBody = styled.div`
    li{
        list-style-type: none;
        float: left;
    }
    a {
        text-decoration: none;
    }
    a:visited {
        color: black;
    }
    a:hover {
        text-decoration: underline;
    }
    .menu-img img{
        width: 214px;
        height: 185px;
        background-color: #ffac95;
        margin: 10px 20px;
        border-radius: 15px;
    }
    .menu-img img:hover {
        box-shadow: 0 3px 6px 0 rgba(0,0,0,.12);
        filter: brightness(0.9);
    }
`;

const MenuBodyFooter = styled.div`
    margin: 0 20px;
    position: relative;

    .restaurant-name {
        font-weight: bold;
        margin-bottom: 1px;
    }
    img {
        position: absolute;
        top: 17px;
        left: 23px;
    }
    span:nth-of-type(2) {
        margin-left: 19px;
        font-weight: bold;
    }
    .dot {
        color: rgba(8,8,8,.5);
        font-weight: 800;
    }
    span:nth-of-type(3) {
        color: #686969;
    }
    .dot::before {
        content: '';
        display: inline-block;
        width: 3px;
        height: 3px;
        background-color: #686969;
        margin: 9px 7px 0;
        border-radius: 50%;
        vertical-align: 5px;
    }
`;

const Menu = () => {
    const image1 = image11;
    const image2 = image22;
    const image3 = image33;

    return (
        <Wrap id="wrap">
            <Section className="menu" id="location-menu">
                <MenuHeader className="menu-header">
                    <img src={image1} alt="" />
                    <div className="menu-name">내 위치별 추천 식당</div>
                    <a href="restaurantList" ><span>전체보기</span></a>
                </MenuHeader>
                <MenuBody className="menu">
                    <ul>
                        <li>
                            <a href="#">
                                <div className="menu-img"><img src={image3} alt="" /></div>
                                <MenuBodyFooter className="menu-footer">
                                    <span className="restaurant-name">레스토랑스 강남점<br/></span>
                                    {/* <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fplay-lh.googleusercontent.com%2F7eeDvXkcJL21Uh6kZW7jpyAIXHmlxm8Do2iKpg8sW5H2EmGm-_lCp1YCho-HZPN-QQ&amp;type=a340" class="_image _listImage" data-org-width="340" data-org-height="340" alt="나만의 별점 매기기 - Google Play 앱" style="height: 17px; opacity: 1;">     */}
                                    <span>4.6</span>
                                    <span>이탈리아 음식</span><span className="dot">강남</span>
                                </MenuBodyFooter>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="menu-img"><img src={image3} alt="" /></div>
                                <MenuBodyFooter className="menu-footer">
                                    <span className="restaurant-name">레스토랑스 강남점<br/></span>
                                    {/* <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fplay-lh.googleusercontent.com%2F7eeDvXkcJL21Uh6kZW7jpyAIXHmlxm8Do2iKpg8sW5H2EmGm-_lCp1YCho-HZPN-QQ&amp;type=a340" class="_image _listImage" data-org-width="340" data-org-height="340" alt="나만의 별점 매기기 - Google Play 앱" style="height: 17px; opacity: 1;">     */}
                                    <span>4.6</span>
                                    <span>이탈리아 음식</span><span className="dot">강남</span>
                                </MenuBodyFooter>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="menu-img"><img src={image3} alt="" /></div>
                                <MenuBodyFooter className="menu-footer">
                                    <span className="restaurant-name">레스토랑스 강남점<br/></span>
                                    {/* <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fplay-lh.googleusercontent.com%2F7eeDvXkcJL21Uh6kZW7jpyAIXHmlxm8Do2iKpg8sW5H2EmGm-_lCp1YCho-HZPN-QQ&amp;type=a340" class="_image _listImage" data-org-width="340" data-org-height="340" alt="나만의 별점 매기기 - Google Play 앱" style="height: 17px; opacity: 1;">     */}
                                    <span>4.6</span>
                                    <span>이탈리아 음식</span><span className="dot">강남</span>
                                </MenuBodyFooter>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="menu-img"><img src={image3} alt="" /></div>
                                <MenuBodyFooter className="menu-footer">
                                    <span className="restaurant-name">레스토랑스 강남점<br/></span>
                                    {/* <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fplay-lh.googleusercontent.com%2F7eeDvXkcJL21Uh6kZW7jpyAIXHmlxm8Do2iKpg8sW5H2EmGm-_lCp1YCho-HZPN-QQ&amp;type=a340" class="_image _listImage" data-org-width="340" data-org-height="340" alt="나만의 별점 매기기 - Google Play 앱" style="height: 17px; opacity: 1;">     */}
                                    <span>4.6</span>
                                    <span>이탈리아 음식</span><span className="dot">강남</span>
                                </MenuBodyFooter>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="menu-img"><img src={image3} alt="" /></div>
                                <MenuBodyFooter className="menu-footer">
                                    <span className="restaurant-name">레스토랑스 강남점<br/></span>
                                    {/* <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fplay-lh.googleusercontent.com%2F7eeDvXkcJL21Uh6kZW7jpyAIXHmlxm8Do2iKpg8sW5H2EmGm-_lCp1YCho-HZPN-QQ&amp;type=a340" class="_image _listImage" data-org-width="340" data-org-height="340" alt="나만의 별점 매기기 - Google Play 앱" style="height: 17px; opacity: 1;">     */}
                                    <span>4.6</span>
                                    <span>이탈리아 음식</span><span className="dot">강남</span>
                                </MenuBodyFooter>
                            </a>
                        </li>
                    </ul>
                </MenuBody>
            </Section>
            <Section className="menu" id="hot-menu">
                <MenuHeader className="menu-header">
                    <img src={image1} alt=""/>
                    <div className="menu-name">식당 인기순 모음</div>
                    <a href="restaurantList" ><span>전체보기</span></a>
                </MenuHeader>
                <MenuBody className="menu">
                    <ul>
                        <li>
                            <a href="#">
                                <div className="menu-img"><img src={image3} alt=""/></div>
                                <MenuBodyFooter className="menu-footer">
                                    <span className="restaurant-name">레스토랑스 강남점<br/></span>
                                    {/* <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fplay-lh.googleusercontent.com%2F7eeDvXkcJL21Uh6kZW7jpyAIXHmlxm8Do2iKpg8sW5H2EmGm-_lCp1YCho-HZPN-QQ&amp;type=a340" class="_image _listImage" data-org-width="340" data-org-height="340" alt="나만의 별점 매기기 - Google Play 앱" style="height: 17px; opacity: 1;">     */}
                                    <span>4.6</span>
                                    <span>이탈리아 음식</span><span className="dot">강남</span>
                                </MenuBodyFooter>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="menu-img"><img src={image3} alt=""/></div>
                                <MenuBodyFooter className="menu-footer">
                                    <span className="restaurant-name">레스토랑스 강남점<br/></span>
                                    {/* <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fplay-lh.googleusercontent.com%2F7eeDvXkcJL21Uh6kZW7jpyAIXHmlxm8Do2iKpg8sW5H2EmGm-_lCp1YCho-HZPN-QQ&amp;type=a340" class="_image _listImage" data-org-width="340" data-org-height="340" alt="나만의 별점 매기기 - Google Play 앱" style="height: 17px; opacity: 1;">     */}
                                    <span>4.6</span>
                                    <span>이탈리아 음식</span><span className="dot">강남</span>
                                </MenuBodyFooter>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="menu-img"><img src={image3} alt=""/></div>
                                <MenuBodyFooter className="menu-footer">
                                    <span className="restaurant-name">레스토랑스 강남점<br/></span>
                                    {/* <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fplay-lh.googleusercontent.com%2F7eeDvXkcJL21Uh6kZW7jpyAIXHmlxm8Do2iKpg8sW5H2EmGm-_lCp1YCho-HZPN-QQ&amp;type=a340" class="_image _listImage" data-org-width="340" data-org-height="340" alt="나만의 별점 매기기 - Google Play 앱" style="height: 17px; opacity: 1;">     */}
                                    <span>4.6</span>
                                    <span>이탈리아 음식</span><span className="dot">강남</span>
                                </MenuBodyFooter>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="menu-img"><img src={image3} alt=""/></div>
                                <MenuBodyFooter className="menu-footer">
                                    <span className="restaurant-name">레스토랑스 강남점<br/></span>
                                    {/* <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fplay-lh.googleusercontent.com%2F7eeDvXkcJL21Uh6kZW7jpyAIXHmlxm8Do2iKpg8sW5H2EmGm-_lCp1YCho-HZPN-QQ&amp;type=a340" class="_image _listImage" data-org-width="340" data-org-height="340" alt="나만의 별점 매기기 - Google Play 앱" style="height: 17px; opacity: 1;">     */}
                                    <span>4.6</span>
                                    <span>이탈리아 음식</span><span className="dot">강남</span>
                                </MenuBodyFooter>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="menu-img"><img src={image3} alt=""/></div>
                                <MenuBodyFooter className="menu-footer">
                                    <span className="restaurant-name">레스토랑스 강남점<br/></span>
                                    {/* <img src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fplay-lh.googleusercontent.com%2F7eeDvXkcJL21Uh6kZW7jpyAIXHmlxm8Do2iKpg8sW5H2EmGm-_lCp1YCho-HZPN-QQ&amp;type=a340" class="_image _listImage" data-org-width="340" data-org-height="340" alt="나만의 별점 매기기 - Google Play 앱" style="height: 17px; opacity: 1;">     */}
                                    <span>4.6</span>
                                    <span>이탈리아 음식</span><span className="dot">강남</span>
                                </MenuBodyFooter>
                            </a>
                        </li>
                    </ul>
                </MenuBody>
            </Section>
        </Wrap>
    );
};
export default Menu;
