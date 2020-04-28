// @ts-ignore
import * as load from '@commitlint/load';

export type CommitlintRule = [number, string, number];

export async function getCommitlintConfigRules(): Promise<{
  [key: string]: CommitlintRule;
}> {
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
  [level, applicable, value]: CommitlintRule = [0, 'never', 0],
  defaultValue: number,
) {
  return level === 2 && applicable === 'always' ? value : defaultValue;
}
