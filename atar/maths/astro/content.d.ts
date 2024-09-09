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
"1_year_07/1. Topic 01/1_1_fundamentals.mdx": {
	id: "1_year_07/1. Topic 01/1_1_fundamentals.mdx";
  slug: "1_year_07/1-topic-01/1_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"1_year_07/2. Topic 02/2_1_fundamentals.mdx": {
	id: "1_year_07/2. Topic 02/2_1_fundamentals.mdx";
  slug: "1_year_07/2-topic-02/2_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"2_year_08/1. Topic 01/1_1_fundamentals.mdx": {
	id: "2_year_08/1. Topic 01/1_1_fundamentals.mdx";
  slug: "2_year_08/1-topic-01/1_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"2_year_08/2. Topic 02/2_1_fundamentals.mdx": {
	id: "2_year_08/2. Topic 02/2_1_fundamentals.mdx";
  slug: "2_year_08/2-topic-02/2_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"3_year_09/1. Topic 01/1_1_fundamentals.mdx": {
	id: "3_year_09/1. Topic 01/1_1_fundamentals.mdx";
  slug: "3_year_09/1-topic-01/1_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"3_year_09/2. Topic 02/2_1_fundamentals.mdx": {
	id: "3_year_09/2. Topic 02/2_1_fundamentals.mdx";
  slug: "3_year_09/2-topic-02/2_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"4_year_10/1. Topic 01/1_1_fundamentals.mdx": {
	id: "4_year_10/1. Topic 01/1_1_fundamentals.mdx";
  slug: "4_year_10/1-topic-01/1_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"4_year_10/2. Topic 02/2_1_fundamentals.mdx": {
	id: "4_year_10/2. Topic 02/2_1_fundamentals.mdx";
  slug: "4_year_10/2-topic-02/2_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"4_year_10/Exams/1_papers_L1.mdx": {
	id: "4_year_10/Exams/1_papers_L1.mdx";
  slug: "4_year_10/exams/1_papers_l1";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"4_year_10/Exams/2_paper_L2.mdx": {
	id: "4_year_10/Exams/2_paper_L2.mdx";
  slug: "4_year_10/exams/2_paper_l2";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"5_applications/1. Year 10/1. Topic 01/1_1_fundamentals.mdx": {
	id: "5_applications/1. Year 10/1. Topic 01/1_1_fundamentals.mdx";
  slug: "5_applications/1-year-10/1-topic-01/1_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"5_applications/1. Year 10/2. Topic 02/2_1_fundamentals.mdx": {
	id: "5_applications/1. Year 10/2. Topic 02/2_1_fundamentals.mdx";
  slug: "5_applications/1-year-10/2-topic-02/2_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"5_applications/2. Year 11/1. Topic 01/1_1_fundamentals.mdx": {
	id: "5_applications/2. Year 11/1. Topic 01/1_1_fundamentals.mdx";
  slug: "5_applications/2-year-11/1-topic-01/1_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"5_applications/2. Year 11/2. Topic 02/2_1_fundamentals.mdx": {
	id: "5_applications/2. Year 11/2. Topic 02/2_1_fundamentals.mdx";
  slug: "5_applications/2-year-11/2-topic-02/2_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"6_methods/1. Year 10/1. Topic 01/1_1_fundamentals.mdx": {
	id: "6_methods/1. Year 10/1. Topic 01/1_1_fundamentals.mdx";
  slug: "6_methods/1-year-10/1-topic-01/1_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"6_methods/1. Year 10/2. Topic 02/2_1_fundamentals.mdx": {
	id: "6_methods/1. Year 10/2. Topic 02/2_1_fundamentals.mdx";
  slug: "6_methods/1-year-10/2-topic-02/2_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"6_methods/2. Year 11/1. Topic 01/1_1_fundamentals.mdx": {
	id: "6_methods/2. Year 11/1. Topic 01/1_1_fundamentals.mdx";
  slug: "6_methods/2-year-11/1-topic-01/1_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"6_methods/2. Year 11/2. Topic 02/2_1_fundamentals.mdx": {
	id: "6_methods/2. Year 11/2. Topic 02/2_1_fundamentals.mdx";
  slug: "6_methods/2-year-11/2-topic-02/2_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"7_specialist/1. Year 10/1. Topic 01/1_1_fundamentals.mdx": {
	id: "7_specialist/1. Year 10/1. Topic 01/1_1_fundamentals.mdx";
  slug: "7_specialist/1-year-10/1-topic-01/1_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"7_specialist/1. Year 10/2. Topic 02/2_1_fundamentals.mdx": {
	id: "7_specialist/1. Year 10/2. Topic 02/2_1_fundamentals.mdx";
  slug: "7_specialist/1-year-10/2-topic-02/2_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"7_specialist/2. Year 11/1. Topic 01/1_1_fundamentals.mdx": {
	id: "7_specialist/2. Year 11/1. Topic 01/1_1_fundamentals.mdx";
  slug: "7_specialist/2-year-11/1-topic-01/1_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"7_specialist/2. Year 11/2. Topic 02/2_1_fundamentals.mdx": {
	id: "7_specialist/2. Year 11/2. Topic 02/2_1_fundamentals.mdx";
  slug: "7_specialist/2-year-11/2-topic-02/2_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"8_casio_calculator/1. Topic 01/1_1_fundamentals.mdx": {
	id: "8_casio_calculator/1. Topic 01/1_1_fundamentals.mdx";
  slug: "8_casio_calculator/1-topic-01/1_1_fundamentals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"8_casio_calculator/2. Topic 02/2_1_fundamentals.mdx": {
	id: "8_casio_calculator/2. Topic 02/2_1_fundamentals.mdx";
  slug: "8_casio_calculator/2-topic-02/2_1_fundamentals";
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
"introduction.md": {
	id: "introduction.md";
  slug: "introduction";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
