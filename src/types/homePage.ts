interface HomePageBase {}

export interface IHomePage extends HomePageBase {
    title: string,
    content: string,
    active: boolean,
    images: any[],
}