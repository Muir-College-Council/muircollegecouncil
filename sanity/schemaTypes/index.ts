import { type Rule, type SchemaTypeDefinition } from 'sanity';

const officer = {
  name: 'officer',
  title: 'Officer',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (rule: Rule) => rule.required() },
    { name: 'role', title: 'Role', type: 'string', validation: (rule: Rule) => rule.required() },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'headshot', title: 'Headshot', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Bio', type: 'text' },
  ],
};

const event = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (rule: Rule) => rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (rule: Rule) => rule.required() },
    { name: 'start', title: 'Start', type: 'datetime', validation: (rule: Rule) => rule.required() },
    { name: 'end', title: 'End', type: 'datetime' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'flyerFile', title: 'Flyer (PDF/Image)', type: 'file' },
    { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'featured', title: 'Featured', type: 'boolean' },
  ],
};

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [officer, event],
};
