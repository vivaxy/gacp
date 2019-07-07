// @ts-ignore
import * as load from '@commitlint/load';

export async function getCommitlintConfigRules(): Promise<{
  [key: string]: [number, string, number];
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
  [level, , value]: [number, string, number] = [0, '', 0],
  defaultValue: number,
) {
  return level === 2 ? value : defaultValue;
}
