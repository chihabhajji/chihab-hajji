import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {markdownSchema} from 'sanity-plugin-markdown'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {projectId, dataset} from './env'

export default defineConfig({
  name: 'default',
  title: 'portfolio',

  projectId: projectId,
  dataset: dataset,

  plugins: [structureTool(), visionTool(), markdownSchema(), unsplashImageAsset()],

  schema: {
    types: schemaTypes,
  },
})
