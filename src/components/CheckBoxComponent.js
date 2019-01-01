import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Animation from 'lottie-react-native';


import anim from "../asset/anim/checked_done_";

export default class CheckBoxComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
        }
    }

    test = () => {
        this.props.onPress(() => {
            if(this.props.status) {
                this.animation.reset()
            } else {
                this.animation.play()
            }
        });
    }

    render() {
        const {status} = this.props;

        return (
            <TouchableWithoutFeedback
                onPress={this.test}>
                <Animation
                    progress={this.props.status === false ? 0 : 1}
                    ref={animation => {
                        this.animation = animation;
                    }}
                    style={{
                        width: 60,
                        height: 60
                    }}
                    loop={false}
                    source={anim}
                />
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});