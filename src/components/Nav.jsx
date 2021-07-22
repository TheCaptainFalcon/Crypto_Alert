import React, { Component } from 'react';
import {
    Container,
    Box,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    // MenuItemOption,
    MenuGroup,
    // MenuOptionGroup,
    // MenuIcon,
    // MenuCommand,
    MenuDivider,
  } from "@chakra-ui/react";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Container>
                <Box>

            <Menu>
                <MenuButton as={Button} colorScheme="pink">
                Profile
                
                </MenuButton>
                <MenuList>
                    <MenuGroup title="Profile">
                        <MenuItem>My Alerts</MenuItem>
                        <MenuItem>Account Settings </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Help">
                        <MenuItem>Docs</MenuItem>
                        <MenuItem>FAQ</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>

            </Box>
            </Container>
        )
    }
}

export default Nav;