export const CMCW_WORDLE_TIME_ZONE = 'America/Los_Angeles';

export const CMCW_WORDLE_START_DATE = '2026-03-02';
export const CMCW_WORDLE_END_DATE = '2026-03-06';

export const CMCW_WORDS_BY_DATE: Record<string, string> = {
  '2026-03-02': 'MUIRS',
  '2026-03-03': 'CELEB',
  '2026-03-04': 'WEEKS',
  '2026-03-05': 'SPARK',
  '2026-03-06': 'UNITY',
};

function isIsoDateKey(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidAnswer(value: string) {
  return /^[A-Z]{5}$/.test(value);
}

export function getCmcwWordleConfigIssues() {
  const issues: string[] = [];

  const keys = Object.keys(CMCW_WORDS_BY_DATE).sort();
  if (!keys.includes(CMCW_WORDLE_START_DATE) || !keys.includes(CMCW_WORDLE_END_DATE)) {
    issues.push('Missing start/end date entries in CMCW_WORDS_BY_DATE.');
  }

  for (const key of keys) {
    if (!isIsoDateKey(key)) issues.push(`Invalid date key format: ${key}`);
    const answer = CMCW_WORDS_BY_DATE[key] ?? '';
    if (!isValidAnswer(answer)) issues.push(`Invalid answer for ${key}. Use 5 letters A–Z.`);
  }

  const answers = keys.map((k) => CMCW_WORDS_BY_DATE[k]).filter(Boolean);
  const uniqueAnswers = new Set(answers);
  if (uniqueAnswers.size !== answers.length) issues.push('Duplicate answers found. Each day must have a distinct word.');

  return issues;
}

