import { FunctionComponent, SVGProps } from 'react';

export interface Token {
	id: string;
	name: string;
	symbol: string;
	icon: FunctionComponent<
		SVGProps<SVGSVGElement> & {
			title?: string;
		}
	>;
	price: string;
}
