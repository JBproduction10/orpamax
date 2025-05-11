export interface CleaningPackage {
    _id?: string
    title: string
    price: string
    description: string
    features: string[]
    highlighted: boolean
  }

export interface ChecklistSection{
  _id?: string
  title: string
  items: string[]
}

export interface CloudinaryImage{
  public_id: string;
  secure_url: string;
};
