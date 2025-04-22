import {StructureBuilder} from 'sanity/desk'
import {schemaTypes} from '../schemas'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([...schemaTypes.map((schema) => S.documentTypeListItem(schema.name))])
