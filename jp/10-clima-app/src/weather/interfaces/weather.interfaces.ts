export interface Country {
  code: string;
  name: string;
}

export interface Search { 
  city: string;
  country: string;
}

export interface Weather {
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  },
}
