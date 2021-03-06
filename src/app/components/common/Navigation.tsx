/// <reference path='../../../../typings/index.d.ts' />

import * as React from 'react';
import * as $ from 'jquery';
// import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router';
import 'metismenu';

interface INavigationProps {
    location: any;
}
interface INavigationState {}

class Navigation extends React.Component<INavigationProps, INavigationState> {

    componentDidMount() {
        const { menu } = this.refs;
        $(menu).metisMenu();
    }

    activeRoute(routeName: string) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }

    secondLevelActive(routeName: string) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav nav-second-level collapse in' : 'nav nav-second-level collapse';
    }

    render() {
        return (
            <nav className='navbar-default navbar-static-side' role='navigation'>
                    <ul className='nav metismenu' id='side-menu' ref='menu'>
                        <li className='nav-header'>
                            <div className='dropdown profile-element'> <span>
                             </span>
                                <a data-toggle='dropdown' className='dropdown-toggle' href='#'>
                            <span className='clear'> <span className='block m-t-xs'> <strong className='font-bold'>User name</strong>
                             </span> <span className='text-muted text-xs block'>User position<b className='caret'></b></span> </span> </a>
                                <ul className='dropdown-menu animated fadeInDown m-t-xs'>
                                    <li><a href='#'> Logout</a></li>
                                </ul>
                            </div>
                            <div className='logo-element'>
                                Ev
                            </div>
                        </li>
                        <li className={this.activeRoute('/contacts')}>
                            <Link to='/contacts'><i className='fa fa-users'></i> <span className='nav-label'>Contacts</span></Link>
                        </li>
                        <li className={this.activeRoute('/todo')}>
                            <Link to='/todo'><i className='fa fa-tasks'></i> <span className='nav-label'>Todo</span></Link>
                        </li>
                    </ul>

            </nav>
        );
    }
}

export default Navigation;
