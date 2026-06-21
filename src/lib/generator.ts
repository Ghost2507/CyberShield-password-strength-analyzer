const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPECIAL = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export function generateStrongPassword(length = 16): string {
  const allChars = UPPERCASE + LOWERCASE + NUMBERS + SPECIAL;

  // Ensure at least one of each character type
  const mandatory = [
    UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)],
    UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)],
    LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)],
    LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)],
    NUMBERS[Math.floor(Math.random() * NUMBERS.length)],
    NUMBERS[Math.floor(Math.random() * NUMBERS.length)],
    SPECIAL[Math.floor(Math.random() * SPECIAL.length)],
    SPECIAL[Math.floor(Math.random() * SPECIAL.length)],
  ];

  const remaining: string[] = [];
  for (let i = mandatory.length; i < length; i++) {
    remaining.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Fisher-Yates shuffle
  const combined = [...mandatory, ...remaining];
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  return combined.join("");
}
