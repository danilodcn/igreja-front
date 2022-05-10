interface HomePageBase {
  id: number
  name: string
}

export interface IImage extends HomePageBase {
  image: string
}

export interface IHomeImage {
  order: number
  imagehome: IImage
}

export interface IMemberType extends HomePageBase {
  order: number
  description: string
}

export interface IChurchBody extends HomePageBase {
  order: number
  content: string
  image: string
  member_type: IMemberType
}

export interface IHomePage extends HomePageBase {
  active: boolean
  body_content: string
  body_title: string
  body: IChurchBody[]
  content: string
  images: IHomeImage[]
  maps_frame: string
  title: string
}
