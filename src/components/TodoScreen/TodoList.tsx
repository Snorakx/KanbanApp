import React, { FC, useState } from 'react';
import { Text, Button, View, ScrollView, StyleSheet, TouchableOpacity, ColorPropType } from 'react-native'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { IState } from '../../reducers'
import todoListReducer, { ITodoListReducer } from '../../reducers/todoListReducer'

import { ISingleElementList } from '../../entities/todoSingleEl'
import { deleteElemTodoList } from '../../actions/todoListActions';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
});


const BtnContainer = styled.View`
background-color:#97ccb8;
margin-bottom: 10%;
border-radius: 10;


`;
const Wrapper = styled.View`
margin:80px 20px 0 20px;
background-color:black;

`;

const SingleElList = styled.View`
    margin:0 0 5% 0;
    background-color: whitesmoke;
    border-radius: 10px;
`;
const Titletxt = styled.Text`
    text-align: center;
    margin-bottom: 2%;
    font-size:20px;

`;
const CustomText = styled.Text`
text-align: center;
font-size:30px;
color:white;
`;



type DelNewElemTodoList = ReturnType<typeof deleteElemTodoList>;



const TodoList: FC<{ switchView(formView: boolean) }> = props => {
    const dispatch = useDispatch();
    const todoListState = useSelector<IState, ITodoListReducer>(state => state.todoList)
    const goToForm = () => {
        props.switchView(true)
    }
    const deleteMe = (index: number) => {
        dispatch<DelNewElemTodoList>(deleteElemTodoList(index))

    }

    return (
        <View style={styles.container}>
            <Wrapper>
                <CustomText>To do...</CustomText>
                <BtnContainer>
                    <Button title='Dodaj nowy' color='grey' onPress={goToForm} />
                </BtnContainer>
                {todoListState.todoList.map((elem: ISingleElementList, index: number) =>
                    <SingleElList key={index}>
                        <TouchableOpacity onPress={() => deleteMe(index)}>
                            <Titletxt>
                                {elem.name}
                            </Titletxt>
                        </TouchableOpacity>
                    </SingleElList>
                )}
            </Wrapper>
        </View>


    )
};

export default TodoList;