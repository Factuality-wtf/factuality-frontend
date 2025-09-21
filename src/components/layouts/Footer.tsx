"use client";
import styled from "styled-components";

const FooterLinks = styled.div`
  display: none;
`;

const Footer = () => {
  return (
    <footer>
      <div className="min-w-screen text-center p-8 mt-2">
        <div className="flex flex-row items-end justify-center md:justify-between gap-y-4">
          <div className="flex flex-col justify-start text-left text-secondary text-lg uppercase">
            <div className="text-sm md:text-lg">
              <span>©</span> {new Date().getFullYear()} factually.wtf{" | "}
              <a href="https://t0nylombardi.dev" className="hover:text-text">
                t0nylombardi
              </a>
            </div>
            <div className="text-lg break-normal"></div>
          </div>
          <FooterLinks className="flex flex-col justify-end items-end text-right text-secondary text-4xl uppercase gap-y-2">
            <div className="hover:text-text">
              <a href="https://t0nylombardi.com">Github</a>
            </div>
            <div className="hover:text-text">
              <a href="">Instagram</a>
            </div>
          </FooterLinks>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
