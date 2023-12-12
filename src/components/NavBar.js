import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "./css/NavBar.css";
import logo from "./images/assets/doglogo.png";
import { AuthContext } from "../firebase/context/AuthContext";

function NavBar() {
  const { currentUser } = useContext(AuthContext);

  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <>
      <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <div className="logo-container">
              <img src={logo} alt="Logo" className="logo" />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto">
              <Nav.Link
                href="/"
                className={
                  activeLink === "home" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("home")}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="/members"
                className={
                  activeLink === "members"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("members")}
              >
                Members
              </Nav.Link>

              <Nav.Link
                href="/groupwalkies"
                className={
                  activeLink === "group-walkies"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("group-walkies")}
              >
                Group Walks
              </Nav.Link>
              <Nav.Link
                href="/walkietalkie"
                className={
                  activeLink === "walkietalkie"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("walkietalkie")}
              >
                Walkie Talkie
              </Nav.Link>
              <Nav.Link
                href="/faq"
                className={
                  activeLink === "faq" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("faq")}
              >
                FAQ
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Nav.Link
            href="/profile"
            className={
              activeLink === "profile" ? "active navbar-link" : "navbar-link"
            }
            onClick={() => onUpdateActiveLink("profile")}
          >
            {currentUser && (
              <div className="account-info">
                {/* <span>{currentUser.firstName}'s profile</span> */}
                <img src={currentUser.photoURL} alt="User" />
              </div>
            )}
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
