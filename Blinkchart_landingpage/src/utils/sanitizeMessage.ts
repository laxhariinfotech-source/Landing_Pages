/**
 * Message sanitisation & content-policy validation.
 *
 * sanitizeMessage  – called on every onChange to strip dangerous markup.
 * validateMessageContent – called on blur/submit; enforces content policy.
 */

// ─── Strip HTML / injection patterns ────────────────────────────────────────

export function sanitizeMessage(raw: string): string {
  return raw
    .replace(/<[^>]*>/g, "")          // strip HTML tags
    .replace(/javascript\s*:/gi, "")  // strip JS pseudo-protocol
    .replace(/on\w+\s*=\s*["']?/gi, "") // strip inline event handlers (onclick= …)
    .replace(/&lt;script/gi, "")      // strip encoded <script
    .replace(/&gt;/gi, "")
    .replace(/\u202E/g, "")           // strip Unicode RTL-override
    .trimStart();                     // remove leading whitespace only
}

// ─── Content-policy blocklist ────────────────────────────────────────────────
// Whole-word matching only (RegExp \b boundaries) so "classic" ≠ "ass".
// Leet-speak variants covered via character classes: [i1] [o0] [e3] [a@4] [s$5].

const BLOCKLIST: RegExp[] = [
  // ── Severe profanity ──────────────────────────────────────────────────────
  /\bf+u+c+k+(ing|er|ers|ed|s|face|head|wit)?\b/i,
  /\bsh[i1!]t+(ty|ter|s|head|face|hole)?\b/i,
  /\bb[i1!]tch(es|y|ing|ass)?\b/i,
  /\bcunt(s|face|bag)?\b/i,
  /\bd[i1!][ck]+(s|head|face|bag|wad)?\b/i,
  /\bc[o0][ck]+(s|sucker|face|head|up)?\b/i,
  /\ba[s$][s$](hole|hat|face|clown|wipe|wad|bag|head|licker)?(s)?\b/i,
  /\bmotherf.{1,5}k(er|ing)?\b/i,
  /\bpussy(ies|whipped)?\b/i,
  /\bwh[o0]re(s|house|monger)?\b/i,
  /\bslut(s|ty|bag|shaming)?\b/i,
  /\bfagg?[o0]t(s|ry)?\b/i,
  /\bnigg[ae3]r?(s|a)?\b/i,
  /\bretard(ed|s|ing)?\b/i,
  /\bcr[ae3]cker(s)?\b/i,
  /\bspic(s|k)?\b/i,
  /\bk[i1]ke(s)?\b/i,
  /\bch[i1]nk(s)?\b/i,
  /\bw[e3]tb[a@4]ck(s)?\b/i,
  /\btr[a@4]nny\b/i,
  /\bsh[e3]m[a@4]le(s)?\b/i,

  // ── General abusive / rude language ──────────────────────────────────────
  /\bidiot(s|ic)?\b/i,
  /\bmoron(s|ic)?\b/i,
  /\bstupid\b/i,
  /\bdumb(ass)?\b/i,
  /\bloser(s)?\b/i,
  /\bshut\s+up\b/i,
  /\bhate\s+(you|u|him|her|them|all|everyone)\b/i,
  /\byou\s+suck\b/i,
  /\bi\s+hate\s+you\b/i,
  /\byou\s+are\s+(terrible|horrible|awful|disgusting)\b/i,
  /\byou\s+disgust\s+me\b/i,
  /\bi\s+don't?\s+care\s+if\s+you\s+die\b/i,

  // ── Violence & murder ──────────────────────────────────────────────────────
  /\bkill(ing|ed|er|ers|s)?\b/i,
  /\bk[i1!]\s*l\s*l/i,                    // "k i l l" with spaces
  /\bkill\s+(you|u|ur|him|her|them|all|everyone|yourself|myself|yourself)\b/i,
  /\byou.*kill|kill.*you/i,               // catch "kill you" and "you kill"
  /\bi\s+(will|gonna|want\s+to|am\s+going\s+to|should|must|need\s+to)\s+kill/i,
  /\bkill\s+yourself?\b/i,
  /\bi\s+(will|gonna|wanna)\s+kill\b/i,
  /\bmurd[e3]r(er|ers|ing|ous|s)?\b/i,
  /\bslaughter(ing|ed|s)?\b/i,
  /\bmassl?acre(d|ing|s)?\b/i,
  /\bbeheading?\b/i,
  /\bdecapitat(e|ed|ing|ion)\b/i,
  /\bstab(bing|bed|s|you|him|her|them)?\b/i,
  /\bslit\s+(your|his|her|their|my)\s+throat\b/i,
  /\bshoot(ing|er|s)?\s+(up|you|him|her|them|everyone|people)?\b/i,
  /\bgun\s+down\b/i,
  /\bopen\s+fire\b/i,
  /\bblow\s+(up|your|their|his|her)\b/i,
  /\bbomb(ing|ed|s)?\b/i,
  /\bsuicide\s+(bomb|attack|vest)\b/i,
  /\bterror(ist|ism|ize|attack)?\b/i,
  /\bjihad\b/i,
  /\bgenocid(e|al|ing)\b/i,
  /\bethnic\s+cleansing\b/i,
  /\bexecut(e|ed|ing|ion)\s+(you|him|her|them|people)?\b/i,
  /\btortur(e|ed|ing|ous)\b/i,
  /\bmutil(ate|ated|ating|ation)\b/i,
  /\brain\s+(of\s+)?(terror|bullets)\b/i,

  // ── Death threats & self-harm ──────────────────────────────────────────────
  /\bkill\s+yourself\b/i,
  /\bkys\b/i,
  /\bgo\s+(die|kill\s+yourself|hang\s+yourself)\b/i,
  /\bhope\s+you\s+(die|get\s+killed|suffer|get\s+hurt)\b/i,
  /\byou\s+(should|deserve\s+to)\s+(die|be\s+killed|suffer)\b/i,
  /\bi\s+(hope|wish)\s+(you|they|he|she)\s+(die|suffer|get\s+hurt|get\s+killed)\b/i,
  /\bend\s+your\s+(life|existence)\b/i,
  /\bhanging?\s+yourself?\b/i,
  /\boverdos(e|ing|ed)\b/i,
  /\bself.?harm(ing|ed)?\b/i,
  /\bcutt?ing\s+(yourself|myself|wrists)\b/i,
  /\bi'll\s+kill\s+you\b/i,
  /\bi\s+will\s+kill\s+you\b/i,
  /\bgonna\s+kill\b/i,
  /\bwanna\s+kill\b/i,
  /\bwish\s+you\s+were\s+dead\b/i,
  /\bwish\s+you\s+would\s+die\b/i,
  /\bshould\s+be\s+killed\b/i,
  /\bdeserve\s+to\s+die\b/i,
  /\bthreat.*life|threat.*death\b/i,
  /\bwill\s+hunt\s+you\b/i,
  /\bi\s+will\s+find\s+you\b/i,

  // ── Weapons & mass harm ────────────────────────────────────────────────────
  /\bbuild\s+(a\s+)?(bomb|weapon|gun|explosive)\b/i,
  /\bhow\s+to\s+(make|build|create)\s+(a\s+)?(bomb|explosive|weapon|poison)\b/i,
  /\bweapon\s+of\s+mass\b/i,
  /\bIED\b/,
  /\bC4\s+explosive\b/i,

  // ── Sexual harassment ──────────────────────────────────────────────────────
  /\br[a@4]p(e|ed|ing|ist|ists)?\b/i,
  /\bsex\s+(you|her|him|them)\b/i,
  /\bmolest(ed|ing|er)?\b/i,

  // ── Spam patterns ──────────────────────────────────────────────────────────
  // 5+ repeated identical characters (aaaaa, !!!!!)
  /(.)\1{4,}/,
  // More than 2 URLs
  /(https?:\/\/\S+.*){3,}/i,
];

function normalizeForModeration(input: string): string {
  return input
    .toLowerCase()
    .replace(/[0]/g, "o")
    .replace(/[1!|\\]/g, "i")
    .replace(/[3]/g, "e")
    .replace(/[@4]/g, "a")
    .replace(/[$5]/g, "s")
    .replace(/[7]/g, "t")
    .replace(/[6]/g, "b")
    .replace(/[8]/g, "b")
    .replace(/[9]/g, "g")
    .replace(/[2]/g, "z")
    .replace(/[z]/g, "s")
    .replace(/[_.~^`-]/g, " ") // normalize punctuation separators
    .replace(/\s+/g, " ")
    .trim();
}

// ─── Validation (returns an error string or undefined) ───────────────────────

export function validateMessageContent(value: string): string | undefined {
  const trimmed = value.trim();
  const normalized = normalizeForModeration(trimmed);

  if (!trimmed) return undefined; // optional field – blank is fine

  // Length cap
  if (trimmed.length > 500) {
    return "Message must be under 500 characters.";
  }

  // HTML / injection attempt
  if (/<[a-z][\s\S]*>/i.test(trimmed) || /javascript\s*:/i.test(trimmed)) {
    return "Message contains invalid characters.";
  }

  // ALL-CAPS check (>75 % uppercase letters in a word block of ≥6 chars)
  const letters = trimmed.replace(/[^a-zA-Z]/g, "");
  if (
    letters.length >= 6 &&
    (letters.replace(/[^A-Z]/g, "").length / letters.length) > 0.75
  ) {
    return "Please avoid writing in all caps.";
  }

  // Content-policy blocklist
  for (const pattern of BLOCKLIST) {
    if (pattern.test(trimmed) || pattern.test(normalized)) {
      return "Please keep your message respectful and professional. Threatening or abusive language is not allowed.";
    }
  }

  return undefined;
}
