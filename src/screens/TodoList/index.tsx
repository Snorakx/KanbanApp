import React, { FC, useState } from 'react';
import { Button, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';

import Colors from '../../constans/Colors';

import Form from '../../components/TodoScreen/Form';
import TodoList from '../../components/TodoScreen/TodoList';




const TodoListScreen = () => {
    const [formView, setFormView] = useState<boolean>(false);
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <ScrollView>
                {formView ?
                    (
                        <Form switchView={setFormView} />
                    ) : (
                        <TodoList switchView={setFormView} />
                    )
                }
            </ScrollView>
        </View>
    );
};

export default TodoListScreen;