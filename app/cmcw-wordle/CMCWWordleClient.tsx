'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  CMCW_WORDLE_END_DATE,
  CMCW_WORDLE_START_DATE,
  CMCW_WORDLE_TIME_ZONE,
  CMCW_WORDS_BY_DATE,
  getCmcwWordleConfigIssues,
} from './words';

type TileState = 'correct' | 'present' | 'absent';

function dateKeyInTimeZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const year = parts.find((p) => p.type === 'year')?.value ?? '0000';
  const month = parts.find((p) => p.type === 'month')?.value ?? '00';
  const day = parts.find((p) => p.type === 'day')?.value ?? '00';
  return `${year}-${month}-${day}`;
}

function scoreGuess(guess: string, answer: string): TileState[] {
  const g = guess.toUpperCase().split('');
  const a = answer.toUpperCase().split('');
  const result: TileState[] = Array.from({ length: 5 }, () => 'absent');

  const remaining: Record<string, number> = {};
  for (let i = 0; i < 5; i++) {
    if (g[i] === a[i]) {
      result[i] = 'correct';
    } else {
      remaining[a[i]] = (remaining[a[i]] ?? 0) + 1;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i] === 'correct') continue;
    const letter = g[i];
    if ((remaining[letter] ?? 0) > 0) {
      result[i] = 'present';
      remaining[letter] -= 1;
    }
  }

  return result;
}

function betterLetterState(prev: TileState | undefined, next: TileState): TileState {
  if (!prev) return next;
  if (prev === 'correct') return prev;
  if (prev === 'present' && next === 'absent') return prev;
  if (prev === 'absent' && (next === 'present' || next === 'correct')) return next;
  if (prev === 'present' && next === 'correct') return next;
  return prev;
}

function tileClasses(state: TileState | null) {
  const base =
    'w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg border text-lg font-semibold select-none';
  if (!state) return `${base} bg-white border-[#E8E6E1] text-[#5D4A2F]`;
  if (state === 'correct') return `${base} bg-[#7CB342] border-[#7CB342] text-white`;
  if (state === 'present') return `${base} bg-[#D6B85A] border-[#D6B85A] text-white`;
  return `${base} bg-[#9CA3AF] border-[#9CA3AF] text-white`;
}

function emojiFor(state: TileState) {
  if (state === 'correct') return '🟩';
  if (state === 'present') return '🟨';
  return '⬜';
}

type GameState = 'playing' | 'won' | 'lost';

function normalizeGuess(value: string) {
  return value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 5);
}

function loadSaved(storageKey: string) {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { guesses?: unknown; state?: unknown };
    const guesses = Array.isArray(parsed.guesses)
      ? parsed.guesses.filter((g): g is string => typeof g === 'string').map(normalizeGuess).filter((g) => g.length === 5)
      : [];
    const state: GameState = parsed.state === 'won' || parsed.state === 'lost' ? parsed.state : 'playing';
    return { guesses: guesses.slice(0, 6), state };
  } catch {
    return null;
  }
}

function DayGame({
  todayKey,
  dayNumber,
  answer,
  canPlay,
}: {
  todayKey: string;
  dayNumber: number | null;
  answer: string;
  canPlay: boolean;
}) {
  const storageKey = useMemo(() => `cmcw-wordle:v1:${todayKey}`, [todayKey]);
  const saved = useMemo(() => (canPlay ? loadSaved(storageKey) : null), [canPlay, storageKey]);

  const [guesses, setGuesses] = useState<string[]>(() => saved?.guesses ?? []);
  const [current, setCurrent] = useState('');
  const [state, setState] = useState<GameState>(() => saved?.state ?? 'playing');
  const [message, setMessage] = useState<string | null>(null);
  const messageTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canPlay) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ guesses, state }));
    } catch {
      // ignore
    }
  }, [canPlay, guesses, state, storageKey]);

  const setTimedMessage = useCallback((text: string) => {
    setMessage(text);
    if (messageTimerRef.current) window.clearTimeout(messageTimerRef.current);
    messageTimerRef.current = window.setTimeout(() => setMessage(null), 2000);
  }, []);

  const evaluatedGuesses = useMemo(() => guesses.map((g) => scoreGuess(g, answer)), [answer, guesses]);

  const letterStates = useMemo(() => {
    const map = new Map<string, TileState>();
    for (let i = 0; i < guesses.length; i++) {
      const guess = guesses[i];
      const scored = evaluatedGuesses[i];
      for (let j = 0; j < 5; j++) {
        const letter = guess[j];
        const next = scored[j];
        map.set(letter, betterLetterState(map.get(letter), next));
      }
    }
    return map;
  }, [evaluatedGuesses, guesses]);

  const submitGuess = useCallback(() => {
    if (!canPlay) return;
    if (state !== 'playing') return;

    const guess = current.toUpperCase();
    if (guess.length !== 5) {
      setTimedMessage('Enter 5 letters.');
      return;
    }

    const nextGuesses = [...guesses, guess];
    setGuesses(nextGuesses);
    setCurrent('');

    if (guess === answer) {
      setState('won');
      setTimedMessage('Nice! You got it.');
      return;
    }

    if (nextGuesses.length >= 6) {
      setState('lost');
      setTimedMessage(`Answer: ${answer}`);
    }
  }, [answer, canPlay, current, guesses, setTimedMessage, state]);

  const handleKey = useCallback(
    (key: string) => {
      if (!canPlay) return;
      if (state !== 'playing') return;

      if (key === 'ENTER') {
        submitGuess();
        return;
      }
      if (key === 'BACKSPACE') {
        setCurrent((c) => c.slice(0, -1));
        return;
      }
      if (/^[A-Z]$/.test(key)) {
        setCurrent((c) => (c.length >= 5 ? c : c + key));
      }
    },
    [canPlay, state, submitGuess],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleKey('ENTER');
        return;
      }
      if (e.key === 'Backspace') {
        e.preventDefault();
        handleKey('BACKSPACE');
        return;
      }
      const k = e.key.toUpperCase();
      if (/^[A-Z]$/.test(k)) handleKey(k);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey]);

  const resetToday = useCallback(() => {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    setGuesses([]);
    setCurrent('');
    setState('playing');
    setMessage(null);
  }, [storageKey]);

  const copyShare = useCallback(async () => {
    const tries = state === 'won' ? guesses.length : 'X';
    const header = `CMCW Wordle ${dayNumber ?? '?'} / 5 — ${tries} / 6`;
    const grid = evaluatedGuesses.map((row) => row.map(emojiFor).join('')).join('\n');
    const text = `${header}\n${grid}\n(muircollegecouncil.org)`;
    try {
      await navigator.clipboard.writeText(text);
      setTimedMessage('Copied!');
    } catch {
      setTimedMessage('Copy failed.');
    }
  }, [dayNumber, evaluatedGuesses, guesses.length, setTimedMessage, state]);

  const keyboardRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-full flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span>
            Today: <span className="font-medium text-[#5D4A2F]">{todayKey}</span>
            {dayNumber ? <span className="ml-2 text-gray-500">(Day {dayNumber} of 5)</span> : null}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={resetToday} disabled={!canPlay || guesses.length === 0}>
            Reset
          </Button>
          <Button onClick={copyShare} disabled={!canPlay || (state !== 'won' && state !== 'lost')}>
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-rows-6 gap-2">
        {Array.from({ length: 6 }).map((_, rowIndex) => {
          const committedGuess = guesses[rowIndex];
          const isActiveRow = rowIndex === guesses.length && state === 'playing';
          const rowText = committedGuess ?? (isActiveRow ? current : '');
          const letters = rowText.padEnd(5, ' ').slice(0, 5).split('');
          const scored = committedGuess ? scoreGuess(committedGuess, answer) : null;

          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {letters.map((ch, i) => {
                const tileState = scored ? scored[i] : null;
                const display = ch === ' ' ? '' : ch;
                return (
                  <div key={i} className={tileClasses(tileState)} aria-label={display || 'empty'}>
                    {display}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="min-h-6 text-sm text-gray-700">{message}</div>

      <div className="w-full max-w-xl">
        <div className="space-y-2">
          <div className="flex gap-1.5 justify-center">
            {keyboardRows[0].split('').map((k) => {
              const st = letterStates.get(k);
              const cls =
                st === 'correct'
                  ? 'bg-[#7CB342] text-white'
                  : st === 'present'
                    ? 'bg-[#D6B85A] text-white'
                    : st === 'absent'
                      ? 'bg-[#9CA3AF] text-white'
                      : 'bg-[#FAF7F2] text-[#5D4A2F] border border-[#E8E6E1]';
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => handleKey(k)}
                  disabled={!canPlay || state !== 'playing'}
                  className={`h-11 w-9 sm:w-10 rounded-md text-sm font-semibold transition-colors disabled:opacity-60 ${cls}`}
                >
                  {k}
                </button>
              );
            })}
          </div>
          <div className="flex gap-1.5 justify-center">
            {keyboardRows[1].split('').map((k) => {
              const st = letterStates.get(k);
              const cls =
                st === 'correct'
                  ? 'bg-[#7CB342] text-white'
                  : st === 'present'
                    ? 'bg-[#D6B85A] text-white'
                    : st === 'absent'
                      ? 'bg-[#9CA3AF] text-white'
                      : 'bg-[#FAF7F2] text-[#5D4A2F] border border-[#E8E6E1]';
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => handleKey(k)}
                  disabled={!canPlay || state !== 'playing'}
                  className={`h-11 w-9 sm:w-10 rounded-md text-sm font-semibold transition-colors disabled:opacity-60 ${cls}`}
                >
                  {k}
                </button>
              );
            })}
          </div>
          <div className="flex gap-1.5 justify-center">
            <button
              type="button"
              onClick={() => handleKey('ENTER')}
              disabled={!canPlay || state !== 'playing'}
              className="h-11 px-3 rounded-md text-sm font-semibold bg-[#5D4A2F] text-white disabled:opacity-60"
            >
              Enter
            </button>
            {keyboardRows[2].split('').map((k) => {
              const st = letterStates.get(k);
              const cls =
                st === 'correct'
                  ? 'bg-[#7CB342] text-white'
                  : st === 'present'
                    ? 'bg-[#D6B85A] text-white'
                    : st === 'absent'
                      ? 'bg-[#9CA3AF] text-white'
                      : 'bg-[#FAF7F2] text-[#5D4A2F] border border-[#E8E6E1]';
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => handleKey(k)}
                  disabled={!canPlay || state !== 'playing'}
                  className={`h-11 w-9 sm:w-10 rounded-md text-sm font-semibold transition-colors disabled:opacity-60 ${cls}`}
                >
                  {k}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => handleKey('BACKSPACE')}
              disabled={!canPlay || state !== 'playing'}
              className="h-11 px-3 rounded-md text-sm font-semibold bg-[#5D4A2F] text-white disabled:opacity-60"
              aria-label="Backspace"
            >
              ⌫
            </button>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          <span>Tip: Type on your keyboard or tap the letters. Guesses accept any 5-letter combination.</span>
        </div>
      </div>
    </div>
  );
}

export function CMCWWordleClient() {
  const configIssues = useMemo(() => getCmcwWordleConfigIssues(), []);
  const [todayKey, setTodayKey] = useState(() => dateKeyInTimeZone(new Date(), CMCW_WORDLE_TIME_ZONE));

  const inEventRange = todayKey >= CMCW_WORDLE_START_DATE && todayKey <= CMCW_WORDLE_END_DATE;
  const activeKey =
    todayKey < CMCW_WORDLE_START_DATE ? CMCW_WORDLE_START_DATE : todayKey > CMCW_WORDLE_END_DATE ? CMCW_WORDLE_END_DATE : todayKey;
  const answer = CMCW_WORDS_BY_DATE[activeKey] ?? null;
  const canPlay = !!answer && configIssues.length === 0;

  const sortedKeys = useMemo(() => Object.keys(CMCW_WORDS_BY_DATE).sort(), []);
  const dayIndex = sortedKeys.indexOf(activeKey);
  const dayNumber = dayIndex >= 0 ? dayIndex + 1 : null;

  useEffect(() => {
    const id = window.setInterval(() => {
      const next = dateKeyInTimeZone(new Date(), CMCW_WORDLE_TIME_ZONE);
      setTodayKey((prev) => (prev === next ? prev : next));
    }, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-[#5D4A2F] text-3xl sm:text-4xl font-semibold tracking-tight">CMCW Wordle</h1>
        <p className="text-gray-600 mt-3">Celebrating Muir College Week Wordle. One word per day, March 2–6, 2026 (PT).</p>
      </div>

      {configIssues.length > 0 && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <div className="font-semibold mb-1">CMCW Wordle configuration issue</div>
          <ul className="list-disc pl-5 space-y-1">
            {configIssues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {!inEventRange && configIssues.length === 0 && answer && (
        <div className="mb-6 rounded-xl border border-[#E8E6E1] bg-white px-4 py-3 text-sm text-gray-700">
          <span className="font-medium text-[#5D4A2F]">Preview mode:</span> showing the word for <span className="font-medium">{activeKey}</span> (PT).
        </div>
      )}

      {canPlay && answer ? (
        <DayGame key={activeKey} todayKey={activeKey} dayNumber={dayNumber} answer={answer} canPlay={canPlay} />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="text-sm text-gray-600">
            Today: <span className="font-medium text-[#5D4A2F]">{todayKey}</span>
          </div>
          <div className="text-center text-xs text-gray-500">
            Unable to load today’s Wordle. Please check back soon.
          </div>
        </div>
      )}
    </div>
  );
}
