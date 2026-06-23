/**
 * Safe confirm wrapper that handles sandboxed iframe environments.
 * If window.confirm is blocked or throws an exception, it logs a warning and
 * defaults to auto-confirming (true) to ensure operations like deletion still proceed.
 */
export function safeConfirm(message: string): boolean {
  try {
    return window.confirm(message);
  } catch (err) {
    console.warn("window.confirm blocked or threw error in sandboxed environment. Auto-confirming to enable seamless operation.", err);
    return true; // Auto-confirm in iframe sandbox
  }
}

/**
 * Safe alert wrapper that handles sandboxed iframe environments.
 * If window.alert is blocked or throws an exception, it logs a warning.
 */
export function safeAlert(message: string): void {
  try {
    window.alert(message);
  } catch (err) {
    console.warn("window.alert blocked or threw error in sandboxed environment. Message was:", message);
  }
}
