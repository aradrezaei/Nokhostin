/**
 * Defer effect work so React's set-state-in-effect rule stays happy:
 * setState that happens inside the task runs after the effect body finishes.
 */
export function scheduleEffect(task: () => unknown): () => void {
  let alive = true;
  const id = setTimeout(() => {
    if (!alive) {
      return;
    }
    void Promise.resolve(task());
  }, 0);
  return () => {
    alive = false;
    clearTimeout(id);
  };
}
