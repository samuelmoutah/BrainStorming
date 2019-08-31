import * as React from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import {
    Nav,
    NavItem,
    Navbar,
    NavbarBrand,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
} from 'reactstrap';

import './App.scss';
import Brainstormer from '../Brainstormer';

class App extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <>
                        <Navbar color="dark" dark>
                            <NavbarBrand tag={Link} to="/">
                                Brainstormer
                            </NavbarBrand>
                            <Nav>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        File
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Open</DropdownItem>
                                        <DropdownItem>Rename</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Share With</DropdownItem>
                                        <DropdownItem>Save As</DropdownItem>
                                        <DropdownItem>Download As</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Import Item</DropdownItem>
                                        <DropdownItem>Exit</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Edit
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Undo</DropdownItem>
                                        <DropdownItem>Redo</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Cut</DropdownItem>
                                        <DropdownItem>Copy</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Select All</DropdownItem>
                                        <DropdownItem>Crop Image</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        View
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Zoom In</DropdownItem>
                                        <DropdownItem>Zoom Out</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Grids</DropdownItem>
                                        <DropdownItem>Guides</DropdownItem>
                                        <DropdownItem>Margins</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Show Comments</DropdownItem>
                                        <DropdownItem>Shows Rulers</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Help
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>Learn the Basics</DropdownItem>
                                        <DropdownItem>Help Center</DropdownItem>
                                        <DropdownItem>Knowledge Base</DropdownItem>
                                        <DropdownItem>Hotkey Reference</DropdownItem>
                                        <DropdownItem>Report a Bug</DropdownItem>
                                        <DropdownItem>What's New?</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Navbar>
                        <main>
                            <Switch>
                                <Route component={Brainstormer} />
                            </Switch>
                        </main>
                    </>
                </BrowserRouter>
            </>
        );
    }
}

export default App;
