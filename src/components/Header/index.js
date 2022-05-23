import React from 'react';
import './Header.scss';

const Header = () => {

  return (
    <>
      <div className="header">
        <div className="header-conteiner">
          <div className="header-left">
            <div className="logo">
              <a aria-current="page" className="" href="/">
                <img
                  className=""
                  src="https://content.virginatlantic.com/content/vaa/www/gb/en.damAssetRender.20210331T1149270250400.html/content/dam/virgin-applications/images/idp-shopping/virgin-atlantic-logo-large.svg"
                  alt="virgin atlantic"
                />
              </a>
            </div>
          </div>
          <div className="title">Virgin Atlantic Holiday Search</div>
        </div>
      </div>
    </>
  );
};
export default Header;
