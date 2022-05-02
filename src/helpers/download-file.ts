import axios from 'axios'

interface IUrlDTO {
  url: string
  label: string
}

export async function downloadFile(data: IUrlDTO) {
  const response = await axios.get(data.url, { responseType: 'blob' })
  const blob = new Blob([response.data], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = data.label
  link.click()
  URL.revokeObjectURL(link.href)
}
