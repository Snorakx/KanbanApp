import React, { FC } from 'react';
import { Button, View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';




const CustomImage = styled.Image`
margin-top: 20%;
margin-left:5%;
width:50%;
height:30%;
`;

const CustomText = styled.Text`
top:17%;
text-align:center;
color:#6dcfaa;
font-size:20px;
`;






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
});
const ButtonView = styled.View`
background-color:white;
top:4%;
`;





interface IHomeProps { }

const DoneList: FC<IHomeProps> = (props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <ButtonView>
                <Button title="Add done task" color='black' onPress={() => {
                    navigation.navigate('TodoList'),
                        console.log('halko tu jestem');
                }}
                />
            </ButtonView>

            {/* <CustomImage source={require('../../assets/gif.gif')} /> */}
            <CustomText>
                Done tasks!
                 </CustomText>


        </View>
    );
};

export default DoneList;