/**
 * @since 2020-04-29 10:39
 * @author vivaxy
 */
import * as execa from 'execa';

export default async function runHook(
  script: string,
  {
    cwd,
  }: {
    cwd: string;
  },
) {
  if (!script) {
    return;
  }
  await execa.command(script, { cwd, stdio: 'inherit' });
}
