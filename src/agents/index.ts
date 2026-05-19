import 'dotenv/config';
import { spawn } from 'child_process';
import { mkdir } from 'fs/promises';

async function runAgent(scriptName: string): Promise<number> {
  return new Promise((resolve) => {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`Running: ${scriptName}`);
    console.log('═'.repeat(60));

    const agent = spawn('node', [
      '--env-file=.env.local',
      `dist/src/agents/${scriptName}.js`,
    ], {
      stdio: 'inherit',
      shell: true,
    });

    agent.on('close', (code) => {
      console.log(`\n${scriptName} exited with code ${code}`);
      resolve(code || 0);
    });

    agent.on('error', (err) => {
      console.error(`Error running ${scriptName}:`, err);
      resolve(1);
    });
  });
}

async function main() {
  try {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║     Blog Imóveis Campos — Autonomous Content Pipeline     ║
║              Agent Orchestration (${new Date().toISOString().split('T')[0]})              ║
╚════════════════════════════════════════════════════════════╝
    `);

    // Ensure tmp directory exists
    await mkdir('tmp', { recursive: true });

    // Run agents sequentially
    const scraper = await runAgent('scraper');
    if (scraper !== 0) {
      console.error('\n⚠️  Scraper failed, but continuing...');
    }

    const analyzer = await runAgent('analyzer');
    if (analyzer !== 0) {
      console.error('\n⚠️  Analyzer failed, but continuing...');
    }

    const writer = await runAgent('writer');
    if (writer !== 0) {
      console.error('\n⚠️  Writer failed, but continuing...');
    }

    const publisher = await runAgent('publisher');
    if (publisher !== 0) {
      console.error('\n❌ Publisher failed!');
    }

    // Final summary
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                    EXECUTION COMPLETED                    ║
║                 ${new Date().toISOString()}                ║
╚════════════════════════════════════════════════════════════╝
    `);

    process.exit(publisher === 0 ? 0 : 1);
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
}

main();
