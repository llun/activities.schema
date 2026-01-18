import { Actor } from '../dist/esm/index.js';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fixturesDir = join(__dirname, 'fixtures');

// Test data mapping
const testActors = [
  {
    name: '@mpe@hcommons.social',
    file: 'mpe-hcommons-social.json',
    platform: 'Mastodon',
    instance: 'hcommons.social',
    description: 'Mastodon instance with academic focus'
  },
  {
    name: '@notizie@poliverso.org',
    file: 'notizie-poliverso-org.json',
    platform: 'Friendica',
    instance: 'poliverso.org',
    description: 'Friendica instance with extended ActivityPub support'
  },
  {
    name: '@andiwaffeln@mastodon.social',
    file: 'andiwaffeln-mastodon-social.json',
    platform: 'Mastodon',
    instance: 'mastodon.social',
    description: 'Main Mastodon instance with hashtags in profile'
  },
  {
    name: '@markhurst@mastodon.social',
    file: 'markhurst-mastodon-social.json',
    platform: 'Mastodon',
    instance: 'mastodon.social',
    description: 'Mastodon instance with PropertyValue attachments'
  },
  {
    name: '@Seitansbraten@chaos.social',
    file: 'seitansbraten-chaos-social.json',
    platform: 'Mastodon',
    instance: 'chaos.social',
    description: 'Chaos Computer Club Mastodon instance'
  },
  {
    name: '@duponin@udongein.xyz',
    file: 'duponin-udongein-xyz.json',
    platform: 'Pleroma/Akkoma',
    instance: 'udongein.xyz',
    description: 'Pleroma/Akkoma instance with custom emojis'
  },
  {
    name: '@mewl@mewl.me',
    file: 'mewl-mewl-me.json',
    platform: 'Misskey',
    instance: 'mewl.me',
    description: 'Misskey instance with extended metadata'
  }
];

console.log('='.repeat(70));
console.log('ActivityPub Actor Schema Compatibility Test');
console.log('='.repeat(70));
console.log('');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

for (const actor of testActors) {
  totalTests++;
  const filePath = join(fixturesDir, actor.file);
  
  console.log(`Testing: ${actor.name}`);
  console.log(`Platform: ${actor.platform} (${actor.instance})`);
  console.log(`Description: ${actor.description}`);
  
  try {
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    const result = Actor.safeParse(data);
    
    if (result.success) {
      console.log(`✓ PASSED - Actor validated successfully`);
      console.log(`  Type: ${result.data.type}`);
      console.log(`  Username: ${result.data.preferredUsername}`);
      console.log(`  Name: ${result.data.name || '(none)'}`);
      if (result.data.tag && result.data.tag.length > 0) {
        console.log(`  Tags: ${result.data.tag.length} item(s)`);
      }
      if (result.data.attachment && result.data.attachment.length > 0) {
        console.log(`  Attachments: ${result.data.attachment.length} item(s)`);
      }
      passedTests++;
    } else {
      console.log(`✗ FAILED - Validation errors:`);
      console.log(JSON.stringify(result.error.format(), null, 2));
      failedTests++;
      failures.push({
        actor: actor.name,
        platform: actor.platform,
        errors: result.error.format()
      });
    }
  } catch (error) {
    console.log(`✗ FAILED - Error loading or parsing fixture:`);
    console.log(`  ${error.message}`);
    failedTests++;
    failures.push({
      actor: actor.name,
      platform: actor.platform,
      errors: error.message
    });
  }
  
  console.log('');
}

console.log('='.repeat(70));
console.log('Test Summary');
console.log('='.repeat(70));
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests} ✓`);
console.log(`Failed: ${failedTests} ✗`);
console.log('');

if (failedTests > 0) {
  console.log('Failed Tests:');
  console.log('-'.repeat(70));
  failures.forEach(failure => {
    console.log(`${failure.actor} (${failure.platform})`);
    console.log(JSON.stringify(failure.errors, null, 2));
    console.log('');
  });
  process.exit(1);
} else {
  console.log('🎉 All tests passed! The Actor schema is compatible with:');
  const platforms = [...new Set(testActors.map(a => a.platform))];
  platforms.forEach(platform => {
    const instances = testActors.filter(a => a.platform === platform);
    console.log(`  - ${platform} (${instances.length} instance${instances.length > 1 ? 's' : ''})`);
  });
  console.log('');
  process.exit(0);
}
