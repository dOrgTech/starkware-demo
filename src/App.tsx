import React from 'react';
import { Box, styled } from '@material-ui/core';
import { Home } from 'pages/Home';

const Layout = styled(Box)({
	background:
		'linear-gradient(179.61deg, #101062 0.34%, #12125D 22.07%, #141457 41.21%, #151552 72.76%, #0D0D46 99.66%);',
	width: '100%',
	minHeight: '100vh',
});

function App() {
	return (
		<Layout>
			<Home />
		</Layout>
	);
}

export default App;
