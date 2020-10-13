import load from '@commitlint/load';
import { QualifiedRules, RuleConfigTuple } from '@commitlint/types';

export async function getCommitlintConfigRules(): Promise<QualifiedRules> {
  let rules;
  try {
    const config = await load();
    rules = config.rules;
  } catch (e) {
    rules = {};
  }
  return rules;
}

export function getRuleValue(
  [level, applicable, value = 0]: RuleConfigTuple<number> = [0, 'never', 0],
  defaultValue: number,
) {
  return level === 2 && applicable === 'always' ? value : defaultValue;
}
