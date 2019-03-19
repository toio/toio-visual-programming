import base64js from 'base64-js'

import projectData from './project-data'

import backdrop from './cd21514d0531fdffb22204e0ec5ed84a.svg'
import costume from './7ec7c2ce88c6b447fe3c099ed4799708.svg'

const convertBase64ImageToByteArray = image =>
  base64js.toByteArray(image.replace(/data:image\/[\w\+]+;base64,/, ''))

const defaultProject = translator => {
  const projectJson = projectData(translator)
  return [
    {
      id: 0,
      assetType: 'Project',
      dataFormat: 'JSON',
      data: JSON.stringify(projectJson)
    },
    {
      id: 'cd21514d0531fdffb22204e0ec5ed84a',
      assetType: 'ImageVector',
      dataFormat: 'SVG',
      data: convertBase64ImageToByteArray(backdrop)
    },
    {
      id: '7ec7c2ce88c6b447fe3c099ed4799708',
      assetType: 'ImageVector',
      dataFormat: 'SVG',
      data: convertBase64ImageToByteArray(costume)
    }
  ]
}

export default defaultProject
