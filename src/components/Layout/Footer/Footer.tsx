import { Icon } from "@/components/Elements/Icon/Icon";
import Image from "next/image";
import React from "react";
import educar from "@/assets/img/educar.jpg";

const Footer = () => {
  var today = new Date();
  var year = today.getFullYear();

  return (
    <section
      className="footer has-background-has-text-white"
      style={{ paddingTop: "100px" }}
    >
      <div className="footer__container container">
        <div className="columns  is-multiline mb-6">
          <div className="col-footer-img column is-half is-flex is-justify-content-center is-align-items-center">
            <Image
              src={educar}
              alt=""
              width={300}
              height={300}
              className="img-footer"
            />
          </div>
          <div className="col-footer-info column is-half is-gap-4 is-flex is-flex-direction-column">
            <div>
              <b>Dirección:</b>
              <p>Ruta 16, KM 25 Resistencia Chaco</p>
            </div>
            <div>
              <b>Email:</b>
              <p>
                <a
                  href="mailto:info@educar.com.ar"
                  className="text-white"
                  target={"_blank"}
                >
                  info@educar.com.ar
                </a>
              </p>
            </div>
            <div>
              <b>Celular:</b>
              <p>
                <a
                  href="https://web.whatsapp.com/send?phone=543624483140&text="
                  className="text-white"
                  target={"_blank"}
                >
                  +54-3624-483140
                </a>
              </p>
            </div>
            <div>
              <b>Social:</b>
              <div className="is-flex pt-2 is-gap-2">
                <a
                  href="https://www.facebook.com/BasaDesarrollos"
                  className="fb-icon ficon"
                  target={"_blank"}
                >
                  <Icon icon="fa-brands fa-facebook" className="is-size-4" />
                </a>
                <a
                  href="https://instagram.com/basadesarrollos?igshid=YmMyMTA2M2Y="
                  className="ig-icon ficon"
                  target={"_blank"}
                >
                  <Icon icon="fa-brands fa-instagram" className="is-size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="is-fullw">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3541.181764300295!2d-58.930730803138474!3d-27.432445520614717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDI1JzU1LjQiUyA1OMKwNTUnNTAuNyJX!5e0!3m2!1ses-419!2sar!4v1694382341405!5m2!1ses-419!2sar"
          width="100%"
          height="450"
          style={{ border: "0" }}
          loading="lazy"
        ></iframe>
      </div>
      <div className="is-fullw is-flex is-flex-direction-column is-align-items-center is-justify-content-center mt-5">
        <p className="has-text-centered mb-4">
          <strong>Disclaimer:</strong> La información de esta página es falsa,
          sirve solamente como ejemplo práctico para un trabajo universitario.
        </p>
        <p className="derechos has-text-centered">
          &copy; 10Tech {year} | Todos los derechos reservados.
        </p>
      </div>
    </section>
  );
};

export default Footer;
