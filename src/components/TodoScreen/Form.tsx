import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { TextInput, View, StyleSheet, TouchableWithoutFeedback, Button } from 'react-native';


import { useDispatch } from 'react-redux';
import { setNewElemTodoList } from '../../actions/todoListActions';
import { ISingleElementList } from '../../entities/todoSingleEl';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btn: {
        marginTop: 16,
        borderColor: "#eaffd0",
        borderRadius: 6,
        backgroundColor: "#eaffd0",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 10,
        marginRight: 10
    }
})



const CustomTextInputTitle = styled.TextInput`
margin-top:20%;
padding :10px;
width:100%;
text-align:center;
color:#eaffd0;

`;







type SetNewElemTodoList = ReturnType<typeof setNewElemTodoList>;

const Form: FC<{ switchView(formView: boolean) }> = props => {
    const dispatch = useDispatch();
    const [nameInput, setNameInput] = useState<string>('');

    const nameValueChange = (txt) => {
        setNameInput(txt.nativeEvent.text);
    }




    const saveData = () => {
        dispatch<SetNewElemTodoList>(setNewElemTodoList({
            name: nameInput,
            id: Date.now()
        } as ISingleElementList
        ));
        props.switchView(false)
    }


    return (
        <View style={styles.container}>
            <CustomTextInputTitle value={nameInput} onChange={nameValueChange} placeholder='Name' placeholderTextColor="#eaffd0" />
            <View style={styles.btn}>
                <Button title='save' onPress={saveData} />
            </View>
        </View>
    )
};

export default Form;

