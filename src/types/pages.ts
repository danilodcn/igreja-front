interface PageBase {
  id: number
  name: string
}

export interface IImage extends PageBase {
  image: string
}

export interface IPageImage {
  order: number
  image: IImage
}

export interface IMemberType extends PageBase {
  order: number
  description: string
}

export interface IChurchBody extends PageBase {
  order: number
  content: string
  image: string
  member_type: IMemberType
}

export interface IAddress {
  address_type: string
  city: string
  complement: string
  country: string
  id: number
  neighborhood: string
  number: string
  state: string
  street: string
  zipcode: string
}

export interface IChurch extends PageBase {
  address: IAddress
  is_default: boolean
  active: boolean
}

export interface ISection {
  section: number
  title: string
  content: string
}

export interface IPage extends PageBase {
  active: boolean
  body: IChurchBody[]
  church: IChurch
  images: IPageImage[]
  maps_frame: string
  sections: ISection[]
  title: string
}
