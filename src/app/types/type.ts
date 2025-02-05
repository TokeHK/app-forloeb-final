export interface DataType {
  _id: string; 
  name: string;
  frontImg: string;
  subpageImg: string;
  frontMobileImg: string;
  desc: string;
  header: string;
  text1: string;
  text2: string;
  text3: string | TextArray[]; 
  bg: string;
}

export interface TextArray {
  img: string;
  email: string;
  bgColor: string;
}
