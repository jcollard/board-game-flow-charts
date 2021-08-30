
const prompts = require('prompts');

export async function prompt(message: string): Promise<void> {
    await prompts({
        type: 'text',
        name: 'meaning',
        message: message
      });
    return Promise.resolve();
}