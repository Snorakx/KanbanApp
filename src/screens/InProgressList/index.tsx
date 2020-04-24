import React, { FC } from 'react';
import { Button, View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';





const CustomImage2 = styled.Image`
margin-top: 85%;
margin-left:5%;
width:90%;
height:30%;
`;


const CustomText2 = styled.Text`
text-align:center;
color:#25805d;
font-size:20px;
top:10%;
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

const InProgressList: FC<IHomeProps> = (props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <ButtonView>
                <Button title="Add task in progress" color='black' onPress={() => {
                    navigation.navigate('TodoList'),
                        console.log('halko tu jestem');
                }}
                />
            </ButtonView>

            <CustomText2>
                In progress..
                 </CustomText2>
            <CustomImage2 source={require('../../assets/laugh.png')} />



        </View>
    );
};

export default InProgressList;