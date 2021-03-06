import React, { useState } from 'react';
import Image from 'next/image'
import styles from '../styles/components/pagewrapper.module.less'
import classNames from 'classnames';

import { Layout, Menu, Breadcrumb, Button,Divider, Col } from 'antd';
const { Header, Content, Sider } = Layout;
import { UserOutlined, VideoCameraOutlined,MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';

import {LightningBoltIcon,HomeIcon,SwitchHorizontalIcon,ArrowCircleRightIcon} from '@heroicons/react/outline';
import Link from 'next/link'

import Row from 'components/common/row'

import WalletConnectBtn from 'components/wallet/connectbtn'
import N1SBtn from 'components/header/n1s'
import LanguageBtn from 'components/language/btn'
import MoreBtn from 'components/header/more'
import Footer from 'components/common/footer'
import { BrowserView, MobileView, isMobile} from "react-device-detect";

import Head from 'next/head'

import { withRouter,useRouter } from 'next/router'
import {t} from 'helper/translate'

import {setSource} from 'helper/cookie'

class PageWrapper extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            show_mobile_menu : false
        }
        this.setMenu = ::this.setMenu
        this.handleClick = ::this.handleClick
        this.handleReffer = ::this.handleReffer
    }

    componentDidMount() {
        this.handleReffer();
    }

    setMenu() {
        this.setState({
            'show_mobile_menu' : !this.state.show_mobile_menu
        })   
    }

    handleClick(key) {
        console.log('handleClick',key)
        let href;
        switch(key.key) {
            case 'exchange':
                href = '/exchange';
                break;
            case 'liquidity':
                href = '/liquidity';
                break;
            default:
                href = '/';
                break;

        }
        this.props.router.push(href)
    }

    getSelectKey(pathname) {


        switch(pathname) {
            case '/liquidity':
            case '/liquidity/add':
                return ['liquidity']
            case '/exchange':
                return ['exchange']
            default:
                return ['home']
        }
    }

    handleReffer() {
        const {router} = this.props;
        const {f} = router.query;
        console.log('?????????',f);
    }

    render() {

        const {show_mobile_menu} = this.state;
        const {router} = this.props;

        const selectedKeys = this.getSelectKey(router.pathname)


        return (
            <div>
                <Head>
                    <title>N1Swap</title>
                    <link rel="icon" href="/img/favicon.png" />
                </Head>


                <div className="fullpage-container">

                <div className="top-bg headnav nav-shadow">
                <div className="max-width">
                    <div className="headnav-inner">
                        <div className="top-header-left">
                            <div className='block-logo'>
                                <Image
                                    src="/img/logo/logo_square.png"
                                    alt="N1Swap Logo"
                                    width={28}
                                    height={28}
                                    className="logo"
                                  />
                                <span className='word'>
                                <Image
                                    src="/img/logo/word.svg"
                                    alt="N1Swap"
                                    width={93}
                                    height={22}
                                    className="logo"
                                  />
                                </span>
                            </div>
                            <BrowserView>
                            <div className="top-nav">
                                <a className="active" href="/coming">Airdrop</a>
                                <a href="https://www.pixelschain.com" target="_blank">
                                    <span className="with-icon">Pixelschain</span>
                                    <Image src="/img/common/newwindow.svg" width={16} height={16} />
                                </a>
                            </div>
                            </BrowserView>
                        </div>
                        <div className="top-header-right">
                        <MobileView>
                            
                            <div className={classNames("mobile-menu-wrapper",{"open":show_mobile_menu})}>
                                <div className="global-mask"></div>
                                <div className="mobile-menu">
                                    <div className="one">
                                        <div className="t"><Link href="/"><a>{t('Home')}</a></Link></div>
                                    </div>
                                    <div className="one">
                                        <div className="t"><Link href="/cmm"><a>{t('CMM Token')}</a></Link></div>
                                    </div>
                                    <div className="one">
                                        <div className="t"><a>Pixelschain<span><Image src="/img/common/newwindow.svg" width={16} height={16} /></span></a></div>
                                        <div className="t2">{t('A pixel NFT project from official N1Swap team')}</div>
                                    </div>
                               </div>
                                <div class="menu-trigger" onClick={()=>this.setMenu()}></div>
                            </div>
                        </MobileView>
                        </div>
                    </div>
                </div>
                </div>

                <Layout>
                    <Content>
                        <div className="site-layout-background">
                            {this.props.children}
                        </div>
                    </Content>
                </Layout>

                <Footer />
                    
            </div>
            </div>
        );
    }
}


module.exports = withRouter(PageWrapper)
