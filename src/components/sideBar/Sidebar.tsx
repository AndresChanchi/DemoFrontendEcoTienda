import React from "react";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import './Sidebar.css';
import { Link, Outlet } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';

class SideNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true
        };
    }

    toggleSidebar = () => {
        this.setState({ isVisible: !this.state.isVisible });
    }

    render() {
        return (
            <div className="sidenav">
                
                <SideNav expanded={this.state.isVisible} className="container-sidebar">
                    <SideNav.Toggle
                        onClick={this.toggleSidebar}
                    />
                    <SideNav.Nav defaultSelected="home">
                        <NavItem eventKey="home">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
                            </NavIcon>
                            <NavText>
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="wallet">
                            <NavIcon>
                                <i className="fa fa-fw fa-wallet" style={{ fontSize: "1.75em" }} />
                            </NavIcon>
                            <NavText>
                                <Link to="wallet" className="nav-link">Wallet</Link>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="airdrop">
                            <NavIcon>
                                <i className="fa fa-fw fa-line-chart" style={{ fontSize: "1.75em" }} />
                            </NavIcon>
                            <NavText>
                                <Link to="airdrop" className="nav-link">Airdrop</Link>
                            </NavText>
                        </NavItem>
                        
                        <NavItem eventKey="nfts">
                            <NavIcon>
                                <i className="fa fa-fw fa-image" style={{ fontSize: "1.75em" }} />
                            </NavIcon>
                            <NavText>
                                <Link to="nfts" className="nav-link">NFTs</Link>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="listUser">
                            <NavIcon>
                                <i className="fa fa-fw fa-image" style={{ fontSize: "1.75em" }} />
                            </NavIcon>
                            <NavText>
                                <Link to="users" className="nav-link">User List</Link>
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                <Container className="content-container">
                    <Outlet />
                </Container>
            </div>
        );
    }
}

export default SideNavBar;