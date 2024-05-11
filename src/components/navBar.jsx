import React from "react";
import { Link } from "react-router-dom";
function NavBar(props) {
  return <nav className="nav-bar bg-dark">{props.children}</nav>;
}
function NavBarTop(props) {
  return <nav className="bg-dark nav-bar-top">{props.children}</nav>
}
function UpperGrid(props) {
  return (
    <div className="upper-grid d-flex flex-column align-items-center justify-content-center">
      {props.children}
    </div>
  );
}

function MiddleGrid(props) {
  return <div className="middle-grid">{props.children}</div>;
}

function ButtomGrid(props) {
  return (
    <div className="buttom-grid align-self-end mb-1">{props.children}</div>
  );
}

function TOP_LEFTGRID(props){
  return(
  <div className="top_left-grid d-flex">{props.children}</div>
  );
}
function Top_MIDDLEGRID(props){
  return(
    <div className="top_middle-grid">{props.children}</div>
  )
}
function TOP_RIGHTGRID(props){
  return(
  <div className="top_right-grid">{props.children}</div>
  );
}

function NavItem(props) {
  return (
    <li
      className={`nav-item ${props.activeClass}`}
      onClick={(event) => {
        let active = document.getElementsByClassName("active");
        if (active.length !== 0 && event.currentTarget !== active[0]) {
          active[0].classList.toggle("active");
        }
        event.currentTarget.classList.toggle("active");
      }}
    >
      <Link className="nav-link" to={props.link}>
        <div className="nav-icon">{props.icon}</div>
        <div className="ms-auto">{props.name}</div>
      </Link>
    </li>
  );
}

function NavBrand(props) {
  return (
    <a className="navbar-brand" href="/">
      {props.children}
    </a>
  );
}
export { NavBar,NavBarTop, NavItem, NavBrand };
export { ButtomGrid, MiddleGrid, UpperGrid, TOP_LEFTGRID, TOP_RIGHTGRID, Top_MIDDLEGRID};
