import React from "react"
import { TokenSelector } from './TokenSelector';
import { TOKENS } from "./Swap";

export const Mint = (): JSX.Element => {
	return (
		<TokenSelector handleSelect={(e) => {
			console.log(e)
		}} tokens={TOKENS}/>
	);
};
