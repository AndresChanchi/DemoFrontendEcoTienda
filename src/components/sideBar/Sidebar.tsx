import React from "react";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import './Sidebar.css';
import { Link, Outlet } from "react-router-dom";
import NavbarComponent from '../../components/navbar/NavbarComponent'; // Asegúrate de importar el componente NavbarComponent

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
        const { userRole } = this.props;
        console.log("ROLES:::::: ", userRole);
        return (
            <div>
                <NavbarComponent isSidebarVisible={this.state.isVisible} />
                <button className={`hamburger-menu ${this.state.isVisible ? 'expanded' : 'collapsed'}`} onClick={this.toggleSidebar}>
                    &#9776;
                </button>
                <SideNav expanded={this.state.isVisible} className={`sidenav ${this.state.isVisible ? 'expanded' : 'collapsed'}`}>
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
                        {
                            userRole.some(role => role.name === 'ADMIN' || role.name === 'SUPER_ADMIN') && (
                                <NavItem eventKey="airdrop">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: "1.75em" }} />
                                    </NavIcon>
                                    <NavText>
                                        <Link to="airdrop" className="nav-link">Airdrop</Link>
                                    </NavText>
                                </NavItem>
                            )
                        }
                        <NavItem eventKey="nfts">
                            <NavIcon>
                                <i className="fa fa-fw fa-image" style={{ fontSize: "1.75em" }} />
                            </NavIcon>
                            <NavText>
                                <Link to="nfts" className="nav-link">NFTs</Link>
                            </NavText>
                        </NavItem>
                        {
                            userRole.some(role => role.name === 'ADMIN' || role.name === 'SUPER_ADMIN') && (
                                <NavItem eventKey="listUser">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-image" style={{ fontSize: "1.75em" }} />
                                    </NavIcon>
                                    <NavText>
                                        <Link to="users" className="nav-link">User List</Link>
                                    </NavText>
                                </NavItem>
                            )
                        }

                        {
                            userRole.some(role => role.name === 'SUPER_ADMIN') && (
                                <NavItem eventKey="listRole">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-image" style={{ fontSize: "1.75em" }} />
                                    </NavIcon>
                                    <NavText>
                                        <Link to="roles" className="nav-link">Role List</Link>
                                    </NavText>
                                </NavItem>
                            )
                        }

                    </SideNav.Nav>
                </SideNav>
                <div className={`main-content ${this.state.isVisible ? '' : 'collapsed'}`}>
                    <div className="content-container">
                        <Outlet userRoles={userRole} />
                    </div>
                </div>
            </div>
        );
    }
}

export default SideNavBar;