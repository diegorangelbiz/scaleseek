import { getCollection, type CollectionEntry } from 'astro:content';

export type Experiment = CollectionEntry<'experiments'>;

/** All experiments, newest first. */
export async function getExperiments(): Promise<Experiment[]> {
  const all = await getCollection('experiments');
  return all.sort((a, b) => b.data.number - a.data.number);
}

export const pad = (n: number) => String(n).padStart(2, '0');

export const shortDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

export const longDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** Folder cover colour per topic, printed-ink tones that sit well on black. */
const TOPIC_COLOURS: Record<string, string> = {
  'Structured output': '#d9b44a',
  Evaluation: '#d9715a',
  Agents: '#3fb5a6',
  Vision: '#a58ae8',
  Memory: '#6382d6',
};
export const topicColour = (e: Experiment) =>
  e.data.status === 'Abandoned' ? '#8f8f8a' : TOPIC_COLOURS[e.data.topic] ?? '#9b9b96';
