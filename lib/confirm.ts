/** User-facing confirmation (window.confirm wrapped for lint). */
export function confirmAction(message: string): boolean {
  // Intentional browser confirm for destructive admin actions.
  // eslint-disable-next-line no-alert -- gated destructive actions need a blocking confirm
  return window.confirm(message);
}
