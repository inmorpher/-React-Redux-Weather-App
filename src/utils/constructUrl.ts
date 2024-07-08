/**
 * Constructs a more versatile URL path from the given parameters, query parameters, and hash.
 *
 * @param basePathParams A record object for constructing the base path of the URL.
 * @param queryParams An optional record object for constructing the query string.
 * @param hash An optional string representing the hash fragment of the URL.
 * @param absolute A boolean flag indicating whether the returned path should be absolute. Defaults to false.
 * @returns The constructed URL as a string.
 */
export const constructUrl = (
	basePathParams: Record<string, string | undefined>,
	queryParams?: Record<string, string | undefined>,
	hash?: string,
	absolute = false,
) => {
	// Construct the base path
	const basePath = Object.values(basePathParams)
		.filter((param) => param !== undefined && param.length !== 0)
		.map((param) => encodeURIComponent(param as string))
		.join('/')
		.toLowerCase();

	// Construct the query string
	const queryString = queryParams
		? '?' +
			Object.entries(queryParams)
				.filter(([, value]) => value !== undefined && value.length !== 0)
				.map(
					([key, value]) =>
						`${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
				)
				.join('&')
		: '';

	// Construct the hash fragment
	const hashFragment = hash ? `#${encodeURIComponent(hash)}` : '';

	// Combine parts and return the URL
	return `${absolute ? '/' : ''}${basePath}${queryString}${hashFragment}`;
};
