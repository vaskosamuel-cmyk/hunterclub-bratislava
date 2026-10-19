import test from 'node:test';
import assert from 'node:assert/strict';
import { selectHeroVideos } from '../src/services/videoService.ts';
const uploads = Array.from({length: 7}, (_, i) => ({id: String(i + 1), title: `Video ${i + 1}`, videoUrl: `/${i + 1}.mp4`, createdAt: `2026-10-${String(i + 1).padStart(2, '0')}T12:00:00Z`}));
test('shows only newest five: newest main and four other cards', () => {
  const { videos, current, choices } = selectHeroVideos(uploads);
  assert.deepEqual(videos.map(v => v.id), ['7','6','5','4','3']);
  assert.equal(current.id, '7');
  assert.deepEqual(choices.map(v => v.id), ['6','5','4','3']);
});
test('switching swaps previous main into cards without duplicating selected video', () => {
  const { current, choices } = selectHeroVideos(uploads, '5');
  assert.equal(current.id, '5');
  assert.deepEqual(choices.map(v => v.id), ['7','6','4','3']);
  assert.equal(selectHeroVideos(uploads, '1').current.id, '7');
});
test('does not fabricate cards when fewer videos are uploaded', () => {
  assert.equal(selectHeroVideos([]).current, undefined);
  assert.equal(selectHeroVideos(uploads.slice(0, 1)).choices.length, 0);
  assert.equal(selectHeroVideos(uploads.slice(0, 3)).choices.length, 2);
});
