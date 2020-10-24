import React, { useReducer, useRef } from 'react';
import { Button, Container, Heading, Flex, Label, Input, Checkbox } from "theme-ui"

const todosReducer = (state, action) => {
    switch (action.type) {
        case "addTodo":
            return [{ done: false, value: action.payload }, ...state]
        case "toggleTodo":
            console.log("YES", action.payload)
            const newState = [...state]
            newState[action.payload] = {
                done: !state[action.payload].done,
                value: state[action.payload].value
            }
            return newState
    }
}

export default () => {
    const [todos, dispatch] = useReducer(todosReducer, [])
    const inputRef = useRef("")

    return (
        <Container>
            <Flex
                as="form"
                onSubmit={e => {
                    e.preventDefault()
                    console.log(inputRef.current.value)
                    dispatch({ type: "addTodo", payload: inputRef.current.value })
                }}
            >
                <Label sx={{ display: "flex" }}>
                    <span>Add&nbsp;ToDo</span>
                    <Input ref={inputRef} />
                </Label>

                <Button>Add</Button>
            </Flex>

            <Flex>
                <ul>
                    {todos.map((todo, i) => (
                        <Flex
                            as="li"
                            key={i}
                            onClick={() => {
                                dispatch({ type: "toggleTodo", payload: 0 })
                            }}
                        >
                            <Checkbox checked={todo.done} />
                            <span>{todo.value}</span>
                        </Flex>
                    ))}
                </ul>
            </Flex>
        </Container>
    )
}