import React from "react";
import { Box, styled, ThemeProvider, Typography } from "@material-ui/core";
import { theme } from "theme/theme";

const Layout = styled(Box)({
  background: "linear-gradient(179.61deg, #101062 0.34%, #12125D 22.07%, #141457 41.21%, #151552 72.76%, #0D0D46 99.66%);",
  width: "100%",
  minHeight: "100vh"
})

function App() {
  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <ThemeProvider theme={theme}>
        <Layout>
          <Typography variant="body1">
            Hello
          </Typography>
        </Layout>
      </ThemeProvider>
      
    </>
  );
}

export default App;
