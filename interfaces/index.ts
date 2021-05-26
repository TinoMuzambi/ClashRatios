export interface PlayerData {
	tag: string;
	name: string;
	xp: number;
	trophies: number;
	donations: number;
	donationsReceived: number;
}

export type Props = {
	title: string;
	description: string;
	keywords: string;
	url: string;
	image: string;
};
