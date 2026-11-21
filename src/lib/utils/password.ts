export interface PasswordValidationResult {
  isValid: boolean;
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  passedCount: number;
  strengthLabel: "Weak" | "Fair" | "Good" | "Strong";
  strengthColor: string;
  errorMessage?: string;
}

/**
 * Validates password strength:
 * - Minimum 6 characters
 * - At least one uppercase letter (A-Z)
 * - At least one lowercase letter (a-z)
 * - At least one number (0-9)
 * - At least one special character (!@#$%^&*...)
 */
export function validatePassword(password: string): PasswordValidationResult {
  const hasMinLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`\s]/.test(password);

  const checks = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar];
  const passedCount = checks.filter(Boolean).length;

  let strengthLabel: "Weak" | "Fair" | "Good" | "Strong" = "Weak";
  let strengthColor = "bg-rose-500 text-rose-600 dark:text-rose-400";

  if (passedCount >= 5) {
    strengthLabel = "Strong";
    strengthColor = "bg-emerald-500 text-emerald-600 dark:text-emerald-400";
  } else if (passedCount >= 4) {
    strengthLabel = "Good";
    strengthColor = "bg-amber-500 text-amber-600 dark:text-amber-400";
  } else if (passedCount >= 2) {
    strengthLabel = "Fair";
    strengthColor = "bg-orange-500 text-orange-600 dark:text-orange-400";
  }

  let errorMessage: string | undefined;
  if (!password) {
    errorMessage = "Password is required";
  } else if (!hasMinLength) {
    errorMessage = "Password must be at least 6 characters long";
  } else if (!hasUpperCase) {
    errorMessage = "Password must include at least one uppercase letter (A-Z)";
  } else if (!hasLowerCase) {
    errorMessage = "Password must include at least one lowercase letter (a-z)";
  } else if (!hasNumber) {
    errorMessage = "Password must include at least one number (0-9)";
  } else if (!hasSpecialChar) {
    errorMessage = "Password must include at least one special character (!@#$%^&*)";
  }

  return {
    isValid: !errorMessage,
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
    passedCount,
    strengthLabel,
    strengthColor,
    errorMessage,
  };
}
