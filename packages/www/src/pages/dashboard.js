import React, { useReducer, useRef } from 'react';
import { Button, Container, Heading, Flex, Label, Input, Checkbox } from "theme-ui"
import { gql, useMutation, useQuery } from "@apollo/client"

const ADD_TODO = gql`
    mutation AddTodo($text: String!) {
        addTodo(text: $text) {
            id
        }
    }
`

const GET_TODOS = gql`
    query GetTodos {
        todos {
            id
            text
            done
        }
    }
`

const UPDATE_TODO_DONE = gql`
    mutation UpdateTodoDone($id: ID!){
        updateTodoDone(id: $id) {
            text
            done
        }
    }
`

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
    const [addTodo] = useMutation(ADD_TODO)
    const [updateTodoDone] = useMutation(UPDATE_TODO_DONE)
    const { loading, error, data, refetch } = useQuery(GET_TODOS)
    
    return (
        <Container>
            <Flex
                as="form"
                onSubmit={async e => {
                    e.preventDefault()
                    await addTodo({ variables: { text: inputRef.current.value } })
                    inputRef.current.value = ""
                    await refetch()
                    // dispatch({ type: "addTodo", payload: inputRef.current.value })
                }}
            >
                <Label sx={{ display: "flex" }}>
                    <span>Add&nbsp;ToDo</span>
                    <Input ref={inputRef} />
                </Label>

                <Button>Add</Button>
            </Flex>

            <Flex>
                {loading ? <div>Loading...</div> : null}
                {error ? <div>{error.message}</div> : null}
                {!loading && !error && (
                    <ul>
                        {data.todos.map((todo) => (
                            <Flex
                                as="li"
                                key={todo.id}
                                onClick={async () => {
                                    await updateTodoDone({ variables: { id: todo.id } })
                                    await refetch()
                                    // dispatch({ type: "toggleTodo", payload: 0 })
                                }}
                            >
                                <Checkbox checked={todo.done} />
                                <span>{todo.text}</span>
                            </Flex>
                        ))}
                    </ul>
                )}
            </Flex>
        </Container>
    )
}