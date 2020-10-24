import React from 'react';
import { Button, Container, Heading, Flex } from "theme-ui"
// import netlifyIdentity from "netlify-identity-widget"

// netlifyIdentity.init({})

export default props => (
    <Container>
        <Flex sx={{ flexDirection: "column", padding: 4 }}>
            <Heading>Hello World! </Heading>
            <Button onClick={() => {
                alert("CLICKED")
            }}>Login</Button>
        </Flex>
    </Container>
)