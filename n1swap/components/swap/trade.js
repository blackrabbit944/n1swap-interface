import React,{useRef} from 'react';

import { initStore } from 'redux/store';
import { connect } from "react-redux";
import SwapInput from 'components/swap/input';
import {Button} from 'antd';
import { withTranslation } from 'next-i18next'

import styles from 'styles/swap_trade.module.less'

import {CogOutline,ArrowNarrowDown} from 'heroicons-react';

// React.useLayoutEffect = React.useEffect 



class SwapTrade extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            is_loading  : false,
        }

        this.fromRef = React.createRef();
        this.toRef   = React.createRef();

        this.handleTokenChange = this.handleTokenChange.bind(this)
        this.handleAmountChange = this.handleAmountChange.bind(this)

        this.test = this.test.bind(this);

    }   
    
    handleTokenChange(key_name,token_name) {
        let new_state = {};
        new_state[key_name] = token_name
        this.setState(new_state);
    }

    handleAmountChange(key_name,e) {
        let new_state = {};
        new_state[key_name] = e.target.value
        this.setState(new_state);
    }

    test() {
        console.log('this.fromRef',this.fromRef.current.getValue());
    }

    render() {

        const {is_loading,
            from_token_name,from_token_amount,
            to_token_amount,to_token_name} = this.state;
        const {tronlink,t} = this.props;

        // console.log('debug,tronlink',tronlink.toJS());
        console.log('debug-t',t);

        return (
            <div className={styles.box_wrapper}>
                <div className={styles.box_head}>
                    <div className={styles.title}>Swap</div>
                    <div className={styles.tool}>
                        <a className={styles.btn}>
                            <CogOutline />
                        </a>
                    </div>
                </div>
                <div className={styles.box_content}>
                    <div className={styles.box_form}>
                        <div className={styles.box_from_input}>
                            <h3>From</h3>
                            <div className={styles.currency_input}>
                                <SwapInput 
                                    ref={this.fromRef}
                                    default_token={'TRX'} 
                                    />
                            </div>
                        </div>
                        <div className={styles.to}>
                            <div className={styles.to_icon}>
                                <ArrowNarrowDown size={20} />
                            </div>
                        </div>
                        <div className={styles.box_from_input}>
                            <h3>To</h3>
                            <div className={styles.currency_input}>
                                <SwapInput 
                                    ref={this.toRef}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className={styles.box_footer}>
                        <Button block size="large" className="big-radius-btn" type="primary" onClick={this.test}>{t('Get Value')}</Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
     return {
     }
}
function mapStateToProps(state,ownProps) {
    return {
        'tronlink' : state.getIn(['setting','tronlink']),
    }
}

module.exports = withTranslation()(connect(mapStateToProps,mapDispatchToProps)(SwapTrade))