import React from "react"
import { EmptyTokenInput } from './EmptyTokenInput';
import { TOKENS } from "./Swap";

export const Mint = (): JSX.Element => {
	return (
		<EmptyTokenInput handleSelect={(e) => {
			console.log(e)
		}} tokens={TOKENS}/>
	);
};
