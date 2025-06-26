export interface Address {
  street: string;
  suburb: string;
  state: string;
  postcode: number;
}

export interface Agent {
  agentID: number;
  name: string;
  title: string;
  phone: string;
  mobile: string;
  email?: string;
  imageURL?: string;
}

export interface BedBathCarLand {
  key: string;
  label: string;
  value: string;
}

export interface Image {
  url: string;
  description?: string;
  type: string;
  category?: string;
}