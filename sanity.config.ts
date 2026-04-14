import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const devPlugins =
  process.env.NODE_ENV === 'development'
    ? [require('@sanity/vision').visionTool()]
    : []

export default defineConfig({
  name: 'aquaholic',
  title: 'Aquaholic Aquarium Services CMS',
  projectId,
  dataset,
  plugins: [structureTool(), ...devPlugins],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
})
