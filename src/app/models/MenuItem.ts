export class MenuItem {
  name: string;
  icon: string;
  url?: string;
  children?: MenuItem[]

  constructor(name: string, icon: string, url: string, children?: MenuItem[]) {
    this.name = name;
    this.icon = icon;
    if (url) {
      this.url = url;
    }
    if (children) {
      this.children = children;
    }
  }
}
