export class MenuItem {
  name: string;
  url?: string;
  children?: MenuItem[]

  constructor(name: string, url: string, children?: MenuItem[]) {
    this.name = name;
    if(url){
      this.url = url;
    }
    if (children) {
      this.children = children;
    }
  }
}
