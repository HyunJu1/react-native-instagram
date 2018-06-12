import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

class CardComponent extends Component {

    render() {


        const imageSource={
            uri:this.props.imageSource
        }
        const profileImage={
            uri:this.props.myProfile
        }
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={profileImage} />
                        <Body>
                            <Text>{this.props.name} </Text>
                            <Text note>{this.props.createdAt} </Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={imageSource} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem style={{ height: 50 , width:null}}>
                    <Left>
                        <Button  transparent>
                            <Icon name="ios-heart-outline" style={{ color: 'black' }} size={35} />
                        </Button>
                        <Button transparent>
                            <Icon name="ios-chatbubbles-outline" style={{ color: 'black' }} size={30} />
                        </Button>
                        <Button transparent>
                            <Icon name="ios-send-outline" style={{ color: 'black' }} size={30} />
                        </Button>


                    </Left>
                </CardItem>

                <CardItem style={{ height: 20 }}>
                    <Text>{this.props.likes} likes</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            <Text style={{ fontWeight: "900" }}>{this.props.name}</Text>
                            {this.props.title}
                        </Text>
                        <Text>                            
                            {this.props.content}
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}
export default CardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});