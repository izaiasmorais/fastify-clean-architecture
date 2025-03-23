import { createHash } from "crypto";

export function getMd5Hash(input: string): string {
	const md5Hash = createHash("md5");

	return md5Hash.update(input, "utf8").digest("hex");
}
