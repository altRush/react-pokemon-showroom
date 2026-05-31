# Code Smell Analysis — react-pokemon-showroom

Generated: 2026-05-31

---

## Critical 🔴

### 1. Business logic in reducer + fragile pattern

**File:** `src/store/searchedPokemon.ts:8-14`

The reducer filters `gen1Pokemons` with `.filter()[0]` instead of `.find()`. It also imports the entire `gen1Pokemons` data file (151 entries), coupling static data to state logic. Reducers should handle state transitions, not data lookups.

**Fix:** Extract the lookup into the component or a selector; use `.find()`.

---

### 2. Double type assertion (`as unknown as`)

**File:** `src/store/pokemonShowroom.ts:72`

```ts
(state.pokemonStack as unknown as PokemonFullProfile[]).push(...pokemonFullProfile);
```

Completely bypasses TypeScript safety. `pokemonStack` is `Partial<PokemonFullProfile>[]` but the push should work without coercion — either fix the type or update the state definition.

---

### 3. No error handling on `Promise.all` in thunk

**File:** `src/store/pokemonShowroom.ts:33-45`

`fetchThreePokemonProfiles` uses `Promise.all` with no try/catch and no `.rejected` case in `extraReducers`. A single failed request kills the entire batch with no UI feedback.

**Fix:** Add try/catch in the thunk and a `rejected` handler in `extraReducers`.

---

### 4. Array index as React key

**File:** `src/features/pokemon-showroom/components/PokemonShowroom.tsx:33`

```tsx
{pokemonStack.map((pokemon, index) => <div key={index}>...</div>)}
```

Using the array index as `key` is an anti-pattern. It causes stale rendering when items are added/removed/reordered.

**Fix:** Use `pokemon.name` as key.

---

### 5. Uncanceled async race in `useEffect`

**File:** `src/features/search-pokemon/components/SearchPokemon.tsx:20-35`

The `useEffect` fires an async IIFE on every `searchedPokemon` change. No `AbortController` is used. If the user types quickly, multiple fetches fire in parallel and can resolve out of order, displaying the wrong sprite.

**Fix:** Add an `AbortController` and clean up in the effect return.

---

### 6. Missing early return in useEffect

**File:** `src/features/search-pokemon/components/SearchPokemon.tsx:20-35`

When `searchedPokemon` is falsy, `setPokemonSprite('')` is called but execution falls through into the async IIFE anyway. The async function skips the inner if but still calls `setLoadingPokemonSprite(false)`.

**Fix:** Add `return` after `setPokemonSprite('')`.

---

## Medium 🟡

### 7. No loading/disabled state on "Load more" button

**File:** `src/features/pokemon-showroom/components/PokemonShowroom.tsx:43-55`

The button fires an async `onClick` with no guard against double-clicks. User can trigger multiple fetches simultaneously. No loading indicator.

**Fix:** Add a loading flag in the store slice, disable the button while fetching.

---

### 8. Useless variable alias

**File:** `src/features/pokemon-showroom/components/PokemonShowroom.tsx:21`

```ts
const gen1Pokemons = pokemonProfiles;
```

Unnecessary alias. Use `pokemonProfiles` directly.

---

### 9. Lying type cast

**File:** `src/features/pokemon-showroom/components/PokemonShowroom.tsx:53`

```ts
newThreePokemonProfiles as PokemonProfile[]
```

`getMoreThreePokemonsProfiles` returns `Partial<PokemonFullProfile>[]`, not `PokemonProfile[]`. The cast misleads TypeScript.

**Fix:** Align the types or refactor the function to return the correct type.

---

### 10. Data imported into store slice

**File:** `src/store/searchedPokemon.ts:1,2`

`gen1Pokemons` is imported from `src/data/` into the reducer file. This couples mutable data to store logic.

**Fix:** Move filtering to a selector or the component layer.

---

### 11. Inline function recreated on every render

**File:** `src/features/search-pokemon/components/SearchPokemon.tsx:37-45`

`displaySprite` is defined inside the component body and re-allocated on every render. It's a pure function and can be extracted.

**Fix:** Move it outside the component.

---

### 12. `dev` script uses `&&` instead of `&`

**File:** `package.json:8`

```json
"dev": "vite && tailwind-watch"
```

`tailwind-watch` only starts after Vite exits. Should run in parallel.

**Fix:** Use `vite & tailwind-watch` or `concurrently`.

---

## Low 🟢

### 13. Redundant fragment in JSX

**File:** `src/features/search-pokemon/components/SearchPokemon.tsx:53-60`

```tsx
<div>{<img ... />}</div>
```

Unnecessary braces. Use `<div><img ... /></div>`.

---

### 14. `beforeAll` instead of `beforeEach`

**File:** `src/__test__/App.test.tsx:5`

Tests share state via `beforeAll` with no cleanup. State changes leak between tests.

**Fix:** Use `beforeEach`.

---

### 15. Misleading reducer name

**File:** `src/store/searchedPokemon.ts:8`

`searchPokemon` reads like an async thunk. It's a synchronous reducer.

**Fix:** Rename to `setSearchedPokemon` or `filterPokemon`.

---

### 16. Copy-paste error in test

**File:** `src/__test__/store/searchedPokemon.test.ts:21-27`

"search pokemon with empty string" dispatches `'me2'` instead of `''`. Copied from the test above.

**Fix:** Dispatch `''` and update assertion.

---

### 17. Unnecessary `<nav>` wrapper

**File:** `src/components/BackToIndex.tsx:3-11`

A single `<Link>` is wrapped in `<nav>`, adding unnecessary DOM nesting.

**Fix:** Use `<Link>` alone or keep `<nav>` only if multiple links exist.

---

### 18. Dead CSS from Vite template

**File:** `src/App.css`

`.logo`, `.logo-spin`, `.read-the-docs`, and `.card` are not used in any component.

**Fix:** Remove unused CSS.

---

### 19. Missing favicon

**File:** `index.html:5`

Points to `/vite.svg` which doesn't exist in the project. No SVG assets in `public/`.

**Fix:** Add a favicon or remove the link.

---

## Summary

| Category | Count |
|----------|-------|
| Critical 🔴 | 6 |
| Medium 🟡 | 6 |
| Low 🟢 | 7 |
| **Total** | **19** |
