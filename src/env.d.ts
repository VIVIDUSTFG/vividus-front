/// <reference types="astro/client" />
declare namespace App {
	interface Locals {
		session: import("lucia").Session | null;
		user: import("lucia").User | null;
	}
}


// https://docs.astro.build/en/guides/environment-variables/#intellisense-for-typescript
interface ImportMetaEnv {
	readonly SITE: string;
	readonly PUBLIC_API_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
