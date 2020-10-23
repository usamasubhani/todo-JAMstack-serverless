import React from 'react';
import { Button, Container, Heading, Flex } from "theme-ui"
export default props => (
    <Container>
        <Flex sx={{ flexDirection: "column", padding: 4 }}>
            <Heading>Hello World! </Heading>
            <Button onClick={() => {
                alert("Clicked")
            }}>Login</Button>
        </Flex>
    </Container>
)