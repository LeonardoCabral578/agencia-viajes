"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/assets/img/bulma-logo.png";
import Link from "next/link";
import { generateRandomKey } from "@/utils/functions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Dropdown } from "@/components/Components/Dropdown/Dropdown";
import { logOut } from "@/redux/features/userSlice";
import { toast } from "react-toastify";

export interface INavbar {
  logo: any;
  links: { label: string; href: string }[];
  dropdown: { label: string; items: { label: string; href: string }[] };
}

const Navbar = ({ logo, links, dropdown }: INavbar) => {
  const dispatch = useAppDispatch();
  const [burguerActive, setBurguerActive] = useState(false);
  const auth = useAppSelector((state) => state.userReducer);

  return (
    <div className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" href="/">
          <Image src={logo} alt="Brand Image" width={60} height={100} />
        </Link>

        <div
          role="button"
          className={[
            "navbar-burger",
            `${burguerActive ? " is-active" : ""}`,
          ].join("")}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => {
            setBurguerActive(!burguerActive);
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div
        id="navbarBasicExample"
        className={["navbar-menu", `${burguerActive ? " is-active" : ""}`].join(
          ""
        )}
      >
        <div className="navbar-start">
          {links.map((link) => (
            <Link
              key={generateRandomKey()}
              className="navbar-item"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}

          {auth.isAuthenticated && (
            <>
              <a
                key={generateRandomKey()}
                className="navbar-item"
                target="_blank"
                href={
                  "https://drive.google.com/drive/folders/1iJp4eQ2re7ZrIetBKlIgBbsk7T3nrZXI?usp=sharing"
                }
              >
                Descarga Windows
              </a>
              <a
                key={generateRandomKey()}
                className="navbar-item"
                target="_blank"
                href={
                  "https://drive.google.com/drive/folders/1AU2p0UPRG2Vh2gVOcfXKv1csnRQNnZ1y?usp=sharing"
                }
              >
                Descarga Android
              </a>
            </>
          )}

          {dropdown && (
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">{dropdown.label}</a>

              <div className="navbar-dropdown">
                {dropdown.items.map((item) => (
                  <Link
                    key={generateRandomKey()}
                    href={item.href}
                    className="navbar-item"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {auth.isAuthenticated ? (
              <div className="buttons">
                <p className="is-size-5 px-4">
                  ¡Bienvenido: {auth.userSelected.nombreCompleto}!
                </p>
                <Dropdown
                  visible={false}
                  title={{ label: "Mi cuenta" }}
                  trigger={{ fill: "solid", label: "Mi cuenta" }}
                  position="right"
                  options={[
                    { label: "Cuenta" },
                    {
                      label: "Cerrar sesión",
                      onClick() {
                        dispatch(logOut());
                        toast.success("Se ha deslogueado correctamente", {
                          position: "top-center",
                          autoClose: 3000,
                          // hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      },
                    },
                  ]}
                />
              </div>
            ) : (
              <div className="buttons">
                <Link href={"/ingreso"} className="button is-light">
                  Ingresar
                </Link>
                <Link href={"/registro"} className="button is-primary">
                  <strong>Registrarse</strong>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
