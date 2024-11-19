import { Disclosure } from "@headlessui/react";
import profileHolder from "../../assets/TopicTrove.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  src={profileHolder}
                  alt="Logo"
                  className="h-14 w-14 rounded-full"
                />
                <h1>
                  <span style={{ color: "white" }}>Topic</span>{" "}
                  <span style={{ color: "red" }}>Trove</span>
                </h1>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
            <Link to={"/"}>
              <span
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  color: "white",
                  border: "2px solid white",
                  borderRadius: "50px",
                  textAlign: "center",
                  textDecoration: "none",
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "black";
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "white";
                  e.target.style.transform = "scale(1)";
                }}
              >
                Login/Signup
              </span>
            </Link>
          </div>
        </div>
      </>
    </Disclosure>
  );
}

export default Header;
