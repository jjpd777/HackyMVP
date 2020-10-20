import React, { useEffect, useState } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Helper from "../Admin/Helper"
import HomePage from "../HomePage/HomePage"
import EditMenu from "../Admin/EditMenu"
import InsertItem from '../Admin/InsertItem';
import StoreFront from '../../StoreFront'


function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/home" className="navbar-brand">
                    Bienvenido
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/editar-menu"} className="nav-link">
                            Editar Menu
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/agregar-al-menu"} className="nav-link">
                            Añadir al menu
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/menu-en-vivo"} className="nav-link">
                            Ver menu en vivo
                        </Link>
                    </li>
                </div>
            </nav>
            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/home"]} component={HomePage} />
                    <Route exact path={["/", "/editar-menu"]} component={EditMenu} />
                    <Route exact path="/agregar-al-menu" component={InsertItem} />
                    <Route exact path="/menu-en-vivo" component={StoreFront} />
                </Switch>
            </div>
        </>
    )
}

export default Navbar;
