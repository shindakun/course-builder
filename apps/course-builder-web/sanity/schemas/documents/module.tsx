import * as React from 'react'
import {capitalize} from 'lodash'
import {MdRadio} from 'react-icons/md'
import {defineField} from 'sanity'

export default {
  name: 'module',
  title: 'Module',
  type: 'document',
  icon: MdRadio,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      description:
        'Describe this module for search engines, social media, and LLM prompt.',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'moduleType',
      title: 'Module Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'tutorial',
      options: {
        list: [
          {title: 'Workshop', value: 'workshop'},
          {title: 'Tutorial', value: 'tutorial'},
          {title: 'Tips', value: 'tips'},
        ],
      },
    }),
    defineField({
      name: 'state',
      title: 'Current State',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'draft',
      options: {
        list: [
          {title: 'draft', value: 'draft'},
          {title: 'published', value: 'published'},
        ],
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    {
      name: 'resources',
      title: 'Resources',
      description: 'Resources in the Module',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {title: 'Exercise', type: 'exercise'},
            {title: 'Section', type: 'section'},
            {title: 'Explainer', type: 'explainer'},
            {type: 'linkResource'},
            {
              name: 'github',
              title: 'GitHub',
              type: 'github',
            },
            {
              name: 'workflow',
              title: 'Workflow',
              type: 'workflow',
            },
            {
              name: 'videoResource',
              title: 'Video Resource',
              type: 'videoResource',
            },
            {title: 'Tip', type: 'tip'},
          ],
        },
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'markdown',
    },
    {
      name: 'concepts',
      title: 'Concepts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'concept'}],
        },
      ],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'ogImage',
      title: 'Share card URL',
      type: 'url',
    },
  ],
  preview: {
    select: {
      type: 'moduleType',
      title: 'title',
      media: 'image.asset.url',
    },
    prepare(selection: any) {
      const {title, media, type} = selection
      return {
        title: `${title} ${capitalize(type)}`,
        media: media && <img src={media} alt={title} />,
      }
    },
  },
}
