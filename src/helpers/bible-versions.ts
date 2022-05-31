import { IVersion } from '@/types/bible'

export const VERSIONS: IVersion[] = [
  {
    description: 'Almeida Corrigida Fiel',
    version: 'acf',
    verses: 31106,
  },
  {
    description: '',
    version: 'apee',
    verses: 30975,
  },
  {
    description: '',
    version: 'bbe',
    verses: 31104,
  },
  {
    description: '',
    version: 'kjv',
    verses: 31101,
  },
  {
    description: 'Nova Versão Internacional',
    version: 'nvi',
    verses: 31105,
  },
  {
    description: '',
    version: 'ra',
    verses: 31104,
  },
  {
    description: '',
    version: 'rvr',
    verses: 31102,
  },
]

export class VersionsDescriptionHelper {
  getVersions(versionsNames: string[]) {
    const versions: IVersion[] = []
    VERSIONS.forEach((version) => {
      if (versionsNames.includes(version.version)) {
        versions.push(version)
      }
    })
    return versions
  }
}

export const versionsDescriptionHelper = new VersionsDescriptionHelper()
