import { encodePacked, keccak256, toBytes } from "viem";

/** Match backend convention: fingerprint idea id + public title + link. */
export function computeContentHash(
  ideaId: string,
  title: string,
  link: string,
): `0x${string}` {
  return keccak256(
    encodePacked(
      ["string", "string", "string"],
      [ideaId, title, link ?? ""],
    ),
  );
}

/** Fallback if encodePacked path ever fails in edge runtimes. */
export function computeContentHashSimple(
  ideaId: string,
  title: string,
  link: string,
): `0x${string}` {
  return keccak256(toBytes(`${ideaId}|${title}|${link ?? ""}`));
}
