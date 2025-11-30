import React from 'react';
// Import as a React Component. Note the syntax.
import { ReactComponent as FitMatrixLogoSvg } from './assets/fitMatrixLogo.svg';

// Optional: A container to control size if needed
const LogoContainer = styled.div`
  width: 150px;
  height: 150px;
  // You can add hover effects here too if you want to trigger animation on hover
`;

const Header = () => {
  return (
    <header className="app-header">
      <LogoContainer>
         {/* You can pass standard SVG props like className or styles to it */}
        <FitMatrixLogoSvg className="app-logo" aria-label="FitMatrix Logo" />
      </LogoContainer>
      <h1>FitMatrix</h1>
    </header>
  );
};

export default Header;