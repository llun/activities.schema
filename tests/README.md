# Actor Compatibility Tests

This directory contains compatibility tests for the ActivityPub Actor schema against real-world actor data from various federated platforms.

## Test Fixtures

The `fixtures/` directory contains actual actor JSON data fetched from live instances:

### Mastodon
- **hcommons.social** - Academic-focused Mastodon instance
- **mastodon.social** - Main Mastodon instance with profile hashtags and PropertyValue metadata
- **chaos.social** - Chaos Computer Club Mastodon instance

### Friendica
- **poliverso.org** - Friendica instance with extended ActivityPub support

### Pleroma/Akkoma
- **udongein.xyz** - Pleroma/Akkoma instance with custom emojis

### Misskey
- **mewl.me** - Misskey instance with extended Misskey-specific metadata

## Running Tests

```bash
npm test
```

Or manually:

```bash
npm run build
node tests/actor-compatibility.test.js
```

## What the Tests Validate

The tests verify that the Actor schema correctly handles:

- ✓ Different actor types (Person, Service, Application, Group, Organization)
- ✓ Optional fields (followers, name, url, featured, etc.)
- ✓ Account migration fields (alsoKnownAs, movedTo)
- ✓ Profile metadata (attachment with PropertyValue)
- ✓ Tags (both HashTag and Emoji types)
- ✓ Discovery settings (discoverable, indexable)
- ✓ Account states (memorial, suspended)
- ✓ Generator information
- ✓ Platform-specific extensions that don't break validation

## Updating Test Fixtures

To update fixtures with fresh data from live instances:

```bash
# Fetch actor data
curl -H "Accept: application/activity+json" https://instance.social/users/username > tests/fixtures/platform-instance-social.json

# Run tests to verify
npm test
```

## Coverage

The test suite validates compatibility across **4 major ActivityPub platforms**:
- Mastodon
- Friendica  
- Pleroma/Akkoma
- Misskey

This ensures the schema works with the vast majority of the Fediverse.
