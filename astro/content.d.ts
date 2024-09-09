declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"1_ds/1_1_machine_learning.mdx": {
	id: "1_ds/1_1_machine_learning.mdx";
  slug: "1_ds/1_1_machine_learning";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"1_ds/1_2_advance_machine_learning.mdx": {
	id: "1_ds/1_2_advance_machine_learning.mdx";
  slug: "1_ds/1_2_advance_machine_learning";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"1_ds/1_3_deep_learning.mdx": {
	id: "1_ds/1_3_deep_learning.mdx";
  slug: "1_ds/1_3_deep_learning";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"1_ds/1_4_math.mdx": {
	id: "1_ds/1_4_math.mdx";
  slug: "1_ds/1_4_math";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"1_ds/1_5_robotics.mdx": {
	id: "1_ds/1_5_robotics.mdx";
  slug: "1_ds/1_5_robotics";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"2_amaths/2_1_outline.mdx": {
	id: "2_amaths/2_1_outline.mdx";
  slug: "2_amaths/2_1_outline";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"3_cs/3_1_languages.mdx": {
	id: "3_cs/3_1_languages.mdx";
  slug: "3_cs/3_1_languages";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"3_cs/3_2_usp.mdx": {
	id: "3_cs/3_2_usp.mdx";
  slug: "3_cs/3_2_usp";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"3_cs/3_3_daa.mdx": {
	id: "3_cs/3_3_daa.mdx";
  slug: "3_cs/3_3_daa";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"3_cs/3_4_hpc.mdx": {
	id: "3_cs/3_4_hpc.mdx";
  slug: "3_cs/3_4_hpc";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"3_cs/3_5_db.mdx": {
	id: "3_cs/3_5_db.mdx";
  slug: "3_cs/3_5_db";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"3_cs/3_6_net.mdx": {
	id: "3_cs/3_6_net.mdx";
  slug: "3_cs/3_6_net";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"4_dev/4_10_devops.mdx": {
	id: "4_dev/4_10_devops.mdx";
  slug: "4_dev/4_10_devops";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"4_dev/4_1_ide.mdx": {
	id: "4_dev/4_1_ide.mdx";
  slug: "4_dev/4_1_ide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"4_dev/4_2_ml.mdx": {
	id: "4_dev/4_2_ml.mdx";
  slug: "4_dev/4_2_ml";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"4_dev/4_3_analytics.mdx": {
	id: "4_dev/4_3_analytics.mdx";
  slug: "4_dev/4_3_analytics";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"4_dev/4_4_web.mdx": {
	id: "4_dev/4_4_web.mdx";
  slug: "4_dev/4_4_web";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"4_dev/4_5_distcomp.mdx": {
	id: "4_dev/4_5_distcomp.mdx";
  slug: "4_dev/4_5_distcomp";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"4_dev/4_6_mobile.mdx": {
	id: "4_dev/4_6_mobile.mdx";
  slug: "4_dev/4_6_mobile";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"4_dev/4_7_database.mdx": {
	id: "4_dev/4_7_database.mdx";
  slug: "4_dev/4_7_database";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"4_dev/4_8_microcontroller.mdx": {
	id: "4_dev/4_8_microcontroller.mdx";
  slug: "4_dev/4_8_microcontroller";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"4_dev/4_9_os.mdx": {
	id: "4_dev/4_9_os.mdx";
  slug: "4_dev/4_9_os";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"5_cloud/5_1_outline.mdx": {
	id: "5_cloud/5_1_outline.mdx";
  slug: "5_cloud/5_1_outline";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"6_atar/6_1_maths.mdx": {
	id: "6_atar/6_1_maths.mdx";
  slug: "6_atar/6_1_maths";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"6_atar/6_2_physics.mdx": {
	id: "6_atar/6_2_physics.mdx";
  slug: "6_atar/6_2_physics";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"7_software/7_1_multimedia.mdx": {
	id: "7_software/7_1_multimedia.mdx";
  slug: "7_software/7_1_multimedia";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"7_software/7_2_productivity.mdx": {
	id: "7_software/7_2_productivity.mdx";
  slug: "7_software/7_2_productivity";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"8_hardware/8_1_electronics.mdx": {
	id: "8_hardware/8_1_electronics.mdx";
  slug: "8_hardware/8_1_electronics";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"8_hardware/8_2_iot.mdx": {
	id: "8_hardware/8_2_iot.mdx";
  slug: "8_hardware/8_2_iot";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"8_hardware/8_3_pc.mdx": {
	id: "8_hardware/8_3_pc.mdx";
  slug: "8_hardware/8_3_pc";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"8_hardware/8_4_printers.mdx": {
	id: "8_hardware/8_4_printers.mdx";
  slug: "8_hardware/8_4_printers";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"9_misc/9_1_house.mdx": {
	id: "9_misc/9_1_house.mdx";
  slug: "9_misc/9_1_house";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"9_misc/9_2_photograhy.mdx": {
	id: "9_misc/9_2_photograhy.mdx";
  slug: "9_misc/9_2_photograhy";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"9_misc/9_3_badminton.mdx": {
	id: "9_misc/9_3_badminton.mdx";
  slug: "9_misc/9_3_badminton";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"introduction.mdx": {
	id: "introduction.mdx";
  slug: "introduction";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
