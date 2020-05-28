import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from '../icon-svg';
import PropTypes from 'prop-types';
/**
 * 排序按钮组件
 */
class SortButton extends PureComponent {
    constructor(props) {
        super(props);
        const status = this.props.initStatus !== undefined ? this.props.initStatus : this.props.status;
        this.state = {
            status: status === undefined || status === null ? 0 : status,
        };
    }
    static propTypes = {
        initStatus: PropTypes.oneOf([0, 1, 2]),
        style: PropTypes.object,
        textStyle: PropTypes.object,
        onPress: PropTypes.func,
        title: PropTypes.string.isRequired,
        activeColor: PropTypes.string,
        inactiveColor: PropTypes.string,
        status: PropTypes.number,
    }

    static defaultProps = {
        initStatus: 0, // 初始状态[0,1,2]
        status: null, // 状态
        style: {}, // 容器样式
        textStyle: {}, // 文字样式
        activeColor: '#FFFFFF', // 选择颜色
        inactiveColor: '#99A9C4', // 默认颜色
        onPress: (status) => { }, // 点击事件接收一个参数 状态
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.status !== this.state.status) {
            this.setState({
                status: nextProps.status,
            });
        }
    }

    render() {
        const { title, style, onPress, textStyle, activeColor, inactiveColor } = this.props;
        let status = this.state.status;
        let color = [inactiveColor, inactiveColor];
        if (status === 1) {
            color = [activeColor, inactiveColor];
        } else if (status === 2) {
            color = [inactiveColor, activeColor];
        }
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    if (status === 0) {
                        status = 1;
                    } else if (status === 1) {
                        status = 2;
                    } else if (status === 2) {
                        status = 0;
                    }
                    this.setState({
                        status: status
                    })
                    typeof onPress === 'function' && onPress(status)
                }}
            >
                <View style={[styles.container, style]}>
                    <Text style={[styles.text, textStyle]}>{title}</Text>
                    <Icon name="icon-sort" size={8} color={color} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#99A9C4',
        fontSize: 14,
        marginRight: 2,
    }
});

export default SortButton;
