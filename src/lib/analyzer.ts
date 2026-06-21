export interface AnalysisResult {
  score: number;
  level: "Weak" | "Medium" | "Strong";
  checks: {
    length: { passed: boolean; count: number };
    uppercase: { passed: boolean; count: number };
    lowercase: { passed: boolean; count: number };
    numbers: { passed: boolean; count: number };
    specialChars: { passed: boolean; count: number };
    noCommonPatterns: { passed: boolean; matched: string | null };
  };
  crackTime: string;
  crackDifficulty: "Instantly" | "Minutes" | "Hours" | "Days" | "Months" | "Years" | "Centuries";
  recommendations: string[];
  entropy: number;
}

const COMMON_PATTERNS = [
  "password",
  "123456",
  "qwerty",
  "admin",
  "welcome",
  "letmein",
  "abc123",
  "monkey",
  "dragon",
  "master",
  "login",
  "passw0rd",
  "iloveyou",
];

function calculateEntropy(password: string): number {
  let charSetSize = 0;
  if (/[a-z]/.test(password)) charSetSize += 26;
  if (/[A-Z]/.test(password)) charSetSize += 26;
  if (/[0-9]/.test(password)) charSetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charSetSize += 32;
  if (charSetSize === 0) return 0;
  return Math.log2(Math.pow(charSetSize, password.length));
}

function estimateCrackTime(entropy: number): {
  label: string;
  difficulty: AnalysisResult["crackDifficulty"];
} {
  // Assume 10 billion guesses per second (high-end hardware)
  const guessesPerSecond = 1e10;
  const combinations = Math.pow(2, entropy);
  const seconds = combinations / (2 * guessesPerSecond); // avg half the space

  if (seconds < 1) return { label: "Less than a second", difficulty: "Instantly" };
  if (seconds < 60) return { label: `~${Math.ceil(seconds)} seconds`, difficulty: "Minutes" };
  if (seconds < 3600) return { label: `~${Math.ceil(seconds / 60)} minutes`, difficulty: "Minutes" };
  if (seconds < 86400) return { label: `~${Math.ceil(seconds / 3600)} hours`, difficulty: "Hours" };
  if (seconds < 2592000) return { label: `~${Math.ceil(seconds / 86400)} days`, difficulty: "Days" };
  if (seconds < 31536000) return { label: `~${Math.ceil(seconds / 2592000)} months`, difficulty: "Months" };
  if (seconds < 3153600000) return { label: `~${Math.ceil(seconds / 31536000)} years`, difficulty: "Years" };
  return { label: "Centuries or more", difficulty: "Centuries" };
}

export function analyzePassword(password: string): AnalysisResult {
  if (!password) {
    return {
      score: 0,
      level: "Weak",
      checks: {
        length: { passed: false, count: 0 },
        uppercase: { passed: false, count: 0 },
        lowercase: { passed: false, count: 0 },
        numbers: { passed: false, count: 0 },
        specialChars: { passed: false, count: 0 },
        noCommonPatterns: { passed: true, matched: null },
      },
      crackTime: "Instantly",
      crackDifficulty: "Instantly",
      recommendations: ["Enter a password to analyze it."],
      entropy: 0,
    };
  }

  const len = password.length;
  const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
  const lowercaseCount = (password.match(/[a-z]/g) || []).length;
  const numberCount = (password.match(/[0-9]/g) || []).length;
  const specialCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;

  const lowerPwd = password.toLowerCase();
  const matchedPattern = COMMON_PATTERNS.find((p) => lowerPwd.includes(p)) || null;

  // Scoring
  let score = 0;

  // Length: up to 30 points
  if (len >= 6) score += 5;
  if (len >= 8) score += 5;
  if (len >= 10) score += 8;
  if (len >= 12) score += 7;
  if (len >= 16) score += 5;

  // Uppercase: 15 pts
  if (uppercaseCount >= 1) score += 8;
  if (uppercaseCount >= 2) score += 7;

  // Lowercase: 10 pts
  if (lowercaseCount >= 1) score += 5;
  if (lowercaseCount >= 2) score += 5;

  // Numbers: 15 pts
  if (numberCount >= 1) score += 8;
  if (numberCount >= 2) score += 7;

  // Special chars: 20 pts
  if (specialCount >= 1) score += 10;
  if (specialCount >= 2) score += 10;

  // No common patterns: 10 pts
  if (!matchedPattern) score += 10;

  // Deduction for very short passwords
  if (len < 6) score = Math.min(score, 15);

  score = Math.min(100, Math.max(0, score));

  const level: AnalysisResult["level"] =
    score >= 75 ? "Strong" : score >= 40 ? "Medium" : "Weak";

  const entropy = calculateEntropy(password);
  const crack = estimateCrackTime(entropy);

  const recommendations: string[] = [];

  if (len < 12) recommendations.push("Use at least 12 characters for better security.");
  if (uppercaseCount === 0) recommendations.push("Add uppercase letters (A-Z).");
  if (lowercaseCount === 0) recommendations.push("Add lowercase letters (a-z).");
  if (numberCount === 0) recommendations.push("Include numbers (0-9).");
  if (specialCount === 0) recommendations.push("Add special characters (!, @, #, $, etc.).");
  if (matchedPattern) recommendations.push(`Avoid common patterns like "${matchedPattern}".`);
  if (len >= 12 && uppercaseCount > 0 && lowercaseCount > 0 && numberCount > 0 && specialCount > 0 && !matchedPattern) {
    recommendations.push("Excellent! Your password meets all security criteria.");
  }
  if (recommendations.length === 0) {
    recommendations.push("Strong password! Consider using a password manager to store it safely.");
  }

  return {
    score,
    level,
    checks: {
      length: { passed: len >= 8, count: len },
      uppercase: { passed: uppercaseCount > 0, count: uppercaseCount },
      lowercase: { passed: lowercaseCount > 0, count: lowercaseCount },
      numbers: { passed: numberCount > 0, count: numberCount },
      specialChars: { passed: specialCount > 0, count: specialCount },
      noCommonPatterns: { passed: !matchedPattern, matched: matchedPattern },
    },
    crackTime: crack.label,
    crackDifficulty: crack.difficulty,
    recommendations,
    entropy: Math.round(entropy * 10) / 10,
  };
}
